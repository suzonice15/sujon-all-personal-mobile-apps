import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BottomBar({ onAddToCart, onBuyNow, insets = { bottom: 0 } }) {
  return (
    <View style={[styles.bar, { paddingBottom: insets.bottom + 12 }]}>
      <TouchableOpacity style={styles.btnCart} onPress={onAddToCart} activeOpacity={0.8}>
        <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
        <Text style={styles.btnCartText}>Add to Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnBuy} onPress={onBuyNow} activeOpacity={0.8}>
        <MaterialIcons name="flash-on" size={20} color="#fff" />
        <Text style={styles.btnBuyText}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingTop: 10,
    backgroundColor: '#fff',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 15,
  },
  btnCart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#EB592C',
    shadowColor: '#EB592C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnCartText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  btnBuy: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnBuyText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
});
