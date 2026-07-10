import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getDB } from '../../db/db';
import { markAsRead } from '../../db/notifications';
import { useNotifications } from '../../context/NotificationsContext';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

const bnMonths = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(' ', 'T') + 'Z');
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'এখনই';
  if (diff < 3600) return `${Math.floor(diff / 60)} মি. আগে`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘ. আগে`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'গতকাল';
  if (diff < 172800) return 'গতকাল';
  if (diff < 259200) return '২ দিন আগে';
  return `${d.getDate()} ${bnMonths[d.getMonth()]}, ${d.getFullYear()}`;
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const s = styles(colors);
  const [notifications, setNotifications] = useState([]);
  const { refresh } = useNotifications();

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const load = async () => {
    const db = await getDB();
    await refresh();
    const [res] = await db.executeSql(
      'SELECT * FROM notifications ORDER BY created_at DESC'
    );
    const rows = [];
    for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
    setNotifications(rows);
  };

  const handlePress = async (item) => {
    if (!item.is_read) {
      await markAsRead(item.id);
      await refresh();
      setNotifications(prev =>
        prev.map(n => n.id === item.id ? { ...n, is_read: 1 } : n)
      );
    }
    navigation.navigate('NotificationDetail', { item: { ...item, is_read: 1 } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[s.card, !item.is_read && s.unread]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={[s.iconBox, !item.is_read && { backgroundColor: colors.primary + '20' }]}>
        <MaterialIcons name={item.type === 'bonus' ? 'emoji-events' : 'notifications'} size={22} color={!item.is_read ? colors.primary : colors.muted} />
      </View>
      <View style={s.textBox}>
        <Text style={[s.title, !item.is_read && s.unreadTitle]}>{item.title}</Text>
        {item.body ? <Text style={s.body} numberOfLines={1}>{item.body}</Text> : null}
        <Text style={s.date}>{formatTime(item.created_at)}</Text>
      </View>
      {!item.is_read && <View style={s.dot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={notifications}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ marginBottom: 12 }}><AdNative /></View>}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="notifications-off" size={48} color={colors.muted} />
            <Text style={s.emptyText}>কোনো নোটিফিকেশন নেই</Text>
          </View>
        }
      />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: colors.surface, borderRadius: 12,
    padding: 14, marginBottom: 10, gap: 12,
    opacity: 0.6,
  },
  unread: {
    opacity: 1,
    borderLeftWidth: 3, borderLeftColor: colors.primary,
    backgroundColor: colors.primary + '08',
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: colors.muted + '20',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  textBox: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: colors.onSurface },
  unreadTitle: { fontWeight: '800', color: colors.onSurface },
  body: { fontSize: 12, color: colors.text, marginTop: 2, lineHeight: 18 },
  date: {
    fontSize: 11, color: colors.muted, marginTop: 4,
    backgroundColor: colors.muted + '12',
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 8, overflow: 'hidden',
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.primary, marginTop: 6,
  },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 14, color: colors.muted, marginTop: 12 },
});
