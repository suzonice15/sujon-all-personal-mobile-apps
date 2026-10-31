import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { BANGLA_ROUNDS, ENGLISH_ROUNDS } from '../../data/namePlaceFlowerFruit';
import GameNativeAd from '../../components/game/GameNativeAd';

const CATS = [
  { key: 'name', label: 'নাম', placeholder: 'নাম লিখো...', color: '#7C4DFF' },
  { key: 'country', label: 'দেশ', placeholder: 'দেশ লিখো...', color: '#2E9E4F' },
  { key: 'flower', label: 'ফুল', placeholder: 'ফুল লিখো...', color: '#EC407A' },
  { key: 'fruit', label: 'ফল', placeholder: 'ফল লিখো...', color: '#F57C00' },
];

const BN_ROWS = [
  ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'এ', 'ঐ', 'ও', 'ঔ'],
  ['া', 'ি', 'ু', 'ূ', 'ী', 'ৈ', 'ো', 'ৌ', 'ে', 'ং'],
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

const ROUND_SECONDS = 60;
const EMPTY = { name: '', country: '', flower: '', fruit: '' };

const pad = (n) => String(n).padStart(2, '0');

const pickRound = (lang, currentLetter) => {
  const pool = lang === 'en' ? ENGLISH_ROUNDS : BANGLA_ROUNDS;
  const others = pool.filter((r) => r.letter !== currentLetter);
  return others[Math.floor(Math.random() * others.length)];
};

export default function NamePlaceFlowerFruitScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const [stage, setStage] = useState('lang');
  const [lang, setLang] = useState('bn');
  const [level, setLevel] = useState(1);
  const [round, setRound] = useState(BANGLA_ROUNDS[2]);
  const [values, setValues] = useState(EMPTY);
  const [active, setActive] = useState('name');
  const [results, setResults] = useState(null);
  const [counted, setCounted] = useState({});
  const [stars, setStars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [feedback, setFeedback] = useState(null);
  const [hintText, setHintText] = useState(null);

  const roundScore = Object.values(counted).filter(Boolean).length * 5;
  const fieldWidth = (width - 16 * 2 - 12) / 2;

  useEffect(() => {
    if (stage !== 'play' || timeLeft <= 0) {
      return undefined;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft]);

  const isCorrect = (key) => {
    const v = (values[key] || '').trim();
    if (!v) {
      return false;
    }
    if (lang === 'en') {
      return v[0].toUpperCase() === round.letter;
    }
    return v[0] === round.letter;
  };

  const submit = () => {
    const res = {};
    CATS.forEach((c) => {
      res[c.key] = isCorrect(c.key);
    });
    const newCounted = { ...counted };
    let earned = 0;
    CATS.forEach((c) => {
      if (res[c.key] && !newCounted[c.key]) {
        newCounted[c.key] = true;
        earned += 1;
      }
    });
    setResults(res);
    setCounted(newCounted);
    if (earned > 0) {
      setStars((s) => s + earned * 5);
    }
    const total = earned > 0 ? Object.values(newCounted).filter(Boolean).length : Object.values(counted).filter(Boolean).length;
    if (total >= 4) {
      setFeedback(null);
      setStage('result');
    } else {
      setFeedback(`${Object.values(res).filter(Boolean).length}/20 সঠিক — ভুল ঘরগুলো ঠিক করো!`);
    }
  };

  useEffect(() => {
    if (stage === 'play' && timeLeft === 0) {
      submit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, stage]);

  const resetRound = (nextRound = round, nextLevel = level) => {
    setValues(EMPTY);
    setActive('name');
    setResults(null);
    setCounted({});
    setFeedback(null);
    setHintText(null);
    setTimeLeft(ROUND_SECONDS);
    setRound(nextRound);
    setLevel(nextLevel);
  };

  const startGame = (chosen) => {
    setLang(chosen);
    setStars(0);
    resetRound(pickRound(chosen, null), 1);
    setStage('play');
  };

  const playAgain = () => resetRound(round, level);

  const nextLevel = () => resetRound(pickRound(lang, round.letter), level + 1);

  const showHint = () => {
    const emptyKey = CATS.map((c) => c.key).find((k) => !counted[k] && !(values[k] || '').trim());
    if (!emptyKey) {
      return;
    }
    setValues((v) => ({ ...v, [emptyKey]: round[emptyKey] }));
    setResults((r) => (r ? { ...r, [emptyKey]: false } : r));
    setHintText(`হিন্ট: ${CATS.find((c) => c.key === emptyKey).label} → ${round[emptyKey]}`);
    setStars((s) => Math.max(0, s - 1));
  };

  const pressKey = (k) => {
    setHintText(null);
    if (k === '⌫') {
      setValues((v) => ({ ...v, [active]: v[active].slice(0, -1) }));
      return;
    }
    setValues((v) => (v[active].length >= 16 ? v : { ...v, [active]: v[active] + k }));
  };

  const goHome = () => navigation.navigate('HomeScreen');

  if (stage === 'lang') {
    return (
      <SafeAreaView style={s.root}>
        <ScrollView contentContainerStyle={s.langScroll} showsVerticalScrollIndicator={false}>
        <View style={s.langBannerWrap}>
          <Image source={require('../../assets/games/game_08.jpg')} style={s.langBanner} resizeMode="cover" />
          <View style={s.langBannerOverlay} />
          <Text style={s.langGameTitle}>নাম দেশ ফুল ফল</Text>
        </View>
        <Text style={s.langPick}>ভাষা নির্বাচন করো</Text>
        <View style={s.langBtns}>
          <TouchableOpacity activeOpacity={0.85} style={[s.langBtn, { backgroundColor: '#E91E63' }]} onPress={() => startGame('bn')}>
            <Text style={s.langLetterBig}>অ আ ক খ</Text>
            <Text style={s.langBtnText}>বাংলা</Text>
            <MaterialIcons name="play-arrow" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.85} style={[s.langBtn, { backgroundColor: '#1E88E5' }]} onPress={() => startGame('en')}>
            <Text style={s.langLetterBig}>A B C D</Text>
            <Text style={s.langBtnText}>English</Text>
            <MaterialIcons name="play-arrow" size={26} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={s.langBack} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={20} color="#37474F" />
          <Text style={s.langBackText}>ফিরে যাও</Text>
        </TouchableOpacity>
        <GameNativeAd style={s.langNativeAd} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (stage === 'result') {
    return (
      <SafeAreaView style={s.root}>
        <View style={s.resultCard}>
          <View style={s.resultStars}>
            <MaterialIcons name="star" size={54} color="#FFC107" />
            <MaterialIcons name="star" size={74} color="#FFB300" />
            <MaterialIcons name="star" size={54} color="#FFC107" />
          </View>
          <Text style={s.resultTitle}>অভিনন্দন!</Text>
          <Text style={s.resultSub}>তুমি খুব ভালো করেছ!</Text>
          <View style={s.resultScorePill}>
            <MaterialIcons name="star" size={28} color="#FFB300" />
            <Text style={s.resultScoreText}>20 / 20</Text>
          </View>
          <Text style={s.resultLevel}>লেভেল {level} সম্পন্ন</Text>
          <View style={s.resultBtns}>
            <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#2E9E4F' }]} onPress={nextLevel}>
              <MaterialIcons name="navigate-next" size={24} color="#fff" />
              <Text style={s.bigBtnText}>পরের লেভেল</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={[s.bigBtn, { backgroundColor: '#7C4DFF' }]} onPress={playAgain}>
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

  const rows = lang === 'en' ? EN_ROWS : BN_ROWS;

  return (
    <SafeAreaView style={s.root}>
      <ScrollView contentContainerStyle={s.playScroll} showsVerticalScrollIndicator={false}>
        <View style={s.topRow}>
          <TouchableOpacity style={s.circleBtn} onPress={goHome}>
            <MaterialIcons name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={s.starPill}>
            <MaterialIcons name="star" size={18} color="#FFB300" />
            <Text style={s.starPillText}>{stars}</Text>
          </View>
          <View style={s.titleBox}>
            <Text style={s.playTitle}>{lang === 'en' ? 'Name Country Flower Fruit' : 'নাম দেশ ফুল ফল'}</Text>
            <View style={s.levelPill}>
              <Text style={s.levelPillText}>লেভেল {level}</Text>
            </View>
          </View>
          <View style={s.timerPill}>
            <MaterialIcons name="access-time" size={17} color="#2E7D32" />
            <Text style={s.timerText}>{`${pad(Math.floor(timeLeft / 60))}:${pad(timeLeft % 60)}`}</Text>
          </View>
        </View>

        <View style={s.letterRow}>
          <View style={s.letterCircle}>
            <Text style={[s.letterText, lang === 'en' && { fontSize: 52 }]}>{round.letter}</Text>
          </View>
          <View style={s.pointsBadge}>
            <Text style={s.pointsBadgeLabel}>এই অক্ষরের মোট পয়েন্ট</Text>
            <Text style={s.pointsBadgeValue}>
              {roundScore}
              <Text style={s.pointsBadgeTotal}> / 20</Text>
            </Text>
          </View>
        </View>

        <View style={s.grid}>
          {CATS.map((c) => {
            const val = values[c.key];
            const res = results ? results[c.key] : null;
            const done = counted[c.key];
            const border = done ? '#2E9E4F' : res === false ? '#E53935' : active === c.key ? c.color : '#E0E0E0';
            return (
              <TouchableOpacity
                key={c.key}
                activeOpacity={0.8}
                onPress={() => setActive(c.key)}
                style={[s.field, { width: fieldWidth, borderColor: border, borderWidth: active === c.key || res === false ? 2.5 : 1.5 }]}
              >
                <View style={[s.fieldHead, { backgroundColor: c.color }]}>
                  <Text style={s.fieldLabel}>{c.label}</Text>
                  <View style={s.plusPill}>
                    <MaterialIcons name="star" size={11} color="#FFB300" />
                    <Text style={s.plusPillText}>+5</Text>
                  </View>
                </View>
                <View style={s.fieldInput}>
                  <Text style={[s.fieldValue, !val && s.fieldPlaceholder]} numberOfLines={1}>
                    {val || c.placeholder}
                  </Text>
                  {active === c.key && <View style={s.caret} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {!!feedback && (
          <View style={s.feedbackBox}>
            <MaterialIcons name="info-outline" size={17} color="#B26A00" />
            <Text style={s.feedbackText}>{feedback}</Text>
          </View>
        )}
        {!!hintText && (
          <View style={[s.feedbackBox, { backgroundColor: '#E3F2FD', borderColor: '#90CAF9' }]}>
            <MaterialIcons name="lightbulb-outline" size={17} color="#1565C0" />
            <Text style={[s.feedbackText, { color: '#1565C0' }]}>{hintText}</Text>
          </View>
        )}
        {timeLeft === 0 && (
          <View style={[s.feedbackBox, { backgroundColor: '#FFEBEE', borderColor: '#EF9A9A' }]}>
            <MaterialIcons name="timer-off" size={17} color="#C62828" />
            <Text style={[s.feedbackText, { color: '#C62828' }]}>সময় শেষ! চাপা ছাড়া নিজে ঠিক করে জমা দাও।</Text>
          </View>
        )}
      </ScrollView>

      <View style={s.keyboardWrap}>
        {rows.map((row, i) => (
          <View key={`r${i}`} style={s.keyRow}>
            {row.map((k) => (
              <TouchableOpacity
                key={k}
                activeOpacity={0.7}
                onPress={() => pressKey(k)}
                style={[s.key, k === '⌫' && s.keyWide, k === '⌫' && { backgroundColor: '#B0BEC5' }]}
              >
                <Text style={[s.keyText, k === '⌫' && { fontSize: 16 }]}>{k}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={s.actionRow}>
        <TouchableOpacity activeOpacity={0.8} style={s.actionBtn} onPress={playAgain}>
          <MaterialIcons name="replay" size={19} color="#455A64" />
          <Text style={s.actionBtnText}>আবার খেলি</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.85} style={s.submitBtn} onPress={submit}>
          <MaterialIcons name="check" size={24} color="#fff" />
          <Text style={s.submitBtnText}>জমা দাও</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={s.actionBtn} onPress={showHint}>
          <MaterialIcons name="lightbulb-outline" size={19} color="#455A64" />
          <Text style={s.actionBtnText}>হিন্ট</Text>
          <View style={s.hintCost}>
            <MaterialIcons name="star" size={10} color="#FFB300" />
            <Text style={s.hintCostText}>-1</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#EAF6FF',
  },
  langBannerWrap: {
    height: 190,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  langScroll: {
    paddingBottom: 24,
  },
  langNativeAd: {
    marginTop: 20,
    marginHorizontal: 16,
    width: undefined,
  },
  langBanner: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  langBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  langGameTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  langPick: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    color: '#37474F',
    marginTop: 26,
    marginBottom: 18,
  },
  langBtns: {
    paddingHorizontal: 24,
    gap: 16,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 22,
    gap: 10,
  },
  langLetterBig: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 'auto',
  },
  langBtnText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
  },
  langBack: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    gap: 6,
    padding: 8,
  },
  langBackText: {
    color: '#37474F',
    fontSize: 15,
    fontWeight: '700',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 8,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F57C00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  starPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    borderColor: '#FFD54F',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 4,
  },
  starPillText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#5D4037',
  },
  titleBox: {
    flex: 1,
    alignItems: 'center',
  },
  playTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#1A237E',
    textAlign: 'center',
  },
  levelPill: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FFB74D',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    marginTop: 3,
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E65100',
  },
  timerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 10,
    gap: 4,
  },
  timerText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#2E7D32',
  },
  letterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 14,
    marginBottom: 12,
  },
  letterCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#42A5F5',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: {
    fontSize: 56,
    fontWeight: '900',
    color: '#1565C0',
  },
  pointsBadge: {
    backgroundColor: '#FFF8E1',
    borderColor: '#FFD54F',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pointsBadgeLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#5D4037',
  },
  pointsBadgeValue: {
    fontSize: 30,
    fontWeight: '900',
    color: '#E91E63',
    marginTop: 2,
  },
  pointsBadgeTotal: {
    fontSize: 20,
    fontWeight: '900',
    color: '#5D4037',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    gap: 12,
  },
  field: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 2,
  },
  fieldHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  fieldLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  plusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 1,
    gap: 2,
  },
  plusPillText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
  fieldInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 11,
    minHeight: 44,
  },
  fieldValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212121',
    flexShrink: 1,
  },
  fieldPlaceholder: {
    color: '#BDBDBD',
    fontWeight: '600',
  },
  caret: {
    width: 2,
    height: 18,
    backgroundColor: '#42A5F5',
    marginLeft: 3,
    borderRadius: 1,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: '#FFF8E1',
    borderColor: '#FFE082',
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    gap: 8,
  },
  feedbackText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '700',
    color: '#B26A00',
  },
  playScroll: {
    paddingBottom: 14,
  },
  keyboardWrap: {
    backgroundColor: '#FBE9D0',
    borderTopWidth: 2,
    borderColor: '#E8D3A9',
    paddingHorizontal: 5,
    paddingTop: 7,
    paddingBottom: 6,
    gap: 6,
  },
  keyRow: {
    flexDirection: 'row',
    gap: 5,
  },
  key: {
    flex: 1,
    backgroundColor: '#FFFDF7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0CFA8',
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyWide: {
    flexGrow: 1.6,
  },
  keyText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#4E342E',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    backgroundColor: '#EAF6FF',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#CFD8DC',
    borderWidth: 1.5,
    borderRadius: 24,
    paddingVertical: 11,
    paddingHorizontal: 14,
    gap: 5,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#455A64',
  },
  hintCost: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
    gap: 1,
  },
  hintCostText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#E65100',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E9E4F',
    borderRadius: 26,
    paddingVertical: 13,
    paddingHorizontal: 26,
    gap: 6,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  resultCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  resultStars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  resultTitle: {
    fontSize: 44,
    fontWeight: '900',
    color: '#F57C00',
    textShadowColor: 'rgba(255,183,77,0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  resultSub: {
    fontSize: 18,
    fontWeight: '700',
    color: '#546E7A',
    marginTop: 6,
    marginBottom: 20,
  },
  resultScorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#FFD54F',
    borderWidth: 2.5,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    gap: 10,
  },
  resultScoreText: {
    fontSize: 34,
    fontWeight: '900',
    color: '#E91E63',
  },
  resultLevel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#78909C',
    marginTop: 14,
    marginBottom: 28,
  },
  resultBtns: {
    flexDirection: 'row',
    gap: 14,
  },
  bigBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 26,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 6,
  },
  bigBtnText: {
    fontSize: 17,
    fontWeight: '900',
    color: '#fff',
  },
  resultHome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    gap: 6,
    padding: 8,
  },
  resultHomeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#37474F',
  },
});
