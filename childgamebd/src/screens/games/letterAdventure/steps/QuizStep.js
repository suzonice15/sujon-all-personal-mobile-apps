import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FeedbackBubble, GC, PressableScale, WoodBanner, shadow } from '../../../../components/game';
import {
  ENCOURAGE,
  PRAISE,
  PROMPT_AUDIO,
  QUIZ_QUESTIONS,
  buildQuiz,
  pickRandom,
} from '../../../../data/game01_letterAdventure';
import { SFX, playSequence } from '../../../../utils/gameAudio';
import { toBanglaDigits } from '../../../../utils/banglaNumber';
import WordText from './WordText';

const NEXT_QUESTION_DELAY = 1500;

function OptionCard({ letter, option, state, onPress }) {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state !== 'wrong') {
      return;
    }
    shake.setValue(0);
    Animated.sequence(
      [10, -10, 8, -8, 4, 0].map((toValue) =>
        Animated.timing(shake, { toValue, duration: 55, useNativeDriver: true }),
      ),
    ).start();
  }, [state, shake]);

  return (
    <Animated.View style={[styles.optionWrap, { transform: [{ translateX: shake }] }]}>
      <PressableScale
        onPress={onPress}
        disabled={state === 'wrong'}
        tapSound={false}
        accessibilityLabel={option.text}
        style={[
          styles.option,
          state === 'right' && styles.optionRight,
          state === 'wrong' && styles.optionWrong,
        ]}
      >
        <Image source={option.image} style={styles.picture} resizeMode="contain" />
        <WordText letter={letter} text={option.text} highlight={state === 'right'} style={styles.word} />
        {state ? (
          <View style={[styles.badge, { backgroundColor: state === 'right' ? GC.green : GC.red }]}>
            <MaterialIcons name={state === 'right' ? 'check' : 'close'} size={22} color={GC.white} />
          </View>
        ) : null}
      </PressableScale>
    </Animated.View>
  );
}

export default function QuizStep({ letter, onFinish }) {
  const quiz = useMemo(() => buildQuiz(letter), [letter]);
  const [qIndex, setQIndex] = useState(0);
  const [marks, setMarks] = useState({});
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const mistakes = useRef(0);
  const timer = useRef(null);

  const question = quiz[qIndex];
  const prompt = letter.mode === 'contains' ? PROMPT_AUDIO.quizContains : PROMPT_AUDIO.quizStart;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    playSequence([prompt, letter.audio]);
  }, [qIndex, prompt, letter]);

  const choose = (option) => {
    if (solved) {
      return;
    }
    if (option.id === question.answerId) {
      const praise = pickRandom(PRAISE);
      setMarks((m) => ({ ...m, [option.id]: 'right' }));
      setSolved(true);
      setFeedback({ type: 'success', text: praise.text, key: Date.now() });
      playSequence([SFX.correct, praise.audio]);
      timer.current = setTimeout(() => {
        if (qIndex + 1 >= quiz.length) {
          onFinish(mistakes.current);
        } else {
          setQIndex((i) => i + 1);
          setMarks({});
          setSolved(false);
        }
      }, NEXT_QUESTION_DELAY);
    } else {
      const encourage = pickRandom(ENCOURAGE);
      mistakes.current += 1;
      setMarks((m) => ({ ...m, [option.id]: 'wrong' }));
      setFeedback({ type: 'retry', text: encourage.text, key: Date.now() });
      playSequence([SFX.wrong, encourage.audio]);
    }
  };

  return (
    <View style={styles.wrap}>
      <WoodBanner>
        {letter.mode === 'contains' ? (
          <>
            কোন শব্দে <Text style={{ color: GC.red }}>‘{letter.display}’</Text> আছে?
          </>
        ) : (
          <>
            কোনটি <Text style={{ color: GC.red }}>‘{letter.display}’</Text> দিয়ে শুরু হয়?
          </>
        )}
      </WoodBanner>
      <View style={styles.card}>
        <View style={styles.instructionRow}>
          <PressableScale
            onPress={() => playSequence([prompt, letter.audio])}
            tapSound={false}
            accessibilityLabel="প্রশ্নটি আবার শোনো"
            style={styles.replay}
          >
            <MaterialIcons name="volume-up" size={28} color={GC.ink} />
          </PressableScale>
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>ছবিটা দেখে সঠিক উত্তরটি বেছে নাও।</Text>
          </View>
        </View>
        <Text style={styles.counter}>
          প্রশ্ন {toBanglaDigits(qIndex + 1)} / {toBanglaDigits(QUIZ_QUESTIONS)}
        </Text>
        <View style={styles.options}>
          {question.options.map((option) => (
            <OptionCard
              key={`${question.id}_${option.id}`}
              letter={letter}
              option={option}
              state={marks[option.id]}
              onPress={() => choose(option)}
            />
          ))}
        </View>
      </View>
      <FeedbackBubble feedback={feedback} style={styles.feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: {
    flex: 1,
    marginTop: 10,
    backgroundColor: GC.cream,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 12,
    ...shadow(8),
  },
  instructionRow: { flexDirection: 'row', alignItems: 'center' },
  replay: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: GC.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(3),
  },
  instruction: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: GC.white,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  instructionText: { fontSize: 16, fontWeight: '700', color: GC.ink },
  counter: { textAlign: 'center', fontSize: 16, fontWeight: '800', color: GC.inkSoft, marginTop: 12 },
  options: { flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  optionWrap: { flex: 1, marginHorizontal: 5 },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 170,
    backgroundColor: GC.white,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: GC.creamBorder,
    paddingVertical: 14,
    paddingHorizontal: 6,
    ...shadow(4),
  },
  optionRight: { borderColor: GC.green, backgroundColor: '#E8F8EF' },
  optionWrong: { borderColor: GC.red, backgroundColor: '#FDECEE', opacity: 0.7 },
  picture: { width: 84, height: 84 },
  word: { marginTop: 10, fontSize: 22, fontWeight: '800', color: GC.ink },
  badge: {
    position: 'absolute',
    top: -12,
    right: -8,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: GC.white,
  },
  feedback: { bottom: 24 },
});
