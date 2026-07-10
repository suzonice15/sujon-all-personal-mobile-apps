import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid, ActivityIndicator, SafeAreaView, useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useCoins } from '../../context/CoinsContext';
import { isOnline, toBn } from '../../utils/helper';
import { initTodayBoxes, getTodayBoxes, claimBox } from '../../db/adBoxes';
import { getCooldown, setLastClaimTime, getLastClaimTime } from '../../db/settings';
import { video_coin_per_box, ADMOB_ENABLED, BOX_CLAIM_COOLDOWN_SEC } from '../../config/url';
import AdBanner from '../../components/ads/AdBanner';
import useAdRewarded from '../../components/ads/AdRewarded';

export default function AdEarnScreen() {
  const { refreshCoins } = useCoins();
  const [loading, setLoading] = useState(null);
  const [boxes, setBoxes] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [cooldownSec, setCooldownSec] = useState(BOX_CLAIM_COOLDOWN_SEC);
  const timerRef = useRef(null);
  const pendingBox = useRef(null);
  const { width } = useWindowDimensions();
  const BOX_SIZE = (width - 38) / 4;
  const { colors } = useTheme();
  const s = styles(colors, BOX_SIZE);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (cooldown > 0) {
      timerRef.current = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [cooldown]);

  useFocusEffect(useCallback(() => {
    const loadBoxes = async () => {
      setInitialLoading(true);
      try {
        const sec = await getCooldown();
        setCooldownSec(sec);
        const lastClaim = await getLastClaimTime();
        if (lastClaim > 0) {
          const elapsed = Math.floor((Date.now() - lastClaim) / 1000);
          const remaining = Math.max(0, sec - elapsed);
          if (remaining > 0) setCooldown(remaining);
        }
        await initTodayBoxes();
        const todayBoxes = await getTodayBoxes();
        setBoxes(todayBoxes);
      } catch (error) {
        console.log('Error loading boxes:', error);
      } finally {
        setInitialLoading(false);
      }
    };
    loadBoxes();
  }, []));

  const handleBoxPress = async (box) => {
    if (box.status === 'claimed' || loading) return;
    if (cooldown > 0) {
      ToastAndroid.show(`অনুগ্রহ করে ${formatTime(cooldown)} অপেক্ষা করুন`, ToastAndroid.SHORT);
      return;
    }
    const online = await isOnline();
    if (!online) {
      ToastAndroid.show('ইন্টারনেট সংযোগ নেই!', ToastAndroid.SHORT);
      return;
    }
    pendingBox.current = box;
    setLoading(box.id);
    if (!showAd()) {
      setLoading(null);
      pendingBox.current = null;
      if (!ADMOB_ENABLED) {
        doClaim(box);
      } else {
        ToastAndroid.show('বিজ্ঞাপন লোড হচ্ছে, আবার চেষ্টা করুন', ToastAndroid.SHORT);
      }
    }
  };

  const doClaim = async (box) => {
    try {
      await claimBox(box.id);
      await refreshCoins();
      await setLastClaimTime();
      setBoxes(prev => prev.map(b =>
        b.id === box.id ? { ...b, status: 'claimed', claim_date: new Date().toISOString().slice(0, 10) } : b
      ));
      setCooldown(cooldownSec);
      ToastAndroid.show(`বিজ্ঞাপন বক্স ${toBn(box.box_number)} এর ${toBn(video_coin_per_box)} কয়েন অর্জন হয়েছে!`, ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('কয়েন যোগ করতে সমস্যা হয়েছে', ToastAndroid.SHORT);
    } finally {
      setLoading(null);
    }
  };

  const onEarned = ({ amount, type }) => {
    const box = pendingBox.current;
    pendingBox.current = null;
    if (box) doClaim(box);
  };

  const { showAd } = useAdRewarded(onEarned);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${toBn(m)}:${toBn(s.toString().padStart(2, '0'))}`;
  };

  const totalClaimed = boxes.filter(b => b.status === 'claimed').length;
  const totalBoxes = boxes.length;
  const nextBox = boxes.find(b => b.status === 'pending');

  const renderBox = ({ item }) => {
    const isLoading = loading === item.id;
    const isClaimed = item.status === 'claimed';
    const isNext = item.id === nextBox?.id;
    const isLocked = cooldown > 0;
    return (
      <TouchableOpacity
        style={[s.box,
          { backgroundColor: colors.surface },
          isClaimed ? { borderColor: colors.success + '30' } : isNext ? { borderColor: '#EF4444', borderWidth: 2 } : { borderColor: colors.text + '10' },
          isClaimed && s.boxClaimed,
          isNext && isLocked && s.boxNextLocked,
        ]}
        disabled={isClaimed}
        activeOpacity={isLocked || isClaimed ? 1 : 0.8}
        onPress={() => handleBoxPress(item)}>
        {isLoading ? (
          <ActivityIndicator color={colors.primary} size="small" />
        ) : isClaimed ? (
          <>
            <View style={[s.boxIconWrap, { backgroundColor: colors.success + '20' }]}>
              <MaterialIcons name="check-circle" size={26} color={colors.success} />
            </View>
            <Text style={[s.boxDoneLabel, { color: colors.success }]}>Done</Text>
          </>
        ) : isNext && isLocked ? (
          <>
            <View style={[s.boxIconWrap, { backgroundColor: '#EF444420' }]}>
              <MaterialIcons name="lock" size={24} color="#EF4444" />
            </View>
            <Text style={[s.boxNumber, { color: '#EF4444' }]}>বিজ্ঞাপন বক্স {toBn(item.box_number)}</Text>
            <Text style={{ fontSize: 9, color: '#EF4444', fontWeight: '600' }}>অপেক্ষা</Text>
          </>
        ) : (
          <>
            <View style={[s.boxIconWrap, { backgroundColor: isNext ? '#EF444420' : colors.primary + '20' }]}>
              <MaterialIcons name="redeem" size={24} color={isNext ? '#EF4444' : colors.primary} />
            </View>
            <Text style={[s.boxNumber, { color: colors.text }]}>বিজ্ঞাপন বক্স {toBn(item.box_number)}</Text>
            <View style={[s.coinBadge, isNext && { backgroundColor: '#EF4444' }]}>
              <MaterialIcons name="monetization-on" size={10} color="#fff" />
              <Text style={s.coinBadgeText}>{video_coin_per_box}</Text>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  if (initialLoading) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[s.loadingText, { color: colors.text }]}>বক্স লোড হচ্ছে...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[s.container, { backgroundColor: colors.background }]}>
      <View style={{ flex: 1 }}>
        <View style={[s.headerCard, { backgroundColor: colors.surface }]}>
          <View style={s.headerRow}>
            <MaterialIcons name="redeem" size={22} color={colors.primary} />
            <Text style={[s.headerTitle, { color: colors.text }]}>বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন</Text>
          </View>
          <View style={s.statsRow}>
            <View style={[s.statChip, { backgroundColor: '#22C55E' + '18' }]}>
              <MaterialIcons name="monetization-on" size={16} color="#22C55E" />
              <Text style={[s.statChipLabel, { color: colors.text }]}>আজ পেয়েছেন</Text>
              <Text style={[s.statChipValue, { color: '#22C55E' }]}>{toBn(totalClaimed * video_coin_per_box)} কয়েন</Text>
            </View>
            <View style={[s.statChip, { backgroundColor: '#F59E0B' + '18' }]}>
              <MaterialIcons name="hourglass-empty" size={16} color="#F59E0B" />
              <Text style={[s.statChipLabel, { color: colors.text }]}>অবশিষ্ট </Text>
              <Text style={[s.statChipValue, { color: '#F59E0B' }]}>{toBn(totalBoxes - totalClaimed)} টি • {toBn((totalBoxes - totalClaimed) * video_coin_per_box)} কয়েন</Text>
            </View>
          </View>
          <View style={s.progressRow}>
            <View style={[s.progressBar, { backgroundColor: colors.text + '20' }]}>
              <View style={[s.progressFill, { width: `${(totalClaimed / totalBoxes) * 100}%`, backgroundColor: colors.primary }]} />
            </View>
            <Text style={[s.progressText, { color: colors.primary }]}>{toBn(totalClaimed)}/{toBn(totalBoxes)}</Text>
          </View>
          {totalClaimed === totalBoxes ? (
            <Text style={[s.doneText, { color: colors.success }]}>সবগুলো বক্স সম্পন্ন! আগামীকাল আবার আসুন 🎉</Text>
          ) : cooldown > 0 ? (
            <View style={s.cooldownRow}>
              <MaterialIcons name="timer" size={16} color="#EF4444" />
              <Text style={[s.cooldownText, { color: '#EF4444' }]}>পরবর্তী বিজ্ঞাপন বক্স {formatTime(cooldown)}</Text>
            </View>
          ) : (
            <Text style={[s.hintText, { color: colors.text }]}>বক্সে ট্যাপ করুন, ভিডিও দেখুন, {toBn(video_coin_per_box)} কয়েন নিন</Text>
          )}
        </View>
        <FlatList
          data={boxes}
          keyExtractor={(item) => item.id.toString()}
          numColumns={4}
          renderItem={renderBox}
          contentContainerStyle={s.grid}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={s.row}
        />
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors, BOX_SIZE) => StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 14, opacity: 0.6 },
  headerCard: {
    margin: 14, padding: 10,
    borderRadius: 16, gap: 6,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 6,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerTitle: { fontSize: 15, fontWeight: '700' },
  statsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginTop: 6, marginBottom: 4,
  },
  statChip: {
    flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingVertical: 8, paddingHorizontal: 10, borderRadius: 10, flexWrap: 'wrap',
  },
  statChipLabel: { fontSize: 11, fontWeight: '500', opacity: 0.5 },
  statChipValue: { fontSize: 12, fontWeight: '700' },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progressBar: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  progressText: { fontSize: 13, fontWeight: '700' },
  cooldownRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  cooldownText: { fontSize: 13, fontWeight: '600' },
  doneText: { fontSize: 13, fontWeight: '600' },
  hintText: { fontSize: 12, opacity: 0.6 },
  grid: { flexGrow: 1, paddingHorizontal: 10, paddingBottom: 20 },
  row: { gap: 6, marginBottom: 6 },
  box: {
    width: BOX_SIZE, height: BOX_SIZE - 8,
    borderRadius: 14, alignItems: 'center', justifyContent: 'center', gap: 5,
    paddingHorizontal: 4, paddingVertical: 20,
    borderWidth: 0,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4,
  },
  boxClaimed: { opacity: 0.45 },
  boxNextLocked: { opacity: 0.7 },
  boxIconWrap: {
    marginTop: 15,
    width: 35, height: 35, borderRadius: 21,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 2,
  },
  boxNumber: { fontSize: 9, fontWeight: '600', opacity: 0.6 },
  coinBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: '#F59E0B', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 10,
    marginBottom: 15,
  },
  coinBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff', },
  boxDoneLabel: { fontSize: 11, fontWeight: '600' },
});
