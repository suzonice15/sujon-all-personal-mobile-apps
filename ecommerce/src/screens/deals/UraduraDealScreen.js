import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { getHomeProduct } from '../../api/homeApi';
import ProductCard from '../../components/ProductCard';

export default function UraduraDealScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { colors } = usePaperTheme();

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const res = await getHomeProduct();
      const list = Array.isArray(res) ? res : res?.data || res?.products || [];
      setProducts(list);
    } catch (e) {
      console.log('Deal load error:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerBanner}>
        <MaterialIcons name="local-fire-department" size={32} color="#EF4444" />
        <Text style={styles.headerTitle}>উরাধুরা ডিল</Text>
        <Text style={styles.headerSub}>আজকের সেরা অফারগুলো দেখুন!</Text>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item, i) => String(item.id || i)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={60} color="#ccc" />
            <Text style={styles.emptyText}>কোনো ডিল পাওয়া যায়নি</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard item={item} colors={colors} onPress={(product) => navigation.navigate('ProductDetail', { product })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerBanner: {
    alignItems: 'center', paddingVertical: 20,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#EF4444', marginTop: 6 },
  headerSub: { fontSize: 13, color: '#888', marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 15, color: '#999', marginTop: 12 },
});
