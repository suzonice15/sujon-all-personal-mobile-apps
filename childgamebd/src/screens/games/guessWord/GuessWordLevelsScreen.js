import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, LEVELS, STAGES, TRACKS, isLevelUnlocked } from '../../../data/game03_guessTheWord';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const MASCOTS = [
  require('../../../assets/images/common/light_bulb.webp'),
  require('../../../assets/images/common/magnifier.webp'),
];

export default function GuessWordLevelsScreen({ navigation, route }) {
  const track = TRACKS[route.params?.track] ? route.params.track : 'bn';
  const levels = LEVELS[track];
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, track);
  useGameScreen();

  const nextIndex = progress ? levels.findIndex((l) => !progress[l.id]) : -1;

  const sections = progress
    ? STAGES.map((stageTitle, s) => ({
        key: `stage${s}`,
        title: stageTitle,
        levels: levels.slice(s * 4, s * 4 + 4).map((lvl) => ({
          key: lvl.id,
          title: toBanglaDigits(lvl.index + 1),
          titleScale: 0.34,
          label: lvl.theme,
          accessibilityLabel: `লেভেল ${toBanglaDigits(lvl.index + 1)} ${lvl.theme}`,
          stars: progress[lvl.id] || 0,
          unlocked: isLevelUnlocked(track, lvl.index, progress),
          isNext: lvl.index === nextIndex,
          onPress: () => navigation.navigate('GuessWordPlay', { track, index: lvl.index }),
        })),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>শব্দ</Text> খোঁজার অভিযান • <Text style={{ color: TRACKS[track].color }}>{TRACKS[track].title}</Text>
        </Text>
      }
      greeting="ইশারা পড়ে সঠিক শব্দটি খুঁজে বের করো!"
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
