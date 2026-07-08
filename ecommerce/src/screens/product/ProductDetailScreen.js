import React, { useState, useLayoutEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme as usePaperTheme, Snackbar } from 'react-native-paper';
import { api_image } from '../../config/url';
import { useCart } from '../../context/CartContext';
import RenderHtml from 'react-native-render-html';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const imgUrl = (item) => {
  if (!item.main_image) return null;
  return toFullUrl(item.main_image, 'products/' + (item.folder || ''));
};

function InfoRow({ label, value, color }) {
  if (!value) return null;
  return (
    <View style={iRow}>
      <Text style={[iLabel, { color: color + '80' }]}>{label}</Text>
      <Text style={[iValue, { color }]}>{value}</Text>
    </View>
  );
}

const iRow = {
  flexDirection: 'row', justifyContent: 'space-between',
  paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee',
};
const iLabel = { fontSize: 13, fontWeight: '500', flex: 0.4 };
const iValue = { fontSize: 13, fontWeight: '600', flex: 0.6, textAlign: 'right' };

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { colors } = usePaperTheme();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [snackVisible, setSnackVisible] = useState(false);
  const scrollRef = useRef(null);

  const hasOffer = product.offerActive === 1 && product.offer_price > 0;
  const price = hasOffer ? product.offer_price : product.product_price;
  const discount = hasOffer
    ? Math.round((1 - Number(product.offer_price) / Number(product.product_price)) * 100)
    : 0;
  const imageUri = imgUrl(product);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: product.product_title || 'পণ্য',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchProduct')}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <MaterialIcons name="shopping-cart" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, product]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.product_title,
        image: imageUri,
        price: Number(price),
      });
    }
    setSnackVisible(true);
  };

  const tagsStyles = {
    body: { color: colors.text, fontSize: 14, lineHeight: 22 },
    p: { marginBottom: 8 },
    a: { color: colors.primary },
    strong: { fontWeight: '700' },
    ul: { paddingLeft: 16 },
    li: { marginBottom: 4 },
  };

  return (
    <>
      <ScrollView
        ref={scrollRef}
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Image */}
        {imageUri && (
          <View style={styles.imageWrap}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
            {hasOffer && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>-{discount}%</Text>
              </View>
            )}
          </View>
        )}

        {/* Title & Price */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <Text style={[styles.title, { color: colors.text }]}>{product.product_title}</Text>

          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.primary }]}>৳{price}</Text>
            {hasOffer && (
              <Text style={[styles.oldPrice, { color: colors.onSurface + '70' }]}>৳{product.product_price}</Text>
            )}
          </View>

          <Text style={[styles.savingText, { color: colors.success || '#22C55E' }]}>
            {hasOffer ? `You save ৳${Number(product.product_price) - Number(product.offer_price)} (${discount}%)` : ' '}
          </Text>
        </View>

        {/* Info Table */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
          <InfoRow label="Product ID" value={product.id} color={colors.text} />
          <InfoRow label="Category" value={product.category_title} color={colors.text} />
          <InfoRow label="Brand" value={product.brand} color={colors.text} />
          <InfoRow label="Stock" value={product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'} color={product.stock > 0 ? colors.success : '#EF4444'} />
          {discount > 0 && <InfoRow label="Discount" value={`${discount}% OFF`} color="#EF4444" />}
        </View>

        {/* Quantity + Add to Cart */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
          <View style={styles.qtyRow}>
            <Text style={[styles.qtyLabel, { color: colors.text }]}>Quantity:</Text>
            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={[styles.qtyBtn, { backgroundColor: colors.primary }]}
                onPress={() => setQty(Math.max(1, qty - 1))}
              >
                <MaterialIcons name="remove" size={20} color="#fff" />
              </TouchableOpacity>
              <Text style={[styles.qtyText, { color: colors.text }]}>{qty}</Text>
              <TouchableOpacity
                style={[styles.qtyBtn, { backgroundColor: colors.primary }]}
                onPress={() => setQty(qty + 1)}
              >
                <MaterialIcons name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart} activeOpacity={0.8}>
            <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
            <Text style={styles.addBtnText}>Add to Cart  ৳{price * qty}</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        {product.description && (
          <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8 }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            <View style={styles.descBox}>
              <RenderHtml
                contentWidth={SCREEN_WIDTH - 56}
                source={{ html: product.description }}
                tagsStyles={tagsStyles}
                baseStyle={{ color: colors.text }}
              />
            </View>
          </View>
        )}

        {/* Share */}
        <View style={[styles.section, { backgroundColor: colors.surface, marginTop: 8, marginBottom: 100 }]}>
          <TouchableOpacity style={styles.shareRow}>
            <MaterialIcons name="share" size={20} color={colors.primary} />
            <Text style={[styles.shareText, { color: colors.primary }]}>Share this product</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackVisible}
        onDismiss={() => setSnackVisible(false)}
        duration={2500}
        action={{ label: 'View Cart', onPress: () => navigation.navigate('Cart') }}
      >
        ✓ Added to cart ({qty} item{qty > 1 ? 's' : ''})
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageWrap: { position: 'relative' },
  image: { width: SCREEN_WIDTH, height: SCREEN_WIDTH },
  discountBadge: {
    position: 'absolute', top: 12, left: 12,
    backgroundColor: '#EF4444', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  discountBadgeText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  section: {
    padding: 16,
    borderRadius: 0,
  },
  title: { fontSize: 20, fontWeight: '700', lineHeight: 26 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 10, marginTop: 10 },
  price: { fontSize: 28, fontWeight: '800' },
  oldPrice: { fontSize: 16, fontWeight: '500', textDecorationLine: 'line-through' },
  savingText: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  qtyRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 16,
  },
  qtyLabel: { fontSize: 15, fontWeight: '600' },
  qtyControls: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  qtyBtn: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyText: { fontSize: 18, fontWeight: '700', minWidth: 28, textAlign: 'center' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#000', paddingVertical: 14, borderRadius: 10, gap: 8,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 10 },
  descBox: { borderRadius: 8 },
  shareRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 6,
  },
  shareText: { fontSize: 15, fontWeight: '600' },
});
