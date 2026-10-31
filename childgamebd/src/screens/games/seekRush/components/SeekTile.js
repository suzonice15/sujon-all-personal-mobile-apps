import React, { memo, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale, shadow } from '../../../../components/game';

// state: undefined | 'found' | 'wrong' | 'reveal'   (wrongKey re-triggers the shake)
function SeekTile({ text, width, height, fontSize, state, wrongKey, disabled, onPress }) {
  const shake = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!wrongKey) {
      return;
    }
    shake.setValue(0);
    Animated.sequence(
      [9, -9, 7, -7, 3, 0].map((toValue) => Animated.timing(shake, { toValue, duration: 50, useNativeDriver: true })),
    ).start();
  }, [wrongKey, shake]);

  return (
    <Animated.View style={{ transform: [{ translateX: shake }] }}>
      <PressableScale
        onPress={onPress}
        disabled={disabled || state === 'found'}
        tapSound={false}
        accessibilityLabel={text}
        style={[
          styles.tile,
          { width, height },
          state === 'found' && styles.found,
          state === 'wrong' && styles.wrong,
          state === 'reveal' && styles.reveal,
        ]}
      >
        <Text
          style={[styles.text, { fontSize }, state === 'found' && styles.textFound]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {text}
        </Text>
        {state === 'found' ? (
          <View style={styles.badge}>
            <MaterialIcons name="check" size={14} color={GC.white} />
          </View>
        ) : null}
      </PressableScale>
    </Animated.View>
  );
}

export default memo(SeekTile);

const styles = StyleSheet.create({
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBEBCF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F3DDB6',
    borderBottomWidth: 5,
    borderBottomColor: '#E6C995',
    paddingHorizontal: 4,
    ...shadow(2),
  },
  found: { backgroundColor: '#DDF5E7', borderColor: GC.green, borderBottomColor: GC.greenDark },
  wrong: { backgroundColor: '#FDE3E6', borderColor: GC.red, borderBottomColor: GC.redDark },
  reveal: { backgroundColor: '#FFF3C4', borderColor: GC.yellow, borderBottomColor: '#E8A800' },
  text: { color: '#5A3214', fontWeight: '800', includeFontPadding: false },
  textFound: { color: GC.greenDark },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GC.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: GC.white,
  },
});
