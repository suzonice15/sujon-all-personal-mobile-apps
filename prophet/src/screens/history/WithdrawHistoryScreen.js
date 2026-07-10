import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useCoins } from '../../context/CoinsContext';
import { getAllWithdrawRecords, updateWithdrawStatusByMatch, refundCoinsForRejected } from '../../db/withdraw';
import { getMyWithdraws } from '../../api/homeApi';
import { getMobileCoinRate } from '../../api/homeApi';
import { getDeviceId } from '../../db/earnings';
import { apps_slug } from '../../config/url';
import { isOnline, toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';

const tabs = [
  { id: 'all', label: 'সব', icon: 'receipt-long' },
  { id: 'withdraw', label: 'উইথড্র', icon: 'phone-iphone' },
  { id: 'recharge', label: 'রিচার্জ', icon: 'sim-card' },
];

const statusConfig = {
  pending: { label: 'প্রক্রিয়াধীন', color: '#F59E0B', icon: 'hourglass-empty' },
  approved: { label: 'সফল', color: '#22C55E', icon: 'check-circle' },
  rejected: { label: 'ব্যর্থ', color: '#EF4444', icon: 'cancel' },
};

const formatDateTime = (dt) => {
  if (!dt) return { date: '', time: '' };
  const parts = dt.split(' ');
  const datePart = parts[0] || '';
  const timePart = parts[1] || '';
  const d = new Date(dt.replace(' ', 'T'));
  if (isNaN(d.getTime())) return { date: datePart, time: timePart };
  const months = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রি', 'মে', 'জুন', 'জুলা', 'আগ', 'সেপ্ট', 'অক্টো', 'নভে', 'ডিসে'];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  let hours = d.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const mins = String(d.getMinutes()).padStart(2, '0');
  return {
    date: `${day} ${month}, ${year}`,
    time: `${toBn(String(hours).padStart(2, '0'))}:${toBn(mins)} ${ampm}`,
  };
};

const getMethodLabel = (item) => {
  if (item.type === 'recharge') {
    const simMap = {
      grameenphone: 'গ্রামীণফোন', robl: 'রবি', banglalink: 'বাংলালিংক', teletalk: 'টেলিটক',
    };
    return simMap[item.method] || item.method || 'রিচার্জ';
  }
  const methodMap = { bkash: 'বিকাশ', nagad: 'নগদ', rocket: 'রকেট' };
  return methodMap[item.method] || item.method || 'উইথড্র';
};

export default function WithdrawHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const { refreshCoins } = useCoins();
  const [activeTab, setActiveTab] = useState('all');
  const [records, setRecords] = useState([]);
  const [feeTk, setFeeTk] = useState(5);
  const [refreshing, setRefreshing] = useState(false);
  const pendingCount = {
    all: records.filter((r) => r.status === 'pending').length,
    withdraw: records.filter((r) => r.type === 'withdraw' && r.status === 'pending').length,
    recharge: records.filter((r) => r.type === 'recharge' && r.status === 'pending').length,
  };

  useEffect(() => {
    getMobileCoinRate().then((res) => {
      if (res?.success && res?.data) {
        setFeeTk(Number(res.data.withdraw_minimum_fee) || 5);
      }
    }).catch(() => {});
  }, []);

  useFocusEffect(useCallback(() => {
    loadRecords();
    syncStatusFromServer();
  }, []));

  const syncStatusFromServer = async () => {
    const online = await isOnline();
    if (!online) return;
    try {
      const deviceId = await getDeviceId();
      const res = await getMyWithdraws({ device_id: deviceId, slug: apps_slug });
           if (res?.success && res?.data) {
        const serverRecords = res.data;
        let refundedAny = false;
        for (const sr of serverRecords) {
          if (sr.id && sr.status && sr.status !== 'pending') {
            await updateWithdrawStatusByMatch(sr.type, sr.method, sr.account, sr.amount, sr.status, sr.transaction_id, sr.admin_note);
            if (sr.status === 'rejected') {
              const didRefund = await refundCoinsForRejected(sr.type, sr.method, sr.account, sr.amount, sr.coins_used, sr.coin_rate);
              if (didRefund) refundedAny = true;
            }
          }
        }
        if (refundedAny) {
          await refreshCoins();
        }
        loadRecords();
      }
    } catch (e) {
      // ignore
    }
  };

  const loadRecords = async () => {
    const data = await getAllWithdrawRecords();
    setRecords(data);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await syncStatusFromServer();
    await loadRecords();
    setRefreshing(false);
  }, []);

  const filteredData = activeTab === 'all'
    ? records
    : records.filter((item) => item.type === activeTab);

  const totalApproved = records.reduce((sum, r) => sum + (r.status === 'approved' ? (r.amount || 0) : 0), 0);
  const totalPending = records.reduce((sum, r) => sum + (r.status === 'pending' ? (r.amount || 0) : 0), 0);
  const totalRejected = records.reduce((sum, r) => sum + (r.status === 'rejected' ? (r.amount || 0) : 0), 0);

  const renderItem = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.pending;
    const isRecharge = item.type === 'recharge';
    const typeColor = isRecharge ? '#4F46E5' : '#E2136E';
    const typeIcon = isRecharge ? 'sim-card' : 'phone-iphone';
    const fmt = formatDateTime(item.created_at);
    return (
      <View style={s.card}>
        <View style={s.cardTop}>
          <View style={[s.typeCircle, { backgroundColor: typeColor + '15' }]}>
            <MaterialIcons name={typeIcon} size={14} color={typeColor} />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={s.cardTitle}>{isRecharge ? 'মোবাইল রিচার্জ' : 'বিকাশ উইথড্র'}</Text>
            <Text style={[s.cardMethod, { color: typeColor }]}>{getMethodLabel(item)}</Text>
          </View>
          <View style={[s.statusBadge, { backgroundColor: status.color + '20' }]}>
            <MaterialIcons name={status.icon} size={11} color={status.color} />
            <Text style={[s.statusText, { color: status.color }]}>{status.label}</Text>
          </View>
        </View>

        <View style={s.amountRow}>
          <Text style={s.amount}>{toBn(item.amount)}<Text style={s.amountUnit}> ৳</Text></Text>
          {item.account && (
            <View style={s.inlineInfo}>
              <MaterialIcons name={isRecharge ? 'smartphone' : 'phone-iphone'} size={12} color={colors.muted} />
              <Text style={s.inlineText}>{item.account}</Text>
            </View>
          )}
        </View>

        {item.transaction_id && (
          <View style={s.txRow}>
            <MaterialIcons name="receipt" size={12} color="#22C55E" />
            <Text style={[s.txText]}>TrxID: {item.transaction_id}</Text>
          </View>
        )}

        <View style={s.footerRow}>
          <MaterialIcons name="calendar-today" size={11} color={colors.muted} />
          <Text style={s.footerText}>{fmt.date}</Text>
          <View style={s.footerDot} />
          <MaterialIcons name="access-time" size={11} color={colors.muted} />
          <Text style={s.footerText}>{fmt.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <FlatList
        data={filteredData}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <>
            <View style={s.statsRow}>
              <View style={[s.statCard, { backgroundColor: '#22C55E' }]}>
                <MaterialIcons name="check-circle" size={16} color="#fff" />
                <Text style={s.statLabel}>সফল</Text>
                <Text style={s.statValue}>{toBn(totalApproved)}৳</Text>
              </View>
              <View style={[s.statCard, { backgroundColor: '#F59E0B' }]}>
                <MaterialIcons name="hourglass-empty" size={16} color="#fff" />
                <Text style={s.statLabel}>প্রক্রিয়াধীন</Text>
                <Text style={s.statValue}>{toBn(totalPending)}৳</Text>
              </View>
              <View style={[s.statCard, { backgroundColor: '#EF4444' }]}>
                <MaterialIcons name="cancel" size={16} color="#fff" />
                <Text style={s.statLabel}>ব্যর্থ</Text>
                <Text style={s.statValue}>{toBn(totalRejected)}৳</Text>
              </View>
            </View>

            <View style={s.actionRow}>
              <TouchableOpacity
                style={s.actionCardBkash}
                onPress={() => navigation.navigate('WithdrawRequest')}
                activeOpacity={0.85}
              >
                <View style={s.actionIconWrap}>
                  <MaterialIcons name="phone-iphone" size={28} color="#E2136E" />
                </View>
                <Text style={s.actionTitle}>বিকাশ উইথড্র</Text>
                <Text style={s.actionSub}>কয়েন → টাকা উত্তোলন</Text>
                <View style={s.actionFee}>
                  <MaterialIcons name="info" size={12} color="#fff" />
                  <Text style={s.actionFeeText}>ফি {feeTk} টাকা</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={s.actionCardRecharge}
                onPress={() => navigation.navigate('MobileRecharge')}
                activeOpacity={0.85}
              >
                <View style={s.actionIconWrap}>
                  <MaterialIcons name="sim-card" size={28} color="#4F46E5" />
                </View>
                <Text style={[s.actionTitle, { color: '#1e293b' }]}>মোবাইল রিচার্জ</Text>
                <Text style={[s.actionSub, { color: '#475569' }]}>কয়েন → রিচার্জ</Text>
                <View style={[s.actionFee, { backgroundColor: '#4F46E5' }]}>
                  <MaterialIcons name="check-circle" size={12} color="#fff" />
                  <Text style={s.actionFeeText}>কোনো ফি নেই</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={s.tabRow}>
              {tabs.map((tab) => {
                const active = activeTab === tab.id;
                const count = pendingCount[tab.id];
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[s.tab, active && s.tabActive]}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.7}
                  >
                    <MaterialIcons name={tab.icon} size={16} color={active ? '#4F46E5' : colors.muted} />
                    <Text style={[s.tabLabel, active && s.tabLabelActive]}>{tab.label}</Text>
                    {count > 0 && (
                      <View style={s.badge}>
                        <Text style={s.badgeText}>{count}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="receipt-long" size={36} color={colors.muted} />
            <Text style={s.emptyText}>কোনো {activeTab === 'withdraw' ? 'উইথড্র' : activeTab === 'recharge' ? 'রিচার্জ' : 'লেনদেন'} নেই</Text>
          </View>
        }
      />
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 2 },

  actionRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  actionCardBkash: {
    flex: 1,
    backgroundColor: '#FDF2F8',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  actionCardRecharge: {
    flex: 1,
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  actionTitle: { fontSize: 14, fontWeight: 'bold', color: '#9D174D', marginTop: 3 },
  actionSub: { fontSize: 12, color: '#9D174D', opacity: 0.7, marginTop: 1 },
  actionFee: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2136E',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  actionFeeText: { fontSize: 10, color: '#fff', fontWeight: '600', marginLeft: 2 },

  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabActive: { backgroundColor: '#EEF2FF' },
  tabLabel: { fontSize: 12, fontWeight: '600', color: colors.muted, marginLeft: 3 },
  tabLabelActive: { color: '#4F46E5' },
  badge: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    paddingHorizontal: 4,
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#fff' },

  card: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  typeCircle: {
    width: 28, height: 28, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
  },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: colors.text },
  cardMethod: { fontSize: 11, fontWeight: '600', marginTop: 0 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5,
  },
  statusText: { fontSize: 11, fontWeight: '600', marginLeft: 3 },
  amountRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 2,
  },
  amount: { fontSize: 20, fontWeight: 'bold', color: colors.text },
  amountUnit: { fontSize: 14, fontWeight: '400', color: colors.muted },
  inlineInfo: { flexDirection: 'row', alignItems: 'center' },
  inlineText: { fontSize: 12, color: colors.muted, marginLeft: 4 },
  txRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  txText: { fontSize: 12, color: '#22C55E', marginLeft: 4 },
  footerRow: { flexDirection: 'row', alignItems: 'center' },
  footerDot: {
    width: 3, height: 3, borderRadius: 1.5,
    backgroundColor: colors.muted, marginHorizontal: 6,
  },
  footerText: { fontSize: 11, color: colors.muted, marginLeft: 3 },
  empty: { justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  emptyText: { fontSize: 13, color: colors.muted, marginTop: 8 },
});
