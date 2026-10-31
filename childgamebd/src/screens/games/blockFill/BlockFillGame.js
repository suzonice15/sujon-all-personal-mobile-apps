import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  FeedbackBubble,
  GC,
  LevelResultPanel,
  PressableScale,
  RoundIconButton,
  StatPill,
  shadow,
} from '../../../components/game';
import {
  ENCOURAGE,
  GAME_ID,
  LEVELS,
  PRAISE,
  PROMPTS,
  TRACKS,
  buildCrossword,
  cellKey,
  starsFor,
  tilesFor,
} from '../../../data/game05_blockFill';
import { saveLevelStars } from '../../../db/gameProgress';
import { SFX, playClip, playSequence } from '../../../utils/gameAudio';
import { toBanglaDigits } from '../../../utils/banglaNumber';
import ClueStrip from './components/ClueStrip';
import CrosswordGrid from './components/CrosswordGrid';

const CHECK = require('../../../assets/images/common/check_mark.webp');
const CROSS = require('../../../assets/images/common/cross_mark.webp');
const BULB = require('../../../assets/images/common/light_bulb.webp');
const WRONG_FLASH = 700;

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// One crossword (one level). Remount with a new `key` to restart.
export default function BlockFillGame({ track, levelIndex, onExit, onRestart, onNextLevel }) {
  const info = TRACKS[track];
  const lvl = LEVELS[levelIndex];
  const puzzle = useMemo(() => buildCrossword(track, levelIndex), [track, levelIndex]);
  const n = (v) => (track === 'en' ? String(v) : toBanglaDigits(v));

  const [activeId, setActiveId] = useState(puzzle.words[0].id);
  const [filled, setFilled] = useState({}); // "r,c" -> letter typed by the child
  const [solvedIds, setSolvedIds] = useState([]);
  const [wrongCells, setWrongCells] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [locked, setLocked] = useState({}); // "r,c" -> true for revealed/solved letters
  const [feedback, setFeedback] = useState(null);
  const [board, setBoard] = useState(null);
  const [done, setDone] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;
  const timer = useRef(null);

  const active = puzzle.words.find((w) => w.id === activeId);
  const activeKeys = active.cells.map(([r, c]) => cellKey(r, c));
  const cursor = activeKeys.find((k) => !filled[k]);
  const tiles = useMemo(
    () => tilesFor(puzzle, active, locked),
    // New tiles only when the word changes or letters get locked in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [puzzle, activeId, Object.keys(locked).length],
  );
  const solvedCells = new Set(puzzle.words.filter((w) => solvedIds.includes(w.id)).flatMap((w) => w.cells.map(([r, c]) => cellKey(r, c))));

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    playClip(PROMPTS.instruction.audio);
  }, []);

  const selectWord = (word) => {
    if (word.id === activeId) {
      return;
    }
    setActiveId(word.id);
    if (word.clueAudio && !solvedIds.includes(word.id)) {
      playClip(word.clueAudio);
    }
  };

  const nextUnsolved = (solved) =>
    puzzle.words.find((w) => !solved.includes(w.id) && puzzle.words.indexOf(w) > puzzle.words.indexOf(active)) ||
    puzzle.words.find((w) => !solved.includes(w.id));

  const checkWord = (nextFilled, hintsSoFar = hints) => {
    const keys = active.cells.map(([r, c]) => cellKey(r, c));
    if (keys.some((k) => !nextFilled[k])) {
      return;
    }
    const wrong = keys.filter((k) => nextFilled[k] !== puzzle.cells[k]);
    if (wrong.length) {
      setMistakes((m) => m + 1);
      setWrongCells(new Set(wrong));
      setFeedback({ type: 'retry', text: pickRandom(ENCOURAGE).text, key: Date.now() });
      playSequence([SFX.wrong, PROMPTS.wrongWord.audio]);
      Animated.sequence(
        [10, -10, 8, -8, 0].map((toValue) => Animated.timing(shake, { toValue, duration: 55, useNativeDriver: true })),
      ).start();
      timer.current = setTimeout(() => {
        setWrongCells(new Set());
        setFilled((f) => {
          const copy = { ...f };
          wrong.forEach((k) => delete copy[k]);
          return copy;
        });
      }, WRONG_FLASH);
      return;
    }
    // Words whose every letter is now filled in correctly through crossings count as solved too.
    const completes = (w) => w.cells.every(([r, c]) => nextFilled[cellKey(r, c)] === puzzle.cells[cellKey(r, c)]);
    const newlySolved = puzzle.words.filter((w) => w.id === active.id || (!solvedIds.includes(w.id) && completes(w)));
    const solved = [...solvedIds, ...newlySolved.map((w) => w.id)];
    setSolvedIds(solved);
    const newKeys = newlySolved.flatMap((w) => w.cells.map(([r, c]) => cellKey(r, c)));
    setLocked((l) => ({ ...l, ...Object.fromEntries(newKeys.map((k) => [k, true])) }));
    if (solved.length === puzzle.words.length) {
      const stars = starsFor(mistakes, hintsSoFar);
      setFeedback({ type: 'success', text: pickRandom(PRAISE).text, key: Date.now() });
      playSequence([SFX.celebrate, PROMPTS.levelDone.audio]);
      saveLevelStars(GAME_ID, track, lvl.id, stars).catch(() => setSaveFailed(true));
      timer.current = setTimeout(() => setDone(true), 1200);
      return;
    }
    const praise = pickRandom(PRAISE);
    setFeedback({ type: 'success', text: praise.text, key: Date.now() });
    playSequence([SFX.correct, active.answerAudio]);
    const next = nextUnsolved(solved);
    timer.current = setTimeout(() => setActiveId(next.id), 600);
  };

  const typeLetter = (letter) => {
    if (!cursor || wrongCells.size) {
      return;
    }
    const nextFilled = { ...filled, [cursor]: letter };
    setFilled(nextFilled);
    checkWord(nextFilled);
  };

  const erase = () => {
    const last = [...activeKeys].reverse().find((k) => filled[k] && !locked[k]);
    if (last) {
      setFilled((f) => {
        const copy = { ...f };
        delete copy[last];
        return copy;
      });
    }
  };

  const hint = () => {
    if (!cursor || wrongCells.size) {
      return;
    }
    setHints(hints + 1);
    setLocked((l) => ({ ...l, [cursor]: true }));
    const nextFilled = { ...filled, [cursor]: puzzle.cells[cursor] };
    setFilled(nextFilled);
    playClip(SFX.correct);
    checkWord(nextFilled, hints + 1);
  };

  const onCellPress = (r, c) => {
    const k = cellKey(r, c);
    const owners = puzzle.words.filter((w) => w.cells.some(([wr, wc]) => cellKey(wr, wc) === k));
    // Tapping a crossing cell twice switches between its across and down word.
    const target = owners.find((w) => w.id !== activeId && !solvedIds.includes(w.id)) || owners.find((w) => w.id !== activeId) || owners[0];
    if (target) {
      selectWord(target);
    }
  };

  if (done) {
    const stars = starsFor(mistakes, hints);
    return (
      <View style={styles.body}>
        <LevelResultPanel
          levelNumber={levelIndex + 1}
          stars={stars}
          stats={[
            { key: 'words', image: CHECK, label: 'শব্দ', value: `${n(puzzle.words.length)} / ${n(puzzle.words.length)}`, color: GC.greenDark },
            { key: 'wrong', image: CROSS, label: 'ভুল চেষ্টা', value: toBanglaDigits(mistakes), color: GC.redDark },
            { key: 'hint', image: BULB, label: 'হিন্ট', value: toBanglaDigits(hints), color: GC.orange },
          ]}
          passText={`তুমি লেভেল ${toBanglaDigits(levelIndex + 1)} সম্পূর্ণ করেছো!`}
          failText=""
          hasNext={levelIndex + 1 < LEVELS.length}
          onHome={onExit}
          onReplay={onRestart}
          onNext={onNextLevel}
        >
          <View style={styles.resultWords}>
            {puzzle.words.map((w) => (
              <View key={w.id} style={styles.resultWord}>
                {w.image ? <Image source={w.image} style={styles.resultPicture} resizeMode="contain" /> : null}
                <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
                  {w.word}
                </Text>
              </View>
            ))}
          </View>
        </LevelResultPanel>
        {saveFailed ? <Text style={styles.saveError}>তোমার তারা সংরক্ষণ করা যায়নি, পরে আবার খেলো।</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <View style={styles.topRow}>
        <RoundIconButton icon="home" size={46} accessibilityLabel="সব লেভেল" onPress={onExit} />
        <View style={[styles.badge, { backgroundColor: info.color }]}>
          <Text style={styles.badgeText} numberOfLines={1}>
            {info.title} • লেভেল {toBanglaDigits(levelIndex + 1)}
          </Text>
        </View>
        <StatPill
          icon={<MaterialIcons name="star" size={26} color={GC.yellow} style={styles.starIcon} />}
          value={`${toBanglaDigits(solvedIds.length)}/${toBanglaDigits(puzzle.words.length)}`}
          accessibilityLabel={`${solvedIds.length} টি সমাধান`}
        />
      </View>

      <View style={styles.boardCard} onLayout={(e) => setBoard(e.nativeEvent.layout)}>
        {board ? (
          <Animated.View style={{ transform: [{ translateX: shake }] }}>
            <CrosswordGrid
              puzzle={puzzle}
              width={board.width - 20}
              maxHeight={board.height - 20}
              filled={filled}
              solvedCells={solvedCells}
              activeCells={new Set(activeKeys)}
              cursor={cursor}
              wrongCells={wrongCells}
              onCellPress={onCellPress}
            />
          </Animated.View>
        ) : null}
      </View>

      <ClueStrip words={puzzle.words} activeId={activeId} solvedIds={solvedIds} lang={info.lang} onPress={selectWord} />

      <View style={styles.clueBar}>
        <View style={[styles.dirTag, active.dir === 'across' ? styles.dirAcross : styles.dirDown]}>
          <Text style={styles.dirText}>{n(active.num)}</Text>
          <MaterialIcons name={active.dir === 'across' ? 'arrow-forward' : 'arrow-downward'} size={16} color={GC.white} />
        </View>
        <View style={styles.clueTextWrap}>
          <Text style={styles.clueText} numberOfLines={2} adjustsFontSizeToFit>
            {active.clue}
          </Text>
          <Text style={styles.clueLen}>
            {track === 'en' ? `${active.letters.length} letters` : `${toBanglaDigits(active.letters.length)}টি ঘর`}
          </Text>
        </View>
        {active.image ? <Image source={active.image} style={styles.clueImage} resizeMode="contain" /> : null}
        {active.clueAudio ? (
          <PressableScale onPress={() => playClip(active.clueAudio)} tapSound={false} accessibilityLabel="ইশারা শোনো" style={styles.speaker}>
            <MaterialIcons name="volume-up" size={24} color={GC.white} />
          </PressableScale>
        ) : null}
      </View>

      <View style={styles.tiles}>
        {tiles.map((t) => (
          <PressableScale key={t.id} onPress={() => typeLetter(t.letter)} accessibilityLabel={`অক্ষর ${t.letter}`} style={styles.tile}>
            <Text style={styles.tileText} numberOfLines={1} adjustsFontSizeToFit>
              {t.letter}
            </Text>
          </PressableScale>
        ))}
        <PressableScale onPress={erase} accessibilityLabel="মুছে ফেলো" style={[styles.tile, styles.toolTile]}>
          <MaterialIcons name="backspace" size={24} color={GC.white} />
        </PressableScale>
        <PressableScale onPress={hint} accessibilityLabel="হিন্ট" style={[styles.tile, styles.hintTile]}>
          <MaterialIcons name="lightbulb" size={24} color={GC.white} />
        </PressableScale>
      </View>

      <FeedbackBubble feedback={feedback} duration={900} style={styles.feedback} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: { flex: 1, paddingHorizontal: 12, paddingTop: 8 },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: {
    flexShrink: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: GC.white,
    ...shadow(3),
  },
  badgeText: { color: GC.white, fontSize: 15, fontWeight: '800' },
  starIcon: { marginRight: 2 },
  boardCard: {
    flex: 1,
    marginTop: 10,
    backgroundColor: GC.cream,
    borderRadius: 26,
    borderWidth: 5,
    borderColor: GC.wood,
    padding: 10,
    justifyContent: 'center',
    ...shadow(8),
  },
  clueBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GC.cream,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: GC.woodLight,
    padding: 8,
    ...shadow(4),
  },
  dirTag: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, paddingHorizontal: 8, paddingVertical: 6 },
  dirAcross: { backgroundColor: '#E0287D' },
  dirDown: { backgroundColor: GC.blue },
  dirText: { color: GC.white, fontSize: 16, fontWeight: '800', marginRight: 2 },
  clueTextWrap: { flex: 1, marginHorizontal: 8 },
  clueText: { fontSize: 18, fontWeight: '800', color: '#5A2D14' },
  clueLen: { fontSize: 13, fontWeight: '700', color: GC.inkSoft },
  clueImage: { width: 46, height: 46 },
  speaker: {
    marginLeft: 6,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GC.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 8, marginBottom: 6 },
  tile: {
    minWidth: 50,
    height: 50,
    margin: 4,
    paddingHorizontal: 6,
    borderRadius: 14,
    backgroundColor: '#FFE9A8',
    borderWidth: 2,
    borderColor: GC.white,
    borderBottomWidth: 5,
    borderBottomColor: '#E8B84A',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow(3),
  },
  tileText: { fontSize: 24, fontWeight: '800', color: '#5A2D14' },
  toolTile: { backgroundColor: GC.orange, borderBottomColor: '#C9631F' },
  hintTile: { backgroundColor: GC.yellow, borderBottomColor: '#E8A800' },
  feedback: { top: '35%' },
  resultWords: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 10 },
  resultWord: {
    width: '30%',
    margin: '1.5%',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: '#DDF5E7',
    borderWidth: 2,
    borderColor: GC.white,
  },
  resultPicture: { width: 40, height: 40 },
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
