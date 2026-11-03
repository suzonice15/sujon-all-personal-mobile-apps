import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Button({ title, onPress, type = 'primary' }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'secondary' && styles.secondary,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EB592C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 5,
  },
  secondary: {
    backgroundColor: '#6B7280',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
  },
});