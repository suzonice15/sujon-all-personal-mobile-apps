import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { loginUser } from '../../db/auth';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';
import useAdInterstitial from '../../components/ads/AdInterstitial';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const { colors } = useTheme();
  const s = styles(colors);
  const { showAd } = useAdInterstitial();

  useEffect(() => { showAd(); }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) { ToastAndroid.show('সব তথ্য পূরণ করুন', ToastAndroid.SHORT); return; }
    setLoading(true);
    try {
      const res = await loginUser(email.trim(), password);
      if (res.success) { navigation.replace('Dashboard'); }
      else { ToastAndroid.show(res.message, ToastAndroid.SHORT); }
    } catch (e) {
      ToastAndroid.show('সংযোগে সমস্যা হয়েছে', ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior="padding">
      <View style={s.inner}>
      <ScrollView contentContainerStyle={s.scrollContent} keyboardShouldPersistTaps="handled">
      <View style={s.iconBox}>
        <MaterialIcons name="person" size={60} color={colors.primary} />
      </View>
      <Text style={s.title}>লগইন করুন</Text>

      <TextInput style={s.input} placeholder="ইমেইল" placeholderTextColor={colors.onSurface + '66'}
        value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

      <View style={s.passRow}>
        <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="পাসওয়ার্ড"
          placeholderTextColor={colors.onSurface + '66'} value={password} onChangeText={setPassword} secureTextEntry={!showPass} />
        <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
          <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={colors.onSurface} style={{ opacity: 0.4 }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={s.forgotLink}>পাসওয়ার্ড ভুলে গেছেন?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={s.btn} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>লগইন</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={s.link}>অ্যাকাউন্ট নেই? <Text style={s.linkBold}>নিবন্ধন করুন</Text></Text>
      </TouchableOpacity>
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
  iconBox: { alignItems: 'center', marginBottom: 5 },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.onSurface, textAlign: 'center', marginBottom: 28 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    padding: 14, fontSize: 15, color: colors.onSurface, marginBottom: 14, backgroundColor: colors.surface,
  },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 6, marginBottom: 18 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: colors.onSurface, opacity: 0.6, fontSize: 14 },
  linkBold: { color: colors.primary, fontWeight: 'bold', opacity: 1 },
  forgotLink: { textAlign: 'right', color: colors.primary, fontSize: 13, fontWeight: '600', marginBottom: 6, marginTop: -8 },
});
