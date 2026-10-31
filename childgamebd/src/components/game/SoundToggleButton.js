import React, { useEffect, useState } from 'react';
import RoundIconButton from './RoundIconButton';
import { GC } from './gameTheme';
import { isMuted, setMuted, subscribeMuted } from '../../utils/gameAudio';

// Turns all game voices and sounds on/off (shared across games for this app session).
export default function SoundToggleButton({ style, size }) {
  const [muted, setMutedState] = useState(isMuted());

  useEffect(() => subscribeMuted(setMutedState), []);

  return (
    <RoundIconButton
      icon={muted ? 'volume-off' : 'volume-up'}
      color={muted ? GC.inkSoft : GC.blue}
      size={size}
      tapSound={!muted}
      accessibilityLabel={muted ? 'শব্দ চালু করো' : 'শব্দ বন্ধ করো'}
      onPress={() => setMuted(!muted)}
      style={style}
    />
  );
}
