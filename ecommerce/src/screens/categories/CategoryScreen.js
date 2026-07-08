import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCategoryProducts } from '../../api/homeApi';
import { useTheme as usePaperTheme } from 'react-native-paper';
import ProductCard from '../../components/ProductCard';

const sortOptions = [
  { label: 'নতুন', value: 'new' },
  { label: 'দাম (কম)', value: 'price_asc' },
  { label: 'দাম (বেশি)', value: 'price_desc' },
  { label: 'নাম', value: 'name' },
];

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('new');
  const [showSort, setShowSort] = useState(false);
  const { colors } = usePaperTheme();

  const catName = category.category_title || category.name || category.title || 'ক্যাটেগরি';
  const slug = category.slug || category.category_slug || category.category_title?.toLowerCase().replace(/\s+/g, '-');

  useLayoutEffect(() => {
    navigation.setOptions({ title: catName });
  }, [navigation, catName]);

  useEffect(() => {
    loadProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getCategoryProducts(slug);
      const list = Array.isArray(res) ? res : res?.data || res?.products || [];
      setProducts(list);
    } catch (e) {
      console.log('Category load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price_asc') return (a.offer_price || a.product_price) - (b.offer_price || b.product_price);
    if (sortBy === 'price_desc') return (b.offer_price || b.product_price) - (a.offer_price || a.product_price);
    if (sortBy === 'name') return (a.product_title || '').localeCompare(b.product_title || '');
    return 0;
  });

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.sortBtn} onPress={() => setShowSort(!showSort)}>
          <MaterialIcons name="sort" size={20} color={colors.text} />
          <Text style={[styles.sortLabel, { color: colors.text }]}>সর্ট</Text>
        </TouchableOpacity>
        <Text style={[styles.count, { color: colors.text }]}>{products.length} টি পণ্য</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <MaterialIcons name="filter-list" size={20} color={colors.text} />
          <Text style={[styles.filterLabel, { color: colors.text }]}>ফিল্টার</Text>
        </TouchableOpacity>
      </View>

      {showSort && (
        <View style={[styles.sortPanel, { backgroundColor: colors.surface }]}>
          {sortOptions.map((opt) => (
            <TouchableOpacity
              key={opt.value}
              style={[styles.sortOption, sortBy === opt.value && { backgroundColor: colors.primary + '15' }]}
              onPress={() => { setSortBy(opt.value); setShowSort(false); }}
            >
              <Text style={[styles.sortOptionText, { color: sortBy === opt.value ? colors.primary : colors.text }]}>
                {opt.label}
              </Text>
              {sortBy === opt.value && <MaterialIcons name="check" size={18} color={colors.primary} />}
            </TouchableOpacity>
          ))}
        </View>
      )}

      <FlatList
        data={sorted}
        keyExtractor={(item, i) => String(item.id || i)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={60} color="#ccc" />
            <Text style={styles.emptyText}>কোনো পণ্য পাওয়া যায়নি</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              item={item}
              colors={colors}
              onPress={(product) => navigation.navigate('ProductDetail', { product })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  sortBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  filterBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  sortLabel: { fontSize: 14, fontWeight: '600' },
  filterLabel: { fontSize: 14, fontWeight: '600' },
  count: { fontSize: 13, fontWeight: '500' },
  sortPanel: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  sortOption: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 4,
  },
  sortOptionText: { fontSize: 14, fontWeight: '500' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 15, color: '#999', marginTop: 12 },
});
