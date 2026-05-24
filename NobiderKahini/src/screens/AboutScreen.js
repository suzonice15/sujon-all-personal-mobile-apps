import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.top}>
        <Text style={styles.emoji}>🕌</Text>
        <Text style={styles.appName}>নবীদের কাহিনী</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Row label="অ্যাপের নাম" value="নবীদের কাহিনী" />
        <Row label="ডেভেলপার" value="Sujon Ahmed" />
        <Row label="ক্যাটাগরি" value="ইসলামিক শিক্ষা" />
        <Row label="ভাষা" value="বাংলা" />
        <Row label="ভার্সন" value="1.0.0" />
      </View>

      <Text style={styles.desc}>
        এই অ্যাপটি কুরআন ও হাদিসের আলোকে নবী-রাসূলদের জীবনকাহিনী সহজ বাংলায় উপস্থাপন করে।
      </Text>
    </View>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  top: { paddingTop: 40, paddingBottom: 30, alignItems: 'center' },
  emoji: { fontSize: 52, marginBottom: 10 },
  appName: { color: Colors.white, fontSize: 22, fontWeight: 'bold' },
  version: { color: Colors.gold, fontSize: 13, marginTop: 4 },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  label: { fontSize: 14, color: Colors.textSecondary },
  value: { fontSize: 14, fontWeight: '600', color: Colors.text },
  desc: {
    marginHorizontal: 16,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    textAlign: 'center',
  },
});
