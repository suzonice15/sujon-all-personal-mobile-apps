import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bnToNumber } from '../../utils/helper';
import { useCart } from '../../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AdBanner from '../../components/ads/AdBanner';

export default function CartScreen({ navigation }) {
  const { items, updateQty, removeItem } = useCart();
  const insets = useSafeAreaInsets();
  const sty = styles;

  const subtotal = items.reduce((sum, item) => sum + bnToNumber(item.price) * item.qty, 0);
  const totalCoin = items.reduce((sum, item) => sum + bnToNumber(item.coinPrice) * item.qty, 0);

  const renderItem = ({ item }) => (
    <View style={sty.itemCard}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={sty.itemImg} resizeMode="cover" />
      ) : (
        <View style={[sty.itemImg, { backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' }]}>
          <MaterialIcons name="shopping-bag" size={28} color="#CCC" />
        </View>
      )}
      <View style={sty.itemBody}>
        <Text style={sty.itemTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={sty.itemPrice}>৳{bnToNumber(item.price)}</Text>
        <View style={sty.itemControls}>
          <TouchableOpacity style={sty.qtyBtn} onPress={() => updateQty(item.id, -1)}>
            <MaterialIcons name="remove" size={16} color="#1F2937" />
          </TouchableOpacity>
          <Text style={sty.qtyText}>{item.qty}</Text>
          <TouchableOpacity style={sty.qtyBtn} onPress={() => updateQty(item.id, 1)}>
            <MaterialIcons name="add" size={16} color="#1F2937" />
          </TouchableOpacity>
          <TouchableOpacity style={sty.removeBtn} onPress={() => removeItem(item.id)}>
            <MaterialIcons name="delete-outline" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const cartItems = Array.isArray(items) ? items : [];

  return (
    <SafeAreaView style={sty.container}>
      <View style={{ flex: 1 }}>
      {cartItems.length === 0 ? (
        <View style={sty.empty}>
          <MaterialIcons name="shopping-cart" size={64} color="#DDD" />
          <Text style={sty.emptyTitle}>কার্ট খালি</Text>
          <Text style={sty.emptySub}>প্রোডাক্ট যোগ করে দেখুন</Text>
          <TouchableOpacity style={sty.shopBtn} onPress={() => navigation.goBack()}>
            <Text style={sty.shopBtnText}>প্রোডাক্ট দেখুন</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: Platform.OS === 'android' ? 140 : 120 }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AdBanner />
      </View>

      {cartItems.length > 0 && (
        <View style={[sty.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
          <View style={sty.totalSection}>
            <Text style={sty.totalLabel}>মোট</Text>
            <Text style={sty.totalPrice}>৳{subtotal}</Text>
            <Text style={sty.totalCoin}>+{totalCoin} কয়েন</Text>
          </View>
          <TouchableOpacity style={sty.checkoutBtn} onPress={() => navigation.navigate('Checkout')} activeOpacity={0.8}>
            <Text style={sty.checkoutText}>চেকআউট</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  itemCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 14, padding: 12, marginBottom: 10,
    elevation: 0, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  itemImg: { width: 80, height: 80, borderRadius: 10, marginRight: 12 },
  itemBody: { flex: 1, justifyContent: 'center' },
  itemTitle: { fontSize: 14, fontWeight: '700', color: '#1F2937' },
  itemPrice: { fontSize: 16, fontWeight: 'bold', color: '#4F46E5', marginTop: 4 },
  itemControls: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center',
  },
  qtyText: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginHorizontal: 12 },
  removeBtn: { marginLeft: 16 },

  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', color: '#999', marginTop: 16 },
  emptySub: { fontSize: 14, color: '#BBB', marginTop: 6 },
  shopBtn: {
    marginTop: 20, backgroundColor: '#4F46E5',
    borderRadius: 10, paddingHorizontal: 24, paddingVertical: 12,
  },
  shopBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 12,
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
  },
  totalSection: { flex: 1 },
  totalLabel: { fontSize: 10, color: '#999' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#4F46E5' },
  totalCoin: { fontSize: 10, color: '#F59E0B', fontWeight: '600' },
  checkoutBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#4F46E5', borderRadius: 12,
    paddingHorizontal: 24, paddingVertical: 13,
  },
  checkoutText: { color: '#fff', fontSize: 15, fontWeight: '700', marginRight: 6 },
});
