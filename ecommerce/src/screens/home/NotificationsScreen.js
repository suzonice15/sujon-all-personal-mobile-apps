import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const STATIC_NOTIFICATIONS = [
  {
    id: 1,
    type: 'general',
    title: 'Welcome to JN Computer!',
    body: 'Thank you for joining us. Stay tuned for exclusive offers and updates.',
    created_at: '2026-07-28 10:30:00',
    is_read: 0,
  },
  {
    id: 2,
    type: 'bonus',
    title: 'Summer Sale is Live!',
    body: 'Get up to 50% off on selected items. Hurry, limited time offer!',
    created_at: '2026-07-27 14:15:00',
    is_read: 0,
  },
  {
    id: 3,
    type: 'general',
    title: 'New Arrivals',
    body: 'Check out the latest products added to our store.',
    created_at: '2026-07-26 09:00:00',
    is_read: 1,
  },
  {
    id: 4,
    type: 'bonus',
    title: 'Free Shipping Weekend',
    body: 'Enjoy free shipping on all orders this weekend. No minimum purchase required.',
    created_at: '2026-07-25 18:45:00',
    is_read: 1,
  },
  {
    id: 5,
    type: 'general',
    title: 'Payment Method Updated',
    body: 'We now support additional payment methods for your convenience.',
    created_at: '2026-07-24 11:20:00',
    is_read: 1,
  },
];

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
  const [list, setList] = useState(STATIC_NOTIFICATIONS);

  const handlePress = (item) => {
    if (!item.is_read) {
      setList(prev =>
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
      <View style={[s.iconBox, !item.is_read && s.iconBoxActive]}>
        <MaterialIcons
          name={item.type === 'bonus' ? 'emoji-events' : 'notifications'}
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

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
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
