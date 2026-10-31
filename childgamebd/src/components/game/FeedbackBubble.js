import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text } from 'react-native';
import { GC, shadow } from './gameTheme';

const LOOK = {
  success: { bg: GC.green, image: require('../../assets/images/common/party.webp') },
  retry: { bg: GC.orange, image: require('../../assets/images/common/muscle.webp') },
};

// Pops up a friendly message, e.g. { type: 'success', text: 'খুব ভালো!', key: Date.now() }.
export default function FeedbackBubble({ feedback, duration = 1600, style }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!feedback) {
      return undefined;
    }
    anim.setValue(0);
    const seq = Animated.sequence([
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 12 }),
      Animated.delay(duration),
      Animated.timing(anim, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]);
    seq.start();
    return () => seq.stop();
  }, [feedback, duration, anim]);

  if (!feedback) {
    return null;
  }
  const look = LOOK[feedback.type] || LOOK.success;
  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[
        styles.bubble,
        { backgroundColor: look.bg },
        {
          opacity: anim,
          transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) }],
        },
        style,
      ]}
    >
      <Image source={look.image} style={styles.icon} />
      <Text style={styles.text}>{feedback.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: GC.white,
    zIndex: 20,
    ...shadow(10),
  },
  icon: { width: 30, height: 30, marginRight: 8 },
  text: { color: GC.white, fontSize: 20, fontWeight: '800', textAlign: 'center' },
});
