import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GameButton from './GameButton';
import { GC, shadow } from './gameTheme';

export default function PausePanel({ onResume, onRestart, onExit }) {
  return (
    <View style={styles.backdrop} accessibilityViewIsModal>
      <View style={styles.card}>
        <MaterialIcons name="pause-circle-filled" size={64} color={GC.orange} style={styles.icon} />
        <Text style={styles.title}>খেলা থেমে আছে</Text>
        <Text style={styles.subtitle}>তৈরি হলে আবার খেলা শুরু করো!</Text>
        <GameButton title="চালিয়ে যাও" iconLeft="play-arrow" variant="green" onPress={onResume} style={styles.btn} />
        <GameButton title="আবার শুরু" iconLeft="replay" variant="light" size="small" onPress={onRestart} style={styles.btn} />
        <GameButton title="সব লেভেল" iconLeft="map" variant="light" size="small" onPress={onExit} style={styles.btn} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(40, 25, 10, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
    elevation: 50,
  },
  card: {
    width: '82%',
    maxWidth: 380,
    backgroundColor: GC.cream,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 20,
    alignItems: 'stretch',
    ...shadow(12),
  },
  icon: { alignSelf: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: GC.ink, textAlign: 'center', marginTop: 4 },
  subtitle: { fontSize: 15, fontWeight: '600', color: GC.inkSoft, textAlign: 'center', marginBottom: 8 },
  btn: { marginTop: 10 },
});
