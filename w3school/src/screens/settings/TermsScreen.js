import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { ADMOB_ENABLED } from '../../config/url';
import useAdInterstitial from '../../components/ads/AdInterstitial';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';

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
  const entryShown = useRef(false);
  const { showAd: showInterstitial, isLoaded } = useAdInterstitial();

  useEffect(() => {
    if (ADMOB_ENABLED && isLoaded && !entryShown.current) {
      entryShown.current = true;
      showInterstitial();
    }
  }, [isLoaded]);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.hero}>
          <MaterialIcons name="description" size={48} color={colors.primary} />
          <Text style={s.heroTitle}>Terms of Use</Text>
          <Text style={s.heroSub}>Last updated: January 2025</Text>
        </View>

        <View style={s.card}>
          <Section colors={colors} num="1" title="Acceptance" text="By using this app you accept these terms. If you do not agree with them, please do not use the app." />
          <View style={s.divider} />
          <Section colors={colors} num="2" title="Purpose of use" text="This app is for educational purposes only. Commercial use of its content is not allowed." />
          <View style={s.divider} />
          <Section colors={colors} num="3" title="Copyright" text="All content in this app is copyrighted. It may not be republished without permission." />
          <View style={s.divider} />
          <Section colors={colors} num="4" title="Right to change" text="We may change these terms at any time. Continuing to use the app after a change means you accept the new terms." />
          <View style={s.divider} />
          <Section colors={colors} num="5" title="Liability" text="We present the content as accurately as possible, but we are not liable for any errors." />
        </View>
      </ScrollView>
                                <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
      
      <AdBanner />
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  hero: { alignItems: 'center', backgroundColor: colors.surface, paddingVertical: 30, marginBottom: 16 },
  heroTitle: { fontSize: 20, fontWeight: 'bold', color: colors.onSurface, marginTop: 12 },
  heroSub: { fontSize: 12, color: colors.onSurface, opacity: 0.4, marginTop: 4 },
  card: { backgroundColor: colors.surface, borderRadius: 14, marginHorizontal: 16, overflow: 'hidden' },
  divider: { height: 1, backgroundColor: colors.background },
});
