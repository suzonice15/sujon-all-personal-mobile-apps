import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { sendOtp, registerUser } from '../../api/authApi';
import { getDivisions, getDistricts, getUpazilas } from '../../api/addressApi';
import SelectField from '../../components/SelectField';

export default function RegisterScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');

  const [sendingOtp, setSendingOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getDivisions().then((res) => setDivisions(Array.isArray(res) ? res : [])).catch(() => {});
  }, []);

  const handleDivisionChange = async (id) => {
    setDivisionId(id);
    setDistrictId('');
    setUpazilaId('');
    setUpazilas([]);
    try {
      const res = await getDistricts(id);
      setDistricts(Array.isArray(res) ? res : []);
    } catch {
      setDistricts([]);
    }
  };

  const handleDistrictChange = async (id) => {
    setDistrictId(id);
    setUpazilaId('');
    try {
      const res = await getUpazilas(id);
      setUpazilas(Array.isArray(res) ? res : []);
    } catch {
      setUpazilas([]);
    }
  };

  const validateBasicInfo = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (!divisionId || !districtId || !upazilaId) {
      Alert.alert('Error', 'Please select your division, district and thana');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter your address');
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateBasicInfo()) return;
    setSendingOtp(true);
    try {
      const res = await sendOtp(phone.trim());
      if (res?.success === false) {
        Alert.alert('Error', res?.result || 'Failed to send OTP');
        return;
      }
      console.log('OTP sent response:', res.otp);
      setServerOtp(String(res?.otp ?? ''));
      setOtpSent(true);
      Alert.alert('OTP Sent', res?.result || 'An OTP has been sent to your phone number');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || e.message || 'Failed to send OTP');
    } finally {
      setSendingOtp(false);
    }
  };

  const handleRegister = async () => {
    if (!userOtp.trim()) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }

    console.log('Server OTP:', serverOtp, 'User OTP:', userOtp);
    if (userOtp.trim() !== serverOtp) {
      Alert.alert('Error', 'Please enter a valid OTP');
      return;
    }
    setSubmitting(true);
    try {
      const res = await registerUser({
        name: name.trim(),
        phone: phone.trim(),
        password,
        address: address.trim(),
        division_id: divisionId,
        district_id: districtId,
        upazila_id: upazilaId,
      });
      if (res?.success === false) {
        Alert.alert('Registration Failed', res?.result || 'Something went wrong');
        return;
      }
      Alert.alert('Success', res?.result || 'Registration successful', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (e) {
      Alert.alert('Registration Failed', e?.response?.data?.message || e.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[s.container, { backgroundColor: '#fff' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={[s.backBtn, { marginTop: insets.top + 12 }]} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <View style={s.logoWrap}>
          <View style={s.logoCircle}>
            <MaterialIcons name="person-add" size={36} color="#27C34B" />
          </View>
        </View>

        <Text style={s.headTitle}>Create Account</Text>
        <Text style={s.headSub}>Sign up to get started.</Text>

        <View style={s.form}>
          <View style={s.inputWrap}>
            <MaterialIcons name="person" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              editable={!otpSent}
            />
          </View>

          <View style={s.inputWrap}>
            <MaterialIcons name="phone" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Phone Number"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              editable={!otpSent}
            />
          </View>

          <View style={s.inputWrap}>
            <MaterialIcons name="lock" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              editable={!otpSent}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <MaterialIcons name={showPass ? 'visibility' : 'visibility-off'} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={s.inputWrap}>
            <MaterialIcons name="lock" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Confirm Password"
              placeholderTextColor="#9CA3AF"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPass}
              editable={!otpSent}
            />
            <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
              <MaterialIcons name={showConfirmPass ? 'visibility' : 'visibility-off'} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View pointerEvents={otpSent ? 'none' : 'auto'} style={otpSent && s.disabledBlock}>
            <SelectField
              label="Division"
              value={divisionId}
              options={divisions}
              valueKey="id"
              labelKey="division_name"
              placeholder="Select Division"
              onSelect={handleDivisionChange}
              colors={colors}
            />
            <SelectField
              label="District"
              value={districtId}
              options={districts}
              valueKey="id"
              labelKey="district_name"
              placeholder="Select District"
              onSelect={handleDistrictChange}
              colors={colors}
            />
            <SelectField
              label="Thana"
              value={upazilaId}
              options={upazilas}
              valueKey="id"
              labelKey="upazilas_name"
              placeholder="Select Thana"
              onSelect={setUpazilaId}
              colors={colors}
            />
          </View>

          <View style={[s.inputWrap, s.addressWrap]}>
            <MaterialIcons name="location-on" size={20} color="#9CA3AF" />
            <TextInput
              style={[s.input, { height: 60 }]}
              placeholder="Full Address"
              placeholderTextColor="#9CA3AF"
              value={address}
              onChangeText={setAddress}
              multiline
              editable={!otpSent}
            />
          </View>

          {otpSent && (
            <View style={s.inputWrap}>
              <MaterialIcons name="sms" size={20} color="#9CA3AF" />
              <TextInput
                style={s.input}
                placeholder="Enter OTP"
                placeholderTextColor="#9CA3AF"
                value={userOtp}
                onChangeText={setUserOtp}
                keyboardType="number-pad"
              />
            </View>
          )}

          {!otpSent ? (
            <TouchableOpacity
              style={s.submitBtn}
              onPress={handleSendOtp}
              disabled={sendingOtp}
              activeOpacity={0.85}
            >
              {sendingOtp ? <ActivityIndicator color="#fff" /> : <Text style={s.submitBtnText}>Send OTP</Text>}
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={s.submitBtn}
                onPress={handleRegister}
                disabled={submitting}
                activeOpacity={0.85}
              >
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={s.submitBtnText}>Confirm & Register</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOtpSent(false)} style={{ marginTop: 14 }}>
                <Text style={s.editText}>Edit details</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={s.loginRow}>
            <Text style={s.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('Login')}>
              <Text style={s.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 32, paddingBottom: 40 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 16 },
  logoCircle: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#D1FAE5',
  },
  headTitle: { fontSize: 26, fontWeight: '800', color: '#111827', textAlign: 'center' },
  headSub: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 6, marginBottom: 24 },
  form: { gap: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14,
    paddingHorizontal: 16, height: 54, gap: 10,
    backgroundColor: '#F9FAFB',
  },
  addressWrap: { height: undefined, alignItems: 'flex-start', paddingVertical: 10 },
  input: { flex: 1, fontSize: 15, color: '#111827', padding: 0 },
  disabledBlock: { opacity: 0.5 },
  submitBtn: {
    height: 54, borderRadius: 14,
    backgroundColor: '#27C34B',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 6, elevation: 2, shadowColor: '#27C34B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  submitBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  editText: { fontSize: 13, color: '#27C34B', textAlign: 'center', fontWeight: '600' },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#27C34B', fontWeight: '700' },
});
