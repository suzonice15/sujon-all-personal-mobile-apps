import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AboutAppsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.iconBox}>
          <MaterialIcons name="menu-book" size={52} color="#fff" />
        </View>
        <Text style={styles.appName}>নবীদের গল্প</Text>
        <Text style={styles.version}>ভার্সন 1.0.0</Text>
      </View>

      <View style={styles.card}>
        {[
          { icon: 'info', label: 'অ্যাপের নাম', value: 'নবীদের গল্প' },
          { icon: 'code', label: 'ভার্সন', value: '1.0.0' },
          { icon: 'phone-android', label: 'প্ল্যাটফর্ম', value: 'অ্যান্ড্রয়েড' },
          { icon: 'language', label: 'ভাষা', value: 'বাংলা' },
          { icon: 'update', label: 'সর্বশেষ আপডেট', value: 'জানুয়ারি ২০২৫' },
        ].map((item, i, arr) => (
          <View key={i}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <MaterialIcons name={item.icon} size={20} color="#4F46E5" />
                <Text style={styles.rowLabel}>{item.label}</Text>
              </View>
              <Text style={styles.rowValue}>{item.value}</Text>
            </View>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.descCard}>
        <Text style={styles.descTitle}>অ্যাপ সম্পর্কে</Text>
        <Text style={styles.descText}>
          এই অ্যাপটি ইসলামের নবী-রাসূলদের জীবনী ও গল্প সহজ বাংলায় উপস্থাপন করে।
          সম্পূর্ণ অফলাইনে ব্যবহারযোগ্য এবং সকল বয়সের পাঠকদের জন্য উপযুক্ত।
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 40 },
  hero: {
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 40,
  },
  iconBox: {
    width: 90, height: 90, borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  appName: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  version: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    margin: 16, elevation: 2, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 14,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rowLabel: { fontSize: 14, color: '#333' },
  rowValue: { fontSize: 14, color: '#888' },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 44 },
  descCard: {
    backgroundColor: '#fff', borderRadius: 14,
    marginHorizontal: 16, padding: 16, elevation: 2,
  },
  descTitle: { fontSize: 15, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  descText: { fontSize: 14, color: '#555', lineHeight: 22 },
});
