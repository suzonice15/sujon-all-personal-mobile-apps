import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { colors } = useTheme();
  const s = styles(colors);

  const handleBuy = () => {
    Alert.alert('অর্ডার কনফার্মেশন', `আপনি কি "${product.title}" অর্ডার করতে চান?\n\nমূল্য: ${product.coinPrice} কয়েন`, [
      { text: 'না', style: 'cancel' },
      {
        text: 'হ্যাঁ', onPress: () => {
          Alert.alert('অর্ডার সফল', 'আপনার অর্ডার গৃহীত হয়েছে', [{ text: 'ঠিক আছে', onPress: () => navigation.goBack() }]);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={s.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={s.imageBox}>
          <MaterialIcons name="shopping-bag" size={64} color={colors.muted} />
        </View>

        <Text style={s.title}>{product.title}</Text>
        <Text style={s.seller}>{product.seller}</Text>

        <View style={s.priceSection}>
          <View style={s.priceBox}>
            <Text style={s.priceLabel}>টাকা মূল্য</Text>
            <Text style={s.priceValue}>৳{product.price}</Text>
          </View>
          <View style={s.priceBox}>
            <Text style={s.priceLabel}>কয়েন মূল্য</Text>
            <Text style={s.coinValue}>{product.coinPrice} কয়েন</Text>
          </View>
        </View>

        <View style={s.infoBox}>
          <MaterialIcons name="info-outline" size={16} color={colors.muted} />
          <Text style={s.infoText}>অর্ডার কনফার্ম করার পর ২৪-৪৮ ঘন্টার মধ্যে প্রোডাক্ট ডেলিভারি প্রক্রিয়া শুরু হবে</Text>
        </View>

        <TouchableOpacity style={s.buyBtn} onPress={handleBuy} activeOpacity={0.8}>
          <MaterialIcons name="shopping-cart" size={20} color="#fff" />
          <Text style={s.buyText}>এখনই অর্ডার করুন</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  imageBox: {
    height: 200, backgroundColor: colors.surface, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.text },
  seller: { fontSize: 14, color: colors.muted, marginTop: 4, marginBottom: 20 },
  priceSection: { flexDirection: 'row', marginBottom: 24 },
  priceBox: {
    flex: 1, backgroundColor: colors.surface, borderRadius: 12, padding: 14, marginRight: 8,
    alignItems: 'center',
  },
  priceLabel: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  priceValue: { fontSize: 22, fontWeight: 'bold', color: '#4F46E5' },
  coinValue: { fontSize: 16, fontWeight: 'bold', color: '#F59E0B' },
  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface,
    borderRadius: 12, padding: 12, marginBottom: 24,
  },
  infoText: { fontSize: 12, color: colors.muted, marginLeft: 8, flex: 1, lineHeight: 18 },
  buyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#4F46E5', borderRadius: 14, paddingVertical: 14,
  },
  buyText: { color: '#fff', fontSize: 16, fontWeight: '700', marginLeft: 8 },
});
