import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function StarRating({ rating = 0, size = 14, interactive = false, onChange }) {
  const [selected, setSelected] = useState(rating || 0);
  const display = interactive ? selected : rating;
  const full = Math.floor(display);
  const half = display % 1 >= 0.5;

  const handlePress = (value) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3, 4].map((i) => {
        const iconName = i < full ? 'star' : i === full && half ? 'star-half' : 'star-border';
        const color = i < full || (i === full && half) ? '#F59E0B' : '#D1D5DB';
        return (
          <TouchableOpacity
            key={i}
            disabled={!interactive}
            onPress={() => handlePress(i + 1)}
          >
            <MaterialIcons name={iconName} size={size} color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
