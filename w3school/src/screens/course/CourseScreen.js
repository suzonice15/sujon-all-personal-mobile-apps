import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getCourse, getAllLessons, findLesson } from '../../courses';
import { getCourseProgress } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, HeroDecor, SectionTitle, RADIUS, SPACE } from '../../components/course/ui';

export default function CourseScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const allLessons = useMemo(() => getAllLessons(course), [course]);
  const [progress, setProgress] = useState({ completed: new Set(), lastOpenedId: null });
  const [query, setQuery] = useState('');
  const ui = useUI();
  const s = styles(ui, course.color);

  useFocusEffect(
    useCallback(() => {
      getCourseProgress(course.id).then(setProgress).catch(e => console.log(e));
    }, [course.id])
  );

  const doneCount = allLessons.filter(l => progress.completed.has(l.id)).length;
  const percent = allLessons.length ? Math.round((doneCount / allLessons.length) * 100) : 0;
  // Resume where the user left off, otherwise the first unfinished lesson.
  const continueLesson = (progress.lastOpenedId && findLesson(course, progress.lastOpenedId)?.lesson)
    || allLessons.find(l => !progress.completed.has(l.id))
    || allLessons[0];

  const q = query.trim().toLowerCase();
  const results = q ? allLessons.filter(l => l.title.toLowerCase().includes(q)) : [];

  const openLesson = (lesson) => navigation.navigate('Lesson', { courseId: course.id, lessonId: lesson.id, headerTitle: lesson.title });

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={s.hero}>
          <HeroDecor />
          <Text style={s.heroKicker}>{course.short || course.title} COURSE</Text>
          <Text style={s.heroTitle}>Learn {course.title}</Text>
          <Text style={s.heroTagline}>{course.tagline}</Text>

          <View style={s.heroMeta}>
            <MetaItem icon="menu-book" label={`${course.chapters.length} chapters`} />
            <MetaItem icon="article" label={`${allLessons.length} lessons`} />
            <MetaItem icon="quiz" label={`${course.quiz.length} quiz`} />
          </View>

          <View style={s.heroProgressRow}>
            <ProgressBar value={percent / 100} color="#fff" track="rgba(255,255,255,0.3)" height={8} style={{ flex: 1 }} />
            <Text style={s.heroPercent}>{percent}%</Text>
          </View>

          {continueLesson && (
            <TouchableOpacity style={s.cta} activeOpacity={0.9} onPress={() => openLesson(continueLesson)}>
              <MaterialIcons name="play-arrow" size={22} color={course.color} />
              <Text style={s.ctaText} numberOfLines={1}>
                {doneCount === 0 && !progress.lastOpenedId ? 'Start learning' : `Continue: ${continueLesson.title}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={s.search}>
          <MaterialIcons name="search" size={22} color={ui.sub} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder={`Search ${course.title} lessons`}
            placeholderTextColor={ui.sub}
            style={s.searchInput}
          />
          {!!query && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <MaterialIcons name="close" size={20} color={ui.sub} />
            </TouchableOpacity>
          )}
        </View>

        {q ? (
          <View>
            <SectionTitle title={`${results.length} results`} ui={ui} />
            {results.length === 0 && <Text style={s.empty}>No lessons match "{query}".</Text>}
            {results.map(l => (
              <TouchableOpacity key={l.id} style={s.resultRow} onPress={() => openLesson(l)}>
                <MaterialIcons
                  name={progress.completed.has(l.id) ? 'check-circle' : 'article'}
                  size={20}
                  color={progress.completed.has(l.id) ? ui.success : course.color}
                />
                <Text style={s.resultText}>{l.title}</Text>
                <MaterialIcons name="chevron-right" size={22} color={ui.sub} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <>
            <SectionTitle title="Chapters" ui={ui} right={<Text style={s.count}>{doneCount}/{allLessons.length} done</Text>} />
            {course.chapters.map((ch, i) => {
              const done = ch.lessons.filter(l => progress.completed.has(l.id)).length;
              const complete = done === ch.lessons.length;
              return (
                <TouchableOpacity
                  key={ch.id}
                  style={s.chapter}
                  activeOpacity={0.85}
                  onPress={() => navigation.navigate('Chapter', { courseId: course.id, chapterId: ch.id, headerTitle: ch.title })}
                >
                  <View style={[s.chapterIcon, complete && { backgroundColor: ui.successSoft }]}>
                    <MaterialIcons name={complete ? 'check' : ch.icon} size={24} color={complete ? ui.success : course.color} />
                  </View>
                  <View style={s.chapterBody}>
                    <Text style={s.chapterNumber}>CHAPTER {i + 1}</Text>
                    <Text style={s.chapterTitle}>{ch.title}</Text>
                    <Text style={s.chapterDesc} numberOfLines={1}>{ch.description}</Text>
                    <View style={s.chapterProgressRow}>
                      <ProgressBar
                        value={done / ch.lessons.length}
                        color={complete ? ui.success : course.color}
                        track={ui.track}
                        height={4}
                        style={{ flex: 1 }}
                      />
                      <Text style={s.chapterCount}>{done}/{ch.lessons.length}</Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={22} color={ui.sub} />
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              style={s.quizCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('Quize', {
                screen: 'CourseQuizList',
                initial: false,
                params: { courseId: course.id, headerTitle: `${course.title} Quiz` },
              })}
            >
              <View style={s.quizIcon}>
                <MaterialIcons name="emoji-events" size={28} color="#fff" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={s.quizTitle}>Test your {course.title} skills</Text>
                <Text style={s.quizSub}>{course.quiz.length} questions · chapter quizzes and a full test</Text>
              </View>
              <MaterialIcons name="arrow-forward" size={22} color={ui.text} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

function MetaItem({ icon, label }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14 }}>
      <MaterialIcons name={icon} size={15} color="rgba(255,255,255,0.85)" />
      <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '700', marginLeft: 4 }}>{label}</Text>
    </View>
  );
}

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },

  hero: { backgroundColor: accent, borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroKicker: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginTop: 4 },
  heroTagline: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 2 },
  heroMeta: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 },
  heroProgressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  heroPercent: { color: '#fff', fontWeight: '800', marginLeft: 10, fontSize: 14 },
  cta: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff',
    borderRadius: RADIUS.pill, paddingVertical: 12, paddingHorizontal: 16, marginTop: 16,
  },
  ctaText: { color: '#0F172A', fontWeight: '800', fontSize: 15, marginLeft: 4, flexShrink: 1 },

  search: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md,
    paddingHorizontal: 14, marginTop: SPACE.lg, height: 50, ...cardShadow(ui),
  },
  searchInput: { flex: 1, marginLeft: 8, color: ui.text, fontSize: 15, paddingVertical: 0 },

  count: { color: ui.sub, fontSize: 13, fontWeight: '600' },
  empty: { color: ui.sub },
  resultRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 8, ...cardShadow(ui),
  },
  resultText: { flex: 1, marginLeft: 10, color: ui.text, fontSize: 15, fontWeight: '700' },

  chapter: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 10, ...cardShadow(ui),
  },
  chapterIcon: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: tint(accent, 0.14),
    alignItems: 'center', justifyContent: 'center',
  },
  chapterBody: { flex: 1, marginHorizontal: 12 },
  chapterNumber: { fontSize: 10, color: ui.sub, fontWeight: '800', letterSpacing: 0.8 },
  chapterTitle: { fontSize: 16, color: ui.text, fontWeight: '800', marginTop: 1 },
  chapterDesc: { fontSize: 12, color: ui.sub, marginTop: 1 },
  chapterProgressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  chapterCount: { fontSize: 11, color: ui.sub, fontWeight: '700', marginLeft: 8 },

  quizCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginTop: 8, borderWidth: 1.5, borderColor: tint(accent, 0.5),
  },
  quizIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: accent, alignItems: 'center', justifyContent: 'center' },
  quizTitle: { color: ui.text, fontSize: 16, fontWeight: '800' },
  quizSub: { color: ui.sub, fontSize: 12, marginTop: 2 },
});
