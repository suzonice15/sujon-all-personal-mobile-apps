import React, { memo, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale, shadow } from '../../../../components/game';

const PILLS = [
  { bg: '#FDE2E4', border: '#F5B8BF' },
  { bg: '#DCEBFF', border: '#A9C9F5' },
  { bg: '#DDF3DF', border: '#A8DCAE' },
  { bg: '#EBE0FB', border: '#C8B2EE' },
];

// Picture + word. state: undefined | 'right' | 'wrong' (wrong options shake and stay disabled).
function OptionCard({ option, index, state, disabled, onPress, height }) {
  const shake = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (state === 'wrong') {
      shake.setValue(0);
      Animated.sequence(
        [10, -10, 8, -8, 4, 0].map((toValue) => Animated.timing(shake, { toValue, duration: 55, useNativeDriver: true })),
      ).start();
    }
    if (state === 'right') {
      Animated.sequence([
        Animated.timing(pop, { toValue: 1.08, duration: 140, useNativeDriver: true }),
        Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 12, bounciness: 12 }),
      ]).start();
    }
  }, [state, shake, pop]);

  const pill = PILLS[index % PILLS.length];
  const pictureSize = Math.min(140, height * 0.55);

  return (
    <Animated.View style={[styles.wrap, { transform: [{ translateX: shake }, { scale: pop }] }]}>
      <PressableScale
        onPress={onPress}
        disabled={disabled || state === 'wrong'}
        tapSound={false}
        accessibilityLabel={option.word}
        style={[
          styles.card,
          { height },
          state === 'right' && styles.right,
          state === 'wrong' && styles.wrong,
        ]}
      >
        <Image source={option.image} style={{ width: pictureSize, height: pictureSize }} resizeMode="contain" />
        <View style={[styles.pill, { backgroundColor: pill.bg, borderColor: pill.border }]}>
          <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit>
            {option.word}
          </Text>
        </View>
        {state ? (
          <View style={[styles.badge, { backgroundColor: state === 'right' ? GC.green : GC.red }]}>
            <MaterialIcons name={state === 'right' ? 'check' : 'close'} size={20} color={GC.white} />
          </View>
        ) : null}
      </PressableScale>
    </Animated.View>
  );
}

export default memo(OptionCard);

const styles = StyleSheet.create({
  wrap: { width: '48%', marginBottom: 12 },
  card: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FFFDF7',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#F1E3C8',
    paddingHorizontal: 8,
    paddingVertical: 6,
    ...shadow(3),
  },
  right: { borderColor: GC.green, backgroundColor: '#E8F8EF' },
  wrong: { borderColor: GC.red, backgroundColor: '#FDECEE', opacity: 0.7 },
  pill: {
    alignSelf: 'stretch',
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  word: { fontSize: 20, fontWeight: '800', color: GC.ink, textAlign: 'center' },
  badge: {
    position: 'absolute',
    top: -8,
    right: -6,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: GC.white,
  },
});
