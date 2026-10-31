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
import { PROMPT_AUDIO, PROMPT_TEXT } from '../../../data/game01_letterAdventure';
import { playClip } from '../../../utils/gameAudio';

const HERO = require('../../../assets/images/game02/title_hero.jpg');

const SUBJECTS = [
  {
    track: 'bn',
    label: 'বাংলা',
    detail: 'অ আ ক খ খুঁজে বের করো',
    image: require('../../../assets/images/game02/subject_bangla.jpg'),
    variant: 'primary',
    tint: '#FFE4E8',
  },
  {
    track: 'math',
    label: 'গণিত',
    detail: '১ ২ ৩ সংখ্যা খুঁজে বের করো',
    image: require('../../../assets/images/game02/subject_math.jpg'),
    variant: 'green',
    tint: '#E3F6E8',
  },
  {
    track: 'en',
    label: 'ইংরেজি',
    detail: 'A B C লেটার খুঁজে বের করো',
    image: require('../../../assets/images/game02/subject_english.jpg'),
    variant: 'blue',
    tint: '#E3EEFF',
  },
];

export default function SeekRushStartScreen({ navigation }) {
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
    playClip(PROMPT_AUDIO.chooseLanguage);
  }, [choosing, appear]);

  const openLevels = (track) => navigation.navigate('SeekRushLevels', { track });

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
            accessibilityLabel="বর্ণ ও সংখ্যা খোঁজার অভিযান"
            style={[styles.hero, { width: contentWidth, height: contentWidth * 0.634 }]}
            resizeMode="cover"
          />
        </Animated.View>

        {!choosing ? (
          <View style={styles.startBlock}>
            <GameButton title="খেলা শুরু করি" iconLeft="play-arrow" onPress={() => setChoosing(true)} style={styles.startBtn} />
            <View style={styles.howTo}>
              <Text style={styles.howToTitle}>কীভাবে খেলবে?</Text>
              <Text style={styles.howToText}>শোনো → খুঁজে বের করো → ট্যাপ করো</Text>
              <Text style={styles.howToText}>সময় শেষ হওয়ার আগেই সঠিকটি খুঁজে নাও!</Text>
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
            <WoodBanner>{PROMPT_TEXT.chooseLanguage}</WoodBanner>
            {SUBJECTS.map((item) => (
              <PressableScale
                key={item.track}
                onPress={() => openLevels(item.track)}
                accessibilityLabel={item.label}
                style={[styles.subjectCard, { backgroundColor: item.tint }]}
              >
                <Image source={item.image} style={styles.subjectImage} resizeMode="cover" />
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectDetail}>{item.detail}</Text>
                  <GameButton
                    title={item.label}
                    variant={item.variant}
                    size="small"
                    iconRight="chevron-right"
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
  startBtn: { paddingHorizontal: 40, minHeight: 70 },
  howTo: {
    marginTop: 24,
    backgroundColor: 'rgba(255,248,236,0.94)',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    ...shadow(4),
  },
  howToTitle: { fontSize: 18, fontWeight: '800', color: GC.red },
  howToText: { fontSize: 15, fontWeight: '700', color: GC.ink, marginTop: 4, textAlign: 'center' },
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
  subjectImage: { width: 112, height: 97, borderRadius: 18 },
  subjectInfo: { flex: 1, marginLeft: 12 },
  subjectDetail: { fontSize: 15, fontWeight: '700', color: GC.ink, marginBottom: 8 },
  subjectBtn: { alignSelf: 'stretch' },
});
