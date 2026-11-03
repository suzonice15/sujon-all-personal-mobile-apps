import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getQuizeStudyData } from '../../db/quizeContents';
import { QUIZ_MODES } from '../../data/quizCatalog';
import AdNative from '../../components/ads/AdNative';
import AdBanner from '../../components/ads/AdBanner';

const OPTION_LABELS = ['ক', 'খ', 'গ', 'ঘ'];

export default function QuizStudyScreen({ route, navigation }) {
  const { title, type, fetch_data, category } = route.params || {};
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const s = styles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({ title: title || 'পড়াশোনা' });
  }, [navigation, title]);

  useEffect(() => {
    let mounted = true;
    getQuizeStudyData(type, fetch_data, category)
      .then((rows) => { if (mounted) setQuestions(rows || []); })
      .catch((error) => console.error('Study questions failed to load:', error))
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [category, fetch_data, type]);

  const startSkillTest = () => {
    const skillMode = QUIZ_MODES.find((item) => item.id === 'skill');
    navigation.replace('QuizStart', {
      fetch_data,
      type,
      title,
      category,
      mode: 'skill',
      modeTitle: skillMode?.title,
    });
  };

  const renderQuestion = ({ item: question, index }) => {
    const options = [question.option_a, question.option_b, question.option_c, question.option_d];
    const meta = [question.exam_name, question.exam_year, question.source_name, question.published_at]
      .filter(Boolean)
      .join(' · ');

    return (
      <View style={s.card}>
        <Text style={s.question}>{index + 1}. {question.name}</Text>
        {options.map((option, optionIndex) => {
          const isCorrect = option === question.answer;
          return (
            <View key={optionIndex} style={[s.option, isCorrect && s.optionCorrect]}>
              <Text style={[s.optionLabel, isCorrect && s.correctText]}>{OPTION_LABELS[optionIndex]})</Text>
              <Text style={[s.optionText, isCorrect && s.correctText]}>{option}</Text>
              {isCorrect ? <MaterialIcons name="check-circle" size={18} color="#16A34A" /> : null}
            </View>
          );
        })}
        <View style={s.answerRow}>
          <MaterialIcons name="lightbulb" size={16} color="#16A34A" />
          <Text style={s.answerText}>সঠিক উত্তর: {question.answer}</Text>
        </View>
        {meta ? <Text style={s.meta}>{meta}</Text> : null}
        {question.source_url ? (
          <Text
            accessibilityRole="link"
            onPress={() => Linking.openURL(question.source_url)}
            style={[s.sourceLink, { color: colors.primary }]}
          >
            সূত্র দেখুন
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={questions}
        keyExtractor={(question) => question.id || question.name}
        renderItem={renderQuestion}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={!loading && questions.length > 0 ? (
          <View style={s.header}>
            <MaterialIcons name="menu-book" size={17} color={colors.primary} />
            <Text style={s.headerText}>{questions.length}টি প্রশ্ন ও উত্তর · মনোযোগ দিয়ে পড়ুন</Text>
          </View>
        ) : null}
        ListEmptyComponent={(
          <View style={s.emptyBox}>
            <MaterialIcons name="menu-book" size={36} color={colors.onSurfaceVariant} />
            <Text style={s.emptyTitle}>{loading ? 'প্রশ্ন লোড হচ্ছে...' : 'এই বিষয়ে এখনো প্রশ্ন যোগ করা হয়নি'}</Text>
          </View>
        )}
        ListFooterComponent={!loading && questions.length > 0 ? (
          <View>
            <TouchableOpacity style={[s.testBtn, { backgroundColor: colors.primary }]} onPress={startSkillTest}>
              <MaterialIcons name="psychology" size={20} color="#FFFFFF" />
              <Text style={s.testBtnText}>পড়া শেষ? এই বিষয়ে স্কিল টেস্ট দিন</Text>
            </TouchableOpacity>
            <AdNative style={s.nativeAd} />
          </View>
        ) : null}
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  headerText: { color: colors.onSurfaceVariant, fontSize: 12, fontWeight: '600', marginLeft: 7 },
  card: { backgroundColor: colors.surface, borderRadius: 14, padding: 14, marginBottom: 12 },
  question: { color: colors.onSurface, fontSize: 15, fontWeight: '700', lineHeight: 24, marginBottom: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: `${colors.onSurfaceVariant}33`,
    marginBottom: 6,
  },
  optionCorrect: { backgroundColor: '#DCFCE7', borderColor: '#22C55E' },
  optionLabel: { color: colors.onSurfaceVariant, fontSize: 14, fontWeight: '700', marginRight: 8 },
  optionText: { color: colors.onSurface, fontSize: 14, flex: 1 },
  correctText: { color: '#15803D', fontWeight: '700' },
  answerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  answerText: { color: '#16A34A', fontSize: 13, fontWeight: '700', marginLeft: 6, flex: 1 },
  meta: { color: colors.onSurfaceVariant, fontSize: 11, marginTop: 8 },
  sourceLink: { fontSize: 12, fontWeight: '700', marginTop: 4 },
  emptyBox: { alignItems: 'center', paddingVertical: 42 },
  emptyTitle: { color: colors.onSurface, fontSize: 15, fontWeight: '700', marginTop: 12 },
  testBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    marginTop: 6,
  },
  testBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', marginLeft: 8 },
  nativeAd: { marginTop: 12, marginBottom: 5 },
});
