import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SoundPlayer from 'react-native-sound-player';
import { getCourse } from '../../courses';
import { getSkillTest, deleteSkillTest } from '../../db/skillTests';
import { formatDuration, gradeFor } from '../../components/course/quizUtils';
import { useUI, cardShadow, tint, ProgressBar, CourseLogo, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';
import { SECONDS_PER_QUESTION } from './SkillTestHomeScreen';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'wrong', label: 'Wrong' },
  { id: 'skipped', label: 'Skipped' },
  { id: 'correct', label: 'Correct' },
];

const statusOf = (a) => (a.chosen === null || a.chosen === undefined ? 'skipped' : a.chosen === a.answer ? 'correct' : 'wrong');

// Shows a saved skill test from SQLite: right after the exam, or later from history.
export default function SkillTestResultScreen({ route, navigation }) {
  const { testId, justFinished } = route.params;
  const [test, setTest] = useState(null);
  const [filter, setFilter] = useState('all');
  const ui = useUI();
  const s = styles(ui);

  useEffect(() => {
    getSkillTest(testId).then(t => {
      setTest(t);
      if (t && justFinished) {
        try { SoundPlayer.playSoundFile('finish', 'mp3'); } catch (e) {}
      }
    }).catch(e => console.log(e));
  }, [testId, justFinished]);

  if (!test) return <SafeAreaView style={s.center}><ActivityIndicator color={ui.brand} /></SafeAreaView>;

  const grade = gradeFor(test.percent);
  const color = test.percent >= 80 ? ui.success : test.percent >= 50 ? '#D97706' : ui.danger;
  const visible = test.answers.map((a, i) => ({ ...a, n: i + 1 })).filter(a => filter === 'all' || statusOf(a) === filter);

  // Score per course
  const byCourse = test.courseIds.map(id => {
    const list = test.answers.filter(a => a.courseId === id);
    return { course: getCourse(id), total: list.length, correct: list.filter(a => statusOf(a) === 'correct').length };
  }).filter(r => r.course && r.total);

  const retake = () => navigation.navigate('SkillTestExam', {
    selection: test.courseIds.map(courseId => ({ courseId, chapterIds: null })),
    count: test.total,
    timeLimitSec: test.timeLimitSec ? test.total * SECONDS_PER_QUESTION : 0,
  });

  const remove = () => Alert.alert('Delete this result?', 'It will be removed from your history.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', style: 'destructive', onPress: async () => { await deleteSkillTest(test.id); navigation.goBack(); } },
  ]);

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.summary}>
          <View style={[s.ring, { borderColor: color }]}>
            <Text style={[s.percent, { color }]}>{test.percent}%</Text>
            <Text style={s.grade}>Grade {grade.label}</Text>
          </View>
          <Text style={s.title}>{grade.title}</Text>
          <Text style={s.date}>{new Date(test.createdAt).toLocaleString()}</Text>

          <View style={s.chips}>
            <Chip icon="check-circle" color={ui.success} value={test.correct} label="Correct" s={s} />
            <Chip icon="cancel" color={ui.danger} value={test.wrong} label="Wrong" s={s} />
            <Chip icon="remove-circle-outline" color={ui.sub} value={test.skipped} label="Skipped" s={s} />
            <Chip icon="timer" color={ui.brand} value={formatDuration(test.durationSec)} label="Time" s={s} />
          </View>
        </View>

        {byCourse.length > 1 && (
          <>
            <SectionTitle title="By category" ui={ui} />
            {byCourse.map(r => (
              <View key={r.course.id} style={s.courseRow}>
                <CourseLogo course={r.course} size={36} />
                <View style={{ flex: 1, marginHorizontal: 12 }}>
                  <Text style={s.courseTitle}>{r.course.title}</Text>
                  <ProgressBar value={r.correct / r.total} color={r.course.color} track={ui.track} height={6} style={{ marginTop: 6 }} />
                </View>
                <Text style={s.courseScore}>{r.correct}/{r.total}</Text>
              </View>
            ))}
          </>
        )}

        <View style={s.actions}>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: '#1D4ED8' }]} onPress={retake}>
            <MaterialIcons name="replay" size={20} color="#fff" />
            <Text style={s.actionText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.actionBtn, { backgroundColor: ui.cardAlt }]} onPress={() => navigation.popToTop()}>
            <MaterialIcons name="add" size={20} color={ui.text} />
            <Text style={[s.actionText, { color: ui.text }]}>New test</Text>
          </TouchableOpacity>
        </View>

        <SectionTitle title="Review answers" ui={ui} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }} style={{ flexGrow: 0, marginBottom: 6 }}>
          {FILTERS.map(f => {
            const n = f.id === 'all' ? test.answers.length : test.answers.filter(a => statusOf(a) === f.id).length;
            const active = filter === f.id;
            return (
              <TouchableOpacity key={f.id} onPress={() => setFilter(f.id)} style={[s.filter, active && s.filterActive]}>
                <Text style={[s.filterText, active && { color: '#fff' }]}>{f.label} ({n})</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {visible.map(a => {
          const status = statusOf(a);
          const course = getCourse(a.courseId);
          return (
            <View key={a.n} style={[s.review, { borderLeftColor: status === 'correct' ? ui.success : status === 'wrong' ? ui.danger : ui.border }]}>
              <View style={s.reviewTop}>
                <Text style={s.qNumber}>Q{a.n}</Text>
                {course && <Text style={s.reviewCourse}>{course.title}</Text>}
                <MaterialIcons
                  name={status === 'correct' ? 'check-circle' : status === 'wrong' ? 'cancel' : 'remove-circle-outline'}
                  size={20}
                  color={status === 'correct' ? ui.success : status === 'wrong' ? ui.danger : ui.sub}
                />
              </View>
              <Text style={s.reviewQ}>{a.q}</Text>
              {a.options.map((opt, i) => {
                const isCorrect = i === a.answer;
                const isChosen = i === a.chosen;
                return (
                  <View key={i} style={[s.opt, isCorrect && s.optCorrect, isChosen && !isCorrect && s.optWrong]}>
                    <Text style={[s.optText, (isCorrect || isChosen) && { fontWeight: '800' }]}>
                      {String.fromCharCode(65 + i)}. {opt}
                    </Text>
                    {isCorrect && <MaterialIcons name="check" size={18} color={ui.success} />}
                    {isChosen && !isCorrect && <Text style={s.yourAnswer}>your answer</Text>}
                  </View>
                );
              })}
              {status === 'skipped' && <Text style={s.skippedNote}>Not answered</Text>}
              {!!a.explain && <Text style={s.explain}>💡 {a.explain}</Text>}
            </View>
          );
        })}

        <TouchableOpacity style={s.deleteBtn} onPress={remove}>
          <MaterialIcons name="delete-outline" size={18} color={ui.danger} />
          <Text style={s.deleteText}>Delete this result</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function Chip({ icon, color, value, label, s }) {
  return (
    <View style={s.chip}>
      <MaterialIcons name={icon} size={18} color={color} />
      <Text style={s.chipValue}>{value}</Text>
      <Text style={s.chipLabel}>{label}</Text>
    </View>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  summary: { backgroundColor: ui.card, borderRadius: RADIUS.lg, padding: 20, alignItems: 'center', ...cardShadow(ui) },
  ring: { width: 150, height: 150, borderRadius: 75, borderWidth: 10, alignItems: 'center', justifyContent: 'center' },
  percent: { fontSize: 38, fontWeight: '900' },
  grade: { color: ui.sub, fontWeight: '800' },
  title: { color: ui.text, fontSize: 22, fontWeight: '900', marginTop: 12 },
  date: { color: ui.sub, fontSize: 12, marginTop: 2 },
  chips: { flexDirection: 'row', marginTop: 16, gap: 8 },
  chip: { flex: 1, alignItems: 'center', backgroundColor: ui.cardAlt, borderRadius: RADIUS.md, paddingVertical: 10 },
  chipValue: { color: ui.text, fontWeight: '900', fontSize: 15, marginTop: 4 },
  chipLabel: { color: ui.sub, fontSize: 11, fontWeight: '700' },
  courseRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 12, marginBottom: 8, ...cardShadow(ui) },
  courseTitle: { color: ui.text, fontWeight: '800' },
  courseScore: { color: ui.text, fontWeight: '900' },
  actions: { flexDirection: 'row', gap: 10, marginTop: SPACE.lg },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 14, borderRadius: RADIUS.md },
  actionText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  filter: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.pill, backgroundColor: ui.card, borderWidth: 1, borderColor: ui.border },
  filterActive: { backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' },
  filterText: { color: ui.text, fontWeight: '700', fontSize: 13 },
  review: { backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, marginTop: 10, borderLeftWidth: 4, ...cardShadow(ui) },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qNumber: { color: ui.brand, fontWeight: '900' },
  reviewCourse: { flex: 1, color: ui.sub, fontSize: 12, fontWeight: '700' },
  reviewQ: { color: ui.text, fontSize: 15, fontWeight: '800', marginVertical: 8, lineHeight: 21 },
  opt: { flexDirection: 'row', alignItems: 'center', paddingVertical: 7, paddingHorizontal: 10, borderRadius: RADIUS.sm, marginBottom: 4 },
  optCorrect: { backgroundColor: ui.successSoft },
  optWrong: { backgroundColor: tint('#EF4444', 0.15) },
  optText: { flex: 1, color: ui.text, fontSize: 14 },
  yourAnswer: { color: ui.danger, fontSize: 11, fontWeight: '800' },
  skippedNote: { color: ui.sub, fontSize: 12, fontStyle: 'italic', marginTop: 2 },
  explain: { color: ui.sub, fontSize: 13, lineHeight: 19, marginTop: 8 },
  deleteBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: SPACE.xl, padding: 12 },
  deleteText: { color: ui.danger, fontWeight: '700' },
});
