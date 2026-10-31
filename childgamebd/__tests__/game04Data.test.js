import {
  LEVELS,
  WORD_POOL,
  buildPuzzle,
  isLevelUnlocked,
  lineCells,
  matchSelection,
  splitLetters,
  starsFor,
} from '../src/data/game04_wordSearch';

describe('Game 4 word search data', () => {
  it('splits Bangla words into written letter units', () => {
    expect(splitLetters('bn', 'সূর্য')).toEqual(['সূ', 'র্য']);
    expect(splitLetters('bn', 'কলা')).toEqual(['ক', 'লা']);
    expect(splitLetters('bn', 'হাঁস')).toEqual(['হাঁ', 'স']);
    expect(splitLetters('bn', 'বাংলাদেশ')).toEqual(['বাং', 'লা', 'দে', 'শ']);
    expect(splitLetters('bn', 'ইঁদুর')).toEqual(['ইঁ', 'দু', 'র']);
    expect(splitLetters('bn', 'পেঙ্গুইন')).toEqual(['পে', 'ঙ্গু', 'ই', 'ন']);
    expect(splitLetters('en', 'Fish')).toEqual(['F', 'I', 'S', 'H']);
  });

  it('every pool word splits back into its own text and has picture + voice', () => {
    ['bn', 'en'].forEach((lang) => {
      expect(WORD_POOL[lang].length).toBeGreaterThan(50);
      WORD_POOL[lang].forEach((w) => {
        expect(w.letters.join('')).toBe(w.text);
        expect(w.image).toBeDefined();
        expect(w.audio).toBeDefined();
      });
    });
  });

  it('builds valid puzzles for every level', () => {
    ['bn', 'en'].forEach((lang) => {
      LEVELS.forEach((lvl) => {
        for (let n = 0; n < 15; n++) {
          const p = buildPuzzle(lang, lvl.index);
          expect(p.grid).toHaveLength(lvl.size);
          p.grid.forEach((row) => row.forEach((cell) => expect(cell).toBeTruthy()));
          expect(p.words).toHaveLength(lvl.words);
          expect(new Set(p.words.map((w) => w.id)).size).toBe(lvl.words);
          p.words.forEach((w) => {
            const line = lineCells(w.cells[0], w.cells[w.cells.length - 1]);
            expect(line).toEqual(w.cells);
            expect(matchSelection(p, w.cells, [])).toBeTruthy();
            expect(matchSelection(p, [...w.cells].reverse(), [])).toBeTruthy();
          });
        }
      });
    });
  });

  it('only accepts straight lines and scores', () => {
    expect(lineCells([0, 0], [2, 2])).toEqual([[0, 0], [1, 1], [2, 2]]);
    expect(lineCells([2, 0], [2, 3])).toHaveLength(4);
    expect(lineCells([0, 0], [1, 2])).toBeNull();
    expect(starsFor({ allFound: true, hintsUsed: 0, timeLeft: 60, totalTime: 90 })).toBe(3);
    expect(starsFor({ allFound: true, hintsUsed: 1, timeLeft: 60, totalTime: 90 })).toBe(2);
    expect(starsFor({ allFound: true, hintsUsed: 3, timeLeft: 5, totalTime: 90 })).toBe(1);
    expect(starsFor({ allFound: false, hintsUsed: 0, timeLeft: 0, totalTime: 90 })).toBe(0);
    expect(isLevelUnlocked(1, { L1: 1 })).toBe(true);
    expect(isLevelUnlocked(2, { L1: 1 })).toBe(false);
  });
});
