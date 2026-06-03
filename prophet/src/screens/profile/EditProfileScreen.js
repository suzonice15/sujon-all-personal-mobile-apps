import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { updateUser } from '../../db/auth';

export default function EditProfileScreen({ navigation, route }) {
  const { user } = route.params;
  const [name, setName] = useState(user.name);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const s = styles(colors);

  const handleSave = async () => {
    if (!name.trim()) { ToastAndroid.show('নাম খালি রাখা যাবে না', ToastAndroid.SHORT); return; }
    if (newPassword && newPassword.length < 6) { ToastAndroid.show('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে', ToastAndroid.SHORT); return; }
    if (newPassword && newPassword !== confirmPassword) { ToastAndroid.show('পাসওয়ার্ড মিলছে না', ToastAndroid.SHORT); return; }
    setLoading(true);
    await updateUser(user.id, name.trim(), newPassword || null);
    setLoading(false);
    ToastAndroid.show('প্রোফাইল আপডেট হয়েছে', ToastAndroid.SHORT);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView style={s.container} contentContainerStyle={{ padding: 24 }}>
        <View style={s.avatarBox}>
          <Text style={s.avatarText}>{name?.charAt(0).toUpperCase()}</Text>
        </View>

        <Text style={s.label}>নাম</Text>
        <TextInput style={s.input} value={name} onChangeText={setName} placeholder="আপনার নাম" placeholderTextColor={colors.onSurface + '66'} />

        <Text style={s.label}>ইমেইল</Text>
        <TextInput style={[s.input, s.inputDisabled]} value={user.email} editable={false} />

        <Text style={s.label}>নতুন পাসওয়ার্ড (ঐচ্ছিক)</Text>
        <View style={s.passRow}>
          <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} value={newPassword} onChangeText={setNewPassword}
            placeholder="নতুন পাসওয়ার্ড" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
          <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass(p => !p)}>
            <MaterialIcons name={showPass ? 'visibility-off' : 'visibility'} size={22} color={colors.onSurface} style={{ opacity: 0.4 }} />
          </TouchableOpacity>
        </View>

        {newPassword.length > 0 && (
          <>
            <Text style={s.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
            <TextInput style={s.input} value={confirmPassword} onChangeText={setConfirmPassword}
              placeholder="পাসওয়ার্ড আবার লিখুন" placeholderTextColor={colors.onSurface + '66'} secureTextEntry={!showPass} />
          </>
        )}

        <TouchableOpacity style={s.btn} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>সংরক্ষণ করুন</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  avatarBox: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: colors.primary, alignItems: 'center',
    justifyContent: 'center', alignSelf: 'center', marginBottom: 28,
  },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#fff' },
  label: { fontSize: 13, color: colors.onSurface, opacity: 0.6, marginBottom: 6, marginTop: 14 },
  input: {
    borderWidth: 1, borderColor: colors.surface, borderRadius: 12,
    padding: 14, fontSize: 15, color: colors.onSurface, marginBottom: 4, backgroundColor: colors.surface,
  },
  inputDisabled: { opacity: 0.4 },
  passRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  eyeBtn: { position: 'absolute', right: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 28 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
