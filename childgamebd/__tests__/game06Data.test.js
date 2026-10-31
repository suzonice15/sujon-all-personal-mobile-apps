import {
  LEVELS,
  QUESTIONS_PER_LEVEL,
  TRACKS,
  buildLevelQuestions,
  isLevelUnlocked,
  starsForCorrect,
} from '../src/data/game06_subjectQuiz';
import { LETTERS, wordHasLetter } from '../src/data/game01_letterAdventure';

const toNumber = (s) => Number(s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d)));

describe('Game 6 subject quiz data', () => {
  it('has 5 subjects × 15 levels with themes', () => {
    expect(Object.keys(TRACKS)).toEqual(['bn', 'en', 'math', 'science', 'gk']);
    Object.keys(TRACKS).forEach((track) => {
      expect(LEVELS[track]).toHaveLength(15);
      LEVELS[track].forEach((l) => expect(l.theme).toBeTruthy());
    });
  });

  it('every level builds 5 valid, distinct questions', () => {
    Object.keys(TRACKS).forEach((track) => {
      LEVELS[track].forEach((lvl) => {
        for (let n = 0; n < 8; n++) {
          const qs = buildLevelQuestions(track, lvl.index);
          expect(qs).toHaveLength(QUESTIONS_PER_LEVEL);
          expect(new Set(qs.map((q) => `${q.text}|${q.answerKey}`)).size).toBe(QUESTIONS_PER_LEVEL);
          qs.forEach((q) => {
            expect(q.text).toBeTruthy();
            expect(q.audio.length).toBeGreaterThan(0);
            q.audio.forEach((clip) => expect(clip).toBeDefined());
            expect(q.options).toHaveLength(4);
            expect(new Set(q.options.map((o) => o.key)).size).toBe(4);
            expect(q.options.filter((o) => o.key === q.answerKey)).toHaveLength(1);
            if (q.display !== 'text') {
              q.options.forEach((o) => expect(o.image).toBeDefined());
              // (images are a single mock value in Jest, so compare what they depict)
              expect(new Set(q.options.map((o) => `${o.label}|${o.count || ''}`)).size).toBe(4);
            } else {
              expect(new Set(q.options.map((o) => o.label)).size).toBe(4);
            }
          });
        }
      });
    });
  });

  it('math answers are actually correct', () => {
    for (let li = 0; li < 15; li++) {
      for (let n = 0; n < 10; n++) {
        buildLevelQuestions('math', li).forEach((q) => {
          const answer = q.options.find((o) => o.key === q.answerKey);
          const sum = q.text.match(/^(.+) \+ (.+) = \?$/);
          const diff = q.text.match(/^(.+) − (.+) = \?$/);
          const count = q.text.match(/^নিচের কোনটিতে (.+)টি .+ আছে\?$/);
          if (sum) {
            expect(toNumber(answer.label)).toBe(toNumber(sum[1]) + toNumber(sum[2]));
          } else if (diff) {
            expect(toNumber(answer.label)).toBe(toNumber(diff[1]) - toNumber(diff[2]));
          } else if (count) {
            expect(answer.count).toBe(toNumber(count[1]));
          } else if (/বড়/.test(q.text)) {
            expect(toNumber(answer.label)).toBe(Math.max(...q.options.map((o) => toNumber(o.label))));
          } else if (/ছোট/.test(q.text)) {
            expect(toNumber(answer.label)).toBe(Math.min(...q.options.map((o) => toNumber(o.label))));
          }
        });
      }
    }
  });

  it('starts-with questions have exactly one matching picture', () => {
    for (let n = 0; n < 20; n++) {
      buildLevelQuestions('bn', 6).forEach((q) => {
        const char = q.text.match(/‘(.+)’/)[1];
        const letter = LETTERS.bn.find((l) => l.char === char);
        expect(q.options.filter((o) => wordHasLetter(letter, o.label))).toHaveLength(1);
      });
    }
  });

  it('scores and unlocks', () => {
    expect(starsForCorrect(5)).toBe(3);
    expect(starsForCorrect(4)).toBe(2);
    expect(starsForCorrect(3)).toBe(1);
    expect(starsForCorrect(2)).toBe(0);
    expect(isLevelUnlocked('science', 1, { L1: 1 })).toBe(true);
    expect(isLevelUnlocked('science', 2, { L1: 1 })).toBe(false);
  });
});
