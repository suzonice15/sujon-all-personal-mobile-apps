import { useEffect, useRef, useState } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_REWARDED, AD_REWARDED_COOLDOWN } from '../../config/url';

const MAX_RETRIES = 3;
const RETRY_DELAY = 10000;

export default function useAdRewarded(onEarnedReward) {
  const lastShown = useRef(0);
  const retries = useRef(0);
  const pendingShow = useRef(false);
  const [rewardAmount, setRewardAmount] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const callbackRef = useRef(onEarnedReward);
  callbackRef.current = onEarnedReward;

  const { load, show, isLoaded, isClosed, isEarnedReward, error } = useRewardedAd(
    ADMOB_ENABLED ? AD_UNIT_ID_REWARDED : null,
  );

  useEffect(() => {
    if (ADMOB_ENABLED && !isLoaded) load();
  }, [isLoaded, load]);

  useEffect(() => {
    if (ADMOB_ENABLED && isClosed) load();
  }, [isClosed, load]);

  useEffect(() => {
    if (ADMOB_ENABLED && error) {
      console.log('Rewarded ad load error:', error);
      retries.current += 1;
      if (retries.current > MAX_RETRIES) {
        setLoadFailed(true);
        pendingShow.current = false;
        return;
      }
      const t = setTimeout(() => load(), RETRY_DELAY);
      return () => clearTimeout(t);
    }
  }, [error, load]);

  useEffect(() => {
    if (isLoaded) {
      retries.current = 0;
      setLoadFailed(false);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded && pendingShow.current) {
      pendingShow.current = false;
      lastShown.current = Date.now();
      show();
    }
  }, [isLoaded, show]);

  useEffect(() => {
    if (ADMOB_ENABLED && isEarnedReward) {
      const amount = isEarnedReward?.amount || 0;
      const type = isEarnedReward?.type || '';
      setRewardAmount({ amount, type });
      if (callbackRef.current) callbackRef.current({ amount, type });
    }
  }, [isEarnedReward]);

  const showAd = () => {
    if (!ADMOB_ENABLED) return false;
    const now = Date.now();
    if (now - lastShown.current < AD_REWARDED_COOLDOWN) return false;
    if (!isLoaded) {
      pendingShow.current = true;
      load();
      return false;
    }
    lastShown.current = now;
    show();
    return true;
  };

  return { showAd, isLoaded, rewardAmount, loadFailed };
}
