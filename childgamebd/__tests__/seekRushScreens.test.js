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
  getGameProgress: jest.fn(() => Promise.resolve({ L1: 2 })),
  saveLevelStars: jest.fn(() => Promise.resolve()),
}));

const { saveLevelStars } = require('../src/db/gameProgress');
const data = require('../src/data/game02_wordSeekRush');
const StartScreen = require('../src/screens/games/seekRush/SeekRushStartScreen').default;
const LevelsScreen = require('../src/screens/games/seekRush/SeekRushLevelsScreen').default;
const SeekRushGame = require('../src/screens/games/seekRush/SeekRushGame').default;

const textOf = (root) =>
  root
    .findAll((n) => n.type === 'Text')
    .map((n) => [].concat(n.props.children).filter((c) => typeof c === 'string' || typeof c === 'number').join(''))
    .join(' | ');
const press = (root, label) => {
  const node = root.find((n) => n.props.accessibilityLabel === label && n.props.onPress);
  act(() => node.props.onPress());
};

// Rounds are random: pin them so the test knows where the targets are.
let rounds;
const realBuild = data.buildLevelRounds;
beforeEach(() => {
  jest.useFakeTimers();
  saveLevelStars.mockClear();
  jest.spyOn(data, 'buildLevelRounds').mockImplementation((track, index) => {
    rounds = realBuild(track, index);
    return rounds;
  });
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const renderGame = (props = {}) => {
  let r;
  const handlers = { onExit: jest.fn(), onRestart: jest.fn(), onNextLevel: jest.fn() };
  act(() => {
    r = ReactTestRenderer.create(<SeekRushGame track="bn" levelIndex={4} {...handlers} {...props} />);
  });
  const grid = r.root.find((n) => typeof n.props.onLayout === 'function');
  act(() => grid.props.onLayout({ nativeEvent: { layout: { width: 340, height: 420 } } }));
  return { r, handlers };
};

const tilePressables = (r, round) =>
  round.tiles.map((t) => r.root.findAll((n) => n.props.accessibilityLabel === t.item.text && n.props.onPress)[0]);

const tapTile = (r, round, tile) => {
  const node = r.root
    .findAll((n) => n.props.onPress && n.props.text === tile.item.text && n.props.state !== 'found')
    .find(Boolean);
  act(() => node.props.onPress());
};

it('start screen opens the chosen subject', () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
  });
  press(r.root, 'খেলা শুরু করি');
  expect(textOf(r.root)).toContain('তুমি কোন বিষয়ে খেলতে চাও?');
  press(r.root, 'গণিত');
  expect(navigation.navigate).toHaveBeenCalledWith('SeekRushLevels', { track: 'math' });
});

it('level map unlocks level 2 after level 1 has stars', async () => {
  const navigation = { navigate: jest.fn() };
  let r;
  await act(async () => {
    r = ReactTestRenderer.create(<LevelsScreen navigation={navigation} route={{ params: { track: 'en' } }} />);
  });
  expect(textOf(r.root)).toContain('একইরকম লেটার খুঁজো');
  press(r.root, 'লেভেল ২');
  expect(navigation.navigate).toHaveBeenCalledWith('SeekRushPlay', { track: 'en', index: 1 });
  expect(r.root.findAll((n) => n.props.accessibilityLabel === 'লেভেল ৩ (বন্ধ)').length).toBeGreaterThan(0);
});

it('a perfect run (find every copy, no mistakes) gives 3 stars and is saved', () => {
  const { r } = renderGame();
  expect(tilePressables(r, rounds[0]).every(Boolean)).toBe(true);
  for (let i = 0; i < data.ROUNDS_PER_LEVEL; i++) {
    rounds[i].tiles.filter((t) => t.isTarget).forEach((t) => tapTile(r, rounds[i], t));
    act(() => jest.advanceTimersByTime(1400));
  }
  expect(saveLevelStars).toHaveBeenCalledWith('seek_rush', 'bn', 'L5', 3);
  expect(textOf(r.root)).toContain('দারুণ হয়েছে!');
});

it('mistakes and timeouts count as wrong rounds; too many fails the level', () => {
  const { r, handlers } = renderGame({ track: 'math', levelIndex: 0 });
  for (let i = 0; i < data.ROUNDS_PER_LEVEL; i++) {
    if (i < 3) {
      // Find it, but only after a wrong tap.
      tapTile(r, rounds[i], rounds[i].tiles.find((t) => !t.isTarget));
      tapTile(r, rounds[i], rounds[i].tiles.find((t) => t.isTarget));
      act(() => jest.advanceTimersByTime(1400));
    } else {
      // Let the 30 s timer run out.
      act(() => jest.advanceTimersByTime(30 * 1000));
      act(() => jest.advanceTimersByTime(2100));
    }
  }
  expect(saveLevelStars).not.toHaveBeenCalled();
  const text = textOf(r.root);
  expect(text).toContain('আরেকবার');
  expect(text).toContain('০ / ১০');
  press(r.root, 'আবার খেলি');
  expect(handlers.onRestart).toHaveBeenCalled();
});

it('pause stops the timer until resumed', () => {
  const { r } = renderGame({ track: 'en', levelIndex: 0 });
  press(r.root, 'খেলা থামাও');
  expect(textOf(r.root)).toContain('খেলা থেমে আছে');
  act(() => jest.advanceTimersByTime(40 * 1000));
  expect(textOf(r.root)).not.toContain('সময় শেষ');
  press(r.root, 'চালিয়ে যাও');
  expect(textOf(r.root)).not.toContain('খেলা থেমে আছে');
  expect(textOf(r.root)).toContain('০০:৩০');
});
