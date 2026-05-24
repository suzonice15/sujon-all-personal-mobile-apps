import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Section = ({ num, title, text }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.numBox}>
        <Text style={styles.num}>{num}</Text>
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Text style={styles.sectionText}>{text}</Text>
  </View>
);

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <MaterialIcons name="description" size={48} color="#4F46E5" />
        <Text style={styles.heroTitle}>ব্যবহারের শর্তাবলী</Text>
        <Text style={styles.heroSub}>সর্বশেষ আপডেট: জানুয়ারি ২০২৫</Text>
      </View>

      <View style={styles.card}>
        <Section
          num="১"
          title="গ্রহণযোগ্যতা"
          text="এই অ্যাপটি ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। যদি আপনি এই শর্তাবলীর সাথে একমত না হন, তাহলে অ্যাপটি ব্যবহার করবেন না।"
        />
        <View style={styles.divider} />
        <Section
          num="২"
          title="ব্যবহারের উদ্দেশ্য"
          text="এই অ্যাপটি শুধুমাত্র শিক্ষামূলক ও ধর্মীয় উদ্দেশ্যে ব্যবহার করা যাবে। কোনো বাণিজ্যিক উদ্দেশ্যে ব্যবহার নিষিদ্ধ।"
        />
        <View style={styles.divider} />
        <Section
          num="৩"
          title="কপিরাইট"
          text="এই অ্যাপের সকল কন্টেন্ট কপিরাইটযুক্ত। অনুমতি ছাড়া কোনো কন্টেন্ট পুনরায় প্রকাশ করা যাবে না।"
        />
        <View style={styles.divider} />
        <Section
          num="৪"
          title="পরিবর্তনের অধিকার"
          text="আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার রাখি। পরিবর্তনের পর অ্যাপ ব্যবহার অব্যাহত রাখলে আপনি নতুন শর্তাবলী মেনে নিয়েছেন বলে গণ্য হবে।"
        />
        <View style={styles.divider} />
        <Section
          num="৫"
          title="দায়বদ্ধতা"
          text="এই অ্যাপের তথ্য সর্বোচ্চ নির্ভুলতার সাথে উপস্থাপন করা হয়েছে। তবে কোনো ভুলের জন্য আমরা দায়ী নই।"
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
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  numBox: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center',
  },
  num: { fontSize: 13, fontWeight: 'bold', color: '#4F46E5' },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1a1a1a' },
  sectionText: { fontSize: 14, color: '#555', lineHeight: 22 },
  divider: { height: 1, backgroundColor: '#f5f5f5' },
});
