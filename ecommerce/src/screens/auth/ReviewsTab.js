import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api_image } from '../../config/url';
import { getReview } from '../../api/reviewApi';
import StarRating from '../product/components/StarRating';

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch {
    return dateStr;
  }
};

export default function ReviewsTab() {
  const { colors } = useTheme();
  const { user } = useAuth();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [activePage, setActivePage] = useState(1);

  const fetchReviews = useCallback(async (page = 1) => {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await getReview(userId, page);
      setReviews(res?.data || []);
      setTotal(res?.total || 0);
      setPerPage(res?.per_page || 10);
      setActivePage(page);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchReviews(1);
  }, [fetchReviews]);

  const totalPages = Math.max(1, Math.ceil(total / (perPage || 10)));

  return (
    <View style={[s.section, { backgroundColor: colors.surface }]}>
      <Text style={[s.sectionTitle, { color: colors.text }]}>Product Review</Text>

      {loading ? (
        <View style={s.emptyState}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : reviews.length > 0 ? (
        <>
          {reviews.map((row, i) => (
            <View
              key={row.review_id || i}
              style={[s.row, i < reviews.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.onSurface + '10' }]}
            >
              <Image
                source={{ uri: toFullUrl(row.main_image, 'products/' + (row.folder || '')) }}
                style={s.image}
                resizeMode="contain"
              />
              <View style={s.info}>
                <Text style={[s.title, { color: colors.text }]} numberOfLines={2}>{row.product_title}</Text>
                <StarRating rating={Number(row.rating) || 0} size={13} />
                <Text style={[s.comment, { color: colors.onSurface + '70' }]} numberOfLines={3}>{row.comment}</Text>
                <View style={s.metaRow}>
                  <Text style={[s.date, { color: colors.onSurface + '50' }]}>{formatDate(row.created_time)}</Text>
                  <Text style={Number(row.status) === 1 ? s.publishedBadge : s.pendingBadge}>
                    {Number(row.status) === 1 ? 'Published' : 'Pending'}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {total > perPage && (
            <View style={s.pagerRow}>
              <TouchableOpacity
                style={[s.pagerBtn, activePage <= 1 && s.pagerBtnDisabled]}
                onPress={() => fetchReviews(activePage - 1)}
                disabled={activePage <= 1}
              >
                <MaterialIcons name="chevron-left" size={18} color="#fff" />
              </TouchableOpacity>
              <Text style={[s.pagerText, { color: colors.text }]}>Page {activePage} of {totalPages}</Text>
              <TouchableOpacity
                style={[s.pagerBtn, activePage >= totalPages && s.pagerBtnDisabled]}
                onPress={() => fetchReviews(activePage + 1)}
                disabled={activePage >= totalPages}
              >
                <MaterialIcons name="chevron-right" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        <View style={s.emptyState}>
          <MaterialIcons name="rate-review" size={48} color={colors.onSurface + '20'} />
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No reviews yet</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  section: { borderRadius: 14, padding: 18, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', paddingVertical: 12, gap: 12 },
  image: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#F3F4F6' },
  info: { flex: 1, gap: 4 },
  title: { fontSize: 13, fontWeight: '700' },
  comment: { fontSize: 12, lineHeight: 17 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
  date: { fontSize: 11 },
  publishedBadge: {
    color: '#fff', backgroundColor: '#22C55E', fontSize: 10, fontWeight: '700',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, overflow: 'hidden',
  },
  pendingBadge: {
    color: '#fff', backgroundColor: '#F59E0B', fontSize: 10, fontWeight: '700',
    paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, overflow: 'hidden',
  },
  pagerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 12 },
  pagerBtn: { backgroundColor: '#27C34B', borderRadius: 8, padding: 6 },
  pagerBtnDisabled: { backgroundColor: '#9CA3AF' },
  pagerText: { fontSize: 13, fontWeight: '600' },
  emptyState: { alignItems: 'center', paddingVertical: 30, gap: 8 },
  emptyText: { fontSize: 14 },
});
