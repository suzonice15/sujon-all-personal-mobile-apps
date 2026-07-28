import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatFull = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(' ', 'T') + 'Z');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${d.getDate()} ${enMonths[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes}`;
};

export default function NotificationDetailScreen({ route }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={s.iconRow}>
          <View style={s.iconCircle}>
            <MaterialIcons
              name={item.type === 'bonus' ? 'emoji-events' : 'notifications'}
              size={32}
              color="#fff"
            />
          </View>
        </View>

        <Text style={s.badge}>{item.type === 'bonus' ? 'Bonus' : 'General'}</Text>
        <Text style={s.title}>{item.title}</Text>

        {item.body ? (
          <View style={s.bodyBox}>
            <Text style={s.body}>{item.body}</Text>
          </View>
        ) : null}

        <View style={s.dateRow}>
          <MaterialIcons name="schedule" size={14} color="#9CA3AF" />
          <Text style={s.date}>{formatFull(item.created_at)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  iconRow: { alignItems: 'center', marginTop: 10, marginBottom: 16 },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: '#EB592C',
    justifyContent: 'center', alignItems: 'center',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#FEF0EB',
    color: '#EB592C',
    fontSize: 11, fontWeight: '700',
    paddingHorizontal: 12, paddingVertical: 3,
    borderRadius: 10, overflow: 'hidden',
    marginBottom: 12,
  },
  title: {
    fontSize: 20, fontWeight: 'bold', color: '#111827',
    textAlign: 'center', marginBottom: 16,
  },
  bodyBox: {
    backgroundColor: '#fff',
    borderRadius: 14, padding: 16,
    marginBottom: 16,
  },
  body: {
    fontSize: 15, color: '#374151',
    lineHeight: 26,
  },
  dateRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
  },
  date: { fontSize: 12, color: '#9CA3AF' },
});
