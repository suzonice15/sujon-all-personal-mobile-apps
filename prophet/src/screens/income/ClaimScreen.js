import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useCoins } from '../../context/CoinsContext';
import { addCoins, getTodayClaimCount, getTodayClaimCoins } from '../../db/coins';
import { getPendingClaims, getPendingCount, claimPending } from '../../db/claims';
import { deleteNotificationByReference } from '../../db/notifications';
import { useNotifications } from '../../context/NotificationsContext';
import { max_claim_per_day, story_detail_per_box } from '../../config/url';
import { getCooldown, setLastClaimTime, getLastClaimTime } from '../../db/settings';
import { toBn } from '../../utils/helper';

export default function ClaimScreen({ navigation }) {
  const { refreshCoins } = useCoins();
  const [claims, setClaims] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [claimingId, setClaimingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayClaimCount, setTodayClaimCount] = useState(0);
  const [todayClaimCoins, setTodayClaimCoins] = useState(0);
  const [totalPendingAmount, setTotalPendingAmount] = useState(0);
  const [cooldownSec, setCooldownSec] = useState(180);
  const timerRef = useRef(null);
  const { refresh: refreshNotifs } = useNotifications();
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    load();
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

  const load = async () => {
    setLoading(true);
    const pendingList = await getPendingClaims();
    setClaims(pendingList);
    setPendingCount(await getPendingCount());
    setTotalPendingAmount(pendingList.reduce((sum, c) => sum + c.amount, 0));
    setTodayClaimCount(await getTodayClaimCount());
    setTodayClaimCoins(await getTodayClaimCoins());
    const sec = await getCooldown();
    setCooldownSec(sec);
    const lastClaim = await getLastClaimTime();
    if (lastClaim > 0) {
      const elapsed = Math.floor((Date.now() - lastClaim) / 1000);
      const remaining = Math.max(0, sec - elapsed);
      if (remaining > 0) setCountdown(remaining);
    }
    refreshCoins();
    setLoading(false);
  };

  const handleClaim = async (id) => {
    if (claimingId || countdown > 0) return;
    if (todayClaimCount >= max_claim_per_day) {
      ToastAndroid.show(`আজকের সংগ্রহের সীমা শেষ! আগামীকাল আবার আসুন।`, ToastAndroid.SHORT);
      return;
    }
    setClaimingId(id);
    const claim = await claimPending(id);
    if (!claim) {
      setClaimingId(null);
      return;
    }
    await addCoins(claim.amount, claim.content_title);
    await deleteNotificationByReference(claim.content_id);
    await refreshNotifs();
    setTodayClaimCount(prev => prev + 1);
    setTodayClaimCoins(prev => prev + claim.amount);
    setTotalPendingAmount(prev => prev - claim.amount);
    setClaims(prev => prev.filter(c => c.id !== id));
    setPendingCount(prev => prev - 1);
    await setLastClaimTime();
    setCountdown(cooldownSec);
    refreshCoins();
    setClaimingId(null);
    ToastAndroid.show(` ${toBn(claim.amount)} কয়েন সংগ্রহ করেছেন!`, ToastAndroid.SHORT);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${toBn(m)}:${toBn(s.toString().padStart(2, '0'))}`;
  };

  const renderItem = ({ item }) => {
    const isClaiming = claimingId === item.id;
    const limitReached = todayClaimCount >= max_claim_per_day;
    const disabled = countdown > 0 || isClaiming || limitReached;
    return (
      <View style={s.claimRow}>
        <View style={[s.iconBox, { backgroundColor: '#22C55E15' }]}>
          <MaterialIcons name="menu-book" size={18} color="#22C55E" />
        </View>
        <View style={s.claimInfo}>
          <Text style={s.claimTitle} numberOfLines={1}>{item.content_title}</Text>
          <Text style={s.claimAmount}>+{item.amount} কয়েন</Text>
        </View>
        <TouchableOpacity
          style={[s.claimBtn, disabled && s.claimBtnDisabled]}
          onPress={() => handleClaim(item.id)}
          disabled={disabled}>
          {isClaiming ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={s.claimBtnText}>সংগ্রহ করুন</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={s.headerRow}>
        <View style={s.badge}>
          <MaterialIcons name="monetization-on" size={18} color="#F59E0B" />
          <Text style={s.badgeText}>পেন্ডিং  {toBn(totalPendingAmount)} কয়েন</Text>
        </View>
        <View style={s.badge}>
          <MaterialIcons name="pending-actions" size={16} color="#6366F1" />
          <Text style={s.badgeText}>মোট {toBn(pendingCount)} রেকর্ড </Text>
        </View>
      </View>

      <View style={s.todayChipRow}>
        <View style={[s.todayChip, { backgroundColor: '#22C55E' + '18' }]}>
          <MaterialIcons name="monetization-on" size={16} color="#22C55E" />
          <Text style={[s.todayChipLabel, { color: colors.text }]}>আজ পেয়েছেন </Text>
          <Text style={[s.todayChipValue, { color: '#22C55E' }]}>{toBn(todayClaimCoins)} কয়েন</Text>
        </View>
        <View style={[s.todayChip, { backgroundColor: '#6366F1' + '18' }]}>
          <MaterialIcons name="pending-actions" size={16} color="#6366F1" />
          <Text style={[s.todayChipLabel, { color: colors.text }]}>অবশিষ্ট</Text>
          <Text style={[s.todayChipValue, { color: '#6366F1' }]}>{toBn(max_claim_per_day-todayClaimCount)} টি • {toBn((max_claim_per_day - todayClaimCount) * story_detail_per_box)} কয়েন
          </Text>
         
        </View>
      </View>

      

      {todayClaimCount >= max_claim_per_day ? (
        <View style={[s.limitBar, { backgroundColor: '#EF4444' }]}>
          <MaterialIcons name="block" size={16} color="#fff" />
          <Text style={{ flex: 1, fontSize: 13, color: '#fff', fontWeight: '600' }}>আজকের সংগ্রহের সীমা শেষ! আগামীকাল আসুন</Text>
        </View>
      ) : countdown > 0 ? (
        <View style={s.timerBar}>
          <MaterialIcons name="timer" size={16} color="#fff" />
          <Text style={s.timerText}>{formatTime(countdown)}</Text>
          <Text style={s.timerLabel}>পরবর্তী সংগ্রহের জন্য অপেক্ষা করুন</Text>
        </View>
      ) : null}

      {claims.length === 0 ? (
        <View style={s.emptyBox}>
          <MaterialIcons name="celebration" size={64} color="#DDD" />
          <Text style={s.emptyTitle}>কোনো কয়েন দাবি বাকি নেই</Text>
          <Text style={s.emptySub}>গল্প পড়ে নতুন কয়েন দাবি করুন</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home', { screen: 'HomeScreen' })}
            style={s.storyBtn}>
            <MaterialIcons name="menu-book" size={16} color="#fff" />
            <Text style={s.storyBtnText}>গল্প পড়ুন</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={claims}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={s.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  headerRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
  },
  badgeText: { fontSize: 13, fontWeight: '600', color: colors.text },
  todayChipRow: { flexDirection: 'row', gap: 8, marginHorizontal: 16, marginBottom: 6 },
  todayChip: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10,
  },
  todayChipLabel: { fontSize: 11, fontWeight: '500', opacity: 0.6 },
  todayChipValue: { fontSize: 13, fontWeight: '800' },
  timerBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F59E0B', marginHorizontal: 16, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8,
  },
  timerText: { fontSize: 16, fontWeight: '700', color: '#fff', fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', flex: 1, textAlign: 'right' },
  limitBar: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginHorizontal: 16, marginBottom: 8, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 10, backgroundColor: colors.surface,
  },
  limitText: { fontSize: 12, fontWeight: '600' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  claimRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, borderRadius: 14, padding: 12, marginBottom: 8,
  },
  iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  claimInfo: { flex: 1 },
  claimTitle: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 2 },
  claimAmount: { fontSize: 12, fontWeight: '700', color: '#22C55E' },
  claimBtn: {
    backgroundColor: '#F59E0B', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
  },
  claimBtnDisabled: { opacity: 0.4 },
  claimBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: colors.text, textAlign: 'center' },
  emptySub: { fontSize: 13, color: colors.text, opacity: 0.5, textAlign: 'center' },
  storyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#22C55E', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginTop: 8,
  },
  storyBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
