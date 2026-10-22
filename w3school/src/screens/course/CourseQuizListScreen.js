import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getCourse, getQuizQuestions } from '../../courses';
import { getQuizScores } from '../../db/courseProgress';
import { useUI, cardShadow, tint, Pill, HeroDecor, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

export const quizKey = (courseId, chapterId) => `${courseId}:${chapterId || 'all'}`;

export default function CourseQuizListScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const [scores, setScores] = useState({});
  const ui = useUI();
  const s = styles(ui, course.color);

  useFocusEffect(
    useCallback(() => {
      getQuizScores().then(setScores).catch(e => console.log(e));
    }, [])
  );

  const start = (chapterId, title) =>
    navigation.navigate('CourseQuiz', { courseId: course.id, chapterId, headerTitle: title });

  const scorePill = (chapterId) => {
    const sc = scores[quizKey(course.id, chapterId)];
    if (!sc) return <Pill label="New" color={ui.sub} bg={ui.cardAlt} style={{ alignSelf: 'center' }} />;
    const pct = sc.total ? sc.best / sc.total : 0;
    const color = pct >= 0.8 ? ui.success : pct >= 0.5 ? '#D97706' : ui.danger;
    const bg = pct >= 0.8 ? ui.successSoft : tint(color, 0.15);
    return <Pill label={`Best ${sc.best}/${sc.total}`} color={color} bg={bg} style={{ alignSelf: 'center' }} />;
  };

  const fullBest = scores[quizKey(course.id, null)];

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={s.fullTest} activeOpacity={0.9} onPress={() => start(null, `${course.title} Full Test`)}>
          <HeroDecor />
          <MaterialIcons name="emoji-events" size={36} color="#FDE68A" />
          <Text style={s.fullTitle}>{course.title} Full Test</Text>
          <Text style={s.fullSub}>
            All {course.quiz.length} questions in random order.
            {fullBest ? ` Your best: ${fullBest.best}/${fullBest.total}.` : ' Ready when you are.'}
          </Text>
          <View style={s.fullBtn}>
            <Text style={s.fullBtnText}>{fullBest ? 'Try again' : 'Start test'}</Text>
            <MaterialIcons name="arrow-forward" size={18} color={course.color} />
          </View>
        </TouchableOpacity>

        <SectionTitle title="Quiz by chapter" ui={ui} />
        {course.chapters.map((ch, i) => {
          const count = getQuizQuestions(course, ch.id).length;
          if (!count) return null;
          return (
            <TouchableOpacity key={ch.id} style={s.row} activeOpacity={0.85} onPress={() => start(ch.id, `${ch.title} Quiz`)}>
              <View style={s.icon}>
                <MaterialIcons name={ch.icon} size={22} color={course.color} />
              </View>
              <View style={s.rowBody}>
                <Text style={s.rowTitle}>{i + 1}. {ch.title}</Text>
                <Text style={s.rowSub}>{count} questions</Text>
              </View>
              {scorePill(ch.id)}
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
  fullTest: { backgroundColor: accent, borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  fullTitle: { color: '#fff', fontSize: 24, fontWeight: '900', marginTop: 8 },
  fullSub: { color: 'rgba(255,255,255,0.9)', marginTop: 4, lineHeight: 20 },
  fullBtn: {
    flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: '#fff',
    borderRadius: RADIUS.pill, paddingHorizontal: 16, paddingVertical: 10, marginTop: 16,
  },
  fullBtnText: { color: '#0F172A', fontWeight: '800', marginRight: 6 },
  row: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, ...cardShadow(ui),
  },
  icon: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: tint(accent, 0.14),
    alignItems: 'center', justifyContent: 'center',
  },
  rowBody: { flex: 1, marginHorizontal: 12 },
  rowTitle: { color: ui.text, fontSize: 15, fontWeight: '800' },
  rowSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
});
