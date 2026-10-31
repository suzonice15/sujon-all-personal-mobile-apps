import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { playTap } from '../../utils/gameAudio';

// Pressable that squashes a little when touched — the base of every game button/card.
export default function PressableScale({
  children,
  onPress,
  disabled,
  style,
  scaleTo = 0.94,
  tapSound = true,
  accessibilityLabel,
  ...rest
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (toValue) =>
    Animated.spring(scale, { toValue, useNativeDriver: true, speed: 40, bounciness: 8 }).start();

  const handlePress = () => {
    if (tapSound) {
      playTap();
    }
    onPress?.();
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      onPressIn={() => animate(scaleTo)}
      onPressOut={() => animate(1)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}
