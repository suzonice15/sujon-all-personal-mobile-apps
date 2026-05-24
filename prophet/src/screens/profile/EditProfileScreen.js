import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { updateUser } from '../../db/auth';

export default function EditProfileScreen({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      ToastAndroid.show('নাম খালি রাখা যাবে না', ToastAndroid.SHORT);
      return;
    }
    if (newPassword && newPassword.length < 6) {
      ToastAndroid.show('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে', ToastAndroid.SHORT);
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      ToastAndroid.show('পাসওয়ার্ড মিলছে না', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    await updateUser(user.id, name.trim(), newPassword || null);
    setLoading(false);
    ToastAndroid.show('প্রোফাইল আপডেট হয়েছে', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
        <View style={styles.avatarBox}>
          <Text style={styles.avatarText}>{name?.charAt(0).toUpperCase()}</Text>
        </View>

        <Text style={styles.label}>নাম</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="আপনার নাম"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>ইমেইল</Text>
        <TextInput
          style={[styles.input, styles.inputDisabled]}
          value={user.email}
          editable={false}
        />

        <Text style={styles.label}>নতুন পাসওয়ার্ড (ঐচ্ছিক)</Text>
        <View style={styles.passRow}>
          <TextInput
            style={[styles.input, { flex: 1, marginBottom: 0 }]}
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="নতুন পাসওয়ার্ড"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPass}
          />
          <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color="#aaa" />
          </TouchableOpacity>
        </View>

        {newPassword.length > 0 && (
          <>
            <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="পাসওয়ার্ড আবার লিখুন"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPass}
            />
          </>
        )}

        <TouchableOpacity style={styles.btn} onPress={handleSave} disabled={loading}>
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.btnText}>সংরক্ষণ করুন</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  avatarBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#4F46E5', alignItems: 'center',
    justifyContent: 'center', alignSelf: 'center', marginBottom: 28,
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  label: { fontSize: 13, color: '#666', marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 12,
    padding: 14, fontSize: 15, color: '#111', marginBottom: 4, backgroundColor: '#fafafa',
  },
  inputDisabled: { backgroundColor: '#f0f0f0', color: '#aaa' },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: {
    backgroundColor: '#4F46E5', borderRadius: 12,
    padding: 15, alignItems: 'center', marginTop: 28,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
