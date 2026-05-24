import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, ToastAndroid, ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addEarning, hasClaimedAdToday } from '../../db/earnings';
import { usePoints } from '../../context/PointsContext';

const BOXES = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

const isOnline = async () => {
  try {
    const res = await fetch('https://www.google.com', { method: 'HEAD' });
    return res.ok;
  } catch { return false; }
};

export default function AdEarnScreen() {
  const { refreshPoints } = usePoints();
  const [loading, setLoading] = useState(null);
  const [claimed, setClaimed] = useState(false); // আজকে already click করেছে কিনা

  useFocusEffect(useCallback(() => {
    hasClaimedAdToday().then(setClaimed);
  }, []));

  const handleBoxPress = async (boxId) => {
    if (claimed || loading) return;
    setLoading(boxId);

    const online = await isOnline();
    if (!online) {
      ToastAndroid.show('ইন্টারনেট সংযোগ নেই!', ToastAndroid.SHORT);
      setLoading(null);
      return;
    }

    await addEarning(2000, 'বিজ্ঞাপন বক্স', 100);
    await refreshPoints();
    setClaimed(true);
    setLoading(null);
    ToastAndroid.show('🎉 ১০০ পয়েন্ট অর্জন হয়েছে!', ToastAndroid.SHORT);
  };

  const renderBox = ({ item }) => {
    const isLoading = loading === item.id;
    return (
      <TouchableOpacity
        style={[styles.box, claimed && styles.boxDisabled]}
        activeOpacity={claimed ? 1 : 0.75}
        onPress={() => handleBoxPress(item.id)}>
        {isLoading ? (
          <ActivityIndicator color="#4F46E5" />
        ) : claimed ? (
          <>
            <MaterialIcons name="check-circle" size={32} color="#ccc" />
            <Text style={styles.boxLabelDisabled}>সম্পন্ন</Text>
          </>
        ) : (
          <>
            <MaterialIcons name="play-circle-filled" size={32} color="#4F46E5" />
            <Text style={styles.boxLabel}>বিজ্ঞাপন</Text>
            <Text style={styles.boxPoints}>+১০০ পয়েন্ট</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.infoBox, claimed && styles.infoBoxDone]}>
        <MaterialIcons
          name={claimed ? 'check-circle' : 'info-outline'}
          size={18}
          color={claimed ? '#27ae60' : '#4F46E5'}
        />
        <Text style={[styles.infoText, claimed && styles.infoTextDone]}>
          {claimed
            ? 'আজকের পয়েন্ট নেওয়া হয়েছে। আগামীকাল আবার আসুন!'
            : 'যেকোনো একটি বক্সে ক্লিক করুন এবং ১০০ পয়েন্ট অর্জন করুন'}
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
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  infoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    margin: 14, padding: 12,
    backgroundColor: '#EEF2FF', borderRadius: 10,
  },
  infoBoxDone: { backgroundColor: '#E8F8F0' },
  infoText: { flex: 1, fontSize: 13, color: '#4F46E5', lineHeight: 20 },
  infoTextDone: { color: '#27ae60' },
  grid: { paddingHorizontal: 10, paddingBottom: 20 },
  box: {
    flex: 1, margin: 6, aspectRatio: 1,
    backgroundColor: '#fff', borderRadius: 14,
    alignItems: 'center', justifyContent: 'center',
    elevation: 2, gap: 6,
  },
  boxDisabled: { backgroundColor: '#f0f0f0', elevation: 0 },
  boxLabel: { fontSize: 13, color: '#555', fontWeight: '600' },
  boxLabelDisabled: { fontSize: 13, color: '#ccc', fontWeight: '600' },
  boxPoints: { fontSize: 12, color: '#27ae60', fontWeight: 'bold' },
});
