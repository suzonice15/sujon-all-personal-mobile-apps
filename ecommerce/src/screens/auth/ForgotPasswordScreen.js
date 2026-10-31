import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { forgotPassword, resetPassword } from '../../api/authApi';

export default function ForgotPasswordScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [serverOtp, setServerOtp] = useState('');
  const [sending, setSending] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validatePhone = () => {
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return false;
    }
    if (isNaN(phone.trim())) {
      Alert.alert('Error', 'Please enter numbers only in the mobile field');
      return false;
    }
    if (phone.trim().length !== 11) {
      Alert.alert('Error', 'Please enter an 11 digit mobile number');
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validatePhone()) return;
    setSending(true);
    try {
      const res = await forgotPassword(phone.trim());
      if (res?.success === false) {
        Alert.alert('Error', res?.result || 'Failed to send OTP');
        return;
      }
      setServerOtp(String(res?.otp ?? ''));
      setOtpSent(true);
      Alert.alert('OTP Sent', res?.result || 'An OTP has been sent to your phone number');
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || e.message || 'Failed to send OTP');
    } finally {
      setSending(false);
    }
  };

  const handleConfirm = async () => {
    if (userOtp.trim() !== serverOtp) {
      Alert.alert('Error', 'Please enter a valid OTP');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'New Password and Confirm Password do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Enter at least 6 digit password');
      return;
    }
    setSubmitting(true);
    try {
      const res = await resetPassword(phone.trim(), password);
      if (res?.success === false) {
        Alert.alert('Error', res?.result || 'Something went wrong');
        return;
      }
      Alert.alert('Success', res?.result || 'Password changed successfully', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || e.message || 'Something went wrong');
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
            <MaterialIcons name="lock-reset" size={36} color="#27C34B" />
          </View>
        </View>

        <Text style={s.headTitle}>Forgot Password</Text>
        <Text style={s.headSub}>An OTP will be sent to your mobile phone.</Text>

        <View style={s.form}>
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

          {!otpSent ? (
            <TouchableOpacity
              style={s.submitBtn}
              onPress={handleSendOtp}
              disabled={sending}
              activeOpacity={0.85}
            >
              {sending ? <ActivityIndicator color="#fff" /> : <Text style={s.submitBtnText}>Submit</Text>}
            </TouchableOpacity>
          ) : (
            <>
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

              <View style={s.inputWrap}>
                <MaterialIcons name="lock" size={20} color="#9CA3AF" />
                <TextInput
                  style={s.input}
                  placeholder="New Password"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPass}
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
                />
                <TouchableOpacity onPress={() => setShowConfirmPass(!showConfirmPass)}>
                  <MaterialIcons name={showConfirmPass ? 'visibility' : 'visibility-off'} size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={s.submitBtn}
                onPress={handleConfirm}
                disabled={submitting}
                activeOpacity={0.85}
              >
                {submitting ? <ActivityIndicator color="#fff" /> : <Text style={s.submitBtnText}>Confirm</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setOtpSent(false)} style={{ marginTop: 14 }}>
                <Text style={s.editText}>Change phone number</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 32, paddingBottom: 40 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  logoWrap: { alignItems: 'center', marginBottom: 20 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#D1FAE5',
  },
  headTitle: { fontSize: 26, fontWeight: '800', color: '#111827', textAlign: 'center' },
  headSub: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  form: { gap: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 14,
    paddingHorizontal: 16, height: 54, gap: 10,
    backgroundColor: '#F9FAFB',
  },
  input: { flex: 1, fontSize: 15, color: '#111827', padding: 0 },
  submitBtn: {
    height: 54, borderRadius: 14,
    backgroundColor: '#27C34B',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 6, elevation: 2, shadowColor: '#27C34B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  submitBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  editText: { fontSize: 13, color: '#27C34B', textAlign: 'center', fontWeight: '600' },
});
