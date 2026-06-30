import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

const tabs = [
  { key: 'all', label: 'সব', icon: 'list' },
  { key: 'processing', label: 'প্রক্রিয়াধীন', icon: 'sync' },
  { key: 'courier', label: 'কুরিয়ারে', icon: 'local-shipping' },
  { key: 'delivered', label: 'ডেলিভারি', icon: 'check-circle' },
  { key: 'returned', label: 'রিটার্ন', icon: 'assignment-return' },
  { key: 'cancelled', label: 'বাতিল', icon: 'cancel' },
];

const staticOrders = [
  { id: 'ORD-001', date: '২৮ জুন', items: 'রাসুলুল্লাহ (সা) এর জীবনী (২টি)', total: '৩২০', status: 'delivered', name: 'আব্দুর রহমান', phone: '০১৭১১১১১১১১', address: 'ঢাকা, বাংলাদেশ' },
  { id: 'ORD-002', date: '২৫ জুন', items: 'সহিহ বুখারি (১টি)', total: '৫৫০', status: 'courier', name: 'ফাতিমা খাতুন', phone: '০১৭২২২২২২২২', address: 'চট্টগ্রাম, বাংলাদেশ' },
  { id: 'ORD-003', date: '২২ জুন', items: 'তাফসির ইবনে কাসির (১টি)', total: '৭৮০', status: 'processing', name: 'মোঃ ইব্রাহিম', phone: '০১৭৩৩৩৩৩৩৩৩', address: 'রাজশাহী, বাংলাদেশ' },
  { id: 'ORD-004', date: '২০ জুন', items: 'ইসলামের ইতিহাস (৩টি)', total: '৪৫০', status: 'processing', name: 'আয়েশা বেগম', phone: '০১৭৪৪৪৪৪৪৪৪', address: 'খুলনা, বাংলাদেশ' },
  { id: 'ORD-005', date: '১৮ জুন', items: 'কুরআন মাজিদ (১টি)', total: '২৫০', status: 'cancelled', name: 'হাসান মিয়া', phone: '০১৭৫৫৫৫৫৫৫৫', address: 'সিলেট, বাংলাদেশ' },
  { id: 'ORD-006', date: '১৫ জুন', items: 'হাদিস সংগ্রহ (২টি)', total: '৪৮০', status: 'delivered', name: 'মরিয়ম জাহান', phone: '০১৭৬৬৬৬৬৬৬৬', address: 'বরিশাল, বাংলাদেশ' },
  { id: 'ORD-007', date: '১২ জুন', items: 'সীরাত গ্রন্থ (১টি)', total: '৩৬০', status: 'returned', name: 'উমর ফারুক', phone: '০১৭৭৭৭৭৭৭৭৭', address: 'রংপুর, বাংলাদেশ' },
  { id: 'ORD-008', date: '১০ জুন', items: 'দোয়ার বই (১টি)', total: '১৫০', status: 'delivered', name: 'সাদিয়া আক্তার', phone: '০১৭৮৮৮৮৮৮৮৮', address: 'ময়মনসিংহ, বাংলাদেশ' },
  { id: 'ORD-009', date: '০৮ জুন', items: 'ফিকহুল ইসলাম (১টি)', total: '৬২০', status: 'courier', name: 'মোঃ তারিক', phone: '০১৭৯৯৯৯৯৯৯৯', address: 'ঢাকা, বাংলাদেশ' },
  { id: 'ORD-010', date: '০৫ জুন', items: 'তাজবিদ শিক্ষা (১টি)', total: '২০০', status: 'cancelled', name: 'নাদিয়া সুলতানা', phone: '০১৮১১১১১১১১', address: 'কুমিল্লা, বাংলাদেশ' },
];

const statusConfig = {
  processing: { label: 'প্রক্রিয়াধীন', color: '#6366F1', bg: '#EEF2FF' },
  courier: { label: 'কুরিয়ারে', color: '#F59E0B', bg: '#FEF3C7' },
  delivered: { label: 'ডেলিভারি', color: '#059669', bg: '#D1FAE5' },
  returned: { label: 'রিটার্ন', color: '#EF4444', bg: '#FEE2E2' },
  cancelled: { label: 'বাতিল', color: '#6B7280', bg: '#F3F4F6' },
};

export default function OrderHistoryScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('all');
  const { colors } = useTheme();
  const s = styles(colors);

  const counts = tabs.reduce((acc, t) => {
    acc[t.key] = t.key === 'all' ? staticOrders.length : staticOrders.filter(o => o.status === t.key).length;
    return acc;
  }, {});

  const filteredOrders = activeTab === 'all'
    ? staticOrders
    : staticOrders.filter((o) => o.status === activeTab);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.tabRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, gap: 6 }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const cnt = counts[tab.key];
            return (
              <TouchableOpacity
                key={tab.key}
                style={[s.tab, isActive && s.tabActive]}
                onPress={() => setActiveTab(tab.key)}
              >
                <MaterialIcons name={tab.icon} size={13} color={isActive ? '#fff' : '#6B7280'} />
                <Text style={[s.tabLabel, isActive && s.tabLabelActive]}>{tab.label}</Text>
                <View style={[s.tabCount, isActive && s.tabCountActive]}>
                  <Text style={[s.tabCountText, isActive && s.tabCountTextActive]}>{cnt}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, paddingBottom: 24 }}>
        {filteredOrders.length === 0 ? (
          <View style={s.emptyBox}>
            <MaterialIcons name="inventory-2" size={40} color="#DDD" />
            <Text style={s.emptyText}>কোনো অর্ডার নেই</Text>
          </View>
        ) : (
          filteredOrders.map((order) => {
            const st = statusConfig[order.status];
            return (
              <TouchableOpacity key={order.id} style={s.card} onPress={() => navigation.navigate('OrderDetail', { order })} activeOpacity={0.7}>
                <View style={s.left}>
                  <View style={[s.dotIndicator, { backgroundColor: st.color }]} />
                </View>
                <View style={s.body}>
                  <View style={s.row1}>
                    <Text style={s.id}>{order.id}</Text>
                    <View style={[s.pill, { backgroundColor: st.bg }]}>
                      <Text style={[s.pillText, { color: st.color }]}>{st.label}</Text>
                    </View>
                  </View>
                  <View style={s.row2}>
                    <MaterialIcons name="calendar-today" size={9} color="#9CA3AF" />
                    <Text style={s.date}>{order.date}</Text>
                    <Text style={s.dotSep}>·</Text>
                    <Text style={s.items} numberOfLines={1}>{order.items}</Text>
                  </View>
                  <View style={s.row3}>
                    <Text style={s.totalLabel}>মোট</Text>
                    <Text style={s.total}>৳{order.total}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  tabRow: {
    backgroundColor: '#fff', paddingVertical: 6,
    borderBottomWidth: 0.5, borderBottomColor: '#E5E7EB',
  },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14,
    backgroundColor: '#F3F4F6',
  },
  tabActive: { backgroundColor: '#EF4444' },
  tabLabel: { fontSize: 10, fontWeight: '600', color: '#6B7280' },
  tabLabelActive: { color: '#fff' },
  tabCount: {
    minWidth: 15, height: 15, borderRadius: 8,
    backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 3,
  },
  tabCountActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  tabCountText: { fontSize: 8, fontWeight: '700', color: '#6B7280' },
  tabCountTextActive: { color: '#fff' },
  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 8,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
    overflow: 'hidden',
  },
  left: { width: 4 },
  dotIndicator: { flex: 1 },
  body: { flex: 1, padding: 10 },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  id: { fontSize: 11, fontWeight: '700', color: '#1F2937' },
  pill: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  pillText: { fontSize: 9, fontWeight: '600' },
  row2: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  date: { fontSize: 9, color: '#9CA3AF' },
  dotSep: { fontSize: 9, color: '#D1D5DB' },
  items: { fontSize: 10, color: '#6B7280', flex: 1 },
  row3: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  totalLabel: { fontSize: 9, color: '#9CA3AF' },
  total: { fontSize: 12, fontWeight: 'bold', color: colors.primary },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 13, color: '#9CA3AF', marginTop: 6 },
});
