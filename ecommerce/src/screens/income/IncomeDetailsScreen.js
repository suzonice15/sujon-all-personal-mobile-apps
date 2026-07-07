import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IncomeDetailsScreen({ route }) {

  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Income Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{item.title}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>৳ {item.amount}</Text>

        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{item.date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },

  card: {
    padding: 20,
    backgroundColor: '#e6f7ff',
    borderRadius: 10,
  },

  label: { fontSize: 14, color: 'gray', marginTop: 10 },
  value: { fontSize: 18, fontWeight: '600' },
});