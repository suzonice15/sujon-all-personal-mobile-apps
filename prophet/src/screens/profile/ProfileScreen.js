import React, { useCallback, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ToastAndroid, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getLoggedInUser, logoutUser } from '../../db/auth';
import { usePoints } from '../../context/PointsContext';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { total } = usePoints();

  useFocusEffect(useCallback(() => {
    getLoggedInUser().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []));

  const handleLogout = () => {
    Alert.alert('লগআউট', 'আপনি কি লগআউট করতে চান?', [
      { text: 'না', style: 'cancel' },
      {
        text: 'হ্যাঁ', onPress: async () => {
          await logoutUser();
          setUser(null);
          ToastAndroid.show('লগআউট সফল হয়েছে', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  if (loading) return <View style={styles.container} />;

  // লগইন করা নেই
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.guestBox}>
          <MaterialIcons name="account-circle" size={90} color="#ccc" />
          <Text style={styles.guestTitle}>আপনি লগইন করেননি</Text>
          <Text style={styles.guestSub}>লগইন বা নিবন্ধন করুন আপনার প্রোফাইল দেখতে</Text>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}>
            <MaterialIcons name="login" size={20} color="#fff" />
            <Text style={styles.loginBtnText}>লগইন করুন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('Register')}>
            <MaterialIcons name="person-add" size={20} color="#4F46E5" />
            <Text style={styles.registerBtnText}>নিবন্ধন করুন</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // লগইন করা আছে — profile view
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>{user.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate('EditProfile', { user })}>
          <MaterialIcons name="edit" size={16} color="#fff" />
          <Text style={styles.editBtnText}>প্রোফাইল এডিট</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>⭐ {total}</Text>
          <Text style={styles.statLabel}>মোট পয়েন্ট</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <MaterialIcons name="calendar-today" size={18} color="#4F46E5" />
        <Text style={styles.infoText}>
          যোগদান: {user.created_at?.slice(0, 10)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  // guest
  guestBox: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30,
  },
  guestTitle: { fontSize: 20, fontWeight: 'bold', color: '#111', marginTop: 16, marginBottom: 8 },
  guestSub: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  loginBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#4F46E5', borderRadius: 12,
    paddingVertical: 14, paddingHorizontal: 40, marginBottom: 14, width: '100%', justifyContent: 'center',
  },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  registerBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    borderWidth: 2, borderColor: '#4F46E5', borderRadius: 12,
    paddingVertical: 13, paddingHorizontal: 40, width: '100%', justifyContent: 'center',
  },
  registerBtnText: { color: '#4F46E5', fontSize: 16, fontWeight: 'bold' },

  // profile
  profileHeader: {
    backgroundColor: '#4F46E5', alignItems: 'center',
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

  statsRow: { flexDirection: 'row', justifyContent: 'center', margin: 20 },
  statBox: {
    backgroundColor: '#fff', borderRadius: 14, padding: 20,
    alignItems: 'center', elevation: 2, minWidth: 140,
  },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#e67e22', marginBottom: 4 },
  statLabel: { fontSize: 13, color: '#888' },

  infoCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 12,
    padding: 16, elevation: 1, marginBottom: 14,
  },
  infoText: { fontSize: 14, color: '#444' },

  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    marginTop: 14, backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
  },
  editBtnText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});
