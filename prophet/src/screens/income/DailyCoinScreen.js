import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useCoins } from '../../context/CoinsContext';
import { addCoins, getTodayCoins } from '../../db/coins';

const COOLDOWN = 180;

export default function DailyCoinScreen() {
  const { total, refreshCoins } = useCoins();
  const [todayCoins, setTodayCoins] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [collecting, setCollecting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const timerRef = useRef(null);
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    setInitialLoading(true);
    setCountdown(0);
    setInitialLoading(false);

    getTodayCoins().then(setTodayCoins);
    refreshCoins();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []));

  useEffect(() => {
    if (countdown > 0) {
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [countdown]);

  const startCooldown = () => {
    setCountdown(COOLDOWN);
  };

  const handleCollect = async () => {
    if (collecting) return;
    setCollecting(true);
    try {
      await addCoins(500, 'দৈনিক কয়েন সংগ্রহ');
      await refreshCoins();
      const today = await getTodayCoins();
      setTodayCoins(today);
      startCooldown();
      ToastAndroid.show('🎉 ৫০০ কয়েন সংগ্রহ হয়েছে!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('সমস্যা হয়েছে, আবার চেষ্টা করুন', ToastAndroid.SHORT);
    } finally {
      setCollecting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (initialLoading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const isReady = countdown === 0;

  return (
    <SafeAreaView style={s.container}>
      <View style={s.headerRow}>
        <View style={s.coinBadge}>
          <MaterialIcons name="monetization-on" size={20} color="#F59E0B" />
          <Text style={s.coinText}>{total}</Text>
        </View>
        <View style={s.coinBadge}>
          <MaterialIcons name="today" size={18} color={colors.primary} />
          <Text style={s.todayText}>আজ: {todayCoins}</Text>
        </View>
      </View>

      <View style={s.card}>
        <MaterialIcons name="celebration" size={64} color={isReady ? '#F59E0B' : colors.text} style={{ opacity: isReady ? 1 : 0.2 }} />
        <Text style={[s.title, !isReady && s.titleMuted]}>
          {isReady ? 'কয়েন সংগ্রহ করুন!' : 'পরবর্তী কয়েন'}
        </Text>
        {isReady ? (
          <TouchableOpacity
            style={s.collectBtn}
            activeOpacity={0.8}
            onPress={handleCollect}
            disabled={collecting}>
            {collecting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <MaterialIcons name="touch-app" size={28} color="#fff" />
                <Text style={s.collectText}>+৫০০ কয়েন</Text>
              </>
            )}
          </TouchableOpacity>
        ) : (
          <View style={s.timerBox}>
            <Text style={s.timer}>{formatTime(countdown)}</Text>
            <Text style={s.timerLabel}>মিনিটে পরবর্তী বক্স</Text>
          </View>
        )}
      </View>

      <View style={s.infoBox}>
        <MaterialIcons name="info-outline" size={18} color={colors.primary} />
        <Text style={s.infoText}>
          প্রতিবার {COOLDOWN / 60} মিনিট পর পর একটি কয়েন বক্স পাবেন। বক্সে ক্লিক করে ৫০০ কয়েন সংগ্রহ করুন।
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingTop: 16,
  },
  coinBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  },
  coinText: { fontSize: 16, fontWeight: 'bold', color: '#F59E0B' },
  todayText: { fontSize: 13, color: colors.primary, fontWeight: '500' },
  card: {
    margin: 20, padding: 40, borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center', gap: 16,
  },
  title: { fontSize: 20, fontWeight: '700', color: '#F59E0B' },
  titleMuted: { color: colors.text, opacity: 0.4 },
  collectBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F59E0B', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 30,
  },
  collectText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  timerBox: { alignItems: 'center', gap: 4 },
  timer: { fontSize: 48, fontWeight: '700', color: colors.text, fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 13, color: colors.text, opacity: 0.5 },
  infoBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginHorizontal: 20, padding: 14, backgroundColor: colors.surface, borderRadius: 12,
  },
  infoText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 20 },
});
