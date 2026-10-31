import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import AdBanner from '../../components/ads/AdBanner';

const tabs = [
  { key: 'all', label: 'All', icon: 'list' },
  { key: 'processing', label: 'Processing', icon: 'sync' },
  { key: 'courier', label: 'With courier', icon: 'local-shipping' },
  { key: 'delivered', label: 'Delivered', icon: 'check-circle' },
  { key: 'returned', label: 'Returned', icon: 'assignment-return' },
  { key: 'cancelled', label: 'Cancelled', icon: 'cancel' },
];

const staticOrders = [
  { id: 'ORD-001', date: '28 Jun', items: 'HTML & CSS Handbook (2)', total: '320', status: 'delivered', name: 'Abdur Rahman', phone: '01711111111', address: 'Dhaka, Bangladesh' },
  { id: 'ORD-002', date: '25 Jun', items: 'Headphones (1)', total: '550', status: 'courier', name: 'Fatima Khatun', phone: '01722222222', address: 'Chattogram, Bangladesh' },
  { id: 'ORD-003', date: '22 Jun', items: 'Bluetooth Speaker (1)', total: '780', status: 'processing', name: 'Md. Ibrahim', phone: '01733333333', address: 'Rajshahi, Bangladesh' },
  { id: 'ORD-004', date: '20 Jun', items: 'Sticker Pack (3)', total: '450', status: 'processing', name: 'Ayesha Begum', phone: '01744444444', address: 'Khulna, Bangladesh' },
  { id: 'ORD-005', date: '18 Jun', items: 'Mechanical Keycaps (1)', total: '250', status: 'cancelled', name: 'Hasan Mia', phone: '01755555555', address: 'Sylhet, Bangladesh' },
  { id: 'ORD-006', date: '15 Jun', items: 'JavaScript: The Complete Guide (2)', total: '480', status: 'delivered', name: 'Mariam Jahan', phone: '01766666666', address: 'Barishal, Bangladesh' },
  { id: 'ORD-007', date: '12 Jun', items: 'Developer T-Shirt (1)', total: '360', status: 'returned', name: 'Umar Faruk', phone: '01777777777', address: 'Rangpur, Bangladesh' },
  { id: 'ORD-008', date: '10 Jun', items: 'HTML & CSS Handbook (1)', total: '150', status: 'delivered', name: 'Sadia Akter', phone: '01788888888', address: 'Mymensingh, Bangladesh' },
  { id: 'ORD-009', date: '08 Jun', items: 'Coder Hoodie (1)', total: '620', status: 'courier', name: 'Md. Tarik', phone: '01799999999', address: 'Dhaka, Bangladesh' },
  { id: 'ORD-010', date: '05 Jun', items: 'React in Practice (1)', total: '200', status: 'cancelled', name: 'Nadia Sultana', phone: '01811111111', address: 'Cumilla, Bangladesh' },
];

const statusConfig = {
  processing: { label: 'Processing', color: '#6366F1', bg: '#EEF2FF' },
  courier: { label: 'With courier', color: '#F59E0B', bg: '#FEF3C7' },
  delivered: { label: 'Delivered', color: '#059669', bg: '#D1FAE5' },
  returned: { label: 'Returned', color: '#EF4444', bg: '#FEE2E2' },
  cancelled: { label: 'Cancelled', color: '#6B7280', bg: '#F3F4F6' },
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
      <View style={{ flex: 1 }}>
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
                <MaterialIcons name={tab.icon} size={16} color={isActive ? '#fff' : '#6B7280'} />
                <Text style={[s.tabLabel, isActive && s.tabLabelActive]}>{tab.label}</Text>
                <View style={[s.tabCount, isActive && s.tabCountActive]}>
                  <Text style={[s.tabCountText, isActive && s.tabCountTextActive]}>{cnt}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, flexGrow: 1 }}>
        {filteredOrders.length === 0 ? (
          <View style={s.emptyBox}>
            <MaterialIcons name="inventory-2" size={40} color="#DDD" />
            <Text style={s.emptyText}>No orders</Text>
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
                    <Text style={s.totalLabel}>Total</Text>
                    <Text style={s.total}>৳{order.total}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        )}
        </ScrollView>
        <AdBanner />
      </View>
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
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 14,
    backgroundColor: '#F3F4F6',
  },
  tabActive: { backgroundColor: '#EF4444' },
  tabLabel: { fontSize: 13, fontWeight: '600', color: '#6B7280' },
  tabLabelActive: { color: '#fff' },
  tabCount: {
    minWidth: 15, height: 15, borderRadius: 8,
    backgroundColor: '#E5E7EB', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 3,
  },
  tabCountActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  tabCountText: { fontSize: 11, fontWeight: '700', color: '#6B7280' },
  tabCountTextActive: { color: '#fff' },
  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 12, marginBottom: 8,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 3,
    overflow: 'hidden',
  },
  left: { width: 4 },
  dotIndicator: { flex: 1 },
  body: { flex: 1, padding: 10 },
  row1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  id: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  pill: { borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  pillText: { fontSize: 12, fontWeight: '600' },
  row2: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  date: { fontSize: 12, color: '#9CA3AF' },
  dotSep: { fontSize: 12, color: '#D1D5DB' },
  items: { fontSize: 13, color: '#6B7280', flex: 1 },
  row3: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  totalLabel: { fontSize: 12, color: '#9CA3AF' },
  total: { fontSize: 15, fontWeight: 'bold', color: colors.primary },
  emptyBox: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 13, color: '#9CA3AF', marginTop: 6 },
});
