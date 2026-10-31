// Game 5 — ব্লক ফিল (Block Fill): a picture crossword for children.
// বাংলা / English words + riddle voices come from Game 3, number names + voices from Game 2.
// Each play builds a new crossword with buildCrossword().
import { AUDIO, PROMPT_TEXT } from './game05_assets.generated';
import { LEVELS as CLUE_LEVELS } from './game03_guessTheWord';
import { PICTURES } from './game03_assets.generated';
import { AUDIO as NUMBER_AUDIO } from './game02_assets.generated';
import numberContent from './game02_seekRush.json';
import { splitLetters } from './game04_wordSearch';
import { PRAISE, ENCOURAGE } from './game01_letterAdventure';
import { toBanglaDigits } from '../utils/banglaNumber';

export const GAME_ID = 'block_fill';
export const LEVEL_COUNT = 10;
export { PRAISE, ENCOURAGE };

export const PROMPTS = {
  instruction: { text: PROMPT_TEXT.p_instruction, audio: AUDIO.p_instruction },
  wrongWord: { text: PROMPT_TEXT.p_wrong_word, audio: AUDIO.p_wrong_word },
  levelDone: { text: PROMPT_TEXT.p_level_done, audio: AUDIO.p_level_done },
};

export const TRACKS = {
  bn: { key: 'bn', title: 'বাংলা', color: '#E0287D', lang: 'bn', across: 'আড়াআড়ি', down: 'নিচে' },
  math: { key: 'math', title: 'গণিত', color: '#22A05A', lang: 'bn', across: 'আড়াআড়ি', down: 'নিচে' },
  en: { key: 'en', title: 'English', color: '#2F80ED', lang: 'en', across: 'Across', down: 'Down' },
};

// ---------------------------------------------------------------- word pools

// Short clue per Game 3 theme (the picture and the riddle voice do the rest).
const SHORT_CLUE = {
  bn: ['একটি ফল', 'একটি পোষা প্রাণী', 'বনের একটি প্রাণী', 'শরীরের একটি অঙ্গ', 'ঘরের একটি জিনিস', 'একটি সবজি বা খাবার', 'একটি পাখি বা পোকা', 'একটি যানবাহন', 'প্রকৃতির একটি জিনিস', 'একটি পেশা', 'পড়া বা খেলার জিনিস', 'পরার বা কাজের জিনিস'],
  en: ['A fruit', 'A farm animal', 'A wild animal', 'A body part', 'A thing at home', 'A food', 'A bird or a bug', 'A vehicle', 'In nature', 'A job', 'For school or play', 'Something we use'],
};

const wordPool = (track) =>
  CLUE_LEVELS[track].flatMap((level, li) =>
    level.questions
      .filter((q) => !/\s/.test(q.answer.word))
      .map((q) => ({
        id: q.id,
        word: q.answer.word,
        letters: splitLetters(track, q.answer.word),
        clue: SHORT_CLUE[track][li],
        image: q.answer.image,
        clueAudio: q.clueAudio,
        answerAudio: q.answerAudio,
      })),
  );

const NUMBER_PICTURES = { 2: '👁️', 3: '🔺', 4: '🟦', 5: '✋', 8: '🕷️', 10: '✋' };
const FACTS = {
  2: 'আমাদের কয়টি চোখ?',
  3: 'ত্রিভুজের কয়টি বাহু?',
  4: 'বর্গের কয়টি বাহু?',
  5: 'এক হাতে কয়টি আঙুল?',
  6: 'বাংলাদেশে কয়টি ঋতু?',
  7: 'এক সপ্তাহে কত দিন?',
  8: 'মাকড়সার কয়টি পা?',
  10: 'দুই হাতে মোট কয়টি আঙুল?',
  12: 'এক বছরে কত মাস?',
};
const MATH_IMAGES = {
  plus: require('../assets/images/common/math_plus.webp'),
  minus: require('../assets/images/common/math_minus.webp'),
  abacus: require('../assets/images/common/math_abacus.webp'),
  calendar: require('../assets/images/common/calendar.webp'),
};

const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const bn = toBanglaDigits;

// A fresh arithmetic / number-fact clue whose answer is n.
export const mathClue = (n) => {
  const kinds = ['plus', 'next', 'prev'];
  if (n >= 1) {
    kinds.push('minus');
  }
  if (FACTS[n]) {
    kinds.push('fact', 'fact');
  }
  if (n >= 20 && n % 10 === 0) {
    kinds.push('tens', 'tens');
  }
  const kind = kinds[Math.floor(Math.random() * kinds.length)];
  switch (kind) {
    case 'plus': {
      const a = randInt(Math.max(0, n - 10), n);
      return { text: `${bn(a)} + ${bn(n - a)} = ?`, image: MATH_IMAGES.plus };
    }
    case 'minus': {
      const b = randInt(1, 9);
      return { text: `${bn(n + b)} − ${bn(b)} = ?`, image: MATH_IMAGES.minus };
    }
    case 'next':
      return n === 0 ? mathClue(n) : { text: `${bn(n - 1)}-এর পরের সংখ্যা`, image: MATH_IMAGES.abacus };
    case 'prev':
      return { text: `${bn(n + 1)}-এর আগের সংখ্যা`, image: MATH_IMAGES.abacus };
    case 'tens':
      return { text: `${bn(n / 10)}টি দশ = ?`, image: MATH_IMAGES.abacus };
    default:
      return {
        text: FACTS[n],
        image: NUMBER_PICTURES[n] ? PICTURES[NUMBER_PICTURES[n]] : MATH_IMAGES.calendar,
      };
  }
};

const MATH_NUMBERS = [...Array(21).keys(), 30, 40, 50, 60, 70, 80, 90];
const mathPool = () =>
  MATH_NUMBERS.map((n) => ({
    id: `n${n}`,
    word: numberContent.numberWords[n],
    letters: splitLetters('bn', numberContent.numberWords[n]),
    value: n,
    answerAudio: NUMBER_AUDIO[`n${n}`],
  })).filter((w) => w.letters.length >= 2);

export const POOLS = { bn: wordPool('bn'), en: wordPool('en'), math: mathPool() };

// ---------------------------------------------------------------- levels

const level = (index, words, maxLen, maxSize) => ({ id: `L${index + 1}`, index, words, maxLen, maxSize });

export const LEVELS = [
  level(0, 4, 4, 6),
  level(1, 4, 4, 6),
  level(2, 4, 5, 7),
  level(3, 5, 5, 7),
  level(4, 5, 5, 7),
  level(5, 5, 6, 8),
  level(6, 5, 6, 8),
  level(7, 5, 7, 8),
  level(8, 6, 7, 8),
  level(9, 6, 7, 8),
];

// ---------------------------------------------------------------- crossword builder

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const key = (r, c) => `${r},${c}`;

// Greedy: start with one word, then add words that cross the grid (sharing a letter unit),
// keeping the puzzle inside maxSize × maxSize. Returns null if it can't reach `count` words.
const tryBuild = (pool, count, maxSize) => {
  const grid = new Map();
  const placed = [];

  const fits = (letters, r, c, dr, dc) => {
    let crosses = 0;
    if (grid.has(key(r - dr, c - dc)) || grid.has(key(r + dr * letters.length, c + dc * letters.length))) {
      return -1;
    }
    for (let i = 0; i < letters.length; i++) {
      const R = r + dr * i;
      const C = c + dc * i;
      const cell = grid.get(key(R, C));
      if (cell) {
        if (cell.ch !== letters[i] || cell.dir !== (dr ? 'a' : 'd')) {
          return -1;
        }
        crosses += 1;
      } else if (grid.has(key(R + dc, C + dr)) || grid.has(key(R - dc, C - dr))) {
        return -1; // would touch a neighbouring word side by side
      }
    }
    return crosses;
  };

  const bounds = (extra = []) => {
    const pts = [...grid.keys()].map((k) => k.split(',').map(Number)).concat(extra);
    const rows = pts.map((p) => p[0]);
    const cols = pts.map((p) => p[1]);
    return { r0: Math.min(...rows), c0: Math.min(...cols), h: Math.max(...rows) - Math.min(...rows) + 1, w: Math.max(...cols) - Math.min(...cols) + 1 };
  };

  const put = (word, r, c, dr, dc) => {
    word.letters.forEach((ch, i) => {
      const k = key(r + dr * i, c + dc * i);
      grid.set(k, { ch, dir: grid.has(k) ? 'x' : dr ? 'd' : 'a' });
    });
    placed.push({ ...word, r, c, dir: dr ? 'down' : 'across' });
  };

  const words = shuffle(pool);
  const first = words.find((w) => w.letters.length >= 3);
  if (!first) {
    return null;
  }
  put(first, 0, 0, 0, 1);
  for (const word of words) {
    if (placed.length >= count) {
      break;
    }
    if (placed.some((p) => p.id === word.id || p.word === word.word)) {
      continue;
    }
    let best = null;
    grid.forEach((cell, k) => {
      if (cell.dir === 'x') {
        return;
      }
      const [r, c] = k.split(',').map(Number);
      const dr = cell.dir === 'a' ? 1 : 0;
      const dc = 1 - dr;
      word.letters.forEach((ch, i) => {
        if (ch !== cell.ch) {
          return;
        }
        const r0 = r - dr * i;
        const c0 = c - dc * i;
        const crosses = fits(word.letters, r0, c0, dr, dc);
        if (crosses < 1) {
          return;
        }
        const b = bounds([[r0, c0], [r0 + dr * (word.letters.length - 1), c0 + dc * (word.letters.length - 1)]]);
        if (b.h > maxSize || b.w > maxSize) {
          return;
        }
        const score = crosses * 10 - b.h * b.w;
        if (!best || score > best.score) {
          best = { r0, c0, dr, dc, score };
        }
      });
    });
    if (best) {
      put(word, best.r0, best.c0, best.dr, best.dc);
    }
  }
  if (placed.length < count) {
    return null;
  }
  const { r0, c0, h, w } = bounds();
  return { rows: h, cols: w, words: placed.map((p) => ({ ...p, r: p.r - r0, c: p.c - c0 })) };
};

// Cell list for a placed word.
export const wordCells = (w) =>
  w.letters.map((_, i) => (w.dir === 'across' ? [w.r, w.c + i] : [w.r + i, w.c]));

// Returns { rows, cols, cells: {"r,c": letter}, words: [{ id, num, dir, letters, cells, clue, image, ... }] }
export const buildCrossword = (track, levelIndex) => {
  const lvl = LEVELS[levelIndex];
  const pool = POOLS[track].filter((w) => w.letters.length >= 2 && w.letters.length <= lvl.maxLen);
  for (let attempt = 0; attempt < 200; attempt++) {
    const built = tryBuild(pool, lvl.words, lvl.maxSize);
    if (!built) {
      continue;
    }
    const cells = {};
    built.words.forEach((w) => wordCells(w).forEach(([r, c], i) => (cells[key(r, c)] = w.letters[i])));
    // Standard crossword numbering: number each starting cell in reading order.
    const starts = [...new Set(built.words.map((w) => key(w.r, w.c)))].sort((a, b) => {
      const [ar, ac] = a.split(',').map(Number);
      const [br, bc] = b.split(',').map(Number);
      return ar - br || ac - bc;
    });
    const words = built.words
      .map((w) => {
        const extra = track === 'math' ? mathClue(w.value) : {};
        return { ...w, ...extra, clue: extra.text || w.clue, num: starts.indexOf(key(w.r, w.c)) + 1, cells: wordCells(w) };
      })
      .sort((a, b) => (a.dir === b.dir ? a.num - b.num : a.dir === 'across' ? -1 : 1));
    return { track, rows: built.rows, cols: built.cols, cells, words };
  }
  throw new Error(`Could not build a crossword for ${track} level ${levelIndex + 1}`);
};

// Letter tiles for the active word: its missing letters + a few look-alike-free decoys, shuffled.
export const tilesFor = (puzzle, word, filled) => {
  const missing = word.cells.filter(([r, c]) => !filled[key(r, c)]).map(([r, c]) => puzzle.cells[key(r, c)]);
  const all = [...new Set(POOLS[puzzle.track].flatMap((w) => w.letters))].filter((l) => !missing.includes(l));
  const decoys = shuffle(all).slice(0, Math.max(3, 6 - missing.length));
  return shuffle([...missing, ...decoys]).map((letter, i) => ({ id: `${word.id}_${i}_${letter}`, letter }));
};

export const starsFor = (mistakes, hints) => {
  if (mistakes === 0 && hints === 0) {
    return 3;
  }
  return mistakes + hints <= 3 ? 2 : 1;
};

export const isLevelUnlocked = (index, progress) => index === 0 || (progress[LEVELS[index - 1].id] || 0) > 0;
export { key as cellKey };
