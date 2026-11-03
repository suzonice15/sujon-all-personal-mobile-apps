import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getQuizeSubCategory } from '../../db/quizeContents';
import { getQuizCategory } from '../../data/quizCatalog';
import AdNative from '../../components/ads/AdNative';
import AdBanner from '../../components/ads/AdBanner';

const MIXED_SKILL_TEST_SIZE = 20;

export default function QuizeData({ route, navigation }) {
  const { item, mode = 'study', modeTitle } = route.params || {};
  const categoryTitle = route.params?.category || item?.category || route.params?.title || '';
  const category = getQuizCategory(categoryTitle);
  const [questionCounts, setQuestionCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const { colors } = useTheme();
  const s = styles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({ title: categoryTitle || 'কুইজ' });
  }, [navigation, categoryTitle]);

  useEffect(() => {
    let mounted = true;
    getQuizeSubCategory(categoryTitle)
      .then((rows) => {
        if (!mounted) return;
        setQuestionCounts(Object.fromEntries(
          (rows || []).map((row) => [row.sub_category, row.quiz_total])
        ));
      })
      .catch((error) => console.error('Quiz subcategory counts failed to load:', error))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => { mounted = false; };
  }, [categoryTitle]);

  const subcategories = category
    ? category.subcategories.map((subCategory) => ({
      sub_category: subCategory,
      quiz_total: questionCounts[subCategory] || 0,
    }))
    : Object.entries(questionCounts).map(([subCategory, quizTotal]) => ({
      sub_category: subCategory,
      quiz_total: quizTotal,
    }));

  const totalQuestions = Object.values(questionCounts).reduce((sum, count) => sum + count, 0);
  const mixedCount = Math.min(MIXED_SKILL_TEST_SIZE, totalQuestions);

  const openSubcategory = (subcategory) => {
    navigation.navigate(mode === 'study' ? 'QuizStudy' : 'QuizStart', {
      fetch_data: subcategory.sub_category,
      type: 'sub_category',
      title: subcategory.sub_category,
      category: categoryTitle,
      mode,
      modeTitle,
    });
  };

  // Skill test across every subject of this category, random questions
  const openMixedSkillTest = () => {
    navigation.navigate('QuizStart', {
      fetch_data: categoryTitle,
      type: 'category',
      title: `${categoryTitle} — মিশ্র`,
      category: categoryTitle,
      mode,
      modeTitle,
      limit: MIXED_SKILL_TEST_SIZE,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={subcategories}
        keyExtractor={(subcategory) => subcategory.sub_category}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={s.header}>
            <View style={s.headerRow}>
              <MaterialIcons name="tune" size={17} color={colors.primary} />
              <Text style={s.headerText}>
                {modeTitle || 'পড়াশোনা'} মোড · {loading ? 'প্রশ্ন খোঁজা হচ্ছে...' : 'বিষয় নির্বাচন করুন'}
              </Text>
            </View>
            {category?.metadataNote ? <Text style={s.note}>{category.metadataNote}</Text> : null}
            {category?.safetyNote ? <Text style={s.note}>{category.safetyNote}</Text> : null}
            {mode === 'skill' && !loading && totalQuestions > 0 ? (
              <TouchableOpacity
                accessibilityRole="button"
                style={[s.card, s.mixedCard, { backgroundColor: colors.primary }]}
                activeOpacity={0.8}
                onPress={openMixedSkillTest}
              >
                <View style={[s.iconBox, s.mixedIconBox]}>
                  <MaterialIcons name="shuffle" size={22} color="#FFFFFF" />
                </View>
                <View style={s.textWrapper}>
                  <Text style={[s.itemTitle, s.mixedTitle]}>সব বিষয় মিলিয়ে স্কিল টেস্ট</Text>
                  <Text style={[s.itemSubtitle, s.mixedSubtitle]}>এলোমেলো {mixedCount}টি প্রশ্ন</Text>
                </View>
                <MaterialIcons name="chevron-right" size={22} color="#FFFFFF" />
              </TouchableOpacity>
            ) : null}
          </View>
        )}
        renderItem={({ item: subcategory, index }) => (
          <TouchableOpacity
            accessibilityRole="button"
            style={s.card}
            activeOpacity={0.75}
            onPress={() => openSubcategory(subcategory)}
          >
            <View style={[s.iconBox, { backgroundColor: `${colors.primary}16` }]}>
              <MaterialIcons name={mode === 'study' ? 'menu-book' : 'quiz'} size={22} color={colors.primary} />
            </View>
            <View style={s.textWrapper}>
              <Text style={s.itemTitle}>{subcategory.sub_category}</Text>
              <Text style={s.itemSubtitle}>
                {subcategory.quiz_total}টি প্রশ্ন{mode === 'study' ? ' · উত্তরসহ পড়ুন' : ''}
              </Text>
            </View>
            <Text style={s.index}>{String(index + 1).padStart(2, '0')}</Text>
            <MaterialIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={!loading ? (
          <View style={s.emptyBox}>
            <MaterialIcons name="quiz" size={36} color={colors.onSurfaceVariant} />
            <Text style={s.emptyTitle}>এই বিভাগে বিষয় যোগ করা হয়নি</Text>
            <Text style={s.emptyText}>পরে আবার দেখুন।</Text>
          </View>
        ) : null}
        ListFooterComponent={<AdNative style={s.nativeAd} />}
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 20 },
  header: { marginBottom: 13 },
  headerRow: { flexDirection: 'row', alignItems: 'center' },
  headerText: { color: colors.onSurfaceVariant, fontSize: 12, fontWeight: '600', marginLeft: 7 },
  note: { color: colors.onSurfaceVariant, fontSize: 11, lineHeight: 16, marginTop: 7 },
  card: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: colors.surface,
    marginBottom: 9,
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  mixedCard: { marginTop: 12, marginBottom: 0 },
  mixedIconBox: { backgroundColor: '#FFFFFF26' },
  mixedTitle: { color: '#FFFFFF' },
  mixedSubtitle: { color: '#FFFFFFCC' },
  textWrapper: { flex: 1 },
  itemTitle: { color: colors.onSurface, fontSize: 14, fontWeight: '700' },
  itemSubtitle: { color: colors.onSurfaceVariant, fontSize: 11, marginTop: 4 },
  index: { color: colors.onSurfaceVariant, fontSize: 11, fontWeight: '700', marginRight: 5, opacity: 0.7 },
  emptyBox: { alignItems: 'center', paddingVertical: 42 },
  emptyTitle: { color: colors.onSurface, fontSize: 15, fontWeight: '700', marginTop: 12 },
  emptyText: { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 5 },
  nativeAd: { marginTop: 10, marginBottom: 5 },
});
