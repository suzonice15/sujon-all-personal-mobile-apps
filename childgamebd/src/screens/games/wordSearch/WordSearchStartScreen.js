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
import { PROMPTS } from '../../../data/game04_wordSearch';
import { playClip } from '../../../utils/gameAudio';

const HERO = require('../../../assets/images/game04/title_hero.jpg');
const MAGNIFIER = require('../../../assets/images/common/magnifier.webp');

const LANGUAGES = [
  { lang: 'bn', label: 'বাংলা', image: require('../../../assets/images/game04/lang_bn.jpg'), variant: 'primary', tint: '#FFE4EF' },
  { lang: 'en', label: 'English', image: require('../../../assets/images/game04/lang_en.jpg'), variant: 'blue', tint: '#E3EEFF' },
];

export default function WordSearchStartScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [choosing, setChoosing] = useState(false);
  const appear = useRef(new Animated.Value(0)).current;
  const bob = useRef(new Animated.Value(0)).current;
  useGameScreen();

  const contentWidth = Math.min(width - 32, 560);
  const cardWidth = (contentWidth - 14) / 2;

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
    playClip(PROMPTS.chooseLanguage.audio);
  }, [choosing, appear]);

  const openLevels = (lang) => navigation.navigate('WordSearchLevels', { lang });

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
            accessibilityLabel="Word Search শব্দ খোঁজার অভিযান"
            style={[styles.hero, { width: contentWidth, height: contentWidth * 0.263 }]}
            resizeMode="cover"
          />
        </Animated.View>

        {!choosing ? (
          <View style={styles.startBlock}>
            <GameButton title="খেলা শুরু করি" iconLeft="play-arrow" variant="green" onPress={() => setChoosing(true)} style={styles.startBtn} />
            <View style={styles.howTo}>
              <Image source={MAGNIFIER} style={styles.howToImage} resizeMode="contain" />
              <View style={styles.howToTextWrap}>
                <Text style={styles.howToTitle}>কীভাবে খেলবে?</Text>
                <Text style={styles.howToText}>১. ওপরের ছবি দেখে শব্দটি চেনো</Text>
                <Text style={styles.howToText}>২. গ্রিডে শব্দটি খুঁজে আঙুল দিয়ে টানো</Text>
                <Text style={styles.howToText}>৩. সময় শেষের আগে সব শব্দ খুঁজে তারা জেতো!</Text>
              </View>
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
            <WoodBanner>{PROMPTS.chooseLanguage.text}</WoodBanner>
            <View style={styles.cards}>
              {LANGUAGES.map((item) => (
                <PressableScale
                  key={item.lang}
                  onPress={() => openLevels(item.lang)}
                  accessibilityLabel={item.label}
                  style={[styles.langCard, { width: cardWidth, backgroundColor: item.tint }]}
                >
                  <Image
                    source={item.image}
                    style={[styles.langImage, { width: cardWidth - 20, height: (cardWidth - 20) * 0.74 }]}
                    resizeMode="cover"
                  />
                  <GameButton
                    title={item.label}
                    variant={item.variant}
                    size="small"
                    iconRight="chevron-right"
                    onPress={() => openLevels(item.lang)}
                    style={styles.langBtn}
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
    padding: 12,
    ...shadow(4),
  },
  howToImage: { width: 56, height: 56 },
  howToTextWrap: { flexShrink: 1, marginLeft: 12 },
  howToTitle: { fontSize: 18, fontWeight: '800', color: GC.red, marginBottom: 2 },
  howToText: { fontSize: 15, fontWeight: '700', color: GC.ink, marginTop: 2 },
  chooseBlock: { alignItems: 'stretch', marginTop: 20 },
  cards: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  langCard: {
    alignItems: 'center',
    borderRadius: 26,
    padding: 10,
    borderWidth: 4,
    borderColor: GC.white,
    ...shadow(8),
  },
  langImage: { borderRadius: 18 },
  langBtn: { marginTop: 10, alignSelf: 'stretch' },
});
