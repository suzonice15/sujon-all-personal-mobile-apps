import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { getAllTransactions } from '../../api/homeApi';
import { getDeviceId } from '../../db/earnings';
import { apps_slug } from '../../config/url';
import { isOnline, toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';
import useAdInterstitial from '../../components/ads/AdInterstitial';

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
  const d = new Date(dt.replace(' ', 'T'));
  if (isNaN(d.getTime())) return { date: dt.split(' ')[0] || '', time: dt.split(' ')[1] || '' };
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

const maskAccount = (acc) => {
  if (!acc) return '';
  if (acc.length <= 4) return acc;
  const prefix = acc.slice(0, 3);
  const suffix = acc.slice(-4);
  const mid = '*'.repeat(Math.min(acc.length - 7, 5));
  return `${prefix}${mid}${suffix}`;
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

const getTodayStr = () => {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export default function AllTransactionHistoryScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [allRecords, setAllRecords] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const { showAd } = useAdInterstitial();

  useFocusEffect(useCallback(() => {
    fetchTransactions();
    showAd();
  }, []));

  const fetchTransactions = async () => {
    const online = await isOnline();
    if (!online) {
      setLoading(false);
      return;
    }
    try {
      const deviceId = await getDeviceId();
      const res = await getAllTransactions({ device_id: deviceId, slug: apps_slug });
      if (res?.success && res?.data) {
        setAllRecords(res.data);
      }
    } catch (e) {
      console.log('Fetch transactions failed:', e.message);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  }, []);

  const todayStr = getTodayStr();

  const visibleRecords = showTodayOnly
    ? allRecords.filter((r) => {
        const datePart = r.created_at ? r.created_at.split(' ')[0] : '';
        return datePart === todayStr;
      })
    : allRecords;

  const filteredData = activeTab === 'all'
    ? visibleRecords
    : visibleRecords.filter((item) => item.type === activeTab);

  const allForStats = showTodayOnly
    ? allRecords.filter((r) => (r.created_at ? r.created_at.split(' ')[0] : '') === todayStr)
    : allRecords;

  const statsFiltered = activeTab === 'all' ? allForStats : allForStats.filter((item) => item.type === activeTab);

  const totalApproved = statsFiltered.reduce((sum, r) => sum + (r.status === 'approved' ? (r.amount || 0) : 0), 0);
  const totalPending = statsFiltered.reduce((sum, r) => sum + (r.status === 'pending' ? (r.amount || 0) : 0), 0);
  const totalRejected = statsFiltered.reduce((sum, r) => sum + (r.status === 'rejected' ? (r.amount || 0) : 0), 0);

  const renderItem = ({ item }) => {
    const status = statusConfig[item.status] || statusConfig.pending;
    const isRecharge = item.type === 'recharge';
    const typeColor = isRecharge ? '#4F46E5' : '#E2136E';
    const fmt = formatDateTime(item.created_at);
    const displayName = item.name || item.user_name || '';
    const typeLabel = isRecharge ? 'মোবাইল রিচার্জ' : 'বিকাশ উইথড্র';
    return (
      <View style={s.card}>
        <View style={s.row}>
          <View style={s.leftCol}>
            <View style={s.typeRow}>
              <MaterialIcons name={isRecharge ? 'sim-card' : 'phone-iphone'} size={11} color={typeColor} />
              <Text style={[s.typeLabel, { color: typeColor }]}>{typeLabel} - {getMethodLabel(item)}</Text>
            </View>
            <View style={s.nameRow}>
              <MaterialIcons name="person" size={13} color={colors.muted} />
              <Text style={s.nameText} numberOfLines={1}>{displayName || 'অজানা'}</Text>
            </View>
            <View style={s.phoneRow}>
              <MaterialIcons name="call" size={11} color={colors.muted} />
              <Text style={s.phoneText}>{maskAccount(item.account)}</Text>
            </View>
            {item.transaction_id && (
              <View style={s.txRow}>
                <MaterialIcons name="receipt" size={11} color="#22C55E" />
                <Text style={s.txText}>TrxID: {item.transaction_id}</Text>
              </View>
            )}
          </View>

          <View style={s.rightCol}>
            <View style={[s.statusBadge, { backgroundColor: status.color + '20' }]}>
              <MaterialIcons name={status.icon} size={10} color={status.color} />
              <Text style={[s.statusText, { color: status.color }]}>{status.label}</Text>
            </View>
            <Text style={s.amount}>{toBn(item.amount)}<Text style={s.amountUnit}> ৳</Text></Text>
            <Text style={s.dateText}>{fmt.date} {fmt.time}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => String(item?.id ?? index)}
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

              <TouchableOpacity
                style={s.filterToggle}
                onPress={() => setShowTodayOnly(!showTodayOnly)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={showTodayOnly ? 'today' : 'calendar-view-week'}
                  size={16}
                  color={showTodayOnly ? '#4F46E5' : colors.muted}
                />
                <Text style={[s.filterToggleText, showTodayOnly && { color: '#4F46E5' }]}>
                  {showTodayOnly ? 'শুধু আজকের' : 'সব দেখুন'}
                </Text>
              </TouchableOpacity>

              <View style={s.tabRow}>
                {tabs.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <TouchableOpacity
                      key={tab.id}
                      style={[s.tab, active && s.tabActive]}
                      onPress={() => setActiveTab(tab.id)}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name={tab.icon} size={16} color={active ? '#4F46E5' : colors.muted} />
                      <Text style={[s.tabLabel, active && s.tabLabelActive]}>{tab.label}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          }
          ListEmptyComponent={
            loading ? (
              <View style={s.loadingContainer}>
                <ActivityIndicator size="large" color="#4F46E5" />
                <Text style={s.loadingText}>লোড হচ্ছে...</Text>
              </View>
            ) : (
              <View style={s.empty}>
                <MaterialIcons name="receipt-long" size={36} color={colors.muted} />
                <Text style={s.emptyText}>কোনো {activeTab === 'withdraw' ? 'উইথড্র' : activeTab === 'recharge' ? 'রিচার্জ' : 'লেনদেন'} নেই</Text>
              </View>
            )
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
    marginBottom: 8,
    gap: 8,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginTop: 2 },
  filterToggle: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    marginHorizontal: 16, marginBottom: 8,
    backgroundColor: colors.surface, borderRadius: 8,
    paddingVertical: 6, paddingHorizontal: 12,
    alignSelf: 'center',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  filterToggleText: { fontSize: 12, fontWeight: '600', color: colors.muted, marginLeft: 4 },
  tabRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: colors.muted + '30',
    backgroundColor: colors.surface,
  },
  tabActive: {
    backgroundColor: '#EEF2FF',
    borderColor: '#4F46E5',
  },
  tabLabel: { fontSize: 12, fontWeight: '600', color: colors.muted, marginLeft: 4 },
  tabLabelActive: { color: '#4F46E5' },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 12,
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  leftCol: { flex: 1, marginRight: 8 },
  rightCol: { alignItems: 'flex-end' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  nameText: { fontSize: 14, fontWeight: '600', color: colors.text, marginLeft: 4, flexShrink: 1 },
  typeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2, marginLeft: 1 },
  typeLabel: { fontSize: 11, fontWeight: '500', marginLeft: 4 },
  phoneRow: { flexDirection: 'row', alignItems: 'center' },
  phoneText: { fontSize: 12, color: colors.muted, marginLeft: 4 },
  txRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2, marginLeft: 1 },
  txText: { fontSize: 11, color: '#22C55E', marginLeft: 4 },
  statusBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 5,
    marginBottom: 4,
  },
  statusText: { fontSize: 10, fontWeight: '600', marginLeft: 3 },
  amount: { fontSize: 18, fontWeight: 'bold', color: colors.text, textAlign: 'right' },
  amountUnit: { fontSize: 13, fontWeight: '400', color: colors.muted },
  dateText: { fontSize: 11, color: colors.muted, marginTop: 2 },
  empty: { justifyContent: 'center', alignItems: 'center', paddingVertical: 30 },
  emptyText: { fontSize: 13, color: colors.muted, marginTop: 8 },
  loadingContainer: { justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  loadingText: { fontSize: 13, color: colors.muted, marginTop: 10 },
});
