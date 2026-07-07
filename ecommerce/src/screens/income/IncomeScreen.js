import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getEarnings } from '../../db/earnings';
import { usePoints } from '../../context/PointsContext';
import { getSingleContent } from '../../db/mobileContents';

export default function IncomeScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const { total } = usePoints();
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    getEarnings().then(setHistory);
  }, []));

  const handlePress = async (item) => {
    if (item.content_id <= 0 || item.content_id === 2000) return;
    const story = await getSingleContent(item.content_id);
    if (story) navigation.navigate('IncomeList', { screen: 'StoryDetail', params: { item: story, title: story.title } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={s.card} onPress={() => handlePress(item)} activeOpacity={item.content_id > 0 ? 0.7 : 1}>
      <Text style={s.cardTitle} numberOfLines={2}>{item.content_title}</Text>
      <View style={s.cardRow}>
        <Text style={s.points}>+{item.points} পয়েন্ট</Text>
        <Text style={s.date}>{item.earned_at?.slice(0, 10)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <View style={s.totalBox}>
        <Text style={s.totalLabel}>মোট অর্জিত পয়েন্ট</Text>
        <Text style={s.totalValue}>⭐ {total}</Text>
      </View>

      {history.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyText}>এখনো কোনো গল্প পড়া হয়নি।{'\n'}গল্প পড়লে পয়েন্ট অর্জন হবে।</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  totalBox: {
    backgroundColor: colors.surface,
    margin: 14, borderRadius: 12, padding: 18, alignItems: 'center',
  },
  totalLabel: { fontSize: 14, color: colors.onSurface, opacity: 0.6, marginBottom: 6 },
  totalValue: { fontSize: 32, fontWeight: 'bold', color: colors.primary },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: 14, marginBottom: 10, borderRadius: 10, padding: 14,
  },
  cardTitle: { fontSize: 15, color: colors.onSurface, marginBottom: 8 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  points: { fontSize: 14, fontWeight: 'bold', color: colors.success },
  date: { fontSize: 12, color: colors.onSurface, opacity: 0.4 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: colors.onSurface, opacity: 0.4, textAlign: 'center', lineHeight: 26 },
});
