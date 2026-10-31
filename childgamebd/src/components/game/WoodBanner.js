import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GC, shadow } from './gameTheme';

const LEAF = require('../../assets/images/common/leaf.webp');

// Wooden sign with leaves, used for instructions/titles. `children` may contain nested <Text>.
export default function WoodBanner({ children, size = 'medium', style }) {
  const small = size === 'small';
  return (
    <View style={[styles.wrap, style]}>
      <View style={[styles.board, small && styles.boardSmall]}>
        <Text style={[styles.text, small && styles.textSmall]} adjustsFontSizeToFit numberOfLines={2}>
          {children}
        </Text>
      </View>
      <Image source={LEAF} style={[styles.leaf, styles.leafLeft, small && styles.leafSmall]} />
      <Image source={LEAF} style={[styles.leaf, styles.leafRight, small && styles.leafSmall]} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: 'center', paddingHorizontal: 14, maxWidth: '100%' },
  board: {
    backgroundColor: GC.woodLight,
    borderColor: GC.wood,
    borderWidth: 3,
    borderBottomWidth: 6,
    borderBottomColor: GC.woodDark,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 24,
    ...shadow(5),
  },
  boardSmall: { paddingVertical: 6, paddingHorizontal: 16, borderRadius: 16 },
  text: { color: GC.ink, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  textSmall: { fontSize: 17 },
  leaf: { position: 'absolute', top: -14, width: 34, height: 34 },
  leafSmall: { width: 26, height: 26, top: -11 },
  leafLeft: { left: 0, transform: [{ rotate: '-30deg' }] },
  leafRight: { right: 0, transform: [{ scaleX: -1 }, { rotate: '-30deg' }] },
});
