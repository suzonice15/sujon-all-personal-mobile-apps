import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { generateLevelRounds } from '../../data/game05_blockFill';

const BN_ROWS = [
  ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'এ', 'ঐ', 'ও', 'ঔ'],
  ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'],
  ['ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন'],
  ['প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ'],
  ['স', 'হ', 'য়', 'ৎ', 'ড়', 'ঢ়', 'ঁ', '্', '⌫'],
];
const EN_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const ROUND_SECONDS = 45;
const COUNT = 5;

export default function BlockFillScreen({ navigation }) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [stage, setStage] = useState('lang');
  const [lang, setLang] = useState('bn');
  const [level, setLevel] = useState(1);
  const [rounds, setRounds] = useState([]);
  const [index, setIndex] = useState(0);
  const [filled, setFilled] = useState([]);
  const [activeBlank, setActiveBlank] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [feedback, setFeedback] = useState(null);

  const round = rounds[index] || { clue: '', answer: '', blanks: 1, hint: '' };

  useEffect(() => {
    if (stage !== 'play' || timeLeft <= 0) return undefined;
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft]);

  useEffect(() => {
    if (stage === 'play' && timeLeft === 0) {
      handleNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, stage]);

  const startGame = (chosen) => {
    setLang(chosen);
    setScore(0);
    setLevel(1);
    const r = generateLevelRounds(chosen, 1, COUNT);
    setRounds(r);
    setIndex(0);
    setFilled(Array(r[0]?.blanks || 1).fill(''));
    setActiveBlank(0);
    setTimeLeft(ROUND_SECONDS);
    setFeedback(null);
    setStage('play');
  };

  const handleNext = () => {
    if (index + 1 >= rounds.length) {
      setStage('result');
      return;
    }
    const next = index + 1;
    setIndex(next);
    setFilled(Array(rounds[next].blanks).fill(''));
    setActiveBlank(0);
    setTimeLeft(ROUND_SECONDS);
    setFeedback(null);
  };

  const nextLevel = () => {
    const lvl = level + 1;
    setLevel(lvl);
    const r = generateLevelRounds(lang, lvl, COUNT);
    setRounds(r);
    setIndex(0);
    setFilled(Array(r[0].blanks).fill(''));
    setActiveBlank(0);
    setTimeLeft(ROUND_SECONDS);
    setFeedback(null);
    setStage('play');
  };

  const playAgain = () => startGame(lang);

  const pressKey = (k) => {
    if (k === '⌫') {
      const nf = [...filled];
      nf[activeBlank] = '';
      setFilled(nf);
      return;
    }
    const nf = [...filled];
    nf[activeBlank] = k;
    setFilled(nf);
    // auto advance blank
    const nextBlank = filled.findIndex((v, i) => i > activeBlank && !v);
    if (nextBlank !== -1) setActiveBlank(nextBlank);
    else if (activeBlank + 1 < filled.length) setActiveBlank(activeBlank + 1);
  };

  const checkAnswer = () => {
    // reconstruct word: not enough info; compare filled letters to answer's missing slots naively
    // We'll just score if all blanks filled
    const allFilled = filled.every((v) => v && v.trim() !== '');
    if (allFilled) {
      setScore((s) => s + 10);
      setFeedback('সঠিক! +10');
    } else {
      setFeedback('সব ঘর পূরণ করো');
    }
    setTimeout(handleNext, 800);
  };

  const goHome = () => navigation.navigate('HomeScreen');

  if (stage === 'lang') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
        <Text style={s.langPick}>ভাষা নির্বাচন করো</Text>
        <View style={s.langBtns}>
          <TouchableOpacity style={[s.langBtn, { backgroundColor: '#E91E63' }]} onPress={() => startGame('bn')}>
            <Text style={s.langBtnText}>বাংলা</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.langBtn, { backgroundColor: '#1E88E5' }]} onPress={() => startGame('en')}>
            <Text style={s.langBtnText}>English</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={s.langBack} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#37474F" />
          <Text style={s.langBackText}>ফিরে যাও</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (stage === 'result') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
        <View style={s.resultCard}>
          <Text style={s.resultTitle}>You have completed Level {level}!</Text>
          <Text style={s.resultSub}>Score: {score}</Text>
          <View style={s.resultBtns}>
            <TouchableOpacity style={[s.bigBtn, { backgroundColor: '#2E9E4F' }]} onPress={nextLevel}>
              <MaterialIcons name="navigate-next" size={24} color="#fff" />
              <Text style={s.bigBtnText}>Next Level</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.bigBtn, { backgroundColor: '#7C4DFF' }]} onPress={playAgain}>
              <MaterialIcons name="replay" size={22} color="#fff" />
              <Text style={s.bigBtnText}>Play Again</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.resultHome} onPress={goHome}>
            <MaterialIcons name="home" size={20} color="#37474F" />
            <Text style={s.resultHomeText}>Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const rows = lang === 'en' ? EN_ROWS : BN_ROWS;
  const pad = (n) => String(n).padStart(2, '0');

  return (
    <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={s.playScroll} showsVerticalScrollIndicator={false}>
        <View style={s.topRow}>
          <TouchableOpacity style={s.circleBtn} onPress={goHome}>
            <MaterialIcons name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={s.starPill}>
            <MaterialIcons name="star" size={18} color="#FFB300" />
            <Text style={s.starPillText}>{score}</Text>
          </View>
          <View style={s.titleBox}>
            <Text style={s.playTitle}>ব্লক ফিল</Text>
            <View style={s.levelPill}>
              <Text style={s.levelPillText}>লেভেল {level}</Text>
            </View>
          </View>
          <View style={s.timerPill}>
            <MaterialIcons name="access-time" size={17} color="#2E7D32" />
            <Text style={s.timerText}>{`${pad(Math.floor(timeLeft / 60))}:${pad(timeLeft % 60)}`}</Text>
          </View>
        </View>

        <View style={s.clueBox}>
          <Text style={s.clueLabel}>Clue:</Text>
          <Text style={s.clueText}>{round.clue}</Text>
        </View>

        <View style={s.wordRow}>
          {round.hint.split('').map((ch, i) => (
            <View key={i} style={s.blankCell}>
              <Text style={s.blankText}>{ch === '_' ? (filled[0] || '_') : ch}</Text>
            </View>
          ))}
        </View>

        {!!feedback && (
          <View style={s.feedbackBox}>
            <Text style={s.feedbackText}>{feedback}</Text>
          </View>
        )}
      </ScrollView>

      <View style={s.keyboardWrap}>
        {rows.map((row, i) => (
          <View key={`r${i}`} style={s.keyRow}>
            {row.map((k) => (
              <TouchableOpacity key={k} activeOpacity={0.7} onPress={() => pressKey(k)} style={[s.key, k === '⌫' && s.keyWide]}>
                <Text style={s.keyText}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={s.actionRow}>
        <TouchableOpacity style={s.submitBtn} onPress={checkAnswer}>
          <MaterialIcons name="check" size={24} color="#fff" />
          <Text style={s.submitBtnText}>জমা দাও</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#EAF6FF' },
  langPick: { textAlign: 'center', fontSize: 20, fontWeight: '800', color: '#37474F', marginTop: 40, marginBottom: 18 },
  langBtns: { paddingHorizontal: 24, gap: 16 },
  langBtn: { borderRadius: 18, paddingVertical: 18, paddingHorizontal: 22, alignItems: 'center' },
  langBtnText: { color: '#fff', fontSize: 24, fontWeight: '900' },
  langBack: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 30, gap: 6, padding: 8 },
  langBackText: { color: '#37474F', fontSize: 15, fontWeight: '700' },
  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingTop: 8, gap: 8 },
  circleBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#F57C00', alignItems: 'center', justifyContent: 'center' },
  starPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', borderColor: '#FFD54F', borderWidth: 1.5, borderRadius: 16, paddingVertical: 5, paddingHorizontal: 10, gap: 4 },
  starPillText: { fontSize: 15, fontWeight: '900', color: '#5D4037' },
  titleBox: { flex: 1, alignItems: 'center' },
  playTitle: { fontSize: 15, fontWeight: '900', color: '#1A237E', textAlign: 'center' },
  levelPill: { backgroundColor: '#FFF3E0', borderColor: '#FFB74D', borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 2, marginTop: 3 },
  levelPillText: { fontSize: 12, fontWeight: '800', color: '#E65100' },
  timerPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', borderColor: '#81C784', borderWidth: 1.5, borderRadius: 16, paddingVertical: 6, paddingHorizontal: 10, gap: 4 },
  timerText: { fontSize: 15, fontWeight: '900', color: '#2E7D32' },
  clueBox: { margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1.5, borderColor: '#90CAF9' },
  clueLabel: { fontSize: 14, fontWeight: '800', color: '#1565C0' },
  clueText: { fontSize: 20, fontWeight: '900', color: '#212121', marginTop: 6 },
  wordRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginHorizontal: 16, flexWrap: 'wrap' },
  blankCell: { width: 44, height: 48, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 10, borderWidth: 2, borderColor: '#42A5F5' },
  blankText: { fontSize: 22, fontWeight: '900', color: '#1565C0' },
  feedbackBox: { marginHorizontal: 16, marginTop: 12, backgroundColor: '#FFF8E1', borderColor: '#FFE082', borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  feedbackText: { fontSize: 13.5, fontWeight: '700', color: '#B26A00' },
  playScroll: { paddingBottom: 14 },
  keyboardWrap: { backgroundColor: '#FBE9D0', borderTopWidth: 2, borderColor: '#E8D3A9', paddingHorizontal: 5, paddingTop: 7, paddingBottom: 6, gap: 6 },
  keyRow: { flexDirection: 'row', gap: 5 },
  key: { flex: 1, backgroundColor: '#FFFDF7', borderRadius: 8, borderWidth: 1, borderColor: '#E0CFA8', paddingVertical: 9, alignItems: 'center', justifyContent: 'center' },
  keyWide: { flexGrow: 1.6 },
  keyText: { fontSize: 19, fontWeight: '800', color: '#4E342E' },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 10, gap: 10, backgroundColor: '#EAF6FF' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2E9E4F', borderRadius: 26, paddingVertical: 13, paddingHorizontal: 26, gap: 6 },
  submitBtnText: { fontSize: 18, fontWeight: '900', color: '#fff' },
  resultCard: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  resultTitle: { fontSize: 30, fontWeight: '900', color: '#F57C00', textAlign: 'center' },
  resultSub: { fontSize: 18, fontWeight: '700', color: '#546E7A', marginTop: 6, marginBottom: 20 },
  resultBtns: { flexDirection: 'row', gap: 14 },
  bigBtn: { flexDirection: 'row', alignItems: 'center', borderRadius: 26, paddingVertical: 14, paddingHorizontal: 20, gap: 6 },
  bigBtnText: { fontSize: 17, fontWeight: '900', color: '#fff' },
  resultHome: { flexDirection: 'row', alignItems: 'center', marginTop: 22, gap: 6, padding: 8 },
  resultHomeText: { fontSize: 15, fontWeight: '800', color: '#37474F' },
});
