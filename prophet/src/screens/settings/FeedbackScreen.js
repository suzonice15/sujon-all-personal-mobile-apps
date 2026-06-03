import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function FeedbackScreen() {
  const [message, setMessage] = useState('');
  const { colors } = useTheme();
  const s = styles(colors);

  const handleSend = () => {
    if (!message.trim()) { Alert.alert('', 'অনুগ্রহ করে আপনার মতামত লিখুন।'); return; }
    Linking.openURL(`mailto:support@example.com?subject=মতামত&body=${message}`);
  };

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <View style={s.iconBox}>
          <MaterialIcons name="feedback" size={40} color={colors.primary} />
        </View>
        <Text style={s.heroTitle}>আপনার মতামত দিন</Text>
        <Text style={s.heroSub}>আপনার মতামত আমাদের উন্নতিতে সাহায্য করে</Text>
      </View>

      <View style={s.card}>
        <Text style={s.label}>আপনার বার্তা</Text>
        <TextInput
          style={s.input} placeholder="এখানে লিখুন..."
          placeholderTextColor={colors.onSurface + '66'}
          multiline numberOfLines={6} value={message} onChangeText={setMessage} textAlignVertical="top"
        />
        <TouchableOpacity style={s.sendBtn} onPress={handleSend}>
          <MaterialIcons name="send" size={18} color="#fff" />
          <Text style={s.sendText}>পাঠান</Text>
        </TouchableOpacity>
      </View>

      <View style={s.contactCard}>
        <Text style={s.contactTitle}>সরাসরি যোগাযোগ</Text>
        {[
          { icon: 'email', label: 'support@example.com', link: 'mailto:support@example.com' },
          { icon: 'language', label: 'www.example.com', link: 'https://example.com' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.contactRow} onPress={() => Linking.openURL(item.link)}>
            <MaterialIcons name={item.icon} size={18} color={colors.primary} />
            <Text style={s.contactText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 24 },
  iconBox: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface },
  heroSub: { fontSize: 13, color: colors.onSurface, opacity: 0.5, marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: colors.onSurface, marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: colors.background, borderRadius: 10,
    padding: 12, fontSize: 14, color: colors.onSurface,
    minHeight: 120, marginBottom: 14, backgroundColor: colors.background,
  },
  sendBtn: {
    backgroundColor: colors.primary, borderRadius: 10,
    paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  contactCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16 },
  contactTitle: { fontSize: 14, fontWeight: 'bold', color: colors.onSurface, marginBottom: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  contactText: { fontSize: 14, color: colors.primary },
});
