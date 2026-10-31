import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  ActivityIndicator, Alert, TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api_image } from '../../config/url';
import { getOrderMeta, getOrderData, getTimeline, cancelOrder } from '../../api/orderApi';
import { submitReview } from '../../api/reviewApi';
import StarRating from '../product/components/StarRating';

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const itemImgUrl = (item) => {
  const img = item.product_picture || item.singlePicture || item.image || item.main_image;
  if (!img) return null;
  return toFullUrl(img, 'products');
};

const currencyFormat = (num) => {
  const n = Number(num) || 0;
  return '৳ ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatDateTime = (dateStr) => {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours}:${minutes} ${ampm}`;
  } catch {
    return dateStr;
  }
};

export default function OrderDetailScreen({ route, navigation }) {
  const { colors } = useTheme();
  const { user, token } = useAuth();
  const orderId = route?.params?.order_id;
  const invoiceId = route?.params?.invoice_id;
  const createdTime = route?.params?.created_time;
  const customerPhone = route?.params?.customer_phone;

  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [items, setItems] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [reviewForms, setReviewForms] = useState({});

  const fetchAll = useCallback(async () => {
    if (!orderId) return;
    setLoading(true);
    try {
      const [metaRes, dataRes, timelineRes] = await Promise.all([
        getOrderMeta(orderId),
        getOrderData(orderId),
        getTimeline(orderId),
      ]);
      setItems(Array.isArray(metaRes) ? metaRes : metaRes?.data || []);
      setOrderData(Array.isArray(dataRes) ? dataRes[0] : dataRes);
      setTimeline(Array.isArray(timelineRes) ? timelineRes : timelineRes?.data || []);
    } catch {
      Alert.alert('Error', 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleCancel = () => {
    Alert.alert('Cancel Order', 'Are you sure you want to cancel this order?', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes, Cancel',
        style: 'destructive',
        onPress: async () => {
          setCancelling(true);
          try {
            await cancelOrder(user?.id, orderId, token);
            Alert.alert('Success', 'Your order has been cancelled');
            fetchAll();
          } catch {
            Alert.alert('Error', 'Failed to cancel order');
          } finally {
            setCancelling(false);
          }
        },
      },
    ]);
  };

  const toggleReviewForm = (productId) => {
    setReviewForms((prev) => ({
      ...prev,
      [productId]: prev[productId]?.open
        ? { ...prev[productId], open: false }
        : { rating: 0, comment: '', open: true, submitting: false },
    }));
  };

  const setReviewField = (productId, field, value) => {
    setReviewForms((prev) => ({
      ...prev,
      [productId]: { ...prev[productId], [field]: value },
    }));
  };

  const handleSubmitReview = async (item) => {
    const productId = item.product_id;
    const form = reviewForms[productId] || {};
    if (!form.rating) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    if (!form.comment?.trim()) {
      Alert.alert('Error', 'Please enter your comment');
      return;
    }
    setReviewField(productId, 'submitting', true);
    try {
      await submitReview(productId, {
        rating: form.rating,
        comment: form.comment.trim(),
        name: user?.name || '',
        phone: user?.phone || '',
        user_id: user?.id,
      });
      setReviewForms((prev) => ({ ...prev, [productId]: { rating: 0, comment: '', open: false, submitting: false } }));
      Alert.alert('Success', 'Review added successfully, wait for admin approval');
    } catch {
      Alert.alert('Error', 'Failed to submit review');
      setReviewField(productId, 'submitting', false);
    }
  };

  if (loading) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!orderData) {
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <MaterialIcons name="error-outline" size={48} color={colors.onSurface + '30'} />
        <Text style={[s.emptyText, { color: colors.onSurface + '60' }]}>Order not found</Text>
      </View>
    );
  }

  const unpaid = Number(orderData.paid_amount || 0) < Number(orderData.order_total || 0);
  const dueAmount = Number(orderData.order_total || 0) - Number(orderData.paid_amount || 0);
  const canCancel = !['Delivered', 'Cancel', 'Cancelled'].includes(orderData.order_status);

  return (
    <ScrollView style={[s.container, { backgroundColor: colors.background }]} contentContainerStyle={s.content}>
      {/* Header */}
      <View style={[s.card, { backgroundColor: colors.surface }]}>
        <View style={s.headerRow}>
          <Text style={[s.invoiceText, { color: colors.text }]}>#{invoiceId || orderData.order_id}</Text>
          <Text style={s.statusBadge}>{orderData.order_status}</Text>
        </View>
        <Text style={[s.dateText, { color: colors.onSurface + '70' }]}>
          {formatDateTime(createdTime || timeline[0]?.created_at)}
        </Text>
      </View>

      {/* Ordered From */}
      <View style={[s.card, { backgroundColor: colors.surface }]}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Ordered From</Text>
        <View style={s.fromRow}>
          <Image source={require('../../assets/images/logo.png')} style={s.fromLogo} resizeMode="contain" />
          <View style={s.fromInfo}>
            <Text style={[s.fromName, { color: colors.text }]}>Jncomputer Bd</Text>
            <Text style={[s.billToSub, { color: colors.onSurface + '70' }]}>
              Shop# 764, Level# 7, Multiplan Center, 69-71,{'\n'}New Elephant Road, Dhaka 1205
            </Text>
            <Text style={[s.billToSub, { color: colors.onSurface + '70' }]}>+8801837441061</Text>
            <Text style={[s.billToSub, { color: colors.onSurface + '70' }]}>support@jncomputerbd.com</Text>
          </View>
        </View>
      </View>

      {/* Bill To */}
      <View style={[s.card, { backgroundColor: colors.surface }]}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Bill To</Text>
        <View style={s.billToRow}>
          <View style={[s.avatar, { backgroundColor: colors.primary }]}>
            <Text style={s.avatarText}>{(user?.name || 'U').substring(0, 2).toUpperCase()}</Text>
          </View>
          <View style={s.billToInfo}>
            <Text style={[s.billToName, { color: colors.text }]}>{user?.name || 'N/A'}</Text>
            <Text style={[s.billToSub, { color: colors.onSurface + '70' }]}>{customerPhone || user?.phone || ''}</Text>
            {orderData.customer_address ? (
              <Text style={[s.billToSub, { color: colors.onSurface + '70' }]}>{orderData.customer_address}</Text>
            ) : null}
          </View>
        </View>
      </View>

      {/* Items */}
      <View style={[s.card, { backgroundColor: colors.surface }]}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Items</Text>
        {items.length > 0 ? items.map((item, i) => {
          const qty = Number(item.quantity || item.qty || item.product_qty || 1);
          const price = Number(item.price || item.product_price || item.unit_price || 0);
          const lineTotal = item.subtotal != null ? Number(item.subtotal) : qty * price;
          const form = reviewForms[item.product_id];
          return (
            <View
              key={item.order_meta_id || item.product_id || i}
              style={[i < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.onSurface + '10' }]}
            >
              <View style={s.itemRow}>
                <Image source={{ uri: itemImgUrl(item) }} style={s.itemImage} resizeMode="contain" />
                <View style={s.itemInfo}>
                  <Text style={[s.itemTitle, { color: colors.text }]} numberOfLines={2}>
                    {item.product_name || item.product_title}
                  </Text>
                  <Text style={[s.itemQty, { color: colors.onSurface + '70' }]}>Qty: {qty} × {currencyFormat(price)}</Text>
                </View>
                <Text style={[s.itemTotal, { color: colors.text }]}>{currencyFormat(lineTotal)}</Text>
              </View>

              {orderData.order_status === 'Delivered' && (
                <View style={s.reviewBlock}>
                  <TouchableOpacity style={s.reviewToggle} onPress={() => toggleReviewForm(item.product_id)}>
                    <MaterialIcons name="star-rate" size={16} color="#F59E0B" />
                    <Text style={s.reviewToggleText}>{form?.open ? 'Cancel Review' : 'Rate & Review'}</Text>
                  </TouchableOpacity>

                  {form?.open && (
                    <View style={s.reviewForm}>
                      <StarRating
                        rating={form.rating}
                        size={26}
                        interactive
                        onChange={(v) => setReviewField(item.product_id, 'rating', v)}
                      />
                      <TextInput
                        style={[s.reviewInput, { color: colors.text, borderColor: colors.onSurface + '20', backgroundColor: colors.background }]}
                        placeholder="Write your comment..."
                        placeholderTextColor={colors.onSurface + '50'}
                        multiline
                        value={form.comment}
                        onChangeText={(t) => setReviewField(item.product_id, 'comment', t)}
                      />
                      <TouchableOpacity
                        style={s.reviewSubmitBtn}
                        onPress={() => handleSubmitReview(item)}
                        disabled={form.submitting}
                      >
                        {form.submitting ? (
                          <ActivityIndicator color="#fff" size="small" />
                        ) : (
                          <Text style={s.reviewSubmitText}>Submit Review</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        }) : (
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No items found</Text>
        )}
      </View>

      {/* Summary */}
      <View style={[s.card, { backgroundColor: colors.surface }]}>
        <Text style={[s.sectionTitle, { color: colors.text }]}>Order Summary</Text>
        <View style={s.summaryRow}>
          <Text style={[s.summaryLabel, { color: colors.onSurface + '70' }]}>Order Total</Text>
          <Text style={[s.summaryValue, { color: colors.text }]}>{currencyFormat(orderData.order_total)}</Text>
        </View>
        <View style={s.summaryRow}>
          <Text style={[s.summaryLabel, { color: colors.onSurface + '70' }]}>Paid Amount</Text>
          <Text style={[s.summaryValue, { color: colors.text }]}>{currencyFormat(orderData.paid_amount)}</Text>
        </View>
        <View style={[s.summaryRow, { marginTop: 4 }]}>
          <Text style={[s.summaryLabel, { color: colors.text, fontWeight: '700' }]}>
            {unpaid ? 'Due Amount' : 'Payment Status'}
          </Text>
          <Text style={unpaid ? s.duePill : s.paidPill}>
            {unpaid ? currencyFormat(dueAmount) : 'Paid'}
          </Text>
        </View>
      </View>

      {/* Timeline */}
      {timeline.length > 0 && (
        <View style={[s.card, { backgroundColor: colors.surface }]}>
          <Text style={[s.sectionTitle, { color: colors.text }]}>Timeline</Text>
          {timeline.map((t, i) => (
            <View key={i} style={s.timelineRow}>
              <View style={s.timelineDotCol}>
                <View style={[s.timelineDot, i === 0 && { backgroundColor: colors.primary }]} />
                {i < timeline.length - 1 && <View style={s.timelineLine} />}
              </View>
              <View style={s.timelineInfo}>
                <Text style={[s.timelineStatus, { color: colors.text }]}>{t.order_status}</Text>
                {t.order_note ? <Text style={[s.timelineNote, { color: colors.onSurface + '70' }]}>{t.order_note}</Text> : null}
                <Text style={[s.timelineDate, { color: colors.onSurface + '50' }]}>{formatDateTime(t.created_at)}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {canCancel && (
        <TouchableOpacity style={s.cancelBtn} onPress={handleCancel} disabled={cancelling}>
          {cancelling ? <ActivityIndicator color="#fff" /> : (
            <>
              <MaterialIcons name="cancel" size={18} color="#fff" />
              <Text style={s.cancelBtnText}>Cancel Order</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, gap: 10 },
  emptyText: { fontSize: 14, textAlign: 'center', paddingVertical: 10 },
  card: {
    borderRadius: 14, padding: 16, marginBottom: 14,
    elevation: 2, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  invoiceText: { fontSize: 16, fontWeight: '800' },
  statusBadge: {
    backgroundColor: '#0EA5E9', color: '#fff', fontSize: 12, fontWeight: '700',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, overflow: 'hidden',
  },
  dateText: { fontSize: 12, marginTop: 6 },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginBottom: 12 },
  fromRow: { flexDirection: 'row', gap: 12 },
  fromLogo: { width: 56, height: 56 },
  fromInfo: { flex: 1 },
  fromName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  billToRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 16, fontWeight: '800', color: '#fff' },
  billToInfo: { flex: 1 },
  billToName: { fontSize: 15, fontWeight: '700' },
  billToSub: { fontSize: 12, marginTop: 2 },
  itemRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  itemImage: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#F3F4F6' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 13, fontWeight: '600' },
  itemQty: { fontSize: 12, marginTop: 3 },
  itemTotal: { fontSize: 13, fontWeight: '700' },
  reviewBlock: { paddingBottom: 12, marginTop: -2 },
  reviewToggle: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  reviewToggleText: { fontSize: 12, fontWeight: '700', color: '#F59E0B' },
  reviewForm: { marginTop: 10, gap: 10 },
  reviewInput: {
    borderWidth: 1, borderRadius: 10, padding: 10, fontSize: 13,
    textAlignVertical: 'top', minHeight: 70,
  },
  reviewSubmitBtn: {
    backgroundColor: '#EB592C', borderRadius: 8, paddingVertical: 10,
    alignItems: 'center',
  },
  reviewSubmitText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  summaryLabel: { fontSize: 13 },
  summaryValue: { fontSize: 13, fontWeight: '600' },
  duePill: {
    color: '#fff', backgroundColor: '#EF4444', fontSize: 12, fontWeight: '700',
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, overflow: 'hidden',
  },
  paidPill: {
    color: '#fff', backgroundColor: '#22C55E', fontSize: 12, fontWeight: '700',
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, overflow: 'hidden',
  },
  timelineRow: { flexDirection: 'row' },
  timelineDotCol: { alignItems: 'center', width: 20 },
  timelineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#D1D5DB' },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#E5E7EB', marginVertical: 2 },
  timelineInfo: { flex: 1, paddingBottom: 16, marginLeft: 8 },
  timelineStatus: { fontSize: 13, fontWeight: '700' },
  timelineNote: { fontSize: 12, marginTop: 2 },
  timelineDate: { fontSize: 11, marginTop: 4 },
  cancelBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#EF4444', height: 48, borderRadius: 10, marginTop: 4,
  },
  cancelBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
