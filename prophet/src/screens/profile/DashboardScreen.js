import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser } from '../../db/auth';
import { usePoints } from '../../context/PointsContext';
import { useCoins } from '../../context/CoinsContext';
import { getTodayEarnings, getStoriesReadCount } from '../../db/earnings';
import { getTodayCoins } from '../../db/coins';
import { getPendingCount } from '../../db/claims';

const quickActions = [
  { icon: 'menu-book', label: 'গল্প', color: '#6366F1', tab: 'Home' },
  { icon: 'quiz', label: 'কুইজ', color: '#22C55E', tab: 'Quize' },
  { icon: 'inventory-2', label: 'অর্ডার', color: '#EF4444', screen: 'OrderHistory', tab: 'History' },
  { icon: 'monetization-on', label: 'আয়', color: '#F59E0B', screen: 'AdEarn', tab: 'Home' },
  { icon: 'monetization-on', label: 'কয়েন', color: '#F59E0B', screen: 'DailyCoin', tab: 'Home' },
  { icon: 'star', label: 'পয়েন্ট', color: '#22C55E', screen: 'PointHistory', tab: 'History' },
  { icon: 'shopping-bag', label: 'কিনা কাটা', color: '#EC4899', screen: 'KinaKata', tab: 'Product' },
];

export default function DashboardScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [todayPts, setTodayPts] = useState(0);
  const [storiesRead, setStoriesRead] = useState(0);
  const [todayCoins, setTodayCoins] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const { total: totalPts } = usePoints();
  const { total: totalCoins } = useCoins();

  useFocusEffect(useCallback(() => {
    setChecking(true);
    load();
  }, []));

  const load = async () => {
    const u = await getLoggedInUser();
    if (!u) { navigation.navigate('Login'); return; }
    setUser(u);
    setTodayPts(await getTodayEarnings());
    setTodayCoins(await getTodayCoins());
    setStoriesRead(await getStoriesReadCount());
    setPendingCount(await getPendingCount());
    setChecking(false);
  };

  if (checking) return null;

  const go = (item) => {
    if (item.screen) navigation.navigate(item.tab, { screen: item.screen });
    else navigation.navigate(item.tab);
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
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

        <View style={s.balanceCard}>
          <View style={s.balanceHeader}>
            <MaterialIcons name="account-balance-wallet" size={16} color="#6366F1" />
            <Text style={s.balanceHeaderText}>মোট ব্যালেন্স</Text>
          </View>
          <View style={s.balanceRow}>
            <View style={s.balanceItem}>
              <Text style={s.balanceValue}>{totalCoins}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="monetization-on" size={12} color="#F59E0B" />
                <Text style={s.balanceLabel}>কয়েন</Text>
              </View>
            </View>
            <View style={s.balanceVr} />
            <View style={s.balanceItem}>
              <Text style={s.balanceValue}>{totalPts}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MaterialIcons name="stars" size={12} color="#6366F1" />
                <Text style={s.balanceLabel}>পয়েন্ট</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={s.grid}>
          <View style={[s.gridCard, { backgroundColor: '#D1FAE5' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#22C55E' }]}>{todayCoins}</Text>
              <MaterialIcons name="today" size={18} color="#22C55E" />
            </View>
            <Text style={s.gridLabel}>আজকের কয়েন</Text>
          </View>
          <View style={[s.gridCard, { backgroundColor: '#EDE9FE' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#8B5CF6' }]}>{todayPts}</Text>
              <MaterialIcons name="trending-up" size={18} color="#8B5CF6" />
            </View>
            <Text style={s.gridLabel}>আজকের পয়েন্ট</Text>
          </View>
          <View style={[s.gridCard, { backgroundColor: '#FEF3C7' }]}>
            <View style={s.gridTop}>
              <Text style={[s.gridValue, { color: '#F59E0B' }]}>{storiesRead}</Text>
              <MaterialIcons name="menu-book" size={18} color="#F59E0B" />
            </View>
            <Text style={s.gridLabel}>গল্প পড়েছেন</Text>
          </View>
        </View>

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

        <TouchableOpacity
          onPress={() => navigation.navigate('Home', { screen: 'Claim' })}
          style={{ marginHorizontal: 16, marginTop: 24, backgroundColor: '#fff', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6 }}>
          <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#F59E0B15', justifyContent: 'center', alignItems: 'center' }}>
            <MaterialIcons name="monetization-on" size={22} color="#F59E0B" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#1F2937' }}>কয়েন দাবি করুন</Text>
            <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>
              {pendingCount > 0 ? `${pendingCount}টি দাবি বাকি` : 'গল্প পড়ে কয়েন সংগ্রহ করুন'}
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
        </TouchableOpacity>

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
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  headerInfo: { flex: 1 },
  name: { fontSize: 15, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 1 },
  infoText: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
  editBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  balanceCard: {
    backgroundColor: '#fff', marginHorizontal: 12, marginTop: 12,
    borderRadius: 16, padding: 16,
    elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  balanceHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  balanceHeaderText: { fontSize: 12, color: '#6B7280', fontWeight: '600' },
  balanceRow: { flexDirection: 'row', alignItems: 'center' },
  balanceItem: { flex: 1, alignItems: 'center', gap: 4 },
  balanceValue: { fontSize: 22, fontWeight: 'bold', color: '#1F2937' },
  balanceLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },
  balanceVr: { width: 1, height: 36, backgroundColor: '#F0F0F0' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 8, marginTop: 10, gap: 6,
  },
  gridCard: {
    width: '31%', borderRadius: 12, padding: 10,
  },
  gridTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  gridValue: { fontSize: 18, fontWeight: 'bold' },
  gridLabel: { fontSize: 9, color: '#6B7280', fontWeight: '500' },
  menuSection: { marginTop: 16, paddingHorizontal: 8 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  menuGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  menuCard: {
    width: '23%', backgroundColor: '#fff', borderRadius: 12,
    padding: 10, alignItems: 'center', gap: 4,
    elevation: 0, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4,
  },
  menuIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  menuLabel: { fontSize: 11, fontWeight: '600', color: '#374151' },
  sectionTitle: {
    fontSize: 15, fontWeight: '700', color: '#1F2937',
    marginHorizontal: 16, marginTop: 24, marginBottom: 12,
  },
  earningRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', marginHorizontal: 16,
    borderRadius: 12, padding: 12, marginBottom: 6,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03, shadowRadius: 3,
  },
  earningIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  earningTitle: { flex: 1, fontSize: 13, color: '#374151', fontWeight: '500' },
  earningBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  earningPts: { fontSize: 12, fontWeight: '700', color: colors.primary },
  emptyBox: { alignItems: 'center', paddingVertical: 32, gap: 8 },
  emptyText: { fontSize: 13, color: '#9CA3AF' },
  guestBox: { marginHorizontal: 16, marginTop: 20, marginBottom: 20, gap: 10 },
  guestText: { textAlign: 'center', color: '#6B7280', fontSize: 13, marginBottom: 4 },
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
});
