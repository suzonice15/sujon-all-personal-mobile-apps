import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, GameBackground, GameButton, useGameScreen } from '../../../components/game';
import AdBanner from '../../../components/ads/AdBanner';
import { LEVELS } from '../../../data/game04_wordSearch';
import WordSearchGame from './WordSearchGame';

export default function WordSearchPlayScreen({ navigation, route }) {
  const lang = route.params?.lang === 'en' ? 'en' : 'bn';
  const levelIndex = Number(route.params?.index) || 0;
  const [attempt, setAttempt] = useState(0);
  useGameScreen();

  const backToLevels = () => navigation.navigate('WordSearchLevels', { lang });

  if (!LEVELS[levelIndex]) {
    return (
      <GameBackground style={styles.center}>
        <Text style={styles.errorText}>দুঃখিত! লেভেলটি খুঁজে পাওয়া যায়নি।</Text>
        <GameButton title="সব লেভেল" iconLeft="map" onPress={backToLevels} />
      </GameBackground>
    );
  }

  return (
    <GameBackground>
      <WordSearchGame
        key={`${lang}_${levelIndex}_${attempt}`}
        lang={lang}
        levelIndex={levelIndex}
        onExit={backToLevels}
        onRestart={() => setAttempt((a) => a + 1)}
        onNextLevel={() => navigation.replace('WordSearchPlay', { lang, index: levelIndex + 1 })}
      />
      <AdBanner />
    </GameBackground>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center', padding: 24 },
  errorText: { fontSize: 18, fontWeight: '800', color: GC.ink, marginBottom: 16, textAlign: 'center' },
});
