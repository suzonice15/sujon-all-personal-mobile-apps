import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, LEVELS, TRACKS, isLevelUnlocked } from '../../../data/game06_subjectQuiz';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const MASCOTS = [require('../../../assets/images/common/light_bulb.webp')];
const SECTIONS = [
  { title: 'শুরু করি', from: 0, to: 5 },
  { title: 'আরও জানি', from: 5, to: 10 },
  { title: 'বড় চ্যালেঞ্জ', from: 10, to: 15 },
];

export default function SubjectQuizLevelsScreen({ navigation, route }) {
  const track = TRACKS[route.params?.track] ? route.params.track : 'bn';
  const levels = LEVELS[track];
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, track);
  useGameScreen();

  const nextIndex = progress ? levels.findIndex((l) => !progress[l.id]) : -1;

  const sections = progress
    ? SECTIONS.map((section) => ({
        key: section.title,
        title: section.title,
        levels: levels.slice(section.from, section.to).map((lvl) => ({
          key: lvl.id,
          title: toBanglaDigits(lvl.index + 1),
          titleScale: 0.36,
          label: lvl.theme,
          accessibilityLabel: `লেভেল ${toBanglaDigits(lvl.index + 1)}`,
          stars: progress[lvl.id] || 0,
          unlocked: isLevelUnlocked(track, lvl.index, progress),
          isNext: lvl.index === nextIndex,
          onPress: () => navigation.navigate('SubjectQuizPlay', { track, index: lvl.index }),
        })),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>বিষয়ভিত্তিক</Text> কুইজ • <Text style={{ color: TRACKS[track].color }}>{TRACKS[track].title}</Text>
        </Text>
      }
      greeting="প্রশ্ন শোনো, ছবি দেখো, আর সঠিক উত্তর বেছে নাও!"
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
});
