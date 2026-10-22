import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCourse } from '../../courses';
import { saveSkillTest } from '../../db/skillTests';
import { buildSkillTest, formatDuration } from '../../components/course/quizUtils';
import { useUI, cardShadow, tint, ProgressBar, CourseLogo, RADIUS, SPACE } from '../../components/course/ui';

// Exam mode: answers are not revealed until the test is submitted. Students can
// move between questions freely; the timer (if any) auto-submits at zero.
export default function SkillTestExamScreen({ route, navigation }) {
  const { selection, count, timeLimitSec } = route.params;
  const ui = useUI();
  const s = styles(ui);

  const questions = useMemo(() => buildSkillTest(
    selection
      .map(({ courseId, chapterIds }) => ({ course: getCourse(courseId), chapterIds: chapterIds ? new Set(chapterIds) : null }))
      .filter(sel => sel.course),
    count,
  ), [selection, count]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [timeLeft, setTimeLeft] = useState(timeLimitSec);
  const [saving, setSaving] = useState(false);
  const startedAt = useRef(Date.now());
  const finished = useRef(false);
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const submit = useCallback(async () => {
    if (finished.current) return;
    finished.current = true;
    setSaving(true);
    try {
      const testId = await saveSkillTest({
        courseIds: [...new Set(questions.map(q => q.courseId))],
        durationSec: (Date.now() - startedAt.current) / 1000,
        timeLimitSec,
        answers: questions.map((q, i) => ({ ...q, chosen: answersRef.current[i] })),
      });
      navigation.replace('SkillTestResult', { testId, justFinished: true });
    } catch (e) {
      console.log(e);
      finished.current = false;
      setSaving(false);
      Alert.alert('Could not save', 'Your result could not be saved. Please try submitting again.');
    }
  }, [questions, timeLimitSec, navigation]);

  // Countdown; auto-submit when it reaches zero.
  useEffect(() => {
    if (!timeLimitSec) return undefined;
    const id = setInterval(() => {
      const left = timeLimitSec - Math.floor((Date.now() - startedAt.current) / 1000);
      setTimeLeft(Math.max(0, left));
      if (left <= 0) {
        clearInterval(id);
        submit();
      }
    }, 500);
    return () => clearInterval(id);
  }, [timeLimitSec, submit]);

  // Leaving mid-exam asks for confirmation (back button, gesture or header).
  useEffect(() => navigation.addListener('beforeRemove', e => {
    if (finished.current) return;
    e.preventDefault();
    Alert.alert('Quit the test?', 'Your answers will not be saved.', [
      { text: 'Continue test', style: 'cancel' },
      { text: 'Quit', style: 'destructive', onPress: () => { finished.current = true; navigation.dispatch(e.data.action); } },
    ]);
  }), [navigation]);

  const confirmSubmit = () => {
    const unanswered = answers.filter(a => a === null).length;
    Alert.alert(
      'Submit test?',
      unanswered ? unanswered + ' question(s) are unanswered and will be counted as skipped.' : 'You answered every question.',
      [{ text: 'Review', style: 'cancel' }, { text: 'Submit', onPress: submit }]
    );
  };

  if (!questions.length) {
    return <SafeAreaView style={s.center}><Text style={s.text}>No questions match this selection.</Text></SafeAreaView>;
  }
  if (saving) {
    return <SafeAreaView style={s.center}><ActivityIndicator size="large" color={ui.brand} /><Text style={s.text}>Saving your result...</Text></SafeAreaView>;
  }

  const q = questions[index];
  const course = getCourse(q.courseId);
  const answeredCount = answers.filter(a => a !== null).length;
  const lowTime = timeLimitSec > 0 && timeLeft <= 30;

  const choose = (i) => setAnswers(prev => prev.map((a, idx) => (idx === index ? (a === i ? null : i) : a)));

  return (
    <SafeAreaView style={s.container} edges={['left', 'right', 'bottom']}>
      <View style={s.topBar}>
        <Text style={s.topText}>{answeredCount}/{questions.length} answered</Text>
        {timeLimitSec > 0 && (
          <View style={[s.timer, lowTime && { backgroundColor: tint('#DC2626', 0.15) }]}>
            <MaterialIcons name="timer" size={16} color={lowTime ? ui.danger : ui.text} />
            <Text style={[s.timerText, lowTime && { color: ui.danger }]}>{formatDuration(timeLeft)}</Text>
          </View>
        )}
        <TouchableOpacity style={s.submitSmall} onPress={confirmSubmit}>
          <Text style={s.submitSmallText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <ProgressBar value={answeredCount / questions.length} color={ui.brand} track={ui.track} height={3} style={{ borderRadius: 0 }} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.palette} contentContainerStyle={s.paletteContent}>
        {questions.map((_, i) => {
          const current = i === index;
          const done = answers[i] !== null;
          return (
            <TouchableOpacity key={i} onPress={() => setIndex(i)}
              style={[s.dot, done && s.dotDone, current && s.dotCurrent]}>
              <Text style={[s.dotText, (done || current) && { color: '#fff' }]}>{i + 1}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={s.content}>
        <View style={s.meta}>
          {course && <CourseLogo course={course} size={26} />}
          <Text style={s.metaText}>Question {index + 1} of {questions.length}</Text>
        </View>
        <View style={s.questionCard}>
          <Text style={s.question}>{q.q}</Text>
        </View>

        {q.options.map((opt, i) => {
          const picked = answers[index] === i;
          return (
            <TouchableOpacity key={i} style={[s.option, picked && s.optionPicked]} onPress={() => choose(i)} activeOpacity={0.8}>
              <View style={[s.letter, picked && s.letterPicked]}>
                <Text style={[s.letterText, picked && { color: '#fff' }]}>{String.fromCharCode(65 + i)}</Text>
              </View>
              <Text style={s.optionText}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
        <Text style={s.tip}>Tap an answer again to clear it. You can change answers until you submit.</Text>
      </ScrollView>

      <View style={s.nav}>
        <TouchableOpacity style={[s.navBtn, index === 0 && { opacity: 0.35 }]} disabled={index === 0} onPress={() => setIndex(index - 1)}>
          <MaterialIcons name="arrow-back" size={22} color={ui.text} />
          <Text style={s.navText}>Previous</Text>
        </TouchableOpacity>
        {index < questions.length - 1 ? (
          <TouchableOpacity style={[s.navBtn, s.navPrimary]} onPress={() => setIndex(index + 1)}>
            <Text style={[s.navText, { color: '#fff' }]}>Next</Text>
            <MaterialIcons name="arrow-forward" size={22} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[s.navBtn, s.navPrimary, { backgroundColor: ui.success }]} onPress={confirmSubmit}>
            <Text style={[s.navText, { color: '#fff' }]}>Submit</Text>
            <MaterialIcons name="check" size={22} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: ui.bg, gap: 12 },
  text: { color: ui.text, fontSize: 15 },
  topBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACE.lg, paddingVertical: 8, backgroundColor: ui.card, gap: 10 },
  topText: { flex: 1, color: ui.sub, fontWeight: '700' },
  timer: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.pill, backgroundColor: ui.cardAlt },
  timerText: { color: ui.text, fontWeight: '900', fontVariant: ['tabular-nums'] },
  submitSmall: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.pill, backgroundColor: tint('#16A34A', 0.15) },
  submitSmallText: { color: ui.success, fontWeight: '800' },
  palette: { flexGrow: 0, backgroundColor: ui.card },
  paletteContent: { paddingHorizontal: SPACE.lg, paddingVertical: 8, gap: 6 },
  dot: { width: 34, height: 34, borderRadius: 17, borderWidth: 1.5, borderColor: ui.border, alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: ui.success, borderColor: ui.success },
  dotCurrent: { backgroundColor: ui.brand, borderColor: ui.brand },
  dotText: { color: ui.sub, fontWeight: '800', fontSize: 12 },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  metaText: { color: ui.sub, fontWeight: '700' },
  questionCard: { backgroundColor: ui.card, borderRadius: RADIUS.lg, padding: 18, marginTop: 12, marginBottom: 14, ...cardShadow(ui) },
  question: { color: ui.text, fontSize: 19, fontWeight: '800', lineHeight: 27 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: ui.border },
  optionPicked: { borderColor: ui.brand, backgroundColor: tint(ui.brand, 0.1) },
  letter: { width: 32, height: 32, borderRadius: 10, backgroundColor: ui.cardAlt, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  letterPicked: { backgroundColor: ui.brand },
  letterText: { color: ui.text, fontWeight: '900' },
  optionText: { flex: 1, color: ui.text, fontSize: 15, fontWeight: '600', lineHeight: 21 },
  tip: { color: ui.sub, fontSize: 12, textAlign: 'center', marginTop: 6 },
  nav: { flexDirection: 'row', gap: 10, paddingHorizontal: SPACE.lg, paddingVertical: 10, backgroundColor: ui.card, borderTopWidth: 1, borderTopColor: ui.border },
  navBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 13, borderRadius: RADIUS.md, backgroundColor: ui.cardAlt },
  navPrimary: { backgroundColor: '#1D4ED8' },
  navText: { color: ui.text, fontWeight: '800', fontSize: 15 },
});
