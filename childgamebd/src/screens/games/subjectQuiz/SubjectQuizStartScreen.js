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
import { PROMPTS, TRACKS } from '../../../data/game06_subjectQuiz';
import { playClip } from '../../../utils/gameAudio';

const HERO = require('../../../assets/images/game06/title_hero.jpg');
const BULB = require('../../../assets/images/common/light_bulb.webp');

export default function SubjectQuizStartScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [choosing, setChoosing] = useState(false);
  const appear = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  useGameScreen();

  const contentWidth = Math.min(width - 32, 560);
  const cardWidth = (contentWidth - 12) / 2;

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
    playClip(PROMPTS.chooseSubject.audio);
  }, [choosing, appear]);

  const openLevels = (track) => navigation.navigate('SubjectQuizLevels', { track });

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
            accessibilityLabel="বিষয়ভিত্তিক কুইজ"
            style={[styles.hero, { width: contentWidth, height: contentWidth * 0.637 }]}
            resizeMode="cover"
          />
        </Animated.View>

        {!choosing ? (
          <View style={styles.startBlock}>
            <GameButton title="খেলা শুরু করি" iconLeft="play-arrow" variant="green" onPress={() => setChoosing(true)} style={styles.startBtn} />
            <View style={styles.howTo}>
              <Image source={BULB} style={styles.bulb} resizeMode="contain" />
              <Text style={styles.howToText}>৫টি বিষয়, প্রতিটিতে ১৫টি লেভেল! প্রশ্ন শুনে সঠিক ছবিটি বেছে নাও।</Text>
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
            <WoodBanner>{PROMPTS.chooseSubject.text}</WoodBanner>
            <View style={styles.cards}>
              {Object.values(TRACKS).map((item) => (
                <PressableScale
                  key={item.key}
                  onPress={() => openLevels(item.key)}
                  accessibilityLabel={item.title}
                  style={[styles.card, { width: cardWidth, borderColor: item.color }]}
                >
                  <Image
                    source={item.image}
                    style={[styles.cardImage, { width: cardWidth - 12, height: (cardWidth - 12) * 0.72 }]}
                    resizeMode="cover"
                  />
                </PressableScale>
              ))}
            </View>
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
  cards: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 },
  card: {
    margin: 3,
    padding: 6,
    borderRadius: 22,
    borderWidth: 3,
    backgroundColor: GC.white,
    alignItems: 'center',
    ...shadow(6),
  },
  cardImage: { borderRadius: 16 },
});
