import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView, Modal, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { registerUser, getUserByDeviceId } from '../../db/auth';
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
  const [gender, setGender] = useState('female');
  const [referralCode, setReferralCode] = useState('');
  const [districtId, setDistrictId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [address, setAddress] = useState('');
  const [showDistricts, setShowDistricts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const [existingUser, setExistingUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [errors, setErrors] = useState({});
  const [registered, setRegistered] = useState(null);
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => {
    fetchDistricts().then(setDistricts);
    checkExistingRegistration();
  }, []);

  const checkExistingRegistration = async () => {
    const user = await getUserByDeviceId();
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setGender(user.gender || 'female');
      setDistrictId(user.district_id || 0);
      setAddress(user.address || '');
      setReferralCode('');
      setExistingUser(user);
    }
    setChecking(false);
  };

  const selectedDistrict = districts.find((d) => d.data_id === districtId);
  const filteredDistricts = districts.filter((d) => {
    const search = districtSearch.toLowerCase();
    return d.name.toLowerCase().includes(search) || (d.name_en && d.name_en.toLowerCase().includes(search));
  });

  const handleRegister = async () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = true;
    if (!email.trim()) newErrors.email = true;
    if (!phone.trim()) newErrors.phone = true;
    if (!password.trim()) newErrors.password = true;
    if (password.trim() && password.length < 6) newErrors.password = true;
    if (!districtId) newErrors.district = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      ToastAndroid.show('সব তথ্য পূরণ করুন', ToastAndroid.SHORT); return;
    }
    setLoading(true);
    const res = await registerUser(name.trim(), email.trim(), password, phone.trim(), gender, districtId, address.trim(), referralCode.trim());
    setLoading(false);
    if (res.success) {
      setRegistered({ name: res.user?.name, referral_code: res.referral_code });
    } else {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    }
  };

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (registered) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
          <View style={s.iconBox}>
            <MaterialIcons name="celebration" size={40} color={colors.primary} />
          </View>
          <Text style={s.title}>নিবন্ধন সফল হয়েছে!</Text>
          <Text style={s.subtitle}>স্বাগতম, {registered.name}</Text>

          {registered.referral_code ? (
            <View style={s.refCodeBox}>
              <Text style={s.refCodeLabel}>আপনার রেফারেল কোড</Text>
              <Text style={s.refCodeValue}>{registered.referral_code}</Text>
              <Text style={s.refCodeHint}>এই কোড অন্যদের দিয়ে তারা নিবন্ধন করলে আপনি বোনাস পাবেন</Text>
            </View>
          ) : null}

          <TouchableOpacity style={s.btn} onPress={() => navigation.replace('Dashboard')}>
            <Text style={s.btnText}>ড্যাশবোর্ডে যান</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (existingUser) {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
          <View style={s.iconBox}>
            <MaterialIcons name="check-circle" size={40} color={colors.primary} />
          </View>
          <Text style={s.title}>আপনি ইতিমধ্যে নিবন্ধিত</Text>
          <Text style={s.subtitle}>আপনার নিবন্ধিত তথ্য নিচে দেওয়া হলো</Text>

          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>নাম</Text>
            <Text style={s.value}>{existingUser.name}</Text>
          </View>
          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>ইমেইল</Text>
            <Text style={s.value}>{existingUser.email}</Text>
          </View>
          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>WhatsApp/ফোন নম্বর</Text>
            <Text style={s.value}>{existingUser.phone}</Text>
          </View>
          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>লিঙ্গ</Text>
            <Text style={s.value}>{GENDERS.find(g => g.value === existingUser.gender)?.label || existingUser.gender}</Text>
          </View>
          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>জেলা</Text>
            <Text style={s.value}>{selectedDistrict ? selectedDistrict.name : '–'}</Text>
          </View>
          <View style={[s.input, s.disabledInput]}>
            <Text style={s.label}>ঠিকানা</Text>
            <Text style={s.value}>{existingUser.address}</Text>
          </View>
          {existingUser.referral_code ? (
            <View style={[s.input, s.disabledInput]}>
              <Text style={s.label}>রেফারেল কোড</Text>
              <Text style={s.value}>{existingUser.referral_code}</Text>
            </View>
          ) : null}

          <TouchableOpacity style={s.btn} onPress={() => navigation.replace('Dashboard')}>
            <Text style={s.btnText}>ড্যাশবোর্ডে যান</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={s.container} keyboardShouldPersistTaps="handled">
        <View style={s.iconBox}>
          <MaterialIcons name="person-add" size={40} color={colors.primary} />
        </View>
        <Text style={s.title}>নিবন্ধন করুন</Text>

        <TextInput style={[s.input, errors.name && s.inputError]} placeholder="আপনার নাম" placeholderTextColor={colors.onSurface + '66'} value={name} onChangeText={t => { setName(t); if (errors.name) setErrors(p => ({...p, name: !t.trim()})); }} />

        <TextInput style={[s.input, errors.email && s.inputError]} placeholder="ইমেইল" placeholderTextColor={colors.onSurface + '66'}
          value={email} onChangeText={t => { setEmail(t); if (errors.email) setErrors(p => ({...p, email: !t.trim()})); }} keyboardType="email-address" autoCapitalize="none" />

        <TextInput style={[s.input, errors.phone && s.inputError]} placeholder="WhatsApp/ফোন নম্বর" placeholderTextColor={colors.onSurface + '66'}
          value={phone} onChangeText={t => { setPhone(t); if (errors.phone) setErrors(p => ({...p, phone: !t.trim()})); }} keyboardType="phone-pad" />

        <View style={s.genderRow}>
          {GENDERS.map((g) => (
            <TouchableOpacity key={g.value} style={[s.genderBtn, gender === g.value && s.genderActive]}
              onPress={() => setGender(g.value)}>
              <MaterialIcons name={gender === g.value ? 'radio-button-checked' : 'radio-button-unchecked'} size={16} color={gender === g.value ? colors.primary : colors.onSurface} />
              <Text style={[s.genderText, gender === g.value && s.genderTextActive]}>{g.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={[s.input, errors.district && s.inputError]} onPress={() => setShowDistricts(true)} activeOpacity={0.7} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: selectedDistrict ? colors.onSurface : colors.onSurface + '66', fontSize: 15 }}>
              {selectedDistrict ? selectedDistrict.name : 'জেলা নির্বাচন করুন'}
            </Text>
            <MaterialIcons name="arrow-drop-down" size={22} color={colors.onSurface + '66'} />
          </View>
        </TouchableOpacity>

        <TextInput style={s.input} placeholder="ঠিকানা" placeholderTextColor={colors.onSurface + '66'}
          value={address} onChangeText={setAddress} />

        <TextInput style={s.input} placeholder="রেফারেল কোড (যদি থাকে)"
          placeholderTextColor={colors.onSurface + '66'} value={referralCode} onChangeText={setReferralCode} autoCapitalize="characters" />

        <View style={s.passRow}>
          <TextInput style={[s.input, { flex: 1, marginBottom: 0 }, errors.password && s.inputError]} placeholder="পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর)"
            placeholderTextColor={colors.onSurface + '66'} value={password} onChangeText={t => { setPassword(t); if (errors.password) setErrors(p => ({...p, password: !t.trim() || t.length < 6})); }} secureTextEntry={!showPass} />
          <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={20} color={colors.onSurface} style={{ opacity: 0.4 }} />
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
  container: { flexGrow: 1, backgroundColor: colors.background, padding: 20, paddingTop: 24 },
  iconBox: { alignItems: 'center', marginBottom: 6 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface, textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 14, color: colors.onSurface, textAlign: 'center', marginBottom: 24, opacity: 0.6 },
  disabledInput: { backgroundColor: colors.surface + '80', opacity: 0.9, paddingVertical: 10 },
  refCodeBox: {
    backgroundColor: '#F0FDF4', borderRadius: 12, padding: 20,
    borderWidth: 1, borderColor: '#86EFAC', alignItems: 'center', marginBottom: 20,
  },
  refCodeLabel: { fontSize: 13, color: '#166534', marginBottom: 8 },
  refCodeValue: { fontSize: 28, fontWeight: 'bold', color: '#16A34A', letterSpacing: 2 },
  refCodeHint: { fontSize: 12, color: '#166534', marginTop: 8, textAlign: 'center', opacity: 0.7 },
  label: { fontSize: 12, color: colors.onSurface, opacity: 0.5, marginBottom: 4 },
  value: { fontSize: 15, color: colors.onSurface, fontWeight: '500' },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 10,
    padding: 12, fontSize: 14, color: colors.onSurface, backgroundColor: colors.surface, marginBottom: 10,
  },
  inputError: { borderColor: '#e53935', borderWidth: 1 },
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
  btn: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 14, marginBottom: 14 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  link: { textAlign: 'center', color: colors.onSurface, opacity: 0.6, fontSize: 13 },
  linkBold: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  searchInput: { borderWidth: 1, borderColor: colors.surface, borderRadius: 10, padding: 12, fontSize: 14, color: colors.onSurface, backgroundColor: colors.surface, margin: 12, marginBottom: 4 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.background, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%', paddingBottom: 30 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.surface },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.onSurface },
  modalItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 0.5, borderBottomColor: colors.onSurface + '15' },
  modalItemText: { fontSize: 15, color: colors.onSurface },
});
