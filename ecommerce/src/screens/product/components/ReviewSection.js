import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ActivityIndicator,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StarRating from './StarRating';

function RatingBar({ star, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <View style={rbStyles.row}>
      <Text style={rbStyles.star}>{star}</Text>
      <MaterialIcons name="star" size={12} color="#F59E0B" />
      <View style={rbStyles.barBg}>
        <View style={[rbStyles.barFill, { width: `${pct}%` }]} />
      </View>
      <Text style={rbStyles.count}>{count}</Text>
    </View>
  );
}

const rbStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  star: { fontSize: 12, fontWeight: '600', width: 12, marginRight: 2, color: '#374151' },
  barBg: { flex: 1, height: 8, backgroundColor: '#E5E7EB', borderRadius: 4, marginHorizontal: 8, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#F59E0B', borderRadius: 4 },
  count: { fontSize: 11, color: '#6B7280', width: 24, textAlign: 'right' },
});

export default function ReviewSection({
  reviewCount = { total: 0, average: 0, five: 0, four: 0, three: 0, two: 0, one: 0 },
  reviews = [],
  reviewForm = { rating: 0, comment: '' },
  setReviewForm,
  submitting = false,
  onSubmitReview,
  colors,
}) {
  return (
    <>
      {/* Rating Overview */}
      <View style={styles.ratingOverview}>
        <View style={styles.ratingLeft}>
          <Text style={[styles.ratingBig, { color: colors?.text }]}>{reviewCount.average.toFixed(1)}</Text>
          <StarRating rating={reviewCount.average} size={18} />
          <Text style={[styles.ratingTotal, { color: colors?.muted || '#6B7280' }]}>{reviewCount.total} total</Text>
        </View>
        <View style={styles.ratingRight}>
          <RatingBar star={5} count={reviewCount.five} total={reviewCount.total} />
          <RatingBar star={4} count={reviewCount.four} total={reviewCount.total} />
          <RatingBar star={3} count={reviewCount.three} total={reviewCount.total} />
          <RatingBar star={2} count={reviewCount.two} total={reviewCount.total} />
          <RatingBar star={1} count={reviewCount.one} total={reviewCount.total} />
        </View>
      </View>

      {/* Review Form */}
      <View style={styles.reviewForm}>
        <Text style={[styles.reviewFormTitle, { color: colors?.text }]}>Write a Review</Text>
        <StarRating
          rating={reviewForm.rating}
          size={28}
          interactive
          onChange={(v) => setReviewForm({ ...reviewForm, rating: v })}
        />
        <TextInput
          style={[styles.reviewInput, { color: colors?.text, borderColor: '#D1D5DB' }]}
          placeholder="Write your comment..."
          placeholderTextColor="#9CA3AF"
          multiline
          rows={3}
          value={reviewForm.comment}
          onChangeText={(t) => setReviewForm({ ...reviewForm, comment: t })}
        />
        <TouchableOpacity style={styles.reviewSubmitBtn} onPress={onSubmitReview} disabled={submitting}>
          {submitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.reviewSubmitText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Review List */}
      <View style={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((r, i) => (
            <View key={i} style={styles.reviewItem}>
              <View style={styles.reviewItemHeader}>
                <View>
                  <StarRating rating={r.rating} size={14} />
                  <Text style={[styles.reviewName, { color: colors?.text }]}>{r.name}</Text>
                </View>
                <Text style={styles.reviewDate}>
                  {r.created_time ? new Date(r.created_time).toLocaleDateString() : ''}
                </Text>
              </View>
              <Text style={[styles.reviewComment, { color: colors?.text }]}>{r.comment}</Text>
            </View>
          ))
        ) : (
          <Text style={[styles.noData, { color: colors?.muted || '#6B7280' }]}>There are no reviews yet</Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  ratingOverview: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  ratingLeft: {
    alignItems: 'center',
    minWidth: 80,
  },
  ratingRight: {
    flex: 1,
  },
  ratingBig: {
    fontSize: 30,
    fontWeight: '800',
  },
  ratingTotal: {
    fontSize: 11,
    marginTop: 2,
  },
  reviewForm: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: 10,
    marginTop: 6,
  },
  reviewFormTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
    fontSize: 13,
    textAlignVertical: 'top',
    minHeight: 70,
  },
  reviewSubmitBtn: {
    backgroundColor: '#EB592C',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  reviewSubmitText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  reviewList: {
    marginTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  reviewItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  reviewItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reviewName: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  reviewComment: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4,
  },
  noData: {
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },
});
