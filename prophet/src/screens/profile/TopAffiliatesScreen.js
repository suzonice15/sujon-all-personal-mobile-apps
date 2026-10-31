import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { useTheme } from '../../context/ThemeContext';
import { toBn } from '../../utils/helper';
import { getReferralCache } from '../../db/referral';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

const rankBg = { gold: '#FEF3C7', silver: '#F3F4F6', bronze: '#FEF3C7' };
const rankColors = { gold: '#F59E0B', silver: '#9CA3AF', bronze: '#CD7F32' };

export default function TopAffiliatesScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(colors);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const cached = await getReferralCache('leaderboard');
      if (cached?.top_affiliates) {
        setData(cached.top_affiliates);
      }
    } catch (e) {}
    setLoading(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>শীর্ষ অ্যাফিলিয়েট</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotificationBell color="#fff" />
          <TouchableOpacity onPress={() => toggleTheme(!isDark)} style={{ marginLeft: 4 }}>
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View style={s.banner}>
            <MaterialIcons name="workspace-premium" size={20} color="#F59E0B" />
            <Text style={s.bannerTitle}>শীর্ষ অ্যাফিলিয়েট</Text>
            <View style={s.bannerBadge}>
              <Text style={s.bannerBadgeText}>{toBn(data.length)} টি</Text>
            </View>
          </View>

          <View style={s.list}>
            {loading ? (
              <Text style={s.empty}>লোড হচ্ছে...</Text>
            ) : data.length === 0 ? (
              <Text style={s.empty}>কোনো তথ্য নেই</Text>
            ) : (
              data.map((item, i) => (
                <View key={i} style={s.card}>
                  <View style={[s.rankBadge, { backgroundColor: item.badge ? rankBg[item.badge] : '#F9FAFB' }]}>
                    {item.badge ? (
                      <MaterialIcons name="military-tech" size={16} color={rankColors[item.badge]} />
                    ) : (
                      <Text style={s.rankNumber}>#{toBn(item.rank)}</Text>
                    )}
                  </View>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{(item.name || '?').charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.name}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 3 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <MaterialIcons name="group" size={12} color="#9CA3AF" />
                        <Text style={s.stat}>{toBn(item.referrals)} রেফারেল</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
                        <MaterialIcons name="monetization-on" size={12} color="#F59E0B" />
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F59E0B' }}>+{toBn(item.earned)}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
                  <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
        
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
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 12, marginTop: 14, marginBottom: 8 },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  bannerBadge: { backgroundColor: '#FEF3C7', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  bannerBadgeText: { fontSize: 10, fontWeight: '700', color: '#F59E0B' },
  list: { paddingHorizontal: 12, gap: 8 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 14, padding: 12, elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  rankBadge: { width: 34, height: 34, borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  rankNumber: { fontSize: 11, fontWeight: 'bold', color: '#9CA3AF' },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 14, fontWeight: 'bold', color: '#4F46E5' },
  name: { fontSize: 13, fontWeight: '700', color: colors.text },
  stat: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
  empty: { textAlign: 'center', color: colors.muted || '#9CA3AF', fontSize: 13, marginTop: 30 },
});
