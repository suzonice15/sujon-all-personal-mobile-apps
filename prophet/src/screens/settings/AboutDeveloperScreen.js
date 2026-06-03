import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

export default function AboutDeveloperScreen() {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <View style={s.avatar}>
          <MaterialIcons name="person" size={52} color="#fff" />
        </View>
        <Text style={s.name}>ডেভেলপারের নাম</Text>
        <Text style={s.role}>রিঅ্যাক্ট নেটিভ ডেভেলপার</Text>
      </View>

      <View style={s.card}>
        {[
          { icon: 'email', label: 'ইমেইল', value: 'dev@example.com', link: 'mailto:dev@example.com' },
          { icon: 'language', label: 'ওয়েবসাইট', value: 'www.example.com', link: 'https://example.com' },
          { icon: 'location-on', label: 'অবস্থান', value: 'ঢাকা, বাংলাদেশ' },
        ].map((item, i, arr) => (
          <View key={i}>
            <TouchableOpacity style={s.row} onPress={() => item.link && Linking.openURL(item.link)}>
              <View style={s.rowLeft}>
                <View style={s.iconBox}>
                  <MaterialIcons name={item.icon} size={18} color={colors.primary} />
                </View>
                <View>
                  <Text style={s.rowLabel}>{item.label}</Text>
                  <Text style={s.rowValue}>{item.value}</Text>
                </View>
              </View>
              {item.link && <MaterialIcons name="chevron-right" size={20} color={colors.onSurface} style={{ opacity: 0.3 }} />}
            </TouchableOpacity>
            {i < arr.length - 1 && <View style={s.divider} />}
          </View>
        ))}
      </View>

      <View style={s.descCard}>
        <Text style={s.descTitle}>পরিচিতি</Text>
        <Text style={s.descText}>
          আমি একজন অভিজ্ঞ মোবাইল অ্যাপ ডেভেলপার। ইসলামিক অ্যাপ তৈরিতে বিশেষ আগ্রহী।
          এই অ্যাপটি মুসলিম উম্মাহর জন্য তৈরি করা হয়েছে।
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  hero: { backgroundColor: colors.primary, alignItems: 'center', paddingTop: 50, paddingBottom: 40 },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 14, margin: 16, overflow: 'hidden' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { fontSize: 12, color: colors.onSurface, opacity: 0.5 },
  rowValue: { fontSize: 14, color: colors.onSurface, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.background, marginLeft: 62 },
  descCard: { backgroundColor: colors.surface, borderRadius: 14, marginHorizontal: 16, padding: 16 },
  descTitle: { fontSize: 15, fontWeight: 'bold', color: colors.onSurface, marginBottom: 8 },
  descText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, lineHeight: 22 },
});
