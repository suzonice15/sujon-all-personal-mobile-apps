import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  GC,
  GameBackground,
  GameButton,
  GameNativeAd,
  PressableScale,
  RoundIconButton,
  WoodBanner,
  shadow,
  useGameScreen,
} from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { PROMPT_AUDIO, PROMPT_TEXT } from '../../../data/game01_letterAdventure';
import { playClip } from '../../../utils/gameAudio';

const HERO = require('../../../assets/images/game01/title_hero.jpg');

const LANGUAGES = [
  {
    lang: 'bn',
    label: 'বাংলা',
    sample: 'অ আ ক',
    image: require('../../../assets/images/game01/lang_bangla.jpg'),
    variant: 'primary',
    tint: '#FFE4E8',
  },
  {
    lang: 'en',
    label: 'ইংরেজি',
    sample: 'A B C',
    image: require('../../../assets/images/game01/lang_english.jpg'),
    variant: 'blue',
    tint: '#E3EEFF',
  },
];

export default function LetterAdventureStartScreen({ navigation }) {
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
    playClip(PROMPT_AUDIO.chooseLanguage);
  }, [choosing, appear]);

  const openLevels = (lang) => navigation.navigate('LetterAdventureLevels', { lang });

  return (
    <GameBackground>
      <View style={styles.topBar}>
        <RoundIconButton icon="home" accessibilityLabel="সব খেলা" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }],
          }}
        >
          <Image
            source={HERO}
            accessibilityLabel="বর্ণ ও শব্দের অ্যাডভেঞ্চার"
            style={[styles.hero, { width: contentWidth, height: contentWidth * 0.41 }]}
            resizeMode="cover"
          />
        </Animated.View>

        {!choosing ? (
          <View style={styles.startBlock}>
            <Text style={styles.tagline}>চলো, মজা করে বর্ণ আর শব্দ শিখি!</Text>
            <GameButton
              title="খেলা শুরু করি"
              iconLeft="play-arrow"
              onPress={() => setChoosing(true)}
              style={styles.startBtn}
            />
            <View style={styles.featureRow}>
              {[
                ['volume-up', 'শোনো'],
                ['gesture', 'লিখো'],
                ['image', 'শব্দ দেখো'],
                ['emoji-events', 'তারা জেতো'],
              ].map(([icon, label]) => (
                <View key={label} style={styles.feature}>
                  <MaterialIcons name={icon} size={24} color={GC.red} />
                  <Text style={styles.featureText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Animated.View
            style={[
              styles.chooseBlock,
              {
                opacity: appear,
                transform: [{ translateY: appear.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
              },
            ]}
          >
            <WoodBanner>{PROMPT_TEXT.chooseLanguage}</WoodBanner>
            <View style={[styles.cards, { width: contentWidth }]}>
              {LANGUAGES.map((item) => (
                <PressableScale
                  key={item.lang}
                  onPress={() => openLevels(item.lang)}
                  accessibilityLabel={item.label}
                  style={[styles.langCard, { width: cardWidth, backgroundColor: item.tint }]}
                >
                  <Image
                    source={item.image}
                    style={[styles.langImage, { width: cardWidth - 20, height: (cardWidth - 20) * 0.87 }]}
                    resizeMode="cover"
                  />
                  <Text style={styles.sample}>{item.sample}</Text>
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
  topBar: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8 },
  content: { alignItems: 'center', paddingHorizontal: 16, paddingBottom: 32 },
  hero: { borderRadius: 26, borderWidth: 4, borderColor: GC.white, marginTop: 8 },
  startBlock: { alignItems: 'center', marginTop: 28, width: '100%' },
  tagline: {
    fontSize: 19,
    fontWeight: '800',
    color: GC.ink,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    overflow: 'hidden',
    textAlign: 'center',
  },
  startBtn: { marginTop: 26, paddingHorizontal: 40, minHeight: 70 },
  featureRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: 'rgba(255,248,236,0.92)',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 6,
    ...shadow(4),
  },
  feature: { alignItems: 'center', width: 78, paddingVertical: 4 },
  featureText: { marginTop: 4, fontSize: 14, fontWeight: '700', color: GC.ink },
  chooseBlock: { alignItems: 'center', marginTop: 24, width: '100%' },
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
  sample: { fontSize: 22, fontWeight: '800', color: GC.ink, marginTop: 8 },
  langBtn: { marginTop: 8, alignSelf: 'stretch' },
});
