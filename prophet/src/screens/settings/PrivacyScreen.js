import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Section = ({ title, text }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <MaterialIcons name="privacy-tip" size={48} color="#4F46E5" />
        <Text style={styles.heroTitle}>প্রাইভেসি পলিসি</Text>
        <Text style={styles.heroSub}>সর্বশেষ আপডেট: জানুয়ারি ২০২৫</Text>
      </View>

      <View style={styles.card}>
        <Section
          title="তথ্য সংগ্রহ"
          text="এই অ্যাপটি কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। সমস্ত ডেটা আপনার ডিভাইসে সংরক্ষিত থাকে।"
        />
        <View style={styles.divider} />
        <Section
          title="ইন্টারনেট ব্যবহার"
          text="অ্যাপটি শুধুমাত্র প্রথমবার content আপডেটের জন্য ইন্টারনেট ব্যবহার করে। এরপর সম্পূর্ণ অফলাইনে কাজ করে।"
        />
        <View style={styles.divider} />
        <Section
          title="তৃতীয় পক্ষ"
          text="আমরা কোনো তৃতীয় পক্ষের সাথে আপনার তথ্য শেয়ার করি না।"
        />
        <View style={styles.divider} />
        <Section
          title="যোগাযোগ"
          text="প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন: support@example.com"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: { paddingBottom: 40 },
  hero: {
    alignItems: 'center', backgroundColor: '#fff',
    paddingVertical: 30, marginBottom: 16,
  },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a1a1a', marginTop: 12 },
  heroSub: { fontSize: 12, color: '#888', marginTop: 4 },
  card: {
    backgroundColor: '#fff', borderRadius: 14,
    marginHorizontal: 16, elevation: 2, overflow: 'hidden',
  },
  section: { padding: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#4F46E5', marginBottom: 6 },
  sectionText: { fontSize: 14, color: '#555', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#f5f5f5' },
});
