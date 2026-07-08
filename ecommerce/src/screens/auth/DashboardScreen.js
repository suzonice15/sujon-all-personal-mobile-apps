import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

const TABS = [
  { key: 'profile', label: 'Basic Information', icon: 'person' },
  { key: 'address', label: 'Address', icon: 'location-on' },
  { key: 'orders', label: 'Order List', icon: 'receipt' },
  { key: 'reviews', label: 'Reviews', icon: 'rate-review' },
  { key: 'transactions', label: 'Transaction', icon: 'account-balance-wallet' },
  { key: 'password', label: 'Change Password', icon: 'lock' },
  { key: 'logout', label: 'Logout', icon: 'logout' },
];

export default function DashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const handleUpdateProfile = async () => {
    setSaving(true);
    try {
      // TODO: API call
      // await updateUserProfile({ name, phone });
      Alert.alert('Success', 'Profile updated');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPass || !newPass || !confirmPass) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (newPass !== confirmPass) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    setSaving(true);
    try {
      // TODO: API call
      // await changePassword({ old_password: oldPass, new_password: newPass });
      Alert.alert('Success', 'Password changed');
      setOldPass(''); setNewPass(''); setConfirmPass('');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>Basic Information</Text>
            <View style={s.avatarWrap}>
              <View style={[s.avatar, { backgroundColor: colors.primary }]}>
                <Text style={s.avatarText}>{(user?.name || 'U').charAt(0).toUpperCase()}</Text>
              </View>
            </View>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>Name</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={name} onChangeText={setName}
              />
            </View>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>Email</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={email} editable={false}
              />
            </View>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>Phone</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={phone} onChangeText={setPhone} keyboardType="phone-pad"
              />
            </View>
            <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.primary }]} onPress={handleUpdateProfile} disabled={saving}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.saveBtnText}>Save Changes</Text>}
            </TouchableOpacity>
          </View>
        );

      case 'address':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>Saved Addresses</Text>
            <View style={s.emptyState}>
              <MaterialIcons name="location-off" size={48} color={colors.onSurface + '20'} />
              <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No addresses saved yet</Text>
            </View>
            <TouchableOpacity style={[s.addBtn, { backgroundColor: colors.primary }]}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={s.addBtnText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        );

      case 'orders':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>My Orders</Text>
            <View style={s.emptyState}>
              <MaterialIcons name="receipt-long" size={48} color={colors.onSurface + '20'} />
              <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No orders yet</Text>
            </View>
          </View>
        );

      case 'reviews':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>My Reviews</Text>
            <View style={s.emptyState}>
              <MaterialIcons name="rate-review" size={48} color={colors.onSurface + '20'} />
              <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No reviews yet</Text>
            </View>
          </View>
        );

      case 'transactions':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>Transaction History</Text>
            <View style={s.emptyState}>
              <MaterialIcons name="account-balance-wallet" size={48} color={colors.onSurface + '20'} />
              <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No transactions yet</Text>
            </View>
          </View>
        );

      case 'password':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <Text style={[s.sectionTitle, { color: colors.text }]}>Change Password</Text>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>Current Password</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={oldPass} onChangeText={setOldPass} secureTextEntry
              />
            </View>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>New Password</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={newPass} onChangeText={setNewPass} secureTextEntry
              />
            </View>
            <View style={s.field}>
              <Text style={[s.label, { color: colors.onSurface + '70' }]}>Confirm New Password</Text>
              <TextInput
                style={[s.input, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={confirmPass} onChangeText={setConfirmPass} secureTextEntry
              />
            </View>
            <TouchableOpacity style={[s.saveBtn, { backgroundColor: colors.primary }]} onPress={handleChangePassword} disabled={saving}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.saveBtnText}>Change Password</Text>}
            </TouchableOpacity>
          </View>
        );

      case 'logout':
        return (
          <View style={[s.section, { backgroundColor: colors.surface }]}>
            <View style={s.emptyState}>
              <MaterialIcons name="logout" size={48} color="#EF4444" />
              <Text style={[s.emptyText, { color: colors.onSurface + '70' }]}>Are you sure you want to logout?</Text>
            </View>
            <TouchableOpacity style={[s.logoutBtn]} onPress={handleLogout}>
              <MaterialIcons name="logout" size={20} color="#fff" />
              <Text style={s.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[s.tabBar, { backgroundColor: colors.surface }]}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[s.tab, activeTab === tab.key && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(tab.key)}
          >
            <MaterialIcons name={tab.icon} size={18} color={activeTab === tab.key ? colors.primary : colors.onSurface + '60'} />
            <Text style={[s.tabLabel, { color: activeTab === tab.key ? colors.primary : colors.onSurface + '60' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={s.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row', maxHeight: 56,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  tab: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 14, gap: 6,
  },
  tabLabel: { fontSize: 12, fontWeight: '600' },
  content: { flex: 1, padding: 16 },
  section: { borderRadius: 14, padding: 18, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 16 },
  avatarWrap: { alignItems: 'center', marginBottom: 20 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 28, fontWeight: '800', color: '#fff' },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46, fontSize: 15 },
  saveBtn: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
  addBtn: {
    flexDirection: 'row', height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', gap: 6,
  },
  addBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  logoutBtn: {
    flexDirection: 'row', height: 48, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#EF4444',
  },
  logoutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
