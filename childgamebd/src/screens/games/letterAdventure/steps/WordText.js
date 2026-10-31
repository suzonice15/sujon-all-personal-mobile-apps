import React from 'react';
import { Text } from 'react-native';
import { GC } from '../../../../components/game';
import { splitWord } from '../../../../data/game01_letterAdventure';

// Word with the lesson's letter coloured, e.g. "অজগর" with অ in red.
export default function WordText({ letter, text, highlight = true, style }) {
  if (!highlight) {
    return (
      <Text style={style} numberOfLines={1} adjustsFontSizeToFit>
        {text}
      </Text>
    );
  }
  const { before, match, after } = splitWord(letter, text);
  return (
    <Text style={style} numberOfLines={1} adjustsFontSizeToFit>
      {before}
      <Text style={{ color: GC.red }}>{match}</Text>
      {after}
    </Text>
  );
}
