import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { addEarning, hasClaimedAdToday } from '../../db/earnings';
import { usePoints } from '../../context/PointsContext';
import { isOnline } from '../../utils/helper';

const BOXES = Array.from({ length: 20 }, (_, i) => ({ id: i + 1 }));

export default function AdEarnScreen() {
  const { refreshPoints } = usePoints();
  const [loading, setLoading] = useState(null);
  const [claimedBoxes, setClaimedBoxes] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    const checkBoxesStatus = async () => {
      setInitialLoading(true);
      let statusMap = {};
      try {
        for (let box of BOXES) {
          const isClaimed = await hasClaimedAdToday(box.id);
          if (isClaimed) statusMap[box.id] = true;
        }
        setClaimedBoxes(statusMap);
      } catch (error) {
        console.log('Error checking boxes:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    checkBoxesStatus();
  }, []));

  const handleBoxPress = async (boxId) => {
    if (claimedBoxes[boxId] || loading) return;
    setLoading(boxId);
    const online = await isOnline();
    if (!online) {
      ToastAndroid.show('ইন্টারনেট সংযোগ নেই!', ToastAndroid.SHORT);
      setLoading(null);
      return;
    }
    try {
      await addEarning(2000, `বিজ্ঞাপন বক্স ${boxId}`, 100, boxId);
      await refreshPoints();
      setClaimedBoxes(prev => ({ ...prev, [boxId]: true }));
      ToastAndroid.show(`🎉 ${boxId} নম্বর বক্সের ১০০ পয়েন্ট অর্জন হয়েছে!`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('পয়েন্ট যোগ করতে সমস্যা হয়েছে', ToastAndroid.SHORT);
    } finally {
      setLoading(null);
    }
  };

  const totalClaimed = Object.keys(claimedBoxes).length;

  const renderBox = ({ item }) => {
    const isLoading = loading === item.id;
    const isClaimed = !!claimedBoxes[item.id];
    return (
      <TouchableOpacity
        style={[s.box, isClaimed && s.boxDisabled]}
        activeOpacity={isClaimed ? 1 : 0.75}
        onPress={() => handleBoxPress(item.id)}>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} />
        ) : isClaimed ? (
          <>
            <MaterialIcons name="check-circle" size={32} color={colors.onSurface} style={{ opacity: 0.3 }} />
            <Text style={s.boxLabelDisabled}>সম্পন্ন</Text>
          </>
        ) : (
          <>
            <MaterialIcons name="play-circle-filled" size={32} color={colors.primary} />
            <Text style={s.boxLabel}>বিজ্ঞাপন {item.id}</Text>
            <Text style={s.boxPoints}>+১০০ পয়েন্ট</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  if (initialLoading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={s.loadingText}>বক্স লোড হচ্ছে...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={[s.infoBox, totalClaimed === BOXES.length && s.infoBoxDone]}>
        <MaterialIcons
          name={totalClaimed === BOXES.length ? 'check-circle' : 'info-outline'}
          size={18}
          color={totalClaimed === BOXES.length ? colors.success : colors.primary}
        />
        <Text style={[s.infoText, totalClaimed === BOXES.length && s.infoTextDone]}>
          {totalClaimed === BOXES.length
            ? 'সবগুলো বক্সের পয়েন্ট নেওয়া শেষ! আগামীকাল আবার আসুন।'
            : `যেকোনো বক্সে ক্লিক করুন এবং ১০০ পয়েন্ট অর্জন করুন (সম্পন্ন: ${totalClaimed}/${BOXES.length})`}
        </Text>
      </View>
      <FlatList
        data={BOXES}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderBox}
        contentContainerStyle={s.grid}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  loadingText: { marginTop: 10, color: colors.onSurface, fontSize: 14, opacity: 0.6 },
  infoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    margin: 14, padding: 14,
    backgroundColor: colors.surface, borderRadius: 12,
  },
  infoBoxDone: { backgroundColor: colors.surface },
  infoText: { flex: 1, fontSize: 13, color: colors.primary, fontWeight: '500', lineHeight: 20 },
  infoTextDone: { color: colors.success },
  grid: { paddingHorizontal: 10, paddingBottom: 20 },
  box: {
    flex: 1, margin: 6, aspectRatio: 1,
    backgroundColor: colors.surface, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  boxDisabled: { opacity: 0.5 },
  boxLabel: { fontSize: 13, color: colors.onSurface, fontWeight: '600' },
  boxLabelDisabled: { fontSize: 13, color: colors.onSurface, fontWeight: '600', opacity: 0.4 },
  boxPoints: { fontSize: 12, color: colors.success, fontWeight: 'bold' },
});
