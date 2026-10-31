import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getCourse, getChapter } from '../../courses';
import { getCourseProgress } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, Pill, RADIUS, SPACE } from '../../components/course/ui';

export default function ChapterScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const chapter = getChapter(course, route.params?.chapterId);
  const [completed, setCompleted] = useState(new Set());
  const ui = useUI();
  const s = styles(ui, course.color);

  useFocusEffect(
    useCallback(() => {
      getCourseProgress(course.id).then(p => setCompleted(p.completed)).catch(e => console.log(e));
    }, [course.id])
  );

  if (!chapter) return null;

  const chapterNumber = course.chapters.indexOf(chapter) + 1;
  const done = chapter.lessons.filter(l => completed.has(l.id)).length;
  const nextUp = chapter.lessons.find(l => !completed.has(l.id));
  const quizCount = course.quiz.filter(q => q.chapterId === chapter.id).length;

  const openLesson = (lesson) => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id, headerTitle: lesson.title });

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View style={s.headerIcon}>
            <MaterialIcons name={chapter.icon} size={28} color={course.color} />
          </View>
          <Text style={s.kicker}>{course.title} · CHAPTER {chapterNumber}</Text>
          <Text style={s.title}>{chapter.title}</Text>
          <Text style={s.desc}>{chapter.description}</Text>
          <View style={s.progressRow}>
            <ProgressBar value={done / chapter.lessons.length} color={course.color} track={ui.track} height={6} style={{ flex: 1 }} />
            <Text style={s.progressText}>{done}/{chapter.lessons.length}</Text>
          </View>
        </View>

        <View style={s.timeline}>
          {chapter.lessons.map((lesson, i) => {
            const isDone = completed.has(lesson.id);
            const isNext = nextUp?.id === lesson.id;
            const isLast = i === chapter.lessons.length - 1;
            return (
              <View key={lesson.id} style={s.step}>
                <View style={s.rail}>
                  <View style={[s.dot, isDone && s.dotDone, isNext && s.dotNext]}>
                    {isDone
                      ? <MaterialIcons name="check" size={18} color="#fff" />
                      : <Text style={[s.dotText, isNext && { color: '#fff' }]}>{i + 1}</Text>}
                  </View>
                  {!isLast && <View style={[s.line, isDone && { backgroundColor: ui.success }]} />}
                </View>
                <TouchableOpacity
                  style={[s.lessonCard, isNext && s.lessonCardNext]}
                  activeOpacity={0.85}
                  onPress={() => openLesson(lesson)}
                >
                  <View style={{ flex: 1 }}>
                    {isNext && <Pill label="Up next" color={course.color} bg={tint(course.color, 0.15)} />}
                    <Text style={[s.lessonTitle, isNext && { marginTop: 6 }]}>{lesson.title}</Text>
                    <Text style={s.lessonMeta}>
                      {lesson.blocks.filter(b => b.type === 'code').length} examples
                      {lesson.blocks.some(b => b.tryIt) ? ' · Try it' : ''}
                    </Text>
                  </View>
                  <MaterialIcons name={isDone ? 'replay' : 'chevron-right'} size={22} color={ui.sub} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {quizCount > 0 && (
          <TouchableOpacity
            style={s.quizCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Quize', {
              screen: 'CourseQuiz',
              initial: false,
              params: { courseId: course.id, chapterId: chapter.id, headerTitle: `${chapter.title} Quiz` },
            })}
          >
            <View style={s.quizIcon}>
              <MaterialIcons name="quiz" size={24} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={s.quizTitle}>Chapter quiz</Text>
              <Text style={s.quizSub}>{quizCount} questions on {chapter.title}</Text>
            </View>
            <MaterialIcons name="arrow-forward" size={22} color={ui.text} />
          </TouchableOpacity>
        )}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const DOT = 34;

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },

  header: { backgroundColor: ui.card, borderRadius: RADIUS.lg, padding: 18, ...cardShadow(ui) },
  headerIcon: {
    width: 54, height: 54, borderRadius: 16, backgroundColor: tint(accent, 0.14),
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  kicker: { fontSize: 11, color: ui.sub, fontWeight: '800', letterSpacing: 0.8 },
  title: { fontSize: 24, color: ui.text, fontWeight: '900', marginTop: 2 },
  desc: { fontSize: 14, color: ui.sub, marginTop: 4, lineHeight: 20 },
  progressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  progressText: { color: ui.text, fontWeight: '800', marginLeft: 10 },

  timeline: { marginTop: SPACE.xl },
  step: { flexDirection: 'row' },
  rail: { width: DOT, alignItems: 'center' },
  dot: {
    width: DOT, height: DOT, borderRadius: DOT / 2, backgroundColor: ui.card,
    borderWidth: 2, borderColor: ui.border, alignItems: 'center', justifyContent: 'center', marginTop: 14,
  },
  dotDone: { backgroundColor: ui.success, borderColor: ui.success },
  dotNext: { backgroundColor: accent, borderColor: accent },
  dotText: { color: ui.sub, fontWeight: '800' },
  line: { width: 2, flex: 1, backgroundColor: ui.border, marginTop: 2 },
  lessonCard: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginLeft: 12, marginBottom: 12, ...cardShadow(ui),
  },
  lessonCardNext: { borderWidth: 1.5, borderColor: accent },
  lessonTitle: { color: ui.text, fontSize: 16, fontWeight: '800' },
  lessonMeta: { color: ui.sub, fontSize: 12, marginTop: 3 },

  quizCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginTop: 4, borderWidth: 1.5, borderColor: tint(accent, 0.5),
  },
  quizIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' },
  quizTitle: { color: ui.text, fontSize: 16, fontWeight: '800' },
  quizSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
});
