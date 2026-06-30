import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

const bnMonths = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];

const formatFull = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr.replace(' ', 'T') + 'Z');
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${d.getDate()} ${bnMonths[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes}`;
};

export default function NotificationDetailScreen({ route }) {
  const { item } = route.params;
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={s.iconRow}>
          <View style={s.iconCircle}>
            <MaterialIcons name={item.type === 'bonus' ? 'emoji-events' : 'notifications'} size={32} color="#fff" />
          </View>
        </View>

        <Text style={s.badge}>{item.type === 'bonus' ? 'বোনাস' : 'সাধারণ'}</Text>
        <Text style={s.title}>{item.title}</Text>

        {item.body ? (
          <View style={s.bodyBox}>
            <Text style={s.body}>{item.body}</Text>
          </View>
        ) : null}

        <View style={s.dateRow}>
          <MaterialIcons name="schedule" size={14} color={colors.muted} />
          <Text style={s.date}>{formatFull(item.created_at)}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  iconRow: { alignItems: 'center', marginTop: 10, marginBottom: 16 },
  iconCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: colors.primary + '20',
    color: colors.primary,
    fontSize: 11, fontWeight: '700',
    paddingHorizontal: 12, paddingVertical: 3,
    borderRadius: 10, overflow: 'hidden',
    marginBottom: 12,
  },
  title: {
    fontSize: 20, fontWeight: 'bold', color: colors.onSurface,
    textAlign: 'center', marginBottom: 16,
  },
  bodyBox: {
    backgroundColor: colors.surface,
    borderRadius: 14, padding: 16,
    marginBottom: 16,
  },
  body: {
    fontSize: 15, color: colors.text,
    lineHeight: 26,
  },
  dateRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
  },
  date: { fontSize: 12, color: colors.muted },
});
