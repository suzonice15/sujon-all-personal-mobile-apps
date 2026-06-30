import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Alert, Platform, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bnToNumber } from '../../utils/helper';
import { useCart } from '../../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const deliveryCharge = 60;

const paymentMethods = [
  { id: 'cod', label: 'নগদ (Cash on Delivery)', icon: 'payments' },
  { id: 'coin', label: 'কয়েন পেমেন্ট', icon: 'stars' },
  { id: 'bkash', label: 'বিকাশ', icon: 'phone-iphone' },
];

const sty = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  section: {
    backgroundColor: '#fff', borderRadius: 14,
    padding: 16, marginBottom: 12,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#1F2937', marginLeft: 8 },
  input: {
    backgroundColor: '#F9FAFB', borderRadius: 10,
    borderWidth: 1, borderColor: '#E5E7EB',
    paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 13, color: '#1F2937', marginBottom: 10,
  },
  inputArea: { minHeight: 70, textAlignVertical: 'top' },
  paymentCard: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 12, paddingHorizontal: 14,
    borderRadius: 10, marginBottom: 8,
    borderWidth: 1, borderColor: '#E5E7EB',
  },
  paymentActive: { borderColor: '#4F46E5', backgroundColor: '#F5F3FF' },
  paymentText: { flex: 1, fontSize: 13, color: '#666', marginLeft: 10 },
  paymentTextActive: { color: '#4F46E5', fontWeight: '600' },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: '#D1D5DB',
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: '#4F46E5' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4F46E5' },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  summaryName: { fontSize: 13, color: '#666', flex: 1 },
  summaryPrice: { fontSize: 13, fontWeight: '600', color: '#1F2937' },
  summaryLabel: { fontSize: 12, color: '#999' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 8 },
  totalLabel: { fontSize: 15, fontWeight: '700', color: '#1F2937' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5' },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
  },
  bottomTotal: { marginRight: 12 },
  bottomTotalLabel: { fontSize: 10, color: '#999' },
  bottomTotalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5' },
  orderBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#059669',
    borderRadius: 12, paddingVertical: 13,
  },
  orderBtnText: { color: '#fff', fontSize: 14, fontWeight: '700', marginLeft: 8 },
});

export default function CheckoutScreen({ navigation }) {
  const { items, clearCart } = useCart();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('cod');

  const subtotal = items.reduce((sum, item) => sum + bnToNumber(item.price) * item.qty, 0);
  const total = subtotal + deliveryCharge;

  const handleOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('তথ্য দিন', 'অনুগ্রহ করে আপনার নাম, ফোন ও ঠিকানা দিন');
      return;
    }
    Alert.alert('অর্ডার সফল', `আপনার অর্ডার গৃহীত হয়েছে!\n\nপ্রোডাক্ট: ${items.length}টি\nমোট: ৳${total}\nপেমেন্ট: ${paymentMethods.find((p) => p.id === payment)?.label}\nঠিকানা: ${address}`, [
      { text: 'ঠিক আছে', onPress: () => { clearCart(); navigation.popToTop(); } },
    ]);
  };

  return (
    <SafeAreaView style={sty.container}>
      {items.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <MaterialIcons name="shopping-cart" size={64} color="#DDD" />
          <Text style={{ fontSize: 16, color: '#999', marginTop: 12 }}>কার্ট খালি, চেকআউট impossible</Text>
        </View>
      ) : (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: Platform.OS === 'android' ? 140 : 120 }}>
        <View style={sty.section}>
          <View style={sty.sectionHeader}>
            <MaterialIcons name="location-on" size={18} color="#4F46E5" />
            <Text style={sty.sectionTitle}>ডেলিভারি ঠিকানা</Text>
          </View>
          <TextInput style={sty.input} placeholder="আপনার নাম" placeholderTextColor="#999" value={name} onChangeText={setName} />
          <TextInput style={sty.input} placeholder="ফোন নম্বর" placeholderTextColor="#999" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput style={[sty.input, sty.inputArea]} placeholder="ঠিকানা (জেলা, থানা, গ্রাম/রাস্তা)" placeholderTextColor="#999" value={address} onChangeText={setAddress} multiline />
        </View>

        <View style={sty.section}>
          <View style={sty.sectionHeader}>
            <MaterialIcons name="credit-card" size={18} color="#4F46E5" />
            <Text style={sty.sectionTitle}>পেমেন্ট মেথড</Text>
          </View>
          {paymentMethods.map((pm) => (
            <TouchableOpacity key={pm.id} style={[sty.paymentCard, payment === pm.id && sty.paymentActive]} onPress={() => setPayment(pm.id)} activeOpacity={0.7}>
              <MaterialIcons name={pm.icon} size={20} color={payment === pm.id ? '#4F46E5' : '#999'} />
              <Text style={[sty.paymentText, payment === pm.id && sty.paymentTextActive]}>{pm.label}</Text>
              <View style={[sty.radio, payment === pm.id && sty.radioActive]}>
                {payment === pm.id && <View style={sty.radioDot} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={sty.section}>
          <View style={sty.sectionHeader}>
            <MaterialIcons name="receipt" size={18} color="#4F46E5" />
            <Text style={sty.sectionTitle}>অর্ডার সামারি</Text>
          </View>
          {items.length === 0 ? (
            <Text style={{ fontSize: 13, color: '#999', textAlign: 'center', paddingVertical: 20 }}>কার্টে কোনো প্রোডাক্ট নেই</Text>
          ) : items.map((item) => (
            <View key={item.id} style={sty.summaryRow}>
              <Text style={sty.summaryName} numberOfLines={1}>{item.title} × {item.qty}</Text>
              <Text style={sty.summaryPrice}>৳{bnToNumber(item.price) * item.qty}</Text>
            </View>
          ))}
          <View style={sty.divider} />
          <View style={sty.summaryRow}>
            <Text style={sty.summaryLabel}>সাবটোটাল</Text>
            <Text style={sty.summaryLabel}>৳{subtotal}</Text>
          </View>
          <View style={sty.summaryRow}>
            <Text style={sty.summaryLabel}>ডেলিভারি চার্জ</Text>
            <Text style={sty.summaryLabel}>৳{deliveryCharge}</Text>
          </View>
          <View style={sty.divider} />
          <View style={sty.summaryRow}>
            <Text style={sty.totalLabel}>মোট</Text>
            <Text style={sty.totalPrice}>৳{total}</Text>
          </View>
        </View>
      </ScrollView>
      )}

      {items.length > 0 && (
        <View style={[sty.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={sty.bottomTotal}>
            <Text style={sty.bottomTotalLabel}>পেমেন্ট</Text>
            <Text style={sty.bottomTotalPrice}>৳{total}</Text>
          </View>
          <TouchableOpacity style={sty.orderBtn} onPress={handleOrder} activeOpacity={0.8}>
            <MaterialIcons name="check-circle" size={20} color="#fff" />
            <Text style={sty.orderBtnText}>অর্ডার কনফার্ম করুন</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
