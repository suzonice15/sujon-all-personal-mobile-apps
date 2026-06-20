import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const categories = [
  { id: 'all', label: 'সব' },
  { id: 'book', label: 'বই' },
  { id: 'electronics', label: 'ইলেকট্রনিক্স' },
  { id: 'clothing', label: 'কাপড়' },
  { id: 'others', label: 'অন্যান্য' },
];

const products = [
  { id: '1', title: 'নবীদের গল্প', price: '১৫০', coinPrice: '১৫০০০', category: 'book', image: null, seller: 'Prophet App' },
  { id: '2', title: 'কুরআন তাফসির', price: '২০০', coinPrice: '২০০০০', category: 'book', image: null, seller: 'Prophet App' },
  { id: '3', title: 'টি-শার্ট (হোয়াইট)', price: '৩৫০', coinPrice: '৩৫০০০', category: 'clothing', image: null, seller: 'Prophet App' },
  { id: '4', title: 'হেডফোন', price: '৫০০', coinPrice: '৫০০০০', category: 'electronics', image: null, seller: 'Prophet App' },
  { id: '5', title: 'ইসলামিক ক্যালেন্ডার', price: '৮০', coinPrice: '৮০০০', category: 'others', image: null, seller: 'Prophet App' },
];

export default function ProductListScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = selectedCat === 'all' ? products : products.filter((p) => p.category === selectedCat);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={s.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      activeOpacity={0.7}
    >
      <View style={s.cardImage}>
        <MaterialIcons name="shopping-bag" size={32} color={colors.muted} />
      </View>
      <View style={s.cardInfo}>
        <Text style={s.cardTitle}>{item.title}</Text>
        <Text style={s.seller}>{item.seller}</Text>
        <View style={s.priceRow}>
          <Text style={s.price}>৳{item.price}</Text>
          <Text style={s.coinPrice}>{item.coinPrice} কয়েন</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.catRow} contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'center' }}>
        {categories.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[s.catBtn, selectedCat === c.id && s.catBtnActive]}
            onPress={() => setSelectedCat(c.id)}
            activeOpacity={0.7}
          >
            <Text style={[s.catText, selectedCat === c.id && s.catTextActive]}>{c.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingTop: 8 }}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  catRow: { marginTop: 8, marginBottom: 4, maxHeight: 40 },
  catBtn: {
    paddingHorizontal: 16, paddingVertical: 6, borderRadius: 16,
    backgroundColor: colors.surface, marginRight: 8, borderWidth: 1, borderColor: colors.muted + '40',
  },
  catBtnActive: { backgroundColor: '#4F46E5', borderColor: '#4F46E5' },
  catText: { fontSize: 13, fontWeight: '500', color: colors.text },
  catTextActive: { color: '#fff', fontWeight: '700' },
  card: {
    backgroundColor: colors.surface, borderRadius: 14, padding: 12, marginBottom: 14, width: '47%',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 6,
  },
  cardImage: {
    height: 100, backgroundColor: colors.background, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  cardInfo: {},
  cardTitle: { fontSize: 14, fontWeight: '700', color: colors.text },
  seller: { fontSize: 11, color: colors.muted, marginTop: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#4F46E5' },
  coinPrice: { fontSize: 10, color: colors.muted, fontWeight: '500' },
});
