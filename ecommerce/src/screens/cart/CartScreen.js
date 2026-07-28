import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useCart } from '../../context/CartContext';

const fmtPrice = (val) => {
  const n = Number(val);
  return isNaN(n) ? '0' : n.toLocaleString('en-IN');
};

export default function CartScreen({ navigation }) {
  const { items, removeItem, updateQty, clearCart } = useCart();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={[s.cartItem, { backgroundColor: colors.surface }]}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={s.itemImage} resizeMode="contain" />
      ) : (
        <View style={[s.itemImage, { backgroundColor: '#F3F4F6' }]}>
          <MaterialIcons name="image" size={28} color="#D1D5DB" />
        </View>
      )}
      <View style={s.itemInfo}>
        <Text style={[s.itemName, { color: colors.text }]} numberOfLines={2}>
          {item.name || item.title || 'Product'}
        </Text>
        <Text style={[s.itemPrice, { color: colors.primary }]}>৳{fmtPrice(item.price)}</Text>
        <View style={s.qtyRow}>
          <TouchableOpacity onPress={() => updateQty(item.id, -1)} style={[s.qtyBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="remove" size={16} color="#fff" />
          </TouchableOpacity>
          <Text style={[s.qtyText, { color: colors.text }]}>{item.qty || 1}</Text>
          <TouchableOpacity onPress={() => updateQty(item.id, 1)} style={[s.qtyBtn, { backgroundColor: colors.primary }]}>
            <MaterialIcons name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.itemRight}>
        <Text style={[s.itemSubtotal, { color: colors.text }]}>৳{fmtPrice((item.price || 0) * (item.qty || 1))}</Text>
        <TouchableOpacity onPress={() => removeItem(item.id)} style={s.deleteBtn}>
          <MaterialIcons name="delete-outline" size={22} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const subtotal = items.reduce((sum, i) => sum + (Number(i.price) || 0) * (i.qty || 1), 0);

  if (items.length === 0) {
    return (
      <View style={[s.emptyContainer, { backgroundColor: colors.background }]}>
        <MaterialIcons name="shopping-cart" size={80} color="#D1D5DB" />
        <Text style={[s.emptyTitle, { color: colors.text }]}>Cart is Empty</Text>
        <Text style={[s.emptySub, { color: '#9CA3AF' }]}>No items in your cart</Text>
        <TouchableOpacity
          style={[s.shopBtn, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={s.shopBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={s.listHeader}>
            <Text style={[s.itemCount, { color: '#6B7280' }]}>
              {items.length} item{items.length > 1 ? 's' : ''}
            </Text>
            <TouchableOpacity onPress={clearCart}>
              <Text style={[s.clearBtn, { color: '#EF4444' }]}>Clear All</Text>
            </TouchableOpacity>
          </View>
        }
      />
      <View style={[s.footer, { backgroundColor: '#fff', borderTopColor: '#E5E7EB' }]}>
        <View style={s.totalRow}>
          <Text style={[s.totalLabel, { color: '#374151' }]}>Total:</Text>
          <Text style={[s.totalAmount, { color: colors.primary }]}>৳{fmtPrice(subtotal)}</Text>
        </View>
        <TouchableOpacity style={[s.checkoutBtn, { backgroundColor: '#25D366' }]}>
          <MaterialIcons name="whatsapp" size={20} color="#fff" />
          <Text style={s.checkoutText}>Complete Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 12, paddingBottom: 140 },
  listHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 8, paddingHorizontal: 4,
  },
  itemCount: { fontSize: 13, fontWeight: '500' },
  clearBtn: { fontSize: 13, fontWeight: '600' },
  cartItem: {
    flexDirection: 'row', borderRadius: 12, padding: 12, marginBottom: 10,
    alignItems: 'center', elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  itemImage: {
    width: 70, height: 70, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  itemInfo: { flex: 1, marginLeft: 12 },
  itemName: { fontSize: 14, fontWeight: '600' },
  itemPrice: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: {
    width: 26, height: 26, borderRadius: 6,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyText: { fontSize: 15, fontWeight: '600', marginHorizontal: 10 },
  itemRight: { alignItems: 'flex-end', gap: 8 },
  itemSubtotal: { fontSize: 14, fontWeight: '700' },
  deleteBtn: { padding: 4 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '700', marginTop: 16 },
  emptySub: { fontSize: 14, marginTop: 6 },
  shopBtn: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10, marginTop: 20 },
  shopBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 16, paddingBottom: 24,
    borderTopWidth: 1, elevation: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08, shadowRadius: 8,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 16, fontWeight: '600' },
  totalAmount: { fontSize: 18, fontWeight: '800' },
  checkoutBtn: {
    flexDirection: 'row', borderRadius: 12, paddingVertical: 14,
    alignItems: 'center', justifyContent: 'center', gap: 8,
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
