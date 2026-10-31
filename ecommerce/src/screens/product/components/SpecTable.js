import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpecTable({ specifications = [], colors }) {
  if (!specifications.length) {
    return (
      <Text style={[styles.noData, { color: colors?.muted || '#6B7280' }]}>
        There are no specifications
      </Text>
    );
  }

  return (
    <View style={styles.table}>
      {specifications.map((spec, i) => (
        <View key={i} style={[styles.row, i % 2 === 0 && styles.rowAlt]}>
          <Text style={styles.key}>{spec.key}</Text>
          <Text style={styles.value}>{spec.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  rowAlt: {
    backgroundColor: '#F9FAFB',
  },
  key: {
    width: '35%',
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F9FAFB',
  },
  value: {
    flex: 1,
    fontSize: 12,
    color: '#6B7280',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  noData: {
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
