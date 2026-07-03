import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { updateUser } from '../../db/auth';
import { fetchDistricts } from '../../data/districts';

const GENDERS = [
  { label: 'পুরুষ', value: 'male' },
  { label: 'মহিলা', value: 'female' },
  { label: 'অন্যান্য', value: 'other' },
];

export default function EditProfileScreen({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [address, setAddress] = useState(user.address || '');
  const [gender, setGender] = useState(user.gender || 'male');
  const [districtId, setDistrictId] = useState(user.district_id || 0);
  const [districts, setDistricts] = useState([]);
  const [showDistricts, setShowDistricts] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => { fetchDistricts().then(setDistricts); }, []);

  const selectedDistrict = districts.find((d) => d.data_id === districtId);
  const filteredDistricts = districts.filter((d) => {
    const search = districtSearch.toLowerCase();
    return d.name.toLowerCase().includes(search) || (d.name_en && d.name_en.toLowerCase().includes(search));
  });

  const handleSave = async () => {
    if (!name.trim()) { ToastAndroid.show('নাম খালি রাখা যাবে না', ToastAndroid.SHORT); return; }
    if (!districtId) { ToastAndroid.show('জেলা নির্বাচন করুন', ToastAndroid.SHORT); return; }
    if (newPassword && newPassword.length < 6) { ToastAndroid.show('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে', ToastAndroid.SHORT); return; }
    if (newPassword && newPassword !== confirmPassword) { ToastAndroid.show('পাসওয়ার্ড মিলছে না', ToastAndroid.SHORT); return; }
    setLoading(true);
    await updateUser(user.id, name.trim(), newPassword || null, phone.trim(), address.trim(), gender, districtId);
    setLoading(false);
    ToastAndroid.show('প্রোফাইল আপডেট হয়েছে', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView style={s.container} contentContainerStyle={{ padding: 24 }} keyboardShouldPersistTaps="handled">
        <View style={s.avatarBox}>
          <Text style={s.avatarText}>{name?.charAt(0).toUpperCase()}</Text>
        </View>

        <Text style={s.label}>নাম</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} placeholder="আপনার নাম" placeholderTextColor={colors.onSurface + '66'} />

        <Text style={s.label}>ইমেইল</Text>
        <TextInput style={[s.input, s.inputDisabled]} value={user.email} editable={false} />

        <Text style={s.label}>WhatsApp/ফোন নম্বর</Text>
        <TextInput style={s.input} value={phone} onChangeText={setPhone} placeholder="ফোন নম্বর" placeholderTextColor={colors.onSurface + '66'} keyboardType="phone-pad" />

        <Text style={s.label}>জেলা</Text>
        <TouchableOpacity style={s.input} onPress={() => setShowDistricts(true)} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: selectedDistrict ? colors.onSurface : colors.onSurface + '66', fontSize: 15 }}>
              {selectedDistrict ? selectedDistrict.name : 'জেলা নির্বাচন করুন'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color={colors.onSurface + '66'} />
          </View>
        </TouchableOpacity>

        <Text style={s.label}>ঠিকানা</Text>
        <TextInput style={s.input} value={address} onChangeText={setAddress} placeholder="ঠিকানা" placeholderTextColor={colors.onSurface + '66'} multiline />

        <Text style={s.label}>লিঙ্গ</Text>
        <View style={s.genderRow}>
          {GENDERS.map((g) => (
            <TouchableOpacity key={g.value} style={[s.genderBtn, gender === g.value && s.genderActive]}
              onPress={() => setGender(g.value)}>
              <MaterialIcons name={gender === g.value ? 'radio-button-checked' : 'radio-button-unchecked'} size={18} color={gender === g.value ? colors.primary : colors.onSurface} />
              <Text style={[s.genderText, gender === g.value && s.genderTextActive]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={s.label}>নতুন পাসওয়ার্ড (ঐচ্ছিক)</Text>
        <View style={s.passRow}>
          <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} value={newPassword} onChangeText={setNewPassword}
            placeholder="নতুন পাসওয়ার্ড" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
          <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={colors.onSurface} style={{ opacity: 0.4 }} />
          </TouchableOpacity>
        </View>

        {newPassword.length > 0 && (
          <>
            <Text style={s.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <TextInput style={s.input} value={confirmPassword} onChangeText={setConfirmPassword}
              placeholder="পাসওয়ার্ড আবার লিখুন" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
          </>
        )}

        <TouchableOpacity style={s.btn} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>সংরক্ষণ করুন</Text>}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showDistricts} transparent animationType="slide" onRequestClose={() => setShowDistricts(false)} onShow={() => setDistrictSearch('')}>
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <View style={s.modalHeader}>
              <Text style={s.modalTitle}>জেলা নির্বাচন করুন</Text>
              <TouchableOpacity onPress={() => setShowDistricts(false)}>
                <MaterialIcons name="close" size={24} color={colors.onSurface} />
              </TouchableOpacity>
            </View>
            <TextInput style={s.searchInput} placeholder="জেলা খুঁজুন..." placeholderTextColor={colors.onSurface + '66'}
              value={districtSearch} onChangeText={setDistrictSearch} autoCapitalize="none" autoCorrect={false} />
            <FlatList
              data={filteredDistricts}
              keyExtractor={(item) => String(item.data_id)}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity style={s.modalItem} onPress={() => { setDistrictId(item.data_id); setShowDistricts(false); }}>
                  <Text style={s.modalItemText}>{item.name} {item.name_en ? `(${item.name_en})` : ''}</Text>
                  {item.data_id === districtId && <MaterialIcons name="check" size={20} color={colors.primary} />}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  avatarBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.primary, alignItems: 'center',
    justifyContent: 'center', alignSelf: 'center', marginBottom: 28,
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  label: { fontSize: 13, color: colors.onSurface, opacity: 0.6, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    padding: 14, fontSize: 15, color: colors.onSurface, marginBottom: 4, backgroundColor: colors.surface,
  },
  inputDisabled: { opacity: 0.4 },
  genderRow: { flexDirection: 'row', marginBottom: 4, marginHorizontal: -4 },
  genderBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1,
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 8, backgroundColor: colors.surface, marginHorizontal: 4,
  },
  genderActive: { borderColor: colors.primary },
  genderText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, marginLeft: 4 },
  genderTextActive: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 28 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: colors.surface, borderRadius: 10, padding: 12, fontSize: 15, color: colors.onSurface, backgroundColor: colors.surface, margin: 12, marginBottom: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.surface },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.onSurface },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: colors.onSurface + '15' },
  modalItemText: { fontSize: 16, color: colors.onSurface },
});
