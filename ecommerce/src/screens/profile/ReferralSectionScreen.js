import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { useTheme } from '../../context/ThemeContext';
import { toBn } from '../../utils/helper';

const data = {
  ReferralHistory: {
    icon: 'history', color: '#4F46E5',
    items: [
      { id: 1, name: 'Fatema Begum', phone: '01715-638291', type: 'signup', coins: 0, date: '29 Jun 2026', time: '10:30 AM' },
      { id: 2, name: 'Rahim Mia', phone: '01712-384561', type: 'signup', coins: 0, date: '28 Jun 2026', time: '02:15 PM' },
      { id: 3, name: 'Karim Hossain', phone: '01718-927364', type: 'earning', coins: 12, date: '28 Jun 2026', time: '04:45 PM' },
      { id: 4, name: 'Rahim Mia', phone: '01712-384561', type: 'earning', coins: 8, date: '27 Jun 2026', time: '09:20 AM' },
      { id: 5, name: 'Fatema Begum', phone: '01715-638291', type: 'signup', coins: 0, date: '25 Jun 2026', time: '11:00 AM' },
      { id: 6, name: 'Abdur Rahman', phone: '01714-562738', type: 'signup', coins: 0, date: '24 Jun 2026', time: '03:30 PM' },
      { id: 7, name: 'Karim Hossain', phone: '01718-927364', type: 'earning', coins: 5, date: '23 Jun 2026', time: '06:10 PM' },
      { id: 8, name: 'Fatema Begum', phone: '01715-638291', type: 'earning', coins: 15, date: '22 Jun 2026', time: '01:00 PM' },
    ],
  },
  TopAffiliates: {
    icon: 'workspace-premium', color: '#F59E0B',
    items: [
      { rank: 1, name: 'Fatema Begum', referrals: 4, earned: 180, badge: 'gold' },
      { rank: 2, name: 'Rahim Mia', referrals: 3, earned: 120, badge: 'silver' },
      { rank: 3, name: 'Karim Hossain', referrals: 2, earned: 85, badge: 'bronze' },
      { rank: 4, name: 'Abdur Rahman', referrals: 1, earned: 30, badge: null },
    ],
  },
  TopEarners: {
    icon: 'emoji-events', color: '#F59E0B',
    items: [
      { rank: 1, name: 'Fatema Begum', coins: 3200, badge: 'gold' },
      { rank: 2, name: 'Rahim Mia', coins: 2450, badge: 'silver' },
      { rank: 3, name: 'Karim Hossain', coins: 1890, badge: 'bronze' },
      { rank: 4, name: 'Abdur Rahman', coins: 1200, badge: null },
      { rank: 5, name: 'Jahanara', coins: 980, badge: null },
    ],
  },
  TopReferrers: {
    icon: 'group-add', color: '#8B5CF6',
    items: [
      { rank: 1, name: 'Fatema Begum', count: 4, badge: 'gold' },
      { rank: 2, name: 'Rahim Mia', count: 3, badge: 'silver' },
      { rank: 3, name: 'Karim Hossain', count: 2, badge: 'bronze' },
      { rank: 4, name: 'Abdur Rahman', count: 1, badge: null },
      { rank: 5, name: 'Hasan Ali', count: 1, badge: null },
    ],
  },
};

const rankBg = { gold: '#FEF3C7', silver: '#F3F4F6', bronze: '#FEF3C7' };
const rankColors = { gold: '#F59E0B', silver: '#9CA3AF', bronze: '#CD7F32' };

const RankCard = ({ rank, badge, name, children }) => (
  <View style={sx.rankCard}>
    <View style={[sx.rankBadge, { backgroundColor: badge ? rankBg[badge] : '#F9FAFB' }]}>
      {badge ? (
        <MaterialIcons name="military-tech" size={16} color={rankColors[badge]} />
      ) : (
        <Text style={sx.rankNumber}>#{toBn(rank)}</Text>
      )}
    </View>
    <View style={sx.rankAvatar}>
      <Text style={sx.rankAvatarText}>{name.charAt(0)}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={sx.rankName}>{name}</Text>
      {children}
    </View>
  </View>
);

const HistoryCard = ({ item }) => (
  <View style={sx.historyCard}>
    <View style={[sx.historyDot, { backgroundColor: item.type === 'signup' ? '#4F46E5' : '#22C55E' }]} />
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Text style={sx.historyName}>{item.name}</Text>
        <View style={[sx.historyTag, { backgroundColor: item.type === 'signup' ? '#EEF2FF' : '#D1FAE5' }]}>
          <Text style={[sx.historyTagText, { color: item.type === 'signup' ? '#4F46E5' : '#22C55E' }]}>
            {item.type === 'signup' ? 'নতুন' : 'আয়'}
          </Text>
        </View>
      </View>
      <Text style={sx.historyMeta}>{item.phone}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
        <MaterialIcons name="calendar-today" size={10} color="#9CA3AF" />
        <Text style={sx.historyDate}>{item.date} • {item.time}</Text>
      </View>
    </View>
    {item.coins > 0 && (
      <View style={sx.historyCoinBox}>
        <MaterialIcons name="monetization-on" size={14} color="#22C55E" />
        <Text style={sx.historyCoinText}>+{toBn(item.coins)}</Text>
      </View>
    )}
  </View>
);

const sectionRenderers = {
  ReferralHistory: (info) => info.items.map((item, i) => <HistoryCard key={item.id} item={item} />),
  TopAffiliates: (info) => info.items.map((item, i) => (
    <RankCard key={i} rank={item.rank} badge={item.badge} name={item.name}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 3 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <MaterialIcons name="group" size={12} color="#9CA3AF" />
          <Text style={sx.rankStat}>{toBn(item.referrals)} রেফারেল</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <MaterialIcons name="monetization-on" size={12} color="#F59E0B" />
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#F59E0B' }}>+{toBn(item.earned)}</Text>
        </View>
      </View>
    </RankCard>
  )),
  TopEarners: (info) => info.items.map((item, i) => (
    <RankCard key={i} rank={item.rank} badge={item.badge} name={item.name}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 }}>
        <MaterialIcons name="monetization-on" size={14} color="#F59E0B" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#F59E0B' }}>{toBn(item.coins)}</Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>কয়েন</Text>
      </View>
    </RankCard>
  )),
  TopReferrers: (info) => info.items.map((item, i) => (
    <RankCard key={i} rank={item.rank} badge={item.badge} name={item.name}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 3 }}>
        <MaterialIcons name="group" size={14} color="#8B5CF6" />
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#8B5CF6' }}>{toBn(item.count)}</Text>
        <Text style={{ fontSize: 11, color: '#9CA3AF' }}>জন</Text>
      </View>
    </RankCard>
  )),
};

export default function ReferralSectionScreen({ navigation, route, section, title }) {
  const sectionKey = section || route?.params?.section;
  const sectionTitle = title || route?.params?.title;
  const { colors } = usePaperTheme();
  const { isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const s = styles(colors);
  const info = data[sectionKey];
  if (!info) return null;

  const renderer = sectionRenderers[sectionKey];

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <MaterialIcons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{sectionTitle}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <NotificationBell color="#fff" />
          <TouchableOpacity onPress={() => toggleTheme(!isDark)} style={{ marginLeft: 4 }}>
            <MaterialIcons name={isDark ? 'light-mode' : 'dark-mode'} size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={s.banner}>
          <MaterialIcons name={info.icon} size={20} color={info.color} />
          <Text style={s.bannerTitle}>{sectionTitle}</Text>
          <View style={[s.bannerBadge, { backgroundColor: info.color + '18' }]}>
            <Text style={[s.bannerBadgeText, { color: info.color }]}>{toBn(info.items.length)} টি</Text>
          </View>
        </View>

        <View style={s.list}>{renderer(info)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const sx = StyleSheet.create({
  rankCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 14, padding: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4,
  },
  rankBadge: {
    width: 34, height: 34, borderRadius: 17,
    justifyContent: 'center', alignItems: 'center',
  },
  rankNumber: { fontSize: 11, fontWeight: 'bold', color: '#9CA3AF' },
  rankAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center',
  },
  rankAvatarText: { fontSize: 14, fontWeight: 'bold', color: '#4F46E5' },
  rankName: { fontSize: 13, fontWeight: '700', color: '#1F2937' },
  rankStat: { fontSize: 11, color: '#6B7280', fontWeight: '500' },

  historyCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 14, padding: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4,
  },
  historyDot: { width: 10, height: 10, borderRadius: 5 },
  historyName: { fontSize: 13, fontWeight: '700', color: '#1F2937' },
  historyTag: { borderRadius: 5, paddingHorizontal: 6, paddingVertical: 1 },
  historyTagText: { fontSize: 9, fontWeight: '700' },
  historyMeta: { fontSize: 11, color: '#6B7280', marginTop: 1 },
  historyDate: { fontSize: 10, color: '#9CA3AF' },
  historyCoinBox: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: '#D1FAE5', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
  },
  historyCoinText: { fontSize: 12, fontWeight: 'bold', color: '#22C55E' },
});

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.headerBackground || colors.primary, paddingHorizontal: 12, paddingVertical: 12 },
  backBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 17, fontWeight: 'bold', color: colors.headerColor || '#fff' },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 12, marginTop: 14, marginBottom: 8 },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: colors.text, flex: 1 },
  bannerBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  bannerBadgeText: { fontSize: 10, fontWeight: '700' },
  list: { paddingHorizontal: 12, gap: 8 },
});
