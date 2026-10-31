import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GC, LevelMap, useGameProgress, useGameScreen } from '../../../components/game';
import { GAME_ID, GROUPS, LETTERS, isLevelUnlocked } from '../../../data/game01_letterAdventure';
import { toBanglaDigits } from '../../../utils/banglaNumber';

const GREETING = {
  bn: 'চলো, বাংলা বর্ণ শিখি আর খেলি!',
  en: 'চলো, ইংরেজি বর্ণ শিখি আর খেলি!',
};

export default function LetterAdventureLevelsScreen({ navigation, route }) {
  const lang = route.params?.lang === 'en' ? 'en' : 'bn';
  const letters = LETTERS[lang];
  const { progress, error, reload, totalStars } = useGameProgress(GAME_ID, lang);
  useGameScreen();

  const nextIndex = progress ? letters.findIndex((l) => !progress[l.id]) : -1;

  const sections = progress
    ? GROUPS[lang].map((group) => ({
        key: group.key,
        title: group.title,
        levels: letters
          .filter((l) => l.group === group.key)
          .map((letter) => {
            const label = `লেভেল ${toBanglaDigits(letter.index + 1)}`;
            return {
              key: letter.id,
              title: letter.display,
              titleScale: lang === 'en' ? 0.32 : 0.38,
              label,
              accessibilityLabel: `${label} ${letter.char}`,
              stars: progress[letter.id] || 0,
              unlocked: isLevelUnlocked(letters, letter.index, progress),
              isNext: letter.index === nextIndex,
              onPress: () => navigation.navigate('LetterAdventureLesson', { lang, index: letter.index }),
            };
          }),
      }))
    : [];

  return (
    <LevelMap
      title={
        <Text>
          <Text style={styles.red}>বর্ণ</Text> ও <Text style={styles.teal}>শব্দের</Text> অ্যাডভেঞ্চার
        </Text>
      }
      greeting={GREETING[lang]}
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
  teal: { color: '#138F84' },
});
