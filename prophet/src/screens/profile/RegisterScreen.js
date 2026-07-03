import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { registerUser } from '../../db/auth';
import { fetchDistricts } from '../../data/districts';

const GENDERS = [
  { label: 'পুরুষ', value: 'male' },
  { label: 'মহিলা', value: 'female' },
  { label: 'অন্যান্য', value: 'other' },
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('male');
  const [districtId, setDistrictId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [address, setAddress] = useState('');
  const [showDistricts, setShowDistricts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => { fetchDistricts().then(setDistricts); }, []);

  const selectedDistrict = districts.find((d) => d.data_id === districtId);
  const filteredDistricts = districts.filter((d) => {
    const search = districtSearch.toLowerCase();
    return d.name.toLowerCase().includes(search) || (d.name_en && d.name_en.toLowerCase().includes(search));
  });

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !address.trim() || !districtId) {
      ToastAndroid.show('সব তথ্য পূরণ করুন', ToastAndroid.SHORT); return;
    }
    if (password.length < 6) { ToastAndroid.show('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে', ToastAndroid.SHORT); return; }
    setLoading(true);
    const res = await registerUser(name.trim(), email.trim(), password, phone.trim(), gender, districtId, address.trim());
    setLoading(false);
    if (res.success) { navigation.replace('Dashboard'); }
    else { ToastAndroid.show(res.message, ToastAndroid.SHORT); }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.iconBox}>
          <MaterialIcons name="person-add" size={60} color={colors.primary} />
        </View>
        <Text style={s.title}>নিবন্ধন করুন</Text>

        <TextInput style={s.input} placeholder="আপনার নাম *" placeholderTextColor={colors.onSurface + '66'} value={name} onChangeText={setName} />
        <TextInput style={s.input} placeholder="ইমেইল *" placeholderTextColor={colors.onSurface + '66'}
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={s.input} placeholder="WhatsApp/ফোন নম্বর *" placeholderTextColor={colors.onSurface + '66'}
          value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

        <View style={s.genderRow}>
          {GENDERS.map((g) => (
            <TouchableOpacity key={g.value} style={[s.genderBtn, gender === g.value && s.genderActive]}
              onPress={() => setGender(g.value)}>
              <MaterialIcons name={gender === g.value ? 'radio-button-checked' : 'radio-button-unchecked'} size={18} color={gender === g.value ? colors.primary : colors.onSurface} />
              <Text style={[s.genderText, gender === g.value && s.genderTextActive]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={s.input} onPress={() => setShowDistricts(true)} activeOpacity={0.7}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: selectedDistrict ? colors.onSurface : colors.onSurface + '66', fontSize: 15 }}>
              {selectedDistrict ? selectedDistrict.name : 'জেলা নির্বাচন করুন *'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color={colors.onSurface + '66'} />
          </View>
        </TouchableOpacity>

        <TextInput style={s.input} placeholder="ঠিকানা *" placeholderTextColor={colors.onSurface + '66'}
          value={address} onChangeText={setAddress} multiline />

        <View style={s.passRow}>
          <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="পাসওয়ার্ড * (কমপক্ষে ৬ অক্ষর)"
            placeholderTextColor={colors.onSurface + '66'} value={password} onChangeText={setPassword} secureTextEntry={!showPass} />
          <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={colors.onSurface} style={{ opacity: 0.4 }} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={s.btn} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>নিবন্ধন করুন</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={s.link}>আগেই অ্যাকাউন্ট আছে? <Text style={s.linkBold}>লগইন করুন</Text></Text>
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
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 24, paddingTop: 40 },
  iconBox: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.onSurface, textAlign: 'center', marginBottom: 28 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    padding: 14, fontSize: 15, color: colors.onSurface, marginBottom: 14, backgroundColor: colors.surface,
  },
  genderRow: { flexDirection: 'row', marginBottom: 14, marginHorizontal: -4 },
  genderBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1,
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 8, backgroundColor: colors.surface, marginHorizontal: 4,
  },
  genderActive: { borderColor: colors.primary },
  genderText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, marginLeft: 4 },
  genderTextActive: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6, marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: colors.onSurface, opacity: 0.6, fontSize: 14 },
  linkBold: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  searchInput: { borderWidth: 1, borderColor: colors.surface, borderRadius: 10, padding: 12, fontSize: 15, color: colors.onSurface, backgroundColor: colors.surface, margin: 12, marginBottom: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.surface },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.onSurface },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: colors.onSurface + '15' },
  modalItemText: { fontSize: 16, color: colors.onSurface },
});
