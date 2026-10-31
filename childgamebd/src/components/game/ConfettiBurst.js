import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const COLORS = ['#F0384F', '#FFC531', '#2BB673', '#2F80ED', '#FF8A3D', '#B455E0'];

// One-shot burst of confetti from the top centre of its parent. Re-fires when `trigger` changes.
export default function ConfettiBurst({ trigger, pieces = 22 }) {
  const progress = useRef(new Animated.Value(0)).current;

  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => {
        const angle = (Math.PI * (i + Math.random())) / pieces;
        const dist = 110 + Math.random() * 120;
        return {
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist * 0.9 + 40,
          spin: `${(Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360)}deg`,
          color: COLORS[i % COLORS.length],
          w: 8 + Math.random() * 6,
          h: 12 + Math.random() * 8,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [trigger, pieces],
  );

  useEffect(() => {
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [trigger, progress]);

  return (
    <View pointerEvents="none" style={styles.layer}>
      {bits.map((b, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bit,
            {
              width: b.w,
              height: b.h,
              backgroundColor: b.color,
              opacity: progress.interpolate({ inputRange: [0, 0.75, 1], outputRange: [1, 1, 0] }),
              transform: [
                { translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [0, b.dx] }) },
                { translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [0, b.dy] }) },
                { rotate: progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', b.spin] }) },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  layer: { ...StyleSheet.absoluteFill, alignItems: 'center', zIndex: 30, elevation: 30 },
  bit: { position: 'absolute', top: 40, borderRadius: 3 },
});
