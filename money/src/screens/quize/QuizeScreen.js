import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { QUIZ_MODES } from '../../data/quizCatalog';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

const MODE_COLORS = {
  study: '#0EA5E9',
  skill: '#8B5CF6',
  exam: '#F97316',
};

// Quiz home: the three parent menus. Each one opens its own category list.
export default function QuizeScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);

  const openMode = (mode) => {
    navigation.navigate('QuizCategory', { mode: mode.id });
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.list} showsVerticalScrollIndicator={false}>
        <Text style={s.introTitle}>কী করতে চান?</Text>
        <Text style={s.introSubtitle}>একটি মেনু বেছে নিন, তারপর বিষয় নির্বাচন করুন।</Text>

        {QUIZ_MODES.map((mode) => {
          const accent = MODE_COLORS[mode.id] || colors.primary;
          return (
            <TouchableOpacity
              key={mode.id}
              accessibilityRole="button"
              activeOpacity={0.8}
              onPress={() => openMode(mode)}
              style={[s.modeCard, { borderLeftColor: accent }]}
            >
              <View style={[s.modeIcon, { backgroundColor: `${accent}1F` }]}>
                <MaterialIcons name={mode.icon} size={30} color={accent} />
              </View>
              <View style={s.modeText}>
                <Text style={s.modeTitle}>{mode.title}</Text>
                <Text style={s.modeSubtitle}>{mode.subtitle}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={26} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          );
        })}

        <AdNative style={s.nativeAd} />
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, paddingBottom: 20 },
  introTitle: { color: colors.onSurface, fontSize: 19, fontWeight: '800' },
  introSubtitle: { color: colors.onSurfaceVariant, fontSize: 13, marginTop: 5, marginBottom: 16 },
  modeCard: {
    minHeight: 92,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    borderRadius: 16,
    borderLeftWidth: 5,
    backgroundColor: colors.surface,
  },
  modeIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeText: { flex: 1, marginLeft: 14 },
  modeTitle: { color: colors.onSurface, fontSize: 17, fontWeight: '800' },
  modeSubtitle: { color: colors.onSurfaceVariant, fontSize: 12, marginTop: 4, lineHeight: 17 },
  nativeAd: { marginTop: 8, marginBottom: 5 },
});
