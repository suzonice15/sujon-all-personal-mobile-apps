import React, { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../ads/AdBanner';
import FeedbackBubble from './FeedbackBubble';
import GameBackground from './GameBackground';
import GameButton from './GameButton';
import LevelStone from './LevelStone';
import RoundIconButton from './RoundIconButton';
import WoodBanner from './WoodBanner';
import { GC, shadow } from './gameTheme';
import { toBanglaDigits } from '../../utils/banglaNumber';

const DEFAULT_MASCOTS = [
  require('../../assets/images/common/mascot_giraffe.webp'),
  require('../../assets/images/common/mascot_penguin.webp'),
];

// Full level-map screen body shared by the games: header (home, title, total stars),
// greeting, loading/error states, sections of level stones and a bottom ad.
// sections: [{ key, title, levels: [{ key, title, titleScale, label, stars, unlocked, isNext, onPress, accessibilityLabel }] }]
export default function LevelMap({
  title,
  greeting,
  mascots = DEFAULT_MASCOTS,
  sections,
  totalStars,
  loading,
  error,
  onRetry,
  onHome,
}) {
  const { width } = useWindowDimensions();
  const [feedback, setFeedback] = useState(null);
  const columns = width >= 700 ? 6 : width >= 500 ? 5 : 4;
  const stoneSize = Math.floor((Math.min(width, 900) - 24) / columns);

  const showLocked = () => setFeedback({ type: 'retry', text: 'আগের লেভেলটি আগে শেষ করো!', key: Date.now() });

  const renderBody = () => {
    if (error) {
      return (
        <View style={styles.center}>
          <Text style={styles.message}>দুঃখিত! তোমার অগ্রগতি লোড করা যায়নি।</Text>
          <GameButton title="আবার চেষ্টা করো" iconLeft="refresh" size="small" onPress={onRetry} style={styles.retry} />
        </View>
      );
    }
    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={GC.red} />
          <Text style={styles.message}>লোড হচ্ছে...</Text>
        </View>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {sections.map((section) => (
          <View key={section.key} style={styles.section}>
            <WoodBanner size="small" style={styles.sectionSign}>
              {section.title}
            </WoodBanner>
            <View style={styles.grid}>
              {section.levels.map(({ key, ...stone }) => (
                <LevelStone key={key} size={stoneSize} onLockedPress={showLocked} {...stone} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <GameBackground>
      <View style={styles.header}>
        <RoundIconButton icon="home" color={GC.white} background={GC.blue} accessibilityLabel="সব খেলা" onPress={onHome} />
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={1} adjustsFontSizeToFit>
            {title}
          </Text>
        </View>
        <View style={styles.starPill} accessibilityLabel={`মোট তারা ${totalStars}`}>
          <MaterialIcons name="star" size={26} color={GC.yellow} />
          <Text style={styles.starCount}>{toBanglaDigits(totalStars)}</Text>
        </View>
      </View>
      <View style={styles.greeting}>
        {mascots[0] ? <Image source={mascots[0]} style={styles.mascot} resizeMode="contain" /> : null}
        <Text style={styles.greetingText} numberOfLines={2}>
          {greeting}
        </Text>
        {mascots[1] ? <Image source={mascots[1]} style={styles.mascot} resizeMode="contain" /> : null}
      </View>
      {renderBody()}
      <AdBanner style={styles.ad} />
      <FeedbackBubble feedback={feedback} style={styles.feedback} />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  ad: { paddingTop: 4 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8 },
  titleWrap: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: GC.woodLight,
    borderColor: GC.wood,
    borderWidth: 3,
    borderBottomWidth: 5,
    borderBottomColor: GC.woodDark,
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 10,
    ...shadow(4),
  },
  title: { fontSize: 18, fontWeight: '800', color: GC.ink, textAlign: 'center' },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GC.woodDark,
    borderRadius: 22,
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 12,
    borderWidth: 2,
    borderColor: GC.wood,
  },
  starCount: { color: GC.white, fontSize: 18, fontWeight: '800', marginLeft: 4, minWidth: 18, textAlign: 'center' },
  greeting: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '94%',
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 24,
    paddingHorizontal: 14,
    paddingVertical: 6,
    ...shadow(3),
  },
  mascot: { width: 40, height: 40 },
  greetingText: { flexShrink: 1, fontSize: 16, fontWeight: '800', color: GC.ink, marginHorizontal: 8, textAlign: 'center' },
  scroll: { paddingHorizontal: 12, paddingBottom: 36, alignItems: 'center' },
  section: { marginTop: 22, width: '100%', alignItems: 'center', maxWidth: 900 },
  sectionSign: { marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', width: '100%' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  message: { marginTop: 12, fontSize: 17, fontWeight: '700', color: GC.ink, textAlign: 'center' },
  retry: { marginTop: 16 },
  feedback: { bottom: 90 },
});
