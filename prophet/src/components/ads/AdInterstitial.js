import { useEffect, useRef } from 'react';
import { useInterstitialAd } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_INTERSTITIAL, AD_INTERSTITIAL_COOLDOWN } from '../../config/url';

export default function useAdInterstitial() {
  const lastShown = useRef(0);

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

  const showAd = (ignoreCooldown = false) => {
    if (!ADMOB_ENABLED) return false;
    const now = Date.now();
    if (!ignoreCooldown && now - lastShown.current < AD_INTERSTITIAL_COOLDOWN) return false;
    if (!isLoaded) {
      load();
      return false;
    }
    lastShown.current = now;
    show();
    return true;
  };

  return { showAd, isLoaded, isClosed };
}
