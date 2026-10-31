import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity,
  Image, ActivityIndicator, Alert, Modal, FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { getAllAddress, editAddress } from '../../api/addressApi';
import { placeOrder } from '../../api/checkoutApi';
import LoginScreen from '../auth/LoginScreen';
import AddressFormModal from '../../components/AddressFormModal';

const SHIPPING_CHARGE = 100;

const fmtPrice = (val) => {
  const n = Number(val) || 0;
  return '৳ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const PAYMENT_METHODS = [
  { key: 'cash_on_delevery', label: 'Cash On Delivery', icon: 'local-shipping' },
  { key: 'online_payment', label: 'Online Payment', icon: 'credit-card' },
];

export default function CheckoutScreen({ navigation }) {
  const { colors } = useTheme();
  const { user, token } = useAuth();
  const { items, clearCart } = useCart();

  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressPickerOpen, setAddressPickerOpen] = useState(false);
  const [addAddressOpen, setAddAddressOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [paymentType, setPaymentType] = useState('cash_on_delevery');
  const [customerNote, setCustomerNote] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const fetchAddresses = useCallback(async () => {
    if (!user?.id) return;
    setLoadingAddresses(true);
    try {
      const res = await getAllAddress(user.id);
      const list = Array.isArray(res) ? res : [];
      setAddresses(list);
      setSelectedAddress((prev) => prev || list.find((a) => Number(a.status) === 1) || list[0] || null);
    } catch {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  useEffect(() => {
    navigation.addListener?.('focus', fetchAddresses);
  }, [navigation, fetchAddresses]);

  const handleAddressSaved = async () => {
    const prevIds = new Set(addresses.map((a) => a.address_id));
    const selectedId = selectedAddress?.address_id;
    try {
      const res = await getAllAddress(user.id);
      const list = Array.isArray(res) ? res : [];
      setAddresses(list);
      const stillSelected = selectedId && list.find((a) => a.address_id === selectedId);
      if (stillSelected) {
        setSelectedAddress(stillSelected);
        return;
      }
      const newlyAdded = list.find((a) => !prevIds.has(a.address_id));
      setSelectedAddress(newlyAdded || list[list.length - 1] || list[0] || null);
    } catch {}
  };

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddAddressOpen(true);
  };

  const openEditAddress = (id) => {
    setEditingAddressId(id);
    setAddAddressOpen(true);
    setAddressPickerOpen(false);
  };

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.qty || 1), 0);
  const total = subtotal + SHIPPING_CHARGE;

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      Alert.alert('Error', 'Please select a delivery address');
      return;
    }
    if (!agreed) {
      Alert.alert('Error', 'Please agree to the Terms & Conditions');
      return;
    }
    setPlacing(true);
    try {
      const addrRes = await editAddress(user.id, selectedAddress.address_id, token);
      const addr = addrRes?.address;
      if (!addr) throw new Error('Failed to resolve address');

      const res = await placeOrder({
        auth: 'login',
        login_success: true,
        user_id: user.id,
        name: user.name,
        phone: user.phone,
        address: addr.address,
        division_id: addr.division_id,
        district_id: addr.district_id,
        upazila_id: addr.upazila_id,
        payment_type: paymentType,
        emi_option: 2,
        customer_note: customerNote,
        checked: '1',
        shipping_charge: SHIPPING_CHARGE,
        subtotal,
        order_total: total,
      });

      clearCart();
      if (paymentType === 'cash_on_delevery') {
        Alert.alert('Success', 'Thank you for your order!');
        navigation.navigate('Account', { screen: 'Dashboard', params: { tab: 'orders' } });
      } else {
        navigation.navigate('PaymentWebView', {
          url: `https://adminpanel.jncomputerbd.com/pay/${res.order_id}?amount=${res.amount}`,
        });
      }
    } catch (e) {
      Alert.alert('Error', e?.response?.data?.message || 'Failed to place order. Please make sure your cart is not empty.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={s.content}>
        {/* Delivery Address */}
        <View style={[s.card, { backgroundColor: colors.surface }]}>
          <View style={s.cardHeaderRow}>
            <Text style={[s.cardTitle, { color: colors.text }]}>Delivery Address</Text>
            <TouchableOpacity onPress={() => setAddressPickerOpen(true)}>
              <Text style={[s.changeLink, { color: colors.primary }]}>Change</Text>
            </TouchableOpacity>
          </View>
          {loadingAddresses ? (
            <ActivityIndicator color={colors.primary} />
          ) : selectedAddress ? (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ flex: 1 }}>
                <Text style={[s.addressText, { color: colors.text }]}>{selectedAddress.address}</Text>
                <Text style={[s.addressSub, { color: colors.onSurface + '70' }]}>
                  {[selectedAddress.upazilas_name, selectedAddress.district_name, selectedAddress.division_name].filter(Boolean).join(', ')}
                </Text>
                <Text style={[s.addressSub, { color: colors.onSurface + '70' }]}>{user?.phone}</Text>
              </View>
              <TouchableOpacity
                style={s.editAddressBtn}
                onPress={() => openEditAddress(selectedAddress.address_id)}
              >
                <MaterialIcons name="edit" size={16} color={colors.primary} />
                <Text style={[s.changeLink, { color: colors.primary }]}>Edit</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={s.addAddressBtn}
              onPress={openAddAddress}
            >
              <MaterialIcons name="add-location-alt" size={18} color={colors.primary} />
              <Text style={[s.addAddressText, { color: colors.primary }]}>Add a delivery address</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Payment Method */}
        <View style={[s.card, { backgroundColor: colors.surface }]}>
          <Text style={[s.cardTitle, { color: colors.text, marginBottom: 10 }]}>Payment Method</Text>
          {PAYMENT_METHODS.map((m) => (
            <TouchableOpacity key={m.key} style={s.paymentRow} onPress={() => setPaymentType(m.key)}>
              <MaterialIcons
                name={paymentType === m.key ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={20}
                color={paymentType === m.key ? colors.primary : colors.onSurface + '40'}
              />
              <MaterialIcons name={m.icon} size={18} color={colors.onSurface + '70'} style={{ marginLeft: 10 }} />
              <Text style={[s.paymentLabel, { color: colors.text }]}>{m.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Summary */}
        <View style={[s.card, { backgroundColor: colors.surface }]}>
          <Text style={[s.cardTitle, { color: colors.text, marginBottom: 10 }]}>Order Summary</Text>
          {items.map((item, i) => (
            <View key={item.id || item.product_id || i} style={s.itemRow}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={s.itemImage} resizeMode="contain" />
              ) : (
                <View style={[s.itemImage, { backgroundColor: '#F3F4F6' }]} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={[s.itemName, { color: colors.text }]} numberOfLines={2}>{item.name || item.title}</Text>
                <Text style={[s.itemQty, { color: colors.onSurface + '60' }]}>Qty: {item.qty || 1} × {fmtPrice(item.price)}</Text>
              </View>
              <Text style={[s.itemSubtotal, { color: colors.text }]}>{fmtPrice((item.price || 0) * (item.qty || 1))}</Text>
            </View>
          ))}
          <View style={s.divider} />
          <View style={s.summaryRow}>
            <Text style={[s.summaryLabel, { color: colors.onSurface + '70' }]}>Sub-Total</Text>
            <Text style={[s.summaryValue, { color: colors.text }]}>{fmtPrice(subtotal)}</Text>
          </View>
          <View style={s.summaryRow}>
            <Text style={[s.summaryLabel, { color: colors.onSurface + '70' }]}>Shipping Charge</Text>
            <Text style={[s.summaryValue, { color: colors.text }]}>{fmtPrice(SHIPPING_CHARGE)}</Text>
          </View>
          <View style={s.summaryRow}>
            <Text style={[s.summaryLabel, { color: colors.text, fontWeight: '700' }]}>Total</Text>
            <Text style={[s.summaryValue, { color: colors.primary, fontWeight: '800', fontSize: 16 }]}>{fmtPrice(total)}</Text>
          </View>
        </View>

        {/* Order Note */}
        <View style={[s.card, { backgroundColor: colors.surface }]}>
          <Text style={[s.cardTitle, { color: colors.text, marginBottom: 10 }]}>Order Note</Text>
          <TextInput
            style={[s.noteInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
            placeholder="Add comments about your order"
            placeholderTextColor={colors.onSurface + '50'}
            value={customerNote}
            onChangeText={setCustomerNote}
            multiline
          />
        </View>

        {/* Terms */}
        <TouchableOpacity
          style={[s.termsRow, { backgroundColor: colors.surface, borderColor: agreed ? colors.primary : colors.onSurface + '15' }]}
          onPress={() => setAgreed((v) => !v)}
          activeOpacity={0.7}
        >
          <View
            style={[
              s.checkbox,
              {
                backgroundColor: agreed ? colors.primary : 'transparent',
                borderColor: agreed ? colors.primary : colors.onSurface + '40',
              },
            ]}
          >
            {agreed && <MaterialIcons name="check" size={18} color="#fff" />}
          </View>
          <Text style={[s.termsText, { color: colors.onSurface + '80' }]}>
            I agree to the{' '}
            <Text
              style={{ color: colors.primary, fontWeight: '600' }}
              onPress={() => navigation.navigate('CmsPage', { link: 'terms-and-conditions', title: 'Terms & Conditions' })}
            >
              Terms & Conditions
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[s.footer, { backgroundColor: colors.surface, borderTopColor: colors.onSurface + '10' }]}>
        <TouchableOpacity
          style={[s.placeOrderBtn, { backgroundColor: colors.primary }, placing && { opacity: 0.7 }]}
          onPress={handlePlaceOrder}
          disabled={placing}
        >
          {placing ? <ActivityIndicator color="#fff" /> : <Text style={s.placeOrderText}>Place Order · {fmtPrice(total)}</Text>}
        </TouchableOpacity>
      </View>

      <Modal visible={addressPickerOpen} transparent animationType="slide" onRequestClose={() => setAddressPickerOpen(false)}>
        <View style={s.modalOverlay}>
          <View style={[s.modalSheet, { backgroundColor: colors.surface }]}>
            <View style={s.modalHeader}>
              <Text style={[s.cardTitle, { color: colors.text }]}>Select Address</Text>
              <TouchableOpacity onPress={() => setAddressPickerOpen(false)}>
                <MaterialIcons name="close" size={22} color={colors.onSurface + '70'} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={addresses}
              keyExtractor={(item) => String(item.address_id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={s.addressOption}
                  onPress={() => { setSelectedAddress(item); setAddressPickerOpen(false); }}
                >
                  <MaterialIcons
                    name={selectedAddress?.address_id === item.address_id ? 'radio-button-checked' : 'radio-button-unchecked'}
                    size={20}
                    color={selectedAddress?.address_id === item.address_id ? colors.primary : colors.onSurface + '40'}
                  />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={[s.addressText, { color: colors.text }]}>{item.address}</Text>
                    <Text style={[s.addressSub, { color: colors.onSurface + '60' }]}>
                      {[item.upazilas_name, item.district_name, item.division_name].filter(Boolean).join(', ')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={s.editIconBtn}
                    onPress={() => openEditAddress(item.address_id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <MaterialIcons name="edit" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ color: colors.onSurface + '50', padding: 16 }}>No saved addresses</Text>}
            />
            <TouchableOpacity
              style={[s.addAddressBtn, { justifyContent: 'center', paddingVertical: 12 }]}
              onPress={() => {
                setAddressPickerOpen(false);
                openAddAddress();
              }}
            >
              <MaterialIcons name="add" size={18} color={colors.primary} />
              <Text style={[s.addAddressText, { color: colors.primary }]}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AddressFormModal
        visible={addAddressOpen}
        onClose={() => { setAddAddressOpen(false); setEditingAddressId(null); }}
        addressId={editingAddressId}
        colors={colors}
        onSaved={handleAddressSaved}
      />

      <Modal
        visible={!user}
        transparent
        animationType="fade"
        onRequestClose={() => navigation.goBack()}
      >
        <View style={s.loginModalOverlay}>
          <View style={s.loginModalCard}>
            <LoginScreen
              navigation={navigation}
              route={{ params: {} }}
              onSuccess={() => {}}
              onBack={() => navigation.goBack()}
              compact
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 20 },
  card: {
    borderRadius: 14, padding: 16, marginBottom: 14,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 15, fontWeight: '700' },
  changeLink: { fontSize: 13, fontWeight: '600' },
  addressText: { fontSize: 14, fontWeight: '600' },
  addressSub: { fontSize: 12, marginTop: 3 },
  addAddressBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  addAddressText: { fontSize: 14, fontWeight: '600' },
  editAddressBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 8 },
  editIconBtn: { padding: 4, marginLeft: 6 },
  paymentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  paymentLabel: { fontSize: 14, marginLeft: 8 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  itemImage: { width: 44, height: 44, borderRadius: 8 },
  itemName: { fontSize: 13, fontWeight: '600' },
  itemQty: { fontSize: 12, marginTop: 2 },
  itemSubtotal: { fontSize: 13, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#E5E7EB', marginVertical: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '600' },
  noteInput: { borderWidth: 1, borderRadius: 10, padding: 10, minHeight: 60, fontSize: 14, textAlignVertical: 'top' },
  termsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    borderRadius: 14, borderWidth: 1.5, marginBottom: 14,
    elevation: 1, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  checkbox: {
    width: 26, height: 26, borderRadius: 8, borderWidth: 2,
    alignItems: 'center', justifyContent: 'center',
  },
  termsText: { fontSize: 14, flex: 1, lineHeight: 20 },
  footer: { padding: 16, borderTopWidth: 1 },
  placeOrderBtn: { height: 50, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  placeOrderText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalSheet: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, maxHeight: '75%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  addressOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  loginModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  loginModalCard: { width: '90%', maxWidth: 400, height: 560, maxHeight: '85%', borderRadius: 20, overflow: 'hidden', backgroundColor: '#fff' },
});
