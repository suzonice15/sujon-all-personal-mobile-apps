import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity,
  Dimensions, ScrollView, Image,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';

const { width } = Dimensions.get('window');
const CARD_W = (width - 48) / 2;

const banners = [
  { id: '1', colors: ['#4F46E5', '#7C3AED'], title: 'নতুন প্রোডাক্ট এসেছে', sub: 'সকল প্রোডাক্টে বিশেষ ছাড়', icon: 'new-releases', emoji: '🔥' },
  { id: '2', colors: ['#EF4444', '#F97316'], title: 'বিক্রি করুন আপনার প্রোডাক্ট', sub: 'এখনই পোস্ট করুন, ফ্রি লিস্টিং', icon: 'storefront', emoji: '🚀' },
  { id: '3', colors: ['#059669', '#10B981'], title: 'কয়েন দিয়ে কিনুন', sub: 'পয়েন্ট ব্যবহার করে ডিসকাউন্ট', icon: 'stars', emoji: '⭐' },
];

const categories = [
  { id: 'all', label: 'সব', icon: 'apps', color: '#6366F1' },
  { id: 'book', label: 'বই', icon: 'menu-book', color: '#8B5CF6' },
  { id: 'electronics', label: 'ইলেকট্রনিক্স', icon: 'devices', color: '#3B82F6' },
  { id: 'clothing', label: 'কাপড়', icon: 'checkroom', color: '#EC4899' },
  { id: 'others', label: 'অন্যান্য', icon: 'more-horiz', color: '#F59E0B' },
];

const productImages = [
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1544717305-2782542b9136?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1503602642458-232111445657?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1546868871-af0de0ae72b8?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
];

const products = [
  { id: '1', title: 'নবীদের গল্প', price: '১৫০', coinPrice: '১৫০০০', category: 'book', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.5, sold: 230 },
  { id: '2', title: 'কুরআন তাফসির', price: '২০০', coinPrice: '২০০০০', category: 'book', seller: 'প্রফেট অ্যাপ', type: 'buy', rating: 4.8, sold: 180 },
  { id: '3', title: 'টি-শার্ট (হোয়াইট)', price: '৩৫০', coinPrice: '৩৫০০০', category: 'clothing', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.3, sold: 90 },
  { id: '4', title: 'হেডফোন', price: '৫০০', coinPrice: '৫০০০০', category: 'electronics', seller: 'প্রফেট অ্যাপ', type: 'buy', rating: 4.6, sold: 150 },
  { id: '5', title: 'ইসলামিক ক্যালেন্ডার', price: '৮০', coinPrice: '৮০০০', category: 'others', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.2, sold: 310 },
  { id: '6', title: 'পাঞ্জাবি (নেভি)', price: '৪৫০', coinPrice: '৪৫০০০', category: 'clothing', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.7, sold: 75 },
  { id: '7', title: 'মিসওয়াক', price: '৩০', coinPrice: '৩০০০', category: 'others', seller: 'প্রফেট অ্যাপ', type: 'buy', rating: 4.1, sold: 500 },
  { id: '8', title: 'আতর (মিশক)', price: '২৫০', coinPrice: '২৫০০০', category: 'others', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.9, sold: 420 },
  { id: '9', title: 'সীরাতুন নবী', price: '১৮০', coinPrice: '১৮০০০', category: 'book', seller: 'প্রফেট অ্যাপ', type: 'sell', rating: 4.8, sold: 260 },
  { id: '10', title: 'ব্লুটুথ স্পিকার', price: '৬৫০', coinPrice: '৬৫০০০', category: 'electronics', seller: 'প্রফেট অ্যাপ', type: 'buy', rating: 4.4, sold: 120 },
];

const bgColors = ['#FEE2E2', '#DBEAFE', '#D1FAE5', '#FEF3C7', '#E0E7FF', '#FCE7F3', '#EDE9FE', '#FEE2E2', '#D1FAE5', '#FEF3C7'];

export default function KinaKataScreen({ navigation }) {
  const { colors } = useTheme();
  const s = styles(colors);
  const [activeCat, setActiveCat] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerRef = useRef(null);

  const filtered = activeCat === 'all' ? products : products.filter((p) => p.category === activeCat);

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentSlide + 1) % banners.length;
      setCurrentSlide(next);
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    bannerRef.current?.scrollToIndex({ index: currentSlide, animated: true });
  }, [currentSlide]);

  const onMomentumEnd = useCallback((e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlide(idx);
  }, []);

  const renderBanner = ({ item }) => (
    <View style={[s.bannerCard, { backgroundColor: item.colors[0] }]}>
      <Text style={s.bannerEmoji}>{item.emoji}</Text>
      <Text style={s.bannerTitle}>{item.title}</Text>
      <Text style={s.bannerSub}>{item.sub}</Text>
      <View style={s.bannerOverlay} />
    </View>
  );

  const renderProduct = ({ item, index }) => (
    <TouchableOpacity style={s.productCard} activeOpacity={0.7}>
      <View style={[s.productImgWrap, { backgroundColor: bgColors[index % bgColors.length] }]}>
        <Image
          source={{ uri: productImages[index % productImages.length] }}
          style={s.productImg}
          resizeMode="cover"
        />
        <View style={[s.typeBadge, item.type === 'sell' ? s.sellBadge : s.buyBadge]}>
          <Text style={[s.typeBadgeText, item.type === 'sell' ? s.sellBadgeText : s.buyBadgeText]}>
            {item.type === 'sell' ? 'বিক্রি' : 'কিনব'}
          </Text>
        </View>
      </View>
      <Text style={s.productTitle} numberOfLines={2}>{item.title}</Text>
      <View style={s.ratingRow}>
        <MaterialIcons name="star" size={12} color="#F59E0B" />
        <Text style={s.ratingText}>{item.rating}</Text>
        <Text style={s.soldText}>বিক্রি {item.sold}+</Text>
      </View>
      <Text style={s.productSeller}>{item.seller}</Text>
      <View style={s.priceRow}>
        <Text style={s.price}>৳{item.price}</Text>
        <Text style={s.coinPrice}>{item.coinPrice} কয়েন</Text>
      </View>
      <TouchableOpacity style={s.cartBtn} activeOpacity={0.8}>
        <MaterialIcons name="shopping-cart" size={14} color="#fff" />
        <Text style={s.cartBtnText}>অর্ডার</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container}>
      <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={s.searchRow}>
              <View style={s.searchBox}>
                <MaterialIcons name="search" size={20} color="#999" />
                <Text style={s.searchPlaceholder}>প্রোডাক্ট খুঁজুন...</Text>
              </View>
              <TouchableOpacity style={s.notifBtn}>
                <MaterialIcons name="notifications-none" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>

            <View style={s.bannerSection}>
              <FlatList
                ref={bannerRef}
                data={banners}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={width}
                decelerationRate="fast"
                keyExtractor={(item) => item.id}
                renderItem={renderBanner}
                onMomentumScrollEnd={onMomentumEnd}
              />
              <View style={s.dots}>
                {banners.map((_, i) => (
                  <View key={i} style={[s.dot, i === currentSlide && s.dotActive]} />
                ))}
              </View>
            </View>

            <View style={s.catSection}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
              >
                {categories.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    onPress={() => setActiveCat(c.id)}
                    activeOpacity={0.7}
                    style={{ alignItems: 'center' }}
                  >
                    <View style={[s.catCircle, activeCat === c.id && { backgroundColor: c.color }]}>
                      <MaterialIcons name={c.icon} size={22} color={activeCat === c.id ? '#fff' : c.color} />
                    </View>
                    <Text style={[s.catLabel, activeCat === c.id && { color: c.color, fontWeight: '700' }]}>{c.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={s.dealsBanner}>
              <View style={s.dealsLeft}>
                <Text style={s.dealsTitle}>⚡ ফ্ল্যাশ সেল</Text>
                <Text style={s.dealsSub}>২৪ ঘন্টার বিশেষ অফার</Text>
              </View>
              <View style={s.dealsRight}>
                <View style={s.timerBox}><Text style={s.timerText}>০২</Text></View>
                <Text style={s.timerSep}>:</Text>
                <View style={s.timerBox}><Text style={s.timerText}>১৫</Text></View>
                <Text style={s.timerSep}>:</Text>
                <View style={s.timerBox}><Text style={s.timerText}>৪৮</Text></View>
              </View>
            </View>

            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>
                {activeCat === 'all' ? 'সকল প্রোডাক্ট' : categories.find((c) => c.id === activeCat)?.label}
              </Text>
              <Text style={s.sectionCount}>{filtered.length}টি প্রোডাক্ট</Text>
            </View>
          </>
        }
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={s.empty}>
            <MaterialIcons name="search-off" size={48} color={colors.muted} />
            <Text style={s.emptyText}>কোনো প্রোডাক্ট পাওয়া যায়নি</Text>
          </View>
        }
      />
      <AdBanner />
      </View>
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  searchRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8,
    backgroundColor: '#fff',
  },
  searchBox: {
    flex: 1, flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F5F5F5', borderRadius: 12,
    paddingHorizontal: 14, height: 42,
  },
  searchPlaceholder: { fontSize: 14, color: '#999', marginLeft: 10 },
  notifBtn: { marginLeft: 12, padding: 6 },

  bannerSection: { backgroundColor: '#fff', paddingBottom: 12 },
  bannerCard: {
    width, height: 170,
    padding: 24, justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bannerEmoji: { fontSize: 36, marginBottom: 8 },
  bannerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  bannerSub: { fontSize: 14, color: 'rgba(255,255,255,0.9)' },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: '#D1D5DB', marginHorizontal: 3,
  },
  dotActive: { backgroundColor: '#4F46E5', width: 20 },

  catSection: {
    backgroundColor: '#fff', paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: '#F0F0F0',
  },
  catCircle: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 6,
  },
  catLabel: { fontSize: 12, color: '#666', fontWeight: '500' },

  dealsBanner: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff', marginTop: 8,
    paddingHorizontal: 16, paddingVertical: 14,
    marginHorizontal: 16, borderRadius: 14,
    elevation: 1, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
  },
  dealsLeft: {},
  dealsTitle: { fontSize: 16, fontWeight: 'bold', color: '#EF4444' },
  dealsSub: { fontSize: 12, color: '#999', marginTop: 2 },
  dealsRight: { flexDirection: 'row', alignItems: 'center' },
  timerBox: {
    backgroundColor: '#1F2937', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  timerText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  timerSep: { marginHorizontal: 4, fontSize: 16, fontWeight: 'bold', color: '#1F2937' },

  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16,
    marginTop: 16, marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1F2937' },
  sectionCount: { fontSize: 12, color: '#999' },

  productCard: {
    backgroundColor: '#fff', borderRadius: 14,
    marginBottom: 14, width: CARD_W,
    elevation: 1, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4,
    overflow: 'hidden',
  },
  productImgWrap: {
    height: 140, position: 'relative',
  },
  productImg: { width: '100%', height: '100%' },
  typeBadge: {
    position: 'absolute', top: 8, left: 8,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: 6,
  },
  sellBadge: { backgroundColor: '#FEF2F2' },
  buyBadge: { backgroundColor: '#EEF2FF' },
  typeBadgeText: { fontSize: 10, fontWeight: '700' },
  sellBadgeText: { color: '#EF4444' },
  buyBadgeText: { color: '#4F46E5' },
  productTitle: {
    fontSize: 13, fontWeight: '700', color: '#1F2937',
    paddingHorizontal: 10, marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, marginTop: 4,
  },
  ratingText: { fontSize: 11, color: '#F59E0B', fontWeight: '600', marginLeft: 2 },
  soldText: { fontSize: 10, color: '#999', marginLeft: 6 },
  productSeller: { fontSize: 10, color: '#999', paddingHorizontal: 10, marginTop: 2 },
  priceRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10, marginTop: 6,
  },
  price: { fontSize: 15, fontWeight: 'bold', color: '#4F46E5' },
  coinPrice: { fontSize: 9, color: '#F59E0B', fontWeight: '600' },
  cartBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#4F46E5', borderRadius: 8,
    margin: 10, marginTop: 8, paddingVertical: 8,
  },
  cartBtnText: { color: '#fff', fontSize: 12, fontWeight: '700', marginLeft: 4 },

  empty: { justifyContent: 'center', alignItems: 'center', paddingVertical: 60 },
  emptyText: { fontSize: 14, color: '#999', marginTop: 12 },
});
