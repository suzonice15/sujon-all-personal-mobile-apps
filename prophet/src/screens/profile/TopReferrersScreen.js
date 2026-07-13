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

export default function TopReferrersScreen({ navigation }) {
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
      if (cached?.top_referrers) {
        setData(cached.top_referrers);
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
        <Text style={s.headerTitle}>শীর্ষ রেফারার</Text>
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
            <MaterialIcons name="group-add" size={20} color="#8B5CF6" />
            <Text style={s.bannerTitle}>শীর্ষ রেফারার</Text>
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
                  <View style={s.rankWrap}>
                    <Text style={s.rankText}>#{toBn(item.rank)}</Text>
                  </View>
                  <View style={s.avatar}>
                    <Text style={s.avatarText}>{(item.name || '?').charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.name}>{item.name}</Text>
                  </View>
                  <View style={s.countBox}>
                    <MaterialIcons name="group" size={16} color="#8B5CF6" />
                    <Text style={s.countText}>{toBn(item.count)}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
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
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 12, marginTop: 14, marginBottom: 8 },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  bannerBadge: { backgroundColor: '#EDE9FE', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  bannerBadgeText: { fontSize: 10, fontWeight: '700', color: '#8B5CF6' },
  list: { paddingHorizontal: 12, gap: 8 },
  card: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.surface, borderRadius: 14, padding: 12, elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4 },
  rankWrap: { width: 30, alignItems: 'center' },
  rankText: { fontSize: 12, fontWeight: 'bold', color: '#9CA3AF' },
  avatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#EDE9FE', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 15, fontWeight: 'bold', color: '#8B5CF6' },
  name: { fontSize: 14, fontWeight: '700', color: colors.text },
  countBox: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#EDE9FE', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  countText: { fontSize: 14, fontWeight: 'bold', color: '#8B5CF6' },
  empty: { textAlign: 'center', color: colors.muted || '#9CA3AF', fontSize: 13, marginTop: 30 },
});
