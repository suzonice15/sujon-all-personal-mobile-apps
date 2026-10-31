import React, { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ConfettiBurst from './ConfettiBurst';
import GameButton from './GameButton';
import StarRow from './StarRow';
import WoodBanner from './WoodBanner';
import { GC, shadow } from './gameTheme';
import { toBanglaDigits } from '../../utils/banglaNumber';

const STAR = require('../../assets/images/common/glowing_star.webp');

function Stat({ image, label, value, color }) {
  return (
    <View style={styles.stat}>
      <Image source={image} style={styles.statImage} resizeMode="contain" />
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, { color }]} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>
    </View>
  );
}

// End-of-level card: stars, stats ([{ key, image, label, value, color }]), a message and actions.
// Optional children render inside the card above the stats.
// stars === 0 means the level was not passed (no "next level" button, encouraging text).
export default function LevelResultPanel({
  levelNumber,
  stars,
  stats,
  passText,
  failText,
  hint,
  hasNext,
  onHome,
  onReplay,
  onNext,
  children,
}) {
  const rise = useRef(new Animated.Value(0)).current;
  const passed = stars > 0;

  useEffect(() => {
    Animated.spring(rise, { toValue: 1, useNativeDriver: true, speed: 8, bounciness: 10 }).start();
  }, [rise]);

  return (
    <View style={styles.wrap}>
      {passed ? <ConfettiBurst trigger={`${levelNumber}_${stars}`} /> : null}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StarRow stars={stars} size={60} animated style={styles.stars} />
        <WoodBanner>
          {passed ? (
            <>
              লেভেল {toBanglaDigits(levelNumber)} <Text style={{ color: GC.green }}>সম্পন্ন!</Text>
            </>
          ) : (
            <>
              আরেকবার <Text style={{ color: GC.orange }}>চেষ্টা করো!</Text>
            </>
          )}
        </WoodBanner>
        <Animated.View
          style={[
            styles.card,
            { opacity: rise, transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }] },
          ]}
        >
          {children}
          <View style={styles.stats}>
            {stats.map(({ key, ...stat }) => (
              <Stat key={key} {...stat} />
            ))}
          </View>
          <View style={styles.message}>
            <Image source={STAR} style={styles.messageStar} resizeMode="contain" />
            <View style={styles.messageTextWrap}>
              <Text style={[styles.messageTitle, !passed && { color: GC.orange }]}>
                {passed ? 'দারুণ হয়েছে!' : 'ভালো চেষ্টা!'}
              </Text>
              <Text style={styles.messageText}>{passed ? passText : failText}</Text>
            </View>
          </View>
        </Animated.View>
        <View style={styles.actions}>
          {passed && hasNext ? (
            <GameButton title="পরের লেভেল" iconLeft="play-arrow" variant="green" onPress={onNext} />
          ) : null}
          <View style={styles.row}>
            <GameButton
              title="আবার খেলি"
              iconLeft="replay"
              variant={passed ? 'light' : 'primary'}
              size="small"
              onPress={onReplay}
              style={styles.half}
            />
            <GameButton title="হোম" iconLeft="home" variant="blue" size="small" onPress={onHome} style={styles.half} />
          </View>
          {!passed && hint ? <Text style={styles.hint}>{hint}</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  scroll: { paddingBottom: 16 },
  stars: { marginBottom: 6 },
  card: {
    marginTop: 14,
    backgroundColor: GC.cream,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 14,
    ...shadow(8),
  },
  stats: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    backgroundColor: GC.white,
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  statImage: { width: 36, height: 36 },
  statLabel: { fontSize: 14, fontWeight: '700', color: GC.inkSoft, marginTop: 2 },
  statValue: { fontSize: 22, fontWeight: '800' },
  message: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: GC.white,
    borderRadius: 20,
    padding: 12,
  },
  messageStar: { width: 58, height: 58 },
  messageTextWrap: { flex: 1, marginLeft: 10 },
  messageTitle: { fontSize: 22, fontWeight: '800', color: GC.greenDark },
  messageText: { fontSize: 15, fontWeight: '700', color: GC.ink, marginTop: 2 },
  actions: { marginTop: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  half: { width: '48.5%', paddingHorizontal: 8 },
  hint: { marginTop: 12, textAlign: 'center', fontSize: 15, fontWeight: '700', color: GC.ink },
});
