import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Alert, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getLoggedInUser, logoutUser } from '../../db/auth';
import { usePoints } from '../../context/PointsContext';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { total } = usePoints();
  const { colors } = useTheme();
  const s = styles(colors);

  useFocusEffect(useCallback(() => {
    getLoggedInUser().then(u => { setUser(u); setLoading(false); });
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
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
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

      <View style={s.infoCard}>
        <MaterialIcons name="calendar-today" size={18} color={colors.primary} />
        <Text style={s.infoText}>যোগদান: {user.created_at?.slice(0, 10)}</Text>
      </View>

      <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
        <MaterialIcons name="logout" size={18} color={colors.danger} />
        <Text style={s.logoutText}>লগআউট</Text>
      </TouchableOpacity>
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
  infoCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, marginHorizontal: 20,
    borderRadius: 12, padding: 16, marginBottom: 14,
  },
  infoText: { fontSize: 14, color: colors.onSurface },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: colors.surface, marginHorizontal: 20,
    borderRadius: 12, padding: 16,
  },
  logoutText: { fontSize: 14, color: colors.danger, fontWeight: '600' },
});
