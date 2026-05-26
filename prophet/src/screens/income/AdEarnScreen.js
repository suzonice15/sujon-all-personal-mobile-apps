import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addEarning, hasClaimedAdToday } from '../../db/earnings';
import { usePoints } from '../../context/PointsContext';
import { isOnline } from '../../utils/helper'; // আপনার বানানো হেল্পার মেথড

// ২০টি বক্সের অ্যারে
const BOXES = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

export default function AdEarnScreen() {
  const { refreshPoints } = usePoints();
  const [loading, setLoading] = useState(null);

  // ক্লেইম হওয়া বক্সগুলোর আইডি অবজেক্ট আকারে রাখবো দ্রুত চেকিংয়ের জন্য { '1': true, '2': true }
  const [claimedBoxes, setClaimedBoxes] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  // স্ক্রিনে ফোকাস আসলে ডাটাবেজ থেকে চেক করবে
  useFocusEffect(
    useCallback(() => {
      const checkBoxesStatus = async () => {
        setInitialLoading(true);
        let statusMap = {};

        try {
          // ২০টি বক্স লুপ চালিয়ে আলাদা আলাদা চেক করবে
          for (let box of BOXES) {
            // ডাটাবেজে অবশ্যই box.id পাঠিয়ে চেক করতে হবে
            const isClaimed = await hasClaimedAdToday(box.id);
            if (isClaimed) {
              statusMap[box.id] = true; // যেমন: { '1': true, '5': true }
            }
          }
          setClaimedBoxes(statusMap);
        } catch (error) {
          console.log('Error checking boxes:', error);
        } finally {
          setInitialLoading(false);
        }
      };

      checkBoxesStatus();
    }, [])
  );

  const handleBoxPress = async (boxId) => {
    // শুধুমাত্র ক্লিক করা নির্দিষ্ট বক্সটি ক্লেইমড কিনা চেক
    if (claimedBoxes[boxId] || loading) return;

    setLoading(boxId);

    // রিয়েল ইন্টারনেট চেক
    const online = await isOnline();
    if (!online) {
      ToastAndroid.show('ইন্টারনেট সংযোগ নেই!', ToastAndroid.SHORT);
      setLoading(null);
      return;
    }

    try {
      // ডাটাবেজে পয়েন্ট যোগ করার সময় boxId পাস করা বাধ্যতামূলক
      await addEarning(2000, `বিজ্ঞাপন বক্স ${boxId}`, 100, boxId);
      await refreshPoints();

      // শুধুমাত্র ক্লিক করা বক্সের আইডিটিকে ট্রু (True) করে দেওয়া হচ্ছে
      setClaimedBoxes(prev => ({
        ...prev,
        [boxId]: true
      }));

      ToastAndroid.show(`🎉 ${boxId} নম্বর বক্সের ১০০ পয়েন্ট অর্জন হয়েছে!`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('পয়েন্ট যোগ করতে সমস্যা হয়েছে', ToastAndroid.SHORT);
    } finally {
      setLoading(null);
    }
  };

  const renderBox = ({ item }) => {
    const isLoading = loading === item.id;
    // 🎯 মূল ফিক্স: এখানে শুধুমাত্র এই নির্দিষ্ট বক্সের আইডি চেক হচ্ছে
    const isThisBoxClaimed = !!claimedBoxes[item.id];

    return (
      <TouchableOpacity
        style={[styles.box, isThisBoxClaimed && styles.boxDisabled]}
        activeOpacity={isThisBoxClaimed ? 1 : 0.75}
        onPress={() => handleBoxPress(item.id)}>
        {isLoading ? (
          <ActivityIndicator color="#4F46E5" />
        ) : isThisBoxClaimed ? (
          <>
            <MaterialIcons name="check-circle" size={32} color="#94A3B8" />
            <Text style={styles.boxLabelDisabled}>সম্পন্ন</Text>
          </>
        ) : (
          <>
            <MaterialIcons name="play-circle-filled" size={32} color="#4F46E5" />
            <Text style={styles.boxLabel}>বিজ্ঞাপন {item.id}</Text>
            <Text style={styles.boxPoints}>+১০০ পয়েন্ট</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  const totalClaimed = Object.keys(claimedBoxes).length;

  if (initialLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.loadingText}>বক্স লোড হচ্ছে...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.infoBox, totalClaimed === BOXES.length && styles.infoBoxDone]}>
        <MaterialIcons
          name={totalClaimed === BOXES.length ? 'check-circle' : 'info-outline'}
          size={18}
          color={totalClaimed === BOXES.length ? '#27ae60' : '#4F46E5'}
        />
        <Text style={[styles.infoText, totalClaimed === BOXES.length && styles.infoTextDone]}>
          {totalClaimed === BOXES.length
            ? 'সবগুলো বক্সের পয়েন্ট নেওয়া শেষ! আগামীকাল আবার আসুন।'
            : `যেকোনো বক্সে ক্লিক করুন এবং ১০০ পয়েন্ট অর্জন করুন (সম্পন্ন: ${totalClaimed}/${BOXES.length})`}
        </Text>
      </View>

      <FlatList
        data={BOXES}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderBox}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, color: '#64748B', fontSize: 14 },
  infoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    margin: 14, padding: 14,
    backgroundColor: '#EEF2FF', borderRadius: 12,
    borderWidth: 1, borderColor: '#E0E7FF'
  },
  infoBoxDone: { backgroundColor: '#E8F8F0', borderColor: '#D1FAE5' },
  infoText: { flex: 1, fontSize: 13, color: '#4F46E5', fontWeight: '500', lineHeight: 20 },
  infoTextDone: { color: '#27ae60' },
  grid: { paddingHorizontal: 10, paddingBottom: 20 },
  box: {
    flex: 1, margin: 6, aspectRatio: 1,
    backgroundColor: '#fff', borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
    elevation: 3, gap: 6,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3
  },
  boxDisabled: { backgroundColor: '#F1F5F9', elevation: 0 },
  boxLabel: { fontSize: 13, color: '#334155', fontWeight: '600' },
  boxLabelDisabled: { fontSize: 13, color: '#94A3B8', fontWeight: '600' },
  boxPoints: { fontSize: 12, color: '#10B981', fontWeight: 'bold' },
});