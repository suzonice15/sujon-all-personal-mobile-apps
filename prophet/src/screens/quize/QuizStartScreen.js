import React, { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { getQuizeData } from '../../db/quizeContents';
import SoundPlayer from 'react-native-sound-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import AdBanner from '../../components/ads/AdBanner';
import useAdRewarded from '../../components/ads/AdRewarded';
import { addEarning } from '../../db/earnings';
import { addCoins } from '../../db/coins';
import { useCoins } from '../../context/CoinsContext';
import { story_detail_per_box, story_detail_points, ADMOB_ENABLED } from '../../config/url';
import { getCooldown, setCooldown, setLastClaimTime, getLastClaimTime } from '../../db/settings';
import AdNative from '../../components/ads/AdNative';


export default function QuizStartScreen({ route, navigation }) {
  const { title, type, fetch_data } = route.params || {};
  const { colors } = useTheme();
  const { refreshCoins } = useCoins();

  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [retryMode, setRetryMode] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false);
  const [claimingCoin, setClaimingCoin] = useState(false);
  const [claimCooldown, setClaimCooldown] = useState(0);
  const [claimCooldownSec, setClaimCooldownSec] = useState(60);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title || 'কুইজ',
    });
  }, [navigation, title]);

  useEffect(() => {
    loadData();
  }, [fetch_data]);

  const loadData = async () => {
    const res = await getQuizeData(type, fetch_data);
    const quizData = res || [];
    setOriginalData(quizData); // মূল ডাটা ব্যাকআপ রাখলাম
    setData(quizData);
    resetAll();
  };

  const resetAll = () => {
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setFinished(false);
    setRetryMode(false);
    setSelected(null);
    setIsLocked(false);
    setTimeLeft(10);
    setIsClaimed(false);
    setClaimingCoin(false);
  };

  const question = data?.[index];

  const options = question
    ? [
        question.option_a,
        question.option_b,
        question.option_c,
        question.option_d,
      ]
    : [];

  const total = data.length;
  const progressPercent = total > 0 ? ((index + 1) / total) * 100 : 0;

  // ================= TIMER =================
  useEffect(() => {
    if (finished || !question) return;

    if (timeLeft === 0) {
      autoNext();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, index, finished, question]);

  useEffect(() => {
    setTimeLeft(10);
  }, [index]);

  // ================= SOUND =================
  const playSound = (file) => {
    try {
      SoundPlayer.playSoundFile(file, 'mp3');
    } catch (e) {
      console.log('Sound error:', e);
    }
  };

  // ================= ANSWER =================
  const handleAnswer = (i) => {
    if (isLocked || !question) return;

    setSelected(i);
    setIsLocked(true);

    const isCorrect = options[i] === question.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('wrong');
    }

    setAnswers(prev => [
      ...prev,
      {
        questionId: question.id || question.name,
        question: question.name,
        selected: options[i],
        correct: question.answer,
        isCorrect,
      },
    ]);
  };

  // ================= AUTO NEXT =================
  const autoNext = () => {
    if (!question) return;

    if (!isLocked && selected === null) {
      setAnswers(prev => [
        ...prev,
        {
          questionId: question.id || question.name,
          question: question.name,
          selected: 'উত্তর দেওয়া হয়নি',
          correct: question.answer,
          isCorrect: false,
        },
      ]);
    }

    setSelected(null);
    setIsLocked(false);

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
      playSound('finish');
    }
  };

  const nextQuestion = () => {
    if (selected === null) {
      Alert.alert('⚠️ দুঃখিত', 'দয়া করে একটি উত্তর নির্বাচন করুন');
      return;
    }
    autoNext();
  };

  // ================= RETRY =================
  const startRetry = () => {
    const wrongAnswers = answers.filter(a => !a.isCorrect);
    const wrongQuestionIds = wrongAnswers.map(a => a.questionId);

    if (wrongAnswers.length === 0) {
      Alert.alert('🎉 চমৎকার!', 'আপনার সব উত্তর সঠিক হয়েছে।');
      return;
    }

    const filteredWrongQuestions = originalData.filter(q => 
      wrongQuestionIds.includes(q.id || q.name)
    );

    setData(filteredWrongQuestions);
    setIndex(0);
    setScore(0);
    setAnswers([]);
    setFinished(false);
    setRetryMode(true);
    setTimeLeft(10);
    setIsClaimed(false);
    setClaimingCoin(false);
  };

  const earnedCoins = story_detail_per_box ;

  const onEarnedQuizCoin = () => {
    doClaimCoin();
  };

  const { showAd: showQuizAd } = useAdRewarded(onEarnedQuizCoin);

  const doClaimCoin = async () => {
    await addCoins(earnedCoins, 'কুইজ পুরস্কার');
    await refreshCoins();
    await setCooldown(claimCooldownSec);
    await setLastClaimTime();
    setIsClaimed(true);
    setClaimingCoin(false);
    setClaimCooldown(claimCooldownSec);
    playSound('finish');
    ToastAndroid.show(`${earnedCoins} কয়েন ও ${score * 10} পয়েন্ট পেয়েছেন!`, ToastAndroid.SHORT);
  };

  const pointsClaimed = useRef(false);

  const handleClaimCoin = async () => {
    if (score === 0) {
      Alert.alert('😢 দুঃখিত!', 'ক্লেইম করার জন্য অন্তত একটি সঠিক উত্তর দিতে হবে।');
      return;
    }
    // পয়েন্ট শুধু প্রথমবার
    if (!pointsClaimed.current) {
      await addEarning(fetch_data, title || 'কুইজ', score * 10);
      pointsClaimed.current = true;
    }

    setClaimingCoin(true);
    if (!showQuizAd()) {
      setClaimingCoin(false);
      if (!ADMOB_ENABLED) {
        doClaimCoin();
      } else {
        ToastAndroid.show('বিজ্ঞাপন লোড হচ্ছে, আবার চেষ্টা করুন', ToastAndroid.SHORT);
      }
    }
  };

  useFocusEffect(useCallback(() => {
    (async () => {
      const sec = await getCooldown();
      setClaimCooldownSec(sec);
      const lastClaim = await getLastClaimTime();
      if (lastClaim > 0) {
        const elapsed = Math.floor((Date.now() - lastClaim) / 1000);
        const remaining = Math.max(0, sec - elapsed);
        if (remaining > 0) setClaimCooldown(remaining);
      }
    })();
  }, []));

  useEffect(() => {
    if (claimCooldown > 0) {
      const t = setInterval(() => {
        setClaimCooldown(prev => {
          if (prev <= 1) { clearInterval(t); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(t);
    }
  }, [claimCooldown]);

  // ================= LOADING =================
  if (!question && !finished) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.loadingText, { color: colors.onSurface }]}>⏳ কুইজ লোড হচ্ছে...</Text>
      </View>
    );
  }

  // ================= RESULT SCREEN =================
  if (finished) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
        <View style={[styles.resultBox, { backgroundColor: colors.surface }]}>
          <View style={styles.resultLeft}>
            <MaterialIcons name="emoji-events" size={40} color="#EAB308" />
            <Text style={[styles.doneTitle, { color: colors.onSurface }]}>কুইজ শেষ হয়েছে</Text>
            <Text style={[styles.scoreText, { color: colors.onSurface, opacity: 0.6 }]}>আপনার মোট স্কোর</Text>
          </View>
          <View style={[styles.scoreCircle, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
            <Text style={[styles.scoreNumber, { color: colors.primary }]}>{score}</Text>
            <Text style={[styles.scoreTotal, { color: colors.onSurface }]}>/ {total}</Text>
          </View>
        </View>

        {/* একটি বাটন — পয়েন্ট auto, কয়েন rewarded ad দেখে */}
        <TouchableOpacity 
          style={[styles.claimBtn, styles.coinClaimBtn, (isClaimed || claimingCoin || claimCooldown > 0) && styles.claimBtnDisabled]} 
          onPress={handleClaimCoin}
          disabled={isClaimed || claimingCoin || claimCooldown > 0}
        >
          <MaterialIcons name="monetization-on" size={22} color="#FFF" style={styles.btnIconLeft} />
          <Text style={styles.claimText}>
            {claimingCoin ? 'লোড হচ্ছে...' : claimCooldown > 0 ? `অপেক্ষা করুন ${claimCooldown} সেকেন্ড` : isClaimed ? `নেওয়া হয়েছে (${score * 10} পয়েন্ট + ${earnedCoins} কয়েন)` : `পুরস্কার নিন (${score * 10} পয়েন্ট + ${earnedCoins} কয়েন)`}
          </Text>
        </TouchableOpacity>

                <AdNative style={{ marginBottom: 5, marginTop: 10 }} />


        {/* রিট্রাই বাটন — শুধু ভুল উত্তর থাকলে */}
        {answers.filter(a => !a.isCorrect).length > 0 && (
        <TouchableOpacity style={styles.retryBtn} onPress={startRetry}>
          <MaterialIcons name="replay" size={20} color="#FFF" style={styles.btnIconLeft} />
          <Text style={styles.retryText}>ভুল উত্তরগুলো আবার চেষ্টা করুন</Text>
        </TouchableOpacity>
        )}

        <View style={styles.reviewHeader}>
          <MaterialIcons name="analytics" size={22} color={colors.onSurface} />
          <Text style={[styles.reviewTitle, { color: colors.onSurface }]}>উত্তরপত্র পর্যালোচনা:</Text>
        </View>

        {answers.map((item, i) => (
          <View key={i} style={[styles.reviewCard, { backgroundColor: colors.surface }, item.isCorrect ? styles.borderCorrect : styles.borderWrong]}>
            <Text style={[styles.qText, { color: colors.onSurface }]}>
              {i + 1}. {item.question}
            </Text>

            <View style={styles.reviewStatusRow}>
              <MaterialIcons 
                name={item.isCorrect ? "check-circle" : "cancel"} 
                size={18} 
                color={item.isCorrect ? "#10B981" : "#EF4444"} 
              />
              <Text style={[styles.reviewAnswer, item.isCorrect ? styles.correctText : styles.wrongText]}>
                আপনার উত্তর: {item.selected}
              </Text>
            </View>

            {!item.isCorrect && (
              <View style={styles.reviewStatusRow}>
                <MaterialIcons name="check-circle" size={18} color="#10B981" />
                <Text style={[styles.reviewAnswer, styles.correctText]}>
                  সঠিক উত্তর: {item.correct}
                </Text>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={20} color="#FFF" style={styles.btnIconLeft} />
          <Text style={styles.btnText}>নতুন কুইজ শুরু করুন</Text>
        </TouchableOpacity>
      </ScrollView>
      <AdBanner />
      </View>
    );
  }

  // ================= QUIZ MAIN SCREEN =================
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.metaContainer}>
        <View style={[styles.countBadge, { backgroundColor: colors.surface }]}>
          <MaterialIcons name="help-outline" size={16} color={colors.onSurface} style={styles.badgeIcon} />
          <Text style={[styles.countText, { color: colors.onSurface }]}>প্রশ্ন: {index + 1} / {total}</Text>
        </View>
        <View style={styles.timerRow}>
          <MaterialIcons 
            name="hourglass-top" 
            size={18} 
            color={timeLeft <= 3 ? "#EF4444" : "#0EA5E9"} 
          />
          <Text style={[styles.timer, timeLeft <= 3 ? styles.timerUrgent : null]}>
            {timeLeft} সেকেন্ড
          </Text>
        </View>
      </View>

      <View style={[styles.progressBarBackground, { backgroundColor: colors.surface }]}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%`, backgroundColor: colors.primary }]} />
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Text style={[styles.question, { color: colors.onSurface }]}>{question.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.optionsContainer}>
        {options.map((opt, i) => {
          if (opt === undefined || opt === null) return null;

          const isCorrect = opt === question.answer;
          const isSelected = selected === i;

          let bg = colors.surface;
          let border = colors.surface;
          let textColor = '#1F2937';
          let iconName = "radio-button-unchecked";
          let iconColor = "#94A3B8";

          if (isLocked) {
            if (isCorrect) {
              bg = '#DCFCE7';
              border = '#22C55E';
              textColor = '#15803D';
              iconName = "check-circle";
              iconColor = "#22C55E";
            } else if (isSelected) {
              bg = '#FEE2E2';
              border = '#EF4444';
              textColor = '#B91C1C';
              iconName = "cancel";
              iconColor = "#EF4444";
            }
          } else if (isSelected) {
            bg = '#EEF2FF';
            border = '#6366F1';
            iconName = "radio-button-checked";
            iconColor = '#6366F1';
          }

          return (
            <TouchableOpacity
              key={i}
              disabled={isLocked}
              style={[styles.option, { backgroundColor: bg, borderColor: border }]}
              onPress={() => handleAnswer(i)}
            >
              <MaterialIcons name={iconName} size={20} color={iconColor} style={styles.optionIcon} />
              <Text style={[styles.optionText, { color: textColor }]}>{opt}</Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          style={[styles.nextBtn, isLocked ? styles.nextBtnActive : styles.nextBtnDisabled]}
          onPress={nextQuestion}
        >
          <Text style={styles.nextText}>পরবর্তী প্রশ্ন</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#FFF" style={styles.btnIconRight} />
        </TouchableOpacity>
        <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
       
      </ScrollView>
       <AdBanner />
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 5,paddingLeft:20,paddingRight:20, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  loadingText: { fontSize: 16, color: '#64748B', fontWeight: '500' },
  metaContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 0 },
  countBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  badgeIcon: { marginRight: 4 },
  countText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  timerRow: { flexDirection: 'row', alignItems: 'center' },
  timer: { fontSize: 15, fontWeight: 'bold', color: '#0EA5E9', marginLeft: 4 },
  timerUrgent: { color: '#EF4444' },
  progressBarBackground: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginBottom: 15, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 3 },
  card: { backgroundColor: '#FFF', padding: 12, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 0, marginBottom: 10 },
  question: { fontSize: 16, fontWeight: '700', color: '#1E293B', lineHeight: 26 },
  optionsContainer: { flex: 1 },
  option: { padding: 10, borderRadius: 8, borderWidth: 1.5, marginBottom: 8, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 0 },
  optionIcon: { marginRight: 10 },
  optionText: { fontSize: 16, fontWeight: '500', flex: 1 },
  nextBtn: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 10, flexDirection: 'row' },
  nextBtnActive: { backgroundColor: '#6366F1' },
  nextBtnDisabled: { backgroundColor: '#94A3B8' },
  nextText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnIconRight: { marginLeft: 8 },
  btnIconLeft: { marginRight: 8 },
  
  // রেজাল্ট ডিজাইন
  resultBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 0, marginTop: 10 },
  resultLeft: { flexDirection: 'column', alignItems: 'flex-start', flex: 1 },
  resultIcon: { marginBottom: 10 },
  doneTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginTop: 4 },
  scoreText: { fontSize: 13, color: '#64748B' },
  scoreCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 3, borderColor: '#6366F1' },
  scoreNumber: { fontSize: 28, fontWeight: '800', color: '#6366F1' },
  scoreTotal: { fontSize: 14, color: '#64748B', fontWeight: '600', marginLeft: 2, marginTop: 6 },
  
  // 💰 CLAIM POINT BUTTON STYLES
  claimBtn: { backgroundColor: '#EAB308', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#EAB308', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 0 },
  coinClaimBtn: { backgroundColor: '#10B981', shadowColor: '#10B981' },
  claimBtnDisabled: { backgroundColor: '#CBD5E1', shadowOpacity: 0, elevation: 0 },
  claimText: { color: '#FFF', fontWeight: '700', fontSize: 16 },

  retryBtn: { backgroundColor: '#10B981', padding: 14, borderRadius: 12, marginBottom: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  retryText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginTop: 5 },
  reviewTitle: { fontSize: 16, fontWeight: '700', color: '#475569', marginLeft: 6 },
  reviewCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 12, borderLeftWidth: 5 },
  borderCorrect: { borderColor: '#10B981' },
  borderWrong: { borderColor: '#EF4444' },
  qText: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  reviewStatusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  reviewAnswer: { fontSize: 14, fontWeight: '500', marginLeft: 6 },
  correctText: { color: '#10B981' },
  wrongText: { color: '#EF4444' },
  primaryBtn: { backgroundColor: '#6366F1', padding: 16, borderRadius: 12, marginTop: 15, marginBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { color: '#FFF', textAlign: 'center', fontWeight: '700', fontSize: 15 },
});