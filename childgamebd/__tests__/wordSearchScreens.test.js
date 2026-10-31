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
const data = require('../src/data/game04_wordSearch');
const WordSearchGame = require('../src/screens/games/wordSearch/WordSearchGame').default;
const StartScreen = require('../src/screens/games/wordSearch/WordSearchStartScreen').default;
const LevelsScreen = require('../src/screens/games/wordSearch/WordSearchLevelsScreen').default;

const GRID_W = 300;
const textOf = (root) =>
  root
    .findAll((n) => n.type === 'Text')
    .map((n) => [].concat(n.props.children).filter((c) => typeof c === 'string').join(''))
    .join(' | ');
const press = (root, label) => {
  const node = root.find((n) => n.props.accessibilityLabel === label && n.props.onPress);
  act(() => node.props.onPress());
};

let clock = 0;
const touch = (x, y) => {
  clock += 16;
  return {
  nativeEvent: { locationX: x, locationY: y, pageX: x, pageY: y, touches: [], changedTouches: [], identifier: 1, timestamp: 0 },
  touchHistory: {
    touchBank: [{ touchActive: true, startPageX: x, startPageY: y, startTimeStamp: 0, currentPageX: x, currentPageY: y, currentTimeStamp: 0, previousPageX: x, previousPageY: y, previousTimeStamp: 0 }],
    numberActiveTouches: 1,
    indexOfSingleActiveTouch: 0,
    mostRecentTimeStamp: clock,
  },
  };
};

let puzzle;
const realBuild = data.buildPuzzle;
beforeEach(() => {
  jest.useFakeTimers();
  saveLevelStars.mockClear();
  jest.spyOn(data, 'buildPuzzle').mockImplementation((lang, index) => {
    puzzle = realBuild(lang, index);
    return puzzle;
  });
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const renderGame = (lang = 'bn', levelIndex = 4) => {
  const handlers = { onExit: jest.fn(), onRestart: jest.fn(), onNextLevel: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<WordSearchGame lang={lang} levelIndex={levelIndex} {...handlers} />);
  });
  const area = r.root.find((n) => typeof n.props.onLayout === 'function');
  act(() => area.props.onLayout({ nativeEvent: { layout: { width: GRID_W + 20, height: GRID_W + 20 } } }));
  const grid = r.root.find(
    (n) => typeof n.props.onResponderGrant === 'function' && typeof n.props.onMoveShouldSetResponder === 'function' && n.props.style?.width === GRID_W,
  );
  const cell = GRID_W / puzzle.size;
  const at = ([row, col]) => [(col + 0.5) * cell, (row + 0.5) * cell];
  const drag = (from, to) =>
    act(() => {
      grid.props.onResponderGrant(touch(...at(from)));
      grid.props.onResponderMove(touch(...at(to)));
      grid.props.onResponderRelease(touch(...at(to)));
    });
  const tap = (pos) =>
    act(() => {
      grid.props.onResponderGrant(touch(...at(pos)));
      grid.props.onResponderRelease(touch(...at(pos)));
    });
  return { r, handlers, drag, tap };
};

it('start screen opens the chosen language', () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
  });
  press(r.root, 'খেলা শুরু করি');
  press(r.root, 'English');
  expect(navigation.navigate).toHaveBeenCalledWith('WordSearchLevels', { lang: 'en' });
});

it('level map unlocks level 2', async () => {
  const navigation = { navigate: jest.fn() };
  let r;
  await act(async () => {
    r = ReactTestRenderer.create(<LevelsScreen navigation={navigation} route={{ params: { lang: 'bn' } }} />);
  });
  press(r.root, 'লেভেল ২');
  expect(navigation.navigate).toHaveBeenCalledWith('WordSearchPlay', { lang: 'bn', index: 1 });
  expect(r.root.findAll((n) => n.props.accessibilityLabel === 'লেভেল ৩ (বন্ধ)').length).toBeGreaterThan(0);
});

it('finding every word by dragging (forwards, backwards, tap-tap) clears the level with 3 stars', () => {
  const { r, drag, tap } = renderGame('bn', 4);
  // A random wrong line does nothing.
  drag([0, 0], [0, 1]);
  puzzle.words.forEach((w, i) => {
    const first = w.cells[0];
    const last = w.cells[w.cells.length - 1];
    if (i === 0) {
      drag(last, first); // backwards
    } else if (i === 1) {
      tap(first);
      tap(last); // tap-tap mode
    } else {
      drag(first, last);
    }
    if (i < puzzle.words.length - 1) {
      expect(r.root.findAll((n) => n.props.accessibilityLabel === `${w.label} (পাওয়া গেছে)`).length).toBeGreaterThan(0);
    }
  });
  expect(saveLevelStars).toHaveBeenCalledWith('word_search', 'bn', 'L5', 3);
  expect(textOf(r.root)).toContain('দারুণ হয়েছে!');
});

it('hints cost a star and running out of time fails the level', () => {
  const { r, drag } = renderGame('en', 0);
  press(r.root, 'হিন্ট');
  puzzle.words.forEach((w) => drag(w.cells[0], w.cells[w.cells.length - 1]));
  expect(saveLevelStars).toHaveBeenCalledWith('word_search', 'en', 'L1', 2);

  const second = renderGame('en', 0);
  act(() => jest.advanceTimersByTime(91 * 1000));
  expect(textOf(second.r.root)).toContain('ভালো চেষ্টা!');
  expect(saveLevelStars).toHaveBeenCalledTimes(1);
});
