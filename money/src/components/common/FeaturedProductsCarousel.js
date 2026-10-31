import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { productBackgroundColors, productImages, products } from '../../data/products';

const featuredProducts = products.slice(0, 6);

export default function FeaturedProductsCarousel({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);

  const openProduct = (product) => {
    navigation.navigate('ProductList', {
      screen: 'ProductDetail',
      params: { product },
    });
  };

  return (
    <View style={s.section}>
      <View style={s.header}>
        <View>
          <Text style={s.title}>নতুন পণ্য</Text>
          <Text style={s.subtitle}>পছন্দের পণ্যটি দেখে নিন</Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.navigate('ProductList')}
          style={s.viewAll}
          activeOpacity={0.7}
        >
          <Text style={s.viewAllText}>সব দেখুন</Text>
          <MaterialIcons name="arrow-forward" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={featuredProducts}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={s.list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => openProduct(item)}
            style={s.productCard}
            activeOpacity={0.8}
          >
            <View style={[s.imageWrap, { backgroundColor: productBackgroundColors[index] }]}>
              <Image
                source={{ uri: productImages[index] }}
                style={s.image}
                resizeMode="cover"
              />
              <View style={s.imageBadge}>
                <MaterialIcons name="star" size={12} color="#F59E0B" />
                <Text style={s.rating}>{item.rating.toFixed(1)}</Text>
              </View>
            </View>
            <View style={s.details}>
              <Text numberOfLines={1} style={s.productName}>{item.title}</Text>
              <Text style={s.seller}>{item.seller}</Text>
              <View style={s.priceRow}>
                <Text style={s.price}>৳{item.price}</Text>
                <View style={s.coinPrice}>
                  <MaterialIcons name="stars" size={13} color="#E9A400" />
                  <Text style={s.coinText}>{item.coinPrice}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  section: {
    marginBottom: 20,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  title: {
    color: colors.onSurface,
    fontSize: 18,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.onSurface,
    fontSize: 12,
    marginTop: 3,
    opacity: 0.65,
  },
  viewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 7,
    paddingLeft: 10,
  },
  viewAllText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    paddingVertical: 3,
    paddingRight: 4,
    gap: 12,
  },
  productCard: {
    width: 176,
    borderRadius: 14,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  imageWrap: {
    height: 118,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.94)',
  },
  rating: {
    color: '#29303D',
    fontSize: 11,
    fontWeight: '700',
  },
  details: {
    paddingHorizontal: 11,
    paddingTop: 10,
    paddingBottom: 12,
  },
  productName: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  seller: {
    color: colors.onSurface,
    fontSize: 11,
    marginTop: 3,
    opacity: 0.55,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  price: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '800',
  },
  coinPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  coinText: {
    color: colors.onSurface,
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.7,
  },
});
