import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderHtml from 'react-native-render-html';
import { useTheme } from 'react-native-paper';
import { getAllAppSettings } from '../../db/appSettings';

const { width } = Dimensions.get('window');

export default function PrivacyScreen() {
  const { colors, dark } = useTheme();
  const [settings, setSettings] = useState(null);
  const isDark = dark;
  const s = styles(colors);

  useEffect(() => {
    getAllAppSettings().then(setSettings);
  }, []);

  if (!settings) {
    return <ActivityIndicator style={{ marginTop: 60 }} color={colors.primary} />;
  }

  const htmlContent = settings.privacy_policy || '';

  if (!htmlContent) {
    return (
      <View style={s.emptyWrap}>
        <MaterialIcons name="privacy-tip" size={64} color={colors.primary} />
        <Text style={s.emptyText}>প্রাইভেসি পলিসি শীঘ্রই যোগ করা হবে</Text>
      </View>
    );
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content} maximumZoomScale={1} minimumZoomScale={1}>
      <RenderHtml
        contentWidth={width - 32}
        source={{ html: htmlContent }}
        baseStyle={{
          fontSize: 15,
          lineHeight: 24,
          color: isDark ? '#e2e8f0' : '#1a1a1a',
        }}
        tagsStyles={{
          h1: { fontSize: 20, color: colors.primary, marginBottom: 6 },
          h2: { fontSize: 17, color: colors.primary, marginTop: 20, marginBottom: 6 },
          h3: { fontSize: 15, color: isDark ? '#94a3b8' : '#333', marginTop: 16, marginBottom: 4 },
          p: { marginBottom: 10 },
          ul: { paddingLeft: 20, marginBottom: 10 },
          ol: { paddingLeft: 20, marginBottom: 10 },
          li: { marginBottom: 4 },
          a: { color: colors.primary },
          strong: { fontWeight: '600' },
        }}
      />
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  emptyText: { fontSize: 15, color: colors.onSurface, opacity: 0.5, marginTop: 12, textAlign: 'center' },
});
