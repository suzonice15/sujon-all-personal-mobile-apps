import React, { memo, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale } from '../../../../components/game';

// A word to find: picture + word. Turns green with a tick once found. Tap to hear it.
function WordChip({ word, color, found, onPress }) {
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!found) {
      return;
    }
    Animated.sequence([
      Animated.timing(pop, { toValue: 1.15, duration: 140, useNativeDriver: true }),
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 12 }),
    ]).start();
  }, [found, pop]);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ scale: pop }] }]}>
      <PressableScale
        onPress={onPress}
        tapSound={false}
        accessibilityLabel={`${word.label}${found ? ' (পাওয়া গেছে)' : ''}`}
        style={[styles.chip, { backgroundColor: found ? color : GC.white, borderColor: found ? GC.green : color }]}
      >
        <Image source={word.image} style={styles.picture} resizeMode="contain" />
        <Text style={[styles.word, found && styles.wordFound]} numberOfLines={1} adjustsFontSizeToFit>
          {word.text}
        </Text>
        {found ? (
          <View style={styles.tick}>
            <MaterialIcons name="check" size={14} color={GC.white} />
          </View>
        ) : null}
      </PressableScale>
    </Animated.View>
  );
}

export default memo(WordChip);

const styles = StyleSheet.create({
  wrap: { width: '33.33%', padding: 3 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 2.5,
    paddingVertical: 4,
    paddingLeft: 4,
    paddingRight: 6,
    minHeight: 44,
  },
  picture: { width: 32, height: 32 },
  word: { flex: 1, marginLeft: 4, fontSize: 16, fontWeight: '800', color: GC.ink },
  wordFound: { textDecorationLine: 'line-through', color: '#2E5A2E' },
  tick: {
    position: 'absolute',
    top: -6,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: GC.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GC.white,
  },
});
