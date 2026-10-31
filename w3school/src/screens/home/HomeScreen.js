import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { COURSES, COURSE_GROUPS, countLessons, findLesson } from '../../courses';
import { getAllCourseProgress, getQuizScores } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, CourseLogo, HeroDecor, Pill, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

export default function HomeScreen({ navigation }) {
  const [progress, setProgress] = useState({});
  const [quizCount, setQuizCount] = useState(0);
  const [query, setQuery] = useState('');
  const ui = useUI();
  const s = styles(ui);

  useFocusEffect(
    useCallback(() => {
      getAllCourseProgress().then(setProgress).catch(e => console.log(e));
      getQuizScores().then(sc => setQuizCount(Object.keys(sc).length)).catch(e => console.log(e));
    }, [])
  );

  const openCourse = (course) => navigation.navigate('Course', { courseId: course.id, headerTitle: course.title });

  const totalLessons = COURSES.reduce((n, c) => n + countLessons(c), 0);
  const doneLessons = COURSES.reduce((n, c) => n + (progress[c.id]?.completedIds.size || 0), 0);
  const startedCourses = COURSES.filter(c => progress[c.id]?.lastOpenedAt).length;

  // Most recently opened course and lesson, for the "Continue" card.
  const recent = COURSES
    .filter(c => progress[c.id]?.lastOpenedId)
    .sort((a, b) => progress[b.id].lastOpenedAt - progress[a.id].lastOpenedAt)[0];
  const recentLesson = recent ? findLesson(recent, progress[recent.id].lastOpenedId)?.lesson : null;

  const q = query.trim().toLowerCase();
  const groups = q
    ? [{ title: 'Results', courses: COURSES.filter(c => c.title.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q)) }]
    : COURSE_GROUPS;

  const renderCard = (course) => {
    const total = countLessons(course);
    const done = progress[course.id]?.completedIds.size || 0;
    const pct = total ? done / total : 0;
    const status = done === 0
      ? <Pill label="Start" color={ui.brand} bg={ui.brandSoft} />
      : pct >= 1
        ? <Pill label="Completed" color={ui.success} bg={ui.successSoft} />
        : <Pill label={`${Math.round(pct * 100)}%`} color={course.color} bg={tint(course.color, 0.15)} />;
    return (
      <TouchableOpacity key={course.id} style={s.card} activeOpacity={0.85} onPress={() => openCourse(course)}>
        <View style={s.cardTop}>
          <CourseLogo course={course} size={50} />
          {status}
        </View>
        <Text style={s.cardTitle} numberOfLines={1}>{course.title}</Text>
        <Text style={s.cardSub} numberOfLines={2}>{course.tagline}</Text>
        <Text style={s.cardMeta}>{course.chapters.length} chapters · {total} lessons</Text>
        <ProgressBar value={pct} color={course.color} track={ui.track} height={5} style={{ marginTop: SPACE.sm }} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={s.hero}>
          <HeroDecor />
          <Text style={s.heroKicker}>Welcome to CodeNest</Text>
          <Text style={s.heroTitle}>What will you learn today?</Text>
          <View style={s.stats}>
            <View style={s.stat}>
              <Text style={s.statValue}>{doneLessons}<Text style={s.statOf}>/{totalLessons}</Text></Text>
              <Text style={s.statLabel}>Lessons</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statValue}>{startedCourses}<Text style={s.statOf}>/{COURSES.length}</Text></Text>
              <Text style={s.statLabel}>Courses</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.stat}>
              <Text style={s.statValue}>{quizCount}</Text>
              <Text style={s.statLabel}>Quizzes</Text>
            </View>
          </View>
        </View>

        <View style={s.search}>
          <MaterialIcons name="search" size={22} color={ui.sub} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search courses"
            placeholderTextColor={ui.sub}
            style={s.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <MaterialIcons name="close" size={20} color={ui.sub} />
            </TouchableOpacity>
          )}
        </View>

        {!q && recent && recentLesson && (
          <>
            <SectionTitle title="Continue learning" ui={ui} />
            <TouchableOpacity
              style={s.continueCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Lesson', { courseId: recent.id, lessonId: recentLesson.id, headerTitle: recentLesson.title })}
            >
              <CourseLogo course={recent} size={46} />
              <View style={s.continueBody}>
                <Text style={s.continueCourse}>{recent.title}</Text>
                <Text style={s.continueLesson} numberOfLines={1}>{recentLesson.title}</Text>
                <ProgressBar
                  value={(progress[recent.id].completedIds.size || 0) / countLessons(recent)}
                  color={recent.color}
                  track={ui.track}
                  height={4}
                  style={{ marginTop: SPACE.sm }}
                />
              </View>
              <View style={[s.playBtn, { backgroundColor: recent.color }]}>
                <MaterialIcons name="play-arrow" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
          </>
        )}

        {groups.map(group => (
          <View key={group.title}>
            <SectionTitle title={group.title} ui={ui} right={<Text style={s.count}>{group.courses.length} courses</Text>} />
            {group.courses.length === 0
              ? <Text style={s.empty}>No courses match "{query}".</Text>
              : <View style={s.grid}>{group.courses.map(renderCard)}</View>}
          </View>
        ))}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },

  hero: { backgroundColor: ui.dark ? '#115E59' : ui.brand, borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroKicker: { color: '#CCFBF1', fontSize: 13, fontWeight: '700' },
  heroTitle: { color: '#fff', fontSize: 24, fontWeight: '800', marginTop: 4, lineHeight: 30 },
  stats: {
    flexDirection: 'row', alignItems: 'center', marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: RADIUS.md, paddingVertical: 12,
  },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  statOf: { fontSize: 13, fontWeight: '600', color: '#CCFBF1' },
  statLabel: { color: '#CCFBF1', fontSize: 12, fontWeight: '600', marginTop: 2 },
  statDivider: { width: 1, height: 28, backgroundColor: 'rgba(255,255,255,0.25)' },

  search: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md,
    paddingHorizontal: 14, marginTop: SPACE.lg, height: 50, ...cardShadow(ui),
  },
  searchInput: { flex: 1, marginLeft: 8, color: ui.text, fontSize: 15, paddingVertical: 0 },

  continueCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, ...cardShadow(ui),
  },
  continueBody: { flex: 1, marginHorizontal: 12 },
  continueCourse: { fontSize: 12, color: ui.sub, fontWeight: '700' },
  continueLesson: { fontSize: 16, color: ui.text, fontWeight: '800', marginTop: 2 },
  playBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },

  count: { color: ui.sub, fontSize: 13, fontWeight: '600' },
  empty: { color: ui.sub },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48.5%', backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, marginBottom: 12, ...cardShadow(ui) },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  cardTitle: { fontSize: 17, fontWeight: '800', color: ui.text, marginTop: 12 },
  cardSub: { fontSize: 12, color: ui.sub, marginTop: 2, minHeight: 32, lineHeight: 16 },
  cardMeta: { fontSize: 11, color: ui.sub, fontWeight: '700', marginTop: 8 },
});
