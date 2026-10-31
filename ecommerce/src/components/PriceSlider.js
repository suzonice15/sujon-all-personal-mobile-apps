import React, { useRef, useState, useCallback } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 22;

export default function PriceSlider({ min, max, valueMin, valueMax, onValueMinChange, onValueMaxChange, trackColor = '#EB592C' }) {
  const trackRef = useRef(null);
  const trackWidthRef = useRef(0);
  const [trackWidth, setTrackWidth] = useState(0);

  const valueRef = useRef({ valueMin, valueMax, min, max });
  valueRef.current = { valueMin, valueMax, min, max };

  const updateValue = useCallback((pageX, isMin) => {
    trackRef.current?.measureInWindow((tx, ty, tw) => {
      if (!tw) return;
      const relX = pageX - tx;
      const thumbCenter = THUMB_SIZE / 2;
      const x = Math.max(0, Math.min(relX - thumbCenter, tw - THUMB_SIZE));
      const ratio = x / (tw - THUMB_SIZE);
      const { min: mn, max: mx, valueMin: vMin, valueMax: vMax } = valueRef.current;
      const range = mx - mn || 1;
      const raw = Math.round(mn + ratio * range);
      if (isMin) {
        const clamped = Math.min(raw, vMax);
        onValueMinChange(clamped);
      } else {
        const clamped = Math.max(raw, vMin);
        onValueMaxChange(clamped);
      }
    });
  }, [onValueMinChange, onValueMaxChange]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const { x0 } = gestureState;
        const distToMin = Math.abs(computeThumbCenter(valueRef.current.valueMin, valueRef.current.min, valueRef.current.max, trackWidthRef.current) - (x0 || 0));
        const distToMax = Math.abs(computeThumbCenter(valueRef.current.valueMax, valueRef.current.min, valueRef.current.max, trackWidthRef.current) - (x0 || 0));
        const isMin = distToMin <= distToMax;
        updateValue(x0, isMin);
      },
      onPanResponderMove: (_, gestureState) => {
        if (!trackWidthRef.current) return;
        const { moveX } = gestureState;
        const distToMin = Math.abs(computeThumbCenter(valueRef.current.valueMin, valueRef.current.min, valueRef.current.max, trackWidthRef.current) - moveX);
        const distToMax = Math.abs(computeThumbCenter(valueRef.current.valueMax, valueRef.current.min, valueRef.current.max, trackWidthRef.current) - moveX);
        const isMin = distToMin <= distToMax;
        updateValue(moveX, isMin);
      },
    })
  ).current;

  const range = max - min || 1;
  const ratioMin = (valueMin - min) / range;
  const ratioMax = (valueMax - min) / range;
  const leftMin = ratioMin * (trackWidth - THUMB_SIZE);
  const leftMax = ratioMax * (trackWidth - THUMB_SIZE);

  return (
    <View style={styles.wrapper}>
      <View
        style={styles.trackContainer}
        ref={trackRef}
        onLayout={(e) => {
          const w = e.nativeEvent.layout.width;
          trackWidthRef.current = w;
          setTrackWidth(w);
        }}
        {...panResponder.panHandlers}
      >
        <View style={[styles.trackBg, { backgroundColor: '#E5E7EB' }]} />
        <View
          style={[
            styles.trackFill,
            {
              backgroundColor: trackColor,
              left: Math.max(0, leftMin + THUMB_SIZE / 2),
              width: Math.max(0, leftMax - leftMin),
            },
          ]}
        />
        <View style={[styles.thumb, styles.thumbMin, { backgroundColor: trackColor, transform: [{ translateX: leftMin }] }]} />
        <View style={[styles.thumb, styles.thumbMax, { backgroundColor: trackColor, transform: [{ translateX: leftMax }] }]} />
      </View>
    </View>
  );
}

function computeThumbCenter(val, mn, mx, trackW) {
  if (!trackW) return 0;
  const range = mx - mn || 1;
  const ratio = (val - mn) / range;
  return ratio * (trackW - THUMB_SIZE) + THUMB_SIZE / 2;
}

const styles = StyleSheet.create({
  wrapper: { paddingVertical: 12 },
  trackContainer: {
    height: THUMB_SIZE + 16,
    justifyContent: 'center',
    position: 'relative',
  },
  trackBg: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
  },
  trackFill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    top: (THUMB_SIZE + 16 - TRACK_HEIGHT) / 2,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    top: 8,
  },
  thumbMin: {},
  thumbMax: {},
});
