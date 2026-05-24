import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { getQuizeData } from '../../db/quizeContents';

import Sound from 'react-native-sound';

Sound.setCategory('Playback');


export default function QuizStartScreen({ route, navigation }) {

  const { item } = route.params;

  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  // TIMER
  const [timeLeft, setTimeLeft] = useState(10);

  // RETRY MODE
  const [retryMode, setRetryMode] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.sub_category,
    });
  }, [navigation]);

  useEffect(() => {
    loadData();
  }, [item.sub_category]);

  const loadData = async () => {
    const res = await getQuizeData('sub_category', item.sub_category);

    setData(res || []);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsLocked(false);
    setFinished(false);
    setAnswers([]);
    setTimeLeft(10);
    setRetryMode(false);
  };

  // SAFE QUESTION (FIX CRASH)
  const question = data?.[index];

  const options = question
    ? [question.option_a, question.option_b, question.option_c, question.option_d]
    : [];

  const total = data.length;

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

  // ================= ANSWER =================
  const handleAnswer = (i) => {
    if (isLocked || !question) return;

    setSelected(i);
    setIsLocked(true);

    const isCorrect = options[i] === question.answer;

    if (isCorrect) setScore(prev => prev + 1);

    setAnswers(prev => [
      ...prev,
      {
        question: question.name,
        selected: options[i],
        correct: question.answer,
        isCorrect
      }
    ]);
  };

  // ================= AUTO NEXT =================
  const autoNext = () => {
    if (!question) return;

    if (!isLocked && selected === null) {
      setAnswers(prev => [
        ...prev,
        {
          question: question.name,
          selected: "উত্তর দেওয়া হয়নি",
          correct: question.answer,
          isCorrect: false
        }
      ]);
    }

    setSelected(null);
    setIsLocked(false);

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const nextQuestion = () => {
    if (selected === null) {
      Alert.alert('⚠️ দয়া করে একটি উত্তর নির্বাচন করুন');
      return;
    }
    autoNext();
  };

  // ================= RETRY MODE =================
  const startRetry = () => {
    const wrong = answers.filter(a => !a.isCorrect);

    if (wrong.length === 0) {
      Alert.alert("🎉 সব উত্তর সঠিক");
      return;
    }

    const mapped = wrong.map(w => ({
      name: w.question,
      option_a: w.selected,
      option_b: w.correct,
      option_c: "",
      option_d: "",
      answer: w.correct
    }));

    setData(mapped);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setIsLocked(false);
    setAnswers([]);
    setFinished(false);
    setRetryMode(true);
    setTimeLeft(10);
  };

  // ================= LOADING / SAFE =================
  if (!question && !finished) {
    return (
      <View style={styles.center}>
        <Text>⏳ কুইজ লোড হচ্ছে...</Text>
      </View>
    );
  }

  // ================= RESULT SCREEN =================
  if (finished) {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.resultBox}>
          <Text style={styles.doneTitle}>🎉 কুইজ শেষ হয়েছে</Text>
          <Text style={styles.score}>স্কোর: {score} / {total}</Text>
        </View>

        <TouchableOpacity style={styles.retryBtn} onPress={startRetry}>
          <Text style={styles.retryText}>🔁 ভুল উত্তর আবার চেষ্টা করুন</Text>
        </TouchableOpacity>

        <Text style={styles.section}>📌 বিস্তারিত ফলাফল</Text>

        {answers.map((item, i) => (
          <View key={i} style={styles.reviewCard}>
            <Text style={styles.qText}>{i + 1}. {item.question}</Text>

            <Text style={item.isCorrect ? styles.correct : styles.wrong}>
              আপনার উত্তর: {item.selected}
            </Text>

            {!item.isCorrect && (
              <Text style={styles.correct}>
                সঠিক উত্তর: {item.correct}
              </Text>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>⬅ ফিরে যান</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }

  // ================= QUIZ SCREEN =================
  return (
    <View style={styles.container}>

      {/* TIMER */}
      <Text style={styles.timer}>⏱ সময়: {timeLeft} সেকেন্ড</Text>

      {/* PROGRESS */}
      <View style={styles.progressBox}>
        <View style={[styles.progress, { width: `${((index + 1) / total) * 100}%` }]} />
      </View>

      <Text style={styles.count}>
        প্রশ্ন {index + 1} / {total}
      </Text>

      {/* QUESTION */}
      <View style={styles.card}>
        <Text style={styles.question}>{question?.name}</Text>
      </View>

      {/* OPTIONS */}
      {options.map((opt, i) => {
        const isCorrect = opt === question.answer;
        const isSelected = selected === i;

        let bg = '#fff';
        let border = '#E5E7EB';

        if (isLocked) {
          if (isCorrect) {
            bg = '#DCFCE7';
            border = '#22C55E';
          }
          else if (isSelected) {
            bg = '#FEE2E2';
            border = '#EF4444';
          }
        }
        else if (isSelected) {
          bg = '#E0E7FF';
          border = '#4F46E5';
        }

        return (
          <TouchableOpacity
            key={i}
            style={[styles.option, { backgroundColor: bg, borderColor: border }]}
            onPress={() => handleAnswer(i)}
          >
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        );
      })}

      {/* NEXT */}
      <TouchableOpacity
        style={[styles.nextBtn, selected === null && styles.nextDisabled]}
        onPress={nextQuestion}
      >
        <Text style={styles.nextText}>পরবর্তী প্রশ্ন</Text>
      </TouchableOpacity>

    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  timer: {
    textAlign: 'right',
    color: '#DC2626',
    fontWeight: '600',
    marginBottom: 5,
  },

  progressBox: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progress: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },

  count: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
  },

  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  option: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 14,
    color: '#111827',
  },

  nextBtn: {
    marginTop: 20,
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
  },

  nextDisabled: {
    backgroundColor: '#A5B4FC',
  },

  nextText: {
    color: '#fff',
    fontWeight: '700',
  },

  resultBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  doneTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  score: {
    fontSize: 16,
    color: '#4F46E5',
  },

  retryBtn: {
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },

  retryText: {
    color: '#fff',
    fontWeight: '700',
  },

  section: {
    fontWeight: 'bold',
    marginVertical: 10,
  },

  reviewCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  qText: {
    fontWeight: '600',
    marginBottom: 5,
  },

  correct: {
    color: '#16A34A',
  },

  wrong: {
    color: '#DC2626',
  },

  primaryBtn: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});