import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GC } from '../../../../components/game';
import { cellKey } from '../../../../data/game05_blockFill';
import { toBanglaDigits } from '../../../../utils/banglaNumber';

const Cell = memo(({ size, letter, number, state, onPress, lang }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={letter || 'খালি ঘর'}
    style={[styles.cell, { width: size - 4, height: size - 4 }, styles[state]]}
  >
    {number ? <Text style={[styles.number, { fontSize: Math.max(9, size * 0.22) }]}>{lang === 'en' ? number : toBanglaDigits(number)}</Text> : null}
    {letter ? (
      <Text
        style={[styles.letter, { fontSize: size * (lang === 'en' ? 0.5 : 0.42) }, state === 'solved' && styles.letterSolved]}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {letter}
      </Text>
    ) : null}
  </Pressable>
));

// rows × cols board. Cells that belong to no word are drawn as grey blocks.
// filled: {"r,c": letter}; solvedCells: Set of keys; activeCells: Set; cursor: "r,c"; wrongCells: Set.
export default function CrosswordGrid({ puzzle, width, maxHeight, filled, solvedCells, activeCells, cursor, wrongCells, onCellPress }) {
  const size = Math.floor(Math.min(width / puzzle.cols, maxHeight / puzzle.rows, 64));
  const numbers = {};
  puzzle.words.forEach((w) => (numbers[cellKey(w.r, w.c)] = w.num));
  const lang = puzzle.track === 'en' ? 'en' : 'bn';

  return (
    <View style={styles.board}>
      {Array.from({ length: puzzle.rows }, (_, r) => (
        <View key={r} style={styles.row}>
          {Array.from({ length: puzzle.cols }, (__, c) => {
            const k = cellKey(r, c);
            if (!puzzle.cells[k]) {
              return <View key={k} style={[styles.block, { width: size - 4, height: size - 4 }]} />;
            }
            let state = 'empty';
            if (wrongCells.has(k)) {
              state = 'wrong';
            } else if (solvedCells.has(k)) {
              state = 'solved';
            } else if (k === cursor) {
              state = 'cursor';
            } else if (activeCells.has(k)) {
              state = 'active';
            }
            return (
              <Cell
                key={k}
                size={size}
                letter={filled[k]}
                number={numbers[k]}
                state={state}
                lang={lang}
                onPress={() => onCellPress(r, c)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { alignSelf: 'center' },
  row: { flexDirection: 'row' },
  block: { margin: 2, borderRadius: 8, backgroundColor: 'rgba(120,108,96,0.18)' },
  cell: {
    margin: 2,
    borderRadius: 8,
    backgroundColor: GC.white,
    borderWidth: 2,
    borderColor: '#E6D8C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {},
  active: { backgroundColor: '#D9F1FF', borderColor: '#7CC4F0' },
  cursor: { backgroundColor: '#FFF3C4', borderColor: GC.yellow, borderWidth: 3 },
  solved: { backgroundColor: '#DDF5E7', borderColor: GC.green },
  wrong: { backgroundColor: '#FDE3E6', borderColor: GC.red },
  number: { position: 'absolute', top: 1, left: 3, fontWeight: '800', color: GC.inkSoft },
  letter: { fontWeight: '800', color: '#4A2C17', includeFontPadding: false },
  letterSolved: { color: GC.greenDark },
});
