import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from './StarRating';

export default function StatusRow({ product, reviewCount, colors }) {
  const inStock = true;

  return (
    <View style={styles.container}>
      <View style={[styles.statusBadge, { backgroundColor: inStock ? '#DCFCE7' : '#FEE2E2' }]}>
        <MaterialIcons name={inStock ? 'check-circle' : 'cancel'} size={13} color={inStock ? '#16A34A' : '#DC2626'} />
        <Text style={[styles.statusText, { color: inStock ? '#16A34A' : '#DC2626' }]}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>

      {product?.sku && (
        <View style={styles.codeBadge}>
          <Text style={styles.codeLabelText}>Product Code: </Text>
          <Text style={styles.codeValueText}>{product.sku}</Text>
        </View>
      )}

      <View style={styles.reviewBadge}>
        <Text style={styles.reviewLabelText}>Reviews</Text>
        <StarRating rating={reviewCount?.average || 0} size={13} />
        <Text style={styles.reviewCountText}>({reviewCount?.total || 0})</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  codeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  codeLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
  },
  codeValueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#374151',
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  reviewLabelText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
  reviewCountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#D97706',
  },
});
