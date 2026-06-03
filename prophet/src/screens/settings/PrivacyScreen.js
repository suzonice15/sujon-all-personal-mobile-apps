import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

const Section = ({ title, text, colors }) => (
  <View style={sectionStyles(colors).section}>
    <Text style={sectionStyles(colors).sectionTitle}>{title}</Text>
    <Text style={sectionStyles(colors).sectionText}>{text}</Text>
  </View>
);

const sectionStyles = (colors) => StyleSheet.create({
  section: { padding: 16 },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.primary, marginBottom: 6 },
  sectionText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, lineHeight: 22 },
});

export default function PrivacyScreen() {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <MaterialIcons name="privacy-tip" size={48} color={colors.primary} />
        <Text style={s.heroTitle}>প্রাইভেসি পলিসি</Text>
        <Text style={s.heroSub}>সর্বশেষ আপডেট: জানুয়ারি ২০২৫</Text>
      </View>

      <View style={s.card}>
        <Section colors={colors} title="তথ্য সংগ্রহ" text="এই অ্যাপটি কোনো ব্যক্তিগত তথ্য সংগ্রহ করে না। সমস্ত ডেটা আপনার ডিভাইসে সংরক্ষিত থাকে।" />
        <View style={s.divider} />
        <Section colors={colors} title="ইন্টারনেট ব্যবহার" text="অ্যাপটি শুধুমাত্র প্রথমবার content আপডেটের জন্য ইন্টারনেট ব্যবহার করে। এরপর সম্পূর্ণ অফলাইনে কাজ করে।" />
        <View style={s.divider} />
        <Section colors={colors} title="তৃতীয় পক্ষ" text="আমরা কোনো তৃতীয় পক্ষের সাথে আপনার তথ্য শেয়ার করি না।" />
        <View style={s.divider} />
        <Section colors={colors} title="যোগাযোগ" text="প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদের সাথে যোগাযোগ করুন: support@example.com" />
      </View>
    </ScrollView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  hero: { alignItems: 'center', backgroundColor: colors.surface, paddingVertical: 30, marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface, marginTop: 12 },
  heroSub: { fontSize: 12, color: colors.onSurface, opacity: 0.4, marginTop: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 14, marginHorizontal: 16, overflow: 'hidden' },
  divider: { height: 1, backgroundColor: colors.background },
});
