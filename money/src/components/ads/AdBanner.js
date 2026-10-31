import { useState, useCallback } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_BANNER } from '../../config/url';

export default function AdBanner({ size = BannerAdSize.BANNER, style }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [adKey, setAdKey] = useState(0);

  const handleError = useCallback(() => {
    setFailed(true);
    setTimeout(() => { setFailed(false); setAdKey(k => k + 1); }, 30000);
  }, []);

  if (!ADMOB_ENABLED || failed) return null;

  return (
    <View style={[{ alignItems: 'center' }, style, !loaded && { height: 0, overflow: 'hidden' }]}>
      <BannerAd
        key={adKey}
        unitId={AD_UNIT_ID_BANNER}
        size={size}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={handleError}
      />
    </View>
  );
}
