import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getEarnings } from '../../db/earnings';
import { usePoints } from '../../context/PointsContext';

export default function IncomeScreen() {
  const [history, setHistory] = useState([]);
  const { total } = usePoints();

  useFocusEffect(useCallback(() => {
    getEarnings().then(setHistory);
  }, []));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle} numberOfLines={2}>{item.content_title}</Text>
      <View style={styles.cardRow}>
        <Text style={styles.points}>+{item.points} পয়েন্ট</Text>
        <Text style={styles.date}>{item.earned_at?.slice(0, 10)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.totalBox}>
        <Text style={styles.totalLabel}>মোট অর্জিত পয়েন্ট</Text>
        <Text style={styles.totalValue}>⭐ {total}</Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>এখনো কোনো গল্প পড়া হয়নি।{'\n'}গল্প পড়লে পয়েন্ট অর্জন হবে।</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  totalBox: {
    backgroundColor: '#fff',
    margin: 14,
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    elevation: 2,
  },
  totalLabel: { fontSize: 14, color: '#666', marginBottom: 6 },
  totalValue: { fontSize: 32, fontWeight: 'bold', color: '#e67e22' },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 14,
    marginBottom: 10,
    borderRadius: 10,
    padding: 14,
    elevation: 1,
  },
  cardTitle: { fontSize: 15, color: '#1a1a1a', marginBottom: 8 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  points: { fontSize: 14, fontWeight: 'bold', color: '#27ae60' },
  date: { fontSize: 12, color: '#999' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 15, color: '#999', textAlign: 'center', lineHeight: 26 },
});
