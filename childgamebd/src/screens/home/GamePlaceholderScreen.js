import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GameNativeAd from '../../components/game/GameNativeAd';

export default function GamePlaceholderScreen({ route, navigation }) {
  const { colors } = usePaperTheme();
  const { width } = useWindowDimensions();
  const s = styles(colors);
  const game = route?.params?.game;

  if (!game) {
    return (
      <SafeAreaView style={[s.container, s.center]}>
        <Text style={[s.errorText, { color: colors.onSurfaceVariant }]}>গেমটি পাওয়া যায়নি</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Text style={s.backBtnText}>ফিরে যান</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <Image source={game.image} style={[s.hero, { width: width - 32 }]} resizeMode="cover" />
        <View style={[s.titleCard, { backgroundColor: colors.surface }]}>
          <View style={[s.dot, { backgroundColor: game.color }]} />
          <Text style={[s.title, { color: colors.onSurface }]}>{game.title}</Text>
          <Text style={[s.subtitle, { color: colors.onSurfaceVariant }]}>{game.subtitle}</Text>
        </View>
        <View style={[s.soonCard, { backgroundColor: `${game.color}18`, borderColor: `${game.color}66` }]}>
          <MaterialIcons name="construction" size={30} color={game.color} />
          <Text style={[s.soonTitle, { color: colors.onSurface }]}>শীঘ্রই আসছে!</Text>
          <Text style={[s.soonText, { color: colors.onSurfaceVariant }]}>
            খেলাটি তৈরি হচ্ছে। খুব শীঘ্রই খেলতে পারবেন।
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={[s.backBtn, { backgroundColor: game.color }]}
        >
          <MaterialIcons name="arrow-back" size={18} color="#fff" />
          <Text style={s.backBtnText}>সব খেলা দেখুন</Text>
        </TouchableOpacity>
        <GameNativeAd style={s.nativeAd} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },
  hero: {
    height: 210,
    borderRadius: 20,
    marginBottom: 14,
  },
  titleCard: {
    width: '100%',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  soonCard: {
    width: '100%',
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  soonTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 6,
  },
  soonText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    paddingHorizontal: 26,
    borderRadius: 30,
  },
  backBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: 6,
  },
  nativeAd: {
    marginTop: 20,
  },
  errorText: {
    fontSize: 15,
    marginBottom: 14,
  },
});
