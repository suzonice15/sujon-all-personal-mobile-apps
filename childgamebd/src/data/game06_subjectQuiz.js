// Game 6 — বিষয়ভিত্তিক কুইজ (Subject Quiz): 5 subjects × 15 levels × 5 picture questions.
// বাংলা/ইংরেজি are generated from Game 1 words, গণিত is generated, বিজ্ঞান is hand-written
// (game06_quiz.json) and সাধারণ জ্ঞান reuses Game 3's questions.
import content from './game06_quiz.json';
import { AUDIO, PICTURES } from './game06_assets.generated';
import { ENCOURAGE, LETTERS, PRAISE, wordHasLetter } from './game01_letterAdventure';
import { LEVELS as CLUE_LEVELS } from './game03_guessTheWord';
import { toBanglaDigits } from '../utils/banglaNumber';

export const GAME_ID = 'subject_quiz';
export const LEVEL_COUNT = 15;
export const QUESTIONS_PER_LEVEL = 5;
export const QUESTION_SECONDS = 30;
export const POINTS_PER_QUESTION = 20;
export { PRAISE, ENCOURAGE };

export const TRACKS = {
  bn: { key: 'bn', title: 'বাংলা', color: '#E0287D', image: require('../assets/images/game06/subject_bn.jpg') },
  en: { key: 'en', title: 'ইংরেজি', color: '#2F80ED', image: require('../assets/images/game06/subject_en.jpg') },
  math: { key: 'math', title: 'গণিত', color: '#F08A00', image: require('../assets/images/game06/subject_math.jpg') },
  science: { key: 'science', title: 'বিজ্ঞান', color: '#22A05A', image: require('../assets/images/game06/subject_science.jpg') },
  gk: { key: 'gk', title: 'সাধারণ জ্ঞান', color: '#7B3FD1', image: require('../assets/images/game06/subject_gk.jpg') },
};

const P = content.prompts;
export const PROMPTS = {
  chooseSubject: { text: P.chooseSubject, audio: AUDIO.p_choose_subject },
  timeUp: { text: P.timeUp, audio: AUDIO.p_time_up },
  levelDone: { text: P.levelDone, audio: AUDIO.p_level_done },
  tryAgain: { text: P.tryAgain, audio: AUDIO.p_try_again },
};

// ---------------------------------------------------------------- helpers

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};
const pick = (list) => list[Math.floor(Math.random() * list.length)];
const randInt = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const bn = toBanglaDigits;

// A question: { id, text, audio: [clips], picture?, display: 'picture'|'labelled'|'text'|'count',
//               options: [{ key, image?, label?, count? }], answerKey }
const question = (id, fields, answer, decoys) => {
  const options = shuffle([answer, ...decoys]);
  return { id, ...fields, options, answerKey: answer.key };
};

// ---------------------------------------------------------------- বাংলা / ইংরেজি (from Game 1 words)

const SKIP_WORDS = ['ঐক্য', 'ঐতিহ্য', 'ঔজ্জ্বল্য', 'ঋণ', 'ঊর্মি', 'ঊষা', 'ঊরু', 'ঔপন্যাসিক', 'দৃঢ়', 'গাঢ়', 'প্রাতঃকাল', 'নিঃশব্দ', 'দুঃখ', 'অংক', 'Quiet', 'Question'];

const wordsOf = (lang) => {
  const seenPictures = new Set();
  return LETTERS[lang].flatMap((letter) =>
    letter.words
      .filter((w) => {
        if (SKIP_WORDS.includes(w.text) || seenPictures.has(w.picture)) {
          return false;
        }
        seenPictures.add(w.picture);
        return true;
      })
      .map((w) => ({ ...w, key: w.id, letterId: letter.id })),
  );
};
const WORDS = { bn: wordsOf('bn'), en: wordsOf('en') };

const languageQuestion = (lang, levelIndex, n) => {
  const words = WORDS[lang];
  const id = `${lang}_${levelIndex}_${n}`;
  const isEn = lang === 'en';
  if (levelIndex < 5) {
    const answer = pick(words);
    const decoys = shuffle(words.filter((w) => w.picture !== answer.picture)).slice(0, 3);
    return question(
      id,
      {
        text: isEn ? `Which picture is ‘${answer.text}’?` : `নিচের কোনটি ${answer.text}?`,
        audio: [isEn ? AUDIO.p_en_which_is : AUDIO.p_which_is, answer.audio],
        display: 'picture',
      },
      { key: answer.key, image: answer.image, label: answer.text },
      decoys.map((w) => ({ key: w.key, image: w.image, label: w.text })),
    );
  }
  if (levelIndex < 10) {
    const letter = pick(LETTERS[lang].filter((l) => l.mode === 'start'));
    const answer = pick(letter.words);
    const decoys = shuffle(words.filter((w) => !wordHasLetter(letter, w.text) && w.picture !== answer.picture)).slice(0, 3);
    return question(
      id,
      {
        text: isEn ? `Which one starts with ‘${letter.char}’?` : `কোন ছবিটির নাম ‘${letter.char}’ দিয়ে শুরু?`,
        audio: [isEn ? AUDIO.p_en_starts_with : AUDIO.p_starts_with, letter.audio],
        display: 'picture',
      },
      { key: answer.id, image: answer.image, label: answer.text },
      decoys.map((w) => ({ key: w.key, image: w.image, label: w.text })),
    );
  }
  const answer = pick(words);
  const decoys = shuffle(words.filter((w) => w.text !== answer.text && w.letterId !== answer.letterId)).slice(0, 3);
  return question(
    id,
    {
      text: isEn ? 'What is this?' : 'ছবিটির নাম কী?',
      audio: [isEn ? AUDIO.p_en_name_it : AUDIO.p_name_it],
      picture: answer.image,
      display: 'text',
      answerAudio: answer.audio,
    },
    { key: answer.key, label: answer.text },
    decoys.map((w) => ({ key: w.key, label: w.text })),
  );
};

// ---------------------------------------------------------------- গণিত (generated)

const COUNT_RANGES = [[1, 3], [1, 5], [3, 7], [4, 9], [5, 10]];

const distinctNumbers = (answer, lo, hi, count) => {
  const pool = shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((v) => v !== answer));
  return pool.slice(0, count);
};

const countQuestion = (id, range) => {
  const [lo, hi] = range;
  const n = randInt(lo, hi);
  const oi = randInt(0, content.countObjects.length - 1);
  const [name, emoji] = content.countObjects[oi];
  const image = PICTURES[emoji];
  const decoys = distinctNumbers(n, Math.max(1, lo - 1), Math.max(hi, 4), 3);
  return question(
    id,
    { text: `নিচের কোনটিতে ${bn(n)}টি ${name} আছে?`, audio: [AUDIO[`count_${oi}_${n}`]], display: 'count' },
    { key: `c${n}`, image, count: n, label: bn(n) },
    decoys.map((d) => ({ key: `c${d}`, image, count: d, label: bn(d) })),
  );
};

const arithmeticQuestion = (id, op, max) => {
  let a;
  let b;
  let answer;
  if (op === 'add') {
    answer = randInt(1, max);
    a = randInt(0, answer);
    b = answer - a;
  } else {
    a = randInt(1, max);
    b = randInt(0, a);
    answer = a - b;
  }
  const decoys = distinctNumbers(answer, Math.max(0, answer - 3), answer + 3, 3);
  return question(
    id,
    {
      text: op === 'add' ? `${bn(a)} + ${bn(b)} = ?` : `${bn(a)} − ${bn(b)} = ?`,
      audio: [AUDIO[op === 'add' ? `add_${a}_${b}` : `sub_${a}_${b}`]],
      display: 'text',
      bigText: true,
    },
    { key: `n${answer}`, label: bn(answer) },
    decoys.map((d) => ({ key: `n${d}`, label: bn(d) })),
  );
};

const shapeQuestion = (id) => {
  const shapes = content.shapes.map(([name, emoji, q], i) => ({ name, emoji, q, i }));
  const answer = pick(shapes);
  const decoys = shuffle(shapes.filter((s) => s !== answer)).slice(0, 3);
  return question(
    id,
    { text: answer.q, audio: [AUDIO[`shape_${answer.i}`]], display: 'labelled' },
    { key: `s${answer.i}`, image: PICTURES[answer.emoji], label: answer.name },
    decoys.map((s) => ({ key: `s${s.i}`, image: PICTURES[s.emoji], label: s.name })),
  );
};

const compareQuestion = (id, max, biggest) => {
  const values = distinctNumbers(-1, 1, max, 4);
  const answer = biggest ? Math.max(...values) : Math.min(...values);
  return question(
    id,
    {
      text: biggest ? P.biggest : P.smallest,
      audio: [biggest ? AUDIO.p_biggest : AUDIO.p_smallest],
      display: 'text',
      bigText: true,
    },
    { key: `n${answer}`, label: bn(answer) },
    values.filter((v) => v !== answer).map((v) => ({ key: `n${v}`, label: bn(v) })),
  );
};

const MATH_LEVELS = [
  ...COUNT_RANGES.map((range) => (id) => countQuestion(id, range)),
  (id) => arithmeticQuestion(id, 'add', 5),
  (id) => arithmeticQuestion(id, 'add', 10),
  (id) => arithmeticQuestion(id, 'sub', 5),
  (id) => arithmeticQuestion(id, 'sub', 10),
  (id) => arithmeticQuestion(id, pick(['add', 'sub']), 10),
  (id) => shapeQuestion(id),
  (id) => compareQuestion(id, 20, true),
  (id) => compareQuestion(id, 50, false),
  (id) => pick([shapeQuestion, (i) => compareQuestion(i, 99, Math.random() < 0.5)])(id),
  (id) => pick([(i) => countQuestion(i, [5, 10]), (i) => arithmeticQuestion(i, pick(['add', 'sub']), 10), shapeQuestion, (i) => compareQuestion(i, 99, Math.random() < 0.5)])(id),
];

// ---------------------------------------------------------------- বিজ্ঞান (hand-written)

const SCIENCE = content.science.map((level, li) => ({
  theme: level.theme,
  questions: level.items.map(([text, [label, emoji], decoys], qi) => ({
    id: `science_${li}_${qi}`,
    text,
    audio: [AUDIO[`sci_${li + 1}_${qi + 1}`]],
    answer: { key: emoji, image: PICTURES[emoji], label },
    decoys: decoys.map(([l, e]) => ({ key: e, image: PICTURES[e], label: l })),
  })),
}));

// ---------------------------------------------------------------- সাধারণ জ্ঞান (Game 3 questions)

const GK = CLUE_LEVELS.gk.flatMap((level) => level.questions);
const GK_PER_LEVEL = Math.floor(GK.length / LEVEL_COUNT);

// ---------------------------------------------------------------- levels

const levelTheme = (track, index) => {
  if (track === 'science') {
    return SCIENCE[index].theme;
  }
  if (track === 'gk') {
    return CLUE_LEVELS.gk[Math.min(CLUE_LEVELS.gk.length - 1, Math.floor((index * GK_PER_LEVEL) / 10))].theme;
  }
  if (track === 'math') {
    return ['গণনা', 'গণনা', 'গণনা', 'গণনা', 'গণনা', 'যোগ', 'যোগ', 'বিয়োগ', 'বিয়োগ', 'যোগ-বিয়োগ', 'আকৃতি', 'বড় সংখ্যা', 'ছোট সংখ্যা', 'মিশ্র', 'মিশ্র'][index];
  }
  return ['ছবি চিনি', 'ছবি চিনি', 'ছবি চিনি', 'ছবি চিনি', 'ছবি চিনি', 'বর্ণ চিনি', 'বর্ণ চিনি', 'বর্ণ চিনি', 'বর্ণ চিনি', 'বর্ণ চিনি', 'নাম বলি', 'নাম বলি', 'নাম বলি', 'নাম বলি', 'নাম বলি'][index];
};

export const LEVELS = Object.fromEntries(
  Object.keys(TRACKS).map((track) => [
    track,
    Array.from({ length: LEVEL_COUNT }, (_, index) => ({ id: `L${index + 1}`, index, theme: levelTheme(track, index) })),
  ]),
);

// Builds the 5 questions for one play of a level (with no repeated answer).
export const buildLevelQuestions = (track, levelIndex) => {
  if (track === 'science') {
    return shuffle(SCIENCE[levelIndex].questions).map((q) => question(q.id, { text: q.text, audio: q.audio, display: 'labelled' }, q.answer, q.decoys));
  }
  if (track === 'gk') {
    const pool = GK.slice(levelIndex * GK_PER_LEVEL, (levelIndex + 1) * GK_PER_LEVEL);
    return shuffle(pool)
      .slice(0, QUESTIONS_PER_LEVEL)
      .map((q) =>
        question(
          `gk_${q.id}`,
          { text: q.clue, audio: [q.clueAudio], display: 'labelled', answerAudio: q.answerAudio },
          { key: q.answer.word, image: q.answer.image, label: q.answer.word },
          shuffle(q.decoyPool).slice(0, 3).map((d) => ({ key: d.word, image: d.image, label: d.word })),
        ),
      );
  }
  const make = track === 'math' ? MATH_LEVELS[levelIndex] : (id) => languageQuestion(track, levelIndex, id);
  const questions = [];
  const seen = new Set();
  for (let attempt = 0; questions.length < QUESTIONS_PER_LEVEL && attempt < 100; attempt++) {
    const q = make(`${track}_${levelIndex}_${questions.length}`);
    const sig = `${q.text}|${q.answerKey}`;
    if (!seen.has(sig)) {
      seen.add(sig);
      questions.push(q);
    }
  }
  return questions;
};

export const starsForCorrect = (correct) => {
  if (correct >= 5) {
    return 3;
  }
  if (correct === 4) {
    return 2;
  }
  return correct === 3 ? 1 : 0;
};

export const isLevelUnlocked = (track, index, progress) =>
  index === 0 || (progress[LEVELS[track][index - 1].id] || 0) > 0;
