import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getNotifications, markNotificationRead } from '../../api/notificationApi';
import { useNotifications } from '../../context/NotificationsContext';
import { getDeviceId } from '../../utils/device';

export const NOTIFICATION_ICONS = { offer: 'local-offer', order: 'local-shipping', product: 'shopping-bag', general: 'notifications' };


const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(' ', 'T') + 'Z');
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday';
  if (diff < 172800) return 'Yesterday';
  if (diff < 259200) return '2 days ago';
  return `${d.getDate()} ${enMonths[d.getMonth()]}, ${d.getFullYear()}`;
};

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { deviceId, refresh: refreshUnread } = useNotifications();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const load = useCallback(async (p = 1) => {
    try {
      const id = deviceId || (await getDeviceId());
      const res = await getNotifications(id, p);
      const rows = Array.isArray(res) ? res : res?.data || [];
      setList(prev => (p === 1 ? rows : [...prev, ...rows]));
      setPage(p);
      setLastPage(res?.last_page || 1);
    } catch {
      if (p === 1) setList([]);
    }
  }, [deviceId]);

  // Screen e ashlei notun data
  useFocusEffect(
    useCallback(() => {
      load(1).finally(() => setLoading(false));
      refreshUnread();
    }, [load, refreshUnread]),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load(1);
    refreshUnread();
    setRefreshing(false);
  };

  const onEndReached = async () => {
    if (loadingMore || page >= lastPage) return;
    setLoadingMore(true);
    await load(page + 1);
    setLoadingMore(false);
  };

  const handlePress = (item) => {
    if (!item.is_read) {
      setList(prev =>
        prev.map(n => n.id === item.id ? { ...n, is_read: 1 } : n)
      );
    }
    // Product notification hole shoja product page
    const productName = item.data?.product_name;
    if (productName) {
      if (!item.is_read) {
        (async () => {
          try {
            await markNotificationRead(deviceId || (await getDeviceId()), item.id);
            refreshUnread();
          } catch {}
        })();
      }
      navigation.navigate('ProductDetail', {
        product: { product_id: item.data.product_id, product_name: productName, product_title: item.data.product_title },
      });
      return;
    }
    navigation.navigate('NotificationDetail', { item: { ...item, is_read: 1 } });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[s.card, !item.is_read && s.unread]}
      onPress={() => handlePress(item)}
      activeOpacity={0.7}
    >
      <View style={[s.iconBox, !item.is_read && s.iconBoxActive]}>
        <MaterialIcons
          name={NOTIFICATION_ICONS[item.type] || 'notifications'}
          size={22}
          color={!item.is_read ? '#EB592C' : '#9CA3AF'}
        />
      </View>
      <View style={s.textBox}>
        <Text style={[s.title, !item.is_read && s.unreadTitle]}>{item.title}</Text>
        {item.body ? <Text style={s.body} numberOfLines={1}>{item.body}</Text> : null}
        <Text style={s.date}>{formatTime(item.created_at)}</Text>
      </View>
      {!item.is_read && <View style={s.dot} />}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[s.container, s.center]}>
        <ActivityIndicator color="#EB592C" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#EB592C']} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.3}
        ListFooterComponent={loadingMore ? <ActivityIndicator color="#EB592C" style={{ marginVertical: 12 }} /> : null}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="notifications-off" size={48} color="#9CA3AF" />
            <Text style={s.emptyText}>No notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { justifyContent: 'center', alignItems: 'center' },
  card: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#fff', borderRadius: 12,
    padding: 14, marginBottom: 10, gap: 12,
    opacity: 0.6,
  },
  unread: {
    opacity: 1,
    borderLeftWidth: 3, borderLeftColor: '#EB592C',
    backgroundColor: '#FFF5F0',
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  iconBoxActive: {
    backgroundColor: '#FEF0EB',
  },
  textBox: { flex: 1 },
  title: { fontSize: 14, fontWeight: '600', color: '#111827' },
  unreadTitle: { fontWeight: '800', color: '#111827' },
  body: { fontSize: 12, color: '#6B7280', marginTop: 2, lineHeight: 18 },
  date: {
    fontSize: 11, color: '#9CA3AF', marginTop: 4,
    backgroundColor: '#F3F4F6',
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 8, overflow: 'hidden',
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#EB592C', marginTop: 6,
  },
  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 14, color: '#9CA3AF', marginTop: 12 },
});
