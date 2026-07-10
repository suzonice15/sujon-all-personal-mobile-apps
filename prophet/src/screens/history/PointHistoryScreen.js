import React, { useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getEarnings } from '../../db/earnings';
import { getSingleContent } from '../../db/mobileContents';
import { toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';

const filters = [
  { key: 'today', label: 'আজকের' },
  { key: 'yesterday', label: 'গতকালের' },
  { key: '7days', label: 'গত ৭ দিনের' },
  { key: '30days', label: 'গত ৩০ দিনের' },
  { key: 'lastMonth', label: 'গত মাসের' },
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
    const itemDate = toDate(item.earned_at?.slice(0, 10));
    switch (filterKey) {
      case 'today': return itemDate >= startOfToday;
      case 'yesterday': return itemDate >= startOfYesterday && itemDate < startOfToday;
      case '7days': return itemDate >= startOf7Days;
      case '30days': return itemDate >= startOf30Days;
      case 'lastMonth': {
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return itemDate >= startOfLastMonth && itemDate < startOfThisMonth;
      }
      default: return true;
    }
  });
};

const getFilteredTotal = (data, filterKey) => {
  return getFilteredData(data, filterKey).reduce((sum, item) => sum + (item.points || 0), 0);
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

export default function PointHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const { colors } = useTheme();
  const s = styles(colors);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const scrollRef = useRef(null);
  const btnPositions = useRef({});

  useFocusEffect(useCallback(() => {
    getEarnings().then(setHistory);
  }, []));

  const filteredData = useMemo(() => getFilteredData(history, selectedFilter), [history, selectedFilter]);
  const filteredTotal = useMemo(() => getFilteredTotal(history, selectedFilter), [history, selectedFilter]);
// console.log('filteredData point', filteredData);

  const handlePress = async (item) => {
    if (item.content_id <= 0 || item.content_id === 2000) return;
    const story = await getSingleContent(item.content_id);
    if (story) navigation.navigate('StoryDetail', { item: story, title: story.title });
  };

  const renderItem = ({ item }) => {
    const t = item.type || 'income';
    const isWithdraw = t === 'withdraw';
    const isSummation = t === 'summation';
    const isSynced = item.synced && item.synced > 0;
    const isStory = item.content_id > 0 && item.content_id !== 2000 && !isSummation;
    const iconColor = isWithdraw ? '#EF4444' : isSummation ? '#8B5CF6' : '#22C55E';
    const iconName = isSynced ? 'check' : (isWithdraw ? 'remove-circle' : isSummation ? 'archive' : 'auto-stories');
    const pointsText = isWithdraw ? `${toBn(item.points)}` : `+${toBn(item.points)}`;
    return (
      <TouchableOpacity style={s.card} onPress={() => handlePress(item)} activeOpacity={isStory ? 0.7 : 1}>
        <View style={s.cardRow}>
          <View style={[s.iconBox, { backgroundColor: isSynced ? '#10B981' + '20' : iconColor + '20' }]}>
            <MaterialIcons name={iconName} size={20} color={isSynced ? '#10B981' : iconColor} />
          </View>
          <View style={s.cardContent}>
            <Text style={s.cardTitle} numberOfLines={2}>{item.content_title}</Text>
            <Text style={s.date}>{formatBnDateTime(item.earned_at)}</Text>
          </View>
          <View style={[s.pointsBadge, { backgroundColor: iconColor + '20' }]}>
            <Text style={[s.points, { color: iconColor }]}>{pointsText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <View style={s.topRow}>
        <View style={s.totalBox}>
          <MaterialIcons name="star" size={22} color="#22C55E" />
          <Text style={s.totalValue}>{toBn(filteredTotal)}</Text>
          <Text style={s.totalLabel}>পয়েন্ট</Text>
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
          <MaterialIcons name="stars" size={48} color={colors.muted || '#999'} />
          <Text style={s.emptyText}>এখনো কোনো পয়েন্ট অর্জিত হয়নি</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
        <AdBanner />
      </View>
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
    borderLeftWidth: 3, borderLeftColor: '#22C55E',
  },
  totalLabel: { fontSize: 11, color: colors.muted || '#999', marginLeft: 4 },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#22C55E' },
  filterWrap: { flex: 1, height: 36, justifyContent: 'center' },
  filterBtn: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14,
    backgroundColor: colors.surface, marginRight: 5,
    borderWidth: 1, borderColor: (colors.muted || '#999') + '40',
  },
  filterBtnActive: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  filterBtnText: { fontSize: 12, fontWeight: '500', color: colors.text },
  filterBtnTextActive: { color: '#fff', fontWeight: '700' },
  card: {
    backgroundColor: colors.surface, marginHorizontal: 16, marginBottom: 10,
    borderRadius: 12, padding: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
  },
  cardContent: { flex: 1, marginLeft: 12 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: colors.text },
  date: { fontSize: 11, color: colors.muted || '#999', marginTop: 2 },
  pointsBadge: {
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  points: { fontSize: 14, fontWeight: 'bold', color: '#22C55E' },
  emptyText: { fontSize: 15, color: colors.muted || '#999', marginTop: 12, textAlign: 'center' },
});
