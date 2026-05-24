import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePoints } from '../context/PointsContext';

export default function PointsBadge() {
  const { total } = usePoints();
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>⭐ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    marginRight: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});
