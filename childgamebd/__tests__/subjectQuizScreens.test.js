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
const data = require('../src/data/game06_subjectQuiz');
const SubjectQuizGame = require('../src/screens/games/subjectQuiz/SubjectQuizGame').default;
const StartScreen = require('../src/screens/games/subjectQuiz/SubjectQuizStartScreen').default;
const LevelsScreen = require('../src/screens/games/subjectQuiz/SubjectQuizLevelsScreen').default;

const textOf = (root) =>
  root
    .findAll((n) => n.type === 'Text')
    .map((n) => [].concat(n.props.children).filter((c) => typeof c === 'string').join(''))
    .join(' | ');
const press = (root, label) => {
  const node = root.findAll((n) => n.props.accessibilityLabel === label && typeof n.props.onPress === 'function')[0];
  act(() => node.props.onPress());
};

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

const renderGame = (track, levelIndex) => {
  const handlers = { onExit: jest.fn(), onRestart: jest.fn(), onNextLevel: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<SubjectQuizGame track={track} levelIndex={levelIndex} {...handlers} />);
  });
  const grid = r.root.find((n) => typeof n.props.onLayout === 'function');
  act(() => grid.props.onLayout({ nativeEvent: { layout: { width: 320, height: 380 } } }));
  return { r, handlers };
};

const labelOf = (o) => o.label || String(o.count);
const answer = (r, q, right) => {
  const option = right ? q.options.find((o) => o.key === q.answerKey) : q.options.find((o) => o.key !== q.answerKey);
  press(r.root, labelOf(option));
};

it('start screen shows the 5 subjects', () => {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  let r;
  act(() => {
    r = ReactTestRenderer.create(<StartScreen navigation={navigation} />);
  });
  press(r.root, 'খেলা শুরু করি');
  ['বাংলা', 'ইংরেজি', 'গণিত', 'বিজ্ঞান', 'সাধারণ জ্ঞান'].forEach((t) =>
    expect(r.root.findAll((n) => n.props.accessibilityLabel === t).length).toBeGreaterThan(0),
  );
  press(r.root, 'বিজ্ঞান');
  expect(navigation.navigate).toHaveBeenCalledWith('SubjectQuizLevels', { track: 'science' });
});

it('level map shows 15 levels and unlocks level 2', async () => {
  const navigation = { navigate: jest.fn() };
  let r;
  await act(async () => {
    r = ReactTestRenderer.create(<LevelsScreen navigation={navigation} route={{ params: { track: 'math' } }} />);
  });
  expect(r.root.findAll((n) => n.props.accessibilityLabel === 'লেভেল ১৫ (বন্ধ)').length).toBeGreaterThan(0);
  press(r.root, 'লেভেল ২');
  expect(navigation.navigate).toHaveBeenCalledWith('SubjectQuizPlay', { track: 'math', index: 1 });
});

Object.keys(data.TRACKS).forEach((track) => {
  it(`plays a perfect ${track} level and scores ১০০`, () => {
    const levelIndex = track === 'math' ? 0 : 12;
    const { r } = renderGame(track, levelIndex);
    questions.forEach((q, i) => {
      expect(textOf(r.root)).toContain(q.text);
      answer(r, q, true);
      press(r.root, i === questions.length - 1 ? 'ফলাফল' : 'পরের প্রশ্ন');
    });
    expect(saveLevelStars).toHaveBeenCalledWith('subject_quiz', track, `L${levelIndex + 1}`, 3);
    const text = textOf(r.root);
    expect(text).toContain('৫ / ৫');
    expect(text).toContain('১০০');
  });
});

it('wrong answers and timeouts lower the score; previous questions can be reviewed', () => {
  const { r } = renderGame('science', 0);
  answer(r, questions[0], false);
  press(r.root, 'পরের প্রশ্ন');
  act(() => jest.advanceTimersByTime(31 * 1000)); // question 2 times out
  expect(textOf(r.root)).toContain('সময় শেষ');
  press(r.root, 'পূর্বের প্রশ্ন');
  expect(textOf(r.root)).toContain(questions[0].text);
  press(r.root, 'পরের প্রশ্ন');
  press(r.root, 'পরের প্রশ্ন');
  questions.slice(2).forEach((q, i) => {
    answer(r, q, true);
    press(r.root, i === 2 ? 'ফলাফল' : 'পরের প্রশ্ন');
  });
  expect(saveLevelStars).toHaveBeenCalledWith('subject_quiz', 'science', 'L1', 1);
  expect(textOf(r.root)).toContain('৬০');
});
