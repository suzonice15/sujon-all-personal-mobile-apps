import React from 'react';
import { ImageBackground, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_BG = require('../../assets/images/game01/bg_adventure.jpg');

export default function GameBackground({ children, source = DEFAULT_BG, style }) {
  return (
    <ImageBackground source={source} style={styles.fill} resizeMode="cover">
      <StatusBar barStyle="dark-content" backgroundColor="#6EC0F5" />
      <SafeAreaView style={[styles.fill, style]} edges={['top', 'bottom', 'left', 'right']}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
