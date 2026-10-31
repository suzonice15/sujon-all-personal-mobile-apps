import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { GC } from './gameTheme';

// Row of dots joined by a line; dots up to `current` are filled, the current one pulses.
export default function StepProgress({ total, current, style }) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    pulse.setValue(1);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.25, duration: 500, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [current, pulse]);

  return (
    <View style={[styles.track, style]} accessibilityLabel={`${current + 1} / ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <View style={[styles.line, i <= current && styles.lineDone]} /> : null}
          <Animated.View
            style={[
              styles.dot,
              i <= current && styles.dotDone,
              i === current && { transform: [{ scale: pulse }] },
            ]}
          />
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
  },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#CDD5DB' },
  dotDone: { backgroundColor: GC.yellow, borderWidth: 2, borderColor: '#F2A900' },
  line: { width: 18, height: 4, backgroundColor: '#CDD5DB' },
  lineDone: { backgroundColor: GC.yellow },
});
