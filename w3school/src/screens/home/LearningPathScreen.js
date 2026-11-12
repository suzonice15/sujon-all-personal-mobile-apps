import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { getLearningPath, pathProgress } from '../../courses/learningPaths';
import { getAllCourseProgress } from '../../db/courseProgress';
import { useUI, cardShadow, tint, ProgressBar, CourseLogo, HeroDecor, RADIUS, SPACE } from '../../components/course/ui';

const STATUS_ICON = {
  completed: { name: 'check-circle', color: 'success' },
  started: { name: 'play-circle-outline', color: 'brand' },
  todo: { name: 'radio-button-unchecked', color: 'sub' },
};

export default function LearningPathScreen({ route, navigation }) {
  const path = getLearningPath(route.params?.pathId);
  const [progress, setProgress] = useState({});
  const ui = useUI();
  const s = styles(ui, path?.color || ui.brand);

  useFocusEffect(
    useCallback(() => {
      getAllCourseProgress().then(setProgress).catch(e => console.log(e));
    }, [])
  );

  if (!path) {
    return (
      <SafeAreaView style={s.container}>
        <Text style={s.missing}>This learning path could not be found.</Text>
      </SafeAreaView>
    );
  }

  const info = pathProgress(path, progress);
  const percent = Math.round(info.pct * 100);

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <HeroDecor />
          <Text style={s.heroKicker}>LEARNING PATH</Text>
          <Text style={s.heroTitle}>{path.title}</Text>
          <Text style={s.heroTagline}>{path.tagline}</Text>
          <View style={s.heroProgressRow}>
            <ProgressBar value={info.pct} color="#fff" track="rgba(255,255,255,0.3)" height={8} style={s.progress} />
            <Text style={s.heroPercent}>{percent}%</Text>
          </View>
          <Text style={s.heroMeta}>
            {info.completedSteps} of {info.totalSteps} courses completed · {info.doneLessons}/{info.totalLessons} lessons
          </Text>
        </View>

        <Text style={s.sectionTitle}>Follow these courses in order</Text>

        {info.steps.map(step => {
          const icon = STATUS_ICON[step.status];
          const color = ui[icon.color];
          const coursePct = step.total ? Math.round((step.done / step.total) * 100) : 0;
          return (
            <TouchableOpacity
              key={step.courseId}
              style={s.step}
              activeOpacity={0.85}
              disabled={!step.course}
              onPress={() => navigation.navigate('Course', { courseId: step.courseId, headerTitle: step.course.title })}
            >
              <View style={s.stepNumber}>
                <Text style={s.stepNumberText}>{step.index}</Text>
              </View>
              {step.course && <CourseLogo course={step.course} size={44} />}
              <View style={s.stepBody}>
                <Text style={s.stepTitle} numberOfLines={1}>{step.course ? step.course.title : step.courseId}</Text>
                <Text style={s.stepMeta}>
                  {step.total ? `${step.done}/${step.total} lessons · ${coursePct}%` : 'Course not available'}
                </Text>
              </View>
              <MaterialIcons name={icon.name} size={24} color={color} />
            </TouchableOpacity>
          );
        })}

        <View style={s.tip}>
          <MaterialIcons name="lightbulb-outline" size={20} color={ui.noteText} />
          <Text style={s.tipText}>
            Finish one course before starting the next. Each course builds on the one before it.
          </Text>
        </View>
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (ui, accent) => StyleSheet.create({
  container: { flex: 1, backgroundColor: ui.bg },
  content: { padding: SPACE.lg, paddingBottom: SPACE.xl },
  missing: { color: ui.sub, padding: SPACE.lg },

  hero: { backgroundColor: accent, borderRadius: RADIUS.lg, padding: 20, overflow: 'hidden' },
  heroKicker: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#fff', fontSize: 26, fontWeight: '900', marginTop: 4 },
  heroTagline: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 2 },
  heroProgressRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  progress: { flex: 1 },
  heroPercent: { color: '#fff', fontWeight: '800', marginLeft: 10, fontSize: 14 },
  heroMeta: { color: 'rgba(255,255,255,0.9)', fontSize: 12, fontWeight: '700', marginTop: 10 },

  sectionTitle: { fontSize: 18, fontWeight: '800', color: ui.text, marginTop: SPACE.xl, marginBottom: SPACE.md },

  step: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 12, marginBottom: 10, ...cardShadow(ui),
  },
  stepNumber: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: tint(accent, 0.15),
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  stepNumberText: { color: accent, fontWeight: '800', fontSize: 12 },
  stepBody: { flex: 1, marginHorizontal: 12 },
  stepTitle: { fontSize: 16, fontWeight: '800', color: ui.text },
  stepMeta: { fontSize: 12, color: ui.sub, marginTop: 2 },

  tip: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: ui.noteBg,
    borderLeftWidth: 4, borderLeftColor: ui.noteBorder, borderRadius: RADIUS.sm,
    padding: 12, marginTop: SPACE.lg,
  },
  tipText: { flex: 1, marginLeft: 8, color: ui.noteText, fontSize: 13, lineHeight: 18 },
});
