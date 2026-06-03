import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function AboutAppsScreen() {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <View style={s.iconBox}>
          <MaterialIcons name="menu-book" size={52} color="#fff" />
        </View>
        <Text style={s.appName}>নবীদের গল্প</Text>
        <Text style={s.version}>ভার্সন 1.0.0</Text>
      </View>

      <View style={s.card}>
        {[
          { icon: 'info', label: 'অ্যাপের নাম', value: 'নবীদের গল্প' },
          { icon: 'code', label: 'ভার্সন', value: '1.0.0' },
          { icon: 'phone-android', label: 'প্ল্যাটফর্ম', value: 'অ্যান্ড্রয়েড' },
          { icon: 'language', label: 'ভাষা', value: 'বাংলা' },
          { icon: 'update', label: 'সর্বশেষ আপডেট', value: 'জানুয়ারি ২০২৫' },
        ].map((item, i, arr) => (
          <View key={i}>
            <View style={s.row}>
              <View style={s.rowLeft}>
                <MaterialIcons name={item.icon} size={20} color={colors.primary} />
                <Text style={s.rowLabel}>{item.label}</Text>
              </View>
              <Text style={s.rowValue}>{item.value}</Text>
            </View>
            {i < arr.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>

      <View style={s.descCard}>
        <Text style={s.descTitle}>অ্যাপ সম্পর্কে</Text>
        <Text style={s.descText}>
          এই অ্যাপটি ইসলামের নবী-রাসূলদের জীবনী ও গল্প সহজ বাংলায় উপস্থাপন করে।
          সম্পূর্ণ অফলাইনে ব্যবহারযোগ্য এবং সকল বয়সের পাঠকদের জন্য উপযুক্ত।
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  hero: { backgroundColor: colors.primary, alignItems: 'center', paddingTop: 50, paddingBottom: 40 },
  iconBox: {
    width: 90, height: 90, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  version: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 14, margin: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowLabel: { fontSize: 14, color: colors.onSurface },
  rowValue: { fontSize: 14, color: colors.onSurface, opacity: 0.5 },
  divider: { height: 1, backgroundColor: colors.background, marginLeft: 44 },
  descCard: { backgroundColor: colors.surface, borderRadius: 14, marginHorizontal: 16, padding: 16 },
  descTitle: { fontSize: 15, fontWeight: 'bold', color: colors.onSurface, marginBottom: 8 },
  descText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, lineHeight: 22 },
});
