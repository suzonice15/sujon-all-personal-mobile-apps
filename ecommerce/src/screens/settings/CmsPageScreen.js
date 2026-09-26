import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Dimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { api_image } from '../../config/url';
import { getPageByLink } from '../../api/pageApi';

const { width } = Dimensions.get('window');

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

export default function CmsPageScreen({ route }) {
  const { colors, dark } = useTheme();
  const { link } = route?.params || {};

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [failed, setFailed] = useState(false);

  const fetchPage = useCallback(async () => {
    if (!link) return;
    setLoading(true);
    setFailed(false);
    try {
      const res = await getPageByLink(link);
      setPage(res);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [link]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  if (loading) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (failed || !page?.page_content) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <MaterialIcons name="description" size={48} color={colors.onSurface + '30'} />
        <Text style={[s.emptyText, { color: colors.onSurface + '60' }]}>Content not available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[s.container, { backgroundColor: colors.background }]} contentContainerStyle={s.content}>
      {page.top_banner ? (
        <Image
          source={{ uri: toFullUrl(page.top_banner, 'pages') }}
          style={s.banner}
          resizeMode="cover"
        />
      ) : null}
      <View style={s.body}>
        <RenderHtml
          contentWidth={width - 32}
          source={{ html: page.page_content }}
          baseStyle={{
            fontSize: 15,
            lineHeight: 24,
            color: dark ? '#e2e8f0' : '#1a1a1a',
          }}
          tagsStyles={{
            h1: { fontSize: 20, color: colors.primary, marginBottom: 6 },
            h2: { fontSize: 17, color: colors.primary, marginTop: 20, marginBottom: 6 },
            h3: { fontSize: 16, color: colors.primary, marginTop: 16, marginBottom: 6 },
            p: { marginBottom: 10 },
            ul: { paddingLeft: 20, marginBottom: 10 },
            ol: { paddingLeft: 20, marginBottom: 10 },
            li: { marginBottom: 4 },
            a: { color: colors.primary },
            strong: { fontWeight: '600' },
          }}
        />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 24 },
  emptyText: { fontSize: 14 },
  banner: { width: '100%', height: 160 },
  body: { padding: 16 },
});
