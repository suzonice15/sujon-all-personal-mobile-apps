import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser, logoutUser } from '../../db/auth';
import { usePoints } from '../../context/PointsContext';
import { fetchDistricts, getDistrictName } from '../../data/districts';
import AdBanner from '../../components/ads/AdBanner';

const genderLabels = { male: 'পুরুষ', female: 'মহিলা', other: 'অন্যান্য' };

const infoFields = [
  { key: 'name', label: 'নাম', icon: 'person' },
  { key: 'email', label: 'ইমেইল', icon: 'email' },
  { key: 'phone', label: 'ফোন', icon: 'phone', fallback: '—' },
  { key: 'gender', label: 'লিঙ্গ', icon: 'wc', fallback: '—' },
  { key: 'district', label: 'জেলা', icon: 'map', fallback: '—' },
  { key: 'address', label: 'ঠিকানা', icon: 'location-on', fallback: '—' },
];

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { total } = usePoints();
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    getLoggedInUser().then(u => { setUser(u); setLoading(false); });
    fetchDistricts().then(setDistricts);
  }, []));

  const handleLogout = () => {
    Alert.alert('লগআউট', 'আপনি কি লগআউট করতে চান?', [
      { text: 'না', style: 'cancel' },
      { text: 'হ্যাঁ', onPress: async () => { await logoutUser(); setUser(null); ToastAndroid.show('লগআউট সফল হয়েছে', ToastAndroid.SHORT); } },
    ]);
  };

  if (loading) return <SafeAreaView style={s.container} />;

  if (!user) {
    return (
      <SafeAreaView style={s.container}>
        <View style={s.guestBox}>
          <MaterialIcons name="account-circle" size={90} color={colors.onSurface} style={{ opacity: 0.3 }} />
          <Text style={s.guestTitle}>আপনি লগইন করেননি</Text>
          <Text style={s.guestSub}>লগইন বা নিবন্ধন করুন আপনার প্রোফাইল দেখতে</Text>
          <TouchableOpacity style={s.loginBtn} onPress={() => navigation.navigate('Login')}>
            <MaterialIcons name="login" size={20} color="#fff" />
            <Text style={s.loginBtnText}>লগইন করুন</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.registerBtn} onPress={() => navigation.navigate('Register')}>
            <MaterialIcons name="person-add" size={20} color={colors.primary} />
            <Text style={s.registerBtnText}>নিবন্ধন করুন</Text>
          </TouchableOpacity>
        </View>
        <AdBanner />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={s.profileHeader}>
          <View style={s.avatarBox}>
            <Text style={s.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={s.userName}>{user.name}</Text>
          <Text style={s.userEmail}>{user.email}</Text>
          <TouchableOpacity style={s.editBtn} onPress={() => navigation.navigate('EditProfile', { user })}>
            <MaterialIcons name="edit" size={16} color="#fff" />
            <Text style={s.editBtnText}>প্রোফাইল এডিট</Text>
          </TouchableOpacity>
        </View>

        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={s.statValue}>⭐ {total}</Text>
            <Text style={s.statLabel}>মোট পয়েন্ট</Text>
          </View>
        </View>

        <Text style={s.sectionTitle}>ব্যক্তিগত তথ্য</Text>
        <View style={s.infoCard}>
          {infoFields.map((field, i) => {
            let value = user[field.key] || field.fallback || '—';
            if (field.key === 'gender') value = genderLabels[user.gender] || '—';
            if (field.key === 'district') value = getDistrictName(user.district_id, districts);
            return (
              <View key={field.key} style={[s.infoRow, i < infoFields.length - 1 && s.infoRowBorder]}>
                <View style={s.infoIcon}>
                  <MaterialIcons name={field.icon} size={20} color={colors.primary} />
                </View>
                <View style={s.infoContent}>
                  <Text style={s.infoLabel}>{field.label}</Text>
                  <Text style={s.infoValue} numberOfLines={2}>{value}</Text>
                </View>
                <TouchableOpacity style={s.fieldEditBtn} onPress={() => navigation.navigate('EditProfile', { user })}>
                  <MaterialIcons name="edit" size={18} color={colors.onSurface} style={{ opacity: 0.3 }} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={s.infoCard}>
          <View style={s.infoRow}>
            <View style={s.infoIcon}>
              <MaterialIcons name="calendar-today" size={20} color={colors.primary} />
            </View>
            <View style={s.infoContent}>
              <Text style={s.infoLabel}>যোগদান</Text>
              <Text style={s.infoValue}>{user.created_at?.slice(0, 10)}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={s.logoutText}>লগআউট</Text>
        </TouchableOpacity>
        </ScrollView>
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  guestBox: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 },
  guestTitle: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface, marginTop: 16, marginBottom: 8 },
  guestSub: { fontSize: 14, color: colors.onSurface, opacity: 0.5, textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  loginBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.primary, borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 40, marginBottom: 14, width: '100%', justifyContent: 'center',
  },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 2, borderColor: colors.primary, borderRadius: 12,
    paddingVertical: 13, paddingHorizontal: 40, width: '100%', justifyContent: 'center',
  },
  registerBtnText: { color: colors.primary, fontSize: 16, fontWeight: 'bold' },
  profileHeader: {
    backgroundColor: colors.primary, alignItems: 'center',
    paddingTop: 50, paddingBottom: 35,
    borderBottomLeftRadius: 30, borderBottomRightRadius: 30,
  },
  avatarBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  userEmail: { fontSize: 13, color: '#C7D2FE' },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 14, backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  statsRow: { flexDirection: 'row', justifyContent: 'center', margin: 20 },
  statBox: {
    backgroundColor: colors.surface, borderRadius: 14, padding: 20,
    alignItems: 'center', minWidth: 140,
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.primary, marginBottom: 4 },
  statLabel: { fontSize: 13, color: colors.onSurface, opacity: 0.5 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#1F2937',
    marginHorizontal: 20, marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.surface, marginHorizontal: 20,
    borderRadius: 16, padding: 4, marginBottom: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 6,
  },
  infoRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 14, gap: 12,
  },
  infoRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.background },
  infoIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center',
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 11, color: colors.onSurface, opacity: 0.4, marginBottom: 2 },
  infoValue: { fontSize: 15, color: colors.onSurface, fontWeight: '500' },
  fieldEditBtn: { padding: 4 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#FEF2F2', marginHorizontal: 20,
    borderRadius: 14, padding: 16, marginTop: 4,
  },
  logoutText: { fontSize: 15, color: '#EF4444', fontWeight: '600' },
});
