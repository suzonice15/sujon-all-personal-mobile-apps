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
  return {
    useFocusEffect: cb => ReactLib.useEffect(() => cb(), [cb]),
    useNavigation: () => ({}),
  };
});
jest.mock('../src/db/gameProgress', () => ({
  getGameProgress: jest.fn(() => Promise.resolve({ L1: 3 })),
  saveLevelStars: jest.fn(() => Promise.resolve()),
}));

const { saveLevelStars } = require('../src/db/gameProgress');
const data = require('../src/data/game05_blockFill');
const BlockFillGame =
  require('../src/screens/games/blockFill/BlockFillGame').default;
const StartScreen =
  require('../src/screens/games/blockFill/BlockFillStartScreen').default;
const LevelsScreen =
  require('../src/screens/games/blockFill/BlockFillLevelsScreen').default;

const textOf = root =>
  root
    .findAll(n => n.type === 'Text')
    .map(n =>
      []
        .concat(n.props.children)
        .filter(c => typeof c === 'string')
        .join(''),
    )
    .join(' | ');
const pressAll = (root, label) =>
  root.findAll(
    n =>
      n.props.accessibilityLabel === label &&
      typeof n.props.onPress === 'function',
  );
const press = (root, label) => {
  const [node] = pressAll(root, label);
  act(() => node.props.onPress());
};

let puzzle;
const realBuild = data.buildCrossword;
beforeEach(() => {
  jest.useFakeTimers();
  saveLevelStars.mockClear();
  jest.spyOn(data, 'buildCrossword').mockImplementation((track, index) => {
    puzzle = realBuild(track, index);
    return puzzle;
  });
});
afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

const renderGame = (track, levelIndex) => {
  const handlers = {
    onExit: jest.fn(),
    onRestart: jest.fn(),
    onNextLevel: jest.fn(),
  };
  let r;
  act(() => {
    r = ReactTestRenderer.create(
      <BlockFillGame track={track} levelIndex={levelIndex} {...handlers} />,
    );
  });
  const card = r.root.find(n => typeof n.props.onLayout === 'function');
  act(() =>
    card.props.onLayout({
      nativeEvent: { layout: { width: 340, height: 340 } },
    }),
  );
  return { r, handlers };
};

// Types the remaining letters of the active word by tapping tiles.
const typeWord = (r, word, solvedCells) => {
  word.cells.forEach(([row, col], i) => {
    if (solvedCells.has(data.cellKey(row, col))) {
      return;
    }
    press(r.root, `অক্ষর ${word.letters[i]}`);
  });
  act(() => jest.advanceTimersByTime(700));
};

it('start screen opens the chosen subject', () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
  });
  press(r.root, 'খেলা শুরু করি');
  press(r.root, 'গণিত');
  expect(navigation.navigate).toHaveBeenCalledWith('BlockFillLevels', {
    track: 'math',
  });
});

it('level map unlocks level 2', async () => {
  const navigation = { navigate: jest.fn() };
  let r;
  await act(async () => {
    r = ReactTestRenderer.create(
      <LevelsScreen
        navigation={navigation}
        route={{ params: { track: 'bn' } }}
      />,
    );
  });
  press(r.root, 'লেভেল ২');
  expect(navigation.navigate).toHaveBeenCalledWith('BlockFillPlay', {
    track: 'bn',
    index: 1,
  });
});

['bn', 'math', 'en'].forEach(track => {
  it(`solves a whole ${track} crossword, word by word`, () => {
    const { r } = renderGame(track, 3);
    const solved = new Set();
    puzzle.words.forEach(w => {
      // Select the word through its clue chip.
      const chip = r.root.find(
        n =>
          n.props.accessibilityLabel ===
            `${w.num} ${w.dir === 'across' ? 'আড়াআড়ি' : 'নিচে'}` &&
          typeof n.props.onPress === 'function',
      );
      act(() => chip.props.onPress());
      expect(textOf(r.root)).toContain(w.clue);
      typeWord(r, w, solved);
      w.cells.forEach(([row, col]) => solved.add(data.cellKey(row, col)));
    });
    act(() => jest.advanceTimersByTime(1300));
    expect(saveLevelStars).toHaveBeenCalledWith('block_fill', track, 'L4', 3);
    expect(textOf(r.root)).toContain('দারুণ হয়েছে!');
  });
});

it('a wrong word is cleared and costs a star; erase and hint work', () => {
  const { r } = renderGame('bn', 0);
  const first = puzzle.words[0];
  // Fill with a wrong letter first (any tile that is not the needed one).
  const shown = r.root
    .findAll(
      n =>
        typeof n.props.onPress === 'function' &&
        /^অক্ষর /.test(n.props.accessibilityLabel || ''),
    )
    .map(n => n.props.accessibilityLabel.replace('অক্ষর ', ''));
  const wrongLetter = shown.find(l => l !== first.letters[0]);
  const wrongTile = pressAll(r.root, `অক্ষর ${wrongLetter}`)[0];
  act(() => wrongTile.props.onPress());
  press(r.root, 'মুছে ফেলো'); // erase it again
  act(() => pressAll(r.root, `অক্ষর ${wrongLetter}`)[0].props.onPress());
  first.letters.slice(1).forEach(l => press(r.root, `অক্ষর ${l}`));
  act(() => jest.advanceTimersByTime(800)); // wrong word flashes and clears
  // A hint fills the cleared first letter; then solve the rest.
  press(r.root, 'হিন্ট');
  const solved = new Set();
  puzzle.words.forEach((w, i) => {
    const chip = r.root.find(
      n =>
        n.props.accessibilityLabel ===
          `${w.num} ${w.dir === 'across' ? 'আড়াআড়ি' : 'নিচে'}` &&
        typeof n.props.onPress === 'function',
    );
    act(() => chip.props.onPress());
    if (i === 0) {
      // Only the wrong letter was cleared, so the hint's letter completes this word.
      expect(
        r.root.findAll(n => n.props.accessibilityLabel === `${w.num} আড়াআড়ি`)
          .length +
          r.root.findAll(n => n.props.accessibilityLabel === `${w.num} নিচে`)
            .length,
      ).toBeGreaterThan(0);
      act(() => jest.advanceTimersByTime(700));
    } else {
      typeWord(r, w, solved);
    }
    w.cells.forEach(([row, col]) => solved.add(data.cellKey(row, col)));
  });
  act(() => jest.advanceTimersByTime(1300));
  expect(saveLevelStars).toHaveBeenCalledWith('block_fill', 'bn', 'L1', 2);
});

it('a word filled entirely by crossing words is solved automatically', () => {
  const word = (id, num, dir, letters, r, c) => ({
    id,
    num,
    dir,
    letters,
    r,
    c,
    word: letters.join(''),
    clue: `ইশারা ${num}`,
    cells: letters.map((_, i) => (dir === 'across' ? [r, c + i] : [r + i, c])),
  });
  const words = [
    word('a1', 1, 'across', ['শি', 'ক্ষ', 'ক'], 0, 0),
    word('a3', 3, 'across', ['ম', 'রি', 'চ'], 1, 2),
    word('a4', 4, 'across', ['ক', 'লা'], 2, 1),
    word('d2', 2, 'down', ['ক', 'ম', 'লা'], 0, 2),
  ];
  const cells = {};
  words.forEach((w) => w.cells.forEach(([r, c], i) => (cells[data.cellKey(r, c)] = w.letters[i])));
  data.buildCrossword.mockImplementation(() => ({ track: 'bn', rows: 3, cols: 5, cells, words }));

  const { r } = renderGame('bn', 0);
  words.slice(0, 3).forEach((w) => {
    const chip = r.root.find((n) => n.props.accessibilityLabel === `${w.num} আড়াআড়ি` && typeof n.props.onPress === 'function');
    act(() => chip.props.onPress());
    w.letters.forEach((l, i) => {
      const [row, col] = w.cells[i];
      const owners = words.filter((o) => o !== w && o.cells.some(([rr, cc]) => rr === row && cc === col));
      if (!owners.some((o) => words.indexOf(o) < words.indexOf(w))) {
        press(r.root, `অক্ষর ${l}`);
      }
    });
    act(() => jest.advanceTimersByTime(700));
  });
  act(() => jest.advanceTimersByTime(1300));
  expect(saveLevelStars).toHaveBeenCalledWith('block_fill', 'bn', 'L1', 3);
});
