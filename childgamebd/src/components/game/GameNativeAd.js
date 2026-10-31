import React from 'react';
import { StyleSheet, View } from 'react-native';
import AdNative from '../ads/AdNative';
import { GC } from './gameTheme';

// Native ad in a rounded white frame for each game's first screen. Renders nothing until an ad loads.
export default function GameNativeAd({ style }) {
  return (
    <View style={[styles.frame, style]}>
      <AdNative ignoreCooldown />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { width: '100%', borderRadius: 18, overflow: 'hidden', backgroundColor: GC.white },
});
