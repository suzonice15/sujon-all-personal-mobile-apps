import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getRecentCoins } from '../../db/coins';
import { getPendingClaims } from '../../db/claims';
import { toBn } from '../../utils/helper';

const toDate = (str) => { const d = new Date(str); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
const today = () => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
const dayOffset = (offset) => { const d = new Date(); d.setDate(d.getDate() + offset); return d; };

const filters = [
  { key: 'pending', label: 'পেন্ডিং' },
  { key: 'today', label: 'আজকের' },
  { key: 'yesterday', label: 'গতকালের' },
  { key: '7days', label: 'গত ৭ দিনের' },
  { key: '30days', label: 'গত ৩০ দিনের' },
  { key: 'lastMonth', label: 'গত মাসের' },
  { key: 'all', label: 'সর্বমোট' },
];

const getFilteredData = (data, filterKey) => {
  const startOfToday = today();
  const startOfYesterday = dayOffset(-1);
  const startOf7Days = dayOffset(-7);
  const startOf30Days = dayOffset(-30);

  return data.filter((item) => {
    if (filterKey === 'pending') return item.type === 'pending';
    if (item.type === 'pending') return false;
    const itemDate = toDate(item.date);
    switch (filterKey) {
      case 'today': return itemDate >= startOfToday;
      case 'yesterday': return itemDate >= startOfYesterday && itemDate < startOfToday;
      case '7days': return itemDate >= startOf7Days;
      case '30days': return itemDate >= startOf30Days;
      case 'lastMonth': {
        const now = new Date();
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return itemDate >= startOfLastMonth && itemDate < startOfThisMonth;
      }
      default: return true;
    }
  });
};

const getTotalCoins = (data, filterKey) => {
  const filtered = getFilteredData(data, filterKey);
  return filtered.reduce((sum, item) => sum + Number(item.rawCoins), 0);
};

const MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];

const formatBnDateTime = (dateStr) => {
  const d = new Date(dateStr.replace(' ', 'T'));
  const day = toBn(d.getDate());
  const month = MONTHS[d.getMonth()];
  const year = toBn(d.getFullYear());
  const h = d.getHours();
  const ampm = h >= 12 ? 'পিএম' : 'এএম';
  const h12 = h % 12 || 12;
  const hours = toBn(h12);
  const mins = toBn(d.getMinutes().toString().padStart(2, '0'));
  return `${day} ${month} ${year}, ${hours}:${mins} ${ampm}`;
};

export default function CoinHistoryScreen() {
  const { colors } = useTheme();
  const s = styles(colors);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [allData, setAllData] = useState([]);
  const scrollRef = useRef(null);
  const btnPositions = useRef({});

  useFocusEffect(useCallback(() => {
    const load = async () => {
      const coinRows = await getRecentCoins(500);

      console.log('coinRows', coinRows);
      const pendingRows = await getPendingClaims();
      const mapType = (r) => {
        const t = r.type || 'income';
        if (t === 'withdraw') return 'spend';
        if (t === 'summation') return 'summation';
        return 'earn';
      };
      const mapped = [
        ...coinRows.map(r => ({
          id: `coin-${r.id}`,
          title: r.reason || 'কয়েন',
          coins: r.amount >= 0 ? `+${toBn(r.amount)}` : `${toBn(r.amount)}`,
          rawCoins: r.amount,
          date: r.earned_at,
          type: mapType(r),
          synced: r.synced || 0,
        })),
        ...pendingRows.map(r => ({
          id: `pending-${r.id}`,
          title: r.content_title || 'পেন্ডিং',
          coins: `+${toBn(r.amount)}`,
          rawCoins: r.amount,
          date: r.created_at,
          type: 'pending',
          synced: r.synced || 0,
        })),
      ];
      setAllData(mapped);
    };
    load();
  }, []));

  const filteredData = useMemo(() => getFilteredData(allData, selectedFilter), [allData, selectedFilter]);
  const totalCoins = useMemo(() => getTotalCoins(allData, selectedFilter), [allData, selectedFilter]);
// console.log('filteredData', filteredData);
  const renderItem = ({ item }) => {
    const isPending = item.type === 'pending';
    const isEarn = item.type === 'earn';
    const isSummation = item.type === 'summation';
    const isSynced = item.synced && item.synced > 0;
    const iconColor = isPending ? '#3B82F6' : isSummation ? '#8B5CF6' : isEarn ? '#22C55E' : '#EF4444';
    const iconName = isPending ? 'hourglass-empty' : isSummation ? 'archive' : isEarn ? 'add-circle' : 'remove-circle';
    return (
      <View style={s.card}>
        <View style={s.cardLeft}>
          <View style={[s.iconBox, { backgroundColor: isSynced ? '#10B981' + '20' : iconColor + '20' }]}>
            {isSynced ? (
              <MaterialIcons name="check" size={22} color="#10B981" />
            ) : (
              <MaterialIcons name={iconName} size={22} color={iconColor} />
            )}
          </View>
          <View style={s.cardInfo}>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.cardDate}>{formatBnDateTime(item.date)}</Text>
          </View>
        </View>
        <Text style={[s.coinAmount, { color: iconColor }]}>{item.coins}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.topRow}>
        <View style={s.totalBox}>
          <MaterialIcons name="monetization-on" size={22} color="#F59E0B" />
          <Text style={s.totalValue}>{toBn(totalCoins)}</Text>
          <Text style={s.totalLabel}>কয়েন</Text>
        </View>

        <View style={s.filterWrap}>
          <ScrollView
            ref={scrollRef}
            horizontal showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {filters.map((f) => (
              <TouchableOpacity
                key={f.key}
                style={[s.filterBtn, selectedFilter === f.key && s.filterBtnActive]}
                onPress={() => {
                  setSelectedFilter(f.key);
                  if (scrollRef.current) {
                    const item = btnPositions.current[f.key];
                    if (item) {
                      scrollRef.current.scrollTo({ x: Math.max(0, item.x - 8), animated: true });
                    }
                  }
                }}
                onLayout={(e) => { btnPositions.current[f.key] = e.nativeEvent.layout; }}
                activeOpacity={0.7}
              >
                <Text style={[s.filterBtnText, selectedFilter === f.key && s.filterBtnTextActive]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {filteredData.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="account-balance-wallet" size={48} color={colors.muted || '#999'} />
          <Text style={s.emptyText}>কোনো কয়েন হিস্টোরি নেই</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topRow: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 12, marginTop: 10, marginBottom: 4,
  },
  totalBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: 14,
    paddingVertical: 10, paddingHorizontal: 14, marginRight: 10,
    borderLeftWidth: 3, borderLeftColor: '#F59E0B',
  },
  totalLabel: { fontSize: 11, color: colors.muted || '#999', marginLeft: 4 },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#F59E0B' },
  filterWrap: { flex: 1, height: 36, justifyContent: 'center' },
  filterBtn: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14,
    backgroundColor: colors.surface, marginRight: 5,
    borderWidth: 1, borderColor: (colors.muted || '#999') + '40',
  },
  filterBtnActive: { backgroundColor: '#F59E0B', borderColor: '#F59E0B' },
  filterBtnText: { fontSize: 12, fontWeight: '500', color: colors.text },
  filterBtnTextActive: { color: '#fff', fontWeight: '700' },
  card: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 12, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
  },
  cardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBox: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardInfo: { marginLeft: 12 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  cardDate: { fontSize: 11, color: colors.muted || '#999', marginTop: 2 },
  coinAmount: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { fontSize: 15, color: colors.muted || '#999', marginTop: 12, textAlign: 'center' },
});
