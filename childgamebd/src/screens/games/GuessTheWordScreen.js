import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { BANGLA_CLUES, ENGLISH_CLUES, getClueRound } from '../../data/game03_guessTheWord';

const TOTAL_QUESTIONS = 10;
const TIMER_SECONDS = 28;

const pad = (n) => String(n).padStart(2, '0');

const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const generateOptions = (lang, correctWord, excludeClue) => {
  const pool = lang === 'en' ? ENGLISH_CLUES : BANGLA_CLUES;
  const others = pool
    .filter((c) => c.word !== correctWord && (!excludeClue || c.clue !== excludeClue.clue))
    .map((c) => c.word);
  const shuffledOthers = shuffle(others);
  const distractors = shuffledOthers.slice(0, 3);
  while (distractors.length < 3) {
    const fallback = lang === 'en' ? ['Ball', 'Fish', 'Box'] : ['পাতা', 'ছাতা', 'কলম'];
    for (let i = 0; i < fallback.length && distractors.length < 3; i += 1) {
      if (!distractors.includes(fallback[i]) && fallback[i] !== correctWord) {
        distractors.push(fallback[i]);
      }
    }
    break;
  }
  const options = shuffle([correctWord, ...distractors.slice(0, 3)]);
  return options;
};

const generateQuestion = (lang, level) => {
  const clue = getClueRound(lang, level);
  const options = generateOptions(lang, clue.word, clue);
  return {
    ...clue,
    options,
    correctAnswer: clue.word,
  };
};

export default function GuessTheWordScreen({ navigation }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [stage, setStage] = useState('lang');
  const [lang, setLang] = useState('bn');
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [review, setReview] = useState([]);

  useEffect(() => {
    if (stage !== 'play' || timeLeft <= 0 || isAnswered) {
      return undefined;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft, isAnswered]);

  useEffect(() => {
    if (stage === 'play' && timeLeft === 0 && !isAnswered) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, stage]);

  const startGame = (chosen) => {
    setLang(chosen);
    setLevel(1);
    const qs = Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(chosen, 1));
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setReview([]);
    setStage('play');
  };

  const handleTimeout = () => {
    if (isAnswered) return;
    const currentQ = questions[currentIndex];
    setSelectedOption(null);
    setIsAnswered(true);
    setReview((prev) => [
      ...prev,
      {
        question: currentQ.clue,
        correctAnswer: currentQ.correctAnswer,
        userAnswer: null,
        isCorrect: false,
      },
    ]);
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    const currentQ = questions[currentIndex];
    setSelectedOption(option);
    setIsAnswered(true);
    const correct = option === currentQ.correctAnswer;
    if (correct) {
      setScore((s) => s + 1);
    }
    setReview((prev) => [
      ...prev,
      {
        question: currentQ.clue,
        correctAnswer: currentQ.correctAnswer,
        userAnswer: option,
        isCorrect: correct,
      },
    ]);
  };

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setStage('result');
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(TIMER_SECONDS);
  };

  const playAgain = () => {
    const qs = Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(lang, level));
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setReview([]);
    setStage('play');
  };

  const nextLevel = () => {
    const nextLvl = level + 1 > 12 ? 12 : level + 1;
    setLevel(nextLvl);
    const qs = Array.from({ length: TOTAL_QUESTIONS }, () => generateQuestion(lang, nextLvl));
    setQuestions(qs);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setReview([]);
    setStage('play');
  };

  const goHome = () => navigation.navigate('HomeScreen');

  if (stage === 'lang') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: colors.background || '#EAF6FF' }]}>
        <View style={s.langBannerWrap}>
          <View style={s.langBannerOverlay} />
          <Text style={s.langGameTitle}>শব্দ খুঁজার অভিযান</Text>
          <Text style={s.langGameSubtitle}>Guess the Word from Clue</Text>
        </View>
        <Text style={s.langPick}>ভাষা নির্বাচন করো / Select Language</Text>
        <View style={s.langBtns}>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[s.langBtn, { backgroundColor: '#E91E63' }]}
            onPress={() => startGame('bn')}
          >
            <Text style={s.langLetterBig}>অ আ ক খ</Text>
            <Text style={s.langBtnText}>বাংলা</Text>
            <MaterialIcons name="play-arrow" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[s.langBtn, { backgroundColor: '#1E88E5' }]}
            onPress={() => startGame('en')}
          >
            <Text style={s.langLetterBig}>A B C D</Text>
            <Text style={s.langBtnText}>English</Text>
            <MaterialIcons name="play-arrow" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={s.langBack} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#37474F" />
          <Text style={s.langBackText}>ফিরে যাও</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (stage === 'result') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: colors.background || '#EAF6FF' }]}>
        <ScrollView contentContainerStyle={s.resultScroll} showsVerticalScrollIndicator={false}>
          <View style={s.resultCard}>
            <View style={s.resultStars}>
              <MaterialIcons name="star" size={54} color="#FFC107" />
              <MaterialIcons name="star" size={74} color="#FFB300" />
              <MaterialIcons name="star" size={54} color="#FFC107" />
            </View>
            <Text style={s.resultTitle}>অভিনন্দন!</Text>
            <Text style={s.resultSub}>Level {level} complete</Text>
            <View style={s.resultScorePill}>
              <MaterialIcons name="star" size={28} color="#FFB300" />
              <Text style={s.resultScoreText}>
                {score} / {TOTAL_QUESTIONS}
              </Text>
            </View>
            <Text style={s.resultLevel}>Level {level} complete</Text>

            <View style={s.reviewSection}>
              <Text style={s.reviewTitle}>Review</Text>
              {review.map((r, idx) => (
                <View key={idx} style={s.reviewItem}>
                  <View style={s.reviewHeader}>
                    <Text style={s.reviewQnum}>Q{idx + 1}</Text>
                    <MaterialIcons
                      name={r.isCorrect ? 'check-circle' : 'cancel'}
                      size={20}
                      color={r.isCorrect ? '#2E9E4F' : '#E53935'}
                    />
                  </View>
                  <Text style={s.reviewClue} numberOfLines={3}>
                    {r.question}
                  </Text>
                  <Text style={s.reviewAns}>
                    {lang === 'bn' ? 'সঠিক উত্তর: ' : 'Correct: '}
                    <Text style={s.reviewAnsCorrect}>{r.correctAnswer}</Text>
                  </Text>
                  {!r.isCorrect && (
                    <Text style={s.reviewAns}>
                      {lang === 'bn' ? 'তোমার উত্তর: ' : 'Your answer: '}
                      <Text style={s.reviewAnsWrong}>{r.userAnswer || (lang === 'bn' ? 'সময় শেষ' : 'Time up')}</Text>
                    </Text>
                  )}
                </View>
              ))}
            </View>

            <View style={s.resultBtns}>
              <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#2E9E4F' }]} onPress={nextLevel}>
                <MaterialIcons name="navigate-next" size={24} color="#fff" />
                <Text style={s.bigBtnText}>{lang === 'bn' ? 'পরের লেভেল' : 'Next Level'}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#7C4DFF' }]} onPress={playAgain}>
                <MaterialIcons name="replay" size={22} color="#fff" />
                <Text style={s.bigBtnText}>{lang === 'bn' ? 'আবার খেলি' : 'Play Again'}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={s.resultHome} onPress={goHome}>
              <MaterialIcons name="home" size={20} color="#37474F" />
              <Text style={s.resultHomeText}>{lang === 'bn' ? 'হোমে ফিরি' : 'Home'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) {
    return null;
  }

  return (
    <SafeAreaView style={[s.root, { backgroundColor: colors.background || '#EAF6FF' }]}>
      <ScrollView contentContainerStyle={s.playScroll} showsVerticalScrollIndicator={false}>
        <View style={s.topRow}>
          <TouchableOpacity style={s.circleBtn} onPress={goHome}>
            <MaterialIcons name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={s.starPill}>
            <MaterialIcons name="star" size={18} color="#FFB300" />
            <Text style={s.starPillText}>{score}</Text>
          </View>
          <View style={s.titleBox}>
            <Text style={s.playTitle}>{lang === 'bn' ? 'শব্দ খুঁজার অভিযান' : 'Guess the Word'}</Text>
            <View style={s.levelPill}>
              <Text style={s.levelPillText}>
                {lang === 'bn' ? `লেভেল ${level}` : `Level ${level}`}
              </Text>
            </View>
          </View>
          <View style={s.timerPill}>
            <MaterialIcons name="access-time" size={17} color="#2E7D32" />
            <Text style={s.timerText}>{`${pad(Math.floor(timeLeft / 60))}:${pad(timeLeft % 60)}`}</Text>
          </View>
        </View>

        <View style={s.progressRow}>
          <Text style={s.progressText}>
            {lang === 'bn' ? `প্রশ্ন ${currentIndex + 1}/6` : `Question ${currentIndex + 1}/6`}
          </Text>
        </View>

        <View style={s.timerBarWrap}>
          <View style={[s.timerBar, { width: `${(timeLeft / TIMER_SECONDS) * 100}%` }]} />
        </View>

        <View style={s.clueCard}>
          <View style={s.clueHeader}>
            <MaterialIcons name="help-outline" size={24} color="#7C4DFF" />
            <Text style={s.clueHeaderText}>{lang === 'bn' ? 'ইঙ্গিত' : 'Clue'}</Text>
          </View>
          <Text style={s.clueText}>{currentQ.clue}</Text>
        </View>

        <View style={s.optionsWrap}>
          {currentQ.options.map((opt, idx) => {
            const isCorrectOpt = opt === currentQ.correctAnswer;
            const isSelected = selectedOption === opt;
            let bgColor = '#fff';
            let borderColor = '#E0E0E0';
            let textColor = '#212121';

            if (isAnswered) {
              if (isCorrectOpt) {
                bgColor = '#E8F5E9';
                borderColor = '#2E9E4F';
                textColor = '#1B5E20';
              } else if (isSelected && !isCorrectOpt) {
                bgColor = '#FFEBEE';
                borderColor = '#E53935';
                textColor = '#C62828';
              }
            } else if (isSelected) {
              bgColor = '#E3F2FD';
              borderColor = '#1E88E5';
            }

            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                disabled={isAnswered}
                onPress={() => handleSelectOption(opt)}
                style={[s.optionBtn, { backgroundColor: bgColor, borderColor, width: width - 32 }]}
              >
                <View style={s.optionLetter}>
                  <Text style={s.optionLetterText}>{String.fromCharCode(65 + idx)}</Text>
                </View>
                <Text style={[s.optionText, { color: textColor }]}>{opt}</Text>
                {isAnswered && isCorrectOpt && (
                  <MaterialIcons name="check-circle" size={22} color="#2E9E4F" style={s.optionIcon} />
                )}
                {isAnswered && isSelected && !isCorrectOpt && (
                  <MaterialIcons name="cancel" size={22} color="#E53935" style={s.optionIcon} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {isAnswered && selectedOption !== currentQ.correctAnswer && (
          <View style={s.explainBox}>
            <MaterialIcons name="info-outline" size={18} color="#D84315" />
            <Text style={s.explainText}>
              {lang === 'bn' ? 'সঠিক উত্তর: ' : 'Correct answer: '}
              <Text style={s.explainTextBold}>{currentQ.correctAnswer}</Text>
            </Text>
          </View>
        )}
      </ScrollView>

      {isAnswered && (
        <View style={s.bottomActionRow}>
          <TouchableOpacity activeOpacity={0.85} style={s.nextBtn} onPress={goNext}>
            <Text style={s.nextBtnText}>
              {currentIndex + 1 >= questions.length
                ? lang === 'bn'
                  ? 'ফলাফল দেখো'
                  : 'See Results'
                : lang === 'bn'
                ? 'পরের প্রশ্ন'
                : 'Next Question'}
            </Text>
            <MaterialIcons name="arrow-forward" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  langBannerWrap: {
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6A1B9A',
    overflow: 'hidden',
  },
  langBannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(106, 27, 154, 0.7)',
  },
  langGameTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  langGameSubtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  langPick: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#37474F',
    marginTop: 26,
    marginBottom: 18,
  },
  langBtns: {
    paddingHorizontal: 24,
    gap: 16,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 22,
    gap: 10,
  },
  langLetterBig: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 'auto',
  },
  langBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  langBack: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    gap: 6,
    padding: 8,
  },
  langBackText: {
    color: '#37474F',
    fontSize: 15,
    fontWeight: '700',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F57C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderColor: '#FFD54F',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 4,
  },
  starPillText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#5D4037',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
  },
  playTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1A237E',
    textAlign: 'center',
  },
  levelPill: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFB74D',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginTop: 3,
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E65100',
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 4,
  },
  timerText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2E7D32',
  },
  progressRow: {
    alignItems: 'center',
    marginTop: 14,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#37474F',
  },
  timerBarWrap: {
    height: 10,
    backgroundColor: '#CFD8DC',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 5,
    overflow: 'hidden',
  },
  timerBar: {
    height: 10,
    backgroundColor: '#43A047',
  },
  clueCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#CE93D8',
    padding: 16,
  },
  clueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  clueHeaderText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#6A1B9A',
  },
  clueText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#37474F',
    lineHeight: 26,
  },
  optionsWrap: {
    marginTop: 18,
    paddingHorizontal: 16,
    gap: 12,
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLetterText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6A1B9A',
  },
  optionText: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
  },
  optionIcon: {
    marginLeft: 'auto',
  },
  explainBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: '#FFF3E0',
    borderColor: '#FFB74D',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  explainText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#E65100',
  },
  explainTextBold: {
    fontWeight: '900',
  },
  playScroll: {
    paddingBottom: 20,
  },
  bottomActionRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EAF6FF',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E9E4F',
    borderRadius: 26,
    paddingVertical: 14,
    gap: 8,
  },
  nextBtnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  resultScroll: {
    paddingBottom: 30,
  },
  resultCard: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  resultStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  resultTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#F57C00',
    textShadowColor: 'rgba(255,183,77,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  resultSub: {
    fontSize: 18,
    fontWeight: '700',
    color: '#546E7A',
    marginTop: 6,
    marginBottom: 20,
  },
  resultScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#FFD54F',
    borderWidth: 2.5,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    gap: 10,
  },
  resultScoreText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#E91E63',
  },
  resultLevel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78909C',
    marginTop: 14,
    marginBottom: 24,
  },
  reviewSection: {
    width: '100%',
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A237E',
    marginBottom: 12,
    textAlign: 'center',
  },
  reviewItem: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    padding: 14,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewQnum: {
    fontSize: 16,
    fontWeight: '900',
    color: '#6A1B9A',
  },
  reviewClue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#455A64',
    marginBottom: 8,
    lineHeight: 20,
  },
  reviewAns: {
    fontSize: 13,
    fontWeight: '700',
    color: '#37474F',
    marginTop: 4,
  },
  reviewAnsCorrect: {
    color: '#2E9E4F',
    fontWeight: '900',
  },
  reviewAnsWrong: {
    color: '#E53935',
    fontWeight: '900',
  },
  resultBtns: {
    flexDirection: 'row',
    gap: 14,
  },
  bigBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 6,
  },
  bigBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#fff',
  },
  resultHome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    gap: 6,
    padding: 8,
  },
  resultHomeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#37474F',
  },
});
