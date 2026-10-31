import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FeedbackBubble,
  GC,
  PausePanel,
  PressableScale,
  RoundDots,
  RoundIconButton,
  StatPill,
  shadow,
} from '../../../components/game';
import {
  ENCOURAGE,
  GAME_ID,
  GRID,
  LEVELS,
  PRAISE,
  RESULT_AUDIO,
  RESULT_TEXT,
  ROUNDS_PER_LEVEL,
  TIME_UP_AUDIO,
  TRACKS,
  buildLevelRounds,
  formatTime,
  promptFor,
  starsForCorrect,
} from '../../../data/game02_wordSeekRush';
import { saveLevelStars } from '../../../db/gameProgress';
import { SFX, playClip, playSequence } from '../../../utils/gameAudio';
import { toBanglaDigits } from '../../../utils/banglaNumber';
import ResultPanel from './components/ResultPanel';
import SeekTile from './components/SeekTile';

const CLOCK = require('../../../assets/images/common/alarm_clock.webp');
const GAP = 8;
const NEXT_DELAY = 1300;
const TIME_UP_DELAY = 2000;

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// One play-through of a level (10 rounds). Remount with a new `key` to restart.
export default function SeekRushGame({ track, levelIndex, onExit, onRestart, onNextLevel }) {
  const lvl = LEVELS[track][levelIndex];
  const rounds = useMemo(() => buildLevelRounds(track, levelIndex), [track, levelIndex]);
  const prompt = promptFor(track, lvl.stage);
  const grid = GRID[lvl.stage];

  const [roundIndex, setRoundIndex] = useState(0);
  const [found, setFound] = useState(() => new Set());
  const [wrong, setWrong] = useState(null); // { id, key }
  const [phase, setPhase] = useState('play'); // play | reveal | done
  const [timeLeft, setTimeLeft] = useState(lvl.time);
  const [paused, setPaused] = useState(false);
  const [results, setResults] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [box, setBox] = useState(null);
  const [saveFailed, setSaveFailed] = useState(false);
  const mistake = useRef(false);
  const elapsed = useRef(0);
  const timer = useRef(null);

  const round = rounds[roundIndex];
  const correctCount = results.filter(Boolean).length;

  useEffect(() => () => clearTimeout(timer.current), []);

  // Pause when the app goes to the background.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') {
        setPaused(true);
      }
    });
    return () => sub.remove();
  }, []);

  // Say the prompt (first round only) and the thing to find.
  useEffect(() => {
    playSequence(roundIndex === 0 ? [prompt.audio, round.target.audio] : [round.target.audio]);
  }, [roundIndex, round, prompt.audio]);

  // Countdown.
  useEffect(() => {
    if (phase !== 'play' || paused) {
      return undefined;
    }
    const tick = setInterval(() => {
      elapsed.current += 1;
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(tick);
  }, [phase, paused]);

  const finishLevel = useCallback(
    (allResults) => {
      const correct = allResults.filter(Boolean).length;
      const stars = starsForCorrect(correct);
      setPhase('done');
      if (stars > 0) {
        playSequence([SFX.celebrate, RESULT_AUDIO.great]);
        saveLevelStars(GAME_ID, track, lvl.id, stars).catch(() => setSaveFailed(true));
      } else {
        playClip(RESULT_AUDIO.tryAgain);
      }
    },
    [track, lvl.id],
  );

  const endRound = useCallback(
    (correct, timeUp) => {
      const nextResults = [...results, correct];
      setResults(nextResults);
      setPhase('reveal');
      if (timeUp) {
        setFeedback({ type: 'retry', text: RESULT_TEXT.timeUp, key: Date.now() });
        playSequence([SFX.wrong, TIME_UP_AUDIO]);
      } else {
        const praise = pickRandom(PRAISE);
        setFeedback({ type: 'success', text: correct ? praise.text : 'খুঁজে পেয়েছো!', key: Date.now() });
        playSequence(correct ? [SFX.correct, praise.audio] : [SFX.correct]);
      }
      timer.current = setTimeout(
        () => {
          if (nextResults.length >= ROUNDS_PER_LEVEL) {
            finishLevel(nextResults);
            return;
          }
          mistake.current = false;
          setFound(new Set());
          setWrong(null);
          setTimeLeft(lvl.time);
          setRoundIndex((i) => i + 1);
          setPhase('play');
        },
        timeUp ? TIME_UP_DELAY : NEXT_DELAY,
      );
    },
    [results, finishLevel, lvl.time],
  );

  useEffect(() => {
    if (phase === 'play' && timeLeft <= 0) {
      endRound(false, true);
    }
  }, [timeLeft, phase, endRound]);

  const tapTile = (tile) => {
    if (phase !== 'play' || paused || found.has(tile.id)) {
      return;
    }
    if (tile.isTarget) {
      const next = new Set(found).add(tile.id);
      setFound(next);
      if (next.size >= round.targetCount) {
        endRound(!mistake.current, false);
      } else {
        playClip(SFX.correct);
      }
      return;
    }
    mistake.current = true;
    setWrong({ id: tile.id, key: Date.now() });
    setFeedback({ type: 'retry', text: pickRandom(ENCOURAGE).text, key: Date.now() });
    playClip(SFX.wrong);
  };

  if (phase === 'done') {
    return (
      <View style={styles.body}>
        <ResultPanel
          levelNumber={levelIndex + 1}
          unit={TRACKS[track].unit}
          correct={correctCount}
          seconds={elapsed.current}
          stars={starsForCorrect(correctCount)}
          hasNext={levelIndex + 1 < LEVELS[track].length}
          onHome={onExit}
          onReplay={onRestart}
          onNext={onNextLevel}
        />
        {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}
      </View>
    );
  }

  // Tile sizes from the space the grid card actually gets.
  const rows = Math.ceil(grid.tiles / grid.columns);
  const innerW = box ? box.width - 24 : 0;
  const innerH = box ? box.height - 24 : 0;
  const tileW = Math.floor((innerW - GAP * (grid.columns - 1)) / grid.columns);
  const maxTileH = lvl.stage === 'word' ? 96 : tileW;
  const tileH = Math.floor(Math.min((innerH - GAP * rows) / rows, maxTileH));
  const fontSize = lvl.stage === 'word' ? Math.min(30, tileH * 0.42) : Math.min(tileW, tileH) * (track === 'math' && levelIndex % 4 >= 2 ? 0.5 : 0.62);

  const tileState = (tile) => {
    if (found.has(tile.id)) {
      return 'found';
    }
    if (phase === 'reveal' && tile.isTarget) {
      return 'reveal';
    }
    return wrong?.id === tile.id ? 'wrong' : undefined;
  };

  const hint = () => {
    if (lvl.stage === 'same') {
      return <Text style={styles.hintText}>{round.target.text}</Text>;
    }
    if (lvl.stage === 'word' && round.target.image) {
      return <Image source={round.target.image} style={styles.hintImage} resizeMode="contain" />;
    }
    if (lvl.stage === 'word' && round.target.hint) {
      return <Text style={styles.hintText}>{round.target.hint}</Text>;
    }
    return null;
  };
  const hintNode = hint();

  return (
    <View style={styles.body}>
      <View style={styles.topRow}>
        <RoundIconButton icon="home" size={46} accessibilityLabel="সব লেভেল" onPress={onExit} />
        <RoundDots total={ROUNDS_PER_LEVEL} current={roundIndex} results={results} />
        <RoundIconButton
          icon="pause"
          size={46}
          color={GC.white}
          background={GC.orange}
          accessibilityLabel="খেলা থামাও"
          onPress={() => setPaused(true)}
        />
      </View>
      <View style={styles.statsRow}>
        <StatPill
          image={CLOCK}
          value={formatTime(timeLeft)}
          alert={timeLeft <= 5}
          accessibilityLabel={`বাকি সময় ${timeLeft} সেকেন্ড`}
        />
        <Text style={styles.levelText}>
          লেভেল {toBanglaDigits(levelIndex + 1)} · {toBanglaDigits(roundIndex + 1)}/{toBanglaDigits(ROUNDS_PER_LEVEL)}
        </Text>
        <StatPill
          icon={<MaterialIcons name="star" size={28} color={GC.yellow} style={styles.starIcon} />}
          value={toBanglaDigits(correctCount)}
          accessibilityLabel={`সঠিক ${correctCount}`}
        />
      </View>

      <View style={styles.promptRow}>
        <PressableScale
          onPress={() => playClip(round.target.audio)}
          tapSound={false}
          accessibilityLabel="আবার শোনো"
          style={styles.speaker}
        >
          <MaterialIcons name="volume-up" size={34} color={GC.white} />
        </PressableScale>
        <Text style={styles.promptText}>{prompt.text}</Text>
        {hintNode ? <View style={styles.hint}>{hintNode}</View> : null}
      </View>

      <View style={styles.gridCard} onLayout={(e) => setBox(e.nativeEvent.layout)}>
        {box && tileW > 0 && tileH > 0 ? (
          <View style={[styles.grid, { width: innerW }]}>
            {round.tiles.map((tile, i) => (
              <View
                key={`${round.id}_${tile.id}`}
                style={[styles.cell, (i + 1) % grid.columns === 0 && styles.cellLast]}
              >
                <SeekTile
                  text={tile.item.text}
                  width={tileW}
                  height={tileH}
                  fontSize={fontSize}
                  state={tileState(tile)}
                  wrongKey={wrong?.id === tile.id ? wrong.key : 0}
                  disabled={phase !== 'play'}
                  onPress={() => tapTile(tile)}
                />
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <FeedbackBubble feedback={feedback} duration={1100} style={styles.feedback} />
      {paused ? (
        <PausePanel onResume={() => setPaused(false)} onRestart={onRestart} onExit={onExit} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  starIcon: { marginRight: 2 },
  levelText: {
    flexShrink: 1,
    fontSize: 14,
    fontWeight: '800',
    color: GC.ink,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  promptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: GC.cream,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: GC.white,
    padding: 8,
    ...shadow(5),
  },
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
  promptText: { flex: 1, marginHorizontal: 10, fontSize: 16, fontWeight: '800', color: GC.ink },
  hint: {
    minWidth: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: GC.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: GC.yellow,
  },
  hintText: { fontSize: 30, fontWeight: '800', color: GC.red, includeFontPadding: false },
  hintImage: { width: 50, height: 50 },
  gridCard: {
    flex: 1,
    marginTop: 10,
    marginBottom: 8,
    backgroundColor: GC.cream,
    borderRadius: 28,
    borderWidth: 5,
    borderColor: GC.wood,
    padding: 12,
    justifyContent: 'center',
    ...shadow(8),
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' },
  cell: { marginRight: GAP, marginBottom: GAP },
  cellLast: { marginRight: 0 },
  feedback: { top: '42%' },
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
