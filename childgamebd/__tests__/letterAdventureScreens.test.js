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
  getGameProgress: jest.fn(() => Promise.resolve({ bn01: 3 })),
  saveLevelStars: jest.fn(() => Promise.resolve()),
}));

const { saveLevelStars } = require('../src/db/gameProgress');
const { LETTERS, wordHasLetter } = require('../src/data/game01_letterAdventure');
const LessonScreen = require('../src/screens/games/letterAdventure/LetterAdventureLessonScreen').default;
const LevelsScreen = require('../src/screens/games/letterAdventure/LetterAdventureLevelsScreen').default;
const StartScreen = require('../src/screens/games/letterAdventure/LetterAdventureStartScreen').default;
const TracePad = require('../src/screens/games/letterAdventure/steps/TracePad').default;

const nav = () => ({ navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() });
const textOf = (root) =>
  root
    .findAll((n) => typeof n.type === 'string' && n.type === 'Text')
    .map((n) => [].concat(n.props.children).filter((c) => typeof c === 'string').join(''))
    .join(' | ');
const pressByLabel = (root, label) => {
  const node = root.find((n) => n.props.accessibilityLabel === label && n.props.onPress);
  act(() => node.props.onPress());
};

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('start screen shows the language choice', () => {
  const navigation = nav();
  let r;
  act(() => {
    r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
  });
  pressByLabel(r.root, 'খেলা শুরু করি');
  expect(textOf(r.root)).toContain('তুমি কোন বিষয়ে খেলতে চাও?');
  pressByLabel(r.root, 'বাংলা');
  expect(navigation.navigate).toHaveBeenCalledWith('LetterAdventureLevels', { lang: 'bn' });
});

it('levels screen unlocks the level after a completed one', async () => {
  const navigation = nav();
  let r;
  await act(async () => {
    r = ReactTestRenderer.create(<LevelsScreen navigation={navigation} route={{ params: { lang: 'bn' } }} />);
  });
  pressByLabel(r.root, 'লেভেল ২ আ');
  expect(navigation.navigate).toHaveBeenCalledWith('LetterAdventureLesson', { lang: 'bn', index: 1 });
  expect(r.root.findAll((n) => n.props.accessibilityLabel === 'লেভেল ৩ ই (বন্ধ)').length).toBeGreaterThan(0);
});

it('plays through a whole lesson and saves stars', () => {
  const navigation = nav();
  const letter = LETTERS.bn[0];
  let r;
  act(() => {
    r = ReactTestRenderer.create(<LessonScreen navigation={navigation} route={{ params: { lang: 'bn', index: 0 } }} />);
  });
  expect(textOf(r.root)).toContain('শোনো');
  pressByLabel(r.root, 'পরবর্তী');

  // Trace: "next" is locked until the letter is traced.
  expect(r.root.findAll((n) => n.props.accessibilityLabel === 'আগে লিখো' && n.props.disabled).length).toBeGreaterThan(0);
  const padArea = r.root.find((n) => typeof n.props.onLayout === 'function');
  act(() => padArea.props.onLayout({ nativeEvent: { layout: { width: 300, height: 320 } } }));
  const pad = r.root.findByType(TracePad);
  act(() => pad.props.onResult('done'));
  pressByLabel(r.root, 'পরবর্তী');

  expect(textOf(r.root)).toContain(letter.words[0].text.slice(1));
  pressByLabel(r.root, 'পরবর্তী');

  // Quiz: one wrong answer, then the right one each time.
  for (let q = 0; q < 3; q++) {
    const options = r.root.findAll((n) => n.props.accessibilityLabel && n.props.onPress && n.props.disabled !== undefined);
    const labels = options.map((o) => o.props.accessibilityLabel).filter((l) => !['পেছনে', 'প্রশ্নটি আবার শোনো'].includes(l));
    const right = labels.find((l) => wordHasLetter(letter, l));
    const wrong = labels.find((l) => !wordHasLetter(letter, l));
    if (q === 0) {
      pressByLabel(r.root, wrong);
    }
    pressByLabel(r.root, right);
    act(() => jest.advanceTimersByTime(1600));
  }

  expect(saveLevelStars).toHaveBeenCalledWith('letter_adventure', 'bn', 'bn01', 2);
  expect(textOf(r.root)).toContain('খুব ভালো!');
  pressByLabel(r.root, 'লেভেল ২ এ যাও');
  expect(navigation.replace).toHaveBeenCalledWith('LetterAdventureLesson', { lang: 'bn', index: 1 });
});

it('trace pad judges coverage and stray drawing', () => {
  const letter = LETTERS.en[0];
  const onResult = jest.fn();
  let r;
  act(() => {
    r = ReactTestRenderer.create(<TracePad letter={letter} size={240} onResult={onResult} onProgress={() => {}} resetKey={0} />);
  });
  const view = r.root.find((n) => n.props.onResponderGrant);
  const cell = 240 / 12;
  const touch = (x, y) => ({
    nativeEvent: { locationX: x, locationY: y, pageX: x, pageY: y, touches: [], changedTouches: [], identifier: 1, timestamp: Date.now() },
    touchHistory: {
      touchBank: [
        {
          touchActive: true,
          startPageX: x,
          startPageY: y,
          startTimeStamp: 0,
          currentPageX: x,
          currentPageY: y,
          currentTimeStamp: 0,
          previousPageX: x,
          previousPageY: y,
          previousTimeStamp: 0,
        },
      ],
      numberActiveTouches: 1,
      indexOfSingleActiveTouch: 0,
      mostRecentTimeStamp: 0,
    },
  });
  const cells = letter.traceGrid.split('').map((c, i) => ({ c, x: ((i % 12) + 0.5) * cell, y: (Math.floor(i / 12) + 0.5) * cell }));

  // Tap every letter cell (each tap is its own stroke).
  act(() => {
    cells.filter((k) => k.c === '1').forEach((k) => {
      view.props.onResponderGrant(touch(k.x, k.y));
      view.props.onResponderRelease(touch(k.x, k.y));
    });
  });
  expect(onResult).toHaveBeenLastCalledWith('done');

  // Scribbling over the whole pad covers the letter too, but is rejected as off-line drawing.
  act(() => r.update(<TracePad letter={letter} size={240} onResult={onResult} onProgress={() => {}} resetKey={1} />));
  act(() => {
    cells.forEach((k) => {
      view.props.onResponderGrant(touch(k.x, k.y));
      view.props.onResponderRelease(touch(k.x, k.y));
    });
  });
  expect(onResult).toHaveBeenLastCalledWith('outside');
});
