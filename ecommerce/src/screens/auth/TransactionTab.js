import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { getTransaction } from '../../api/transactionApi';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

export default function TransactionTab() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const fetchTransactions = useCallback(async (page = 1) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getTransaction(userId, page);
      setTransactions(res?.data || []);
      setTotal(res?.total || 0);
      setPerPage(res?.per_page || 10);
      setActivePage(page);
    } catch {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchTransactions(1);
  }, [fetchTransactions]);

  const totalPages = Math.max(1, Math.ceil(total / (perPage || 10)));

  return (
    <View style={[s.section, { backgroundColor: colors.surface }]}>
      <Text style={[s.sectionTitle, { color: colors.text }]}>Transaction History</Text>

      {loading ? (
        <View style={s.emptyState}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : transactions.length > 0 ? (
        <>
          {transactions.map((row, i) => (
            <View
              key={row.transaction_history_id || i}
              style={[s.row, i < transactions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.onSurface + '10' }]}
            >
              <View style={s.iconWrap}>
                <MaterialIcons name="account-balance-wallet" size={20} color="#27C34B" />
              </View>
              <View style={s.rowInfo}>
                <Text style={[s.txnId, { color: colors.text }]} numberOfLines={2}>{row.transaction_id}</Text>
                <Text style={[s.txnDate, { color: colors.onSurface + '60' }]}>{formatDate(row.created_at)}</Text>
              </View>
              <Text style={[s.amount, { color: colors.text }]}>{row.amount} BDT</Text>
            </View>
          ))}

          {total > perPage && (
            <View style={s.pagerRow}>
              <TouchableOpacity
                style={[s.pagerBtn, activePage <= 1 && s.pagerBtnDisabled]}
                onPress={() => fetchTransactions(activePage - 1)}
                disabled={activePage <= 1}
              >
                <MaterialIcons name="chevron-left" size={18} color="#fff" />
              </TouchableOpacity>
              <Text style={[s.pagerText, { color: colors.text }]}>Page {activePage} of {totalPages}</Text>
              <TouchableOpacity
                style={[s.pagerBtn, activePage >= totalPages && s.pagerBtnDisabled]}
                onPress={() => fetchTransactions(activePage + 1)}
                disabled={activePage >= totalPages}
              >
                <MaterialIcons name="chevron-right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={s.emptyState}>
          <MaterialIcons name="account-balance-wallet" size={48} color={colors.onSurface + '20'} />
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No transactions yet</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  section: { borderRadius: 14, padding: 18, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, gap: 12 },
  iconWrap: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: '#27C34B15',
    alignItems: 'center', justifyContent: 'center',
  },
  rowInfo: { flex: 1 },
  txnId: { fontSize: 13, fontWeight: '600' },
  txnDate: { fontSize: 11, marginTop: 3 },
  amount: { fontSize: 15, fontWeight: '800' },
  pagerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 12 },
  pagerBtn: { backgroundColor: '#27C34B', borderRadius: 8, padding: 6 },
  pagerBtnDisabled: { backgroundColor: '#9CA3AF' },
  pagerText: { fontSize: 13, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
});
