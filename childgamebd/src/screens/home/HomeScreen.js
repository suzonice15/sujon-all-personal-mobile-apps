import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import { games } from '../../data/games';

// Games that are built get their own route; the rest open the "coming soon" screen.
const GAME_ROUTES = {
  '1': 'LetterAdventure',
  '2': 'SeekRush',
  '3': 'GuessWord',
  '4': 'WordSearch',
  '5': 'BlockFill',
  '6': 'SubjectQuiz',
  '8': 'NamePlaceFlowerFruit',
};

export default function HomeScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const { width } = useWindowDimensions();
  const s = styles(colors);
  const cardWidth = (width - 16 * 2 - 12) / 2;

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.headerTitle}>শেখার খেলা</Text>
          <View style={s.headerPill}>
            <MaterialIcons name="sports-esports" size={13} color="#fff" />
            <Text style={s.headerPillText}>খেলতে খেলতে শিখুন</Text>
          </View>
        </View>

        <View style={s.grid}>
          {games.map((game) => (
            <TouchableOpacity
              key={game.id}
              accessibilityRole="button"
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate(GAME_ROUTES[game.id] || 'GamePlaceholder', { game })
              }
              style={[s.card, { width: cardWidth }]}
            >
              <View style={s.imageWrap}>
                <Image source={game.image} style={s.image} resizeMode="cover" />
                <View style={[s.playBadge, { backgroundColor: game.color }]}>
                  <MaterialIcons name="play-arrow" size={15} color="#fff" />
                </View>
              </View>
              <View style={[s.details, { backgroundColor: `${game.color}14` }]}>
                <Text numberOfLines={1} style={[s.title, { color: colors.onSurface }]}>{game.title}</Text>
                <Text numberOfLines={2} style={[s.subtitle, { color: colors.onSurfaceVariant }]}>{game.subtitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingTop: 6,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.onSurface,
    letterSpacing: -0.5,
    flexShrink: 1,
    marginRight: 8,
  },
  headerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 5,
  },
  headerPillText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
  },
  imageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playBadge: {
    position: 'absolute',
    right: 9,
    bottom: 9,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    paddingHorizontal: 11,
    paddingVertical: 12,
    minHeight: 68,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14.5,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 12.5,
    lineHeight: 17,
    marginTop: 1,
  },
});
