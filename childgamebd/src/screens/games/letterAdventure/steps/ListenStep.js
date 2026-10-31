import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale, shadow } from '../../../../components/game';
import { PROMPT_AUDIO } from '../../../../data/game01_letterAdventure';
import { playClip, playSequence } from '../../../../utils/gameAudio';

export default function ListenStep({ letter }) {
  const { width } = useWindowDimensions();
  const pulse = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    pop.setValue(0.6);
    Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 8, bounciness: 14 }).start();
    playSequence([PROMPT_AUDIO.listen, letter.audio]);
  }, [letter, pop]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  const sayLetter = () => {
    Animated.sequence([
      Animated.timing(pop, { toValue: 1.12, duration: 120, useNativeDriver: true }),
      Animated.spring(pop, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 12 }),
    ]).start();
    playClip(letter.audio);
  };

  const glyphSize = Math.min(width * (letter.lang === 'en' ? 0.4 : 0.5), 230);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>শোনো</Text>
      <Text style={styles.subtitle}>এই বর্ণটির উচ্চারণ শোনো!</Text>

      <PressableScale onPress={sayLetter} tapSound={false} accessibilityLabel={`${letter.char} শোনো`}>
        <Animated.Text style={[styles.glyph, { fontSize: glyphSize, transform: [{ scale: pop }] }]}>
          {letter.display}
        </Animated.Text>
      </PressableScale>

      {letter.speakName ? (
        <View style={styles.namePill}>
          <Text style={styles.nameText}>
            <Text style={{ color: GC.red }}>{letter.display}</Text> - {letter.speakName}
          </Text>
        </View>
      ) : null}

      <View style={styles.speakerWrap}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ring,
            {
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
              transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] }) }],
            },
          ]}
        />
        <PressableScale onPress={sayLetter} tapSound={false} accessibilityLabel="আবার শোনো" style={styles.speaker}>
          <MaterialIcons name="volume-up" size={44} color={GC.white} />
        </PressableScale>
      </View>
      <Text style={styles.hint}>বর্ণ বা স্পিকারে চাপ দিয়ে আবার শোনো</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: GC.cream,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: GC.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    ...shadow(8),
  },
  title: { fontSize: 28, fontWeight: '800', color: GC.ink },
  subtitle: { fontSize: 17, color: GC.inkSoft, marginTop: 2, fontWeight: '600' },
  glyph: { color: GC.red, fontWeight: '800', textAlign: 'center', includeFontPadding: false },
  namePill: {
    backgroundColor: GC.creamDeep,
    borderRadius: 22,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 6,
  },
  nameText: { fontSize: 20, fontWeight: '800', color: GC.ink },
  speakerWrap: { marginTop: 10, alignItems: 'center', justifyContent: 'center', width: 110, height: 110 },
  ring: { position: 'absolute', width: 88, height: 88, borderRadius: 44, backgroundColor: GC.blue },
  speaker: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: GC.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#D6E6FF',
    ...shadow(6),
  },
  hint: { marginTop: 6, fontSize: 14, color: GC.inkSoft, fontWeight: '600' },
});
