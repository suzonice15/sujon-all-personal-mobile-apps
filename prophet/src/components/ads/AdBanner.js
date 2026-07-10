import { useState } from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_BANNER } from '../../config/url';

export default function AdBanner({ size = BannerAdSize.BANNER, style }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!ADMOB_ENABLED || failed) return null;

  return (
    <View style={[{ alignItems: 'center' }, style, !loaded && { height: 0, overflow: 'hidden' }]}>
      <BannerAd
        unitId={AD_UNIT_ID_BANNER}
        size={size}
        onAdLoaded={() => setLoaded(true)}
        onAdFailedToLoad={(error) => {
          console.log('AdBanner failed:', error);
          setFailed(true);
        }}
      />
    </View>
  );
}
