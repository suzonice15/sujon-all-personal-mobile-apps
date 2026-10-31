import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';
import SocialLinks from '../../components/common/SocialLinks';
import { email } from '../../config/url';

export default function ContactUsScreen() {
  const { colors } = useTheme();
  const s = styles(colors);

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <SocialLinks />
        <TouchableOpacity
          accessibilityRole="link"
          onPress={() => Linking.openURL(`mailto:${email}?subject=অ্যাপ%20সাপোর্ট`)}
          style={s.emailRow}
          activeOpacity={0.7}
        >
          <View style={s.emailIcon}>
            <MaterialIcons name="mail-outline" size={21} color={colors.primary} />
          </View>
          <View style={s.emailText}>
            <Text style={s.emailLabel}>ইমেইল</Text>
            <Text style={s.emailAddress}>{email}</Text>
          </View>
          <MaterialIcons name="open-in-new" size={18} color={colors.primary} />
        </TouchableOpacity>
      </ScrollView>
      <AdNative style={s.nativeAd} />
      <AdBanner />
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 14,
    marginTop: 14,
    padding: 16,
  },
  emailIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary + '18',
  },
  emailText: {
    flex: 1,
    marginHorizontal: 12,
  },
  emailLabel: {
    color: colors.onSurface,
    fontSize: 15,
    fontWeight: '600',
  },
  emailAddress: {
    color: colors.onSurface,
    fontSize: 13,
    marginTop: 4,
    opacity: 0.65,
  },
  nativeAd: {
    marginBottom: 5,
    marginTop: 10,
  },
});
