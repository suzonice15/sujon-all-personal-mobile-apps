import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { useTheme } from '../../context/ThemeContext';
import { getReferralInfo } from '../../api/userApi';
import { getDeviceId } from '../../db/earnings';
import { getDB } from '../../db/db';
import { toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';

const sx = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 10, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  cardIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  cardValue: { fontSize: 16, fontWeight: 'bold', color: '#1F2937' },
  cardLabel: { fontSize: 9, color: '#6B7280', fontWeight: '500', marginTop: 2 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', marginHorizontal: 10, marginBottom: 6,
    borderRadius: 12, padding: 14,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  menuIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  menuDesc: { fontSize: 11, color: '#6B7280', marginTop: 2 },
});

const StatCard = ({ icon, iconBg, value, label }) => (
  <View style={sx.card}>
    <View style={[sx.cardIcon, { backgroundColor: iconBg }]}>
      <MaterialIcons name={icon} size={18} color={iconBg.replace('15', '')} />
    </View>
    <Text style={sx.cardValue}>{value}</Text>
    <Text style={sx.cardLabel}>{label}</Text>
  </View>
);

const MenuItem = ({ icon, iconBg, iconColor, title, desc, onPress }) => (
  <TouchableOpacity style={sx.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={[sx.menuIcon, { backgroundColor: iconBg }]}>
      <MaterialIcons name={icon} size={22} color={iconColor} />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={sx.menuTitle}>{title}</Text>
      <Text style={sx.menuDesc}>{desc}</Text>
    </View>
    <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
  </TouchableOpacity>
);

export default function ReferralScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(colors);
  const [copied, setCopied] = useState(false);
  const [refCode, setRefCode] = useState('-----');
  const [stats, setStats] = useState({ totalReferrals: 0, activeReferrals: 0, totalEarned: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      const db = await getDB();
      const [settings] = await db.executeSql("SELECT value FROM settings WHERE key = 'server_user_id'");
      if (settings.rows.length > 0) {
        setRefCode(settings.rows.item(0).value);
      }
    } catch (e) {}

    try {
      const deviceId = await getDeviceId();
      const res = await getReferralInfo(deviceId);
      if (res?.success && res?.data) {
        setStats({
          totalReferrals: res.data.stats?.total_referrals || 0,
          activeReferrals: res.data.stats?.active_referrals || 0,
          totalEarned: res.data.stats?.total_earned || 0,
        });
      }
    } catch (e) {}
    setLoading(false);
  };

  const handleCopy = () => {
    Clipboard.setString(refCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const go = (screen) => navigation.navigate(screen);

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
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={s.kpiRow}>
          <StatCard icon="group" iconBg="#EEF2FF" value={toBn(stats.totalReferrals)} label="Total" />
          <StatCard icon="person-pin" iconBg="#D1FAE5" value={toBn(stats.activeReferrals)} label="Active" />
          <StatCard icon="monetization-on" iconBg="#FEF3C7" value={toBn(stats.totalEarned)} label="Earned" />
          <StatCard icon="trending-up" iconBg="#EDE9FE" value="2%" label="Bonus" />
        </View>

        <View style={s.codeCard}>
          <View style={s.codeHeader}>
            <MaterialIcons name="share" size={16} color="#4F46E5" />
            <Text style={s.codeTitle}>Your Referral Code</Text>
          </View>
          <View style={s.codeBody}>
            <View style={s.codeBox}>
              <Text style={s.codeText}>{loading ? '-----' : refCode}</Text>
            </View>
            <TouchableOpacity style={s.copyBtn} onPress={handleCopy} activeOpacity={0.7}>
              <MaterialIcons name={copied ? 'check' : 'content-copy'} size={16} color="#fff" />
              <Text style={s.copyBtnText}>{copied ? 'Copied' : 'Copy'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={s.menuTitle}>বিভাগ</Text>

        <MenuItem icon="history" iconBg="#EEF2FF" iconColor="#4F46E5" title="রেফারেল ইতিহাস" desc="সকল রেফারেল কার্যকলাপ" onPress={() => go('ReferralHistory')} />
        <MenuItem icon="workspace-premium" iconBg="#FEF3C7" iconColor="#F59E0B" title="শীর্ষ অ্যাফিলিয়েট" desc="রেফারেল আয়ে সেরা" onPress={() => go('TopAffiliates')} />
        <MenuItem icon="emoji-events" iconBg="#FEF3C7" iconColor="#F59E0B" title="শীর্ষ আয়কারী" desc="সর্বোচ্চ কয়েন আয়কারী" onPress={() => go('TopEarners')} />
        <MenuItem icon="group-add" iconBg="#EDE9FE" iconColor="#8B5CF6" title="শীর্ষ রেফারার" desc="সর্বোচ্চ রেফারেলকারী" onPress={() => go('TopReferrers')} />
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
  kpiRow: { flexDirection: 'row', marginHorizontal: 10, marginTop: 10, gap: 6 },
  codeCard: { backgroundColor: colors.surface, marginHorizontal: 10, marginTop: 10, borderRadius: 14, padding: 14, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  codeHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  codeTitle: { fontSize: 13, fontWeight: '700', color: colors.text },
  codeBody: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  codeBox: { flex: 1, backgroundColor: colors.background, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1.5, borderColor: '#4F46E5', borderStyle: 'dashed' },
  codeText: { fontSize: 17, fontWeight: 'bold', color: '#4F46E5', letterSpacing: 2, textAlign: 'center' },
  copyBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#4F46E5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 14 },
  copyBtnText: { fontSize: 12, fontWeight: 'bold', color: '#fff' },
  menuTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginHorizontal: 10, marginTop: 14, marginBottom: 8 },
});
