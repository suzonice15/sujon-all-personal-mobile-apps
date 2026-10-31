import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PressableScale from './PressableScale';
import { GC, shadow } from './gameTheme';

const VARIANTS = {
  primary: { bg: GC.red, edge: GC.redDark, text: GC.white },
  blue: { bg: GC.blue, edge: GC.blueDark, text: GC.white },
  green: { bg: GC.green, edge: GC.greenDark, text: GC.white },
  light: { bg: GC.cream, edge: GC.creamBorder, text: GC.ink },
};

// Big pill button with a 3D bottom edge, e.g. "পরবর্তী ›".
export default function GameButton({
  title,
  onPress,
  variant = 'primary',
  iconLeft,
  iconRight,
  disabled,
  size = 'large',
  style,
  tapSound,
}) {
  const v = VARIANTS[variant];
  const large = size === 'large';
  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      tapSound={tapSound}
      accessibilityLabel={title}
      style={[
        styles.base,
        large ? styles.large : styles.small,
        { backgroundColor: v.bg, borderBottomColor: v.edge },
        disabled && styles.disabled,
        style,
      ]}
    >
      {iconLeft ? <MaterialIcons name={iconLeft} size={large ? 26 : 20} color={v.text} /> : null}
      <Text style={[styles.title, large ? styles.titleLarge : styles.titleSmall, { color: v.text }]} numberOfLines={1}>
        {title}
      </Text>
      {iconRight ? <MaterialIcons name={iconRight} size={large ? 28 : 22} color={v.text} /> : null}
      {variant !== 'light' ? <View pointerEvents="none" style={styles.gloss} /> : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderBottomWidth: 5,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.85)',
    overflow: 'hidden',
    ...shadow(6),
  },
  large: { minHeight: 60, paddingHorizontal: 26 },
  small: { minHeight: 48, paddingHorizontal: 18 },
  disabled: { opacity: 0.45 },
  title: { fontWeight: '800', marginHorizontal: 8 },
  titleLarge: { fontSize: 21 },
  titleSmall: { fontSize: 17 },
  gloss: {
    position: 'absolute',
    top: 3,
    left: 18,
    right: 18,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
});
