import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FeedbackBubble, GC, GameButton, WoodBanner, shadow } from '../../../../components/game';
import { PROMPT_AUDIO, PROMPT_TEXT } from '../../../../data/game01_letterAdventure';
import { SFX, playSequence } from '../../../../utils/gameAudio';
import { toBanglaDigits } from '../../../../utils/banglaNumber';
import TracePad, { TRACE_PASS } from './TracePad';

export default function TraceStep({ letter, completed, onComplete }) {
  const [box, setBox] = useState(null);
  const [coverage, setCoverage] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    playSequence([PROMPT_AUDIO.trace, letter.audio]);
  }, [letter]);

  const handleResult = (result) => {
    if (result === 'done') {
      setFeedback({ type: 'success', text: PROMPT_TEXT.traceDone, key: Date.now() });
      playSequence([SFX.correct, PROMPT_AUDIO.traceDone]);
      onComplete();
    } else {
      setFeedback({ type: 'retry', text: 'লাইনের ওপর দিয়ে লিখো!', key: Date.now() });
      playSequence([SFX.wrong, PROMPT_AUDIO.traceOutside]);
      setResetKey((k) => k + 1);
    }
  };

  const clear = () => {
    setResetKey((k) => k + 1);
    setCoverage(0);
  };

  const padSize = box ? Math.floor(Math.min(box.width, box.height)) : 0;
  const percent = completed ? 100 : Math.min(100, Math.round((coverage / TRACE_PASS) * 100));

  return (
    <View style={styles.wrap}>
      <WoodBanner>
        আঙুল দিয়ে <Text style={{ color: GC.red }}>‘{letter.display}’</Text> লিখো
      </WoodBanner>
      <View style={styles.card}>
        <View style={styles.padArea} onLayout={(e) => setBox(e.nativeEvent.layout)}>
          {padSize > 0 ? (
            <TracePad
              letter={letter}
              size={padSize}
              locked={completed}
              resetKey={resetKey}
              onProgress={setCoverage}
              onResult={handleResult}
            />
          ) : null}
        </View>
        <View style={styles.footer}>
          <View style={styles.meter} accessibilityLabel={`${percent}%`}>
            <View style={[styles.meterFill, { width: `${percent}%` }, completed && styles.meterDone]} />
            <Text style={styles.meterText}>{completed ? 'সম্পন্ন! ✓' : `${toBanglaDigits(percent)}%`}</Text>
          </View>
          {!completed ? (
            <GameButton title="মুছে ফেলো" iconLeft="refresh" variant="light" size="small" onPress={clear} style={styles.clear} />
          ) : null}
        </View>
      </View>
      <FeedbackBubble feedback={feedback} style={styles.feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1 },
  card: {
    flex: 1,
    marginTop: 10,
    backgroundColor: GC.cream,
    borderRadius: 32,
    borderWidth: 4,
    borderColor: GC.white,
    padding: 12,
    ...shadow(8),
  },
  padArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  footer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  meter: {
    flex: 1,
    height: 30,
    borderRadius: 15,
    backgroundColor: GC.creamDeep,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  meterFill: { position: 'absolute', left: 0, top: 0, bottom: 0, backgroundColor: GC.yellow, borderRadius: 15 },
  meterDone: { backgroundColor: GC.green },
  meterText: { textAlign: 'center', fontSize: 15, fontWeight: '800', color: GC.ink },
  clear: { marginLeft: 10 },
  feedback: { top: '45%' },
});
