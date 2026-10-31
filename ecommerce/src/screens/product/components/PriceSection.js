import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const formatPrice = (num) => {
  const n = Number(num);
  if (isNaN(n)) return '0';
  return n.toLocaleString('en-IN');
};

export default function PriceSection({
  price,
  oldPrice,
  discount,
  hasOffer,
  emiTotal,
  emiMonthly,
  emiInfo = [],
  onEmiPress,
  onCall,
}) {
  return (
    <View style={styles.container}>
      {/* Cash Discount Card */}
      <View style={styles.cashDiscountCard}>
        <View style={styles.priceCardHeader}>
          <MaterialIcons name="local-offer" size={18} color="#16A34A" />
          <Text style={styles.priceCardTitle}>Cash Discount Price</Text>
        </View>
        <View style={styles.priceCardBody}>
          <Text style={styles.mainPriceText}>৳ {formatPrice(price)}</Text>
          {hasOffer && (
            <View style={styles.oldPriceRow}>
              <Text style={styles.oldPriceText}>৳ {formatPrice(oldPrice)}</Text>
              <View style={styles.savingBadge}>
                <Text style={styles.savingBadgeText}>Save {discount}%</Text>
              </View>
            </View>
          )}
        </View>
        <View style={styles.priceCardFooter}>
          <TouchableOpacity style={styles.paymentMethodBtn}>
            <Text style={styles.priceDescriptionText}>Check available payment method</Text>
          </TouchableOpacity>
          <View style={styles.bulkRow}>
            <Text style={styles.bulkQuantityText}>
              Contact for bulk quantity:{' '}
              <Text style={styles.contactNumberText} onPress={onCall}>01837-441061</Text>
            </Text>
          </View>
        </View>
      </View>

      {/* EMI Card */}
      <View style={styles.emiPriceCard}>
        <View style={styles.priceCardHeader}>
          <MaterialIcons name="credit-card" size={18} color="#EA580C" />
          <Text style={styles.emiCardTitle}>EMI Price*</Text>
        </View>
        <View style={styles.priceCardBody}>
          <Text style={styles.mainPriceText}>৳ {formatPrice(emiTotal)}</Text>
          <TouchableOpacity onPress={onEmiPress}>
            <Text style={styles.emiLinkText}>
              Starting from {formatPrice(emiMonthly)}৳/month. {'\n'}
              For Discount Price Click here to view {emiInfo.length} banks EMI Plans
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  cashDiscountCard: {
    width: '100%',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    overflow: 'hidden',
  },
  emiPriceCard: {
    width: '100%',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    overflow: 'hidden',
  },
  priceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  priceCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  emiCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceCardBody: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  mainPriceText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EA580C',
  },
  oldPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  oldPriceText: {
    fontSize: 15,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  savingBadge: {
    backgroundColor: '#DCFCE7',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  savingBadgeText: {
    color: '#111',
    fontSize: 11,
    fontWeight: '700',
  },
  priceCardFooter: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    gap: 8,
  },
  paymentMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  priceDescriptionText: {
    fontSize: 12,
    color: '#111',
    fontWeight: '600',
  },
  bulkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  bulkQuantityText: {
    fontSize: 12,
    color: '#111',
    flex: 1,
  },
  contactNumberText: {
    fontWeight: '800',
    color: '#111',
  },
  emiLinkText: {
    fontSize: 12,
    color: '#111',
    fontWeight: '600',
    marginTop: 4,
  },
});
