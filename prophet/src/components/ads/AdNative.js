import { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  NativeAd,
  NativeAdView,
  NativeMediaView,
  NativeAsset,
  NativeAssetType,
} from 'react-native-google-mobile-ads';
import { ADMOB_ENABLED, AD_UNIT_ID_NATIVE } from '../../config/url';

export default function AdNative({ style }) {
  const [nativeAd, setNativeAd] = useState(null);
  const adRef = useRef(null);

  useEffect(() => {
    if (!ADMOB_ENABLED) return;
    (async () => {
      try {
        const ad = await NativeAd.createForAdRequest(AD_UNIT_ID_NATIVE);
        adRef.current = ad;
        setNativeAd(ad);
      } catch (e) {
        console.log('NativeAd load failed:', e);
      }
    })();
    return () => {
      if (adRef.current) adRef.current.destroy();
    };
  }, []);

  if (!ADMOB_ENABLED || !nativeAd) return null;

  return (
    <NativeAdView style={[s.container, style]} nativeAd={nativeAd}>
      <View style={s.adLabelWrap}>
        <View style={s.adLabel}>
          <Text style={s.adLabelText}>Ad</Text>
        </View>
      </View>
      <NativeMediaView style={s.media} />
      <View style={s.content}>
        <View style={s.header}>
          <NativeAsset assetType={NativeAssetType.ICON}>
            <Image style={s.icon} />
          </NativeAsset>
          <View style={s.headerText}>
            <NativeAsset assetType={NativeAssetType.HEADLINE}>
              <Text style={s.headline} />
            </NativeAsset>
            <NativeAsset assetType={NativeAssetType.BODY}>
              <Text style={s.body} />
            </NativeAsset>
          </View>
        </View>
        <NativeAsset assetType={NativeAssetType.CALL_TO_ACTION}>
          <TouchableOpacity style={s.cta}>
            <Text style={s.ctaText} />
          </TouchableOpacity>
        </NativeAsset>
      </View>
    </NativeAdView>
  );
}

const s = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'stretch',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adLabelWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  adLabel: {
    backgroundColor: '#9CA3AF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adLabelText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  media: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  headline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  body: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
    lineHeight: 18,
  },
  cta: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
});
