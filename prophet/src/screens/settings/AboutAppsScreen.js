import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getAllAppSettings } from '../../db/appSettings';
import { api_url } from '../../config/url';
import { app_version, lastUpdate } from '../../config/url';
import AdBanner from '../../components/ads/AdBanner';
import useAdInterstitial from '../../components/ads/AdInterstitial';

const { width } = Dimensions.get('window');

export default function AboutAppsScreen() {
  const { colors } = useTheme();
  const [settings, setSettings] = useState(null);
  const { showAd } = useAdInterstitial();

  useEffect(() => {
    getAllAppSettings().then(setSettings);
    showAd();
  }, []);

  if (!settings) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ fontSize: 13, color: colors.onSurface, opacity: 0.5, marginTop: 10 }}>লোড হচ্ছে...</Text>
      </View>
    );
  }

  const title = settings.title || 'অ্যাপ';
  const version = app_version;
  const about = settings.about_apps || '';
  const baseUrl = api_url.replace(/\/api\/?$/, '');
  const imageUrl = settings.image ? baseUrl + settings.image : null;
  const iconName = settings.icon_name || 'android';
  const themeColor = settings.theme_color || colors.primary;
  const s = styles(themeColor, colors);

  const infoRows = [
    // { icon: 'info', label: 'অ্যাপের নাম', value: title },
    { icon: 'code', label: 'ভার্সন', value: version },
    { icon: 'phone-android', label: 'প্ল্যাটফর্ম', value: 'অ্যান্ড্রয়েড' },
    { icon: 'language', label: 'ভাষা', value: 'বাংলা' },
    ...(lastUpdate ? [{ icon: 'update', label: 'সর্বশেষ আপডেট', value: lastUpdate }] : []),
  ];

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.hero}>
          <View style={s.heroOverlay} />
          <View style={s.iconBox}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={s.appIcon} />
            ) : (
              <MaterialIcons name={iconName} size={52} color="#fff" />
            )}
          </View>
          <Text style={s.appName}>{title}</Text>
          <Text style={s.version}>ভার্সন {version}</Text>
        </View>

        <View style={s.card}>
          {infoRows.map((item, i, arr) => (
            <View key={i}>
              <View style={s.row}>
                <View style={s.rowLeft}>
                  <View style={s.iconWrap}>
                    <MaterialIcons name={item.icon} size={18} color={themeColor} />
                  </View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                </View>
                <Text style={s.rowValue}>{item.value}</Text>
              </View>
              {i < arr.length - 1 && <View style={s.divider} />}
            </View>
          ))}
        </View>

        {about ? (
          <View style={s.descCard}>
            <MaterialIcons name="info-outline" size={18} color={themeColor} style={{ marginBottom: 6 }} />
            <Text style={s.descTitle}>অ্যাপ সম্পর্কে</Text>
            <Text style={s.descText}>{about}</Text>
          </View>
        ) : null}
      </ScrollView>

      <AdBanner />
    </View>
  );
}

const styles = (themeColor, colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  hero: {
    backgroundColor: themeColor,
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
    position: 'relative',
    overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute',
    top: -width * 0.3,
    right: -width * 0.2,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconBox: {
    width: 90,
    height: 90,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 0,
  },
  appIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  version: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: 'hidden',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 14,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: themeColor + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { fontSize: 14, color: colors.onSurface },
  rowValue: { fontSize: 14, color: colors.onSurface, opacity: 0.5 },
  divider: { height: 1, backgroundColor: colors.background, marginLeft: 56 },
  descCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginHorizontal: 16,
    padding: 16,
    marginTop: 16,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  descTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.onSurface,
    marginBottom: 8,
  },
  descText: {
    fontSize: 14,
    color: colors.onSurface,
    opacity: 0.6,
    lineHeight: 22,
  },
});
