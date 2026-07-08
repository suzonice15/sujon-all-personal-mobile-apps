import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getSliders, getHomeCategory, getHomeProduct } from '../../api/homeApi';
import { useTheme as usePaperTheme } from 'react-native-paper';
import BannerSlider from '../../components/BannerSlider';
import CategoryGrid from '../../components/CategoryGrid';
import ProductCard from '../../components/ProductCard';

const s = StyleSheet.create({
  container: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 4 },
  sectionSub: { fontSize: 12, color: '#999', marginBottom: 4 },
});

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [sliders, setSliders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = usePaperTheme();

  const loadData = useCallback(async (force = false) => {
    if (!force && products.length > 0) return;
    setLoading(true);
    try {
      const [prodRes, sliderRes, catRes] = await Promise.all([
        getHomeProduct(),
        getSliders(),
        getHomeCategory(),
      ]);

      console.log('HomeScreen data:', prodRes)

      const extractArray = (res) => {
        if (Array.isArray(res)) return res;
        if (res?.data && Array.isArray(res.data)) return res.data;
        if (res?.sliders && Array.isArray(res.sliders)) return res.sliders;
        if (res?.categories && Array.isArray(res.categories)) return res.categories;
        if (res?.products && Array.isArray(res.products)) return res.products;
        return [];
      };

      setProducts(extractArray(prodRes));
      setSliders(extractArray(sliderRes));
      setCategories(extractArray(catRes));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [products.length]);

  useFocusEffect(
    useCallback(() => {
      if (products.length === 0) loadData();
    }, [products.length, loadData])
  );

  return (
    <SafeAreaView style={[s.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <BannerSlider data={sliders} />
            <View style={{ paddingHorizontal: 16 }}>
              <CategoryGrid data={categories} colors={colors} onPress={(item) => navigation.navigate('CategoryPage', { category: item })} />
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
              <Text style={[s.sectionTitle, { color: colors.text }]}>Popular Products</Text>
              <Text style={s.sectionSub}>Check & Get Your Desired Popular Product!</Text>
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 16 }}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 16 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => loadData(true)} />
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
    </SafeAreaView>
  );
}
