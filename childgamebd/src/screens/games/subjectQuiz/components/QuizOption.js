import React, { memo, useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale } from '../../../../components/game';

const TINTS = [
  { bg: '#FFF4CF', border: '#F5D776' },
  { bg: '#DCEBFF', border: '#9CC2F2' },
  { bg: '#DDF3DF', border: '#9FD9A7' },
  { bg: '#FDE2EC', border: '#F2A7C3' },
];

// count option: n copies of the picture in a small grid.
const CountGroup = ({ image, count, size }) => {
  const cols = count <= 1 ? 1 : count <= 4 ? 2 : count <= 9 ? 3 : 4;
  const item = Math.min(size / cols - 4, count === 1 ? size * 0.6 : 999);
  return (
    <View style={[styles.countGrid, { width: cols * (item + 4) }]}>
      {Array.from({ length: count }, (_, i) => (
        <Image key={i} source={image} style={[styles.countItem, { width: item, height: item }]} resizeMode="contain" />
      ))}
    </View>
  );
};

// One answer card. display: 'picture' | 'labelled' | 'text' | 'count'. state: undefined | 'right' | 'wrong' | 'reveal'.
function QuizOption({ option, index, display, state, disabled, height, onPress, revealLabel }) {
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

  const tint = TINTS[index % TINTS.length];
  const showLabel = display === 'labelled' || display === 'text' || (revealLabel && option.label);
  const inner = height - 20;

  let body;
  if (display === 'text') {
    body = (
      <Text style={styles.textOption} numberOfLines={2} adjustsFontSizeToFit>
        {option.label}
      </Text>
    );
  } else if (display === 'count') {
    body = <CountGroup image={option.image} count={option.count} size={inner * 0.95} />;
  } else {
    const picture = showLabel ? inner * 0.62 : inner * 0.8;
    body = <Image source={option.image} style={{ width: picture, height: picture }} resizeMode="contain" />;
  }

  return (
    <Animated.View style={[styles.wrap, { transform: [{ translateX: shake }, { scale: pop }] }]}>
      <PressableScale
        onPress={onPress}
        disabled={disabled}
        tapSound={false}
        accessibilityLabel={option.label || String(option.count)}
        style={[
          styles.card,
          { height, backgroundColor: tint.bg, borderColor: tint.border },
          (state === 'right' || state === 'reveal') && styles.right,
          state === 'wrong' && styles.wrong,
        ]}
      >
        {body}
        {showLabel && display !== 'text' ? (
          <Text style={styles.label} numberOfLines={1} adjustsFontSizeToFit>
            {option.label}
          </Text>
        ) : null}
        {state === 'right' || state === 'wrong' || state === 'reveal' ? (
          <View style={[styles.badge, { backgroundColor: state === 'wrong' ? GC.red : GC.green }]}>
            <MaterialIcons name={state === 'wrong' ? 'close' : 'check'} size={20} color={GC.white} />
          </View>
        ) : null}
      </PressableScale>
    </Animated.View>
  );
}

export default memo(QuizOption);

const styles = StyleSheet.create({
  wrap: { width: '48%', marginBottom: 12 },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    borderWidth: 3,
    padding: 8,
  },
  right: { borderColor: GC.green, backgroundColor: '#E2F7EA', borderWidth: 4 },
  wrong: { borderColor: GC.red, backgroundColor: '#FDE6E9', opacity: 0.75 },
  countItem: { margin: 2 },
  countGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  textOption: { fontSize: 40, fontWeight: '800', color: GC.ink, textAlign: 'center' },
  label: { marginTop: 4, fontSize: 18, fontWeight: '800', color: GC.ink, textAlign: 'center' },
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
