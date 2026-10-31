import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
import FeaturedProductsCarousel from '../../components/common/FeaturedProductsCarousel';
import SocialLinks from '../../components/common/SocialLinks';

const coinActions = [
  { title: 'অর্জিত কয়েন গ্রহণ করুন', icon: 'card-giftcard', screen: 'Claim', color: '#F59E0B' },
  { title: 'বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন', icon: 'play-circle-outline', screen: 'AdEarn', color: '#EF4444' },
  { title: 'দৈনিক কয়েন সংগ্রহ করুন', icon: 'today', screen: 'DailyCoin', color: '#22C55E' },
];

export default function HomeScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const s = styles(colors);

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <FeaturedProductsCarousel navigation={navigation} />
        <View style={s.coinCard}>
          <View style={s.coinHeader}>
            <View style={[s.coinHeaderIcon, { backgroundColor: `${colors.primary}18` }]}>
              <MaterialIcons name="monetization-on" size={22} color={colors.primary} />
            </View>
            <Text style={[s.coinTitle, { color: colors.onSurface }]}>কয়েন সংগ্রহ করুন</Text>
          </View>
          {coinActions.map((action, index) => (
            <TouchableOpacity
              key={action.screen}
              accessibilityRole="button"
              onPress={() => navigation.navigate(action.screen)}
              activeOpacity={0.75}
              style={[
                s.coinAction,
                index < coinActions.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.outlineVariant,
                },
              ]}
            >
              <View style={[s.coinActionIcon, { backgroundColor: `${action.color}18` }]}>
                <MaterialIcons name={action.icon} size={21} color={action.color} />
              </View>
              <Text style={[s.coinActionTitle, { color: colors.onSurface }]}>{action.title}</Text>
              <MaterialIcons name="chevron-right" size={22} color={colors.onSurfaceVariant} />
            </TouchableOpacity>
          ))}
        </View>
        <SocialLinks />
      </ScrollView>
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  coinCard: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 4,
    marginBottom: 12,
  },
  coinHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  coinHeaderIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  coinTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  coinAction: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  coinActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },
  coinActionTitle: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});
