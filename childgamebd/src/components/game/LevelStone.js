import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PressableScale from './PressableScale';
import StarRow from './StarRow';
import { GC, shadow } from './gameTheme';

// One level on a level map: a stone with a big title, stars (or a lock) and a label below.
export default function LevelStone({
  title,
  titleScale = 0.38,
  label,
  stars,
  unlocked,
  isNext,
  size,
  onPress,
  onLockedPress,
  accessibilityLabel,
}) {
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isNext) {
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [isNext, glow]);

  return (
    <PressableScale
      onPress={unlocked ? onPress : onLockedPress}
      accessibilityLabel={`${accessibilityLabel || label}${unlocked ? '' : ' (বন্ধ)'}`}
      style={[styles.wrap, { width: size }]}
    >
      <Animated.View
        style={[
          styles.stone,
          { width: size - 8, height: size - 8 },
          unlocked ? styles.open : styles.locked,
          isNext && styles.next,
          isNext && { transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] }) }] },
        ]}
      >
        <Text
          style={[styles.title, { fontSize: size * titleScale }, !unlocked && styles.titleLocked]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>
        {unlocked ? (
          <StarRow stars={stars} size={size * 0.17} />
        ) : (
          <MaterialIcons name="lock" size={size * 0.24} color="#7D848A" />
        )}
      </Animated.View>
      <Text
        style={[styles.label, label.length > 9 && styles.labelLong, { width: size - 6 }, isNext && styles.labelNext]}
        numberOfLines={2}
      >
        {label}
      </Text>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', marginBottom: 14 },
  stone: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderBottomWidth: 7,
    ...shadow(5),
  },
  open: { backgroundColor: GC.cream, borderColor: GC.white, borderBottomColor: GC.creamBorder },
  next: { borderColor: GC.yellow, borderBottomColor: '#E8A800' },
  locked: { backgroundColor: GC.stone, borderColor: '#E6E8EA', borderBottomColor: GC.stoneDark },
  title: { color: GC.red, fontWeight: '800', includeFontPadding: false },
  titleLocked: { color: '#8F959A' },
  label: {
    marginTop: -4,
    fontSize: 13,
    fontWeight: '800',
    color: GC.ink,
    backgroundColor: GC.woodLight,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    overflow: 'hidden',
    textAlign: 'center',
  },
  labelLong: { fontSize: 12, lineHeight: 16 },
  labelNext: { backgroundColor: GC.yellow },
});
