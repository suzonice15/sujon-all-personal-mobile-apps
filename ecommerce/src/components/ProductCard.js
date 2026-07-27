import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { api_image } from '../config/url';
import { useCart } from '../context/CartContext';

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

function ToastAlert({ visible, message }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 250, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 20, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View style={[s.toast, { opacity, transform: [{ translateY }] }]}>
      <MaterialIcons name="check-circle" size={16} color="#fff" />
      <Text style={s.toastText}>{message}</Text>
    </Animated.View>
  );
}

export default function ProductCard({ item, colors, onPress }) {
  const { addItem } = useCart();
  const hasOffer = item.offerActive === 1 && item.offer_price > 0;
  const price = hasOffer ? item.offer_price : item.product_price;
  const discount = hasOffer ? Math.round((1 - Number(item.offer_price) / Number(item.product_price)) * 100) : 0;
  const [loading, setLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const timerRef = useRef(null);

  const handleAddToCart = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      addItem({
        product_id: item.product_id || item.id,
        id: item.product_id || item.id,
        name: item.product_title,
        image: imgUrl(item),
        price: Number(price),
      });
      setLoading(false);
      setToastVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setToastVisible(false), 2000);
    }, 600);
  };

  return (
    <View style={[s.card, { backgroundColor: colors.surface }]}>
      <TouchableOpacity onPress={() => onPress?.(item)} activeOpacity={0.7}>
        <View>
          <Image source={{ uri: imgUrl(item) }} style={s.image} resizeMode="cover" />
          {hasOffer && (
            <View style={s.discountBadge}>
              <Text style={s.discountBadgeText}>-{discount}%</Text>
            </View>
          )}
        </View>
        <View style={s.body}>
          <Text style={[s.title, { color: colors.text }]} numberOfLines={2}>
            {item.product_title}
          </Text>
          {item.product_price > 0 && (
            <View style={s.priceRow}>
              <Text style={[s.price, { color: colors.primary }]}>৳{price}</Text>
              {hasOffer && <Text style={s.oldPrice}>৳{item.product_price}</Text>}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[s.addBtn, loading && s.addBtnLoading]}
        onPress={handleAddToCart}
        disabled={loading}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name={loading ? 'hourglass-empty' : 'add-shopping-cart'}
          size={16}
          color="#fff"
        />
        <Text style={s.addBtnText}>{loading ? 'Adding...' : 'Add to Cart'}</Text>
      </TouchableOpacity>

      <ToastAlert visible={toastVisible} message="Added to cart!" />
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  image: { width: '100%', height: 130 },
  body: { padding: 10, paddingBottom: 8 },
  title: { fontSize: 13, fontWeight: '700', marginBottom: 6, lineHeight: 18 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  price: { fontSize: 15, fontWeight: '800' },
  oldPrice: { fontSize: 12, textDecorationLine: 'line-through', color: '#9CA3AF' },
  discountBadge: {
    position: 'absolute', top: 6, left: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10,
  },
  discountBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EB592C',
    paddingVertical: 10,
    marginHorizontal: 10, marginBottom: 10,
    borderRadius: 8,
  },
  addBtnLoading: { backgroundColor: '#9CA3AF' },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  toast: {
    position: 'absolute',
    bottom: 52,
    left: 10, right: 10,
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 5,
  },
  toastText: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
