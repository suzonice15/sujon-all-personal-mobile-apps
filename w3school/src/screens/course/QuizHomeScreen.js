import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { COURSES } from '../../courses';
import { getQuizScores } from '../../db/courseProgress';
import { useUI, cardShadow, CourseLogo, HeroDecor, Pill, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

// Quiz tab root: pick a course, then a chapter quiz or the full test.
export default function QuizHomeScreen({ navigation }) {
  const [scores, setScores] = useState({});
  const ui = useUI();
  const s = styles(ui);

  useFocusEffect(
    useCallback(() => {
      getQuizScores().then(setScores).catch(e => console.log(e));
    }, [])
  );

  const taken = (course) => Object.keys(scores).filter(k => k.startsWith(`${course.id}:`)).length;
  const totalQuestions = COURSES.reduce((n, c) => n + c.quiz.length, 0);

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <HeroDecor />
          <MaterialIcons name="emoji-events" size={36} color="#FDE68A" />
          <Text style={s.heroTitle}>Quiz Arena</Text>
          <Text style={s.heroSub}>{totalQuestions} questions across {COURSES.length} courses. Test what you learned and beat your best score.</Text>
        </View>

        <SectionTitle title="Choose a course" ui={ui} />
        {COURSES.map(course => {
          const count = taken(course);
          const quizzes = course.chapters.length + 1;
          return (
            <TouchableOpacity
              key={course.id}
              style={s.row}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('CourseQuizList', { courseId: course.id, headerTitle: `${course.title} Quiz` })}
            >
              <CourseLogo course={course} size={50} />
              <View style={s.rowBody}>
                <Text style={s.rowTitle}>{course.title}</Text>
                <Text style={s.rowSub}>{course.quiz.length} questions · {quizzes} quizzes</Text>
              </View>
              {count > 0
                ? <Pill label={`${count}/${quizzes} taken`} color={ui.success} bg={ui.successSoft} style={{ alignSelf: 'center' }} />
                : <MaterialIcons name="chevron-right" size={24} color={ui.sub} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  hero: { backgroundColor: ui.dark ? '#312E81' : '#4F46E5', borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 8 },
  heroSub: { color: 'rgba(255,255,255,0.88)', fontSize: 14, marginTop: 4, lineHeight: 20 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, ...cardShadow(ui),
  },
  rowBody: { flex: 1, marginHorizontal: 12 },
  rowTitle: { color: ui.text, fontSize: 17, fontWeight: '800' },
  rowSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
});
