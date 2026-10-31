import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import {
  getOrderByUserId,
  searchByOrderId,
  searchOrderByOrderStatus,
  totalOrderStatus,
} from '../../api/orderApi';

const STATUS_FILTERS = [
  { key: 'all', label: 'All', countKey: 'all' },
  { key: 'Pending', label: 'Pending', countKey: 'Pending' },
  { key: 'Confirm', label: 'Confirm', countKey: 'Confirm' },
  { key: 'Processing', label: 'Processing', countKey: 'Processing' },
  { key: 'Shipped', label: 'Shipped', countKey: 'Shipped' },
  { key: 'Delivered', label: 'Delivered', countKey: 'Delivered' },
  { key: 'Cancel', label: 'Cancel', countKey: 'Cancel' },
];


const currencyFormat = (num) => {
  const n = Number(num) || 0;
  return '৳ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
};

export default function OrdersTab() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation();
  const userId = user?.id;

  const [orderStatus, setOrderStatus] = useState('all');
  const [searchValue, setSearchValue] = useState('');
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});

  const applyResult = (res, page) => {
    setOrders(res?.data || []);
    setTotal(res?.total || 0);
    setPerPage(res?.per_page || 10);
    setActivePage(page);
  };

  const fetchOrders = useCallback(async (page = 1) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getOrderByUserId(userId, 'all', page);
      applyResult(res, page);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchStatusCounts = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await totalOrderStatus(userId);
      setStatusCounts(res || {});
    } catch {}
  }, [userId]);

  useEffect(() => {
    fetchOrders(1);
    fetchStatusCounts();
  }, [userId]);

  const handleStatusFilter = async (status) => {
    setOrderStatus(status);
    setSearchValue('');
    if (!userId) return;
    setLoading(true);
    try {
      const res = await searchOrderByOrderStatus(userId, status, 1);
      applyResult(res, 1);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text) => {
    setSearchValue(text);
    if (!userId) return;
    if (text.trim().length > 0) {
      try {
        const res = await searchByOrderId(userId, text.trim(), activePage);
        applyResult(res, activePage);
      } catch {
        setOrders([]);
      }
    } else {
      fetchOrders(1);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    if (searchValue.trim().length > 0) {
      searchByOrderId(userId, searchValue.trim(), page).then(res => applyResult(res, page)).catch(() => {});
    } else if (orderStatus !== 'all') {
      searchOrderByOrderStatus(userId, orderStatus, page).then(res => applyResult(res, page)).catch(() => {});
    } else {
      fetchOrders(page);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / (perPage || 10)));

  return (
    <View style={[s.section, { backgroundColor: colors.surface }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow}>
        {STATUS_FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              s.filterChip,
              { backgroundColor: orderStatus === f.key ? '#EF4444' : '#27C34B' },
            ]}
            onPress={() => handleStatusFilter(f.key)}
          >
            <Text style={s.filterChipText}>{f.label}</Text>
            <View style={s.filterBadge}>
              <Text style={s.filterBadgeText}>{statusCounts[f.countKey] ?? 0}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TextInput
        style={[s.searchInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
        placeholder="Enter Invoice Number"
        placeholderTextColor={colors.onSurface + '50'}
        value={searchValue}
        onChangeText={handleSearch}
      />

      {loading ? (
        <View style={s.emptyState}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : orders.length > 0 ? (
        <>
          {orders.map((order) => {
            const unpaid = Number(order.paid_amount) < Number(order.order_total);
            return (
              <TouchableOpacity
                key={order.order_id}
                style={[s.orderCard, { borderColor: colors.onSurface + '15' }]}
                onPress={() => navigation.navigate('OrderDetail', {
                  order_id: order.order_id,
                  invoice_id: order.invoice_id,
                  created_time: order.created_time,
                  customer_phone: order.customer_phone,
                })}
                activeOpacity={0.7}
              >
                <View style={s.orderCardTop}>
                  <Text style={[s.invoiceText, { color: colors.text }]}>#{order.invoice_id}</Text>
                  <Text style={[s.statusBadge]}>{order.order_status}</Text>
                </View>
                <Text style={[s.orderDate, { color: colors.onSurface + '70' }]}>{formatDateTime(order.created_time)}</Text>
                <View style={s.orderCardBottom}>
                  <Text style={[s.orderAmount, { color: colors.text }]}>{currencyFormat(order.order_total)}</Text>
                  <Text style={[s.payBadge, unpaid ? s.payBadgeUnpaid : s.payBadgePaid]}>
                    {unpaid ? 'Unpaid' : 'Paid'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {total > perPage && (
            <View style={s.pagerRow}>
              <TouchableOpacity
                style={[s.pagerBtn, activePage <= 1 && s.pagerBtnDisabled]}
                onPress={() => goToPage(activePage - 1)}
                disabled={activePage <= 1}
              >
                <MaterialIcons name="chevron-left" size={18} color="#fff" />
              </TouchableOpacity>
              <Text style={[s.pagerText, { color: colors.text }]}>Page {activePage} of {totalPages}</Text>
              <TouchableOpacity
                style={[s.pagerBtn, activePage >= totalPages && s.pagerBtnDisabled]}
                onPress={() => goToPage(activePage + 1)}
                disabled={activePage >= totalPages}
              >
                <MaterialIcons name="chevron-right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={s.emptyState}>
          <MaterialIcons name="receipt-long" size={48} color={colors.onSurface + '20'} />
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>There are no orders</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  section: { borderRadius: 14, padding: 18, marginBottom: 16 },
  filterRow: { flexDirection: 'row', marginBottom: 14 },
  filterChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6, marginRight: 8,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
  },
  filterChipText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  filterBadge: { backgroundColor: '#EF4444', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 1 },
  filterBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  searchInput: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 44, fontSize: 14, marginBottom: 16 },
  orderCard: { borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 10 },
  orderCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  invoiceText: { fontSize: 14, fontWeight: '700' },
  statusBadge: {
    backgroundColor: '#0EA5E9', color: '#fff', fontSize: 11, fontWeight: '700',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden',
  },
  orderDate: { fontSize: 12, marginTop: 4 },
  orderCardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  orderAmount: { fontSize: 15, fontWeight: '800' },
  payBadge: { fontSize: 11, fontWeight: '700', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, overflow: 'hidden', color: '#fff' },
  payBadgePaid: { backgroundColor: '#22C55E' },
  payBadgeUnpaid: { backgroundColor: '#EF4444' },
  pagerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 8 },
  pagerBtn: { backgroundColor: '#27C34B', borderRadius: 8, padding: 6 },
  pagerBtnDisabled: { backgroundColor: '#9CA3AF' },
  pagerText: { fontSize: 13, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
});
