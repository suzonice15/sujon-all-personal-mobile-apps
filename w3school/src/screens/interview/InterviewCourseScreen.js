import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getCourse, getInterviewQuestions, countInterviewQuestions, interviewKey } from '../../courses';
import { getPracticedInterviewKeys } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, HeroDecor, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

// One course's interview questions, grouped by the course's chapters.
export default function InterviewCourseScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const [practiced, setPracticed] = useState(new Set());
  const ui = useUI();
  const s = styles(ui, course.color);

  useFocusEffect(
    useCallback(() => {
      getPracticedInterviewKeys().then(setPracticed).catch(e => console.log(e));
    }, [])
  );

  const total = countInterviewQuestions(course);
  const done = [...practiced].filter(k => k.startsWith(course.id + ':')).length;
  const chapters = course.chapters.filter(ch => getInterviewQuestions(course, ch.id).length > 0);

  const open = (chapter) => navigation.navigate('InterviewQuestions', {
    courseId: course.id,
    chapterId: chapter?.id ?? null,
    headerTitle: chapter ? chapter.title : 'All ' + course.title + ' questions',
  });

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={s.hero} activeOpacity={0.9} onPress={() => open(null)}>
          <HeroDecor />
          <Text style={s.heroKicker}>{course.title.toUpperCase()} INTERVIEW</Text>
          <Text style={s.heroTitle}>{total} questions</Text>
          <View style={s.heroProgress}>
            <ProgressBar value={total ? done / total : 0} color="#fff" track="rgba(255,255,255,0.3)" height={8} style={{ flex: 1 }} />
            <Text style={s.heroCount}>{done} practiced</Text>
          </View>
          <View style={s.heroBtn}>
            <Text style={s.heroBtnText}>Practice all questions</Text>
            <MaterialIcons name="arrow-forward" size={18} color={course.color} />
          </View>
        </TouchableOpacity>

        <SectionTitle title="By chapter" ui={ui} />
        {chapters.map((ch) => {
          const questions = getInterviewQuestions(course, ch.id);
          const chDone = questions.filter((_, i) => practiced.has(interviewKey(course, ch.id, i))).length;
          const complete = chDone === questions.length;
          return (
            <TouchableOpacity key={ch.id} style={s.row} activeOpacity={0.85} onPress={() => open(ch)}>
              <View style={[s.icon, complete && { backgroundColor: ui.successSoft }]}>
                <MaterialIcons name={complete ? 'check' : ch.icon} size={22} color={complete ? ui.success : course.color} />
              </View>
              <View style={s.rowBody}>
                <Text style={s.rowNumber}>CHAPTER {course.chapters.indexOf(ch) + 1}</Text>
                <Text style={s.rowTitle}>{ch.title}</Text>
                <ProgressBar value={chDone / questions.length} color={complete ? ui.success : course.color} track={ui.track} height={4} style={{ marginTop: 8 }} />
              </View>
              <Text style={s.rowCount}>{chDone}/{questions.length}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  hero: { backgroundColor: accent, borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroKicker: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 4 },
  heroProgress: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  heroCount: { color: '#fff', fontWeight: '700', marginLeft: 10, fontSize: 13 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#fff',
    borderRadius: RADIUS.pill, paddingHorizontal: 16, paddingVertical: 10, marginTop: 16,
  },
  heroBtnText: { color: '#0F172A', fontWeight: '800', marginRight: 6 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, ...cardShadow(ui),
  },
  icon: { width: 44, height: 44, borderRadius: 12, backgroundColor: tint(accent, 0.14), alignItems: 'center', justifyContent: 'center' },
  rowBody: { flex: 1, marginHorizontal: 12 },
  rowNumber: { fontSize: 10, color: ui.sub, fontWeight: '800', letterSpacing: 0.8 },
  rowTitle: { color: ui.text, fontSize: 15, fontWeight: '800', marginTop: 1 },
  rowCount: { color: ui.sub, fontWeight: '800', fontSize: 13 },
});
