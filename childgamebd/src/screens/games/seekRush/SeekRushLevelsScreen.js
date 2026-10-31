import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, LEVELS, TRACKS, isLevelUnlocked } from '../../../data/game02_wordSeekRush';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const MASCOTS = [require('../../../assets/images/common/magnifier.webp')];

export default function SeekRushLevelsScreen({ navigation, route }) {
  const track = TRACKS[route.params?.track] ? route.params.track : 'bn';
  const info = TRACKS[track];
  const levels = LEVELS[track];
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, track);
  useGameScreen();

  const nextIndex = progress ? levels.findIndex((l) => !progress[l.id]) : -1;
  const [first, ...rest] = info.mapTitle.split(' ');

  const sections = progress
    ? info.stages.map((stageTitle, s) => ({
        key: `stage${s}`,
        title: stageTitle,
        levels: levels.slice(s * 4, s * 4 + 4).map((lvl) => {
          const label = `লেভেল ${toBanglaDigits(lvl.index + 1)}`;
          return {
            key: lvl.id,
            title: toBanglaDigits(lvl.index + 1),
            titleScale: 0.36,
            label,
            accessibilityLabel: label,
            stars: progress[lvl.id] || 0,
            unlocked: isLevelUnlocked(track, lvl.index, progress),
            isNext: lvl.index === nextIndex,
            onPress: () => navigation.navigate('SeekRushPlay', { track, index: lvl.index }),
          };
        }),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>{first}</Text> {rest.join(' ')}
        </Text>
      }
      greeting={info.greeting}
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
