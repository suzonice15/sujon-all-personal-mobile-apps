import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useCoins } from '../../context/CoinsContext';
import { addCoins, getTodayCoins, getDailyCoinStats } from '../../db/coins';
import { daily_coin_count } from '../../config/url';
import { getCooldown, setLastClaimTime, getLastClaimTime } from '../../db/settings';
import { toBn } from '../../utils/helper';

export default function DailyCoinScreen() {
  const { refreshCoins } = useCoins();
  const [todayCoins, setTodayCoins] = useState(0);
  const [totalDailyCoin, setTotalDailyCoin] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [collecting, setCollecting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cooldownSec, setCooldownSec] = useState(180);
  const timerRef = useRef(null);
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    setInitialLoading(true);
    setCountdown(0);
    (async () => {
      const sec = await getCooldown();
      setCooldownSec(sec);
      const lastClaim = await getLastClaimTime();
      if (lastClaim > 0) {
        const elapsed = Math.floor((Date.now() - lastClaim) / 1000);
        const remaining = Math.max(0, sec - elapsed);
        if (remaining > 0) setCountdown(remaining);
      }
    })();
    setInitialLoading(false);

    getTodayCoins().then(setTodayCoins);
    getDailyCoinStats().then(({ total, count }) => { setTotalDailyCoin(total); setDailyCount(count); });
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
    setCountdown(cooldownSec);
  };

  const handleCollect = async () => {
    if (collecting) return;
    setCollecting(true);
    try {
      await addCoins(daily_coin_count, 'দৈনিক কয়েন সংগ্রহ');
      await refreshCoins();
      await setLastClaimTime();
      const today = await getTodayCoins();
      setTodayCoins(today);
      const stats = await getDailyCoinStats();
      setTotalDailyCoin(stats.total);
      setDailyCount(stats.count);
      startCooldown();
      ToastAndroid.show(`🎉 ${toBn(daily_coin_count)} কয়েন সংগ্রহ হয়েছে!`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('সমস্যা হয়েছে, আবার চেষ্টা করুন', ToastAndroid.SHORT);
    } finally {
      setCollecting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${toBn(m)}:${toBn(s.toString().padStart(2, '0'))}`;
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
        <View style={s.statsCard}>
          <MaterialIcons name="history" size={20} color="#F59E0B" />
          <View>
            <Text style={s.statsLabel}>মোট সংগ্রহ</Text>
            <Text style={s.statsValue}>{toBn(totalDailyCoin)} কয়েন</Text>
          </View>
          <View style={s.statsDivider} />
          <View>
            <Text style={s.statsLabel}>মোট বার</Text>
            <Text style={s.statsValue}>{toBn(dailyCount)} বার</Text>
          </View>
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
                <MaterialIcons name="monetization-on" size={28} color="#fff" />
                <Text style={s.collectText}>+{toBn(daily_coin_count)} কয়েন</Text>
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
           প্রতি {toBn(cooldownSec / 60)} মিনিটে একটি কয়েন বক্স মিলবে। ক্লিক করে {toBn(daily_coin_count)} কয়েন নিন |
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row', justifyContent: 'center',
    paddingHorizontal: 20, paddingTop: 16,
  },
  statsCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: colors.surface, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3,
  },
  statsLabel: { fontSize: 11, color: colors.text, opacity: 0.6, fontWeight: '500' },
  statsValue: { fontSize: 18, fontWeight: '800', color: '#F59E0B', marginTop: 2 },
  statsDivider: { width: 1, height: 36, backgroundColor: colors.text, opacity: 0.15 },
  card: {
    margin: 20, padding: 10, borderRadius: 24,
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
    marginHorizontal: 20, padding: 4, backgroundColor: colors.surface, borderRadius: 12,
  },
  infoText: { flex: 1, fontSize: 13, color: colors.text, lineHeight: 20 },
});
