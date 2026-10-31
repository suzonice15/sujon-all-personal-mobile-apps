import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, GameBackground, GameButton, useGameScreen } from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { LEVELS, TRACKS } from '../../../data/game06_subjectQuiz';
import SubjectQuizGame from './SubjectQuizGame';

export default function SubjectQuizPlayScreen({ navigation, route }) {
  const track = TRACKS[route.params?.track] ? route.params.track : 'bn';
  const levelIndex = Number(route.params?.index) || 0;
  const [attempt, setAttempt] = useState(0);
  useGameScreen();

  const backToLevels = () => navigation.navigate('SubjectQuizLevels', { track });

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
      <SubjectQuizGame
        key={`${track}_${levelIndex}_${attempt}`}
        track={track}
        levelIndex={levelIndex}
        onExit={backToLevels}
        onRestart={() => setAttempt((a) => a + 1)}
        onNextLevel={() => navigation.replace('SubjectQuizPlay', { track, index: levelIndex + 1 })}
      />
      <AdBanner />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 18, fontWeight: '800', color: GC.ink, marginBottom: 16, textAlign: 'center' },
});
