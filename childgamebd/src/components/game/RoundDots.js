import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GC } from './gameTheme';

// One dot per round: green = found without mistakes, red = missed, yellow = current round.
export default function RoundDots({ total, current, results }) {
  return (
    <View style={styles.track} accessibilityLabel={`${current + 1} / ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const result = results[i];
        return (
          <View
            key={i}
            style={[
              styles.dot,
              result === true && styles.right,
              result === false && styles.wrong,
              i === current && result === undefined && styles.current,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#CDD5DB', marginHorizontal: 2.5 },
  right: { backgroundColor: GC.green },
  wrong: { backgroundColor: GC.red },
  current: { backgroundColor: GC.yellow, transform: [{ scale: 1.35 }], borderWidth: 2, borderColor: '#F2A900' },
});
