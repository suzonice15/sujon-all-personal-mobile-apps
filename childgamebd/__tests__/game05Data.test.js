import {
  LEVELS,
  POOLS,
  buildCrossword,
  cellKey,
  isLevelUnlocked,
  mathClue,
  starsFor,
  tilesFor,
} from '../src/data/game05_blockFill';

const toNumber = (s) => Number(s.replace(/[০-৯]/g, (d) => '০১২৩৪৫৬৭৮৯'.indexOf(d)));

describe('Game 5 block fill data', () => {
  it('has word pools with pictures and voices', () => {
    expect(POOLS.bn.length).toBeGreaterThan(100);
    expect(POOLS.en.length).toBeGreaterThan(80);
    expect(POOLS.math.length).toBeGreaterThan(20);
    [...POOLS.bn, ...POOLS.en].forEach((w) => {
      expect(w.image).toBeDefined();
      expect(w.clueAudio).toBeDefined();
      expect(w.letters.join('')).toBe(POOLS.en.includes(w) ? w.word.toUpperCase() : w.word);
    });
    POOLS.math.forEach((w) => expect(w.answerAudio).toBeDefined());
  });

  it('math clues always evaluate to the answer', () => {
    POOLS.math.forEach((w) => {
      for (let i = 0; i < 30; i++) {
        const clue = mathClue(w.value);
        expect(clue.image).toBeDefined();
        const plus = clue.text.match(/^(.+) \+ (.+) = \?$/);
        const minus = clue.text.match(/^(.+) − (.+) = \?$/);
        const next = clue.text.match(/^(.+)-এর পরের সংখ্যা$/);
        const prev = clue.text.match(/^(.+)-এর আগের সংখ্যা$/);
        const tens = clue.text.match(/^(.+)টি দশ = \?$/);
        if (plus) {
          expect(toNumber(plus[1]) + toNumber(plus[2])).toBe(w.value);
        } else if (minus) {
          expect(toNumber(minus[1]) - toNumber(minus[2])).toBe(w.value);
        } else if (next) {
          expect(toNumber(next[1]) + 1).toBe(w.value);
        } else if (prev) {
          expect(toNumber(prev[1]) - 1).toBe(w.value);
        } else if (tens) {
          expect(toNumber(tens[1]) * 10).toBe(w.value);
        } else {
          expect(clue.text).toMatch(/\?$/);
        }
      }
    });
  });

  it('builds consistent crosswords for every subject and level', () => {
    ['bn', 'math', 'en'].forEach((track) => {
      LEVELS.forEach((lvl) => {
        for (let n = 0; n < 10; n++) {
          const p = buildCrossword(track, lvl.index);
          expect(p.words).toHaveLength(lvl.words);
          expect(p.rows).toBeLessThanOrEqual(lvl.maxSize);
          expect(p.cols).toBeLessThanOrEqual(lvl.maxSize);
          p.words.forEach((w) => {
            expect(w.clue).toBeTruthy();
            expect(w.num).toBeGreaterThan(0);
            w.cells.forEach(([r, c], i) => {
              expect(r).toBeGreaterThanOrEqual(0);
              expect(c).toBeLessThan(p.cols);
              expect(p.cells[cellKey(r, c)]).toBe(w.letters[i]);
            });
          });
          // Every word crosses at least one other word, so the puzzle is connected.
          const counts = {};
          p.words.forEach((w) => w.cells.forEach(([r, c]) => (counts[cellKey(r, c)] = (counts[cellKey(r, c)] || 0) + 1)));
          p.words.forEach((w) => expect(w.cells.some(([r, c]) => counts[cellKey(r, c)] > 1)).toBe(true));
          // Tiles always contain the letters needed.
          const tiles = tilesFor(p, p.words[0], {}).map((t) => t.letter);
          p.words[0].letters.forEach((l) => expect(tiles).toContain(l));
        }
      });
    });
  });

  it('scores and unlocks', () => {
    expect(starsFor(0, 0)).toBe(3);
    expect(starsFor(1, 1)).toBe(2);
    expect(starsFor(4, 1)).toBe(1);
    expect(isLevelUnlocked(1, { L1: 2 })).toBe(true);
    expect(isLevelUnlocked(2, { L1: 2 })).toBe(false);
  });
});
