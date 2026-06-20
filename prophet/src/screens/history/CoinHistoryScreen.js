import React, { useState, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const today = new Date();
const toDateStr = (d) => d.toISOString().slice(0, 10);

const day = (offset) => toDateStr(new Date(today.getTime() + offset * 86400000));

const placeholderData = [
  { id: '1', title: 'গল্প পড়া', coins: '+10', date: day(0), type: 'earn' },
  { id: '2', title: 'কুইজে অংশগ্রহণ', coins: '+5', date: day(0), type: 'earn' },
  { id: '3', title: 'দৈনিক বোনাস', coins: '+2', date: day(-1), type: 'earn' },
  { id: '4', title: 'গল্প শেয়ার', coins: '+8', date: day(-1), type: 'earn' },
  { id: '5', title: 'বই পড়া', coins: '+6', date: day(-2), type: 'earn' },
  { id: '6', title: 'উপহার পাঠানো', coins: '-5', date: day(-2), type: 'spend' },
  { id: '7', title: 'ভিডিও দেখুন', coins: '+4', date: day(-4), type: 'earn' },
  { id: '8', title: 'রেফার বোনাস', coins: '+15', date: day(-8), type: 'earn' },
  { id: '9', title: 'গল্প পড়া', coins: '+10', date: day(-15), type: 'earn' },
  { id: '10', title: 'কুইজে অংশগ্রহণ', coins: '+5', date: day(-25), type: 'earn' },
  { id: '11', title: 'গল্প পড়া (পেন্ডিং)', coins: '+3', date: day(0), type: 'pending' },
  { id: '12', title: 'কুইজ বোনাস (পেন্ডিং)', coins: '+7', date: day(0), type: 'pending' },
  { id: '13', title: 'দৈনিক বোনাস (পেন্ডিং)', coins: '+2', date: day(-3), type: 'pending' },
];

const filters = [
  { key: 'pending', label: 'পেন্ডিং' },
  { key: 'today', label: 'আজকের' },
  { key: 'yesterday', label: 'গতকালের' },
  { key: '7days', label: 'গত ৭ দিনের' },
  { key: '30days', label: 'গত ৩০ দিনের' },
  { key: 'all', label: 'সর্বমোট' },
];

const toDate = (str) => { const d = new Date(str); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };

const getFilteredData = (data, filterKey) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday.getTime() - 86400000);
  const startOf7Days = new Date(startOfToday.getTime() - 7 * 86400000);
  const startOf30Days = new Date(startOfToday.getTime() - 30 * 86400000);

  return data.filter((item) => {
    if (filterKey === 'pending') return item.type === 'pending';
    const itemDate = toDate(item.date);
    switch (filterKey) {
      case 'today': return itemDate >= startOfToday;
      case 'yesterday': return itemDate >= startOfYesterday && itemDate < startOfToday;
      case '7days': return itemDate >= startOf7Days;
      case '30days': return itemDate >= startOf30Days;
      default: return true;
    }
  });
};

const getTotalCoins = (data, filterKey) => {
  const filtered = getFilteredData(data, filterKey);
  return filtered.reduce((sum, item) => sum + Number(item.coins), 0);
};

export default function CoinHistoryScreen() {
  const { colors } = useTheme();
  const s = styles(colors);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const scrollRef = useRef(null);
  const btnPositions = useRef({});

  const filteredData = useMemo(() => getFilteredData(placeholderData, selectedFilter), [selectedFilter]);
  const totalCoins = useMemo(() => getTotalCoins(placeholderData, selectedFilter), [selectedFilter]);

  const renderItem = ({ item }) => {
    const isPending = item.type === 'pending';
    const isEarn = item.type === 'earn';
    const iconColor = isPending ? '#3B82F6' : isEarn ? '#F59E0B' : '#EF4444';
    const iconName = isPending ? 'hourglass-empty' : isEarn ? 'add-circle' : 'remove-circle';
    return (
      <View style={s.card}>
        <View style={s.cardLeft}>
          <View style={[s.iconBox, { backgroundColor: iconColor + '20' }]}>
            <MaterialIcons name={iconName} size={22} color={iconColor} />
          </View>
          <View style={s.cardInfo}>
            <Text style={s.cardTitle}>{item.title}</Text>
            <Text style={s.cardDate}>{item.date}</Text>
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
          <Text style={s.totalValue}>{totalCoins}</Text>
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
          <MaterialIcons name="account-balance-wallet" size={48} color={colors.muted} />
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
  totalLabel: { fontSize: 11, color: colors.muted, marginLeft: 4 },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#F59E0B' },
  filterWrap: { flex: 1, height: 36, justifyContent: 'center' },
  filterBtn: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14,
    backgroundColor: colors.surface, marginRight: 5,
    borderWidth: 1, borderColor: colors.muted + '40',
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
  cardDate: { fontSize: 11, color: colors.muted, marginTop: 2 },
  coinAmount: { fontSize: 16, fontWeight: 'bold' },
  emptyText: { fontSize: 15, color: colors.muted, marginTop: 12, textAlign: 'center' },
});
