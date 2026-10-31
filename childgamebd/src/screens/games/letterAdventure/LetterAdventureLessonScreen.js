import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  GC,
  GameBackground,
  GameButton,
  RoundIconButton,
  StepProgress,
  shadow,
  useGameScreen,
} from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { GAME_ID, LETTERS, STEPS, starsForMistakes } from '../../../data/game01_letterAdventure';
import { saveLevelStars } from '../../../db/gameProgress';
import { toBanglaDigits } from '../../../utils/banglaNumber';
import ListenStep from './steps/ListenStep';
import TraceStep from './steps/TraceStep';
import WordsStep from './steps/WordsStep';
import QuizStep from './steps/QuizStep';
import LevelCompleteStep from './steps/LevelCompleteStep';

const QUIZ_STEP = STEPS.indexOf('quiz');
const DONE_STEP = STEPS.indexOf('done');
const TRACE_STEP = STEPS.indexOf('trace');

export default function LetterAdventureLessonScreen({ navigation, route }) {
  const lang = route.params?.lang === 'en' ? 'en' : 'bn';
  const index = Number(route.params?.index) || 0;
  const letters = LETTERS[lang];
  const letter = letters[index];

  const [step, setStep] = useState(0);
  const [traced, setTraced] = useState(false);
  const [stars, setStars] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [saveFailed, setSaveFailed] = useState(false);
  useGameScreen();

  const backToLevels = () => navigation.navigate('LetterAdventureLevels', { lang });

  if (!letter) {
    return (
      <GameBackground style={styles.center}>
        <Text style={styles.errorText}>দুঃখিত! লেভেলটি খুঁজে পাওয়া যায়নি।</Text>
        <GameButton title="সব লেভেল" iconLeft="map" onPress={backToLevels} />
      </GameBackground>
    );
  }

  const finishQuiz = (mistakes) => {
    const earned = starsForMistakes(mistakes);
    setStars(earned);
    setStep(DONE_STEP);
    setSaveFailed(false);
    saveLevelStars(GAME_ID, lang, letter.id, earned).catch(() => setSaveFailed(true));
  };

  const replay = () => {
    setStep(0);
    setTraced(false);
    setStars(0);
    setAttempt((a) => a + 1);
  };

  const renderStep = () => {
    switch (STEPS[step]) {
      case 'listen':
        return <ListenStep letter={letter} />;
      case 'trace':
        return <TraceStep letter={letter} completed={traced} onComplete={() => setTraced(true)} />;
      case 'words':
        return <WordsStep letter={letter} />;
      case 'quiz':
        return <QuizStep letter={letter} onFinish={finishQuiz} />;
      default:
        return (
          <LevelCompleteStep
            letter={letter}
            stars={stars}
            hasNext={index + 1 < letters.length}
            onHome={backToLevels}
            onReplay={replay}
            onNext={() => navigation.replace('LetterAdventureLesson', { lang, index: index + 1 })}
          />
        );
    }
  };

  const nextDisabled = step === TRACE_STEP && !traced;

  return (
    <GameBackground>
      <View style={styles.topBar}>
        <RoundIconButton icon="home" accessibilityLabel="সব লেভেল" onPress={backToLevels} />
        <StepProgress total={STEPS.length} current={step} />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>লেভেল {toBanglaDigits(index + 1)}</Text>
          <Text style={styles.levelChar} numberOfLines={1}>
            {letter.display}
          </Text>
        </View>
      </View>

      <View style={styles.body} key={`${letter.id}_${attempt}_${step}`}>
        {renderStep()}
      </View>

      {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}

      {step < DONE_STEP ? (
        <View style={styles.bottomBar}>
          {step > 0 ? (
            <GameButton
              title="পেছনে"
              iconLeft="chevron-left"
              variant="light"
              size="small"
              onPress={() => setStep((s) => s - 1)}
            />
          ) : (
            <View />
          )}
          {step < QUIZ_STEP ? (
            <GameButton
              title={nextDisabled ? 'আগে লিখো' : 'পরবর্তী'}
              iconRight="chevron-right"
              disabled={nextDisabled}
              onPress={() => setStep((s) => s + 1)}
            />
          ) : null}
        </View>
      ) : null}
      <AdBanner />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 18, fontWeight: '800', color: GC.ink, marginBottom: 16, textAlign: 'center' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  levelBadge: {
    alignItems: 'center',
    minWidth: 64,
    backgroundColor: GC.cream,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: GC.woodLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    ...shadow(4),
  },
  levelText: { fontSize: 12, fontWeight: '800', color: GC.ink },
  levelChar: { fontSize: 20, fontWeight: '800', color: GC.red, lineHeight: 26 },
  body: { flex: 1, paddingHorizontal: 14, paddingTop: 16, paddingBottom: 8 },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 8,
  },
  saveError: {
    textAlign: 'center',
    color: GC.redDark,
    fontWeight: '700',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginHorizontal: 14,
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 4,
  },
});
