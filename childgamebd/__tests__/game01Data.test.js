import { LETTERS, buildQuiz, wordHasLetter, splitWord, starsForMistakes, isLevelUnlocked } from '../src/data/game01_letterAdventure';

describe('Game 1 letter data', () => {
  it('has the full Bangla and English alphabets', () => {
    expect(LETTERS.bn).toHaveLength(50);
    expect(LETTERS.en).toHaveLength(26);
  });

  it('every word contains its letter and every asset exists', () => {
    [...LETTERS.bn, ...LETTERS.en].forEach((letter) => {
      expect(letter.audio).toBeDefined();
      expect(letter.traceImage).toBeDefined();
      expect(letter.traceStencil).toBeDefined();
      expect(letter.traceGrid).toMatch(/^[012]{144}$/);
      expect(letter.traceGrid).toContain('1');
      letter.words.forEach((w) => {
        expect(w.audio).toBeDefined();
        expect(w.image).toBeDefined();
        if (!wordHasLetter(letter, w.text)) {
          throw new Error(`${w.text} does not match ${letter.char}`);
        }
        const parts = splitWord(letter, w.text);
        expect(parts.before + parts.match + parts.after).toBe(w.text);
        expect(parts.match.length).toBeGreaterThan(0);
      });
    });
  });

  it('quiz always has one correct answer and two valid decoys', () => {
    [...LETTERS.bn, ...LETTERS.en].forEach((letter) => {
      for (let n = 0; n < 20; n++) {
        const quiz = buildQuiz(letter);
        expect(quiz).toHaveLength(3);
        quiz.forEach((q) => {
          expect(q.options).toHaveLength(3);
          const matching = q.options.filter((o) => wordHasLetter(letter, o.text));
          expect(matching).toHaveLength(1);
          expect(matching[0].id).toBe(q.answerId);
          expect(new Set(q.options.map((o) => o.picture)).size).toBe(3);
        });
      }
    });
  });

  it('scores and unlocks levels', () => {
    expect(starsForMistakes(0)).toBe(3);
    expect(starsForMistakes(2)).toBe(2);
    expect(starsForMistakes(5)).toBe(1);
    const l = LETTERS.bn;
    expect(isLevelUnlocked(l, 0, {})).toBe(true);
    expect(isLevelUnlocked(l, 1, {})).toBe(false);
    expect(isLevelUnlocked(l, 1, { [l[0].id]: 2 })).toBe(true);
  });
});
