import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { forgotPassword, verifyOtp } from '../../api/userApi';
import { resetPasswordAndLogin } from '../../db/auth';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';
import useAdInterstitial from '../../components/ads/AdInterstitial';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=password
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);
  const { colors } = useTheme();
  const s = styles(colors);
  const { showAd } = useAdInterstitial();

  useEffect(() => { showAd(); }, []);

  useEffect(() => {
    if (timer > 0) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [timer]);

  const handleSendOtp = async () => {
    if (!email.trim()) {
      ToastAndroid.show('ইমেইল লিখুন', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const res = await forgotPassword(email.trim());
    setLoading(false);
    if (res.success) {
      setStep(2);
      setTimer(300);
      ToastAndroid.show('OTP পাঠানো হয়েছে', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(res.message || 'ব্যর্থ হয়েছে', ToastAndroid.SHORT);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 4) {
      ToastAndroid.show('৪ ডিজিটের OTP লিখুন', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const res = await verifyOtp(email.trim(), otp.trim());
    setLoading(false);
    if (res.success) {
      setStep(3);
      ToastAndroid.show('OTP সঠিক হয়েছে', ToastAndroid.SHORT);
    } else {
      ToastAndroid.show(res.message || 'ভুল OTP', ToastAndroid.SHORT);
    }
  };

  const handleResetPassword = async () => {
    if (!password.trim() || password.length < 4) {
      ToastAndroid.show('নতুন পাসওয়ার্ড কমপক্ষে ৪ ক্যারেক্টার দিন', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const res = await resetPasswordAndLogin(email.trim(), otp.trim(), password.trim());
    setLoading(false);
    if (res.success) {
      ToastAndroid.show('পাসওয়ার্ড রিসেট হয়েছে', ToastAndroid.SHORT);
      navigation.replace('Dashboard');
    } else {
      ToastAndroid.show(res.message || 'ব্যর্থ হয়েছে', ToastAndroid.SHORT);
    }
  };

  const formatTime = sec => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior="padding">
      <View style={s.inner}>
        <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={s.iconBox}>
            <MaterialIcons name="lock-reset" size={60} color={colors.primary} />
          </View>

          {step === 1 && (
            <>
              <Text style={s.title}>পাসওয়ার্ড ভুলে গেছেন?</Text>
              <Text style={s.subtitle}>আপনার নিবন্ধিত ইমেইল লিখুন। আমরা একটি OTP পাঠাবো।</Text>

              <TextInput
                style={s.input}
                placeholder="ইমেইল"
                placeholderTextColor={colors.onSurface + '66'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TouchableOpacity style={s.btn} onPress={handleSendOtp} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>OTP পাঠান</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={s.link}>লগইনে ফিরে যান</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={s.title}>OTP ভেরিফাই করুন</Text>
              <Text style={s.subtitle}>{email}-এ পাঠানো OTP লিখুন</Text>

              <TextInput
                style={s.input}
                placeholder="৪ ডিজিটের OTP"
                placeholderTextColor={colors.onSurface + '66'}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
              />

              {timer > 0 && (
                <Text style={s.timerText}>{formatTime(timer)}</Text>
              )}

              <TouchableOpacity style={s.btn} onPress={handleVerifyOtp} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>OTP ভেরিফাই করুন</Text>}
              </TouchableOpacity>

              <TouchableOpacity onPress={handleSendOtp} disabled={loading || timer > 0}>
                <Text style={[s.link, timer > 0 && { opacity: 0.4 }]}>পুনরায় OTP পাঠান</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 3 && (
            <>
              <Text style={s.title}>নতুন পাসওয়ার্ড</Text>
              <Text style={s.subtitle}>আপনার নতুন পাসওয়ার্ড লিখুন</Text>

              <TextInput
                style={s.input}
                placeholder="নতুন পাসওয়ার্ড"
                placeholderTextColor={colors.onSurface + '66'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity style={s.btn} onPress={handleResetPassword} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>পাসওয়ার্ড রিসেট ও লগইন</Text>}
              </TouchableOpacity>
            </>
          )}

          <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
        </ScrollView>
        <AdBanner />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: { flex: 1 },
  scrollContent: { padding: 20, flexGrow: 1, justifyContent: 'center' },
  iconBox: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface, textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: colors.onSurface, textAlign: 'center', marginBottom: 24, opacity: 0.6, lineHeight: 20 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    padding: 14, fontSize: 15, color: colors.onSurface, marginBottom: 14, backgroundColor: colors.surface,
  },
  btn: { backgroundColor: colors.primary, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6, marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: colors.primary, fontWeight: '600', fontSize: 14, marginTop: 8 },
  timerText: { textAlign: 'center', fontSize: 20, fontWeight: '700', color: '#EF4444', marginBottom: 10 },
});