import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking, Share, Dimensions, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getAllAppSettings } from '../../db/appSettings';
import { ADMOB_ENABLED } from '../../config/url';
import useAdInterstitial from '../../components/ads/AdInterstitial';
import AdBanner from '../../components/ads/AdBanner';

const { width } = Dimensions.get('window');

export default function DonationScreen() {
  const { colors } = useTheme();
  const [settings, setSettings] = useState(null);
  const entryShown = useRef(false);
  const { showAd: showInterstitial, isLoaded } = useAdInterstitial();

  useEffect(() => {
    if (ADMOB_ENABLED && isLoaded && !entryShown.current) {
      entryShown.current = true;
      showInterstitial();
    }
  }, [isLoaded]);

  useEffect(() => {
    getAllAppSettings().then(setSettings);
  }, []);

  if (!settings) {
    return <ActivityIndicator style={{ marginTop: 60 }} color={colors.primary} />;
  }

  const title = settings.donation_title || 'আর্থিক সহযোগিতা করুন';
  const subtitle = settings.donation_subtitle || 'আপনার দান আমাদের কাছে খুবই গুরুত্বপূর্ণ';
  const details = settings.donation_details || 'আপনার দান এই অ্যাপ ও এপিআই সার্ভারের উন্নয়ন ও রক্ষণাবেক্ষণে ব্যবহৃত হয়। আপনার সামান্য সহযোগিতা আমাদের এই ইসলামিক সেবা অব্যাহত রাখতে সাহায্য করে।';
  const note = settings.donation_note || 'আমরা যাকাত ও ফিতরা গ্রহণ করি না';
  const bankName = settings.donation_bank_name || 'Dutch-Bangla Bank';
  const accountName = settings.donation_account_name || 'Shahinul Islam Sujon';
  const accountNumber = settings.donation_account_number || '2111570325195';
  const bkashNumber = settings.donation_bkash || '01815330597';
  const nagadNumber = settings.donation_nagad || '01815330597';
  const rocketNumber = settings.donation_rocket || '01815330597';
  const contactEmail = settings.email || '';
  const themeColor = settings.theme_color || colors.primary;
  const appsTitle = settings.title || 'অ্যাপ';
  const s = styles(themeColor, colors);

  const paymentMethods = [
    ...(bkashNumber ? [{ icon: 'phone-iphone', label: 'বিকাশ', value: bkashNumber }] : []),
    ...(nagadNumber ? [{ icon: 'phone-iphone', label: 'নগদ', value: nagadNumber }] : []),
    ...(rocketNumber ? [{ icon: 'phone-iphone', label: 'রকেট', value: rocketNumber }] : []),
  ];
 

  const showNumber = (text, label) => {
    ToastAndroid.show(`${label}: ${text}`, ToastAndroid.LONG);
  };

  return (
    <View style={s.container}>
      <ScrollView contentContainerStyle={s.content}>
        <View style={s.hero}>
          <View style={s.heroOverlay} />
          <View style={s.iconBox}>
            <MaterialIcons name="volunteer-activism" size={46} color="#fff" />
          </View>
          <Text style={s.title}>{title}</Text>
          <Text style={s.subtitle}>{subtitle}</Text>
        </View>

        {note ? (
          <View style={s.noteCard}>
            <MaterialIcons name="info-outline" size={18} color={themeColor} />
            <Text style={s.noteText}>{note}</Text>
          </View>
        ) : null}

        <View style={s.appealCard}>
          <MaterialIcons name="volunteer-activism" size={24} color={themeColor} />
          <Text style={s.appealText}>
            আপনার দান আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই অ্যাপ ও এপিআই সার্ভারের উন্নয়ন,
            হোস্টিং ও রক্ষণাবেক্ষণের জন্য আমরা আপনার আর্থিক সহযোগিতা কামনা করছি।
            নিচের যেকোনো মাধ্যম ব্যবহার করে আপনি দান করতে পারেন।
          </Text>
        </View>

        

        {(bankName || accountName || accountNumber) && (
          <View style={s.card}>
            <Text style={s.cardTitle}>ব্যাংক তথ্য</Text>
            {bankName ? (
              <TouchableOpacity style={s.infoRow} onPress={() => showNumber(bankName, 'ব্যাংক')} activeOpacity={0.6}>
                <Text style={s.infoLabel}>ব্যাংক</Text>
                <Text style={s.infoValue}>{bankName}</Text>
              </TouchableOpacity>
            ) : null}
            {accountName ? (
              <TouchableOpacity style={s.infoRow} onPress={() => showNumber(accountName, 'একাউন্টের নাম')} activeOpacity={0.6}>
                <Text style={s.infoLabel}>একাউন্টের নাম</Text>
                <Text style={s.infoValue}>{accountName}</Text>
              </TouchableOpacity>
            ) : null}
            {accountNumber ? (
              <TouchableOpacity style={s.infoRow} onPress={() => showNumber(accountNumber, 'একাউন্ট নম্বর')} activeOpacity={0.6}>
                <Text style={s.infoLabel}>একাউন্ট নম্বর</Text>
                <Text style={s.infoValue}>{accountNumber}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        {paymentMethods.length > 0 && (
          <View style={s.card}>
            <Text style={s.cardTitle}>মোবাইল পেমেন্ট</Text>
            {paymentMethods.map((item, i, arr) => (
              <View key={i}>
                <TouchableOpacity
                  style={s.paymentRow}
                  onPress={() => {
                    showNumber(item.value, item.label);
                    Linking.openURL(`tel:${item.value.replace(/[^0-9]/g, '')}`);
                  }}
                  activeOpacity={0.6}
                >
                  <View style={s.paymentLeft}>
                    <View style={s.iconWrap}>
                      <MaterialIcons name={item.icon} size={18} color={themeColor} />
                    </View>
                    <Text style={s.paymentLabel}>{item.label}</Text>
                  </View>
                  <Text style={s.paymentNumber}>{item.value}</Text>
                </TouchableOpacity>
                {i < arr.length - 1 && <View style={s.divider} />}
              </View>
            ))}
          </View>
        )}

        
      </ScrollView>
      <AdBanner />
    </View>
  );
}

const styles = (themeColor, colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
  hero: {
    backgroundColor: themeColor, alignItems: 'center',
    paddingTop: 50, paddingBottom: 35,
    position: 'relative', overflow: 'hidden',
  },
  heroOverlay: {
    position: 'absolute', top: -width * 0.3, right: -width * 0.2,
    width: width * 0.7, height: width * 0.7,
    borderRadius: width * 0.35, backgroundColor: 'rgba(255,255,255,0.08)',
  },
  iconBox: {
    width: 82, height: 82, borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 0,
  },
  title: {
    fontSize: 24, fontWeight: 'bold', color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 3,
  },
  subtitle: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 4 },
  noteCard: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: themeColor + '12', borderRadius: 12,
    marginHorizontal: 16, marginTop: 16, padding: 14,
    borderLeftWidth: 3, borderLeftColor: themeColor,
  },
  noteText: { flex: 1, fontSize: 14, color: colors.onSurface, lineHeight: 20 },
  appealCard: {
    alignItems: 'center', gap: 10,
    backgroundColor: themeColor + '10', borderRadius: 14,
    marginHorizontal: 16, marginTop: 16, padding: 18,
    borderWidth: 1, borderColor: themeColor + '30',
  },
  appealText: {
    fontSize: 14, color: colors.onSurface, textAlign: 'center',
    lineHeight: 22, opacity: 0.8,
  },
  encourageCard: {
    backgroundColor: '#FFF0F0', borderRadius: 14,
    marginHorizontal: 16, marginTop: 16, padding: 18,
    alignItems: 'center', borderWidth: 1, borderColor: '#FFD4D4',
  },
  encourageText: {
    fontSize: 15, color: '#4B2C2C', textAlign: 'center',
    lineHeight: 24, marginTop: 8, marginBottom: 14,
  },
  shareBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#E11D48', paddingVertical: 10,
    paddingHorizontal: 24, borderRadius: 10,
  },
  shareBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  card: {
    backgroundColor: colors.surface, borderRadius: 14,
    marginHorizontal: 16, marginTop: 16, padding: 16,
    elevation: 0,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4,
  },
  cardTitle: { fontSize: 15, fontWeight: 'bold', color: colors.onSurface, marginBottom: 8 },
  cardText: { fontSize: 14, color: colors.onSurface, opacity: 0.6, lineHeight: 22 },
  infoRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 8,
    borderBottomWidth: 0.5, borderBottomColor: colors.background,
  },
  infoLabel: { fontSize: 13, color: colors.onSurface, opacity: 0.5, flex: 1 },
  infoValue: { fontSize: 14, color: colors.onSurface, fontWeight: '500' },
  paymentRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 10,
  },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconWrap: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: themeColor + '15',
    alignItems: 'center', justifyContent: 'center',
  },
  paymentLabel: { fontSize: 15, color: colors.onSurface, fontWeight: '500' },
  paymentNumber: { fontSize: 14, color: colors.onSurface },
  divider: { height: 1, backgroundColor: colors.background },
  emailRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  emailText: { fontSize: 14, color: colors.onSurface, flex: 1 },
});
