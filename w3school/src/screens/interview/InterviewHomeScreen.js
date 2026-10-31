import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { COURSES, countInterviewQuestions } from '../../courses';
import { getPracticedInterviewKeys } from '../../db/courseProgress';
import { useUI, cardShadow, ProgressBar, CourseLogo, HeroDecor, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

// Interview tab root: every course, with how many of its questions were practiced.
export default function InterviewHomeScreen({ navigation }) {
  const [practiced, setPracticed] = useState(new Set());
  const ui = useUI();
  const s = styles(ui);

  useFocusEffect(
    useCallback(() => {
      getPracticedInterviewKeys().then(setPracticed).catch(e => console.log(e));
    }, [])
  );

  const courses = COURSES.filter(c => countInterviewQuestions(c) > 0);
  const total = courses.reduce((n, c) => n + countInterviewQuestions(c), 0);
  const practicedIn = course => [...practiced].filter(k => k.startsWith(course.id + ':')).length;

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <HeroDecor />
          <MaterialIcons name="record-voice-over" size={34} color="#FDE68A" />
          <Text style={s.heroTitle}>Interview Prep</Text>
          <Text style={s.heroSub}>
            {total} real interview questions with answers, chapter by chapter. Read, answer out loud, then mark as practiced.
          </Text>
          <View style={s.heroProgress}>
            <ProgressBar value={total ? practiced.size / total : 0} color="#FDE68A" track="rgba(255,255,255,0.25)" height={8} style={{ flex: 1 }} />
            <Text style={s.heroCount}>{practiced.size}/{total}</Text>
          </View>
        </View>

        <SectionTitle title="Choose a topic" ui={ui} />
        {courses.map(course => {
          const count = countInterviewQuestions(course);
          const done = practicedIn(course);
          return (
            <TouchableOpacity
              key={course.id}
              style={s.row}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('InterviewCourse', { courseId: course.id, headerTitle: course.title + ' Interview' })}
            >
              <CourseLogo course={course} size={50} />
              <View style={s.rowBody}>
                <Text style={s.rowTitle}>{course.title}</Text>
                <Text style={s.rowSub}>{count} questions · {course.chapters.length} chapters</Text>
                <ProgressBar value={done / count} color={course.color} track={ui.track} height={4} style={{ marginTop: 8 }} />
              </View>
              <Text style={s.rowCount}>{done}/{count}</Text>
            </TouchableOpacity>
          );
        })}

        <View style={s.tips}>
          <MaterialIcons name="tips-and-updates" size={20} color={ui.noteBorder} />
          <Text style={s.tipsText}>
            Try to answer each question yourself before opening the answer. Explaining out loud is the best interview practice.
          </Text>
        </View>
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  hero: { backgroundColor: ui.dark ? '#7C2D12' : '#C2410C', borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 4, lineHeight: 20 },
  heroProgress: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  heroCount: { color: '#fff', fontWeight: '800', marginLeft: 10 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, ...cardShadow(ui),
  },
  rowBody: { flex: 1, marginHorizontal: 12 },
  rowTitle: { color: ui.text, fontSize: 17, fontWeight: '800' },
  rowSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
  rowCount: { color: ui.sub, fontWeight: '800', fontSize: 13 },
  tips: {
    flexDirection: 'row', backgroundColor: ui.noteBg, borderRadius: RADIUS.md, padding: 14, marginTop: 8,
  },
  tipsText: { flex: 1, marginLeft: 10, color: ui.noteText, fontSize: 13, lineHeight: 19 },
});
