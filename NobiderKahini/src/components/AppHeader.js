import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme';

export default function AppHeader({ title, subtitle, emoji, onBack }) {
  return (
    <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />

      <View style={styles.topRow}>
        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtn} />
        )}
        <View style={styles.titleBox}>
          {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        <View style={styles.backBtn} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FFFFFF22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { color: Colors.white, fontSize: 26, lineHeight: 30 },
  titleBox: { flex: 1, alignItems: 'center' },
  emoji: { fontSize: 36, marginBottom: 6 },
  title: { color: Colors.white, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  subtitle: { color: Colors.gold, fontSize: 12, marginTop: 4, textAlign: 'center' },
});
