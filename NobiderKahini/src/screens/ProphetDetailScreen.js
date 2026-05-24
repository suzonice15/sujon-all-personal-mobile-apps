import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../theme';

export default function ProphetDetailScreen({ route, navigation }) {
  const { prophet } = route.params;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />

      <LinearGradient colors={[Colors.primaryDark, Colors.primary]} style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← ফিরে যান</Text>
        </TouchableOpacity>
        <Text style={styles.emoji}>{prophet.emoji}</Text>
        <Text style={styles.name}>{prophet.name}</Text>
        <Text style={styles.title}>{prophet.title}</Text>
      </LinearGradient>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>জীবনকাহিনী</Text>
          <Text style={styles.details}>{prophet.details}</Text>
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20, alignItems: 'center' },
  backBtn: { alignSelf: 'flex-start', marginBottom: 16 },
  backText: { color: Colors.white, fontSize: 15 },
  emoji: { fontSize: 60, marginBottom: 12 },
  name: { color: Colors.white, fontSize: 22, fontWeight: 'bold', textAlign: 'center' },
  title: { color: Colors.gold, fontSize: 14, marginTop: 6, textAlign: 'center' },
  body: { flex: 1 },
  card: {
    backgroundColor: Colors.white,
    margin: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  details: { fontSize: 16, color: Colors.text, lineHeight: 28 },
});
