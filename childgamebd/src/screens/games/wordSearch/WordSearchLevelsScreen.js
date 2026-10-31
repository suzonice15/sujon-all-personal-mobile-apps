import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, LEVELS, STAGES, TRACKS, isLevelUnlocked } from '../../../data/game04_wordSearch';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const MASCOTS = [require('../../../assets/images/common/magnifier.webp')];

export default function WordSearchLevelsScreen({ navigation, route }) {
  const lang = route.params?.lang === 'en' ? 'en' : 'bn';
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, lang);
  useGameScreen();

  const nextIndex = progress ? LEVELS.findIndex((l) => !progress[l.id]) : -1;

  const sections = progress
    ? STAGES.map((stageTitle, s) => ({
        key: `stage${s}`,
        title: stageTitle,
        levels: LEVELS.slice(s * 4, s * 4 + 4).map((lvl) => {
          const label = `লেভেল ${toBanglaDigits(lvl.index + 1)}`;
          return {
            key: lvl.id,
            title: toBanglaDigits(lvl.index + 1),
            titleScale: 0.36,
            label,
            accessibilityLabel: label,
            stars: progress[lvl.id] || 0,
            unlocked: isLevelUnlocked(lvl.index, progress),
            isNext: lvl.index === nextIndex,
            onPress: () => navigation.navigate('WordSearchPlay', { lang, index: lvl.index }),
          };
        }),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>শব্দ</Text> খোঁজার অভিযান • <Text style={styles.blue}>{TRACKS[lang].title}</Text>
        </Text>
      }
      greeting="গ্রিডের মধ্যে লুকানো শব্দগুলো খুঁজে বের করো!"
      mascots={MASCOTS}
      sections={sections}
      totalStars={totalStars}
      loading={!progress}
      error={error}
      onRetry={reload}
      onHome={() => navigation.navigate('HomeScreen')}
    />
  );
}

const styles = StyleSheet.create({
  red: { color: GC.red },
  blue: { color: GC.blue },
});
