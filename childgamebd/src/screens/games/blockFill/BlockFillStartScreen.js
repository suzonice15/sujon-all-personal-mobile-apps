import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import {
  GC,
  GameBackground,
  GameButton,
  GameNativeAd,
  PressableScale,
  RoundIconButton,
  SoundToggleButton,
  WoodBanner,
  shadow,
  useGameScreen,
} from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { PROMPTS as GUESS_PROMPTS } from '../../../data/game03_guessTheWord';
import { TRACKS } from '../../../data/game05_blockFill';
import { playClip } from '../../../utils/gameAudio';

const HERO = require('../../../assets/images/game05/title_hero.jpg');
const PENCIL = require('../../../assets/images/common/pencil.webp');

const SUBJECTS = [
  { track: 'bn', detail: 'ছবি দেখে বাংলা শব্দ বসাও', image: require('../../../assets/images/game05/subject_bn.jpg'), tint: '#FFE4EF' },
  { track: 'math', detail: 'অঙ্ক কষে সংখ্যার নাম বসাও', image: require('../../../assets/images/game05/subject_math.jpg'), tint: '#E3F6E8' },
  { track: 'en', detail: 'Fill the words using the clues', image: require('../../../assets/images/game05/subject_en.jpg'), tint: '#E3EEFF' },
];

export default function BlockFillStartScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [choosing, setChoosing] = useState(false);
  const appear = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  useGameScreen();

  const contentWidth = Math.min(width - 32, 560);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bob]);

  useEffect(() => {
    if (!choosing) {
      return;
    }
    appear.setValue(0);
    Animated.spring(appear, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 8 }).start();
    playClip(GUESS_PROMPTS.chooseSubject.audio);
  }, [choosing, appear]);

  const openLevels = (track) => navigation.navigate('BlockFillLevels', { track });

  return (
    <GameBackground>
      <View style={styles.topBar}>
        <RoundIconButton icon="home" accessibilityLabel="সব খেলা" onPress={() => navigation.goBack()} />
        <SoundToggleButton />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }] }}>
          <Image
            source={HERO}
            accessibilityLabel="ব্লক ফিল"
            style={[styles.hero, { width: contentWidth, height: contentWidth * 0.639 }]}
            resizeMode="cover"
          />
        </Animated.View>

        {!choosing ? (
          <View style={styles.startBlock}>
            <GameButton title="খেলা শুরু করি" iconLeft="play-arrow" variant="green" onPress={() => setChoosing(true)} style={styles.startBtn} />
            <View style={styles.howTo}>
              <Image source={PENCIL} style={styles.bulb} resizeMode="contain" />
              <Text style={styles.howToText}>ঘরে ট্যাপ করো, ছবি দেখো, তারপর অক্ষর বসিয়ে শব্দ পূরণ করো!</Text>
            </View>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.chooseBlock,
              {
                width: contentWidth,
                opacity: appear,
                transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
              },
            ]}
          >
            <WoodBanner>{GUESS_PROMPTS.chooseSubject.text}</WoodBanner>
            {SUBJECTS.map((item) => (
              <PressableScale
                key={item.track}
                onPress={() => openLevels(item.track)}
                accessibilityLabel={TRACKS[item.track].title}
                style={[styles.subjectCard, { backgroundColor: item.tint }]}
              >
                <Image source={item.image} style={styles.subjectImage} resizeMode="cover" />
                <View style={styles.subjectInfo}>
                  <View style={[styles.subjectName, { backgroundColor: TRACKS[item.track].color }]}>
                    <Text style={styles.subjectNameText}>{TRACKS[item.track].title}</Text>
                  </View>
                  <Text style={styles.subjectDetail}>{item.detail}</Text>
                  <GameButton
                    title="খেলো"
                    variant="green"
                    size="small"
                    iconLeft="play-arrow"
                    onPress={() => openLevels(item.track)}
                    style={styles.subjectBtn}
                  />
                </View>
              </PressableScale>
            ))}
          </Animated.View>
        )}
        <GameNativeAd style={[styles.nativeAd, { width: contentWidth }]} />
      </ScrollView>
      <AdBanner style={styles.ad} />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  nativeAd: { marginTop: 24 },
  ad: { paddingTop: 4 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8 },
  content: { alignItems: 'center', paddingHorizontal: 16, paddingBottom: 32 },
  hero: { borderRadius: 26, borderWidth: 4, borderColor: GC.white, marginTop: 8 },
  startBlock: { alignItems: 'center', marginTop: 24, width: '100%' },
  startBtn: { paddingHorizontal: 44, minHeight: 70 },
  howTo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    backgroundColor: 'rgba(255,248,236,0.95)',
    borderRadius: 22,
    borderWidth: 3,
    borderColor: GC.woodLight,
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...shadow(4),
  },
  bulb: { width: 46, height: 46 },
  howToText: { flexShrink: 1, marginLeft: 10, fontSize: 16, fontWeight: '800', color: GC.ink },
  chooseBlock: { alignItems: 'stretch', marginTop: 20 },
  subjectCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    borderRadius: 26,
    padding: 10,
    borderWidth: 4,
    borderColor: GC.white,
    ...shadow(7),
  },
  subjectImage: { width: 110, height: 87, borderRadius: 16 },
  subjectInfo: { flex: 1, marginLeft: 12 },
  subjectName: { alignSelf: 'flex-start', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 3 },
  subjectNameText: { color: GC.white, fontSize: 17, fontWeight: '800' },
  subjectDetail: { fontSize: 14, fontWeight: '700', color: GC.ink, marginVertical: 6 },
  subjectBtn: { alignSelf: 'stretch' },
});
