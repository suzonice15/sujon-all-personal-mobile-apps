import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getQuizeData } from '../../db/quizeContents';

export default function QuizStartScreen({ route, navigation }) {

  const { item } = route.params;

  const [data, setData] = useState([]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [finished, setFinished] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.sub_category,
    });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getQuizeData('sub_category', item.sub_category);
        setData(response || []);
        setIndex(0);
        setScore(0);
        setFinished(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, [item.sub_category]);

  const question = data[index];

  if (!question) {
    return (
      <View style={styles.center}>
        <Text>Loading কুইজ...</Text>
      </View>
    );
  }

  const options = [
    question.option_a,
    question.option_b,
    question.option_c,
    question.option_d,
  ];

  const total = data.length;

  const handleAnswer = (i) => {
    if (isLocked) return;

    setSelected(i);
    setIsLocked(true);

    const selectedOption = options[i];

    if (selectedOption === question.answer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setIsLocked(false);

    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <View style={styles.center}>
        <Text style={styles.doneTitle}>🎉 কুইজ Completed</Text>
        <Text style={styles.score}>
          Score: {score} / {total}
        </Text>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* PROGRESS */}
      <View style={styles.progressBox}>
        <View
          style={[
            styles.progress,
            { width: `${((index + 1) / total) * 100}%` }
          ]}
        />
      </View>

      <Text style={styles.count}>
        প্রশ্ন {index + 1} / {total}
      </Text>

      {/* QUESTION */}
      <View style={styles.card}>
        <Text style={styles.question}>{question.name}</Text>
      </View>

      {/* OPTIONS */}
      {options.map((opt, i) => {
        const isCorrect = opt === question.answer;
        const isSelected = selected === i;

        let bg = '#fff';
        let border = '#ddd';

        if (isLocked) {
          if (isCorrect) {
            bg = '#DCFCE7';
            border = '#22C55E';
          } else if (isSelected) {
            bg = '#FEE2E2';
            border = '#EF4444';
          }
        } else if (isSelected) {
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

      {/* NEXT BUTTON */}
      <TouchableOpacity style={styles.nextBtn} onPress={nextQuestion}>
        <Text style={styles.nextText}>Next Question</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },

  progressBox: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },

  progress: {
    height: '100%',
    backgroundColor: '#4F46E5',
  },

  count: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
  },

  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },

  option: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },

  optionText: {
    fontSize: 14,
    color: '#111',
  },

  nextBtn: {
    marginTop: 15,
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  nextText: {
    color: '#fff',
    fontWeight: '700',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  doneTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  score: {
    fontSize: 18,
    marginBottom: 20,
  },

  primaryBtn: {
    backgroundColor: '#4F46E5',
    padding: 14,
    borderRadius: 12,
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});