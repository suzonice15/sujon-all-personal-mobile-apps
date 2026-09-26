import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function PaymentWebViewScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { url } = route?.params || {};
  const [loading, setLoading] = useState(true);

  if (!url) return null;

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.banner, { backgroundColor: colors.primary + '15' }]}>
        <MaterialIcons name="info-outline" size={16} color={colors.primary} />
        <Text style={[s.bannerText, { color: colors.text }]}>
          Complete your payment below, then check My Orders for status.
        </Text>
      </View>
      <WebView source={{ uri: url }} onLoadEnd={() => setLoading(false)} />
      {loading && (
        <View style={[s.loadingOverlay, { backgroundColor: colors.background }]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
      <TouchableOpacity
        style={[s.doneBtn, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('Account', { screen: 'Dashboard', params: { tab: 'orders' } })}
      >
        <Text style={s.doneBtnText}>I've completed payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  banner: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10 },
  bannerText: { fontSize: 12, flex: 1 },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  doneBtn: { margin: 12, height: 46, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  doneBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
});
