import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert, Image, Dimensions, TextInput, Platform, ToastAndroid } from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { bnToNumber } from '../../utils/helper';
import { useCart } from '../../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AdBanner from '../../components/ads/AdBanner';

const { width } = Dimensions.get('window');

const productImages = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782542b9136?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
];

const allReviews = [
  { id: '1', name: 'আব্দুর রহিম', rating: 5, text: 'দারুণ প্রোডাক্ট, দ্রুত ডেলিভারি', date: '২৫ জুন ২০২৬' },
  { id: '2', name: 'সাব্বির হাসান', rating: 4, text: 'ভালো কোয়ালিটি, তবে একটু দেরি হয়েছে', date: '২০ জুন ২০২৬' },
  { id: '3', name: 'মরিয়ম খাতুন', rating: 5, text: 'অর্ডার দেওয়ার পর ২ দিনের মধ্যে পেয়ে গেছি', date: '১৮ জুন ২০২৬' },
  { id: '4', name: 'ইমরান হোসেন', rating: 4, text: 'প্রোডাক্ট ভালো, প্যাকেজিং আরও ভালো হতে পারে', date: '১৫ জুন ২০২৬' },
  { id: '5', name: 'নাজমা বেগম', rating: 5, text: 'আমার বাচ্চার জন্য কিনেছি, খুব খুশি', date: '১২ জুন ২০২৬' },
  { id: '6', name: 'করিম মিয়া', rating: 3, text: 'প্রত্যাশার চেয়ে কিছুটা কম', date: '১০ জুন ২০২৬' },
];

const relatedProducts = [
  { id: '3', title: 'টি-শার্ট (হোয়াইট)', price: '৩৫০', coinPrice: '৩৫০০০', rating: 4.3 },
  { id: '5', title: 'ইসলামিক ক্যালেন্ডার', price: '৮০', coinPrice: '৮০০০', rating: 4.2 },
  { id: '9', title: 'সীরাতুন নবী', price: '১৮০', coinPrice: '১৮০০০', rating: 4.8 },
  { id: '7', title: 'মিসওয়াক', price: '৩০', coinPrice: '৩০০০', rating: 4.1 },
];

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { colors } = useTheme();
  const s = styles(colors);
  const { addItem } = useCart();
  const insets = useSafeAreaInsets();
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);
  const [reviews, setReviews] = useState(allReviews);
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const priceNum = bnToNumber(product.price);
  const coinNum = bnToNumber(product.coinPrice);

  const cartProduct = { ...product, image: productImages[0] };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(cartProduct);
    if (Platform.OS === 'android') ToastAndroid.show('কার্টে যোগ করা হয়েছে!', ToastAndroid.SHORT);
  };

  const handleBuy = () => {
    Alert.alert('অর্ডার কনফার্মেশন', `আপনি কি "${product.title}" অর্ডার করতে চান?\n\nপরিমাণ: ${qty}টি\nমোট: ${priceNum * qty} টাকা`, [
      { text: 'না', style: 'cancel' },
      { text: 'হ্যাঁ', onPress: () => {
        for (let i = 0; i < qty; i++) addItem(cartProduct);
        navigation.navigate('Cart');
      }},
    ]);
  };

  const handleAddReview = () => {
    if (!reviewText.trim() || reviewRating === 0) {
      Alert.alert('রিভিউ দিন', 'অনুগ্রহ করে রেটিং এবং রিভিউ লিখুন');
      return;
    }
    const newReview = {
      id: Date.now().toString(),
      name: 'আপনি',
      rating: reviewRating,
      text: reviewText,
      date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }),
    };
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(0);
    Alert.alert('ধন্যবাদ', 'আপনার রিভিউ যোগ করা হয়েছে');
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={s.imageGallery}>
          <Image source={{ uri: productImages[selectedImg] }} style={s.mainImage} resizeMode="cover" />
          <View style={s.imageThumbs}>
            {productImages.map((img, i) => (
              <TouchableOpacity key={i} onPress={() => setSelectedImg(i)} activeOpacity={0.7}>
                <Image source={{ uri: img }} style={[s.thumb, selectedImg === i && s.thumbActive]} resizeMode="cover" />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View style={s.body}>
          <View style={s.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={s.title}>{product.title}</Text>
              <View style={s.sellerRow}>
                <MaterialIcons name="store" size={14} color="#4F46E5" />
                <Text style={s.seller}>{product.seller}</Text>
              </View>
            </View>
            <TouchableOpacity style={s.wishlistBtn}>
              <MaterialIcons name="favorite-border" size={22} color="#EF4444" />
            </TouchableOpacity>
          </View>

          <View style={s.ratingRow}>
            <View style={s.stars}>
              {[1, 2, 3, 4, 5].map((i) => (
                <MaterialIcons key={i} name={i <= 4 ? 'star' : 'star-half'} size={16} color="#F59E0B" />
              ))}
            </View>
            <Text style={s.ratingText}>৪.৫ ({reviews.length}টি রিভিউ)</Text>
          </View>

          <View style={s.priceSection}>
            <View style={s.priceMain}>
              <Text style={s.priceLabel}>মূল্য</Text>
              <Text style={s.priceValue}>৳{product.price}</Text>
              <View style={s.discountBadge}>
                <Text style={s.discountText}>-১৫%</Text>
              </View>
            </View>
            <View style={s.priceCoin}>
              <MaterialIcons name="stars" size={14} color="#F59E0B" />
              <Text style={s.coinValue}>{product.coinPrice} কয়েন</Text>
            </View>
          </View>

          <View style={s.qtySection}>
            <Text style={s.qtyLabel}>পরিমাণ</Text>
            <View style={s.qtyControls}>
              <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(Math.max(1, qty - 1))}>
                <MaterialIcons name="remove" size={18} color="#1F2937" />
              </TouchableOpacity>
              <Text style={s.qtyText}>{qty}</Text>
              <TouchableOpacity style={s.qtyBtn} onPress={() => setQty(qty + 1)}>
                <MaterialIcons name="add" size={18} color="#1F2937" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.infoSection}>
            <Text style={s.sectionTitle}>প্রোডাক্ট বিবরণ</Text>
            <Text style={s.infoText}>
              এই প্রোডাক্টটি অরিজিনাল এবং সর্বোচ্চ কোয়ালিটির। অর্ডার কনফার্ম করার পর ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি প্রক্রিয়া শুরু হবে।
            </Text>
            <View style={s.infoRow}>
              <MaterialIcons name="local-shipping" size={16} color="#4F46E5" />
              <Text style={s.infoRowText}>ফ্রি ডেলিভারি (৫০০+ টাকায়)</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialIcons name="verified" size={16} color="#059669" />
              <Text style={s.infoRowText}>প্রামাণিক প্রোডাক্ট গ্যারান্টি</Text>
            </View>
            <View style={s.infoRow}>
              <MaterialIcons name="loop" size={16} color="#F59E0B" />
              <Text style={s.infoRowText}>৭ দিনের রিটার্ন পলিসি</Text>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.reviewSection}>
            <View style={s.reviewHeader}>
              <Text style={s.sectionTitle}>রিভিউ ({reviews.length})</Text>
              <TouchableOpacity style={s.addReviewBtn} onPress={() => setShowReviewForm(!showReviewForm)}>
                <MaterialIcons name={showReviewForm ? 'close' : 'rate-review'} size={16} color="#4F46E5" />
                <Text style={s.addReviewBtnText}>{showReviewForm ? 'বন্ধ করুন' : 'রিভিউ দিন'}</Text>
              </TouchableOpacity>
            </View>

            {showReviewForm && (
              <View style={s.addReview}>
                <Text style={s.addReviewTitle}>আপনার রিভিউ লিখুন</Text>
                <View style={s.ratingInput}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TouchableOpacity key={i} onPress={() => setReviewRating(i)}>
                      <MaterialIcons name={i <= reviewRating ? 'star' : 'star-border'} size={28} color="#F59E0B" />
                    </TouchableOpacity>
                  ))}
                </View>
                <TextInput
                  style={s.reviewInput}
                  placeholder="আপনার মতামত জানান..."
                  placeholderTextColor="#999"
                  value={reviewText}
                  onChangeText={setReviewText}
                  multiline
                />
                <TouchableOpacity style={s.submitReview} onPress={handleAddReview} activeOpacity={0.8}>
                  <MaterialIcons name="send" size={16} color="#fff" />
                  <Text style={s.submitReviewText}>রিভিউ জমা দিন</Text>
                </TouchableOpacity>
              </View>
            )}

            {reviews.map((r) => (
              <View key={r.id} style={s.reviewCard}>
                <View style={s.reviewTop}>
                  <View style={s.reviewAvatar}>
                    <MaterialIcons name="person" size={18} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.reviewName}>{r.name}</Text>
                    <Text style={s.reviewDate}>{r.date}</Text>
                  </View>
                  <View style={s.reviewStars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <MaterialIcons key={i} name={i <= r.rating ? 'star' : 'star-border'} size={14} color="#F59E0B" />
                    ))}
                  </View>
                </View>
                <Text style={s.reviewText}>{r.text}</Text>
              </View>
            ))}
          </View>

          <View style={s.divider} />

          <View style={s.relatedSection}>
            <Text style={s.sectionTitle}>সম্পর্কিত প্রোডাক্ট</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
              {relatedProducts.map((item) => (
                <TouchableOpacity key={item.id} style={s.relatedCard} activeOpacity={0.7}>
                  <View style={s.relatedImg}>
                    <MaterialIcons name="shopping-bag" size={28} color="#ccc" />
                  </View>
                  <Text style={s.relatedName} numberOfLines={2}>{item.title}</Text>
                  <Text style={s.relatedPrice}>৳{item.price}</Text>
                  <View style={s.relatedStars}>
                    <MaterialIcons name="star" size={12} color="#F59E0B" />
                    <Text style={s.relatedRating}>{item.rating}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <AdBanner />
      </View>

      <View style={[s.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={s.bottomTotal}>
          <Text style={s.bottomTotalLabel}>মোট</Text>
          <Text style={s.bottomTotalPrice}>৳{priceNum * qty}</Text>
        </View>
        <TouchableOpacity style={s.floatingCart} onPress={handleAddToCart} activeOpacity={0.8}>
          <MaterialIcons name="shopping-cart" size={18} color="#fff" />
          <Text style={s.floatingCartText}>কার্টে যোগ করুন</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.floatingBuy} onPress={handleBuy} activeOpacity={0.8}>
          <MaterialIcons name="flash-on" size={18} color="#fff" />
          <Text style={s.floatingBuyText}>এখনই কিনুন</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  imageGallery: { backgroundColor: '#F9FAFB' },
  mainImage: { width, height: 320 },
  imageThumbs: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 8, paddingVertical: 10,
  },
  thumb: { width: 56, height: 56, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  thumbActive: { borderColor: '#4F46E5' },
  backBtn: {
    position: 'absolute', top: 12, left: 12,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center', alignItems: 'center',
  },

  body: { padding: 16, paddingBottom: Platform.OS === 'android' ? 90 : 80 },

  titleRow: { flexDirection: 'row', alignItems: 'flex-start' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', lineHeight: 28 },
  sellerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  seller: { fontSize: 13, color: '#4F46E5', fontWeight: '600', marginLeft: 4 },
  wishlistBtn: { padding: 6 },

  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  stars: { flexDirection: 'row' },
  ratingText: { fontSize: 12, color: '#999', marginLeft: 8 },

  priceSection: {
    backgroundColor: '#F5F3FF', borderRadius: 14,
    padding: 16, marginTop: 14,
  },
  priceMain: { flexDirection: 'row', alignItems: 'center' },
  priceLabel: { fontSize: 12, color: '#666', marginRight: 10 },
  priceValue: { fontSize: 26, fontWeight: 'bold', color: '#4F46E5' },
  discountBadge: {
    backgroundColor: '#FEF2F2', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 2, marginLeft: 10,
  },
  discountText: { fontSize: 12, fontWeight: '700', color: '#EF4444' },
  priceCoin: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  coinValue: { fontSize: 14, fontWeight: '600', color: '#F59E0B', marginLeft: 6 },

  qtySection: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginTop: 16,
  },
  qtyLabel: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  qtyControls: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center',
  },
  qtyText: { fontSize: 16, fontWeight: '600', color: '#1F2937', marginHorizontal: 16 },

  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#F0F0F0',
    elevation: 0, shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  bottomTotal: { marginRight: 12 },
  bottomTotalLabel: { fontSize: 10, color: '#999' },
  bottomTotalPrice: { fontSize: 16, fontWeight: 'bold', color: '#4F46E5' },
  floatingCart: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#1F2937',
    borderRadius: 10, paddingVertical: 11, marginRight: 8,
  },
  floatingCartText: { color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 6 },
  floatingBuy: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#4F46E5',
    borderRadius: 10, paddingVertical: 11,
  },
  floatingBuyText: { color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 6 },

  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 16 },

  infoSection: {},
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  infoText: { fontSize: 13, color: '#666', lineHeight: 20 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  infoRowText: { fontSize: 13, color: '#666', marginLeft: 8 },

  reviewSection: {},
  reviewHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  addReviewBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#EEF2FF', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  addReviewBtnText: { fontSize: 12, fontWeight: '600', color: '#4F46E5', marginLeft: 4 },
  addReview: {
    backgroundColor: '#F9FAFB', borderRadius: 14,
    padding: 16, marginBottom: 16,
  },
  addReviewTitle: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginBottom: 8 },
  ratingInput: { flexDirection: 'row', gap: 4, marginBottom: 10 },
  reviewInput: {
    backgroundColor: '#fff', borderRadius: 10,
    borderWidth: 1, borderColor: '#E5E7EB',
    padding: 12, fontSize: 13, color: '#1F2937',
    minHeight: 70, textAlignVertical: 'top',
  },
  submitReview: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#4F46E5', borderRadius: 10,
    paddingVertical: 10, marginTop: 10,
  },
  submitReviewText: { color: '#fff', fontSize: 13, fontWeight: '700', marginLeft: 6 },

  reviewCard: {
    backgroundColor: '#F9FAFB', borderRadius: 12,
    padding: 14, marginBottom: 10,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center' },
  reviewAvatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#4F46E5',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10,
  },
  reviewName: { fontSize: 14, fontWeight: '600', color: '#1F2937' },
  reviewDate: { fontSize: 11, color: '#999', marginTop: 2 },
  reviewStars: { flexDirection: 'row' },
  reviewText: { fontSize: 13, color: '#666', marginTop: 8, lineHeight: 18 },

  relatedSection: {},
  relatedCard: {
    width: 130, backgroundColor: '#F9FAFB',
    borderRadius: 12, padding: 10,
  },
  relatedImg: {
    height: 80, backgroundColor: '#fff',
    borderRadius: 8, justifyContent: 'center', alignItems: 'center',
    marginBottom: 8,
  },
  relatedName: { fontSize: 12, fontWeight: '600', color: '#1F2937' },
  relatedPrice: { fontSize: 13, fontWeight: 'bold', color: '#4F46E5', marginTop: 4 },
  relatedStars: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  relatedRating: { fontSize: 11, color: '#F59E0B', fontWeight: '600', marginLeft: 2 },
});
