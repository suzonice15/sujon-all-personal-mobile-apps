import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, ActivityIndicator, Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { getUserProfile, updateUserProfile } from '../../api/profileApi';

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
  const { user, token, logout, updateUser } = useAuth();
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  // profile state
  const [profileEdit, setProfileEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: '',
    phone: user?.phone || '',
    contact_number: '',
    gender: 'Female',
    birth_date: '',
    ocupation: '',
    organization: '',
    created_at: '',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // password state
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  useEffect(() => {
    if (token && activeTab === 'profile' && !profileEdit) {
      fetchProfile();
    }
  }, [activeTab, token]);

  const fetchProfile = async () => {
    const userId = user?.id;
    if (!userId || !token) return;
    setLoading(true);
    try {
      const res = await getUserProfile(userId, token);
      setProfile(prev => ({
        ...prev,
        name: res.name || prev.name,
        email: res.email || '',
        phone: res.phone || prev.phone,
        contact_number: res.contact_number || '',
        gender: res.gender || 'Female',
        birth_date: res.birth_date || '',
        ocupation: res.ocupation || '',
        organization: res.organization || '',
        created_at: res.created_at || '',
      }));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const validateProfile = () => {
    if (!profile.name?.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!profile.contact_number?.trim()) {
      Alert.alert('Validation Error', 'Please enter your mobile number');
      return false;
    }
    if (isNaN(profile.contact_number)) {
      Alert.alert('Validation Error', 'Please enter a valid number in mobile field');
      return false;
    }
    if (profile.contact_number.length !== 11) {
      Alert.alert('Validation Error', 'Please enter 11 digit mobile number');
      return false;
    }
    if (!profile.gender) {
      Alert.alert('Validation Error', 'Please select gender');
      return false;
    }
    if (!profile.birth_date) {
      Alert.alert('Validation Error', 'Please enter birth date');
      return false;
    }
    return true;
  };

  const handleUpdateProfile = async () => {
    if (!validateProfile()) return;
    const userId = user?.id;
    if (!userId) return;
    setSaving(true);
    try {
      await updateUserProfile(userId, {
        name: profile.name,
        gender: profile.gender,
        birth_date: profile.birth_date,
        ocupation: profile.ocupation,
        organization: profile.organization,
        contact_number: profile.contact_number,
      });
      setProfileEdit(false);
      await fetchProfile();
      updateUser({ name: profile.name });
      Alert.alert('Success', 'Profile updated successfully');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || e.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
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
      // TODO: change password API call when endpoint is available
      Alert.alert('Success', 'Password changed');
      setOldPass(''); setNewPass(''); setConfirmPass('');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr);
      const months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    } catch {
      return dateStr;
    }
  };

  const renderProfile = () => {
    if (loading) {
      return (
        <View style={[s.section, { backgroundColor: colors.surface, alignItems: 'center', paddingVertical: 40 }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    const rows = [
      { label: 'Jncompurter Number', value: profile.phone },
      { label: 'Full Name', value: profile.name },
      { label: 'Contact Number', value: profile.contact_number },
      { label: 'Gender', value: profile.gender },
      { label: 'Date of Birth', value: formatDate(profile.birth_date) },
      { label: 'Member Since', value: formatDate(profile.created_at) },
      { label: 'Organization', value: profile.organization || 'N/A' },
      { label: 'Occupation', value: profile.ocupation || 'N/A' },
    ];

    return (
      <View style={[s.section, { backgroundColor: colors.surface }]}>
        <View style={s.sectionHeader}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Basic Information</Text>
          {!profileEdit && (
            <TouchableOpacity onPress={() => setProfileEdit(true)} style={s.editBtn}>
              <MaterialIcons name="edit" size={16} color="#27C34B" />
              <Text style={s.editBtnText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={[s.sectionSub, { color: colors.onSurface + '70' }]}>
          Enter your basic information for ensuring security and recovery of your account.
        </Text>

        {profileEdit ? (
          <View style={s.editForm}>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Full Name:</Text>
              <TextInput
                style={[s.editInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={profile.name}
                onChangeText={text => setProfile(p => ({ ...p, name: text }))}
              />
            </View>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Contact Number:</Text>
              <TextInput
                style={[s.editInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={profile.contact_number}
                onChangeText={text => setProfile(p => ({ ...p, contact_number: text }))}
                keyboardType="number-pad"
                maxLength={11}
              />
            </View>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Gender:</Text>
              <View style={s.genderRow}>
                {['Male', 'Female'].map(g => (
                  <TouchableOpacity
                    key={g}
                    style={[s.genderBtn, profile.gender === g && s.genderBtnActive]}
                    onPress={() => setProfile(p => ({ ...p, gender: g }))}
                  >
                    <Text style={[s.genderBtnText, profile.gender === g && s.genderBtnTextActive]}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Date of Birth:</Text>
              <TextInput
                style={[s.editInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={profile.birth_date}
                onChangeText={text => setProfile(p => ({ ...p, birth_date: text }))}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={colors.onSurface + '50'}
              />
            </View>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Organization:</Text>
              <TextInput
                style={[s.editInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={profile.organization}
                onChangeText={text => setProfile(p => ({ ...p, organization: text }))}
              />
            </View>
            <View style={s.fieldRow}>
              <Text style={[s.fieldLabel, { color: colors.onSurface + '70' }]}>Occupation:</Text>
              <TextInput
                style={[s.editInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                value={profile.ocupation}
                onChangeText={text => setProfile(p => ({ ...p, ocupation: text }))}
              />
            </View>
            <View style={s.btnRow}>
              <TouchableOpacity style={s.closeBtn} onPress={() => setProfileEdit(false)}>
                <Text style={s.closeBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.updateBtn} onPress={handleUpdateProfile} disabled={saving}>
                {saving ? <ActivityIndicator color="#fff" /> : <Text style={s.updateBtnText}>Update</Text>}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={s.infoTable}>
            {rows.map((row, i) => (
              <View key={i} style={[s.infoRow, i < rows.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.onSurface + '8' }]}>
                <Text style={[s.infoLabel, { color: colors.onSurface + '70' }]}>{row.label}</Text>
                <Text style={[s.infoValue, { color: colors.text }]}>{row.value || 'N/A'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
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
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sectionSub: { fontSize: 12, marginTop: 4, marginBottom: 16, lineHeight: 18 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#27C34B' },
  editBtnText: { fontSize: 13, fontWeight: '600', color: '#27C34B' },
  infoTable: { borderRadius: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E7EB' },
  infoRow: { flexDirection: 'row', paddingVertical: 12, paddingHorizontal: 14 },
  infoLabel: { flex: 0.45, fontSize: 13, fontWeight: '600' },
  infoValue: { flex: 0.55, fontSize: 13 },
  editForm: { gap: 12 },
  fieldRow: { marginBottom: 4 },
  fieldLabel: { fontSize: 13, fontWeight: '600', marginBottom: 4 },
  editInput: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 44, fontSize: 14 },
  genderRow: { flexDirection: 'row', gap: 10 },
  genderBtn: { paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  genderBtnActive: { backgroundColor: '#27C34B', borderColor: '#27C34B' },
  genderBtnText: { fontSize: 14, color: '#6B7280' },
  genderBtnTextActive: { color: '#fff', fontWeight: '600' },
  btnRow: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 8 },
  closeBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: '#EF4444' },
  closeBtnText: { color: '#EF4444', fontSize: 14, fontWeight: '600' },
  updateBtn: { paddingHorizontal: 20, paddingVertical: 12, borderRadius: 10, backgroundColor: '#27C34B', minWidth: 90, alignItems: 'center' },
  updateBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 14, height: 46, fontSize: 15 },
  saveBtn: { height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  saveBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
  addBtn: { flexDirection: 'row', height: 44, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 6 },
  addBtnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  logoutBtn: { flexDirection: 'row', height: 48, borderRadius: 10, alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#EF4444' },
  logoutBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
