import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking, Alert, KeyboardAvoidingView, Platform, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { api } from '../../api/client';
import { apps_slug, ADMOB_ENABLED } from '../../config/url';
import { getDeviceId } from '../../db/earnings';
import useAdInterstitial from '../../components/ads/AdInterstitial';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

export default function FeedbackScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [myFeedbacks, setMyFeedbacks] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { colors } = useTheme();
  const s = styles(colors);
  const entryShown = useRef(false);
  const { showAd: showInterstitial, isLoaded } = useAdInterstitial();

  useEffect(() => {
    if (ADMOB_ENABLED && isLoaded && !entryShown.current) {
      entryShown.current = true;
      showInterstitial();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (email.trim()) fetchMyFeedback();
  }, [email]);

  const fetchMyFeedback = async () => {
    if (!email.trim()) return;
    setFetching(true);
    try {
      const res = await api.post('/my-feedback', { email, slug: apps_slug });
      setMyFeedbacks(res.data || []);
    } catch (_) {}
    finally { setFetching(false); }
  };

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSend = async () => {
    if (!name.trim()) { Alert.alert('', 'Please enter your name.'); return; }
    if (!email.trim()) { Alert.alert('', 'Please enter your email.'); return; }
    if (!validateEmail(email.trim())) { Alert.alert('', 'Please enter a valid email address.'); return; }
    if (!message.trim()) { Alert.alert('', 'Please enter your message.'); return; }

    setLoading(true);
    try {
      const deviceId = await getDeviceId();
      const res = await api.post('/feedback', { name, email, message, slug: apps_slug, device_id: deviceId });
      if (res.pending_feedback) {
        Alert.alert('Pending', 'Your previous feedback is still pending. Please wait for a reply.');
      } else {
        Alert.alert('Successful', 'Your feedback has been sent. Thank you!');
        setName('');
        setEmail('');
        setMessage('');
        fetchMyFeedback();
      }
    } catch (e) {
      Alert.alert('Failed', 'Could not send the message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.container}>
        <ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
          <View style={s.hero}>
            
            <Text style={s.heroTitle}>Share your feedback</Text>
            <Text style={s.heroSub}>Your feedback helps us improve</Text>
          </View>

          <View style={s.card}>
            <View style={s.field}>
              <MaterialIcons name="person" size={18} color={colors.primary} style={s.fieldIcon} />
              <TextInput
                style={s.input} placeholder="Your name" placeholderTextColor={colors.onSurface + '66'}
                value={name} onChangeText={setName}
              />
            </View>

            <View style={s.field}>
              <MaterialIcons name="email" size={18} color={colors.primary} style={s.fieldIcon} />
              <TextInput
                style={s.input} placeholder="Your email" placeholderTextColor={colors.onSurface + '66'}
                value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"
              />
            </View>

            <View style={[s.field, s.fieldMessage]}>
              <MaterialIcons name="message" size={18} color={colors.primary} style={s.fieldIcon} />
              <TextInput
                style={[s.input, s.messageInput]} placeholder="Your message" placeholderTextColor={colors.onSurface + '66'}
                multiline numberOfLines={5} value={message} onChangeText={setMessage} textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={s.sendBtn} onPress={handleSend} disabled={loading} activeOpacity={0.8}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="send" size={18} color="#fff" />
                  <Text style={s.sendText}>Send</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {myFeedbacks.length > 0 && (
            <TouchableOpacity style={s.toggleBtn} onPress={() => setShowHistory(!showHistory)}>
              <MaterialIcons name={showHistory ? 'expand-less' : 'expand-more'} size={20} color={colors.primary} />
              <Text style={s.toggleText}>{showHistory ? 'Close' : 'View my feedback'} ({myFeedbacks.length})</Text>
            </TouchableOpacity>
          )}

          {showHistory && (
            <View style={s.historyCard}>
              <Text style={s.contactTitle}>My Feedback</Text>
              {fetching ? (
                <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 12 }} />
              ) : (
                myFeedbacks.map((item, i) => (
                  <View key={i} style={s.historyItem}>
                    <View style={s.historyHeader}>
                      <Text style={s.historyMessage} numberOfLines={showHistory ? undefined : 2}>{item.message}</Text>
                      {item.status === 'resolved' ? (
                        <View style={s.resolvedBadge}><Text style={s.resolvedText}>Replied</Text></View>
                      ) : (
                        <View style={s.pendingBadge}><Text style={s.pendingText}>Pending</Text></View>
                      )}
                    </View>
                    {item.reply && (
                      <View style={s.replyBox}>
                        <MaterialIcons name="reply" size={14} color={colors.primary} />
                        <Text style={s.replyText}>{item.reply}</Text>
                      </View>
                    )}
                    <Text style={s.historyDate}>{item.created_at}</Text>
                  </View>
                ))
              )}
            </View>
          )}

          
        </ScrollView>
                          <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
        
        <AdBanner />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, flexGrow: 1 },
  hero: { alignItems: 'center', paddingVertical: 24 },
  iconBox: {
    width: 80, height: 80, borderRadius: 24,
    backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface },
  heroSub: { fontSize: 13, color: colors.onSurface, opacity: 0.5, marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16 },
  field: {
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1, borderColor: colors.background, borderRadius: 10,
    paddingHorizontal: 12, marginBottom: 12, backgroundColor: colors.background,
  },
  fieldMessage: { alignItems: 'flex-start' },
  fieldIcon: { marginRight: 8, marginTop: 12, alignSelf: 'flex-start' },
  input: {
    flex: 1, paddingVertical: 12, fontSize: 14, color: colors.onSurface,
  },
  messageInput: { minHeight: 100 },
  sendBtn: {
    backgroundColor: colors.primary, borderRadius: 10,
    paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  sendText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  contactCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16 },
  contactTitle: { fontSize: 14, fontWeight: 'bold', color: colors.onSurface, marginBottom: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  contactText: { fontSize: 14, color: colors.primary },
  toggleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, marginBottom: 12,
  },
  toggleText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  historyCard: { backgroundColor: colors.surface, borderRadius: 14, padding: 16, marginBottom: 16 },
  historyItem: {
    borderWidth: 1, borderColor: colors.background, borderRadius: 10,
    padding: 12, marginBottom: 10,
  },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  historyMessage: { flex: 1, fontSize: 13, color: colors.onSurface, marginRight: 8 },
  pendingBadge: { backgroundColor: '#fef3c7', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  pendingText: { fontSize: 11, color: '#92400e', fontWeight: '600' },
  resolvedBadge: { backgroundColor: '#d1fae5', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  resolvedText: { fontSize: 11, color: '#065f46', fontWeight: '600' },
  replyBox: {
    flexDirection: 'row', backgroundColor: colors.background,
    borderRadius: 8, padding: 10, marginTop: 8, gap: 6,
  },
  replyText: { flex: 1, fontSize: 13, color: colors.onSurface, fontStyle: 'italic' },
  historyDate: { fontSize: 11, color: colors.onSurface, opacity: 0.4, marginTop: 6 },
});
