import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AboutDeveloperScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={52} color="#fff" />
        </View>
        <Text style={styles.name}>ডেভেলপারের নাম</Text>
        <Text style={styles.role}>রিঅ্যাক্ট নেটিভ ডেভেলপার</Text>
      </View>

      <View style={styles.card}>
        {[
          { icon: 'email', label: 'ইমেইল', value: 'dev@example.com', link: 'mailto:dev@example.com' },
          { icon: 'language', label: 'ওয়েবসাইট', value: 'www.example.com', link: 'https://example.com' },
          { icon: 'location-on', label: 'অবস্থান', value: 'ঢাকা, বাংলাদেশ' },
        ].map((item, i, arr) => (
          <View key={i}>
            <TouchableOpacity
              style={styles.row}
              onPress={() => item.link && Linking.openURL(item.link)}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <MaterialIcons name={item.icon} size={18} color="#4F46E5" />
                </View>
                <View>
                  <Text style={styles.rowLabel}>{item.label}</Text>
                  <Text style={styles.rowValue}>{item.value}</Text>
                </View>
              </View>
              {item.link && <MaterialIcons name="chevron-right" size={20} color="#ccc" />}
            </TouchableOpacity>
            {i < arr.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>

      <View style={styles.descCard}>
        <Text style={styles.descTitle}>পরিচিতি</Text>
        <Text style={styles.descText}>
          আমি একজন অভিজ্ঞ মোবাইল অ্যাপ ডেভেলপার। ইসলামিক অ্যাপ তৈরিতে বিশেষ আগ্রহী।
          এই অ্যাপটি মুসলিম উম্মাহর জন্য তৈরি করা হয়েছে।
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 40 },
  hero: {
    backgroundColor: '#4F46E5', alignItems: 'center',
    paddingTop: 50, paddingBottom: 40,
  },
  avatar: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  name: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  role: { fontSize: 13, color: '#C7D2FE', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    margin: 16, elevation: 2, overflow: 'hidden',
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 14,
  },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBox: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center',
  },
  rowLabel: { fontSize: 12, color: '#888' },
  rowValue: { fontSize: 14, color: '#1a1a1a', marginTop: 2 },
  divider: { height: 1, backgroundColor: '#f5f5f5', marginLeft: 62 },
  descCard: {
    backgroundColor: '#fff', borderRadius: 14,
    marginHorizontal: 16, padding: 16, elevation: 2,
  },
  descTitle: { fontSize: 15, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 },
  descText: { fontSize: 14, color: '#555', lineHeight: 22 },
});
