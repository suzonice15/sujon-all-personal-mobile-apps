import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { COURSES, getCourse } from '../../courses';
import { getSkillTests, getSkillTestStats } from '../../db/skillTests';
import { countAvailable, formatDuration, gradeFor } from '../../components/course/quizUtils';
import { useUI, cardShadow, tint, CourseLogo, HeroDecor, SectionTitle, Pill, RADIUS, SPACE } from '../../components/course/ui';

const COUNTS = [10, 20, 30, 50];
export const SECONDS_PER_QUESTION = 45;

// Skill test setup: pick courses (optionally chapters), question count and timer.
// Below it: overall stats and the most recent results.
export default function SkillTestHomeScreen({ navigation }) {
  // courseId -> Set of picked chapter ids. A checked course starts with no chapters picked.
  const [picked, setPicked] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [count, setCount] = useState(10);
  const [timed, setTimed] = useState(true);
  const [stats, setStats] = useState({ count: 0, averagePercent: 0, bestPercent: 0 });
  const [recent, setRecent] = useState([]);
  const ui = useUI();
  const s = styles(ui);

  useFocusEffect(
    useCallback(() => {
      getSkillTestStats().then(setStats).catch(e => console.log(e));
      getSkillTests().then(list => setRecent(list.slice(0, 3))).catch(e => console.log(e));
    }, [])
  );

  const checkedCount = Object.keys(picked).length;
  // Only courses with at least one picked chapter go into the exam; all chapters = no filter.
  const selection = useMemo(() => COURSES
    .filter(c => picked[c.id]?.size)
    .map(c => ({ course: c, chapterIds: picked[c.id].size === c.chapters.length ? null : picked[c.id] })), [picked]);
  const available = countAvailable(selection);
  const finalCount = Math.min(count, available);

  const toggleCourse = (id) => {
    const wasOn = !!picked[id];
    setPicked(prev => {
      const copy = { ...prev };
      if (copy[id]) delete copy[id]; else copy[id] = new Set();
      return copy;
    });
    // Open the chapter list right away so chapters can be picked.
    setExpanded(wasOn ? (expanded === id ? null : expanded) : id);
  };

  const toggleAllChapters = (course) => setPicked(prev => {
    const allOn = prev[course.id]?.size === course.chapters.length;
    return { ...prev, [course.id]: allOn ? new Set() : new Set(course.chapters.map(ch => ch.id)) };
  });

  const toggleChapter = (course, chapterId) => setPicked(prev => {
    const next = new Set(prev[course.id]);
    if (next.has(chapterId)) next.delete(chapterId); else next.add(chapterId);
    return { ...prev, [course.id]: next };
  });

  const start = () => navigation.navigate('SkillTestExam', {
    selection: selection.map(({ course, chapterIds }) => ({ courseId: course.id, chapterIds: chapterIds ? [...chapterIds] : null })),
    count: finalCount,
    timeLimitSec: timed ? finalCount * SECONDS_PER_QUESTION : 0,
  });

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <HeroDecor />
          <View style={s.heroHead}>
            <MaterialIcons name="assignment-turned-in" size={34} color="#BFDBFE" />
            <Text style={[s.heroTitle, { marginTop: 0 }]}>Skill Test</Text>
          </View>
          <Text style={s.heroSub}>Build your own exam from any topics, test yourself under time pressure, and track your progress.</Text>
          <View style={s.stats}>
            <Stat s={s} value={stats.count} label="Tests" />
            <View style={s.statDivider} />
            <Stat s={s} value={stats.averagePercent + '%'} label="Average" />
            <View style={s.statDivider} />
            <Stat s={s} value={stats.bestPercent + '%'} label="Best" />
          </View>
        </View>

        <SectionTitle title="1. Choose categories" ui={ui} right={<Text style={s.hint}>{checkedCount} selected</Text>} />
        {COURSES.map(course => {
          const chosen = picked[course.id];
          const on = !!chosen;
          const chosenChapters = chosen ? chosen.size : 0;
          const allOn = chosenChapters === course.chapters.length;
          return (
            <View key={course.id} style={[s.courseCard, on && { borderColor: course.color }]}>
              <TouchableOpacity style={s.courseRow} onPress={() => toggleCourse(course.id)} activeOpacity={0.85}>
                <CourseLogo course={course} size={42} />
                <View style={s.courseBody}>
                  <Text style={s.courseTitle}>{course.title}</Text>
                  <Text style={s.courseSub}>{course.quiz.length} questions</Text>
                </View>
                <MaterialIcons name={on ? 'check-box' : 'check-box-outline-blank'} size={26} color={on ? course.color : ui.sub} />
              </TouchableOpacity>

              {on && (
                <TouchableOpacity style={s.chapterToggle} onPress={() => setExpanded(expanded === course.id ? null : course.id)}>
                  <Text style={[s.chapterToggleText, !chosenChapters && { color: '#DC2626' }]}>
                    Chapters: {allOn ? 'All' : chosenChapters ? chosenChapters + ' of ' + course.chapters.length : 'none selected'}
                  </Text>
                  <MaterialIcons name={expanded === course.id ? 'expand-less' : 'expand-more'} size={20} color={ui.sub} />
                </TouchableOpacity>
              )}

              {on && expanded === course.id && (
                <View style={s.chapterChips}>
                  <TouchableOpacity onPress={() => toggleAllChapters(course)}
                    style={[s.chip, s.allChip, allOn && { backgroundColor: course.color, borderColor: course.color }]}>
                    <MaterialIcons name={allOn ? 'check-box' : 'check-box-outline-blank'} size={16} color={allOn ? '#fff' : ui.sub} />
                    <Text style={[s.chipText, allOn && { color: '#fff' }]}>All chapters</Text>
                  </TouchableOpacity>
                  {course.chapters.map(ch => {
                    const active = chosen.has(ch.id);
                    return (
                      <TouchableOpacity key={ch.id} onPress={() => toggleChapter(course, ch.id)}
                        style={[s.chip, active && { backgroundColor: tint(course.color, 0.15), borderColor: course.color }]}>
                        <Text style={[s.chipText, active && { color: ui.dark ? ui.text : course.color }]} numberOfLines={1}>{ch.title}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        <SectionTitle title="2. Number of questions" ui={ui} right={<Text style={s.hint}>{available} available</Text>} />
        <View style={s.countRow}>
          {COUNTS.map(n => {
            const disabled = n > available && n !== COUNTS[0];
            const active = count === n;
            return (
              <TouchableOpacity key={n} disabled={disabled} onPress={() => setCount(n)}
                style={[s.countChip, active && s.countChipActive, disabled && { opacity: 0.35 }]}>
                <Text style={[s.countText, active && { color: '#fff' }]}>{n}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {count > available && available > 0 && <Text style={s.warn}>Only {available} questions match your selection; the test will use all of them.</Text>}

        <SectionTitle title="3. Timer" ui={ui} />
        <View style={s.timerCard}>
          <MaterialIcons name="timer" size={24} color={ui.brand} />
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <Text style={s.courseTitle}>{timed ? formatDuration(finalCount * SECONDS_PER_QUESTION) + ' time limit' : 'No time limit'}</Text>
            <Text style={s.courseSub}>{SECONDS_PER_QUESTION} seconds per question, auto-submits at zero</Text>
          </View>
          <Switch value={timed} onValueChange={setTimed} trackColor={{ true: ui.brand }} />
        </View>

        <TouchableOpacity style={[s.startBtn, !finalCount && { opacity: 0.4 }]} disabled={!finalCount} onPress={start} activeOpacity={0.9}>
          <MaterialIcons name="play-arrow" size={24} color="#fff" />
          <Text style={s.startText}>Start test · {finalCount} questions</Text>
        </TouchableOpacity>

        <SectionTitle
          title="Recent results"
          ui={ui}
          right={stats.count > 0 && (
            <TouchableOpacity onPress={() => navigation.navigate('SkillTestHistory')} hitSlop={8}>
              <Text style={s.link}>View all</Text>
            </TouchableOpacity>
          )}
        />
        {recent.length === 0 && <Text style={s.empty}>No tests yet. Your results will be saved here.</Text>}
        {recent.map(t => <ResultRow key={t.id} test={t} ui={ui} onPress={() => navigation.navigate('SkillTestResult', { testId: t.id })} />)}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

function Stat({ value, label, s }) {
  return (
    <View style={s.stat}>
      <Text style={s.statValue}>{value}</Text>
      <Text style={s.statLabel}>{label}</Text>
    </View>
  );
}

// One saved test, used here and on the history screen.
export function ResultRow({ test, ui, onPress, onLongPress }) {
  const s = rowStyles(ui);
  const grade = gradeFor(test.percent);
  const color = test.percent >= 80 ? ui.success : test.percent >= 50 ? '#D97706' : ui.danger;
  return (
    <TouchableOpacity style={s.row} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.85}>
      <View style={[s.score, { borderColor: color }]}>
        <Text style={[s.scoreText, { color }]}>{test.percent}%</Text>
      </View>
      <View style={{ flex: 1, marginHorizontal: 12 }}>
        <View style={s.logos}>
          {test.courseIds.map(id => getCourse(id)).filter(Boolean).map(c => <CourseLogo key={c.id} course={c} size={22} />)}
        </View>
        <Text style={s.title}>{test.correct}/{test.total} correct · {grade.title}</Text>
        <Text style={s.sub}>{new Date(test.createdAt).toLocaleString()} · {formatDuration(test.durationSec)}</Text>
      </View>
      <Pill label={grade.label} color={color} bg={tint(color, 0.15)} style={{ alignSelf: 'center' }} />
    </TouchableOpacity>
  );
}

const rowStyles = (ui) => StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 12, marginBottom: 10, ...cardShadow(ui) },
  score: { width: 54, height: 54, borderRadius: 27, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  scoreText: { fontWeight: '900', fontSize: 14 },
  logos: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  title: { color: ui.text, fontWeight: '800', fontSize: 14 },
  sub: { color: ui.sub, fontSize: 11, marginTop: 2 },
});

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  hero: { backgroundColor: ui.dark ? '#1E3A8A' : '#1D4ED8', borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4, lineHeight: 20 },
  stats: { flexDirection: 'row', alignItems: 'center', marginTop: 16, backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: RADIUS.md, paddingVertical: 12 },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  statLabel: { color: '#BFDBFE', fontSize: 12, fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.25)' },
  hint: { color: ui.sub, fontSize: 13, fontWeight: '600' },
  link: { color: ui.dark ? ui.text : ui.brand, fontWeight: '800' },
  courseCard: { backgroundColor: ui.card, borderRadius: RADIUS.md, marginBottom: 10, borderWidth: 2, borderColor: 'transparent', ...cardShadow(ui) },
  courseRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  courseBody: { flex: 1, marginHorizontal: 12 },
  courseTitle: { color: ui.text, fontWeight: '800', fontSize: 15 },
  courseSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
  chapterToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingBottom: 10 },
  chapterToggleText: { color: ui.sub, fontWeight: '700', fontSize: 13 },
  chapterChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingHorizontal: 12, paddingBottom: 12 },
  chip: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: RADIUS.pill, borderWidth: 1, borderColor: ui.border, maxWidth: '100%' },
  chipText: { color: ui.sub, fontSize: 12, fontWeight: '700' },
  allChip: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  countRow: { flexDirection: 'row', gap: 10 },
  countChip: { flex: 1, paddingVertical: 14, borderRadius: RADIUS.md, backgroundColor: ui.card, alignItems: 'center', borderWidth: 1, borderColor: ui.border },
  countChipActive: { backgroundColor: ui.brand, borderColor: ui.brand },
  countText: { color: ui.text, fontWeight: '900', fontSize: 18 },
  warn: { color: '#D97706', fontSize: 12, marginTop: 8 },
  timerCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, ...cardShadow(ui) },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1D4ED8', borderRadius: RADIUS.md, paddingVertical: 16, marginTop: SPACE.xl },
  startText: { color: '#fff', fontWeight: '900', fontSize: 17, marginLeft: 6 },
  empty: { color: ui.sub },
});
