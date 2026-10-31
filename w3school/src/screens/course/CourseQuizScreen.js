import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SoundPlayer from 'react-native-sound-player';
import AdBanner from '../../components/ads/AdBanner';
import { getCourse, getQuizQuestions } from '../../courses';
import { saveQuizScore } from '../../db/courseProgress';
import { quizKey } from './CourseQuizListScreen';
import { prepareQuestions } from '../../components/course/quizUtils';
import { useUI, cardShadow, tint, ProgressBar, RADIUS, SPACE } from '../../components/course/ui';

const playSound = (file) => {
  try { SoundPlayer.playSoundFile(file, 'mp3'); } catch (e) {}
};

export default function CourseQuizScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const chapterId = route.params?.chapterId || null;
  const [questions, setQuestions] = useState(() => prepareQuestions(getQuizQuestions(course, chapterId)));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const ui = useUI();
  const s = styles(ui, course.color);

  const question = questions[index];

  const choose = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.answer) {
      setScore(sc => sc + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      return;
    }
    setFinished(true);
    playSound('finish');
    saveQuizScore(quizKey(course.id, chapterId), score, questions.length).catch(e => console.log(e));
  };

  const restart = () => {
    setQuestions(prepareQuestions(getQuizQuestions(course, chapterId)));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (!question && !finished) return null;

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const tier = pct >= 80
      ? { icon: 'emoji-events', title: 'Excellent!', msg: 'You really know this topic.', color: ui.success }
      : pct >= 50
        ? { icon: 'thumb-up', title: 'Good job!', msg: 'A little more practice and you will master it.', color: '#D97706' }
        : { icon: 'menu-book', title: 'Keep learning', msg: 'Review the lessons and try again.', color: ui.danger };
    return (
      <SafeAreaView style={s.container} edges={['left', 'right']}>
        <ScrollView contentContainerStyle={s.resultWrap}>
          <View style={[s.scoreRing, { borderColor: tier.color }]}>
            <Text style={[s.scorePct, { color: tier.color }]}>{pct}%</Text>
            <Text style={s.scoreOf}>{score} of {questions.length}</Text>
          </View>
          <MaterialIcons name={tier.icon} size={32} color={tier.color} style={{ marginTop: 20 }} />
          <Text style={s.resultTitle}>{tier.title}</Text>
          <Text style={s.resultMsg}>{tier.msg}</Text>

          <View style={s.resultStats}>
            <View style={s.resultStat}>
              <Text style={[s.resultStatValue, { color: ui.success }]}>{score}</Text>
              <Text style={s.resultStatLabel}>Correct</Text>
            </View>
            <View style={s.resultStat}>
              <Text style={[s.resultStatValue, { color: ui.danger }]}>{questions.length - score}</Text>
              <Text style={s.resultStatLabel}>Wrong</Text>
            </View>
          </View>

          <TouchableOpacity style={s.primaryBtn} onPress={restart} activeOpacity={0.9}>
            <MaterialIcons name="replay" size={20} color="#fff" />
            <Text style={s.primaryText}>Try again</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={s.secondaryText}>Back to quizzes</Text>
          </TouchableOpacity>
        </ScrollView>
        <AdBanner />
      </SafeAreaView>
    );
  }

  const answered = selected !== null;
  const correct = answered && selected === question.answer;

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.topRow}>
          <Text style={s.counter}>Question {index + 1}<Text style={s.counterOf}> / {questions.length}</Text></Text>
          <View style={s.scoreChip}>
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text style={s.scoreChipText}>{score}</Text>
          </View>
        </View>
        <ProgressBar
          value={(index + (answered ? 1 : 0)) / questions.length}
          color={course.color}
          track={ui.track}
          height={6}
          style={{ marginTop: 10 }}
        />

        <View style={s.questionCard}>
          <Text style={s.question}>{question.q}</Text>
        </View>

        {question.options.map((opt, i) => {
          const isCorrect = i === question.answer;
          const isChosen = i === selected;
          const state = answered && isCorrect ? 'correct' : answered && isChosen ? 'wrong' : answered ? 'muted' : 'idle';
          return (
            <TouchableOpacity
              key={i}
              style={[s.option, state === 'correct' && s.optCorrect, state === 'wrong' && s.optWrong, state === 'muted' && { opacity: 0.55 }]}
              onPress={() => choose(i)}
              activeOpacity={0.8}
              disabled={answered}
            >
              <View style={[s.letter, (state === 'correct' || state === 'wrong') && s.letterOn]}>
                {state === 'correct'
                  ? <MaterialIcons name="check" size={18} color="#fff" />
                  : state === 'wrong'
                    ? <MaterialIcons name="close" size={18} color="#fff" />
                    : <Text style={s.letterText}>{String.fromCharCode(65 + i)}</Text>}
              </View>
              <Text style={[s.optText, (state === 'correct' || state === 'wrong') && { color: '#fff' }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}

        {answered && (
          <View style={[s.explain, { borderLeftColor: correct ? ui.success : ui.danger }]}>
            <Text style={[s.explainTitle, { color: correct ? ui.success : ui.danger }]}>
              {correct ? 'Correct!' : 'Not quite'}
            </Text>
            {!!question.explain && <Text style={s.explainText}>{question.explain}</Text>}
          </View>
        )}

        {answered && (
          <TouchableOpacity style={s.primaryBtn} onPress={next} activeOpacity={0.9}>
            <Text style={s.primaryText}>{index + 1 < questions.length ? 'Next question' : 'See result'}</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: 30 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  counter: { color: ui.text, fontWeight: '800', fontSize: 16 },
  counterOf: { color: ui.sub, fontWeight: '600' },
  scoreChip: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.pill,
    paddingHorizontal: 10, paddingVertical: 4, ...cardShadow(ui),
  },
  scoreChipText: { color: ui.text, fontWeight: '800', marginLeft: 4 },

  questionCard: { backgroundColor: ui.card, borderRadius: RADIUS.lg, padding: 20, marginTop: 18, marginBottom: 16, ...cardShadow(ui) },
  question: { fontSize: 20, fontWeight: '800', color: ui.text, lineHeight: 28 },

  option: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: ui.border,
  },
  optCorrect: { backgroundColor: ui.success, borderColor: ui.success },
  optWrong: { backgroundColor: ui.danger, borderColor: ui.danger },
  letter: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: tint(accent, 0.14),
    alignItems: 'center', justifyContent: 'center', marginRight: 12,
  },
  letterOn: { backgroundColor: 'rgba(255,255,255,0.25)' },
  letterText: { color: accent, fontWeight: '900' },
  optText: { flex: 1, color: ui.text, fontSize: 15, fontWeight: '700', lineHeight: 21 },

  explain: { backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, marginTop: 6, borderLeftWidth: 4, ...cardShadow(ui) },
  explainTitle: { fontWeight: '900', fontSize: 15 },
  explainText: { color: ui.text, fontSize: 14, lineHeight: 21, marginTop: 4 },

  primaryBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: accent,
    borderRadius: RADIUS.md, paddingVertical: 15, marginTop: 18, alignSelf: 'stretch',
  },
  primaryText: { color: '#fff', fontWeight: '800', fontSize: 16, marginHorizontal: 6 },
  secondaryBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 4 },
  secondaryText: { color: ui.dark ? ui.text : accent, fontWeight: '700', fontSize: 15 },

  resultWrap: { flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: SPACE.xl },
  scoreRing: {
    width: 170, height: 170, borderRadius: 85, borderWidth: 10, backgroundColor: ui.card,
    alignItems: 'center', justifyContent: 'center',
  },
  scorePct: { fontSize: 42, fontWeight: '900' },
  scoreOf: { color: ui.sub, fontWeight: '700', marginTop: -2 },
  resultTitle: { fontSize: 26, fontWeight: '900', color: ui.text, marginTop: 6 },
  resultMsg: { fontSize: 15, color: ui.sub, marginTop: 4, textAlign: 'center' },
  resultStats: { flexDirection: 'row', marginTop: 22, alignSelf: 'stretch' },
  resultStat: { flex: 1, alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md, paddingVertical: 14, marginHorizontal: 5, ...cardShadow(ui) },
  resultStatValue: { fontSize: 24, fontWeight: '900' },
  resultStatLabel: { color: ui.sub, fontWeight: '700', fontSize: 12, marginTop: 2 },
});
