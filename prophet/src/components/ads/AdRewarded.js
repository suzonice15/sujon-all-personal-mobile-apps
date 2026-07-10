import { useEffect, useRef, useState } from 'react';
import { useRewardedAd } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_REWARDED, AD_REWARDED_COOLDOWN } from '../../config/url';

export default function useAdRewarded(onEarnedReward) {
  const lastShown = useRef(0);
  const [rewardAmount, setRewardAmount] = useState(null);

  const { load, show, isLoaded, isClosed, isEarnedReward } = useRewardedAd(
    ADMOB_ENABLED ? AD_UNIT_ID_REWARDED : null,
  );

  useEffect(() => {
    if (ADMOB_ENABLED && !isLoaded) load();
  }, [ADMOB_ENABLED, isLoaded, load]);

  useEffect(() => {
    if (ADMOB_ENABLED && isClosed) load();
  }, [ADMOB_ENABLED, isClosed, load]);

  useEffect(() => {
    if (ADMOB_ENABLED && isEarnedReward) {
      const amount = isEarnedReward?.amount || 0;
      const type = isEarnedReward?.type || '';
      setRewardAmount({ amount, type });
      if (onEarnedReward) onEarnedReward({ amount, type });
    }
  }, [ADMOB_ENABLED, isEarnedReward, onEarnedReward]);

  const showAd = () => {
    if (!ADMOB_ENABLED) return false;
    const now = Date.now();
    if (now - lastShown.current < AD_REWARDED_COOLDOWN) return false;
    if (!isLoaded) {
      load();
      return false;
    }
    lastShown.current = now;
    show();
    return true;
  };

  return { showAd, isLoaded, rewardAmount };
}
