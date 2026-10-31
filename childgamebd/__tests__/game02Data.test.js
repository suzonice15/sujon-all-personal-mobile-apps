import {
  GRID,
  LEVELS,
  ROUNDS_PER_LEVEL,
  TRACKS,
  buildLevelRounds,
  formatTime,
  isLevelUnlocked,
  lookAlikeTexts,
  promptFor,
  starsForCorrect,
} from '../src/data/game02_wordSeekRush';

describe('Game 2 seek-rush data', () => {
  it('has 12 levels in 3 stages for every subject', () => {
    Object.keys(TRACKS).forEach((track) => {
      expect(LEVELS[track]).toHaveLength(12);
      expect(LEVELS[track].map((l) => l.stage)).toEqual([
        ...Array(4).fill('one'),
        ...Array(4).fill('same'),
        ...Array(4).fill('word'),
      ]);
      ['one', 'same', 'word'].forEach((stage) => {
        const p = promptFor(track, stage);
        expect(p.text).toBeTruthy();
        expect(p.audio).toBeDefined();
      });
    });
  });

  it('every round has the right number of targets and no fake targets', () => {
    Object.keys(TRACKS).forEach((track) => {
      LEVELS[track].forEach((lvl) => {
        expect(lvl.targets.length).toBeGreaterThanOrEqual(3);
        for (let n = 0; n < 15; n++) {
          const rounds = buildLevelRounds(track, lvl.index);
          expect(rounds).toHaveLength(ROUNDS_PER_LEVEL);
          rounds.forEach((round, i) => {
            expect(round.tiles).toHaveLength(GRID[lvl.stage].tiles);
            const expected = lvl.stage === 'same' ? lvl.copies : 1;
            expect(round.targetCount).toBe(expected);
            round.tiles.forEach((t) => {
              expect(t.isTarget).toBe(t.item.text === round.target.text);
              expect(t.item.audio).toBeDefined();
            });
            if (lvl.stage === 'word') {
              expect(new Set(round.tiles.map((t) => t.item.text)).size).toBe(round.tiles.length);
            }
            if (i > 0) {
              expect(round.target.text).not.toBe(rounds[i - 1].target.text);
            }
          });
        }
      });
    });
  });

  it('look-alike levels really contain look-alike distractors', () => {
    [['en', 6], ['bn', 4], ['math', 7]].forEach(([track, index]) => {
      buildLevelRounds(track, index).forEach((round) => {
        const similar = lookAlikeTexts(round.target);
        const available = LEVELS[track][index].distractors.some((d) => similar.includes(d.text));
        if (available) {
          expect(round.tiles.some((t) => similar.includes(t.item.text))).toBe(true);
        }
      });
    });
    expect(lookAlikeTexts({ text: 'b' })).toEqual(expect.arrayContaining(['d', 'p', 'q']));
    expect(lookAlikeTexts({ text: '২৫', value: 25 })).toContain('৫২');
  });

  it('scores, unlocks and formats time', () => {
    expect(starsForCorrect(10)).toBe(3);
    expect(starsForCorrect(8)).toBe(2);
    expect(starsForCorrect(5)).toBe(1);
    expect(starsForCorrect(4)).toBe(0);
    expect(isLevelUnlocked('bn', 0, {})).toBe(true);
    expect(isLevelUnlocked('bn', 1, { L1: 0 })).toBe(false);
    expect(isLevelUnlocked('bn', 1, { L1: 1 })).toBe(true);
    expect(formatTime(84)).toBe('০১:২৪');
  });
});
