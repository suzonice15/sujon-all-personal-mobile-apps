import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert, ToastAndroid } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCoins } from '../../context/CoinsContext';
import { useNotifications } from '../../context/NotificationsContext';
import { apps_slug, ADMOB_ENABLED } from '../../config/url';
import { getMobileCoinRate, submitWithdrawRequest } from '../../api/homeApi';
import { addWithdrawRecord } from '../../db/withdraw';
import { addCoins } from '../../db/coins';
import { addLocalNotification } from '../../db/notifications';
import { getDeviceId } from '../../db/earnings';
import { isOnline } from '../../utils/helper';
import AdBanner from '../../components/ads/AdBanner';
import AdNative from '../../components/ads/AdNative';
import useAdInterstitial from '../../components/ads/AdInterstitial';

const DEFAULT_COIN_RATE = 100;
const DEFAULT_MIN_TK = 100;
const DEFAULT_FEE_TK = 5;




const quickAmounts = [50, 100, 200, 500, 1000];

export default function WithdrawRequestScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const { total: userCoins, refreshCoins } = useCoins();
  const { refresh: refreshNotifications } = useNotifications();
  const [coinRate, setCoinRate] = useState(DEFAULT_COIN_RATE);
  const [minTk, setMinTk] = useState(DEFAULT_MIN_TK);
  const [feeTk, setFeeTk] = useState(DEFAULT_FEE_TK);
  const [accountNumber, setAccountNumber] = useState('');
  const [amountTk, setAmountTk] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [pendingNav, setPendingNav] = useState(false);
  const entryShown = useRef(false);

  const { showAd: showInterstitial, isLoaded, isClosed: adClosed } = useAdInterstitial();

  // Entry ad: show when ad loads for the first time
  useEffect(() => {
    if (ADMOB_ENABLED && isLoaded && !entryShown.current) {
      entryShown.current = true;
      showInterstitial(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (pendingNav && adClosed) {
      setPendingNav(false);
      navigation.goBack();
    }
  }, [pendingNav, adClosed, navigation]);

  const goBackOrShowAd = () => {
    if (!ADMOB_ENABLED) return navigation.goBack();
    if (showInterstitial()) {
      setPendingNav(true);
    } else {
      ToastAndroid.show('বিজ্ঞাপন লোড হচ্ছে, আবার চেষ্টা করুন', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    refreshCoins();
    getMobileCoinRate().then((res) => {
      if (res?.success && res?.data) {
        setCoinRate(Number(res.data.coin_rate) || DEFAULT_COIN_RATE);
        setMinTk(Number(res.data.withdraw_minimum_amount) || DEFAULT_MIN_TK);
        setFeeTk(Number(res.data.withdraw_minimum_fee) || DEFAULT_FEE_TK);
      }
    }).catch(() => {});
  }, []);

  const feeCoins = feeTk * coinRate;
  const amountCoins = amountTk ? parseInt(amountTk) * coinRate : 0;
  const totalCoins = amountCoins + feeCoins;

  const canSubmit = accountNumber.trim().length >= 11
    && amountTk
    && parseInt(amountTk) >= minTk
    && totalCoins <= userCoins;

  const handleSubmit = async () => {
    try {
      if (submitting) return;
      if (accountNumber.trim().length < 11) return Alert.alert('ত্রুটি', 'সঠিক বিকাশ নম্বর দিন (১১ ডিজিট)');
      if (!amountTk || parseInt(amountTk) < minTk) return Alert.alert('ত্রুটি', `ন্যূনতম ${minTk} টাকা`);
      if (totalCoins > userCoins) return Alert.alert('ত্রুটি', 'পর্যাপ্ত কয়েন নেই');

      setSubmitting(true);

      const online = await isOnline();
      if (!online) { setSubmitting(false); return Alert.alert('ত্রুটি', 'ইন্টারনেট সংযোগ প্রয়োজন'); }

      const deviceId = await getDeviceId();
      let serverId = null;

      try {
        const res = await submitWithdrawRequest({
          device_id: deviceId,
          slug: apps_slug,
          type: 'withdraw',
          method: 'bkash',
          account: accountNumber,
          amount: parseInt(amountTk),
          coins_used: totalCoins,
          coin_rate: coinRate,
          fee_coins: feeCoins,
        });
        if (res?.data?.id) serverId = res.data.id;
      } catch (e) {
        setSubmitting(false);
        return Alert.alert('ত্রুটি', 'সার্ভারে সমস্যা, আবার চেষ্টা করুন');
      }

      try {
        await addCoins(-Math.abs(totalCoins), 'উত্তোলন', 'withdraw');
        await addWithdrawRecord({
          type: 'withdraw',
          method: 'bkash',
          account: accountNumber,
          amount: parseInt(amountTk),
          coins_used: totalCoins,
          coin_rate: coinRate,
          fee_coins: feeCoins,
          status: 'pending',
          synced: 1,
          server_id: serverId,
        });
      } catch (e) {
        console.log('Local save error:', e);
        setSubmitting(false);
        return Alert.alert('ত্রুটি', 'স্থানীয় ডাটা সেভে সমস্যা');
      }

      setSubmitting(false);
      refreshCoins().catch(() => {});
      addLocalNotification('উত্তোলন', `${amountTk} টাকার উত্তোলন অনুরোধ পাঠানো হয়েছে`, 'withdraw').catch(() => {});
      refreshNotifications().catch(() => {});
      goBackOrShowAd();
    } catch (e) {
      console.log('Unhandled error:', e);
      setSubmitting(false);
      Alert.alert('ত্রুটি', 'কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন');
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12, flexGrow: 1 }}>
          <View style={s.brandCard}>
          <View style={s.brandRow}>
            <View style={s.bkashCircle}>
              <MaterialIcons name="phone-iphone" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={s.brandTitle}>বিকাশ উইথড্র</Text>
              <Text style={s.brandSub}>কয়েন টাকায় রূপান্তর করে উত্তোলন</Text>
            </View>
          </View>
          <View style={s.balanceBadge}>
            <MaterialIcons name="monetization-on" size={14} color="#F59E0B" />
            <Text style={s.balanceText}>
              ব্যালেন্স: <Text style={s.balanceBold}>{userCoins.toLocaleString()} কয়েন</Text>
              {'  '}≈ {Math.floor(userCoins / coinRate)} টাকা
            </Text>
          </View>
        </View>

        <View style={s.fieldBox}>
          <Text style={s.label}>বিকাশ পার্সোনাল নম্বর</Text>
          <View style={s.inputRow}>
            <View style={s.prefixBox}>
              <MaterialIcons name="phone-iphone" size={16} color="#E2136E" />
            </View>
            <TextInput
              style={s.input}
              placeholder="০১XXXXXXXXX"
              placeholderTextColor={colors.muted + '80'}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>
        </View>

        <View style={s.fieldBox}>
          <Text style={s.label}>পরিমাণ <Text style={{ color: colors.muted, fontWeight: 400 }}>(ন্যূনতম {minTk} টাকা)</Text></Text>
          <View style={s.inputRow}>
            <View style={s.prefixBox}>
              <MaterialIcons name="attach-money" size={16} color="#E2136E" />
            </View>
            <TextInput
              style={s.input}
              placeholder="০"
              placeholderTextColor={colors.muted + '80'}
              value={amountTk}
              onChangeText={setAmountTk}
              keyboardType="number-pad"
            />
          </View>
        </View>

        {!amountTk && (
          <View style={s.chipRow}>
            {quickAmounts.map((q) => (
              <TouchableOpacity key={q} style={s.chip} onPress={() => setAmountTk(String(q))} activeOpacity={0.7}>
                <Text style={s.chipText}>{q} টাকা</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {amountTk && parseInt(amountTk) > 0 && (
          <View style={s.summaryCard}>
            <Text style={s.summaryTitle}>লেনদেন বিবরণ</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>উত্তোলন</Text>
              <Text style={s.summaryValue}>{amountTk} টাকা</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>প্রয়োজনীয় কয়েন</Text>
              <Text style={s.summaryValue}>{amountCoins.toLocaleString()} কয়েন</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>ট্রানজেকশন ফি ({feeTk} টাকা)</Text>
              <Text style={[s.summaryValue, { color: '#EF4444' }]}>+{feeCoins.toLocaleString()} কয়েন</Text>
            </View>
            <View style={s.summaryDivider} />
            <View style={s.summaryRow}>
              <Text style={[s.summaryLabel, { fontWeight: '700', color: colors.text }]}>মোট খরচ</Text>
              <Text style={[s.summaryValue, { fontWeight: '700', color: '#E2136E' }]}>{totalCoins.toLocaleString()} কয়েন</Text>
            </View>
            {totalCoins > userCoins && (
              <View style={s.errorBox}>
                <MaterialIcons name="error-outline" size={14} color="#EF4444" />
                <Text style={s.errorText}>পর্যাপ্ত কয়েন নেই! আরও {(totalCoins - userCoins).toLocaleString()} কয়েন প্রয়োজন</Text>
              </View>
            )}
          </View>
        )}

        <View style={s.infoBox}>
          <MaterialIcons name="info-outline" size={15} color="#E2136E" />
          <Text style={s.infoText}>
            • {feeTk} টাকা ফি • {coinRate} কয়েন = ১ টাকা • সকাল ৯টা - রাত ১০টা
          </Text>
        </View>


        <TouchableOpacity
          style={[s.submitBtn, (!canSubmit || submitting) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!canSubmit || submitting}
        >
          <MaterialIcons name="send" size={18} color="#fff" />
          <Text style={s.submitText}>{submitting ? 'প্রক্রিয়াকরণ...' : 'উইথড্র রিকোয়েস্ট জমা দিন'}</Text>
        </TouchableOpacity>
                <AdNative style={{ marginTop: 10 }} />


        </ScrollView>
        <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },

  brandCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    borderLeftWidth: 3,
    borderLeftColor: '#E2136E',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  bkashCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E2136E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: { fontSize: 15, fontWeight: 'bold', color: colors.text },
  brandSub: { fontSize: 10, color: colors.muted, marginTop: 1 },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 7,
    marginTop: 10,
  },
  balanceText: { fontSize: 11, color: '#92400E', marginLeft: 5, flex: 1 },
  balanceBold: { fontWeight: 'bold' },

  fieldBox: { marginBottom: 2 },
  label: { fontSize: 12, fontWeight: '700', color: colors.text, marginBottom: 5, marginTop: 2 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.muted + '40',
    borderRadius: 10,
    backgroundColor: colors.surface,
    marginBottom: 10,
    overflow: 'hidden',
  },
  prefixBox: {
    width: 36,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.muted + '15',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    color: colors.text,
  },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2136E',
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: '#E2136E' + '10',
  },
  chipText: { fontSize: 11, fontWeight: '600', color: '#E2136E' },

  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 11,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.muted + '20',
  },
  summaryTitle: { fontSize: 12, fontWeight: 'bold', color: colors.text, marginBottom: 7 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  summaryLabel: { fontSize: 11, color: colors.muted },
  summaryValue: { fontSize: 11, fontWeight: '600', color: colors.text },
  summaryDivider: { height: 1, backgroundColor: colors.muted + '25', marginVertical: 5 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    padding: 6,
    marginTop: 6,
  },
  errorText: { fontSize: 11, color: '#EF4444', fontWeight: '600', marginLeft: 5, flex: 1 },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FDF2F8',
    borderRadius: 10,
    padding: 8,
    marginBottom: 14,
  },
  infoText: { fontSize: 11, color: '#9D174D', marginLeft: 8, flex: 1, lineHeight: 16 },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E2136E',
    borderRadius: 12,
    paddingVertical: 12,
    elevation: 0,
    shadowColor: '#E2136E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  submitText: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: 6 },
});
