import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser, logoutUser } from '../../db/auth';
import { Alert } from 'react-native';
import { usePoints } from '../../context/PointsContext';
import { useCoins } from '../../context/CoinsContext';
import useSyncWithCooldown from '../../hooks/useSyncWithCooldown';
import { getTodayEarnings } from '../../db/earnings';
import { getTodayCoins, getTodayCoinHistoryCount, getTodayCommission } from '../../db/coins';
import { getPendingCount } from '../../db/claims';
import { getPendingBoxesCount } from '../../db/adBoxes';
import { getTotalWithdraw } from '../../db/withdraw';
import { toBn } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';
import useAdInterstitial from '../../components/ads/AdInterstitial';

const quickActions = [
  { icon: 'menu-book', label: 'গল্প', color: '#6366F1', tab: 'Home' },
  { icon: 'quiz', label: 'কুইজ', color: '#22C55E', tab: 'Quize' },
  { icon: 'inventory-2', label: 'অর্ডার', color: '#EF4444', screen: 'OrderHistory', tab: 'History' },
  { icon: 'monetization-on', label: 'উইথড্র', color: '#F59E0B', screen: 'WithdrawHistory', tab: 'History' },
  { icon: 'monetization-on', label: 'কয়েন', color: '#F59E0B', screen: 'CoinHistory', tab: 'History' },
  { icon: 'star', label: 'পয়েন্ট', color: '#22C55E', screen: 'PointHistory', tab: 'History' },
  { icon: 'shopping-bag', label: 'কিনা কাটা', color: '#EC4899', screen: 'ProductList', tab: 'ProductList' },
];

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [todayPts, setTodayPts] = useState(0);
  const [todayTasks, setTodayTasks] = useState(0);
  const [todayCommission, setTodayCommission] = useState(0);
  const [todayCoins, setTodayCoins] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingBoxes, setPendingBoxes] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [visible, setVisible] = useState({ coin: false, point: false, income: false, withdraw: false });
  const timers = useRef({});
  const pendingKey = useRef(null);
  const { showAd: showInterstitial, isClosed } = useAdInterstitial();

  useEffect(() => {
    if (isClosed && pendingKey.current) {
      doToggle(pendingKey.current);
      pendingKey.current = null;
    }
  }, [isClosed]);

  const doToggle = (key) => {
    if (timers.current[key]) clearTimeout(timers.current[key]);
    setVisible((prev) => {
      const newVal = !prev[key];
      if (newVal) {
        timers.current[key] = setTimeout(() => {
          setVisible((p) => ({ ...p, [key]: false }));
        }, 30000);
      }
      return { ...prev, [key]: newVal };
    });
  };

  const toggleVisibility = (key) => {
    if (visible[key]) {
      doToggle(key);
      return;
    }
    if (!showInterstitial()) {
      doToggle(key);
    } else {
      pendingKey.current = key;
    }
  };

  const BalanceItem = ({ icon, iconColor, label, value, onPress, isVisible, mutedColor }) => {
    const animVal = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
      Animated.timing(animVal, {
        toValue: isVisible ? 1 : 0, duration: 250, useNativeDriver: true,
      }).start();
    }, [isVisible]);

    const labelOpacity = animVal.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1, 0] });
    const amountOpacity = animVal.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0, 1] });
    const labelTranslate = animVal.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
    const amountTranslate = animVal.interpolate({ inputRange: [0, 1], outputRange: [20, 0] });

    return (
      <View style={s.balanceItem}>
        <MaterialIcons name={icon} size={20} color={iconColor} />
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={s.toggleArea}>
          <Animated.Text
            style={[s.labelText, { color: mutedColor, opacity: labelOpacity, transform: [{ translateX: labelTranslate }] }]}
          >
            {label}
          </Animated.Text>
          <Animated.Text
            style={[s.amountText, { color: iconColor, opacity: amountOpacity, transform: [{ translateX: amountTranslate }], position: 'absolute' }]}
          >
            {value}
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };
  const { total: totalPts, refreshPoints } = usePoints();
  const { total: totalCoins, refreshCoins } = useCoins();
  const { syncing, syncMsg, handleSync } = useSyncWithCooldown();

  useFocusEffect(useCallback(() => {
    setChecking(true);
    load();
  }, []));

  const load = async () => {
    const u = await getLoggedInUser();
    if (!u) { navigation.navigate('Login'); return; }
    setUser(u);
    await refreshCoins();
    await refreshPoints();
    setTodayPts(await getTodayEarnings());
    setTodayCoins(await getTodayCoins());
    setTodayTasks(await getTodayCoinHistoryCount());
    setTodayCommission(await getTodayCommission());
    setPendingCount(await getPendingCount());
    setPendingBoxes(await getPendingBoxesCount());
    setTotalWithdraw(await getTotalWithdraw());
    setChecking(false);
  };

  const handleLogout = () => {
    Alert.alert('লগআউট', 'আপনি কি লগআউট করতে চান?', [
      { text: 'না', style: 'cancel' },
      { text: 'হ্যাঁ', onPress: async () => { await logoutUser(); navigation.navigate('Login'); } },
    ]);
  };

  if (checking) return null;

  const go = (item) => {
    if (item.screen) navigation.navigate(item.tab, { screen: item.screen });
    else navigation.navigate(item.tab);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <View style={s.header}>
          <View style={s.headerRow}>
            <View style={s.avatar}>
              <Text style={s.avatarText}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Text>
            </View>
            <View style={s.headerInfo}>
              <Text style={s.name}>{user?.name || 'ব্যবহারকারী'}</Text>
              <View style={s.infoRow}>
                <MaterialIcons name="phone" size={10} color="rgba(255,255,255,0.6)" />
                <Text style={s.infoText}>{user?.phone || 'ফোন দিন'}</Text>
              </View>
              <View style={s.infoRow}>
                <MaterialIcons name="location-on" size={10} color="rgba(255,255,255,0.6)" />
                <Text style={s.infoText} numberOfLines={1}>{user?.address || 'ঠিকানা দিন'}</Text>
              </View>
            </View>
            <TouchableOpacity style={s.editBtn} onPress={() => navigation.navigate('EditProfile', { user })}>
              <MaterialIcons name="edit" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 12 }}>
          <View style={s.balanceCard}>
          <View style={s.balanceHeader}>
            <MaterialIcons name="account-balance-wallet" size={16} color="#6366F1" />
            <Text style={s.balanceHeaderText}>মোট ব্যালেন্স</Text>
          </View>
          <View style={s.balanceRow}>
            <BalanceItem
              icon="monetization-on" iconColor="#F59E0B"
              label="কয়েন দেখুন" value={toBn(totalCoins)}
              isVisible={visible.coin}
              onPress={() => toggleVisibility('coin')}
              mutedColor={colors.muted || '#9CA3AF'}
            />
            <View style={[s.balanceVr, { backgroundColor: colors.muted || '#E5E7EB' }]} />
            <BalanceItem
              icon="star" iconColor="#22C55E"
              label="পয়েন্ট দেখুন" value={toBn(totalPts)}
              isVisible={visible.point}
              onPress={() => toggleVisibility('point')}
              mutedColor={colors.muted || '#9CA3AF'}
            />
            <View style={[s.balanceVr, { backgroundColor: colors.muted || '#E5E7EB' }]} />
            <BalanceItem
              icon="account-balance-wallet" iconColor="#EF4444"
              label="উইথড্র দেখুন" value={toBn(totalWithdraw)}
              isVisible={visible.withdraw}
              onPress={() => toggleVisibility('withdraw')}
              mutedColor={colors.muted || '#9CA3AF'}
            />
            <View style={[s.balanceVr, { backgroundColor: colors.muted || '#E5E7EB' }]} />
            <BalanceItem
              icon="trending-up" iconColor="#6366F1"
              label="সম্ভাব্য আয় দেখুন" value={`${toBn(Math.floor(totalCoins / 100))}৳`}
              isVisible={visible.income}
              onPress={() => toggleVisibility('income')}
              mutedColor={colors.muted || '#9CA3AF'}
            />
          </View>
        </View>

        <View style={[s.grid, { flexWrap: 'nowrap' }]}>
          <View style={[s.gridCard, { backgroundColor: '#D1FAE5' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#22C55E' }]}>{toBn(todayCoins)}</Text>
              <MaterialIcons name="today" size={16} color="#22C55E" />
            </View>
            <Text style={s.gridLabel}>আজকের কয়েন</Text>
          </View>
          <View style={[s.gridCard, { backgroundColor: '#EDE9FE' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#8B5CF6' }]}>{toBn(todayPts)}</Text>
              <MaterialIcons name="trending-up" size={16} color="#8B5CF6" />
            </View>
            <Text style={s.gridLabel}>আজকের পয়েন্ট</Text>
          </View>
          <View style={[s.gridCard, { backgroundColor: '#FEF3C7' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#F59E0B' }]}>{toBn(todayTasks)}</Text>
              <MaterialIcons name="history" size={16} color="#F59E0B" />
            </View>
            <Text style={s.gridLabel}>আজকের কাজ</Text>
          </View>
          <View style={[s.gridCard, { backgroundColor: '#E0F2FE' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#0EA5E9' }]}>{toBn(todayCommission)}</Text>
              <MaterialIcons name="group-add" size={16} color="#0EA5E9" />
            </View>
            <Text style={s.gridLabel}>কমিশন</Text>
          </View>
        </View>

     

        <View style={s.menuSection}>
          <Text style={s.menuTitle}>কয়েন সংগ্রহ</Text>
          <View style={s.coinMenu}>
            {[
              { title: 'অর্জিত কয়েন গ্রহণ করুন', icon: 'card-giftcard', screen: 'Claim', tab: 'Home', badge: pendingCount },
              { title: 'বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন', icon: 'play-circle-outline', screen: 'AdEarn', tab: 'Home', badge: pendingBoxes },
              { title: 'দৈনিক কয়েন সংগ্রহ করুন', icon: 'today', screen: 'DailyCoin', tab: 'Home' },
            ].map((item, i) => (
              <TouchableOpacity key={i} style={s.coinCard} onPress={() => navigation.navigate(item.tab, { screen: item.screen })} activeOpacity={0.7}>
                <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#F59E0B15', justifyContent: 'center', alignItems: 'center' }}>
                  <MaterialIcons name={item.icon} size={20} color="#F59E0B" />
                </View>
                <Text style={s.coinCardTitle}>{item.title}</Text>
                {item.badge > 0 && (
                  <View style={s.badge}>
                    <Text style={s.badgeText}>{toBn(item.badge)}</Text>
                  </View>
                )}
                <MaterialIcons name="chevron-right" size={18} color={colors.muted} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={s.referBtn} onPress={handleSync} activeOpacity={0.7}>
          <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primary + '20', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="sync" size={20} color={colors.primary} />
          </View>
          <Text style={s.referBtnText}>{syncing ? 'সিঙ্ক হচ্ছে...' : 'কয়েন সার্ভারে পাঠান'}</Text>
          {syncing ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <MaterialIcons name="chevron-right" size={18} color={colors.muted} />
          )}
        </TouchableOpacity>
        {syncMsg && (
          <View style={{ paddingHorizontal: 4, marginTop: 4, marginLeft: 4 }}>
            <Text style={{ fontSize: 12, color: '#22C55E' }}>{syncMsg}</Text>
          </View>
        )}

        <TouchableOpacity style={s.referBtn} onPress={() => navigation.navigate('Referral')} activeOpacity={0.7}>
          <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#4F46E515', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="people-alt" size={20} color="#4F46E5" />
          </View>
          <Text style={s.referBtnText}>রেফারেল সিস্টেম</Text>
          <MaterialIcons name="chevron-right" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {user && (
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
            <MaterialIcons name="logout" size={18} color="#EF4444" />
            <Text style={s.logoutText}>লগআউট</Text>
          </TouchableOpacity>
        )}

        <View style={s.menuSection}>
          <Text style={s.menuTitle}>দ্রুত লিংক</Text>
          <View style={s.menuGrid}>
            {quickActions.map((item, i) => (
              <TouchableOpacity key={i} style={s.menuCard} onPress={() => go(item)} activeOpacity={0.7}>
                <View style={[s.menuIcon, { backgroundColor: item.color + '15' }]}>
                  <MaterialIcons name={item.icon} size={24} color={item.color} />
                </View>
                <Text style={s.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {!user ? (
          <View style={s.guestBox}>
            <Text style={s.guestText}>লগইন করে আপনার অগ্রগতি ট্র্যাক করুন</Text>
            <TouchableOpacity style={s.loginBtn} onPress={() => navigation.navigate('Login')}>
              <MaterialIcons name="login" size={16} color="#fff" />
              <Text style={s.loginBtnText}>লগইন করুন</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.registerBtn} onPress={() => navigation.navigate('Register')}>
              <Text style={s.registerBtnText}>নিবন্ধন করুন</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        </ScrollView>
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  avatar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  headerInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 1 },
  infoText: { fontSize: 10, color: 'rgba(255,255,255,0.75)' },
  editBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: colors.surface, marginTop: 12,
    borderRadius: 16, padding: 16,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 6,
  },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  balanceHeaderText: { fontSize: 12, color: colors.muted, fontWeight: '600' },
  balanceRow: { flexDirection: 'row', alignItems: 'center' },
  balanceItem: { alignItems: 'center', flex: 1 },
  toggleArea: { marginTop: 6, minHeight: 22, justifyContent: 'center', alignItems: 'center' },
  amountText: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  labelText: { fontSize: 12, fontWeight: '500', color: colors.muted },
  balanceValue: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  balanceLabel: { fontSize: 11, color: colors.muted, fontWeight: '500' },
  balanceVr: { width: 1, height: 36, backgroundColor: colors.muted + '30' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    marginTop: 10, gap: 8,
  },
  gridCard: {
    flex: 1, borderRadius: 10, padding: 8,
  },
  gridTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  gridValue: { fontSize: 15, fontWeight: 'bold' },
  gridLabel: { fontSize: 8, color: '#6B7280', fontWeight: '500' },
  menuSection: { marginTop: 16 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 12 },
  coinMenu: { gap: 6 },
  coinCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, borderRadius: 12, padding: 12,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 3,
  },
  coinCardTitle: { flex: 1, fontSize: 13, color: colors.text, fontWeight: '500' },
  badge: {
    minWidth: 20, height: 20, borderRadius: 10,
    backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  menuCard: {
    width: '23%', backgroundColor: colors.surface, borderRadius: 12,
    padding: 10, alignItems: 'center', gap: 4,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4,
  },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { fontSize: 11, fontWeight: '600', color: colors.text },
  sectionTitle: {
    fontSize: 15, fontWeight: '700', color: colors.text,
    marginHorizontal: 16, marginTop: 24, marginBottom: 12,
  },
  earningRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, marginHorizontal: 16,
    borderRadius: 12, padding: 12, marginBottom: 6,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 3,
  },
  earningIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  earningTitle: { flex: 1, fontSize: 13, color: colors.text, fontWeight: '500' },
  earningBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  earningPts: { fontSize: 12, fontWeight: '700', color: colors.primary },
  emptyBox: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyText: { fontSize: 13, color: colors.muted },
  guestBox: { marginTop: 20, marginBottom: 20, gap: 10 },
  guestText: { textAlign: 'center', color: colors.muted, fontSize: 13, marginBottom: 4 },
  loginBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 13,
  },
  loginBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  registerBtn: {
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.primary, borderRadius: 14, paddingVertical: 13,
  },
  registerBtnText: { color: colors.primary, fontSize: 14, fontWeight: 'bold' },
  referBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    marginTop: 16, borderRadius: 12, padding: 14,
    backgroundColor: colors.primary + '12',
    borderWidth: 1, borderColor: colors.primary + '30',
  },
  referBtnText: { flex: 1, fontSize: 14, fontWeight: '700', color: colors.primary },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    marginTop: 20, marginBottom: 10,
    borderWidth: 1, borderColor: '#FCA5A5', borderRadius: 12,
    padding: 14, backgroundColor: '#FEF2F2',
  },
  logoutText: { fontSize: 15, color: '#EF4444', fontWeight: '600' },
});
