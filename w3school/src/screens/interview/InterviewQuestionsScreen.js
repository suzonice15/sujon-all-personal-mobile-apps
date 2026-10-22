import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import CodeBlock from '../../components/course/CodeBlock';
import { getCourse, getInterviewQuestions, interviewKey } from '../../courses';
import { getPracticedInterviewKeys, setInterviewPracticed } from '../../db/courseProgress';
import { useUI, cardShadow, tint, Pill, RADIUS, SPACE } from '../../components/course/ui';

const LEVELS = [
  { id: 'all', label: 'All' },
  { id: 'basic', label: 'Basic' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
];

// Question cards for one chapter (or the whole course when chapterId is null).
// Answers start hidden so students can try to answer first.
export default function InterviewQuestionsScreen({ route, navigation }) {
  const course = getCourse(route.params?.courseId);
  const chapterId = route.params?.chapterId ?? null;
  const [practiced, setPracticed] = useState(new Set());
  const [openKeys, setOpenKeys] = useState(new Set());
  const [level, setLevel] = useState('all');
  const ui = useUI();
  const s = styles(ui, course.color);

  useFocusEffect(
    useCallback(() => {
      getPracticedInterviewKeys().then(setPracticed).catch(e => console.log(e));
    }, [])
  );

  // Each item keeps its own key so filtering does not change which question is which.
  const items = useMemo(() => {
    const chapters = chapterId ? course.chapters.filter(ch => ch.id === chapterId) : course.chapters;
    return chapters.flatMap(ch => getInterviewQuestions(course, ch.id).map((item, i) => ({
      ...item, key: interviewKey(course, ch.id, i), chapterTitle: ch.title,
    })));
  }, [course, chapterId]);

  const visible = level === 'all' ? items : items.filter(it => it.level === level);
  const doneCount = items.filter(it => practiced.has(it.key)).length;
  const allOpen = visible.length > 0 && visible.every(it => openKeys.has(it.key));

  const toggleOpen = (key) => setOpenKeys(prev => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });

  const toggleAll = () => setOpenKeys(allOpen ? new Set() : new Set(visible.map(it => it.key)));

  const togglePracticed = async (key) => {
    const now = !practiced.has(key);
    await setInterviewPracticed(course.id, key, now);
    setPracticed(prev => {
      const next = new Set(prev);
      if (now) next.add(key); else next.delete(key);
      return next;
    });
  };

  const levelStyle = (lvl) => ({
    basic: { color: ui.success, bg: ui.successSoft },
    intermediate: { color: '#B45309', bg: tint('#F59E0B', 0.18) },
    advanced: { color: ui.danger, bg: tint('#EF4444', 0.15) },
  }[lvl] || { color: ui.sub, bg: ui.cardAlt });

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.summary}>
          <Text style={s.summaryText}>{doneCount} of {items.length} practiced</Text>
          <TouchableOpacity onPress={toggleAll} hitSlop={8}>
            <Text style={s.summaryAction}>{allOpen ? 'Hide all answers' : 'Show all answers'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filters} contentContainerStyle={{ gap: 8 }}>
          {LEVELS.map(l => {
            const count = l.id === 'all' ? items.length : items.filter(it => it.level === l.id).length;
            if (!count) return null;
            const active = level === l.id;
            return (
              <TouchableOpacity key={l.id} onPress={() => setLevel(l.id)} style={[s.chip, active && s.chipActive]}>
                <Text style={[s.chipText, active && s.chipTextActive]}>{l.label} ({count})</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {visible.map((it, i) => {
          const open = openKeys.has(it.key);
          const done = practiced.has(it.key);
          const lv = levelStyle(it.level);
          return (
            <View key={it.key} style={[s.card, done && s.cardDone]}>
              <TouchableOpacity onPress={() => toggleOpen(it.key)} activeOpacity={0.8}>
                <View style={s.cardTop}>
                  <Text style={s.qNumber}>Q{i + 1}</Text>
                  {!!it.level && <Pill label={it.level} color={lv.color} bg={lv.bg} />}
                  {!chapterId && <Text style={s.chapter} numberOfLines={1}>{it.chapterTitle}</Text>}
                </View>
                <View style={s.qRow}>
                  <Text style={s.question}>{it.q}</Text>
                  <MaterialIcons name={open ? 'expand-less' : 'expand-more'} size={26} color={ui.sub} />
                </View>
              </TouchableOpacity>

              {open && (
                <View style={s.answerBox}>
                  <Text style={s.answerLabel}>ANSWER</Text>
                  <Text style={s.answer}>{it.a}</Text>
                  {!!it.code && (
                    <CodeBlock
                      code={it.code}
                      lang={it.lang || 'js'}
                      onTryIt={it.tryIt ? () => navigation.navigate('TryIt', { code: it.code, lang: it.lang || 'js' }) : undefined}
                    />
                  )}
                </View>
              )}

              <TouchableOpacity style={s.practiceBtn} onPress={() => togglePracticed(it.key)}>
                <MaterialIcons name={done ? 'check-circle' : 'radio-button-unchecked'} size={20} color={ui.success} />
                <Text style={[s.practiceText, done && { color: ui.success }]}>{done ? 'Practiced' : 'Mark as practiced'}</Text>
              </TouchableOpacity>
            </View>
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
  summary: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryText: { color: ui.sub, fontWeight: '700' },
  summaryAction: { color: ui.dark ? ui.text : accent, fontWeight: '800' },
  filters: { marginTop: 12, marginBottom: 6, flexGrow: 0 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.pill, backgroundColor: ui.card, borderWidth: 1, borderColor: ui.border },
  chipActive: { backgroundColor: accent, borderColor: accent },
  chipText: { color: ui.text, fontWeight: '700', fontSize: 13, textTransform: 'capitalize' },
  chipTextActive: { color: '#fff' },
  card: { backgroundColor: ui.card, borderRadius: RADIUS.md, padding: 14, marginTop: 10, ...cardShadow(ui) },
  cardDone: { borderLeftWidth: 4, borderLeftColor: ui.success },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qNumber: { color: accent, fontWeight: '900', fontSize: 13 },
  chapter: { flex: 1, color: ui.sub, fontSize: 11, fontWeight: '700', textAlign: 'right' },
  qRow: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8 },
  question: { flex: 1, color: ui.text, fontSize: 16, fontWeight: '800', lineHeight: 22 },
  answerBox: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: ui.border },
  answerLabel: { color: ui.sub, fontSize: 10, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  answer: { color: ui.text, fontSize: 15, lineHeight: 23 },
  practiceBtn: { flexDirection: 'row', alignItems: 'center', marginTop: 12, alignSelf: 'flex-start' },
  practiceText: { marginLeft: 6, color: ui.sub, fontWeight: '700', fontSize: 13 },
});
