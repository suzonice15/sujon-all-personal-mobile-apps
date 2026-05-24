import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { loginUser } from '../../db/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      ToastAndroid.show('সব তথ্য পূরণ করুন', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    const res = await loginUser(email.trim(), password);
    setLoading(false);
    if (res.success) {
      navigation.replace('ProfileView', { user: res.user });
    } else {
      ToastAndroid.show(res.message, ToastAndroid.SHORT);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.iconBox}>
        <MaterialIcons name="person" size={60} color="#4F46E5" />
      </View>
      <Text style={styles.title}>লগইন করুন</Text>

      <TextInput
        style={styles.input}
        placeholder="ইমেইল"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passRow}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          placeholder="পাসওয়ার্ড"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPass}
        />
        <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(p => !p)}>
          <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color="#aaa" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>লগইন</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>অ্যাকাউন্ট নেই? <Text style={styles.linkBold}>নিবন্ধন করুন</Text></Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' },
  iconBox: { alignItems: 'center', marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111', textAlign: 'center', marginBottom: 28 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#111', marginBottom: 14, backgroundColor: '#fafafa',
  },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: {
    backgroundColor: '#4F46E5', borderRadius: 12,
    padding: 15, alignItems: 'center', marginTop: 6, marginBottom: 18,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { textAlign: 'center', color: '#666', fontSize: 14 },
  linkBold: { color: '#4F46E5', fontWeight: 'bold' },
});
