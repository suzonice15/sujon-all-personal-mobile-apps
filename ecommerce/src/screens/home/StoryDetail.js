import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getContentFolderIds } from '../../db/bookmarks';
import BookmarkModal from '../../components/BookmarkModal';
import { addPendingClaim } from '../../db/claims';
import { addLocalNotification } from '../../db/notifications';
import { addEarning } from '../../db/earnings';
import { useNotifications } from '../../context/NotificationsContext';
import { useCoins } from '../../context/CoinsContext';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { story_detail_per_box, story_detail_points } from '../../config/url';

const htmlTemplate = (content, fontSize, background, text) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Georgia', serif;
        font-size: ${fontSize}px;
        line-height: 1.9;
        color: ${text};
        background: ${background};
        padding: 16px;
        text-align: justify;
      }
      p { margin-bottom: 14px; }
      img { max-width: 100%; border-radius: 8px; margin: 10px 0; }
    </style>
  </head>
  <body>${content || '<p>কোনো বিষয়বস্তু নেই।</p>'}</body>
  </html>
`;

const isOnline = async () => {
  try {
    const res = await fetch('https://www.google.com', { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
};

export default function StoryDetail({ navigation, route }) {
  const { item, title,headerTitle } = route.params;
  const [fontSize, setFontSize] = useState(17);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [claimProcessed, setClaimProcessed] = useState(false);
  const { refresh: refreshNotifs } = useNotifications();
  const { refreshCoins } = useCoins();
  const { colors, dark } = usePaperTheme();

  useEffect(() => { checkBookmark(); }, []);

  const checkBookmark = async () => {
    const ids = await getContentFolderIds(item.id);
    setIsBookmarked(ids.length > 0);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: headerTitle });
  }, [navigation, headerTitle]);

  const handleReadComplete = async () => {
    if (claimProcessed) return;
    setClaimProcessed(true);

    const online = await isOnline();
    if (!online) return;

    const added = await addPendingClaim(item.id, item.title, story_detail_per_box);
    if (added) {
      await addLocalNotification('কয়েন দাবি করুন', `📖 "${item.title}" পড়ার ${story_detail_per_box} কয়েন দাবি করুন`, 'claim', item.id);
      await refreshNotifs();
      ToastAndroid.show(`📖 গল্প পড়ার ${story_detail_per_box} কয়েন দাবি করুন!`, ToastAndroid.SHORT);
    }
    await addEarning(item.id, item.title, story_detail_points);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.titleBox, { backgroundColor: colors.background, borderBottomColor: colors.surface }]}>
        <Text style={[styles.storyTitle, { color: colors.onSurface }]}>{item.title}</Text>
      </View>

      <WebView
        originWhitelist={['*']}
        source={{ html: htmlTemplate(item.content, fontSize, colors.background, colors.text) }}
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
        renderLoading={() => <ActivityIndicator size="large" color={colors.primary} />}
        startInLoadingState
        onLoadEnd={handleReadComplete}
      />

      <View style={styles.fab}>
        <TouchableOpacity style={[styles.fabBtn, { backgroundColor: colors.primary }]} onPress={() => setFontSize(s => Math.max(13, s - 1))}>
          <MaterialIcons name="text-decrease" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fabBtn, { backgroundColor: colors.primary }]} onPress={() => setFontSize(s => Math.min(24, s + 1))}>
          <MaterialIcons name="text-increase" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.fabBtn, isBookmarked ? styles.fabBookmarked : { backgroundColor: colors.primary + '99' }]}
          onPress={() => setModalVisible(true)}>
          <MaterialIcons name={isBookmarked ? 'bookmark' : 'bookmark-border'} size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <BookmarkModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          checkBookmark();
        }}
        item={item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titleBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  storyTitle: { fontSize: 17, fontWeight: 'bold', lineHeight: 26 },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    alignItems: 'center',
    gap: 10,
  },
  fabBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
  },
  fabBookmark: { backgroundColor: 'rgba(0,0,0,0.25)' },
  fabBookmarked: { backgroundColor: 'rgba(229,62,62,0.7)' },
});
