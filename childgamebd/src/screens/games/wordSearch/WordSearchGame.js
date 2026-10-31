import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import {
  FeedbackBubble,
  GC,
  LevelResultPanel,
  PausePanel,
  RoundIconButton,
  StatPill,
  WoodBanner,
  shadow,
} from '../../../components/game';
import {
  GAME_ID,
  LEVELS,
  PRAISE,
  PROMPTS,
  TRACKS,
  buildPuzzle,
  matchSelection,
  starsFor,
} from '../../../data/game04_wordSearch';
import { saveLevelStars } from '../../../db/gameProgress';
import { SFX, playClip, playSequence, stopAudio } from '../../../utils/gameAudio';
import { formatClock, toBanglaDigits } from '../../../utils/banglaNumber';
import LetterGrid, { WORD_COLORS } from './components/LetterGrid';
import WordChip from './components/WordChip';

const CLOCK = require('../../../assets/images/common/alarm_clock.webp');
const CHECK = require('../../../assets/images/common/check_mark.webp');
const BULB = require('../../../assets/images/common/light_bulb.webp');

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// One puzzle (one level). Remount with a new `key` to restart.
export default function WordSearchGame({ lang, levelIndex, onExit, onRestart, onNextLevel }) {
  const lvl = LEVELS[levelIndex];
  const puzzle = useMemo(() => buildPuzzle(lang, levelIndex), [lang, levelIndex]);
  const colorOf = useMemo(
    () => Object.fromEntries(puzzle.words.map((w, i) => [w.id, WORD_COLORS[i % WORD_COLORS.length]])),
    [puzzle],
  );

  const [foundIds, setFoundIds] = useState([]);
  const [timeLeft, setTimeLeft] = useState(lvl.time);
  const [phase, setPhase] = useState('play'); // play | done
  const [paused, setPaused] = useState(false);
  const [hintCell, setHintCell] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gridBox, setGridBox] = useState(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const result = useRef(null);

  useEffect(() => {
    playClip(PROMPTS.findWords.audio);
  }, []);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        setPaused(true);
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (phase !== 'play' || paused) {
      return undefined;
    }
    const tick = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(tick);
  }, [phase, paused]);

  const finish = useCallback(
    (allFound, found, left) => {
      const stars = starsFor({ allFound, hintsUsed, timeLeft: left, totalTime: lvl.time });
      result.current = { stars, found: found.length, seconds: lvl.time - left };
      setPhase('done');
      if (stars > 0) {
        playSequence([SFX.celebrate, PROMPTS.allFound.audio]);
        saveLevelStars(GAME_ID, lang, lvl.id, stars).catch(() => setSaveFailed(true));
      } else {
        playSequence([SFX.wrong, PROMPTS.timeUp.audio]);
      }
    },
    [hintsUsed, lvl, lang],
  );

  useEffect(() => {
    if (phase === 'play' && timeLeft <= 0) {
      finish(false, foundIds, 0);
    }
  }, [timeLeft, phase, finish, foundIds]);

  const onSelect = (cells) => {
    if (phase !== 'play' || paused || !cells || cells.length < 2) {
      return;
    }
    const word = matchSelection(puzzle, cells, foundIds);
    if (!word) {
      setFeedback({ type: 'retry', text: 'আবার দেখো!', key: Date.now() });
      playClip(SFX.wrong);
      return;
    }
    const next = [...foundIds, word.id];
    setFoundIds(next);
    setHintCell(null);
    if (next.length === puzzle.words.length) {
      setFeedback({ type: 'success', text: 'সব শব্দ পেয়েছো!', key: Date.now() });
      finish(true, next, timeLeft);
      return;
    }
    const praise = pickRandom(PRAISE);
    setFeedback({ type: 'success', text: `${word.label}! ${praise.text}`, key: Date.now() });
    playSequence([SFX.correct, word.audio]);
  };

  const giveHint = () => {
    const left = puzzle.words.filter((w) => !foundIds.includes(w.id));
    if (!left.length || phase !== 'play') {
      return;
    }
    const word = pickRandom(left);
    setHintCell(word.cells[0]);
    setHintsUsed((h) => h + 1);
    playClip(word.audio);
  };

  if (phase === 'done') {
    const { stars, found, seconds } = result.current;
    return (
      <View style={styles.body}>
        <LevelResultPanel
          levelNumber={levelIndex + 1}
          stars={stars}
          stats={[
            {
              key: 'found',
              image: CHECK,
              label: 'খুঁজে পেয়েছো',
              value: `${toBanglaDigits(found)} / ${toBanglaDigits(puzzle.words.length)}`,
              color: GC.greenDark,
            },
            { key: 'time', image: CLOCK, label: 'সময়', value: formatClock(seconds), color: GC.ink },
            { key: 'hint', image: BULB, label: 'হিন্ট', value: toBanglaDigits(hintsUsed), color: GC.orange },
          ]}
          passText={PROMPTS.allFound.text}
          failText="সময় শেষ হওয়ার আগে সব শব্দ খুঁজে পেলে পরের লেভেল খুলবে।"
          hint={PROMPTS.timeUp.text}
          hasNext={levelIndex + 1 < LEVELS.length}
          onHome={onExit}
          onReplay={onRestart}
          onNext={onNextLevel}
        >
          <View style={styles.resultWords}>
            {puzzle.words.map((w) => (
              <View
                key={w.id}
                style={[styles.resultWord, foundIds.includes(w.id) ? { backgroundColor: colorOf[w.id] } : styles.resultMissed]}
              >
                <Image source={w.image} style={styles.resultPicture} resizeMode="contain" />
                <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                  {w.label}
                </Text>
              </View>
            ))}
          </View>
        </LevelResultPanel>
        {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}
      </View>
    );
  }

  const gridWidth = gridBox ? Math.floor(Math.min(gridBox.width, gridBox.height) - 20) : 0;

  return (
    <View style={styles.body}>
      <View style={styles.topRow}>
        <RoundIconButton icon="home" size={46} accessibilityLabel="সব লেভেল" onPress={onExit} />
        <StatPill
          image={CLOCK}
          value={formatClock(timeLeft)}
          alert={timeLeft <= 10}
          accessibilityLabel={`বাকি সময় ${timeLeft} সেকেন্ড`}
        />
        <View style={styles.topButtons}>
          <RoundIconButton
            icon="lightbulb"
            size={46}
            color={GC.white}
            background={GC.yellow}
            accessibilityLabel="হিন্ট"
            onPress={giveHint}
          />
          <RoundIconButton
            icon="pause"
            size={46}
            color={GC.white}
            background={GC.orange}
            accessibilityLabel="খেলা থামাও"
            onPress={() => {
              stopAudio();
              setPaused(true);
            }}
            style={styles.pauseBtn}
          />
        </View>
      </View>

      <WoodBanner size="small" style={styles.banner}>
        {TRACKS[lang].instruction} • লেভেল {toBanglaDigits(levelIndex + 1)}
      </WoodBanner>

      <View style={styles.wordsBoard}>
        {puzzle.words.map((w) => (
          <WordChip
            key={w.id}
            word={w}
            color={colorOf[w.id]}
            found={foundIds.includes(w.id)}
            onPress={() => playClip(w.audio)}
          />
        ))}
      </View>

      <View style={styles.gridArea} onLayout={(e) => setGridBox(e.nativeEvent.layout)}>
        {gridWidth > 0 ? (
          <View style={styles.gridCard}>
            <LetterGrid
              puzzle={puzzle}
              width={gridWidth}
              found={puzzle.words.filter((w) => foundIds.includes(w.id)).map((w) => ({ ...w, color: colorOf[w.id] }))}
              hintCell={hintCell}
              disabled={paused}
              onSelect={onSelect}
            />
          </View>
        ) : null}
      </View>
      <Text style={styles.howTo}>আঙুল দিয়ে প্রথম অক্ষর থেকে শেষ অক্ষর পর্যন্ত টানো</Text>

      <FeedbackBubble feedback={feedback} duration={900} style={styles.feedback} />
      {paused ? (
        <PausePanel onResume={() => setPaused(false)} onRestart={onRestart} onExit={onExit} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  topButtons: { flexDirection: 'row' },
  pauseBtn: { marginLeft: 8 },
  banner: { marginTop: 10 },
  wordsBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    backgroundColor: GC.wood,
    borderRadius: 18,
    padding: 4,
    borderWidth: 3,
    borderColor: GC.woodDark,
    ...shadow(4),
  },
  gridArea: { flex: 1, marginTop: 10, alignItems: 'center', justifyContent: 'center' },
  gridCard: {
    padding: 8,
    backgroundColor: GC.cream,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: GC.wood,
    ...shadow(8),
  },
  howTo: { textAlign: 'center', fontSize: 13, fontWeight: '700', color: GC.ink, marginVertical: 6 },
  feedback: { top: '40%' },
  resultWords: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 },
  resultWord: {
    width: '30%',
    margin: '1.5%',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: GC.white,
  },
  resultMissed: { backgroundColor: '#EEEEEE', opacity: 0.6 },
  resultPicture: { width: 44, height: 44 },
  resultText: { fontSize: 15, fontWeight: '800', color: GC.ink, marginTop: 2 },
  saveError: {
    textAlign: 'center',
    color: GC.redDark,
    fontWeight: '700',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    borderRadius: 12,
    paddingVertical: 4,
  },
});
