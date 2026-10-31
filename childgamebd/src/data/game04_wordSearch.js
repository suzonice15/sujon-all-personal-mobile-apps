// Game 4 — Word Search (শব্দ খোঁজার অভিযান)
// Find the pictured words hidden in a letter grid by dragging across them.
// Words, pictures and word voices come from Game 1; prompts from game04_assets.generated.js.
import { AUDIO, PROMPT_TEXT } from './game04_assets.generated';
import { LETTERS, PRAISE } from './game01_letterAdventure';

export const GAME_ID = 'word_search';
export { PRAISE };

export const PROMPTS = {
  chooseLanguage: { text: PROMPT_TEXT.p_choose_language, audio: AUDIO.p_choose_language },
  findWords: { text: PROMPT_TEXT.p_find_words, audio: AUDIO.p_find_words },
  allFound: { text: PROMPT_TEXT.p_all_found, audio: AUDIO.p_all_found },
  timeUp: { text: PROMPT_TEXT.p_time_up, audio: AUDIO.p_time_up },
  notAWord: { text: PROMPT_TEXT.p_not_a_word, audio: AUDIO.p_not_a_word },
};

export const TRACKS = {
  bn: { key: 'bn', title: 'বাংলা', instruction: 'নিচের শব্দগুলো খুঁজে বের করো' },
  en: { key: 'en', title: 'English', instruction: 'Find the words below' },
};

// ---------------------------------------------------------------- Bangla letter units

// One grid cell holds one written letter unit: a consonant cluster (with ্ joins) or an
// independent vowel, plus any vowel sign and ং ঃ ঁ. E.g. "সূর্য" -> ["সূ", "র্য"].
const CONSONANT = '[ক-হৎড়-য়]়?';
const CLUSTER = new RegExp(
  `(?:${CONSONANT}(?:্‍?${CONSONANT})*|[অ-ঔ])[া-ৌৗ]*[ঁ-ঃ]*|.`,
  'gu',
);

export const splitLetters = (lang, text) =>
  lang === 'en' ? [...text.toUpperCase()] : text.replace(/্$/, '').match(CLUSTER) || [];

// ---------------------------------------------------------------- word pool (from Game 1)

const SKIP = {
  // Abstract or hard words that don't suit a picture search.
  bn: ['ঐক্য', 'ঐতিহ্য', 'ঔজ্জ্বল্য', 'ঋণ', 'ঊর্মি', 'ঊষা', 'ঊরু', 'ঔপন্যাসিক', 'দৃঢ়', 'গাঢ়', 'প্রাতঃকাল', 'নিঃশব্দ', 'দুঃখ', 'অংক', 'অরণ্য', 'যন্ত্র'],
  en: ['Quiet', 'Question', 'Yellow', 'Zero', 'Insect'],
};

const buildPool = (lang) => {
  const seenText = new Set();
  const seenPicture = new Set();
  const pool = [];
  LETTERS[lang].forEach((letter) =>
    letter.words.forEach((w) => {
      if (/\s/.test(w.text) || SKIP[lang].includes(w.text) || seenText.has(w.text) || seenPicture.has(w.picture)) {
        return;
      }
      seenText.add(w.text);
      seenPicture.add(w.picture);
      const letters = splitLetters(lang, w.text);
      pool.push({ id: w.id, text: lang === 'en' ? w.text.toUpperCase() : w.text, label: w.text, letters, image: w.image, audio: w.audio });
    }),
  );
  return pool;
};

export const WORD_POOL = { bn: buildPool('bn'), en: buildPool('en') };

// Filler letters: for Bangla, units taken from real words so the grid looks natural.
const FILLERS = {
  bn: [...new Set(WORD_POOL.bn.flatMap((w) => w.letters).filter((l) => l.length <= 2))],
  en: [...'ABCDEFGHIJKLMNOPRSTUVWY'],
};

// ---------------------------------------------------------------- levels

const RIGHT = [0, 1];
const DOWN = [1, 0];
const DIAG_DOWN = [1, 1];
const DIAG_UP = [-1, 1];

const level = (index, size, words, minLen, maxLen, dirs, time) => ({
  id: `L${index + 1}`,
  index,
  size,
  words,
  minLen,
  maxLen,
  dirs,
  time,
});

export const LEVELS = [
  level(0, 6, 3, 2, 3, [RIGHT], 90),
  level(1, 6, 3, 2, 4, [RIGHT, DOWN], 90),
  level(2, 6, 4, 2, 4, [RIGHT, DOWN], 120),
  level(3, 7, 4, 3, 5, [RIGHT, DOWN], 120),
  level(4, 7, 4, 3, 5, [RIGHT, DOWN, DIAG_DOWN], 120),
  level(5, 7, 5, 3, 5, [RIGHT, DOWN, DIAG_DOWN], 150),
  level(6, 8, 5, 3, 6, [RIGHT, DOWN, DIAG_DOWN], 150),
  level(7, 8, 6, 3, 6, [RIGHT, DOWN, DIAG_DOWN], 180),
  level(8, 8, 6, 3, 6, [RIGHT, DOWN, DIAG_DOWN, DIAG_UP], 180),
  level(9, 8, 6, 3, 7, [RIGHT, DOWN, DIAG_DOWN, DIAG_UP], 180),
  level(10, 8, 7, 3, 7, [RIGHT, DOWN, DIAG_DOWN, DIAG_UP], 210),
  level(11, 8, 8, 3, 7, [RIGHT, DOWN, DIAG_DOWN, DIAG_UP], 240),
];

export const STAGES = ['সহজ', 'মাঝারি', 'কঠিন'];

// ---------------------------------------------------------------- puzzle builder

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const tryPlace = (grid, size, word, dirs) => {
  const n = word.letters.length;
  const options = [];
  dirs.forEach(([dr, dc]) => {
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const endR = r + dr * (n - 1);
        const endC = c + dc * (n - 1);
        if (endR < 0 || endR >= size || endC < 0 || endC >= size) {
          continue;
        }
        let overlaps = 0;
        let ok = true;
        for (let i = 0; i < n && ok; i++) {
          const cell = grid[r + dr * i][c + dc * i];
          if (cell === word.letters[i]) {
            overlaps += 1;
          } else if (cell !== null) {
            ok = false;
          }
        }
        if (ok) {
          options.push({ r, c, dr, dc, overlaps });
        }
      }
    }
  });
  if (!options.length) {
    return null;
  }
  // Prefer spots that cross other words a little, then pick at random among them.
  const best = Math.max(...options.map((o) => Math.min(o.overlaps, 1)));
  const pick = shuffle(options.filter((o) => Math.min(o.overlaps, 1) === best))[0];
  const cells = word.letters.map((_, i) => [pick.r + pick.dr * i, pick.c + pick.dc * i]);
  cells.forEach(([r, c], i) => {
    grid[r][c] = word.letters[i];
  });
  return cells;
};

// Returns { lang, size, grid: string[][], words: [{ ...word, cells: [[r,c],...] }] }.
export const buildPuzzle = (lang, levelIndex) => {
  const lvl = LEVELS[levelIndex];
  const candidates = WORD_POOL[lang].filter(
    (w) => w.letters.length >= lvl.minLen && w.letters.length <= Math.min(lvl.maxLen, lvl.size),
  );
  for (let attempt = 0; attempt < 50; attempt++) {
    const grid = Array.from({ length: lvl.size }, () => Array(lvl.size).fill(null));
    // Longest words first: they are the hardest to fit.
    const chosen = shuffle(candidates)
      .slice(0, lvl.words)
      .sort((a, b) => b.letters.length - a.letters.length);
    const placed = [];
    for (const word of chosen) {
      const cells = tryPlace(grid, lvl.size, word, lvl.dirs);
      if (!cells) {
        break;
      }
      placed.push({ ...word, cells });
    }
    if (placed.length === lvl.words) {
      const fill = FILLERS[lang];
      for (let r = 0; r < lvl.size; r++) {
        for (let c = 0; c < lvl.size; c++) {
          if (grid[r][c] === null) {
            grid[r][c] = fill[Math.floor(Math.random() * fill.length)];
          }
        }
      }
      return { lang, size: lvl.size, grid, words: shuffle(placed) };
    }
  }
  throw new Error(`Could not build word search for ${lang} level ${levelIndex + 1}`);
};

// Cells from start to end if they form a straight line (row, column or diagonal), else null.
export const lineCells = ([r1, c1], [r2, c2]) => {
  const dr = Math.sign(r2 - r1);
  const dc = Math.sign(c2 - c1);
  const steps = Math.max(Math.abs(r2 - r1), Math.abs(c2 - c1));
  if ((r1 !== r2 && c1 !== c2 && Math.abs(r2 - r1) !== Math.abs(c2 - c1)) || steps === 0) {
    return steps === 0 ? [[r1, c1]] : null;
  }
  return Array.from({ length: steps + 1 }, (_, i) => [r1 + dr * i, c1 + dc * i]);
};

// The not-yet-found word spelled by the selected cells (forwards or backwards), if any.
export const matchSelection = (puzzle, cells, foundIds) => {
  const spelled = cells.map(([r, c]) => puzzle.grid[r][c]);
  const forward = spelled.join('|');
  const backward = [...spelled].reverse().join('|');
  return puzzle.words.find(
    (w) => !foundIds.includes(w.id) && (w.letters.join('|') === forward || w.letters.join('|') === backward),
  );
};

export const starsFor = ({ allFound, hintsUsed, timeLeft, totalTime }) => {
  if (!allFound) {
    return 0;
  }
  if (hintsUsed === 0 && timeLeft >= totalTime / 3) {
    return 3;
  }
  return hintsUsed <= 1 ? 2 : 1;
};

export const isLevelUnlocked = (index, progress) => index === 0 || (progress[LEVELS[index - 1].id] || 0) > 0;
