import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, GameBackground, GameButton, useGameScreen } from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { LEVELS } from '../../../data/game02_wordSeekRush';
import SeekRushGame from './SeekRushGame';

export default function SeekRushPlayScreen({ navigation, route }) {
  const track = LEVELS[route.params?.track] ? route.params.track : 'bn';
  const levelIndex = Number(route.params?.index) || 0;
  const [attempt, setAttempt] = useState(0);
  useGameScreen();

  const backToLevels = () => navigation.navigate('SeekRushLevels', { track });

  if (!LEVELS[track][levelIndex]) {
    return (
      <GameBackground style={styles.center}>
        <Text style={styles.errorText}>দুঃখিত! লেভেলটি খুঁজে পাওয়া যায়নি।</Text>
        <GameButton title="সব লেভেল" iconLeft="map" onPress={backToLevels} />
      </GameBackground>
    );
  }

  return (
    <GameBackground>
      <SeekRushGame
        key={`${track}_${levelIndex}_${attempt}`}
        track={track}
        levelIndex={levelIndex}
        onExit={backToLevels}
        onRestart={() => setAttempt((a) => a + 1)}
        onNextLevel={() => navigation.replace('SeekRushPlay', { track, index: levelIndex + 1 })}
      />
      <AdBanner />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 18, fontWeight: '800', color: GC.ink, marginBottom: 16, textAlign: 'center' },
});
