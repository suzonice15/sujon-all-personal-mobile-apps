import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

const Section = ({ num, title, text, colors }) => (
  <View style={sectionStyles(colors).section}>
    <View style={sectionStyles(colors).sectionHeader}>
      <View style={sectionStyles(colors).numBox}>
        <Text style={sectionStyles(colors).num}>{num}</Text>
      </View>
      <Text style={sectionStyles(colors).sectionTitle}>{title}</Text>
    </View>
    <Text style={sectionStyles(colors).sectionText}>{text}</Text>
  </View>
);

const sectionStyles = (colors) => StyleSheet.create({
  section: { padding: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  numBox: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  num: { fontSize: 13, fontWeight: 'bold', color: colors.primary },
  sectionTitle: { fontSize: 15, fontWeight: 'bold', color: colors.onSurface },
  sectionText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, lineHeight: 22 },
});

export default function TermsScreen() {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <ScrollView style={s.container} contentContainerStyle={s.content}>
      <View style={s.hero}>
        <MaterialIcons name="description" size={48} color={colors.primary} />
        <Text style={s.heroTitle}>ব্যবহারের শর্তাবলী</Text>
        <Text style={s.heroSub}>সর্বশেষ আপডেট: জানুয়ারি ২০২৫</Text>
      </View>

      <View style={s.card}>
        <Section colors={colors} num="১" title="গ্রহণযোগ্যতা" text="এই অ্যাপটি ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন। যদি আপনি এই শর্তাবলীর সাথে একমত না হন, তাহলে অ্যাপটি ব্যবহার করবেন না।" />
        <View style={s.divider} />
        <Section colors={colors} num="২" title="ব্যবহারের উদ্দেশ্য" text="এই অ্যাপটি শুধুমাত্র শিক্ষামূলক ও ধর্মীয় উদ্দেশ্যে ব্যবহার করা যাবে। কোনো বাণিজ্যিক উদ্দেশ্যে ব্যবহার নিষিদ্ধ।" />
        <View style={s.divider} />
        <Section colors={colors} num="৩" title="কপিরাইট" text="এই অ্যাপের সকল কন্টেন্ট কপিরাইটযুক্ত। অনুমতি ছাড়া কোনো কন্টেন্ট পুনরায় প্রকাশ করা যাবে না।" />
        <View style={s.divider} />
        <Section colors={colors} num="৪" title="পরিবর্তনের অধিকার" text="আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করার অধিকার রাখি। পরিবর্তনের পর অ্যাপ ব্যবহার অব্যাহত রাখলে আপনি নতুন শর্তাবলী মেনে নিয়েছেন বলে গণ্য হবে।" />
        <View style={s.divider} />
        <Section colors={colors} num="৫" title="দায়বদ্ধতা" text="এই অ্যাপের তথ্য সর্বোচ্চ নির্ভুলতার সাথে উপস্থাপন করা হয়েছে। তবে কোনো ভুলের জন্য আমরা দায়ী নই।" />
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
