import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCoins } from '../../context/CoinsContext';
import { useNotifications } from '../../context/NotificationsContext';
import { apps_slug } from '../../config/url';
import { getMobileCoinRate, submitWithdrawRequest } from '../../api/homeApi';
import { addWithdrawRecord } from '../../db/withdraw';
import { addCoins } from '../../db/coins';
import { addLocalNotification } from '../../db/notifications';
import { getDeviceId } from '../../db/earnings';
import { isOnline } from '../../utils/helper';

const DEFAULT_COIN_RATE = 100;
const DEFAULT_MIN_RECHARGE = 50;

const sims = [
  { id: 'grameenphone', label: 'গ্রামীণফোন', color: '#007B3E' },
  { id: 'robl', label: 'রবি', color: '#ED1C24' },
  { id: 'banglalink', label: 'বাংলালিংক', color: '#004B93' },
  { id: 'teletalk', label: 'টেলিটক', color: '#1BA64A' },
];

const quickAmounts = [50, 100, 200, 500, 1000];

export default function MobileRechargeScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const { total: userCoins, refreshCoins } = useCoins();
  const { refresh: refreshNotifications } = useNotifications();
  const [coinRate, setCoinRate] = useState(DEFAULT_COIN_RATE);
  const [minRechargeTk, setMinRechargeTk] = useState(DEFAULT_MIN_RECHARGE);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSim, setSelectedSim] = useState(null);
  const [connectionType, setConnectionType] = useState(null);
  const [amountTk, setAmountTk] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    refreshCoins();
    getMobileCoinRate().then((res) => {
      if (res?.success && res?.data) {
        setCoinRate(Number(res.data.coin_rate) || DEFAULT_COIN_RATE);
        setMinRechargeTk(Number(res.data.min_mobile_recharge_amount) || DEFAULT_MIN_RECHARGE);
      }
    }).catch(() => {});
  }, []);

  const amountCoins = amountTk ? parseInt(amountTk) * coinRate : 0;
  const totalCoins = amountCoins;

  const canSubmit = phoneNumber.trim().length >= 11
    && selectedSim
    && connectionType
    && amountTk
    && parseInt(amountTk) >= minRechargeTk
    && totalCoins <= userCoins;

  const handleSubmit = async () => {
    try {
      if (submitting) return;
      if (phoneNumber.trim().length < 11) return Alert.alert('ত্রুটি', 'সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)');
      if (!selectedSim) return Alert.alert('ত্রুটি', 'সিম নির্বাচন করুন');
      if (!connectionType) return Alert.alert('ত্রুটি', 'প্রিপেইড/পোস্টপেইড নির্বাচন করুন');
      if (!amountTk || parseInt(amountTk) < minRechargeTk) return Alert.alert('ত্রুটি', `ন্যূনতম ${minRechargeTk} টাকা`);
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
          type: 'recharge',
          method: selectedSim,
          account: phoneNumber,
          connection_type: connectionType,
          amount: parseInt(amountTk),
          coins_used: totalCoins,
          coin_rate: coinRate,
          fee_coins: 0,
        });
        if (res?.data?.id) serverId = res.data.id;
      } catch (e) {
        setSubmitting(false);
        return Alert.alert('ত্রুটি', 'সার্ভারে সমস্যা, আবার চেষ্টা করুন');
      }

      try {
        await addCoins(-Math.abs(totalCoins), 'মোবাইল রিচার্জ', 'withdraw');
        await addWithdrawRecord({
          type: 'recharge',
          method: selectedSim,
          account: phoneNumber,
          connection_type: connectionType,
          amount: parseInt(amountTk),
          coins_used: totalCoins,
          coin_rate: coinRate,
          fee_coins: 0,
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
      addLocalNotification('মোবাইল রিচার্জ', `${amountTk} টাকার রিচার্জ অনুরোধ পাঠানো হয়েছে`, 'recharge').catch(() => {});
      refreshNotifications().catch(() => {});
      navigation.goBack();
    } catch (e) {
      console.log('Unhandled error:', e);
      setSubmitting(false);
      Alert.alert('ত্রুটি', 'কিছু সমস্যা হয়েছে, আবার চেষ্টা করুন');
    }
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 12 }}>
        <View style={s.brandCard}>
          <View style={s.brandRow}>
            <View style={s.rechargeCircle}>
              <MaterialIcons name="sim-card" size={22} color="#fff" />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={s.brandTitle}>মোবাইল রিচার্জ</Text>
              <Text style={s.brandSub}>কয়েন দিয়ে রিচার্জ করুন, কোনো ফি নেই</Text>
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
          <Text style={s.label}>মোবাইল নম্বর</Text>
          <View style={s.inputRow}>
            <View style={s.prefixBox}>
              <MaterialIcons name="smartphone" size={16} color="#4F46E5" />
            </View>
            <TextInput
              style={s.input}
              placeholder="০১XXXXXXXXX"
              placeholderTextColor={colors.muted + '80'}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={11}
            />
          </View>
        </View>

        <Text style={s.label}>সিম নির্বাচন করুন</Text>
        <View style={s.simGrid}>
          {sims.map((sim) => {
            const active = selectedSim === sim.id;
            return (
              <TouchableOpacity
                key={sim.id}
                style={[s.simCard, active && { borderColor: sim.color, backgroundColor: sim.color + '12' }]}
                onPress={() => setSelectedSim(sim.id)}
                activeOpacity={0.7}
              >
                <View style={[s.simDot, { backgroundColor: sim.color }]} />
                <Text style={[s.simLabel, active && { color: sim.color, fontWeight: '700' }]}>{sim.label}</Text>
                {active && <MaterialIcons name="check-circle" size={14} color={sim.color} style={{ marginLeft: 'auto' }} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={s.label}>কানেকশন টাইপ</Text>
        <View style={s.connRow}>
          {[
            { id: 'prepaid', label: 'প্রিপেইড', icon: 'credit-card' },
            { id: 'postpaid', label: 'পোস্টপেইড', icon: 'receipt' },
          ].map((type) => {
            const active = connectionType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[s.connBtn, active && s.connBtnActive]}
                onPress={() => setConnectionType(type.id)}
                activeOpacity={0.7}
              >
                <MaterialIcons name={type.icon} size={15} color={active ? '#fff' : colors.muted} />
                <Text style={[s.connLabel, active && { color: '#fff' }]}>{type.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={s.fieldBox}>
          <Text style={s.label}>পরিমাণ <Text style={{ color: colors.muted, fontWeight: 400 }}>(ন্যূনতম {minRechargeTk} টাকা)</Text></Text>
          <View style={s.inputRow}>
            <View style={s.prefixBox}>
              <MaterialIcons name="attach-money" size={16} color="#4F46E5" />
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
            <Text style={s.summaryTitle}>রিচার্জ বিবরণ</Text>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>রিচার্জ পরিমাণ</Text>
              <Text style={s.summaryValue}>{amountTk} টাকা</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>প্রয়োজনীয় কয়েন</Text>
              <Text style={s.summaryValue}>{amountCoins.toLocaleString()} কয়েন</Text>
            </View>
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>ট্রানজেকশন ফি</Text>
              <Text style={[s.summaryValue, { color: '#22C55E' }]}>ফ্রি</Text>
            </View>
            <View style={s.summaryDivider} />
            <View style={s.summaryRow}>
              <Text style={[s.summaryLabel, { fontWeight: '700', color: colors.text }]}>মোট খরচ</Text>
              <Text style={[s.summaryValue, { fontWeight: '700', color: '#4F46E5' }]}>{totalCoins.toLocaleString()} কয়েন</Text>
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
          <MaterialIcons name="info-outline" size={15} color="#4F46E5" />
          <Text style={s.infoText}>
            • কোন ফি নেই • {coinRate} কয়েন = ১ টাকা • সকাল ৯টা - রাত ১০টা
          </Text>
        </View>

        <TouchableOpacity
          style={[s.submitBtn, (!canSubmit || submitting) && { opacity: 0.5 }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!canSubmit || submitting}
        >
          <MaterialIcons name="send" size={18} color="#fff" />
          <Text style={s.submitText}>{submitting ? 'প্রক্রিয়াকরণ...' : 'রিচার্জ রিকোয়েস্ট জমা দিন'}</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderLeftColor: '#4F46E5',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  rechargeCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#4F46E5',
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

  simGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10, gap: 6 },
  simCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.muted + '40',
    backgroundColor: colors.surface,
  },
  simDot: { width: 7, height: 7, borderRadius: 3, marginRight: 6 },
  simLabel: { fontSize: 12, fontWeight: '500', color: colors.text },

  connRow: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  connBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.muted + '40',
    backgroundColor: colors.surface,
  },
  connBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  connLabel: { fontSize: 12, fontWeight: '600', color: colors.text, marginLeft: 5 },

  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#4F46E5',
    marginRight: 6,
    marginBottom: 6,
    backgroundColor: '#4F46E5' + '10',
  },
  chipText: { fontSize: 11, fontWeight: '600', color: '#4F46E5' },

  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 11,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.muted + '20',
  },
  summaryTitle: { fontSize: 12, fontWeight: 'bold', color: colors.text, marginBottom: 7 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
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
    backgroundColor: '#EEF2FF',
    borderRadius: 10,
    padding: 8,
    marginBottom: 14,
  },
  infoText: { fontSize: 11, color: '#4338CA', marginLeft: 8, flex: 1, lineHeight: 16 },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  submitText: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: 6 },
});
