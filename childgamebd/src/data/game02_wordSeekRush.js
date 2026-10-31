// Game 2 — বর্ণ ও সংখ্যা খোঁজার অভিযান (Word Seek Rush)
// Hear a letter / number / word and find it in a grid before the timer runs out.
// Letters and words reuse Game 1's voice clips and pictures; numbers come from game02 assets.
import content from './game02_seekRush.json';
import { AUDIO } from './game02_assets.generated';
import { ENCOURAGE, LETTERS, PRAISE } from './game01_letterAdventure';
import { formatClock, toBanglaDigits } from '../utils/banglaNumber';

export const GAME_ID = 'seek_rush';
export const ROUNDS_PER_LEVEL = 10;
export const PASS_CORRECT = 5; // rounds needed to clear a level (and unlock the next one)
export { PRAISE, ENCOURAGE };

export const TRACKS = {
  bn: {
    key: 'bn',
    title: 'বাংলা',
    mapTitle: 'বর্ণ খোঁজার অভিযান',
    greeting: 'চলো, নির্দিষ্ট বর্ণটি খুঁজে বের করি!',
    unit: 'বর্ণ',
    stages: ['একটি বর্ণ খুঁজো', 'একইরকম বর্ণ খুঁজো', 'শব্দ খুঁজো'],
  },
  math: {
    key: 'math',
    title: 'গণিত',
    mapTitle: 'সংখ্যা খোঁজার অভিযান',
    greeting: 'চলো, নির্দিষ্ট সংখ্যাটি খুঁজে বের করি!',
    unit: 'সংখ্যা',
    stages: ['একটি সংখ্যা খুঁজো', 'একইরকম সংখ্যা খুঁজো', 'সংখ্যার নাম খুঁজো'],
  },
  en: {
    key: 'en',
    title: 'ইংরেজি',
    mapTitle: 'লেটার খোঁজার অভিযান',
    greeting: 'চলো, নির্দিষ্ট লেটারটি খুঁজে বের করি!',
    unit: 'লেটার',
    stages: ['একটি লেটার খুঁজো', 'একইরকম লেটার খুঁজো', 'ইংরেজি শব্দ খুঁজো'],
  },
};

const P = content.prompts;
export const RESULT_TEXT = { great: P.resultGreat, tryAgain: P.resultTryAgain, timeUp: P.timeUp };
export const RESULT_AUDIO = { great: AUDIO.p_result_great, tryAgain: AUDIO.p_result_try_again };
export const TIME_UP_AUDIO = AUDIO.p_time_up;

const PROMPTS = {
  letter: { one: [P.findOneLetter, AUDIO.p_find_one_letter], same: [P.findAllLetter, AUDIO.p_find_all_letter], word: [P.findWord, AUDIO.p_find_word] },
  math: { one: [P.findOneNumber, AUDIO.p_find_one_number], same: [P.findAllNumber, AUDIO.p_find_all_number], word: [P.findNumberWord, AUDIO.p_find_number_word] },
};

export const promptFor = (track, stage) => {
  const [text, audio] = PROMPTS[track === 'math' ? 'math' : 'letter'][stage];
  return { text, audio };
};

// ---------------------------------------------------------------- items (things you can find)

const letterItem = (l, text = l.char) => ({ key: `${l.id}${text === l.char ? '' : '_lc'}`, text, audio: l.audio });
const numberItem = (n) => ({ key: `n${n}`, text: toBanglaDigits(n), audio: AUDIO[`n${n}`], value: n });
const numberWordItem = (n) => ({ key: `w${n}`, text: content.numberWords[n], audio: AUDIO[`n${n}`], hint: toBanglaDigits(n) });
const range = (lo, hi) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);

const BN_SKIP = ['ং', 'ঃ', 'ঁ', 'ৎ']; // marks don't work as stand-alone tiles
const BN = LETTERS.bn.filter((l) => !BN_SKIP.includes(l.char)).map((l) => letterItem(l));
const bnChars = (chars) => BN.filter((i) => chars.includes(i.text));
const BN_VOWELS = bnChars([...'অআইঈউঊঋএঐওঔ']);
const BN_K = bnChars([...'কখগঘঙচছজঝঞ']);
const BN_T = bnChars([...'টঠডঢণতথদধন']);
const BN_P = BN.filter((i) => ![...BN_VOWELS, ...BN_K, ...BN_T].includes(i));

const EN_UPPER = LETTERS.en.map((l) => letterItem(l));
const EN_LOWER = LETTERS.en.map((l) => letterItem(l, l.char.toLowerCase()));
const DIGITS = range(0, 9).map(numberItem);

const wordsOf = (lang, minLen, maxLen) => {
  const seen = new Set();
  return LETTERS[lang]
    .flatMap((l) => l.words)
    .filter((w) => {
      const len = [...w.text].length;
      if (len < minLen || len > maxLen || seen.has(w.text)) {
        return false;
      }
      seen.add(w.text);
      return true;
    })
    .map((w) => ({ key: w.id, text: w.text, audio: w.audio, image: w.image }));
};

// ---------------------------------------------------------------- look-alikes

const groupMap = (groups) => {
  const map = {};
  groups.forEach((g) => g.forEach((c) => (map[c] = [...new Set([...(map[c] || []), ...g.filter((x) => x !== c)])])));
  return map;
};

const SIMILAR = groupMap([
  [...'বরক'], [...'ডড়ঢঢ়'], [...'যয়ষ'], [...'পগণ'], [...'তভঙ'], [...'ঘথখ'], [...'মস'], [...'নল'], [...'ইঈ'],
  [...'উঊড'], [...'এঐ'], [...'ওঔ'], [...'জঝ'], [...'ধদঋ'], [...'শষ'], [...'চছ'], [...'টঠ'], [...'অআ'],
  [...'BDPR'], [...'EF'], [...'OQCG'], [...'MNW'], [...'UV'], [...'ILTJ'], [...'KXY'], [...'SZ'], [...'AH'],
  [...'bdpq'], [...'mnhu'], [...'iljt'], [...'vwy'], [...'ceoa'], [...'gq'], [...'rn'], [...'kx'], [...'sz'],
  [...'১৯'], [...'৪৮'], [...'৩৬'], [...'২৫৭'],
]);

export const lookAlikeTexts = (item) => {
  if (item.value === undefined || item.value < 10) {
    return SIMILAR[item.text] || [];
  }
  // Two-digit numbers: reversed digits and one-digit swaps with similar-looking digits.
  const [a, b] = [...item.text];
  const out = new Set([b + a]);
  (SIMILAR[a] || []).forEach((x) => out.add(x + b));
  (SIMILAR[b] || []).forEach((x) => out.add(a + x));
  out.delete(item.text);
  return [...out];
};

// ---------------------------------------------------------------- levels

const level = (index, stage, time, targets, distractors, extra = {}) => ({
  id: `L${index + 1}`,
  index,
  stage,
  time,
  targets,
  distractors,
  ...extra,
});

const NUM_10_50 = range(10, 50).map(numberItem);
const NUM_10_99 = range(10, 99).map(numberItem);

export const LEVELS = {
  bn: [
    level(0, 'one', 30, BN_VOWELS, BN),
    level(1, 'one', 30, BN_K, BN),
    level(2, 'one', 25, BN_T, BN, { lookAlikes: 3 }),
    level(3, 'one', 25, BN_P, BN, { lookAlikes: 4 }),
    level(4, 'same', 35, BN_VOWELS, BN, { copies: 3, lookAlikes: 4 }),
    level(5, 'same', 35, BN_K, BN, { copies: 4, lookAlikes: 5 }),
    level(6, 'same', 30, BN_T, BN, { copies: 4, lookAlikes: 6 }),
    level(7, 'same', 30, BN_P, BN, { copies: 5, lookAlikes: 6 }),
    level(8, 'word', 30, wordsOf('bn', 2, 3), wordsOf('bn', 2, 3)),
    level(9, 'word', 30, wordsOf('bn', 4, 4), wordsOf('bn', 3, 5)),
    level(10, 'word', 25, wordsOf('bn', 5, 5), wordsOf('bn', 4, 6), { sameStart: true }),
    level(11, 'word', 25, wordsOf('bn', 6, 20), wordsOf('bn', 4, 20), { sameStart: true }),
  ],
  math: [
    level(0, 'one', 30, range(1, 5).map(numberItem), DIGITS),
    level(1, 'one', 30, [0, 6, 7, 8, 9].map(numberItem), DIGITS, { lookAlikes: 2 }),
    level(2, 'one', 25, NUM_10_50, NUM_10_50, { lookAlikes: 2 }),
    level(3, 'one', 25, NUM_10_99, NUM_10_99, { lookAlikes: 3 }),
    level(4, 'same', 35, range(1, 5).map(numberItem), DIGITS, { copies: 3, lookAlikes: 4 }),
    level(5, 'same', 35, [0, 6, 7, 8, 9].map(numberItem), DIGITS, { copies: 4, lookAlikes: 5 }),
    level(6, 'same', 30, NUM_10_50, NUM_10_50, { copies: 4, lookAlikes: 4 }),
    level(7, 'same', 30, NUM_10_99, NUM_10_99, { copies: 5, lookAlikes: 6 }),
    level(8, 'word', 30, range(0, 10).map(numberWordItem), range(0, 12).map(numberWordItem)),
    level(9, 'word', 30, range(11, 20).map(numberWordItem), range(8, 25).map(numberWordItem)),
    level(10, 'word', 25, range(21, 50).map(numberWordItem), range(21, 50).map(numberWordItem), { sameStart: true }),
    level(11, 'word', 25, range(51, 99).map(numberWordItem), range(51, 99).map(numberWordItem), { sameStart: true }),
  ],
  en: [
    level(0, 'one', 30, EN_UPPER.slice(0, 6), EN_UPPER),
    level(1, 'one', 30, EN_UPPER.slice(6, 12), EN_UPPER),
    level(2, 'one', 25, EN_UPPER.slice(12, 18), EN_UPPER, { lookAlikes: 3 }),
    level(3, 'one', 25, EN_UPPER.slice(18), EN_UPPER, { lookAlikes: 4 }),
    level(4, 'same', 35, EN_UPPER.slice(0, 13), EN_UPPER, { copies: 3, lookAlikes: 4 }),
    level(5, 'same', 35, EN_UPPER.slice(13), EN_UPPER, { copies: 4, lookAlikes: 5 }),
    level(6, 'same', 30, EN_LOWER.slice(0, 13), EN_LOWER, { copies: 4, lookAlikes: 6 }),
    level(7, 'same', 30, EN_LOWER.slice(13), EN_LOWER, { copies: 5, lookAlikes: 6 }),
    level(8, 'word', 30, wordsOf('en', 3, 3), wordsOf('en', 3, 4)),
    level(9, 'word', 30, wordsOf('en', 4, 4), wordsOf('en', 3, 5)),
    level(10, 'word', 25, wordsOf('en', 5, 5), wordsOf('en', 4, 6), { sameStart: true }),
    level(11, 'word', 25, wordsOf('en', 6, 20), wordsOf('en', 5, 20), { sameStart: true }),
  ],
};

export const GRID = { one: { tiles: 20, columns: 4 }, same: { tiles: 20, columns: 4 }, word: { tiles: 8, columns: 2 } };

// ---------------------------------------------------------------- rounds

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const pick = (list) => list[Math.floor(Math.random() * list.length)];

const buildTiles = (lvl, target) => {
  const { tiles: size } = GRID[lvl.stage];
  const others = lvl.distractors.filter((d) => d.text !== target.text);
  const byText = new Map(others.map((d) => [d.text, d]));
  const tiles = Array.from({ length: lvl.stage === 'same' ? lvl.copies : 1 }, () => target);

  if (lvl.stage === 'word') {
    const first = [...target.text][0];
    const close = lvl.sameStart ? shuffle(others.filter((d) => [...d.text][0] === first)) : [];
    const rest = shuffle(others.filter((d) => !close.includes(d)));
    tiles.push(...[...close, ...rest].slice(0, size - 1));
  } else {
    const similar = lookAlikeTexts(target).map((t) => byText.get(t)).filter(Boolean);
    for (let i = 0; similar.length && i < (lvl.lookAlikes || 0); i++) {
      tiles.push(similar[i % similar.length]);
    }
    while (tiles.length < size) {
      tiles.push(pick(others));
    }
  }
  return shuffle(tiles).map((item, i) => ({ id: `t${i}`, item, isTarget: item.text === target.text }));
};

export const buildLevelRounds = (track, levelIndex) => {
  const lvl = LEVELS[track][levelIndex];
  const targets = [];
  while (targets.length < ROUNDS_PER_LEVEL) {
    const batch = shuffle(lvl.targets).filter((t) => t.text !== targets[targets.length - 1]?.text);
    targets.push(...batch);
  }
  return targets.slice(0, ROUNDS_PER_LEVEL).map((target, i) => {
    const tiles = buildTiles(lvl, target);
    return {
      id: `${track}_${lvl.id}_r${i}`,
      stage: lvl.stage,
      target,
      tiles,
      targetCount: tiles.filter((t) => t.isTarget).length,
    };
  });
};

export const starsForCorrect = (correct) => {
  if (correct >= 9) {
    return 3;
  }
  if (correct >= 7) {
    return 2;
  }
  return correct >= PASS_CORRECT ? 1 : 0;
};

export const isLevelUnlocked = (track, index, progress) =>
  index === 0 || (progress[LEVELS[track][index - 1].id] || 0) > 0;

export const formatTime = formatClock;
