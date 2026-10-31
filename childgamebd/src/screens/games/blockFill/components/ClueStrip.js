import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GC, PressableScale } from '../../../../components/game';
import { toBanglaDigits } from '../../../../utils/banglaNumber';

// Every clue as a small chip: number, direction arrow and picture. Solved clues get a tick.
export default function ClueStrip({ words, activeId, solvedIds, lang, onPress }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.strip}>
      {words.map((w) => {
        const solved = solvedIds.includes(w.id);
        const active = w.id === activeId;
        return (
          <PressableScale
            key={w.id}
            onPress={() => onPress(w)}
            accessibilityLabel={`${w.num} ${w.dir === 'across' ? 'আড়াআড়ি' : 'নিচে'}`}
            style={[
              styles.chip,
              w.dir === 'across' ? styles.across : styles.down,
              active && styles.active,
              solved && styles.solved,
            ]}
          >
            <Text style={styles.num}>{lang === 'en' ? w.num : toBanglaDigits(w.num)}</Text>
            <MaterialIcons name={w.dir === 'across' ? 'arrow-forward' : 'arrow-downward'} size={16} color={GC.ink} />
            <Image source={w.image} style={styles.picture} resizeMode="contain" />
            {solved ? (
              <View style={styles.tick}>
                <MaterialIcons name="check" size={12} color={GC.white} />
              </View>
            ) : null}
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  strip: { paddingHorizontal: 2, paddingVertical: 6 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    borderRadius: 16,
    borderWidth: 2.5,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: GC.white,
  },
  across: { borderColor: '#F5A3C0' },
  down: { borderColor: '#A3C8F5' },
  active: { backgroundColor: '#FFF3C4', borderColor: GC.yellow },
  solved: { backgroundColor: '#DDF5E7', borderColor: GC.green },
  num: { fontSize: 15, fontWeight: '800', color: GC.ink, marginRight: 1 },
  picture: { width: 28, height: 28, marginLeft: 2 },
  tick: {
    position: 'absolute',
    top: -6,
    right: -5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: GC.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
