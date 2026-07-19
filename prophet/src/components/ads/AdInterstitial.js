import { useEffect, useRef, useCallback } from 'react';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_INTERSTITIAL } from '../../config/url';
import { getInterstitialCooldown } from '../../db/settings';

let globalLastShown = 0;

export default function useAdInterstitial() {
  const pendingShow = useRef(false);
  const timerRef = useRef(null);
  const cooldownRef = useRef(90000);

  useEffect(() => {
    getInterstitialCooldown().then(ms => { cooldownRef.current = ms; });
  }, []);

  const { load, show, isLoaded, isClosed, error } = useInterstitialAd(
    ADMOB_ENABLED ? AD_UNIT_ID_INTERSTITIAL : null,
  );

  useEffect(() => {
    if (error) {
      console.warn('[AdInterstitial] load error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (ADMOB_ENABLED && !isLoaded) {
      load();
    }
  }, [ADMOB_ENABLED, isLoaded, load]);

  useEffect(() => {
    if (ADMOB_ENABLED && isClosed) {
      load();
    }
  }, [ADMOB_ENABLED, isClosed, load]);

  useEffect(() => {
    if (isLoaded && pendingShow.current) {
      pendingShow.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      const now = Date.now();
      if (now - globalLastShown >= cooldownRef.current) {
        globalLastShown = now;
        show();
      }
    }
  }, [isLoaded, show]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const showAd = useCallback((ignoreCooldown = false) => {
    if (!ADMOB_ENABLED) return false;
    const now = Date.now();
    if (!ignoreCooldown && now - globalLastShown < cooldownRef.current) return false;
    if (!isLoaded) {
      pendingShow.current = true;
      load();
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        if (pendingShow.current) {
          load();
        } else {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }, 2000);
      return false;
    }
    globalLastShown = now;
    show();
    return true;
  }, [ADMOB_ENABLED, isLoaded, load, show]);

  return { showAd, isLoaded, isClosed };
}
