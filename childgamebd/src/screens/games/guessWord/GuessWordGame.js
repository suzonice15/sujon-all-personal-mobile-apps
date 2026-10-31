import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FeedbackBubble,
  GC,
  LevelResultPanel,
  PausePanel,
  RoundDots,
  RoundIconButton,
  StatPill,
  shadow,
} from '../../../components/game';
import {
  ENCOURAGE,
  GAME_ID,
  LEVELS,
  PRAISE,
  PROMPTS,
  QUESTIONS_PER_LEVEL,
  TRACKS,
  buildLevelQuestions,
  starsForCorrect,
} from '../../../data/game03_guessTheWord';
import { saveLevelStars } from '../../../db/gameProgress';
import { SFX, playClip, playSequence, stopAudio } from '../../../utils/gameAudio';
import { toBanglaDigits } from '../../../utils/banglaNumber';
import AnswerPanel from './components/AnswerPanel';
import ClueCard from './components/ClueCard';
import OptionCard from './components/OptionCard';

const CHECK = require('../../../assets/images/common/check_mark.webp');
const CROSS = require('../../../assets/images/common/cross_mark.webp');
const BULB = require('../../../assets/images/common/light_bulb.webp');
const SHOW_ANSWER_DELAY = 900;

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// One play-through of a level (10 questions). Remount with a new `key` to restart.
export default function GuessWordGame({ track, levelIndex, onExit, onRestart, onNextLevel }) {
  const level = LEVELS[track][levelIndex];
  const questions = useMemo(() => buildLevelQuestions(track, levelIndex), [track, levelIndex]);

  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState('ask'); // ask | answer | done
  const [marks, setMarks] = useState({});
  const [results, setResults] = useState([]);
  const [wrongTaps, setWrongTaps] = useState(0);
  const [paused, setPaused] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gridHeight, setGridHeight] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);
  const firstTry = useRef(true);
  const timer = useRef(null);

  const question = questions[qIndex];
  const correctCount = results.filter(Boolean).length;

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    playSequence(qIndex === 0 ? [PROMPTS.instruction.audio, question.clueAudio] : [question.clueAudio]);
  }, [qIndex, question]);

  const choose = (option) => {
    if (phase !== 'ask' || paused || marks[option.word]) {
      return;
    }
    if (option.word === question.answer.word) {
      const praise = pickRandom(PRAISE);
      setMarks((m) => ({ ...m, [option.word]: 'right' }));
      setFeedback({ type: 'success', text: praise.text, key: Date.now() });
      playClip(SFX.correct);
      setResults((r) => [...r, firstTry.current]);
      timer.current = setTimeout(() => {
        setPhase('answer');
        playClip(question.answerAudio);
      }, SHOW_ANSWER_DELAY);
      return;
    }
    const encourage = pickRandom(ENCOURAGE);
    firstTry.current = false;
    setWrongTaps((w) => w + 1);
    setMarks((m) => ({ ...m, [option.word]: 'wrong' }));
    setFeedback({ type: 'retry', text: encourage.text, key: Date.now() });
    playSequence([SFX.wrong, encourage.audio]);
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      const stars = starsForCorrect(correctCount);
      setPhase('done');
      if (stars > 0) {
        playClip(SFX.celebrate);
        saveLevelStars(GAME_ID, track, level.id, stars).catch(() => setSaveFailed(true));
      }
      return;
    }
    firstTry.current = true;
    setMarks({});
    setQIndex((i) => i + 1);
    setPhase('ask');
  };

  const pause = () => {
    stopAudio();
    setPaused(true);
  };

  const header = (
    <>
      <View style={styles.topRow}>
        <RoundIconButton icon="home" size={46} accessibilityLabel="সব লেভেল" onPress={onExit} />
        <RoundDots total={QUESTIONS_PER_LEVEL} current={qIndex} results={results} />
        <RoundIconButton
          icon="pause"
          size={46}
          color={GC.white}
          background={GC.orange}
          accessibilityLabel="খেলা থামাও"
          onPress={pause}
        />
      </View>
      <View style={styles.infoRow}>
        <View style={[styles.badge, { backgroundColor: TRACKS[track].color }]}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {TRACKS[track].title} • লেভেল {toBanglaDigits(levelIndex + 1)}
          </Text>
        </View>
        <Text style={styles.counter}>
          প্রশ্ন {toBanglaDigits(Math.min(qIndex + 1, QUESTIONS_PER_LEVEL))}/{toBanglaDigits(QUESTIONS_PER_LEVEL)}
        </Text>
        <StatPill
          icon={<MaterialIcons name="star" size={26} color={GC.yellow} style={styles.starIcon} />}
          value={toBanglaDigits(correctCount)}
          accessibilityLabel={`সঠিক ${correctCount}`}
        />
      </View>
    </>
  );

  if (phase === 'done') {
    const stars = starsForCorrect(correctCount);
    return (
      <View style={styles.body}>
        <LevelResultPanel
          levelNumber={levelIndex + 1}
          stars={stars}
          stats={[
            {
              key: 'right',
              image: CHECK,
              label: 'প্রথমবারেই সঠিক',
              value: `${toBanglaDigits(correctCount)} / ${toBanglaDigits(QUESTIONS_PER_LEVEL)}`,
              color: GC.greenDark,
            },
            { key: 'wrong', image: CROSS, label: 'ভুল চেষ্টা', value: toBanglaDigits(wrongTaps), color: GC.redDark },
            { key: 'theme', image: BULB, label: 'বিষয়', value: level.theme, color: GC.ink },
          ]}
          passText="তুমি খুব মনোযোগ দিয়ে ইশারা পড়ে সঠিক উত্তর খুঁজেছো!"
          failText="পরের লেভেল খুলতে অন্তত ৫টি প্রশ্নের উত্তর প্রথমবারেই ঠিক দাও।"
          hint="ইশারাটি মন দিয়ে শোনো, তারপর ছবিগুলো দেখে উত্তর দাও।"
          hasNext={levelIndex + 1 < LEVELS[track].length}
          onHome={onExit}
          onReplay={onRestart}
          onNext={onNextLevel}
        />
        {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.body}>
      {header}
      {phase === 'answer' ? (
        <View style={styles.answerWrap}>
          <AnswerPanel
            question={question}
            firstTry={results[results.length - 1]}
            isLast={qIndex + 1 >= questions.length}
            onNext={nextQuestion}
            onReplay={onRestart}
            onHome={onExit}
          />
        </View>
      ) : (
        <>
          <View style={styles.clue}>
            <ClueCard clue={question.clue} onSpeak={() => playClip(question.clueAudio)} />
          </View>
          <View style={styles.optionsCard} onLayout={(e) => setGridHeight(e.nativeEvent.layout.height)}>
            {gridHeight > 0 ? (
              <View style={styles.options}>
                {question.options.map((option, i) => (
                  <OptionCard
                    key={`${question.id}_${option.word}`}
                    option={option}
                    index={i}
                    height={Math.min(240, (gridHeight - 24 - 24) / 2)}
                    state={marks[option.word]}
                    disabled={phase !== 'ask'}
                    onPress={() => choose(option)}
                  />
                ))}
              </View>
            ) : null}
          </View>
        </>
      )}
      <FeedbackBubble feedback={feedback} duration={1000} style={styles.feedback} />
      {paused ? (
        <PausePanel
          onResume={() => {
            setPaused(false);
            if (phase === 'ask') {
              playClip(question.clueAudio);
            }
          }}
          onRestart={onRestart}
          onExit={onExit}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  infoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  badge: {
    flexShrink: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: GC.white,
    ...shadow(3),
  },
  badgeText: { color: GC.white, fontSize: 14, fontWeight: '800' },
  counter: {
    fontSize: 14,
    fontWeight: '800',
    color: GC.ink,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
    marginHorizontal: 6,
  },
  starIcon: { marginRight: 2 },
  clue: { marginTop: 12 },
  optionsCard: {
    flex: 1,
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: GC.cream,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: GC.wood,
    padding: 12,
    justifyContent: 'center',
    ...shadow(8),
  },
  options: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  answerWrap: { flex: 1, marginTop: 8 },
  feedback: { top: '45%' },
  saveError: {
    textAlign: 'center',
    color: GC.redDark,
    fontWeight: '700',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 4,
  },
});
