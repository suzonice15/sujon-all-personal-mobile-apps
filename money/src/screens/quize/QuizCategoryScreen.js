import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getCategoryWiseQuize } from '../../db/quizeContents';
import { QUIZ_CATEGORIES, QUIZ_MODES } from '../../data/quizCatalog';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

export default function QuizCategoryScreen({ route, navigation }) {
  const modeId = route.params?.mode || QUIZ_MODES[0].id;
  const mode = QUIZ_MODES.find((item) => item.id === modeId) || QUIZ_MODES[0];
  const [questionCounts, setQuestionCounts] = useState({});
  const [countLoadFailed, setCountLoadFailed] = useState(false);
  const { colors } = useTheme();
  const s = styles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({ title: mode.title });
  }, [navigation, mode.title]);

  useEffect(() => {
    let mounted = true;
    getCategoryWiseQuize()
      .then((categories) => {
        if (!mounted) return;
        setQuestionCounts(Object.fromEntries(
          (categories || []).map((category) => [category.category, category.quiz_total])
        ));
      })
      .catch((error) => {
        console.error('Quiz category counts failed to load:', error);
        if (mounted) setCountLoadFailed(true);
      });

    return () => { mounted = false; };
  }, []);

  const openCategory = (category) => {
    navigation.navigate('QuizeData', {
      category: category.title,
      item: { category: category.title },
      mode: mode.id,
      modeTitle: mode.title,
    });
  };

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={QUIZ_CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <View style={[s.modeBanner, { backgroundColor: colors.primary }]}>
            <MaterialIcons name={mode.icon} size={26} color="#FFFFFF" />
            <View style={s.modeBannerText}>
              <Text style={s.modeBannerTitle}>{mode.title}</Text>
              <Text style={s.modeBannerSubtitle}>{mode.subtitle}</Text>
            </View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            accessibilityRole="button"
            style={s.categoryCard}
            activeOpacity={0.75}
            onPress={() => openCategory(item)}
          >
            <View style={[s.categoryIcon, { backgroundColor: `${colors.primary}16` }]}>
              <MaterialIcons name={item.icon} size={23} color={colors.primary} />
            </View>
            <View style={s.categoryText}>
              <Text style={s.categoryTitle}>{item.title}</Text>
              <Text style={s.categorySubtitle}>
                {item.subcategories.length}টি বিষয় · {countLoadFailed ? 'প্রশ্নের সংখ্যা পাওয়া যায়নি' : `${questionCounts[item.title] || 0}টি প্রশ্ন`}
              </Text>
            </View>
            <Text style={s.categoryNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <MaterialIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        )}
        ListFooterComponent={<AdNative style={s.nativeAd} />}
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 20 },
  modeBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 15,
    marginBottom: 16,
  },
  modeBannerText: { flex: 1, marginLeft: 12 },
  modeBannerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  modeBannerSubtitle: { color: '#FFFFFFCC', fontSize: 12, marginTop: 3 },
  categoryCard: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 9,
    borderRadius: 15,
    backgroundColor: colors.surface,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  categoryText: { flex: 1, minWidth: 0 },
  categoryTitle: { color: colors.onSurface, fontSize: 14, fontWeight: '700' },
  categorySubtitle: { color: colors.onSurfaceVariant, fontSize: 11, marginTop: 4 },
  categoryNumber: { color: colors.onSurfaceVariant, fontSize: 11, fontWeight: '700', marginRight: 5, opacity: 0.7 },
  nativeAd: { marginTop: 10, marginBottom: 5 },
});
