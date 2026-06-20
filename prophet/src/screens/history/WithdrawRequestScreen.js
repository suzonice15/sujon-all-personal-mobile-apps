import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const COIN_TO_TAKA = 100;
const MIN_RECHARGE_TK = 50;
const MIN_OTHER_TK = 10;
const TXN_FEE_TK = 5;
const userCoins = 12000000;

const sims = [
  { id: 'grameenphone', label: 'গ্রামীণফোন', color: '#007B3E' },
  { id: 'robl', label: 'রবি', color: '#ED1C24' },
  { id: 'banglalink', label: 'বাংলালিংক', color: '#004B93' },
  { id: 'teletalk', label: 'টেলিটক', color: '#1BA64A' },
];

const methods = [
  { id: 'bkash', label: 'বিকাশ', icon: 'phone-iphone', color: '#E2136E' },
  { id: 'nagad', label: 'নগদ', icon: 'phone-android', color: '#F5842D' },
  { id: 'rocket', label: 'রকেট', icon: 'send', color: '#CE1126' },
  { id: 'recharge', label: 'মোবাইল রিচার্জ', icon: 'sim-card', color: '#4F46E5' },
];

export default function WithdrawRequestScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [amountTk, setAmountTk] = useState('');
  const [selectedSim, setSelectedSim] = useState(null);
  const [connectionType, setConnectionType] = useState(null);

  const isRecharge = selectedMethod === 'recharge';
  const hasFee = selectedMethod && !isRecharge;
  const feeCoins = hasFee ? TXN_FEE_TK * COIN_TO_TAKA : 0;
  const amountCoins = amountTk ? parseInt(amountTk) * COIN_TO_TAKA : 0;
  const totalCoins = amountCoins + feeCoins;
  const minTk = isRecharge ? MIN_RECHARGE_TK : MIN_OTHER_TK;

  const canSubmit = selectedMethod
    && accountNumber.trim().length >= 11
    && amountTk
    && parseInt(amountTk) >= minTk
    && totalCoins <= userCoins
    && (!isRecharge || (selectedSim && connectionType));

  const handleSubmit = () => {
    if (!selectedMethod) return Alert.alert('ত্রুটি', 'একটি পদ্ধতি নির্বাচন করুন');
    if (accountNumber.trim().length < 11) return Alert.alert('ত্রুটি', 'সঠিক মোবাইল নম্বর দিন (১১ ডিজিট)');
    if (!amountTk || parseInt(amountTk) < minTk) {
      return Alert.alert('ত্রুটি', isRecharge ? `ন্যূনতম ${MIN_RECHARGE_TK} টাকা` : `ন্যূনতম ${MIN_OTHER_TK} টাকা`);
    }
    if (totalCoins > userCoins) return Alert.alert('ত্রুটি', 'পর্যাপ্ত কয়েন নেই');
    if (isRecharge && !selectedSim) return Alert.alert('ত্রুটি', 'সিম নির্বাচন করুন');
    if (isRecharge && !connectionType) return Alert.alert('ত্রুটি', 'প্রিপেইড/পোস্টপেইড নির্বাচন করুন');

    const methodName = methods.find((m) => m.id === selectedMethod)?.label || '';
    Alert.alert('রিকোয়েস্ট জমা দেওয়া হয়েছে', `আপনার ${methodName} রিকোয়েস্ট প্রক্রিয়াধীন`, [
      { text: 'ঠিক আছে', onPress: () => navigation.goBack() },
    ]);
  };

  const methodLabel = methods.find((m) => m.id === selectedMethod)?.label || '';

  return (
    <SafeAreaView style={s.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        <View style={s.balanceBar}>
          <MaterialIcons name="monetization-on" size={22} color="#F59E0B" />
          <Text style={s.balanceText}>
            ব্যালেন্স: <Text style={s.balanceBold}>{userCoins} কয়েন</Text> = {Math.floor(userCoins / COIN_TO_TAKA)} টাকা
          </Text>
        </View>

        <Text style={s.label}>পদ্ধতি নির্বাচন করুন</Text>
        <View style={s.methodRow}>
          {methods.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[s.methodBtn, selectedMethod === m.id && { borderColor: m.color, backgroundColor: m.color + '15' }]}
              onPress={() => { setSelectedMethod(m.id); setSelectedSim(null); setConnectionType(null); }}
              activeOpacity={0.7}
            >
              <MaterialIcons name={m.icon} size={22} color={selectedMethod === m.id ? m.color : colors.muted} />
              <Text style={[s.methodLabel, selectedMethod === m.id && { color: m.color }]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMethod && !isRecharge && (
          <View style={s.fieldBox}>
            <Text style={s.label}>{methodLabel} পার্সোনাল নম্বর</Text>
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
        )}

        {isRecharge && (
          <>
            <View style={s.fieldBox}>
              <Text style={s.label}>মোবাইল নম্বর</Text>
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

            <Text style={s.label}>সিম নির্বাচন করুন</Text>
            <View style={s.simRow}>
              {sims.map((sim) => (
                <TouchableOpacity
                  key={sim.id}
                  style={[s.simBtn, selectedSim === sim.id && { borderColor: sim.color, backgroundColor: sim.color + '15' }]}
                  onPress={() => setSelectedSim(sim.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[s.simLabel, selectedSim === sim.id && { color: sim.color }]}>{sim.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={s.label}>কানেকশন টাইপ</Text>
            <View style={s.connRow}>
              {['prepaid', 'postpaid'].map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[s.connBtn, connectionType === type && { backgroundColor: '#4F46E5' }]}
                  onPress={() => setConnectionType(type)}
                  activeOpacity={0.7}
                >
                  <Text style={[s.connLabel, connectionType === type && { color: '#fff' }]}>
                    {type === 'prepaid' ? 'প্রিপেইড' : 'পোস্টপেইড'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={s.label}>পরিমাণ (টাকা) — ন্যূনতম {minTk} টাকা</Text>
        <TextInput
          style={s.input}
          placeholder="০"
          placeholderTextColor={colors.muted + '80'}
          value={amountTk}
          onChangeText={setAmountTk}
          keyboardType="number-pad"
        />

        {amountTk && parseInt(amountTk) > 0 && (
          <View style={s.conversionBox}>
            <View style={s.convRow}>
              <Text style={s.convLabel}>উত্তোলন (টাকা)</Text>
              <Text style={s.convValue}>{amountTk} টাকা</Text>
            </View>
            <View style={s.convRow}>
              <Text style={s.convLabel}>প্রয়োজনীয় কয়েন</Text>
              <Text style={s.convValue}>{amountCoins} কয়েন</Text>
            </View>
            {hasFee && (
              <View style={s.convRow}>
                <Text style={s.convLabel}>ট্রানজেকশন ফি (৫ টাকা)</Text>
                <Text style={[s.convValue, { color: '#EF4444' }]}>+{feeCoins} কয়েন</Text>
              </View>
            )}
            <View style={[s.convDivider]} />
            <View style={s.convRow}>
              <Text style={[s.convLabel, { fontWeight: '700' }]}>মোট খরচ</Text>
              <Text style={[s.convValue, { fontWeight: '700' }]}>{totalCoins} কয়েন</Text>
            </View>
            <View style={s.convRow}>
              <Text style={s.convLabel}>আপনার ব্যালেন্স</Text>
              <Text style={[s.convValue, totalCoins > userCoins && { color: '#EF4444' }]}>{userCoins} কয়েন</Text>
            </View>
            {totalCoins > userCoins && (
              <Text style={s.convError}>পর্যাপ্ত কয়েন নেই! প্রয়োজন {totalCoins - userCoins} কয়েন বেশি</Text>
            )}
          </View>
        )}

        <View style={s.infoBox}>
          <MaterialIcons name="info-outline" size={16} color={colors.muted} />
          <Text style={s.infoText}>
            {isRecharge
              ? 'কোনো ফি নেই • ১০০ কয়েন = ১ টাকা • ২৪-৪৮ ঘন্টা সময় লাগতে পারে'
              : '৫ টাকা ট্রানজেকশন ফি • ১০০ কয়েন = ১ টাকা • ২৪-৪৮ ঘন্টা সময় লাগতে পারে'}
          </Text>
        </View>

        <TouchableOpacity
          style={[s.submitBtn, !canSubmit && { opacity: 0.5 }]}
          onPress={handleSubmit}
          activeOpacity={0.8}
          disabled={!canSubmit}
        >
          <MaterialIcons name="send" size={20} color="#fff" />
          <Text style={s.submitText}>রিকোয়েস্ট জমা দিন</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  balanceBar: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBEB',
    borderRadius: 12, padding: 12, marginBottom: 20,
  },
  balanceText: { fontSize: 13, color: '#92400E', marginLeft: 8, flex: 1 },
  balanceBold: { fontWeight: 'bold' },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8, marginTop: 4 },
  methodRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  methodBtn: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14,
    borderRadius: 12, borderWidth: 1, borderColor: colors.muted + '40', marginRight: 8, marginBottom: 8,
  },
  methodLabel: { fontSize: 13, color: colors.muted, marginLeft: 6, fontWeight: '500' },
  fieldBox: { marginBottom: 4 },
  input: {
    borderWidth: 1, borderColor: colors.muted + '40', borderRadius: 12,
    paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: colors.text,
    backgroundColor: colors.surface, marginBottom: 16,
  },
  simRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  simBtn: {
    paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10,
    borderWidth: 1, borderColor: colors.muted + '40', marginRight: 8, marginBottom: 8,
  },
  simLabel: { fontSize: 12, color: colors.muted, fontWeight: '500' },
  connRow: { flexDirection: 'row', marginBottom: 16 },
  connBtn: {
    paddingVertical: 8, paddingHorizontal: 20, borderRadius: 10,
    borderWidth: 1, borderColor: colors.muted + '40', marginRight: 10,
  },
  connLabel: { fontSize: 13, color: colors.text, fontWeight: '500' },
  conversionBox: {
    backgroundColor: colors.surface, borderRadius: 12, padding: 12, marginBottom: 16,
  },
  convRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  convLabel: { fontSize: 13, color: colors.muted },
  convValue: { fontSize: 13, fontWeight: '700', color: colors.text },
  convDivider: { height: 1, backgroundColor: colors.muted + '30', marginVertical: 6 },
  convError: { fontSize: 12, color: '#EF4444', fontWeight: '600', marginTop: 4 },
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface,
    borderRadius: 12, padding: 12, marginBottom: 24,
  },
  infoText: { fontSize: 12, color: colors.muted, marginLeft: 8, flex: 1, lineHeight: 18 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#4F46E5', borderRadius: 14, paddingVertical: 14,
  },
  submitText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 8 },
});
