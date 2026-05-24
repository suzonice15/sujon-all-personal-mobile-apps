import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TextInput, TouchableOpacity, Linking, Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function FeedbackScreen() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('', 'অনুগ্রহ করে আপনার মতামত লিখুন।');
      return;
    }
    Linking.openURL(`mailto:support@example.com?subject=মতামত&body=${message}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.iconBox}>
          <MaterialIcons name="feedback" size={40} color="#4F46E5" />
        </View>
        <Text style={styles.heroTitle}>আপনার মতামত দিন</Text>
        <Text style={styles.heroSub}>আপনার মতামত আমাদের উন্নতিতে সাহায্য করে</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>আপনার বার্তা</Text>
        <TextInput
          style={styles.input}
          placeholder="এখানে লিখুন..."
          placeholderTextColor="#aaa"
          multiline
          numberOfLines={6}
          value={message}
          onChangeText={setMessage}
          textAlignVertical="top"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <MaterialIcons name="send" size={18} color="#fff" />
          <Text style={styles.sendText}>পাঠান</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactCard}>
        <Text style={styles.contactTitle}>সরাসরি যোগাযোগ</Text>
        {[
          { icon: 'email', label: 'support@example.com', link: 'mailto:support@example.com' },
          { icon: 'language', label: 'www.example.com', link: 'https://example.com' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={styles.contactRow} onPress={() => Linking.openURL(item.link)}>
            <MaterialIcons name={item.icon} size={18} color="#4F46E5" />
            <Text style={styles.contactText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { padding: 16, paddingBottom: 40 },
  hero: { alignItems: 'center', paddingVertical: 24 },
  iconBox: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: '#EEF2FF', alignItems: 'center',
    justifyContent: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a' },
  heroSub: { fontSize: 13, color: '#888', marginTop: 4, textAlign: 'center' },
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    padding: 16, elevation: 2, marginBottom: 16,
  },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#eee', borderRadius: 10,
    padding: 12, fontSize: 14, color: '#1a1a1a',
    minHeight: 120, marginBottom: 14,
  },
  sendBtn: {
    backgroundColor: '#4F46E5', borderRadius: 10,
    paddingVertical: 12, flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  contactCard: {
    backgroundColor: '#fff', borderRadius: 14,
    padding: 16, elevation: 2,
  },
  contactTitle: { fontSize: 14, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  contactText: { fontSize: 14, color: '#4F46E5' },
});
