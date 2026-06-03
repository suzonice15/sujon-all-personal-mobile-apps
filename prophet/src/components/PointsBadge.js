import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePoints } from '../context/PointsContext';

export default function PointsBadge({ textColor }) {
  const { total } = usePoints();
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: textColor || '#fff' }]}>⭐ {total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 13,
  },
});
