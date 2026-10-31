import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale, shadow } from '../../../../components/game';

// The riddle/question with a pulsing speaker to hear it again.
export default function ClueCard({ clue, onSpeak }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    enter.setValue(0);
    Animated.spring(enter, { toValue: 1, useNativeDriver: true, speed: 10, bounciness: 8 }).start();
  }, [clue, enter]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: enter, transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.92, 1] }) }] },
      ]}
    >
      <View style={styles.speakerWrap}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.ring,
            {
              opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] }),
              transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }],
            },
          ]}
        />
        <PressableScale onPress={onSpeak} tapSound={false} accessibilityLabel="ইশারাটি আবার শোনো" style={styles.speaker}>
          <MaterialIcons name="volume-up" size={32} color={GC.white} />
        </PressableScale>
      </View>
      <Text style={styles.clue} adjustsFontSizeToFit numberOfLines={5}>
        {clue}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GC.cream,
    borderRadius: 26,
    borderWidth: 4,
    borderColor: GC.wood,
    paddingVertical: 12,
    paddingHorizontal: 12,
    minHeight: 96,
    ...shadow(6),
  },
  speakerWrap: { width: 64, height: 64, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 56, height: 56, borderRadius: 28, backgroundColor: GC.blue },
  speaker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: GC.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#D6E6FF',
  },
  clue: { flex: 1, marginLeft: 12, fontSize: 19, lineHeight: 28, fontWeight: '800', color: '#5A2D14' },
});
