import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getQuizQuestions } from '../../data/game06_subjectQuiz';

const TOTAL_Q = 10;
const PER_Q_SECONDS = 28;

export default function SubjectQuizScreen({ navigation }) {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const [stage, setStage] = useState('lang');
  const [lang, setLang] = useState('bn');
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(PER_Q_SECONDS);
  const [selected, setSelected] = useState(null);
  const [locked, setLocked] = useState(false);

  const startGame = (chosen) => {
    const data = getQuizQuestions(chosen);
    const qs = (data.questions || []).slice(0, TOTAL_Q);
    setLang(chosen);
    setLevel(1);
    setQuestions(qs);
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setSelected(null);
    setLocked(false);
    setTimeLeft(PER_Q_SECONDS);
    setStage('play');
  };

  useEffect(() => {
    if (stage !== 'play' || locked) return undefined;
    if (timeLeft <= 0) return undefined;
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft, locked]);

  useEffect(() => {
    if (stage === 'play' && timeLeft === 0 && !locked) {
      handleAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleAnswer = (opt) => {
    if (locked) return;
    setLocked(true);
    setSelected(opt);
    const q = questions[index];
    const correct = opt !== null && opt === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, { q: q.q, chosen: opt, answer: q.answer, correct }]);
    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((i) => i + 1);
        setSelected(null);
        setLocked(false);
        setTimeLeft(PER_Q_SECONDS);
      } else {
        setStage('result');
      }
    }, 900);
  };

  const restart = () => startGame(lang);
  const nextLevel = () => startGame(lang);
  const goHome = () => navigation.navigate('HomeScreen');

  const pad = (n) => String(n).padStart(2, '0');
  const q = questions[index];

  if (stage === 'lang') {
    return (
      <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
        <Text style={[s.pick, { color: theme.colors.onBackground }]}>ভাষা নির্বাচন করো</Text>
        <View style={s.langBtns}>
          <TouchableOpacity activeOpacity={0.85} style={[s.langBtn, { backgroundColor: '#E91E63' }]} onPress={() => startGame('bn')}>
            <Text style={s.langBtnText}>বাংলা</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={[s.langBtn, { backgroundColor: '#1E88E5' }]} onPress={() => startGame('en')}>
            <Text style={s.langBtnText}>English</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={s.back} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#37474F" />
          <Text style={s.backText}>ফিরে যাও</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (stage === 'result') {
    const wrong = answers.filter((a) => !a.correct).length;
    return (
      <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
        <View style={[s.resultCard, { backgroundColor: theme.colors.surface }]}>
          <Text style={[s.resultTitle, { color: theme.colors.onSurface }]}>ফলাফল</Text>
          <Text style={[s.resultSub, { color: theme.colors.onSurfaceVariant }]}>স্কোর: {score} / {questions.length}</Text>
          <Text style={{ color: '#2E9E4F', fontSize: 16, fontWeight: '700' }}>সঠিক: {score}</Text>
          <Text style={{ color: '#D32F2F', fontSize: 16, fontWeight: '700' }}>ভুল: {wrong}</Text>
          <ScrollView style={{ maxHeight: 260, marginTop: 12 }} showsVerticalScrollIndicator={false}>
            {answers.map((a, i) => (
              <View key={i} style={s.reviewRow}>
                <MaterialIcons name={a.correct ? 'check-circle' : 'cancel'} size={18} color={a.correct ? '#2E9E4F' : '#D32F2F'} />
                <Text style={[s.reviewQ, { color: theme.colors.onSurface }]} numberOfLines={2}>{a.q}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={s.resultBtns}>
            <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#2E9E4F' }]} onPress={nextLevel}>
              <MaterialIcons name="navigate-next" size={24} color="#fff" />
              <Text style={s.bigBtnText}>পরের লেভেল</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#7C4DFF' }]} onPress={restart}>
              <MaterialIcons name="replay" size={22} color="#fff" />
              <Text style={s.bigBtnText}>আবার খেলি</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.resultHome} onPress={goHome}>
            <MaterialIcons name="home" size={20} color="#37474F" />
            <Text style={s.resultHomeText}>হোমে ফিরি</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!q) return null;

  const progress = ((index) / questions.length) * 100;
  const timerPct = (timeLeft / PER_Q_SECONDS) * 100;

  return (
    <SafeAreaView style={[s.root, { backgroundColor: theme.colors.background }]}>
      <View style={s.topRow}>
        <TouchableOpacity style={s.circleBtn} onPress={goHome}>
          <MaterialIcons name="home" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={s.titleBox}>
          <Text style={[s.playTitle, { color: theme.colors.onBackground }]}>{lang === 'en' ? 'Subject Quiz' : 'বিষয়ভিত্তিক কুইজ'}</Text>
          <Text style={[s.levelPillText, { color: theme.colors.onSurfaceVariant }]}>লেভেল {level}</Text>
        </View>
        <View style={s.timerPill}>
          <MaterialIcons name="access-time" size={17} color="#2E7D32" />
          <Text style={s.timerText}>{`${pad(Math.floor(timeLeft / 60))}:${pad(timeLeft % 60)}`}</Text>
        </View>
      </View>

      <View style={s.timerBarBg}>
        <View style={[s.timerBarFill, { width: `${timerPct}%`, backgroundColor: timeLeft <= 5 ? '#D32F2F' : '#2E9E4F' }]} />
      </View>

      <Text style={[s.progress, { color: theme.colors.onSurfaceVariant }]}>প্রশ্ন {index + 1} / {questions.length}</Text>

      <View style={[s.qCard, { backgroundColor: theme.colors.surface }]}>
        <MaterialIcons name={getQuizQuestions(lang).icon || 'lightbulb'} size={32} color={theme.colors.primary} />
        <Text style={[s.qText, { color: theme.colors.onSurface }]}>{q.q}</Text>
      </View>

      <View style={s.opts}>
        {q.options.map((opt, i) => {
          const isSel = selected === opt;
          const isCorrect = locked && opt === q.answer;
          const isWrong = locked && isSel && opt !== q.answer;
          let bg = theme.colors.surface;
          if (isCorrect) bg = '#C8E6C9';
          else if (isWrong) bg = '#FFCDD2';
          else if (isSel) bg = theme.colors.primaryContainer;
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              disabled={locked}
              onPress={() => handleAnswer(opt)}
              style={[s.optBtn, { backgroundColor: bg, borderColor: theme.colors.outline }]}
            >
              <Text style={[s.optText, { color: theme.colors.onSurface }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 16 },
  pick: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginTop: 40, marginBottom: 24 },
  langBtns: { gap: 12, paddingHorizontal: 24 },
  langBtn: { paddingVertical: 18, borderRadius: 14, alignItems: 'center' },
  langBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  back: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 24, gap: 6 },
  backText: { color: '#37474F', fontSize: 14 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  circleBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#7C4DFF', alignItems: 'center', justifyContent: 'center' },
  titleBox: { flex: 1 },
  playTitle: { fontSize: 16, fontWeight: '700' },
  levelPillText: { fontSize: 12 },
  timerPill: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: '#E8F5E9' },
  timerText: { color: '#2E7D32', fontWeight: '700', fontSize: 13 },
  timerBarBg: { height: 8, borderRadius: 4, backgroundColor: '#E0E0E0', overflow: 'hidden', marginBottom: 8 },
  timerBarFill: { height: 8, borderRadius: 4 },
  progress: { fontSize: 13, marginBottom: 10, textAlign: 'center' },
  qCard: { padding: 18, borderRadius: 16, alignItems: 'center', gap: 8, marginBottom: 16, elevation: 2 },
  qText: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
  opts: { gap: 10 },
  optBtn: { paddingVertical: 14, paddingHorizontal: 16, borderRadius: 12, borderWidth: 1 },
  optText: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
  resultCard: { padding: 20, borderRadius: 20, alignItems: 'center', gap: 6, margin: 16, elevation: 3 },
  resultTitle: { fontSize: 24, fontWeight: '800' },
  resultSub: { fontSize: 16, fontWeight: '600' },
  resultBtns: { flexDirection: 'row', gap: 10, marginTop: 14, flexWrap: 'wrap', justifyContent: 'center' },
  bigBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12 },
  bigBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  resultHome: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  resultHomeText: { color: '#37474F', fontSize: 14 },
  reviewRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  reviewQ: { flex: 1, fontSize: 13 },
});
