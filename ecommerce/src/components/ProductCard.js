import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { api_image } from '../config/url';

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
  const hasOffer = item.offerActive === 1 && item.offer_price > 0;
  const price = hasOffer ? item.offer_price : item.product_price;

  return (
    <TouchableOpacity
      style={[s.card, { backgroundColor: colors.surface }]}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      {imgUrl(item) && (
        <Image source={{ uri: imgUrl(item) }} style={s.image} resizeMode="fit" />
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

        {hasOffer && item.discount_price > 0 && (
          <Text style={[s.discount, { color: colors.success }]}>
            Save ৳{Number(item.product_price) - Number(item.discount_price)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
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
  discount: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
