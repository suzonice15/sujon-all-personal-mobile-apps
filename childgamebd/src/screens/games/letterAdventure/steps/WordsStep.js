import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale, WoodBanner, shadow } from '../../../../components/game';
import { PROMPT_AUDIO } from '../../../../data/game01_letterAdventure';
import { playClip } from '../../../../utils/gameAudio';
import WordText from './WordText';

const TINTS = ['#FFE9EC', '#FFF4D6', '#E5F6E4'];

function WordCard({ letter, word, tint, wide, heard, onPress, delay }) {
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(enter, { toValue: 1, delay, useNativeDriver: true, speed: 9, bounciness: 10 }).start();
  }, [enter, delay]);

  return (
    <Animated.View
      style={[
        wide ? styles.cardWideWrap : styles.cardRowWrap,
        { opacity: enter, transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }] },
      ]}
    >
      <PressableScale
        onPress={onPress}
        tapSound={false}
        accessibilityLabel={word.text}
        style={[wide ? styles.cardWide : styles.cardRow, { backgroundColor: tint }]}
      >
        <Image
          source={word.image}
          style={wide ? styles.pictureWide : styles.picture}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
        <WordText letter={letter} text={word.text} style={[styles.word, wide ? styles.wordWide : styles.wordRow]} />
        <View style={styles.speaker}>
          <MaterialIcons name={heard ? 'check' : 'volume-up'} size={26} color={GC.white} />
        </View>
      </PressableScale>
    </Animated.View>
  );
}

export default function WordsStep({ letter }) {
  const { width } = useWindowDimensions();
  const [heard, setHeard] = useState({});
  const wide = width >= 560;

  useEffect(() => {
    setHeard({});
    playClip(PROMPT_AUDIO.words);
  }, [letter]);

  const sayWord = (word) => {
    setHeard((h) => ({ ...h, [word.id]: true }));
    playClip(word.audio);
  };

  return (
    <View style={styles.wrap}>
      <WoodBanner>
        {letter.mode === 'contains' ? (
          <>
            <Text style={{ color: GC.red }}>‘{letter.display}’</Text> আছে এমন কিছু শব্দ দেখো
          </>
        ) : (
          <>
            <Text style={{ color: GC.red }}>‘{letter.display}’</Text> দিয়ে কী কী শব্দ হয় দেখো
          </>
        )}
      </WoodBanner>
      <ScrollView
        contentContainerStyle={[styles.list, wide && styles.listWide]}
        showsVerticalScrollIndicator={false}
      >
        {letter.words.map((word, i) => (
          <WordCard
            key={word.id}
            letter={letter}
            word={word}
            tint={TINTS[i % TINTS.length]}
            wide={wide}
            heard={!!heard[word.id]}
            delay={i * 140}
            onPress={() => sayWord(word)}
          />
        ))}
      </ScrollView>
      <Text style={styles.hint}>ছবিতে চাপ দিয়ে শব্দটি শোনো 🔊</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  list: { paddingTop: 16, paddingBottom: 8 },
  listWide: { flexDirection: 'row', justifyContent: 'center' },
  cardRowWrap: { marginBottom: 14 },
  cardWideWrap: { flex: 1, marginHorizontal: 7 },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 4,
    borderColor: GC.white,
    paddingVertical: 10,
    paddingHorizontal: 14,
    ...shadow(6),
  },
  cardWide: {
    alignItems: 'center',
    borderRadius: 26,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 16,
    ...shadow(6),
  },
  picture: { width: 84, height: 84 },
  pictureWide: { width: 130, height: 130 },
  word: { fontWeight: '800', color: GC.ink },
  wordRow: { flex: 1, fontSize: 30, marginHorizontal: 10 },
  wordWide: { fontSize: 30, marginVertical: 8 },
  speaker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GC.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#D6E6FF',
  },
  hint: { textAlign: 'center', fontSize: 15, fontWeight: '700', color: GC.ink, marginTop: 4 },
});
