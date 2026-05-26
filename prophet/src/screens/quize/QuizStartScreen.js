import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

import { getQuizeData } from '../../db/quizeContents';
import SoundPlayer from 'react-native-sound-player';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function QuizStartScreen({ route, navigation }) {
  const { title, type, fetch_data } = route.params || {};

  const [originalData, setOriginalData] = useState([]); // মূল ব্যাকআপ ডাটা রাখার জন্য
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [retryMode, setRetryMode] = useState(false);
  const [isClaimed, setIsClaimed] = useState(false); // পয়েন্ট ক্লেইম হয়েছে কিনা ট্র্যাকিং করার জন্য

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
    setIsClaimed(false); // নতুন কুইজে ক্লেইম রিসেট
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
    setIsClaimed(false); // রিট্রাই করলে আবার ক্লেইম করার সুযোগ পাবে (ইচ্ছা হলে true রাখতে পারেন)
  };

  // ================= CLAIM POINT FUNCTION =================
  const handleClaimPoints = () => {
    if (score === 0) {
      Alert.alert('😢 দুঃখিত!', 'পয়েন্ট ক্লেইম করার জন্য অন্তত একটি সঠিক উত্তর দিতে হবে।');
      return;
    }
    
    const earnedPoints = score * 10;
    setIsClaimed(true);
    playSound('correct'); // বা অন্য কোনো কয়েন পাওয়ার সাউন্ড দিতে পারেন

    // এখানে আপনি আপনার Backend API বা AsyncStorage-এ পয়েন্ট সেভ করার কোড লিখতে পারেন।
    Alert.alert(
      '💰 অভিনন্দন!',
      `আপনি সফলভাবে ${earnedPoints} পয়েন্ট ক্লেইম করেছেন!`
    );
  };

  // ================= LOADING =================
  if (!question && !finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>⏳ কুইজ লোড হচ্ছে...</Text>
      </View>
    );
  }

  // ================= RESULT SCREEN =================
  if (finished) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* রেজাল্ট বক্স */}
        <View style={styles.resultBox}>
          <MaterialIcons name="emoji-events" size={50} color="#EAB308" style={styles.resultIcon} />
          <Text style={styles.doneTitle}>কুইজ শেষ হয়েছে</Text>
          <Text style={styles.scoreText}>আপনার মোট স্কোর</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreNumber}>{score}</Text>
            <Text style={styles.scoreTotal}>/ {total}</Text>
          </View>
        </View>

        {/* 💰 CLAIM POINT BUTTON (নতুন যুক্ত করা হয়েছে) */}
        <TouchableOpacity 
          style={[styles.claimBtn, isClaimed && styles.claimBtnDisabled]} 
          onPress={handleClaimPoints}
          disabled={isClaimed}
        >
          <MaterialIcons name="monetization-on" size={24} color="#FFF" style={styles.btnIconLeft} />
          <Text style={styles.claimText}>
            {isClaimed ? `পয়েন্ট ক্লেইম করা হয়েছে (${score * 10})` : `পয়েন্ট ক্লেইম করুন (${score * 10} Points)`}
          </Text>
        </TouchableOpacity>

        {/* রিট্রাই বাটন */}
        <TouchableOpacity style={styles.retryBtn} onPress={startRetry}>
          <MaterialIcons name="replay" size={20} color="#FFF" style={styles.btnIconLeft} />
          <Text style={styles.retryText}>ভুল উত্তরগুলো আবার চেষ্টা করুন</Text>
        </TouchableOpacity>

        <View style={styles.reviewHeader}>
          <MaterialIcons name="analytics" size={22} color="#475569" />
          <Text style={styles.reviewTitle}>উত্তরপত্র পর্যালোচনা:</Text>
        </View>

        {answers.map((item, i) => (
          <View key={i} style={[styles.reviewCard, item.isCorrect ? styles.borderCorrect : styles.borderWrong]}>
            <Text style={styles.qText}>
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
    );
  }

  // ================= QUIZ MAIN SCREEN =================
  return (
    <View style={styles.container}>
      
      <View style={styles.metaContainer}>
        <View style={styles.countBadge}>
          <MaterialIcons name="help-outline" size={16} color="#334155" style={styles.badgeIcon} />
          <Text style={styles.countText}>প্রশ্ন: {index + 1} / {total}</Text>
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

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>{question.name}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.optionsContainer}>
        {options.map((opt, i) => {
          if (opt === undefined || opt === null) return null;

          const isCorrect = opt === question.answer;
          const isSelected = selected === i;

          let bg = '#FFF';
          let border = '#E5E7EB';
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
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextBtn, isLocked ? styles.nextBtnActive : styles.nextBtnDisabled]}
        onPress={nextQuestion}
      >
        <Text style={styles.nextText}>পরবর্তী প্রশ্ন</Text>
        <MaterialIcons name="arrow-forward" size={20} color="#FFF" style={styles.btnIconRight} />
      </TouchableOpacity>
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  loadingText: { fontSize: 16, color: '#64748B', fontWeight: '500' },
  metaContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, marginTop: 10 },
  countBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, flexDirection: 'row', alignItems: 'center' },
  badgeIcon: { marginRight: 4 },
  countText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  timerRow: { flexDirection: 'row', alignItems: 'center' },
  timer: { fontSize: 15, fontWeight: 'bold', color: '#0EA5E9', marginLeft: 4 },
  timerUrgent: { color: '#EF4444' },
  progressBarBackground: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginBottom: 25, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 3 },
  card: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3, marginBottom: 20 },
  question: { fontSize: 18, fontWeight: '700', color: '#1E293B', lineHeight: 26 },
  optionsContainer: { flex: 1 },
  option: { padding: 16, borderRadius: 12, borderWidth: 2, marginBottom: 12, flexDirection: 'row', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  optionIcon: { marginRight: 10 },
  optionText: { fontSize: 16, fontWeight: '500', flex: 1 },
  nextBtn: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 10, flexDirection: 'row' },
  nextBtnActive: { backgroundColor: '#6366F1' },
  nextBtnDisabled: { backgroundColor: '#94A3B8' },
  nextText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  btnIconRight: { marginLeft: 8 },
  btnIconLeft: { marginRight: 8 },
  
  // রেজাল্ট ডিজাইন
  resultBox: { alignItems: 'center', backgroundColor: '#FFF', padding: 25, borderRadius: 20, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 4, marginTop: 10 },
  resultIcon: { marginBottom: 10 },
  doneTitle: { fontSize: 22, fontWeight: '800', color: '#1E293B', marginBottom: 5 },
  scoreText: { fontSize: 14, color: '#64748B', marginBottom: 15 },
  scoreCircle: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#EEF2FF', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 3, borderColor: '#6366F1' },
  scoreNumber: { fontSize: 32, fontWeight: '800', color: '#6366F1' },
  scoreTotal: { fontSize: 16, color: '#64748B', fontWeight: '600', marginLeft: 2, marginTop: 8 },
  
  // 💰 CLAIM POINT BUTTON STYLES
  claimBtn: { backgroundColor: '#EAB308', padding: 14, borderRadius: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#EAB308', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 3 },
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