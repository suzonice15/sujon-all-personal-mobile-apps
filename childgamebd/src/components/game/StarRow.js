import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC } from './gameTheme';

// Earned stars are gold, the rest grey. With `animated`, they pop in one after another.
export default function StarRow({ stars, total = 3, size = 22, animated = false, style }) {
  const values = useRef(Array.from({ length: total }, () => new Animated.Value(animated ? 0 : 1))).current;

  useEffect(() => {
    if (!animated) {
      return undefined;
    }
    const anim = Animated.stagger(
      260,
      values.map((v) => Animated.spring(v, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 14 })),
    );
    anim.start();
    return () => anim.stop();
  }, [animated, values]);

  return (
    <View style={[styles.row, style]} accessibilityLabel={`${stars}/${total}`}>
      {values.map((v, i) => {
        const middle = total === 3 && i === 1;
        const s = middle && animated ? size * 1.3 : size;
        return (
          <Animated.View
            key={i}
            style={[
              middle && animated && styles.raised,
              { transform: [{ scale: v }, { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['-90deg', '0deg'] }) }] },
            ]}
          >
            <MaterialIcons name="star" size={s} color={i < stars ? GC.yellow : '#C9B9A3'} />
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' },
  raised: { marginBottom: 12 },
});
