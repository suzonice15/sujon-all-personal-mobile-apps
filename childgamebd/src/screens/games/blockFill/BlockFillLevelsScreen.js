import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, LEVELS, TRACKS, isLevelUnlocked } from '../../../data/game05_blockFill';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const MASCOTS = [require('../../../assets/images/common/pencil.webp')];
const SECTIONS = [
  { title: 'শুরু করি', from: 0, to: 5 },
  { title: 'বড় চ্যালেঞ্জ', from: 5, to: 10 },
];

export default function BlockFillLevelsScreen({ navigation, route }) {
  const track = TRACKS[route.params?.track] ? route.params.track : 'bn';
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, track);
  useGameScreen();

  const nextIndex = progress ? LEVELS.findIndex((l) => !progress[l.id]) : -1;

  const sections = progress
    ? SECTIONS.map((section) => ({
        key: section.title,
        title: section.title,
        levels: LEVELS.slice(section.from, section.to).map((lvl) => {
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
            onPress: () => navigation.navigate('BlockFillPlay', { track, index: lvl.index }),
          };
        }),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>ব্লক</Text> <Text style={styles.blue}>ফিল</Text> • {TRACKS[track].title}
        </Text>
      }
      greeting="ছবি দেখে শব্দ বসিয়ে ঘর পূরণ করো!"
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
