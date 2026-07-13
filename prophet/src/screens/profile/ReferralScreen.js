import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, useWindowDimensions, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { useTheme } from '../../context/ThemeContext';
import { getReferralCache } from '../../db/referral';
import { apps_title, published_app_slug } from '../../config/url';
import { toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';

export default function ReferralScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 29) / 4;
  const s = styles(colors);
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState('-----');
  const [stats, setStats] = useState({
    total_referrals: 0, month_referrals: 0,
    today_earned: 0, month_earned: 0, total_earned: 0,
    month_point_earned: 0,
    active_users: 0, inactive_users: 0,
  });
  const [referredBy, setReferredBy] = useState(null);
  const [loading, setLoading] = useState(true);

  const menus = [
    { screen: 'ReferralHistory', title: 'রেফারেল ইতিহাস', desc: 'সকল রেফারেল কার্যকলাপ', icon: 'history', icon_bg: '#EEF2FF', icon_color: '#4F46E5' },
    { screen: 'TopReferrers', title: 'শীর্ষ রেফারার', desc: 'সর্বোচ্চ রেফারেলকারী', icon: 'group-add', icon_bg: '#EDE9FE', icon_color: '#8B5CF6' },
    { screen: 'TopEarners', title: 'শীর্ষ আয়কারী', desc: 'সর্বোচ্চ কয়েন আয়কারী', icon: 'emoji-events', icon_bg: '#FEF3C7', icon_color: '#F59E0B' },

  ];

  useEffect(() => { loadReferralData(); }, []);

  const loadReferralData = async () => {
    try {
      const cached = await getReferralCache('referral_info');
      if (cached) {
        setRefCode(cached.referral_code);
        setStats(cached.stats);
        setReferredBy(cached.referred_by || null);
      }
    } catch (e) {}
    setLoading(false);
  };

  const handleCopy = () => {
    Clipboard.setString(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${apps_title}
অ্যাপটি ডাউনলোড করুন:
https://play.google.com/store/apps/details?id=${published_app_slug}${
          refCode && refCode !== '-----'
            ? `\n\nরেফারেল কোড: ${refCode}`
            : ""
        }`,
      });
    } catch (e) {}
  };

  const go = (screen) => navigation.navigate(screen);

  const items = [
    { icon: 'group', bg: '#E0E7FF', iconColor: '#4F46E5', value: toBn(stats.total_referrals), label: 'মোট রেফারেল' },
    { icon: 'person-add', bg: '#BBF7D0', iconColor: '#16A34A', value: toBn(stats.month_referrals), label: 'এই মাসের রেফারেল' },
    { icon: 'today', bg: '#FED7AA', iconColor: '#EA580C', value: toBn(stats.today_earned) + ' কয়েন', label: "আজকের  আয়" },
    { icon: 'date-range', bg: '#DDD6FE', iconColor: '#7C3AED', value: toBn(stats.month_earned) + ' কয়েন', label: 'এই মাসের  আয়' },
    { icon: 'monetization-on', bg: '#FECACA', iconColor: '#DC2626', value: toBn(stats.total_earned) + ' কয়েন', label: 'মোট  আয়' },
    { icon: 'stars', bg: '#E9D5FF', iconColor: '#9333EA', value: toBn(stats.month_point_earned) + ' পয়েন্ট', label: 'এই মাসের পয়েন্ট' },
    { icon: 'check-circle', bg: '#BBF7D0', iconColor: '#16A34A', value: toBn(stats.active_users), label: 'সক্রিয় রেফারেল' },
    { icon: 'remove-circle', bg: '#E5E7EB', iconColor: '#6B7280', value: toBn(stats.inactive_users), label: 'নিষ্ক্রিয় রেফারেল' },
  ];

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>রেফারেল</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotificationBell color="#fff" />
          <TouchableOpacity onPress={() => toggleTheme(!isDark)} style={{ marginLeft: 4 }}>
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={s.statsWrap}>
            {items.map((item, i) => (
              <View key={i} style={[s.statCard, { width: cardWidth }]}>
                <View style={[s.statIconWrap, { backgroundColor: item.bg }]}>
                  <MaterialIcons name={item.icon} size={18} color={item.iconColor} />
                </View>
                <Text style={s.statValue}>{item.value}</Text>
                <Text style={s.statLabel}>{item.label}</Text>
              </View>
            ))}
          </View>

          <View style={s.codeCard}>
            <View style={s.codeHeader}>
              <MaterialIcons name="share" size={16} color="#4F46E5" />
              <Text style={s.codeTitle}>রেফারেল কোড</Text>
            </View>
            <View style={s.codeBody}>
              <View style={s.codeBox}>
                <Text style={s.codeText}>{loading ? '-----' : refCode}</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <TouchableOpacity style={s.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
                  <MaterialIcons name={copied ? 'check' : 'content-copy'} size={16} color="#fff" />
                  <Text style={s.copyBtnText}>{copied ? 'কপি হয়েছে' : 'কপি'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.copyBtn, { backgroundColor: '#22C55E' }]} onPress={handleShare} activeOpacity={0.7}>
                  <MaterialIcons name="share" size={16} color="#fff" />
                  <Text style={s.copyBtnText}>শেয়ার</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {referredBy && (
            <View style={s.referrerCard}>
              <MaterialIcons name="person" size={16} color="#4F46E5" />
              <Text style={s.referrerLabel}>আপনাকে রেফার করেছেন</Text>
              <Text style={s.referrerName}>{referredBy.name}</Text>
              {referredBy.phone ? <Text style={s.referrerPhone}>{referredBy.phone}</Text> : null}
            </View>
          )}

          <Text style={s.menuTitle}>বিভাগ</Text>

          {menus.map((m, i) => (
            <TouchableOpacity key={i} style={s.menuItem} onPress={() => go(m.screen)} activeOpacity={0.7}>
              <View style={[s.menuIcon, { backgroundColor: m.icon_bg }]}>
                <MaterialIcons name={m.icon} size={22} color={m.icon_color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.menuTitleText}>{m.title}</Text>
                <Text style={s.menuDesc}>{m.desc}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.headerBackground || colors.primary, paddingHorizontal: 12, paddingVertical: 12 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: colors.headerColor || '#fff' },
  statsWrap: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 6, marginTop: 8, rowGap: 6, columnGap: 5 },
  statCard: { backgroundColor: colors.surface, borderRadius: 10, padding: 6, alignItems: 'center', elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 2 },
  statIconWrap: { width: 26, height: 26, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: colors.text, textAlign: 'center' },
  statLabel: { fontSize: 8, color: colors.muted || '#6B7280', fontWeight: '500', marginTop: 1, textAlign: 'center' },
  statLabel: { fontSize: 10, color: colors.muted || '#6B7280', fontWeight: '500', marginTop: 3, textAlign: 'center' },
  codeCard: { backgroundColor: colors.surface, marginHorizontal: 10, marginTop: 12, borderRadius: 14, padding: 14, elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  codeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  codeTitle: { fontSize: 13, fontWeight: '700', color: colors.text },
  codeBody: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  codeBox: { flex: 1, backgroundColor: colors.background, borderRadius: 10, paddingVertical: 7, paddingHorizontal: 12, borderWidth: 1.5, borderColor: '#4F46E5', borderStyle: 'dashed' },
  codeText: { fontSize: 17, fontWeight: 'bold', color: '#4F46E5', letterSpacing: 2, textAlign: 'center' },
  copyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  copyBtnText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
  menuTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginHorizontal: 10, marginTop: 14, marginBottom: 8 },
  referrerCard: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#EEF2FF', marginHorizontal: 10, marginTop: 12, borderRadius: 12, padding: 14 },
  referrerLabel: { fontSize: 12, color: '#6B7280' },
  referrerName: { fontSize: 14, fontWeight: '700', color: '#4F46E5' },
  referrerPhone: { fontSize: 12, color: '#9CA3AF' },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, marginHorizontal: 10, marginBottom: 6, borderRadius: 12, padding: 14, elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuTitleText: { fontSize: 14, fontWeight: '700', color: colors.text },
  menuDesc: { fontSize: 11, color: colors.muted || '#6B7280', marginTop: 2 },
});