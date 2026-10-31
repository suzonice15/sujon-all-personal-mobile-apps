import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';

jest.mock('react-native-sound-player', () => ({
  playAsset: jest.fn(() => Promise.resolve()),
  playSoundFile: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(() => ({ remove: jest.fn() })),
}));
jest.mock('react-native-vector-icons/MaterialIcons', () => 'MaterialIcons');
jest.mock('../src/components/ads/AdBanner', () => () => null);
jest.mock('../src/components/ads/AdNative', () => () => null);
jest.mock('react-native-safe-area-context', () => {
  const { View } = require('react-native');
  return { SafeAreaView: View };
});
jest.mock('@react-navigation/native', () => {
  const ReactLib = require('react');
  return { useFocusEffect: (cb) => ReactLib.useEffect(() => cb(), [cb]), useNavigation: () => ({}) };
});
jest.mock('../src/db/gameProgress', () => ({
  getGameProgress: jest.fn(() => Promise.resolve({ L1: 3 })),
  saveLevelStars: jest.fn(() => Promise.resolve()),
}));

const { saveLevelStars } = require('../src/db/gameProgress');
const data = require('../src/data/game03_guessTheWord');
const GuessWordGame = require('../src/screens/games/guessWord/GuessWordGame').default;
const StartScreen = require('../src/screens/games/guessWord/GuessWordStartScreen').default;
const LevelsScreen = require('../src/screens/games/guessWord/GuessWordLevelsScreen').default;

const textOf = (root) =>
  root
    .findAll((n) => n.type === 'Text')
    .map((n) => [].concat(n.props.children).filter((c) => typeof c === 'string').join(''))
    .join(' | ');
const press = (root, label) => {
  const node = root.find((n) => n.props.accessibilityLabel === label && n.props.onPress);
  act(() => node.props.onPress());
};

describe('Game 3 data', () => {
  it('has 3 subjects × 12 levels × 10 questions with all assets', () => {
    Object.keys(data.TRACKS).forEach((track) => {
      expect(data.LEVELS[track]).toHaveLength(12);
      data.LEVELS[track].forEach((level) => {
        expect(level.questions).toHaveLength(data.QUESTIONS_PER_LEVEL);
        expect(level.theme).toBeTruthy();
        level.questions.forEach((q) => {
          expect(q.clue).toBeTruthy();
          expect(q.clueAudio).toBeDefined();
          expect(q.answerAudio).toBeDefined();
          expect(q.answer.image).toBeDefined();
          expect(q.decoyPool.length).toBeGreaterThanOrEqual(3);
          q.decoyPool.forEach((d) => {
            expect(d.image).toBeDefined();
            expect(d.word).not.toBe(q.answer.word);
          });
          if (track === 'gk') {
            expect(q.explanation).toBeTruthy();
          }
        });
      });
    });
  });

  it('every built question has 4 distinct options including the answer', () => {
    Object.keys(data.TRACKS).forEach((track) => {
      data.LEVELS[track].forEach((level) => {
        for (let n = 0; n < 5; n++) {
          data.buildLevelQuestions(track, level.index).forEach((q) => {
            expect(q.options).toHaveLength(4);
            expect(new Set(q.options.map((o) => o.word)).size).toBe(4);
            expect(new Set(q.options.map((o) => o.image)).size).toBe(4);
            expect(q.options.filter((o) => o.word === q.answer.word)).toHaveLength(1);
          });
        }
      });
    });
  });

  it('scores and unlocks', () => {
    expect(data.starsForCorrect(10)).toBe(3);
    expect(data.starsForCorrect(7)).toBe(2);
    expect(data.starsForCorrect(5)).toBe(1);
    expect(data.starsForCorrect(4)).toBe(0);
    expect(data.isLevelUnlocked('gk', 1, { L1: 1 })).toBe(true);
    expect(data.isLevelUnlocked('gk', 2, { L1: 1 })).toBe(false);
  });
});

describe('Game 3 screens', () => {
  let questions;
  const realBuild = data.buildLevelQuestions;
  beforeEach(() => {
    jest.useFakeTimers();
    saveLevelStars.mockClear();
    jest.spyOn(data, 'buildLevelQuestions').mockImplementation((track, index) => {
      questions = realBuild(track, index);
      return questions;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('start screen opens the chosen subject', () => {
    const navigation = { navigate: jest.fn(), goBack: jest.fn() };
    let r;
    act(() => {
      r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
    });
    press(r.root, 'খেলা শুরু');
    expect(textOf(r.root)).toContain('তুমি কোন বিষয়ে খেলতে চাও?');
    press(r.root, 'সাধারণ জ্ঞান');
    expect(navigation.navigate).toHaveBeenCalledWith('GuessWordLevels', { track: 'gk' });
  });

  it('level map shows themes and unlocks level 2', async () => {
    const navigation = { navigate: jest.fn() };
    let r;
    await act(async () => {
      r = ReactTestRenderer.create(<LevelsScreen navigation={navigation} route={{ params: { track: 'gk' } }} />);
    });
    expect(textOf(r.root)).toContain('আমার বাংলাদেশ');
    press(r.root, 'লেভেল ২ প্রাণীর জগৎ');
    expect(navigation.navigate).toHaveBeenCalledWith('GuessWordPlay', { track: 'gk', index: 1 });
  });

  it('plays a level: wrong taps cost the first-try point, answer panel explains, stars are saved', () => {
    const handlers = { onExit: jest.fn(), onRestart: jest.fn(), onNextLevel: jest.fn() };
    let r;
    act(() => {
      r = ReactTestRenderer.create(<GuessWordGame track="gk" levelIndex={0} {...handlers} />);
    });
    const card = r.root.find((n) => typeof n.props.onLayout === 'function');
    act(() => card.props.onLayout({ nativeEvent: { layout: { width: 340, height: 420 } } }));

    for (let i = 0; i < data.QUESTIONS_PER_LEVEL; i++) {
      const q = questions[i];
      expect(textOf(r.root)).toContain(q.clue);
      if (i < 2) {
        press(r.root, q.options.find((o) => o.word !== q.answer.word).word);
      }
      press(r.root, q.answer.word);
      act(() => jest.advanceTimersByTime(1000));
      expect(textOf(r.root)).toContain(q.explanation);
      press(r.root, i === data.QUESTIONS_PER_LEVEL - 1 ? 'ফলাফল দেখো' : 'পরের প্রশ্ন');
    }

    expect(saveLevelStars).toHaveBeenCalledWith('guess_word', 'gk', 'L1', 2);
    const text = textOf(r.root);
    expect(text).toContain('দারুণ হয়েছে!');
    expect(text).toContain('৮ / ১০');
    press(r.root, 'পরের লেভেল');
    expect(handlers.onNextLevel).toHaveBeenCalled();
  });
});
