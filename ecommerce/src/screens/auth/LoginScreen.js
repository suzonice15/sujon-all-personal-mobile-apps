import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, loginWithGoogle } = useAuth();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      Alert.alert('Login Failed', e?.response?.data?.message || e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (e) {
      Alert.alert('Google Login Failed', e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[s.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={[s.backBtn, { marginTop: insets.top + 8 }]} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={s.heading}>
          <MaterialIcons name="account-circle" size={72} color={colors.primary} />
          <Text style={[s.title, { color: colors.text }]}>Welcome Back</Text>
          <Text style={[s.subtitle, { color: colors.onSurface + '80' }]}>Sign in to your account</Text>
        </View>

        <View style={s.form}>
          <View style={[s.inputWrap, { backgroundColor: colors.surface, borderColor: colors.onSurface + '20' }]}>
            <MaterialIcons name="email" size={20} color={colors.onSurface + '60'} />
            <TextInput
              style={[s.input, { color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.onSurface + '50'}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={[s.inputWrap, { backgroundColor: colors.surface, borderColor: colors.onSurface + '20' }]}>
            <MaterialIcons name="lock" size={20} color={colors.onSurface + '60'} />
            <TextInput
              style={[s.input, { color: colors.text }]}
              placeholder="Password"
              placeholderTextColor={colors.onSurface + '50'}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
              <MaterialIcons name={showPass ? 'visibility' : 'visibility-off'} size={20} color={colors.onSurface + '60'} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[s.loginBtn, { backgroundColor: colors.primary }]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={s.loginBtnText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <View style={s.divider}>
            <View style={[s.dividerLine, { backgroundColor: colors.onSurface + '20' }]} />
            <Text style={[s.dividerText, { color: colors.onSurface + '60' }]}>OR</Text>
            <View style={[s.dividerLine, { backgroundColor: colors.onSurface + '20' }]} />
          </View>

          <TouchableOpacity style={s.googleBtn} onPress={handleGoogleLogin} disabled={loading} activeOpacity={0.8}>
            <MaterialIcons name="login" size={22} color="#555" />
            <Text style={s.googleBtnText}>Login with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.registerLink} onPress={() => Alert.alert('Coming Soon', 'Registration will be available soon.')}>
            <Text style={[s.registerText, { color: colors.onSurface + '70' }]}>
              Don't have an account? <Text style={{ color: colors.primary, fontWeight: '700' }}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingBottom: 40 },
  backBtn: { width: 40, marginBottom: 20 },
  heading: { alignItems: 'center', marginBottom: 32 },
  title: { fontSize: 26, fontWeight: '800', marginTop: 12 },
  subtitle: { fontSize: 14, marginTop: 6 },
  form: { gap: 14 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderRadius: 12,
    paddingHorizontal: 14, height: 52, gap: 10,
  },
  input: { flex: 1, fontSize: 15, padding: 0 },
  loginBtn: {
    height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    marginTop: 4,
  },
  loginBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: {
    flexDirection: 'row', alignItems: 'center',
    marginVertical: 6, gap: 12,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 13, fontWeight: '600' },
  googleBtn: {
    flexDirection: 'row', height: 52, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center', gap: 10,
    borderWidth: 1, borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  googleBtnText: { fontSize: 15, fontWeight: '600', color: '#555' },
  registerLink: { alignItems: 'center', marginTop: 8 },
  registerText: { fontSize: 13 },
});
