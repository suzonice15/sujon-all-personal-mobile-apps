import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useCoins } from '../../context/CoinsContext';
import { addCoins } from '../../db/coins';
import { getPendingClaims, getPendingCount, claimPending } from '../../db/claims';

const COOLDOWN = 180;

export default function ClaimScreen({ navigation }) {
  const { total, refreshCoins } = useCoins();
  const [claims, setClaims] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [claimingId, setClaimingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);
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
    setClaims(await getPendingClaims());
    setPendingCount(await getPendingCount());
    refreshCoins();
    setLoading(false);
  };

  const handleClaim = async (id) => {
    if (claimingId || countdown > 0) return;
    setClaimingId(id);
    const claim = await claimPending(id);
    if (!claim) {
      setClaimingId(null);
      return;
    }
    await addCoins(claim.amount, claim.content_title);
    setClaims(prev => prev.filter(c => c.id !== id));
    setPendingCount(prev => prev - 1);
    setCountdown(COOLDOWN);
    refreshCoins();
    setClaimingId(null);
    ToastAndroid.show(`🎉 ${claim.amount} কয়েন দাবি করেছেন!`, ToastAndroid.SHORT);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const renderItem = ({ item }) => {
    const isClaiming = claimingId === item.id;
    const disabled = countdown > 0 || isClaiming;
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
            <Text style={s.claimBtnText}>দাবি</Text>
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
          <Text style={s.badgeText}>{total} কয়েন</Text>
        </View>
        <View style={s.badge}>
          <MaterialIcons name="pending-actions" size={16} color="#6366F1" />
          <Text style={s.badgeText}>বাকি {pendingCount}</Text>
        </View>
      </View>

      {countdown > 0 && (
        <View style={s.timerBar}>
          <MaterialIcons name="timer" size={16} color="#fff" />
          <Text style={s.timerText}>{formatTime(countdown)}</Text>
          <Text style={s.timerLabel}>পরবর্তী দাবির জন্য অপেক্ষা করুন</Text>
        </View>
      )}

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
  timerBar: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#F59E0B', marginHorizontal: 16, borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 10, marginBottom: 8,
  },
  timerText: { fontSize: 16, fontWeight: '700', color: '#fff', fontVariant: ['tabular-nums'] },
  timerLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', flex: 1, textAlign: 'right' },
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
