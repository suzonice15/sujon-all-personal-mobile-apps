import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { LEARNING_PATHS, pathProgress } from '../../courses/learningPaths';
import { getAllCourseProgress } from '../../db/courseProgress';
import { useUI, cardShadow, ProgressBar, RADIUS, SPACE } from '../../components/course/ui';

export default function LearningPathsScreen({ navigation }) {
  const [progress, setProgress] = useState({});
  const ui = useUI();
  const s = styles(ui);

  useFocusEffect(
    useCallback(() => {
      getAllCourseProgress().then(setProgress).catch(e => console.log(e));
    }, [])
  );

  return (
    <SafeAreaView style={s.container} edges={['left', 'right']}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Text style={s.intro}>
          Not sure where to start? Follow a path. Each one is a set of courses in the order that works best.
        </Text>

        {LEARNING_PATHS.map(path => {
          const info = pathProgress(path, progress);
          const percent = Math.round(info.pct * 100);
          return (
            <TouchableOpacity
              key={path.id}
              style={s.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('LearningPath', { pathId: path.id, headerTitle: path.title })}
            >
              <View style={[s.icon, { backgroundColor: path.color }]}>
                <MaterialIcons name={path.icon} size={26} color="#fff" />
              </View>
              <View style={s.body}>
                <Text style={s.title}>{path.title}</Text>
                <Text style={s.tagline} numberOfLines={2}>{path.tagline}</Text>
                <View style={s.row}>
                  <ProgressBar value={info.pct} color={path.color} track={ui.track} height={5} style={s.progress} />
                  <Text style={[s.percent, { color: path.color }]}>{percent}%</Text>
                </View>
                <Text style={s.meta}>
                  {info.completedSteps}/{info.totalSteps} courses completed · {path.steps.length} steps
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={ui.sub} />
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
  intro: { color: ui.sub, fontSize: 14, lineHeight: 20, marginBottom: SPACE.lg },

  card: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: ui.card,
    borderRadius: RADIUS.md, padding: 14, marginBottom: 12, ...cardShadow(ui),
  },
  icon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  body: { flex: 1, marginHorizontal: 12 },
  title: { fontSize: 17, fontWeight: '800', color: ui.text },
  tagline: { fontSize: 12, color: ui.sub, marginTop: 2, lineHeight: 16 },
  row: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  progress: { flex: 1 },
  percent: { fontSize: 12, fontWeight: '800', marginLeft: 8 },
  meta: { fontSize: 11, color: ui.sub, fontWeight: '700', marginTop: 6 },
});
