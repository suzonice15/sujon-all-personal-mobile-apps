import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native';
import { GC } from '../../../../components/game';
import { lineCells } from '../../../../data/game04_wordSearch';

export const WORD_COLORS = ['#F7A8C8', '#9CC8F5', '#A8E0A8', '#C9B2F0', '#FFC98A', '#FFE27A', '#8FE0D6', '#F5B08F'];

// Rounded band from the centre of one cell to the centre of another.
const Capsule = memo(({ from, to, cell, color, opacity = 0.75 }) => {
  const x1 = (from[1] + 0.5) * cell;
  const y1 = (from[0] + 0.5) * cell;
  const x2 = (to[1] + 0.5) * cell;
  const y2 = (to[0] + 0.5) * cell;
  const thick = cell * 0.8;
  const len = Math.hypot(x2 - x1, y2 - y1) + thick;
  return (
    <View
      pointerEvents="none"
      style={[
        styles.capsule,
        {
          left: (x1 + x2) / 2 - len / 2,
          top: (y1 + y2) / 2 - thick / 2,
          width: len,
          height: thick,
          borderRadius: thick / 2,
          backgroundColor: color,
          opacity,
          transform: [{ rotate: `${Math.atan2(y2 - y1, x2 - x1)}rad` }],
        },
      ]}
    />
  );
});

// Snaps the finger position to the nearest straight line (8 directions) from the start cell.
const snapEnd = (start, cell, size) => {
  const dr = cell[0] - start[0];
  const dc = cell[1] - start[1];
  if (!dr && !dc) {
    return start;
  }
  const angle = Math.round(Math.atan2(dr, dc) / (Math.PI / 4)) * (Math.PI / 4);
  const ur = Math.round(Math.sin(angle));
  const uc = Math.round(Math.cos(angle));
  let len = Math.max(Math.abs(dr), Math.abs(dc));
  while (len > 0) {
    const r = start[0] + ur * len;
    const c = start[1] + uc * len;
    if (r >= 0 && r < size && c >= 0 && c < size) {
      return [r, c];
    }
    len -= 1;
  }
  return start;
};

// Letter grid with drag-to-select (or tap first letter, then tap last letter).
// found: [{ id, cells, color }]; onSelect(cells) is called with a straight line of cells.
export default function LetterGrid({ puzzle, width, found, hintCell, disabled, onSelect }) {
  const { size, grid } = puzzle;
  const cell = width / size;
  const [selection, setSelection] = useState(null); // { start, end }
  const [pending, setPending] = useState(null); // tap-tap mode start cell
  const pulse = useRef(new Animated.Value(0)).current;

  const live = useRef({});
  live.current = { cell, size, disabled, onSelect, pending };

  useEffect(() => {
    if (!hintCell) {
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 450, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [hintCell, pulse]);

  const responder = useMemo(() => {
    const cellAt = (x, y) => {
      const { cell: c, size: n } = live.current;
      return [Math.min(n - 1, Math.max(0, Math.floor(y / c))), Math.min(n - 1, Math.max(0, Math.floor(x / c)))];
    };
    let origin = { x: 0, y: 0 };
    let start = null;
    let end = null;

    const finish = () => {
      if (!start) {
        return;
      }
      const s = start;
      const e = end || start;
      start = null;
      end = null;
      setSelection(null);
      const { pending: p, onSelect: select } = live.current;
      if (s[0] === e[0] && s[1] === e[1]) {
        // A tap: first tap marks the start, second tap finishes the line.
        if (p && (p[0] !== s[0] || p[1] !== s[1])) {
          const cells = lineCells(p, s);
          setPending(null);
          if (cells) {
            select(cells);
          }
        } else {
          setPending(p ? null : s);
        }
        return;
      }
      setPending(null);
      select(lineCells(s, e));
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => !live.current.disabled,
      onMoveShouldSetPanResponder: () => !live.current.disabled,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (ev) => {
        const { pageX, pageY, locationX, locationY } = ev.nativeEvent;
        origin = { x: pageX - locationX, y: pageY - locationY };
        start = cellAt(locationX, locationY);
        end = start;
        setSelection({ start, end });
      },
      onPanResponderMove: (ev) => {
        if (!start) {
          return;
        }
        const next = snapEnd(start, cellAt(ev.nativeEvent.pageX - origin.x, ev.nativeEvent.pageY - origin.y), live.current.size);
        if (next[0] !== end[0] || next[1] !== end[1]) {
          end = next;
          setSelection({ start, end });
        }
      },
      onPanResponderRelease: finish,
      onPanResponderTerminate: finish,
    });
  }, []);

  const foundCells = new Set(found.flatMap((f) => f.cells.map(([r, c]) => `${r}_${c}`)));
  const fontSize = cell * (puzzle.lang === 'en' ? 0.48 : 0.44);

  return (
    <View style={{ width, height: width }} {...responder.panHandlers}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        {found.map((f) => (
          <Capsule key={f.id} from={f.cells[0]} to={f.cells[f.cells.length - 1]} cell={cell} color={f.color} />
        ))}
        {selection ? (
          <Capsule from={selection.start} to={selection.end} cell={cell} color={GC.yellow} opacity={0.6} />
        ) : null}
        {pending ? <Capsule from={pending} to={pending} cell={cell} color={GC.orange} opacity={0.5} /> : null}
        {hintCell ? (
          <Animated.View
            style={[
              styles.hint,
              {
                left: hintCell[1] * cell + cell * 0.08,
                top: hintCell[0] * cell + cell * 0.08,
                width: cell * 0.84,
                height: cell * 0.84,
                borderRadius: cell * 0.42,
                opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
              },
            ]}
          />
        ) : null}
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((letter, c) => (
              <View key={c} style={[styles.cell, { width: cell, height: cell }]}>
                <Text
                  style={[styles.letter, { fontSize }, foundCells.has(`${r}_${c}`) && styles.letterFound]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {letter}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  capsule: { position: 'absolute' },
  hint: { position: 'absolute', borderWidth: 4, borderColor: GC.orange, backgroundColor: 'rgba(255,197,49,0.35)' },
  row: { flexDirection: 'row' },
  cell: { alignItems: 'center', justifyContent: 'center' },
  letter: { color: '#5A2D14', fontWeight: '800', includeFontPadding: false, textAlign: 'center' },
  letterFound: { color: '#3A1A08' },
});
