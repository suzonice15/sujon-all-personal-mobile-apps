// Game 3 — শব্দ খোঁজার অভিযান (Guess the Word from Clue)
// Read/hear a clue and pick the matching picture out of four. Content: game03_clues.json;
// voice clips and pictures: game03_assets.generated.js (scripts/assets/generate_game03_assets.py).
import content from './game03_clues.json';
import { AUDIO, PICTURES } from './game03_assets.generated';
import { ENCOURAGE, PRAISE } from './game01_letterAdventure';

export const GAME_ID = 'guess_word';
export const QUESTIONS_PER_LEVEL = 10;
export const OPTIONS_PER_QUESTION = 4;
export const PASS_CORRECT = 5;
export { PRAISE, ENCOURAGE };

export const TRACKS = {
  bn: { key: 'bn', title: 'বাংলা', color: '#E0287D', unit: 'শব্দ' },
  gk: { key: 'gk', title: 'সাধারণ জ্ঞান', color: '#7B3FD1', unit: 'উত্তর' },
  en: { key: 'en', title: 'ইংরেজি', color: '#2F80ED', unit: 'শব্দ' },
};

export const STAGES = ['শুরু করি', 'আরও জানি', 'বড় চ্যালেঞ্জ'];

export const PROMPTS = {
  chooseSubject: { text: content.prompts.chooseSubject, audio: AUDIO.p_choose_subject },
  instruction: { text: content.prompts.instruction, audio: AUDIO.p_instruction },
  correctTitle: { text: content.prompts.correctTitle, audio: AUDIO.p_correct_title },
  correctLine: { text: content.prompts.correctLine, audio: AUDIO.p_correct_line },
};

// Precomposed ড় ঢ় য় so text compares reliably.
const normalize = (text) =>
  text.replace(/ড়/g, 'ড়').replace(/ঢ়/g, 'ঢ়').replace(/য়/g, 'য়');

const option = (word, picture) => ({ word: normalize(word), image: PICTURES[picture] });

const buildTrack = (key) => {
  const info = content.tracks[key];
  const catalog = {};
  Object.entries(info.catalog || {}).forEach(([category, items]) => {
    catalog[category] = items.map(([word, picture]) => option(word, picture));
  });
  const findInCatalog = (word) => Object.values(catalog).flat().find((o) => o.word === normalize(word));

  return info.levels.map((level, li) => {
    // bn/en: decoys come from the same level (same theme); gk: from the answer's category.
    const levelPool = key === 'gk' ? [] : [...level.items, ...(level.extras || [])].map(([w, p]) => option(w, p));
    const questions = level.items.map((item, ii) => {
      const base = `${key}_${li + 1}_${ii + 1}`;
      if (key === 'gk') {
        const [answer, category, clue, explanation, decoys] = item;
        const right = findInCatalog(answer);
        return {
          id: base,
          clue,
          explanation,
          answer: right,
          decoyPool: decoys ? decoys.map(findInCatalog) : catalog[category].filter((o) => o.word !== right.word),
          clueAudio: AUDIO[`${base}_c`],
          answerAudio: AUDIO[`${base}_a`],
        };
      }
      const [answer, picture, clue] = item;
      const right = option(answer, picture);
      return {
        id: base,
        clue,
        explanation: '',
        answer: right,
        decoyPool: levelPool.filter((o) => o.word !== right.word),
        clueAudio: AUDIO[`${base}_c`],
        answerAudio: AUDIO[`${base}_a`],
      };
    });
    return { id: `L${li + 1}`, index: li, theme: level.theme, lang: info.lang, questions };
  });
};

export const LEVELS = { bn: buildTrack('bn'), gk: buildTrack('gk'), en: buildTrack('en') };

const shuffle = (list) => {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Questions in random order, each with the answer + 3 decoys in random positions.
export const buildLevelQuestions = (track, levelIndex) =>
  shuffle(LEVELS[track][levelIndex].questions).map((q) => ({
    ...q,
    options: shuffle([q.answer, ...shuffle(q.decoyPool).slice(0, OPTIONS_PER_QUESTION - 1)]),
  }));

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
