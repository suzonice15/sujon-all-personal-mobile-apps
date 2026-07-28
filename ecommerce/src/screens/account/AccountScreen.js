import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { icon: 'person', label: 'My Profile', screen: 'Dashboard', params: { tab: 'profile' } },
  { icon: 'receipt', label: 'My Orders', screen: 'Dashboard', params: { tab: 'orders' } },
  { icon: 'favorite', label: 'Wishlist', screen: null },
  { icon: 'location-on', label: 'Address', screen: 'Dashboard', params: { tab: 'address' } },
  { icon: 'rate-review', label: 'Reviews', screen: 'Dashboard', params: { tab: 'reviews' } },
  { icon: 'account-balance-wallet', label: 'Transactions', screen: 'Dashboard', params: { tab: 'transactions' } },
  { icon: 'lock', label: 'Change Password', screen: 'Dashboard', params: { tab: 'password' } },
  { icon: 'settings', label: 'Settings', screen: 'SettingInfo' },
];

export default function AccountScreen({ navigation }) {
  const { user } = useAuth();
  const { colors } = useTheme();

  if (!user) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <MaterialIcons name="account-circle" size={80} color={colors.onSurface + '20'} />
        <Text style={[s.guestTitle, { color: colors.text }]}>Not Logged In</Text>
        <Text style={[s.guestSub, { color: colors.onSurface + '60' }]}>Login to access your account</Text>
        <TouchableOpacity
          style={[s.loginBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Login')}
        >
          <MaterialIcons name="login" size={20} color="#fff" />
          <Text style={s.loginBtnText}>Login / Register</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: colors.background }]} contentContainerStyle={s.content}>
      <TouchableOpacity
        style={[s.profileCard, { backgroundColor: colors.surface }]}
        onPress={() => navigation.navigate('Dashboard')}
        activeOpacity={0.7}
      >
        <View style={[s.avatar, { backgroundColor: colors.primary }]}>
          <Text style={s.avatarText}>{(user.name || 'U').charAt(0).toUpperCase()}</Text>
        </View>
        <View style={s.profileInfo}>
          <Text style={[s.profileName, { color: colors.text }]}>{user.name || 'User'}</Text>
          <Text style={[s.profileEmail, { color: colors.onSurface + '60' }]}>{user.phone || ''}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.onSurface + '40'} />
      </TouchableOpacity>

      <View style={[s.menuCard, { backgroundColor: colors.surface }]}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[s.menuItem, index < menuItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.onSurface + '10' }]}
            onPress={() => item.screen && navigation.navigate(item.screen, item.params)}
            activeOpacity={0.7}
          >
            <View style={s.menuLeft}>
              <View style={[s.menuIcon, { backgroundColor: colors.primary + '15' }]}>
                <MaterialIcons name={item.icon} size={20} color={colors.primary} />
              </View>
              <Text style={[s.menuLabel, { color: colors.text }]}>{item.label}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color={colors.onSurface + '30'} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  guestTitle: { fontSize: 20, fontWeight: '700', marginTop: 16 },
  guestSub: { fontSize: 14, marginTop: 6, marginBottom: 20 },
  loginBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12,
  },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    borderRadius: 16, padding: 18, marginBottom: 20,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 22, fontWeight: '800', color: '#fff' },
  profileInfo: { flex: 1, marginLeft: 14 },
  profileName: { fontSize: 17, fontWeight: '700' },
  profileEmail: { fontSize: 13, marginTop: 2 },
  menuCard: { borderRadius: 14, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 16,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { fontSize: 15 },
});
