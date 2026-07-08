import React, { useState, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

export default function ProductCard({ item, colors, onPress }) {
  const { addItem } = useCart();
  const hasOffer = item.offerActive === 1 && item.offer_price > 0;
  const price = hasOffer ? item.offer_price : item.product_price;
  const [added, setAdded] = useState(false);
  const timerRef = useRef(null);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.product_title,
      image: imgUrl(item),
      price: Number(price),
    });
    setAdded(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <View style={[s.card, { backgroundColor: colors.surface }]}>
      <TouchableOpacity
        onPress={() => onPress?.(item)}
        activeOpacity={0.7}
      >
         {imgUrl(item) && (
            <View>
              <Image source={{ uri: imgUrl(item) }} style={s.image} resizeMode="cover" />
              {hasOffer && (
                <View style={s.discountBadge}>
                  <Text style={s.discountBadgeText}>
                    discount: {Math.round((1 - Number(item.offer_price) / Number(item.product_price)) * 100)}%
                  </Text>
                </View>
              )}
              {added && (
                <View style={s.addedOverlay}>
                  <MaterialIcons name="check-circle" size={28} color="#fff" />
                  <Text style={s.addedOverlayText}>Added to cart</Text>
                </View>
              )}
            </View>
          )}
        <View style={s.body}>
          <Text style={[s.title, { color: colors.text }]} numberOfLines={2}>
            {item.product_title}
          </Text>

          {item.product_price > 0 && (
            <View style={s.priceRow}>
              <Text style={[s.price, { color: colors.primary }]}>৳{price}</Text>
              {hasOffer && (
                <Text style={[s.oldPrice, { color: colors.onSurface + '80' }]}>৳{item.product_price}</Text>
              )}
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[s.addBtn, added && { backgroundColor: '#22C55E' }]}
        onPress={handleAddToCart}
        activeOpacity={0.8}
      >
        <MaterialIcons name={added ? 'check' : 'add-shopping-cart'} size={18} color="#fff" />
        <Text style={s.addBtnText}>{added ? '✓ Added to cart' : 'কার্টে যোগ করুন'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 0,
  },
  image: {
    width: '100%',
    height: 130,
  },
  body: {
    padding: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 17,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    position: 'absolute',
    top: -2,
    left: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    gap: 6,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
});
