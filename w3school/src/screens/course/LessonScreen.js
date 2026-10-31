import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import CodeBlock from '../../components/course/CodeBlock';
import { getCourse, findLesson, getChapter } from '../../courses';
import { getCourseProgress, markLessonOpened, setLessonCompleted } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, RADIUS, SPACE } from '../../components/course/ui';

export default function LessonScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const found = findLesson(course, route.params?.lessonId);
  const [done, setDone] = useState(false);
  const scrollRef = useRef(null);
  const ui = useUI();
  const s = styles(ui, course.color);

  const lessonId = found?.lesson.id;

  useEffect(() => {
    if (!lessonId) return;
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    markLessonOpened(course.id, lessonId).catch(e => console.log(e));
    getCourseProgress(course.id).then(p => setDone(p.completed.has(lessonId))).catch(e => console.log(e));
  }, [course.id, lessonId]);

  if (!found) return null;
  const { lesson, prev, next } = found;
  const chapter = getChapter(course, lesson.chapterId);
  const position = chapter.lessons.findIndex(l => l.id === lesson.id) + 1;

  const goTo = (target) => navigation.setParams({ lessonId: target.id, headerTitle: target.title });

  const toggleDone = async () => {
    await setLessonCompleted(course.id, lesson.id, !done);
    setDone(!done);
  };

  const finishAndNext = async () => {
    if (!done) await setLessonCompleted(course.id, lesson.id, true);
    if (next) goTo(next);
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <View style={s.topBar}>
        <Text style={s.topText} numberOfLines={1}>{chapter.title}</Text>
        <Text style={s.topText}>Lesson {position} of {chapter.lessons.length}</Text>
      </View>
      <ProgressBar value={position / chapter.lessons.length} color={course.color} track={ui.track} height={3} style={{ borderRadius: 0 }} />

      <ScrollView ref={scrollRef} contentContainerStyle={s.content}>
        <Text style={s.title}>{lesson.title}</Text>

        {lesson.blocks.map((b, i) => {
          switch (b.type) {
            case 'heading':
              return <Text key={i} style={s.heading}>{b.value}</Text>;
            case 'list':
              return (
                <View key={i} style={s.list}>
                  {b.items.map((item, j) => (
                    <View key={j} style={s.listRow}>
                      <View style={s.bullet} />
                      <Text style={s.listText}>{item}</Text>
                    </View>
                  ))}
                </View>
              );
            case 'code':
              return (
                <CodeBlock
                  key={i}
                  code={b.value}
                  lang={b.lang}
                  onTryIt={b.tryIt ? () => navigation.navigate('TryIt', { code: b.value, lang: b.lang }) : undefined}
                />
              );
            case 'note':
              return (
                <View key={i} style={s.note}>
                  <MaterialIcons name="lightbulb" size={18} color={ui.noteBorder} />
                  <Text style={s.noteText}>{b.value}</Text>
                </View>
              );
            default:
              return <Text key={i} style={s.text}>{b.value}</Text>;
          }
        })}

        <TouchableOpacity style={[s.doneCard, done && s.doneCardActive]} onPress={toggleDone} activeOpacity={0.85}>
          <MaterialIcons name={done ? 'check-circle' : 'radio-button-unchecked'} size={26} color={ui.success} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={s.doneTitle}>{done ? 'Lesson completed' : 'Mark as complete'}</Text>
            <Text style={s.doneSub}>{done ? 'Tap to mark it as not done' : 'Track your progress through the course'}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>

      <View style={s.navBar}>
        <TouchableOpacity style={[s.navPrev, !prev && { opacity: 0.35 }]} disabled={!prev} onPress={() => goTo(prev)}>
          <MaterialIcons name="arrow-back" size={22} color={ui.text} />
        </TouchableOpacity>
        <TouchableOpacity style={s.navNext} onPress={finishAndNext} activeOpacity={0.9}>
          <View style={{ flex: 1 }}>
            <Text style={s.navNextLabel}>{next ? 'NEXT LESSON' : 'FINISH'}</Text>
            <Text style={s.navNextTitle} numberOfLines={1}>{next ? next.title : 'Back to chapter'}</Text>
          </View>
          <MaterialIcons name={next ? 'arrow-forward' : 'check'} size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACE.lg, paddingVertical: 8,
    backgroundColor: ui.card,
  },
  topText: { color: ui.sub, fontSize: 12, fontWeight: '700', flexShrink: 1 },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },

  title: { fontSize: 28, fontWeight: '900', color: ui.text, marginBottom: 8, lineHeight: 34 },
  heading: { fontSize: 19, fontWeight: '800', color: ui.text, marginTop: 20, marginBottom: 4 },
  text: { fontSize: 16, lineHeight: 26, color: ui.text, marginVertical: 6 },
  list: { marginVertical: 6 },
  listRow: { flexDirection: 'row', marginVertical: 4 },
  bullet: { width: 7, height: 7, borderRadius: 4, backgroundColor: accent, marginTop: 9, marginRight: 12 },
  listText: { flex: 1, fontSize: 15, lineHeight: 24, color: ui.text },
  note: {
    flexDirection: 'row', backgroundColor: ui.noteBg, borderLeftWidth: 4, borderLeftColor: ui.noteBorder,
    borderRadius: RADIUS.sm, padding: 12, marginVertical: 10,
  },
  noteText: { flex: 1, marginLeft: 10, color: ui.noteText, fontSize: 14, lineHeight: 21 },

  doneCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card, borderRadius: RADIUS.md,
    padding: 16, marginTop: 28, borderWidth: 1.5, borderColor: ui.border,
  },
  doneCardActive: { backgroundColor: ui.successSoft, borderColor: ui.success },
  doneTitle: { color: ui.text, fontSize: 16, fontWeight: '800' },
  doneSub: { color: ui.sub, fontSize: 12, marginTop: 2 },

  navBar: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACE.lg, paddingVertical: 10,
    backgroundColor: ui.card, ...(ui.dark ? { borderTopWidth: 1, borderTopColor: ui.border } : { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: ui.border }),
  },
  navPrev: {
    width: 50, height: 50, borderRadius: RADIUS.md, backgroundColor: ui.cardAlt,
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  navNext: {
    flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: accent,
    borderRadius: RADIUS.md, paddingHorizontal: 16, height: 50, ...cardShadow({ dark: false }),
  },
  navNextLabel: { color: tint('#FFFFFF', 0.8), fontSize: 10, fontWeight: '800', letterSpacing: 0.8 },
  navNextTitle: { color: '#fff', fontSize: 14, fontWeight: '800' },
});
