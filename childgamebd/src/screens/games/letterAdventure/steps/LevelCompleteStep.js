import React, { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ConfettiBurst, GC, GameButton, StarRow, WoodBanner, shadow } from '../../../../components/game';
import { PROMPT_AUDIO } from '../../../../data/game01_letterAdventure';
import { SFX, playSequence } from '../../../../utils/gameAudio';
import { toBanglaDigits } from '../../../../utils/banglaNumber';

const SPEAKING_HEAD = require('../../../../assets/images/common/speaking_head.webp');
const PENCIL = require('../../../../assets/images/common/pencil.webp');
const TROPHY = require('../../../../assets/images/common/trophy.webp');

const STARS_TEXT = {
  3: 'অসাধারণ! তুমি সব প্রশ্নের উত্তর প্রথমবারেই দিয়েছো!',
  2: 'খুব ভালো! আরেকবার খেললে ৩টি তারা পাবে!',
  1: 'ভালো চেষ্টা! আবার খেলে আরও তারা জেতো!',
};

export default function LevelCompleteStep({ letter, stars, hasNext, onHome, onNext, onReplay }) {
  const rise = useRef(new Animated.Value(0)).current;
  const levelNo = toBanglaDigits(letter.index + 1);

  useEffect(() => {
    Animated.spring(rise, { toValue: 1, useNativeDriver: true, speed: 8, bounciness: 10 }).start();
    playSequence([SFX.celebrate, PROMPT_AUDIO.levelDone]);
  }, [rise]);

  const tiles = [
    { key: 'know', label: 'চিনেছি', bg: '#E3F0FF' },
    { key: 'say', image: SPEAKING_HEAD, label: 'উচ্চারণ শুনেছি', bg: '#FFF4D6' },
    { key: 'write', image: PENCIL, label: 'লিখেছি', bg: '#FFE6EA' },
    { key: 'words', image: letter.words[0].image, label: 'শব্দ চিনেছি', bg: '#E5F6E4' },
  ];

  return (
    <View style={styles.wrap}>
      <ConfettiBurst trigger={letter.id} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StarRow stars={stars} size={64} animated style={styles.stars} />
        <WoodBanner>
          লেভেল {levelNo} <Text style={{ color: GC.red }}>সম্পন্ন!</Text>
        </WoodBanner>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: rise,
              transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
            },
          ]}
        >
          <Text style={styles.title}>খুব ভালো!</Text>
          <Text style={styles.subtitle}>
            তুমি <Text style={{ color: GC.red }}>‘{letter.display}’</Text> বর্ণটি শিখে ফেলেছো।
          </Text>
          <View style={styles.tiles}>
            {tiles.map((t) => (
              <View key={t.key} style={[styles.tile, { backgroundColor: t.bg }]}>
                {t.image ? (
                  <Image source={t.image} style={styles.tileImage} resizeMode="contain" />
                ) : (
                  <Text style={styles.tileLetter} numberOfLines={1} adjustsFontSizeToFit>
                    {letter.display}
                  </Text>
                )}
                <Text style={styles.tileLabel}>{t.label}</Text>
                <View style={styles.check}>
                  <MaterialIcons name="check" size={20} color={GC.white} />
                </View>
              </View>
            ))}
          </View>
          <Text style={styles.starsText}>{STARS_TEXT[stars]}</Text>
        </Animated.View>

        <View style={styles.actions}>
          {hasNext ? (
            <GameButton
              title={`লেভেল ${toBanglaDigits(letter.index + 2)} এ যাও`}
              iconRight="chevron-right"
              onPress={onNext}
            />
          ) : (
            <View style={styles.allDone}>
              <Image source={TROPHY} style={styles.trophy} resizeMode="contain" />
              <Text style={styles.allDoneText}>তুমি সব বর্ণ শিখে ফেলেছো!</Text>
            </View>
          )}
          <View style={styles.row}>
            <GameButton title="আবার খেলো" iconLeft="replay" variant="light" size="small" onPress={onReplay} style={styles.half} />
            <GameButton title="সব লেভেল" iconLeft="map" variant="light" size="small" onPress={onHome} style={styles.half} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  scroll: { alignItems: 'stretch', paddingBottom: 16 },
  stars: { marginBottom: 6 },
  card: {
    marginTop: 12,
    backgroundColor: GC.cream,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 16,
    alignItems: 'center',
    ...shadow(8),
  },
  title: { fontSize: 28, fontWeight: '800', color: GC.ink },
  subtitle: { fontSize: 18, fontWeight: '700', color: GC.inkSoft, marginTop: 4, textAlign: 'center' },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 },
  tile: {
    width: '46%',
    margin: '2%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 3,
    borderColor: GC.white,
  },
  tileImage: { width: 52, height: 52 },
  tileLetter: { fontSize: 40, lineHeight: 52, fontWeight: '800', color: GC.red },
  tileLabel: { fontSize: 15, fontWeight: '800', color: GC.ink, marginTop: 4 },
  check: {
    marginTop: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GC.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsText: { marginTop: 8, fontSize: 15, fontWeight: '700', color: GC.inkSoft, textAlign: 'center' },
  actions: { marginTop: 18 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  half: { width: '48.5%', paddingHorizontal: 8 },
  allDone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GC.yellow,
    borderRadius: 24,
    paddingVertical: 14,
    borderWidth: 3,
    borderColor: GC.white,
    ...shadow(5),
  },
  trophy: { width: 40, height: 40, marginRight: 8 },
  allDoneText: { textAlign: 'center', fontSize: 19, fontWeight: '800', color: GC.ink },
});
