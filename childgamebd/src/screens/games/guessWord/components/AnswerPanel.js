import React, { useEffect, useRef } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ConfettiBurst,
  GC,
  GameButton,
  PressableScale,
  RoundIconButton,
  StarRow,
  WoodBanner,
  shadow,
} from '../../../../components/game';
import { PROMPTS } from '../../../../data/game03_guessTheWord';
import { playClip } from '../../../../utils/gameAudio';

// Shown after the right picture is chosen: picture, word, (explanation), next / replay / home.
export default function AnswerPanel({ question, firstTry, isLast, onNext, onReplay, onHome }) {
  const rise = useRef(new Animated.Value(0)).current;
  const { answer, explanation } = question;

  useEffect(() => {
    Animated.spring(rise, { toValue: 1, useNativeDriver: true, speed: 9, bounciness: 10 }).start();
  }, [rise]);

  return (
    <View style={styles.wrap}>
      <ConfettiBurst trigger={question.id} pieces={18} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <StarRow stars={firstTry ? 3 : 1} size={46} animated style={styles.stars} />
        <WoodBanner>
          <Text style={{ color: GC.greenDark }}>{PROMPTS.correctTitle.text}</Text>
        </WoodBanner>
        <Animated.View
          style={[
            styles.card,
            { opacity: rise, transform: [{ scale: rise.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] },
          ]}
        >
          <View style={styles.pictureBox}>
            <Image source={answer.image} style={styles.picture} resizeMode="contain" />
            <View style={styles.wordPill}>
              <Text style={styles.word} numberOfLines={1} adjustsFontSizeToFit>
                {answer.word}
              </Text>
            </View>
          </View>
          {explanation ? (
            <View style={styles.explainBox}>
              <View style={styles.explainHeader}>
                <Text style={styles.explainTitle}>ব্যাখ্যা:</Text>
                <PressableScale
                  onPress={() => playClip(question.answerAudio)}
                  tapSound={false}
                  accessibilityLabel="ব্যাখ্যা শোনো"
                  style={styles.explainSpeaker}
                >
                  <MaterialIcons name="campaign" size={26} color={GC.red} />
                </PressableScale>
              </View>
              <Text style={styles.explainText}>{explanation}</Text>
            </View>
          ) : (
            <Text style={styles.line}>{PROMPTS.correctLine.text}</Text>
          )}
        </Animated.View>
        <View style={styles.actions}>
          <RoundIconButton icon="replay" color={GC.white} background={GC.orange} accessibilityLabel="আবার খেলি" onPress={onReplay} />
          <GameButton
            title={isLast ? 'ফলাফল দেখো' : 'পরের প্রশ্ন'}
            iconLeft="play-arrow"
            variant="green"
            onPress={onNext}
            style={styles.next}
          />
          <RoundIconButton icon="home" color={GC.white} background={GC.blue} accessibilityLabel="হোম" onPress={onHome} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  scroll: { paddingBottom: 12 },
  stars: { marginBottom: 4 },
  card: {
    marginTop: 12,
    backgroundColor: GC.cream,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: GC.wood,
    padding: 14,
    alignItems: 'stretch',
    ...shadow(8),
  },
  pictureBox: {
    alignItems: 'center',
    backgroundColor: '#EEF8EC',
    borderRadius: 22,
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 12,
  },
  picture: { width: 140, height: 140 },
  wordPill: {
    alignSelf: 'stretch',
    marginTop: 8,
    backgroundColor: '#DDF3DF',
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#A8DCAE',
    paddingVertical: 6,
  },
  word: { fontSize: 28, fontWeight: '800', color: '#215B2B', textAlign: 'center' },
  line: { marginTop: 12, fontSize: 19, fontWeight: '800', color: GC.ink, textAlign: 'center' },
  explainBox: {
    marginTop: 12,
    backgroundColor: '#FFFBEA',
    borderRadius: 18,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E9C46A',
    padding: 12,
  },
  explainHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  explainTitle: { fontSize: 17, fontWeight: '800', color: '#2E6B35', textDecorationLine: 'underline' },
  explainSpeaker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GC.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(2),
  },
  explainText: { marginTop: 6, fontSize: 17, lineHeight: 26, fontWeight: '700', color: '#5A2D14' },
  actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 },
  next: { flex: 1, marginHorizontal: 12 },
});
