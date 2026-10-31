import React from 'react';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PressableScale from './PressableScale';
import { GC, shadow } from './gameTheme';

export default function RoundIconButton({
  icon,
  onPress,
  size = 52,
  color = GC.orange,
  background = GC.cream,
  accessibilityLabel,
  style,
  tapSound,
}) {
  return (
    <PressableScale
      onPress={onPress}
      tapSound={tapSound}
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={[
        styles.btn,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: background },
        style,
      ]}
    >
      <MaterialIcons name={icon} size={size * 0.56} color={color} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: GC.white,
    ...shadow(5),
  },
});
