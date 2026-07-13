import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getAllAppSettings } from '../../db/appSettings';
import AdBanner from '../../components/ads/AdBanner';
import useAdInterstitial from '../../components/ads/AdInterstitial';

const { width } = Dimensions.get('window');

export default function AboutDeveloperScreen() {
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

  const name = settings.developer_name || 'ডেভেলপার';
  const role = settings.developer_skills || 'ডেভেলপার';
  const about = settings.about_developer || settings.about_dev || '';
  const email = settings.email || '';
  const website = settings.website || '';
  const address = settings.address || '';
  const themeColor = settings.theme_color || colors.primary;
  const iconName = settings.developer_icon || 'person';
  const s = styles(themeColor, colors);

  const contactRows = [
    ...(email ? [{ icon: 'email', label: 'ইমেইল', value: email, link: `mailto:${email}` }] : []),
    ...(website ? [{ icon: 'language', label: 'ওয়েবসাইট', value: website, link: website.startsWith('http') ? website : `https://${website}` }] : []),
    ...(address ? [{ icon: 'location-on', label: 'অবস্থান', value: address, link: null }] : []),
  ];

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.hero}>
          <View style={s.heroOverlay} />
          <View style={s.avatar}>
            <MaterialIcons name={iconName} size={40} color="#fff" />
          </View>
          <Text style={s.name}>{name}</Text>
          <Text style={s.role}>{role}</Text>
        </View>

        {contactRows.length > 0 && (
          <View style={s.card}>
            {contactRows.map((item, i, arr) => (
              <View key={i}>
                <TouchableOpacity
                  style={s.row}
                  onPress={() => item.link && Linking.openURL(item.link)}
                  activeOpacity={item.link ? 0.6 : 1}
                >
                  <View style={s.rowLeft}>
                    <View style={s.iconWrap}>
                      <MaterialIcons name={item.icon} size={18} color={themeColor} />
                    </View>
                    <View>
                      <Text style={s.rowLabel}>{item.label}</Text>
                      <Text style={s.rowValue}>{item.value}</Text>
                    </View>
                  </View>
                  {item.link && <MaterialIcons name="chevron-right" size={20} color={colors.onSurface} style={{ opacity: 0.3 }} />}
                </TouchableOpacity>
                {i < arr.length - 1 && <View style={s.divider} />}
              </View>
            ))}
          </View>
        )}

        {about ? (
          <View style={s.descCard}>
            <MaterialIcons name="info-outline" size={18} color={themeColor} style={{ marginBottom: 6 }} />
            <Text style={s.descTitle}>পরিচিতি</Text>
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
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
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
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  role: {
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
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: themeColor + '15',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { fontSize: 12, color: colors.onSurface, opacity: 0.5 },
  rowValue: { fontSize: 14, color: colors.onSurface, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.background, marginLeft: 62 },
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
