import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, PanResponder, StyleSheet, View } from 'react-native';
import { GC } from '../../../../components/game';
import { TRACE_GRID_SIZE } from '../../../../data/game01_letterAdventure';

export const TRACE_PASS = 0.75; // share of the letter's cells that must be covered
export const PAD_BG = '#FFFDF8'; // must match PAD_BG in scripts/assets/generate_game01_assets.py
const MAX_OUTSIDE = 0.35; // share of drawn points allowed off the letter
const BRUSH = 0.075; // brush radius as a share of the pad: wider than the letter's strokes
const MAX_SEGMENTS = 1200;

// One piece of the ink line: a rounded capsule from (x1,y1) to (x2,y2).
const Segment = memo(({ x1, y1, x2, y2, r, color }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  return (
    <View
      style={[
        styles.segment,
        {
          left: (x1 + x2) / 2 - (len + r * 2) / 2,
          top: (y1 + y2) / 2 - r,
          width: len + r * 2,
          height: r * 2,
          borderRadius: r,
          backgroundColor: color,
          transform: [{ rotate: `${angle}rad` }],
        },
      ]}
    />
  );
});

// Finger-tracing surface. The ink is a thick solid line drawn *under* a stencil of the letter,
// so it only shows inside the letter and fills it edge to edge.
// Reports coverage (0..1) while drawing and judges on finger lift:
// onResult('done') when the letter is traced well, onResult('outside') when too much ink missed it.
export default function TracePad({ letter, size, locked, onProgress, onResult, resetKey }) {
  const grid = letter.traceGrid;
  const targetCount = useMemo(() => grid.split('').filter((c) => c === '1').length, [grid]);
  const [segments, setSegments] = useState([]);
  const hint = useRef(new Animated.Value(0)).current;

  const stateRef = useRef(null);
  const resetState = () => {
    stateRef.current = { covered: new Set(), inside: 0, outside: 0, last: null, count: 0, origin: { x: 0, y: 0 } };
  };
  if (!stateRef.current) {
    resetState();
  }

  const live = useRef({});
  live.current = { size, locked, onProgress, onResult, grid, targetCount };

  useEffect(() => {
    resetState();
    setSegments([]);
    onProgress?.(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, letter.id]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(hint, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(hint, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [hint]);

  const responder = useMemo(() => {
    // Marks the grid cells under the brush at (x, y) and counts the point as on/off the letter.
    const mark = (x, y) => {
      const { size: s, grid: g } = live.current;
      const st = stateRef.current;
      const cell = s / TRACE_GRID_SIZE;
      const col = Math.floor(x / cell);
      const row = Math.floor(y / cell);
      const inPad = col >= 0 && row >= 0 && col < TRACE_GRID_SIZE && row < TRACE_GRID_SIZE;
      if (!inPad || g[row * TRACE_GRID_SIZE + col] === '0') {
        st.outside += 1;
      } else {
        st.inside += 1;
      }
      const reach = s * BRUSH + cell * 0.3;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const r = row + dr;
          const c = col + dc;
          if (r < 0 || c < 0 || r >= TRACE_GRID_SIZE || c >= TRACE_GRID_SIZE) {
            continue;
          }
          const dist = Math.hypot((c + 0.5) * cell - x, (r + 0.5) * cell - y);
          if (g[r * TRACE_GRID_SIZE + c] === '1' && dist <= reach) {
            st.covered.add(r * TRACE_GRID_SIZE + c);
          }
        }
      }
    };

    const addPoint = (x, y, startStroke) => {
      const st = stateRef.current;
      const s = live.current.size;
      if (startStroke || !st.last) {
        st.last = { x, y };
        mark(x, y);
        if (st.count < MAX_SEGMENTS) {
          st.count += 1;
          const id = st.count;
          setSegments((prev) => prev.concat({ id, x1: x, y1: y, x2: x, y2: y }));
        }
      } else {
        const dist = Math.hypot(x - st.last.x, y - st.last.y);
        if (dist < s * 0.02) {
          return;
        }
        // Sample along the move so fast swipes still mark every cell they cross.
        const steps = Math.ceil(dist / (s * 0.03));
        for (let i = 1; i <= steps; i++) {
          mark(st.last.x + ((x - st.last.x) * i) / steps, st.last.y + ((y - st.last.y) * i) / steps);
        }
        const from = st.last;
        st.last = { x, y };
        if (st.count < MAX_SEGMENTS) {
          st.count += 1;
          const id = st.count;
          setSegments((prev) => prev.concat({ id, x1: from.x, y1: from.y, x2: x, y2: y }));
        }
      }
      live.current.onProgress?.(st.covered.size / live.current.targetCount);
    };

    const judge = () => {
      const st = stateRef.current;
      st.last = null;
      const coverage = st.covered.size / live.current.targetCount;
      if (coverage < TRACE_PASS) {
        return;
      }
      const outsideShare = st.outside / Math.max(1, st.inside + st.outside);
      live.current.onResult?.(outsideShare <= MAX_OUTSIDE ? 'done' : 'outside');
    };

    return PanResponder.create({
      onStartShouldSetPanResponder: () => !live.current.locked,
      onMoveShouldSetPanResponder: () => !live.current.locked,
      onPanResponderTerminationRequest: () => false,
      onPanResponderGrant: (e) => {
        const { pageX, pageY, locationX, locationY } = e.nativeEvent;
        stateRef.current.origin = { x: pageX - locationX, y: pageY - locationY };
        addPoint(locationX, locationY, true);
      },
      onPanResponderMove: (e) => {
        const { origin } = stateRef.current;
        addPoint(e.nativeEvent.pageX - origin.x, e.nativeEvent.pageY - origin.y, false);
      },
      onPanResponderRelease: judge,
      onPanResponderTerminate: judge,
    });
  }, []);

  const firstCell = grid.indexOf('1');
  const cell = size / TRACE_GRID_SIZE;
  const hintX = ((firstCell % TRACE_GRID_SIZE) + 0.5) * cell;
  const hintY = (Math.floor(firstCell / TRACE_GRID_SIZE) + 0.5) * cell;
  const inkColor = locked ? GC.green : GC.red;
  const brush = size * BRUSH;
  const showHint = segments.length === 0 && !locked;

  return (
    <View style={[styles.pad, { width: size, height: size }]} {...responder.panHandlers}>
      <View pointerEvents="none" style={StyleSheet.absoluteFill}>
        <Image source={letter.traceImage} style={{ width: size, height: size }} resizeMode="contain" />
        {segments.map((sg) => (
          <Segment key={sg.id} x1={sg.x1} y1={sg.y1} x2={sg.x2} y2={sg.y2} r={brush} color={inkColor} />
        ))}
        <Image source={letter.traceStencil} style={[StyleSheet.absoluteFill, { width: size, height: size }]} resizeMode="contain" />
        {showHint ? <View style={[styles.startDot, { left: hintX - 11, top: hintY - 11 }]} /> : null}
        {showHint ? (
          <Animated.Text
            style={[
              styles.hand,
              {
                left: hintX - 6,
                top: hintY - 2,
                transform: [{ translateY: hint.interpolate({ inputRange: [0, 1], outputRange: [0, 14] }) }],
              },
            ]}
          >
            👆
          </Animated.Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pad: { backgroundColor: PAD_BG, borderRadius: 24, overflow: 'hidden' },
  segment: { position: 'absolute' },
  hand: { position: 'absolute', fontSize: 42 },
  startDot: {
    position: 'absolute',
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GC.red,
    borderWidth: 4,
    borderColor: GC.white,
  },
});
