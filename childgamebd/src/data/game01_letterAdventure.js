// Game 1 — বর্ণ ও শব্দের অ্যাডভেঞ্চার (Letter & Word Adventure)
// Content lives in game01_letterAdventure.json; audio/trace assets are produced from it by
// scripts/assets/generate_game01_assets.py into game01_assets.generated.js.
import content from './game01_letterAdventure.json';
import {
  AUDIO,
  TRACE_GRIDS,
  TRACE_GRID_SIZE,
  TRACE_IMAGES,
  TRACE_STENCILS,
  WORD_IMAGES,
} from './game01_assets.generated';

export const GAME_ID = 'letter_adventure';
export { TRACE_GRID_SIZE };

export const STEPS = ['listen', 'trace', 'words', 'quiz', 'done'];
export const QUIZ_QUESTIONS = 3;

// Precomposed ড় ঢ় য় so that includes()/startsWith() behave regardless of input encoding.
const normalize = (text) =>
  text.replace(/ড়/g, 'ড়').replace(/ঢ়/g, 'ঢ়').replace(/য়/g, 'য়');

const buildLetters = (lang) =>
  content[lang].letters.map((letter, index) => {
    const char = normalize(letter.char);
    return {
      id: letter.id,
      lang,
      index,
      group: letter.group,
      char,
      display: lang === 'en' ? `${char}${char.toLowerCase()}` : letter.display || char,
      speakName: letter.speak && letter.speak !== char ? letter.speak : null,
      mode: letter.mode || 'start',
      audio: AUDIO[letter.id],
      traceImage: TRACE_IMAGES[letter.id],
      traceStencil: TRACE_STENCILS[letter.id],
      traceGrid: TRACE_GRIDS[letter.id],
      words: letter.words.map(([text, picture], i) => ({
        id: `${letter.id}_w${i + 1}`,
        text: normalize(text),
        picture,
        image: WORD_IMAGES[`${letter.id}_w${i + 1}`],
        audio: AUDIO[`${letter.id}_w${i + 1}`],
      })),
    };
  });

export const LETTERS = { bn: buildLetters('bn'), en: buildLetters('en') };
export const GROUPS = { bn: content.bn.groups, en: content.en.groups };

export const PROMPT_AUDIO = {
  chooseLanguage: AUDIO.p_choose_language,
  listen: AUDIO.p_listen,
  trace: AUDIO.p_trace,
  words: AUDIO.p_words,
  quizStart: AUDIO.p_quiz_start,
  quizContains: AUDIO.p_quiz_contains,
  traceDone: AUDIO.p_trace_done,
  traceOutside: AUDIO.p_trace_outside,
  levelDone: AUDIO.p_level_done,
};

export const PRAISE = [
  { text: content.prompts.correct1, audio: AUDIO.p_correct1 },
  { text: content.prompts.correct2, audio: AUDIO.p_correct2 },
  { text: content.prompts.correct3, audio: AUDIO.p_correct3 },
];

export const ENCOURAGE = [
  { text: content.prompts.wrong1, audio: AUDIO.p_wrong1 },
  { text: content.prompts.wrong2, audio: AUDIO.p_wrong2 },
];

export const PROMPT_TEXT = content.prompts;

export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const fold = (letter, text) => (letter.lang === 'en' ? text.toUpperCase() : text);

export const wordHasLetter = (letter, text) =>
  letter.mode === 'contains'
    ? fold(letter, text).includes(letter.char)
    : fold(letter, text).startsWith(letter.char);

// Splits a word so the learned letter can be coloured: { before, match, after }.
export const splitWord = (letter, text) => {
  const at = letter.mode === 'contains' ? fold(letter, text).indexOf(letter.char) : 0;
  if (at < 0 || !wordHasLetter(letter, text)) {
    return { before: text, match: '', after: '' };
  }
  const end = at + letter.char.length;
  return { before: text.slice(0, at), match: text.slice(at, end), after: text.slice(end) };
};

// Each question: one word of this letter + two words (from other letters) that don't have it.
export const buildQuiz = (letter) => {
  const usedPictures = new Set(letter.words.map((w) => w.picture));
  const decoys = shuffle(
    LETTERS[letter.lang]
      .filter((l) => l.id !== letter.id)
      .flatMap((l) => l.words)
      .filter((w) => !wordHasLetter(letter, w.text)),
  ).filter((w) => {
    if (usedPictures.has(w.picture)) {
      return false;
    }
    usedPictures.add(w.picture);
    return true;
  });
  return shuffle(letter.words)
    .slice(0, QUIZ_QUESTIONS)
    .map((answer, q) => ({
      id: `${letter.id}_q${q}`,
      answerId: answer.id,
      options: shuffle([answer, decoys[q * 2], decoys[q * 2 + 1]]),
    }));
};

export const starsForMistakes = (mistakes) => {
  if (mistakes === 0) {
    return 3;
  }
  return mistakes <= 2 ? 2 : 1;
};

export const isLevelUnlocked = (letters, index, progress) =>
  index === 0 || (progress[letters[index - 1].id] || 0) > 0;
