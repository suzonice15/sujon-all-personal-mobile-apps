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
  const [gender, setGender] = useState(user.gender || 'female');
  const [districtId, setDistrictId] = useState(user.district_id || 0);
  const [districts, setDistricts] = useState([]);
  const [showDistricts, setShowDistricts] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [errors, setErrors] = useState({});
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => { fetchDistricts().then(setDistricts); }, []);

  const selectedDistrict = districts.find((d) => d.data_id === districtId);
  const filteredDistricts = districts.filter((d) => {
    const search = districtSearch.toLowerCase();
    return d.name.toLowerCase().includes(search) || (d.name_en && d.name_en.toLowerCase().includes(search));
  });

  const handleSave = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!districtId) newErrors.district = true;
    if (newPassword && newPassword.length < 6) newErrors.password = true;
    if (newPassword && newPassword !== confirmPassword) newErrors.confirm = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      ToastAndroid.show('সব তথ্য পূরণ করুন', ToastAndroid.SHORT); return;
    }
    setLoading(true);
    await updateUser(user.id, name.trim(), newPassword || null, phone.trim(), address.trim(), gender, districtId);
    setLoading(false);
    ToastAndroid.show('প্রোফাইল আপডেট হয়েছে', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">

        <TextInput style={[s.input, errors.name && s.inputError]} value={name} onChangeText={t => { setName(t); if (errors.name) setErrors(p => ({...p, name: !t.trim()})); }} placeholder="আপনার নাম" placeholderTextColor={colors.onSurface + '66'} />

        <TextInput style={[s.input, s.inputDisabled]} value={user.email} editable={false} placeholder="ইমেইল" placeholderTextColor={colors.onSurface + '66'} />

        <TextInput style={[s.input, errors.phone && s.inputError]} value={phone} onChangeText={t => { setPhone(t); if (errors.phone) setErrors(p => ({...p, phone: !t.trim()})); }} placeholder="WhatsApp/ফোন নম্বর" placeholderTextColor={colors.onSurface + '66'} keyboardType="phone-pad" />

        <TouchableOpacity style={[s.input, errors.district && s.inputError]} onPress={() => setShowDistricts(true)} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: selectedDistrict ? colors.onSurface : colors.onSurface + '66', fontSize: 15 }}>
              {selectedDistrict ? selectedDistrict.name : 'জেলা নির্বাচন করুন'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={22} color={colors.onSurface + '66'} />
          </View>
        </TouchableOpacity>

        <TextInput style={s.input} value={address} onChangeText={setAddress} placeholder="ঠিকানা" placeholderTextColor={colors.onSurface + '66'} />

        <View style={s.genderRow}>
          {GENDERS.map((g) => (
            <TouchableOpacity key={g.value} style={[s.genderBtn, gender === g.value && s.genderActive]}
              onPress={() => setGender(g.value)}>
              <MaterialIcons name={gender === g.value ? 'radio-button-checked' : 'radio-button-unchecked'} size={16} color={gender === g.value ? colors.primary : colors.onSurface} />
              <Text style={[s.genderText, gender === g.value && s.genderTextActive]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.passRow}>
          <TextInput style={[s.input, { flex: 1, marginBottom: 0 }, errors.password && s.inputError]} value={newPassword} onChangeText={t => { setNewPassword(t); if (errors.password) setErrors(p => ({...p, password: !t.trim() || t.length < 6})); }}
            placeholder="নতুন পাসওয়ার্ড (ঐচ্ছিক)" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
          <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={20} color={colors.onSurface} style={{ opacity: 0.4 }} />
          </TouchableOpacity>
        </View>

        {newPassword.length > 0 && (
          <TextInput style={[s.input, errors.confirm && s.inputError]} value={confirmPassword} onChangeText={t => { setConfirmPassword(t); if (errors.confirm) setErrors(p => ({...p, confirm: t !== newPassword})); }}
            placeholder="পাসওয়ার্ড আবার লিখুন" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
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
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 20, paddingTop: 24 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 10,
    padding: 12, fontSize: 14, color: colors.onSurface, backgroundColor: colors.surface, marginBottom: 10,
  },
  inputError: { borderColor: '#e53935', borderWidth: 1 },
  inputDisabled: { opacity: 0.5 },
  genderRow: { flexDirection: 'row', marginBottom: 10, marginHorizontal: -3 },
  genderBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1,
    borderWidth: 1, borderColor: colors.surface, borderRadius: 10,
    paddingVertical: 10, paddingHorizontal: 6, backgroundColor: colors.surface, marginHorizontal: 3,
  },
  genderActive: { borderColor: colors.primary },
  genderText: { fontSize: 13, color: colors.onSurface, opacity: 0.6, marginLeft: 4 },
  genderTextActive: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  eyeBtn: { position: 'absolute', right: 12 },
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 14 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  searchInput: { borderWidth: 1, borderColor: colors.surface, borderRadius: 10, padding: 12, fontSize: 14, color: colors.onSurface, backgroundColor: colors.surface, margin: 12, marginBottom: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.surface },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.onSurface },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: colors.onSurface + '15' },
  modalItemText: { fontSize: 15, color: colors.onSurface },
});
