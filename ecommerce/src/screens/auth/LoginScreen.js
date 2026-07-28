import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter phone number and password');
      return;
    }
    setLoading(true);
    try {
      await login(phone.trim(), password);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Login Failed', e?.response?.data?.message || e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[s.container, { backgroundColor: '#fff' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={[s.backBtn, { marginTop: insets.top + 12 }]} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <View style={s.logoWrap}>
          <View style={s.logoCircle}>
            <MaterialIcons name="person" size={40} color="#27C34B" />
          </View>
        </View>

        <Text style={s.headTitle}>Login</Text>
        <Text style={s.headSub}>Welcome back! Sign in to your account.</Text>

        <View style={s.form}>
          <View style={[s.inputWrap, { borderColor: '#E5E7EB' }]}>
            <MaterialIcons name="phone" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Phone Number"
              placeholderTextColor="#9CA3AF"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={[s.inputWrap, { borderColor: '#E5E7EB' }]}>
            <MaterialIcons name="lock" size={20} color="#9CA3AF" />
            <TextInput
              style={s.input}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <MaterialIcons name={showPass ? 'visibility' : 'visibility-off'} size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Forgot password feature coming soon.')}>
            <Text style={s.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={s.loginBtn}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.loginBtnText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={s.signupRow}>
            <Text style={s.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Registration will be available soon.')}>
              <Text style={s.signupLink}>Sign up</Text>
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
  logoWrap: { alignItems: 'center', marginBottom: 20 },
  logoCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#D1FAE5',
  },
  headTitle: { fontSize: 28, fontWeight: '800', color: '#111827', textAlign: 'center' },
  headSub: { fontSize: 14, color: '#6B7280', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  form: { gap: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 14,
    paddingHorizontal: 16, height: 54, gap: 10,
    backgroundColor: '#F9FAFB',
  },
  input: { flex: 1, fontSize: 15, color: '#111827', padding: 0 },
  forgotText: { fontSize: 14, color: '#27C34B', textAlign: 'right', fontWeight: '600' },
  loginBtn: {
    height: 54, borderRadius: 14,
    backgroundColor: '#27C34B',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 6, elevation: 2, shadowColor: '#27C34B',
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
  },
  loginBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  signupRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  signupText: { fontSize: 14, color: '#6B7280' },
  signupLink: { fontSize: 14, color: '#27C34B', fontWeight: '700' },
});
