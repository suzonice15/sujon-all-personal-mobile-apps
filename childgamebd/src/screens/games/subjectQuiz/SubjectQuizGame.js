import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FeedbackBubble,
  GC,
  GameButton,
  LevelResultPanel,
  PausePanel,
  PressableScale,
  RoundIconButton,
  StarRow,
  StatPill,
  shadow,
} from '../../../components/game';
import {
  ENCOURAGE,
  GAME_ID,
  LEVELS,
  POINTS_PER_QUESTION,
  PRAISE,
  PROMPTS,
  QUESTIONS_PER_LEVEL,
  QUESTION_SECONDS,
  TRACKS,
  buildLevelQuestions,
  starsForCorrect,
} from '../../../data/game06_subjectQuiz';
import { saveLevelStars } from '../../../db/gameProgress';
import { SFX, playClip, playSequence, stopAudio } from '../../../utils/gameAudio';
import { formatClock, toBanglaDigits } from '../../../utils/banglaNumber';
import QuizOption from './components/QuizOption';

const CLOCK = require('../../../assets/images/common/alarm_clock.webp');
const CHECK = require('../../../assets/images/common/check_mark.webp');
const STAR = require('../../../assets/images/common/glowing_star.webp');

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// One play of a level (5 questions). Remount with a new `key` to restart.
export default function SubjectQuizGame({ track, levelIndex, onExit, onRestart, onNextLevel }) {
  const info = TRACKS[track];
  const level = LEVELS[track][levelIndex];
  const questions = useMemo(() => buildLevelQuestions(track, levelIndex), [track, levelIndex]);

  const [current, setCurrent] = useState(0); // the question being answered
  const [view, setView] = useState(0); // the question on screen (can go back to review)
  const [answers, setAnswers] = useState({}); // index -> chosen key (null = time ran out)
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [gridHeight, setGridHeight] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);
  const elapsed = useRef(0);

  const q = questions[view];
  const answered = answers[view] !== undefined;
  const correctCount = questions.filter((qq, i) => answers[i] === qq.answerKey).length;
  const waiting = answers[current] === undefined; // current question still open

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => state !== 'active' && setPaused(true));
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (view === current && waiting) {
      playSequence(questions[current].audio);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    if (!waiting || paused || done) {
      return undefined;
    }
    const tick = setInterval(() => {
      elapsed.current += 1;
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(tick);
  }, [waiting, paused, done]);

  const record = useCallback(
    (key) => {
      const question = questions[current];
      setAnswers((a) => ({ ...a, [current]: key }));
      setView(current);
      if (key === null) {
        setFeedback({ type: 'retry', text: PROMPTS.timeUp.text, key: Date.now() });
        playSequence([SFX.wrong, PROMPTS.timeUp.audio]);
      } else if (key === question.answerKey) {
        const praise = pickRandom(PRAISE);
        setFeedback({ type: 'success', text: praise.text, key: Date.now() });
        playSequence([SFX.correct, question.answerAudio || praise.audio]);
      } else {
        const encourage = pickRandom(ENCOURAGE);
        setFeedback({ type: 'retry', text: encourage.text, key: Date.now() });
        playSequence([SFX.wrong, encourage.audio]);
      }
    },
    [current, questions],
  );

  useEffect(() => {
    if (waiting && timeLeft <= 0) {
      record(null);
    }
  }, [timeLeft, waiting, record]);

  const goNext = () => {
    if (view < current) {
      setView(view + 1);
      return;
    }
    if (current + 1 >= questions.length) {
      const stars = starsForCorrect(correctCount);
      setDone(true);
      if (stars > 0) {
        playSequence([SFX.celebrate, PROMPTS.levelDone.audio]);
        saveLevelStars(GAME_ID, track, level.id, stars).catch(() => setSaveFailed(true));
      } else {
        playClip(PROMPTS.tryAgain.audio);
      }
      return;
    }
    setCurrent(current + 1);
    setView(current + 1);
    setTimeLeft(QUESTION_SECONDS);
  };

  const optionState = (option) => {
    if (!answered) {
      return undefined;
    }
    if (option.key === q.answerKey) {
      return answers[view] === option.key ? 'right' : 'reveal';
    }
    return answers[view] === option.key ? 'wrong' : undefined;
  };

  if (done) {
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
              label: 'সঠিক উত্তর',
              value: `${toBanglaDigits(correctCount)} / ${toBanglaDigits(QUESTIONS_PER_LEVEL)}`,
              color: GC.greenDark,
            },
            { key: 'time', image: CLOCK, label: 'সময় লেগেছে', value: formatClock(elapsed.current), color: GC.blue },
            { key: 'score', image: STAR, label: 'তোমার স্কোর', value: toBanglaDigits(correctCount * POINTS_PER_QUESTION), color: '#7B3FD1' },
          ]}
          passText={`তুমি লেভেল ${toBanglaDigits(levelIndex + 1)} সফলভাবে সম্পন্ন করেছো!`}
          failText="পরের লেভেল খুলতে অন্তত ৩টি প্রশ্নের সঠিক উত্তর দাও।"
          hint={PROMPTS.tryAgain.text}
          hasNext={levelIndex + 1 < LEVELS[track].length}
          onHome={onExit}
          onReplay={onRestart}
          onNext={onNextLevel}
        />
        {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}
      </View>
    );
  }

  const optionHeight = gridHeight ? Math.min(200, (gridHeight - 12) / 2) : 0;
  const isLast = view === questions.length - 1;

  return (
    <View style={styles.body}>
      <View style={styles.topRow}>
        <RoundIconButton icon="home" size={46} accessibilityLabel="সব লেভেল" onPress={onExit} />
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>লেভেল {toBanglaDigits(levelIndex + 1)}</Text>
          <StarRow stars={starsForCorrect(correctCount + (QUESTIONS_PER_LEVEL - current - (waiting ? 0 : 1)))} size={16} />
        </View>
        <StatPill
          image={CLOCK}
          value={formatClock(waiting ? timeLeft : 0)}
          alert={waiting && timeLeft <= 5}
          accessibilityLabel={`বাকি সময় ${timeLeft} সেকেন্ড`}
        />
        <RoundIconButton
          icon="pause"
          size={46}
          color={GC.white}
          background={GC.orange}
          accessibilityLabel="খেলা থামাও"
          onPress={() => {
            stopAudio();
            setPaused(true);
          }}
        />
      </View>

      <View style={[styles.subject, { backgroundColor: info.color }]}>
        <Text style={styles.subjectText} numberOfLines={1}>
          {info.title} • {level.theme}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.questionRow}>
          <PressableScale onPress={() => playSequence(q.audio)} tapSound={false} accessibilityLabel="প্রশ্নটি শোনো" style={styles.speaker}>
            <MaterialIcons name="volume-up" size={30} color={GC.white} />
          </PressableScale>
          <Text style={[styles.question, q.bigText && styles.questionBig]} numberOfLines={3} adjustsFontSizeToFit>
            {q.text}
          </Text>
          {q.picture ? <Image source={q.picture} style={styles.questionPicture} resizeMode="contain" /> : null}
        </View>
        <View style={styles.options} onLayout={(e) => setGridHeight(e.nativeEvent.layout.height)}>
          {optionHeight > 0
            ? q.options.map((option, i) => (
                <QuizOption
                  key={`${q.id}_${option.key}`}
                  option={option}
                  index={i}
                  display={q.display}
                  height={optionHeight}
                  state={optionState(option)}
                  revealLabel={answered}
                  disabled={answered || view !== current || paused}
                  onPress={() => record(option.key)}
                />
              ))
            : null}
        </View>
      </View>

      <View style={styles.navRow}>
        <GameButton
          title="পূর্বের প্রশ্ন"
          iconLeft="arrow-back"
          variant="blue"
          size="small"
          disabled={view === 0}
          onPress={() => setView(view - 1)}
          style={styles.navBtn}
        />
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {toBanglaDigits(view + 1)} / {toBanglaDigits(questions.length)}
          </Text>
        </View>
        <GameButton
          title={isLast && answered ? 'ফলাফল' : 'পরের প্রশ্ন'}
          iconRight="arrow-forward"
          variant="green"
          size="small"
          disabled={!answered}
          onPress={goNext}
          style={styles.navBtn}
        />
      </View>

      <FeedbackBubble feedback={feedback} duration={1000} style={styles.feedback} />
      {paused ? (
        <PausePanel
          onResume={() => {
            setPaused(false);
            if (waiting) {
              playSequence(questions[current].audio);
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
  levelPill: {
    alignItems: 'center',
    backgroundColor: GC.woodLight,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: GC.wood,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  levelText: { fontSize: 13, fontWeight: '800', color: GC.ink },
  subject: {
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 3,
    borderColor: GC.white,
    maxWidth: '92%',
    ...shadow(4),
  },
  subjectText: { color: GC.white, fontSize: 16, fontWeight: '800' },
  card: {
    flex: 1,
    marginTop: 10,
    backgroundColor: GC.cream,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: GC.wood,
    padding: 10,
    ...shadow(8),
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDE2EC',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#F2A7C3',
    padding: 8,
    minHeight: 76,
  },
  speaker: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E0287D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFD0E2',
  },
  question: { flex: 1, marginLeft: 10, fontSize: 19, lineHeight: 27, fontWeight: '800', color: '#4A2C17' },
  questionBig: { fontSize: 32, lineHeight: 40, textAlign: 'center' },
  questionPicture: { width: 90, height: 90, marginLeft: 6 },
  options: { flex: 1, marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'center' },
  navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  navBtn: { paddingHorizontal: 10 },
  counter: { backgroundColor: GC.woodDark, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 6 },
  counterText: { color: GC.white, fontSize: 17, fontWeight: '800' },
  feedback: { top: '42%' },
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
