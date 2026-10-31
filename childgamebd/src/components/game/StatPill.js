import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GC, shadow } from './gameTheme';

// Small header pill: picture + value, e.g. ⏰ ০০:৩০ or ⭐ ৫. `alert` turns it red (timer running out).
export default function StatPill({ image, icon, value, alert, accessibilityLabel }) {
  return (
    <View style={[styles.pill, alert && styles.alert]} accessibilityLabel={accessibilityLabel}>
      {image ? <Image source={image} style={styles.image} resizeMode="contain" /> : icon}
      <Text style={[styles.value, alert && styles.valueAlert]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GC.cream,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: GC.woodLight,
    paddingVertical: 3,
    paddingLeft: 4,
    paddingRight: 12,
    ...shadow(4),
  },
  alert: { backgroundColor: '#FFE1E4', borderColor: GC.red },
  image: { width: 30, height: 30, marginRight: 4 },
  value: { fontSize: 19, fontWeight: '800', color: GC.ink, minWidth: 30, textAlign: 'center' },
  valueAlert: { color: GC.redDark },
});
