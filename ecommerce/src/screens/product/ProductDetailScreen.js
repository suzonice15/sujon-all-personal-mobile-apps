import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Dimensions, Linking, FlatList, Animated, RefreshControl,
  Modal, StatusBar, Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme as usePaperTheme, Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { api_image } from '../../config/url';
import { useCart } from '../../context/CartContext';
import RenderHtml from 'react-native-render-html';
import ProductCard from '../../components/ProductCard';
import { api } from '../../api/client';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const imgUrl = (item, image) => {
  if (image) return toFullUrl(image, 'products/' + (item.folder || ''));
  if (!item.main_image) return null;
  return toFullUrl(item.main_image, 'products/' + (item.folder || ''));
};

const formatPrice = (num) => {
  const n = Number(num);
  if (isNaN(n)) return '0';
  return n.toLocaleString('en-IN');
};

function StarRating({ rating, size = 14, interactive = false, onChange }) {
  const [selected, setSelected] = useState(rating || 0);
  const display = interactive ? selected : rating;
  const full = Math.floor(display);
  const half = display % 1 >= 0.5;
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const iconName = i < full ? 'star' : i === full && half ? 'star-half' : 'star-border';
    const color = i < full || (i === full && half) ? '#F59E0B' : '#D1D5DB';
    stars.push(
      <TouchableOpacity
        key={i}
        disabled={!interactive}
        onPress={() => { setSelected(i + 1); onChange?.(i + 1); }}
      >
        <MaterialIcons name={iconName} size={size} color={color} />
      </TouchableOpacity>
    );
  }
  return <View style={{ flexDirection: 'row' }}>{stars}</View>;
}

function CollapsibleSection({ title, icon, defaultOpen = true, children, colors }) {
  const [open, setOpen] = useState(defaultOpen);
  const rotation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(rotation, { toValue, useNativeDriver: true, bounciness: 12 }).start();
    setOpen(!open);
  };

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={[acc.section, { backgroundColor: colors.surface || '#fff' }]}>
      <TouchableOpacity style={acc.header} onPress={toggle} activeOpacity={0.7}>
        <View style={acc.headerLeft}>
          <MaterialIcons name={icon} size={20} color={colors.primary || '#4F46E5'} />
          <Text style={[acc.title, { color: colors.text }]}>{title}</Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.text} />
        </Animated.View>
      </TouchableOpacity>
      {open && <View style={acc.content}>{children}</View>}
    </View>
  );
}

const acc = StyleSheet.create({
  section: { marginTop: 0, marginBottom: 10, marginHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', backgroundColor: '#fff', overflow: 'hidden' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontSize: 14, fontWeight: '700' },
  content: { paddingHorizontal: 14, paddingVertical: 10 },
});

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

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { colors } = usePaperTheme();
  const insets = useSafeAreaInsets();
  const { addItem, count } = useCart();
  const [snackVisible, setSnackVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const scrollRef = useRef(null);
  const reviewRef = useRef(null);
  const imageRef = useRef(null);
  const cartRef = useRef(null);
  const flyAnim = useRef(new Animated.Value(0)).current;
  const flyPos = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [flyImage, setFlyImage] = useState(null);
  const [flyTarget, setFlyTarget] = useState({ x: 0, y: 0 });

  const [fullScreenVisible, setFullScreenVisible] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(0);
  const carouselRef = useRef(null);
  const [fullProduct, setFullProduct] = useState(product);
  const [specifications, setSpecifications] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviewCount, setReviewCount] = useState({ total: 0, average: 0, five: 0, four: 0, three: 0, two: 0, one: 0 });
  const [emiInfo, setEmiInfo] = useState([]);
  const [emiModalVisible, setEmiModalVisible] = useState(false);
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [singleEmiRecord, setSingleEmiRecord] = useState(null);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        tabBarStyle: { display: 'none' },
      });
    }
    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            height: Platform.OS === 'android' ? 65 + insets.bottom : 65,
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            paddingBottom: Platform.OS === 'android' ? insets.bottom + 8 : 8,
            paddingTop: 6,
            display: 'flex',
          },
        });
      }
    };
  }, [navigation]);

  const p = fullProduct;
  const price = p.discount_price || p.product_price;
  const oldPrice = p.product_price;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const hasOffer = discount > 0;
  const inStock = true;
  const emiInterest = 3;
  const emiTotal = Math.round(price + (price * emiInterest) / 100);
  const emiMonthly = Math.round(emiTotal / 3);

  const galleryImages = [
    p.main_image,
    p.galary_image_1,
    p.galary_image_2,
    p.galary_image_3,
    p.galary_image_4,
  ].filter(Boolean);

  const currentImage = galleryImages[fullScreenIndex] || galleryImages[0];
  const imageUri = imgUrl(p, currentImage);

  const fetchFullProduct = async () => {
    try {
      const slug = p.product_name || p.product_title;
      if (!slug) return;
      const res = await api.get(`/product/${slug}`);
      if (res && res.product_id) {
        setFullProduct(res);
        const bid = res.brand_id || 0;
        const pid = res.product_id || res.id;
        if (bid && pid) {
          const rel = await api.get(`/related-product/${bid}/${pid}`);
          if (Array.isArray(rel)) setRelatedProducts(rel);
        }
      }
    } catch (e) {}
  };

  const fetchSpecifications = async () => {
    try {
      const res = await api.get(`/getSpecification/${p.product_id || p.id}`);
      if (Array.isArray(res)) setSpecifications(res);
    } catch (e) {}
  };

  const fetchReviews = async () => {
    try {
      const pid = p.product_id || p.id;
      const [reviewList, countData] = await Promise.all([
        api.get(`/getReviewByProduct/${pid}`),
        api.get(`/reviewCount/${pid}`).catch(() => null),
      ]);
      if (Array.isArray(reviewList)) setReviews(reviewList);
      if (countData) {
        setReviewCount({
          total: countData.total || 0,
          average: countData.avarage || 0,
          five: countData.fiveRating || 0,
          four: countData.fourRating || 0,
          three: countData.threeRating || 0,
          two: countData.twoRating || 0,
          one: countData.oneRating || 0,
        });
      }
    } catch (e) {}
  };

  const fetchEmiInfo = async () => {
    try {
      const res = await api.get('/emiInfo');
      if (Array.isArray(res)) {
        setEmiInfo(res);
        if (res.length > 0 && !selectedBankId) {
          setSelectedBankId(res[0].id);
        }
      }
    } catch (e) {}
  };

  const fetchSingleEmiRecord = async (bankId) => {
    try {
      const res = await api.get(`/emiShow/${bankId}`);
      if (res) setSingleEmiRecord(res);
    } catch (e) {}
  };

  const emiPrice = (price, type) => {
    const rate = 3;
    const totalEmiPrice = parseInt(price) + (price * rate) / 100;
    if (type === 'all') {
      return Math.round(totalEmiPrice);
    } else {
      return Math.round(totalEmiPrice / 3);
    }
  };

  const singleEmiProductPrice = (price, month, rate) => {
    if (!rate || rate <= 0) return null;
    const totalEmiPrice = parseInt(price) + (price * rate) / 100;
    return { month, overallCost: Math.round(totalEmiPrice) };
  };

  useEffect(() => {
    fetchFullProduct();
    fetchSpecifications();
    fetchReviews();
    fetchEmiInfo();
  }, [p.product_id || p.id]);

  useEffect(() => {
    if (selectedBankId) fetchSingleEmiRecord(selectedBankId);
  }, [selectedBankId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: p.product_title || 'Product',
      headerRight: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity onPress={() => navigation.navigate('SearchProduct')}>
            <MaterialIcons name="search" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ position: 'relative' }}>
            <MaterialIcons name="shopping-cart" size={24} color="#fff" />
            {count > 0 && (
              <View style={styles.headerCartBadge}>
                <Text style={styles.headerCartBadgeText}>{count > 99 ? '99+' : count}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, product, count]);

  const handleAddToCart = () => {
    addItem(p);
    setSnackVisible(true);
  };

  const startFlyToCart = () => {
    if (!cartRef.current) { handleAddToCart(); return; }
    cartRef.current.measure((fx, fy, fw, fh, px, py) => {
      if (px === undefined || py === undefined) { handleAddToCart(); return; }
      const sourceX = px + fw / 2;
      const sourceY = py + fh / 2;
      const destX = SCREEN_WIDTH - 50;
      const destY = 40;
      setFlyImage(imageUri);
      setFlyTarget({ x: destX - sourceX, y: destY - sourceY });
      flyPos.setValue({ x: sourceX - 25, y: sourceY - 25 });
      flyAnim.setValue(0);
      Animated.spring(flyAnim, { toValue: 1, friction: 6, tension: 80, useNativeDriver: false }).start(() => {
        setFlyImage(null);
        handleAddToCart();
      });
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigation.navigate('Cart');
  };

  const handleCall = () => Linking.openURL('tel:+8801837441061');

  const scrollToReviews = () => {
    reviewRef.current?.measureLayout(scrollRef.current, (x, y) => {
      scrollRef.current.scrollTo({ y: y - 20, animated: true });
    }, () => {});
  };

  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchFullProduct(), fetchSpecifications(), fetchReviews()]).then(() => setRefreshing(false));
  };

  const tagsStyles = {
    body: { color: colors.text, fontSize: 14, lineHeight: 22 },
    p: { marginBottom: 8 },
    a: { color: colors.primary },
    strong: { fontWeight: '700' },
    ul: { paddingLeft: 16 },
    li: { marginBottom: 4 },
  };

  return (
    <>
        <ScrollView
        ref={scrollRef}
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#EB592C']} tintColor="#EB592C" />}
        onScroll={(e) => { scrollRef.current.__lastScrollY = e.nativeEvent.contentOffset.y; }}
        scrollEventThrottle={16}
      >
        {/* Image Carousel */}
        {galleryImages.length > 0 && (
          <View style={styles.carouselWrap}>
            <FlatList
              ref={carouselRef}
              data={galleryImages}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setFullScreenIndex(index);
              }}
              keyExtractor={(item, i) => String(i)}
              renderItem={({ item, index }) => (
                <TouchableOpacity activeOpacity={0.9} delayPressIn={0} delayPressOut={0} onPress={() => { setFullScreenIndex(index); setFullScreenVisible(true); }}>
                  <View style={styles.carouselItem}>
                    <View ref={imageRef} collapsable={false}>
                      <Image source={{ uri: imgUrl(p, item) }} style={styles.carouselImage} resizeMode="contain" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
            {galleryImages.length > 1 && (
              <View style={styles.dotRow}>
                {galleryImages.map((_, i) => (
                  <View key={i} style={[styles.dot, fullScreenIndex === i && styles.dotActive]} />
                ))}
              </View>
            )}
            {hasOffer && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountBadgeText}>-{discount}%</Text>
              </View>
            )}
          </View>
        )}

        {/* Full Screen Image Viewer */}
        <Modal visible={fullScreenVisible} transparent animationType="fade" onRequestClose={() => setFullScreenVisible(false)}>
          <StatusBar hidden />
          <View style={styles.fullScreenContainer}>
            <TouchableOpacity style={styles.fullScreenClose} onPress={() => setFullScreenVisible(false)}>
              <MaterialIcons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <FlatList
              data={galleryImages}
              horizontal
              pagingEnabled
              initialScrollIndex={fullScreenIndex}
              getItemLayout={(_, index) => ({ length: SCREEN_WIDTH, offset: SCREEN_WIDTH * index, index })}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(e) => {
                const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                setFullScreenIndex(index);
              }}
              keyExtractor={(item, i) => String(i)}
              renderItem={({ item }) => (
                <View style={styles.fullScreenItem}>
                  <Image source={{ uri: imgUrl(p, item) }} style={styles.fullScreenImage} resizeMode="contain" />
                </View>
              )}
            />
            {galleryImages.length > 1 && (
              <View style={styles.fullScreenCounter}>
                <Text style={styles.fullScreenCounterText}>{fullScreenIndex + 1} / {galleryImages.length}</Text>
              </View>
            )}
          </View>
        </Modal>

        {/* Product Info Card */}
        <View style={styles.contentCard}>
          <Text style={[styles.title, { color: colors.text }]}>{p.product_title}</Text>

          <View style={[styles.statusSingleRow, { marginTop: 10 }]}>
            <View style={[styles.statusBadge, { backgroundColor: inStock ? '#DCFCE7' : '#FEE2E2' }]}>
              <MaterialIcons name={inStock ? 'check-circle' : 'cancel'} size={13} color={inStock ? '#16A34A' : '#DC2626'} />
              <Text style={[styles.statusText, { color: inStock ? '#16A34A' : '#DC2626' }]}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
            {p.sku && (
              <View style={styles.codeBadge}>
                <Text style={styles.codeLabelText}>Product Code: </Text>
                <Text style={styles.codeValueText}>{p.sku}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.reviewBadge} onPress={scrollToReviews} activeOpacity={0.7}>
              <StarRating rating={reviewCount.average} size={12} />
              <Text style={styles.reviewCountText}>({reviewCount.total})</Text>
            </TouchableOpacity>
          </View>

          {p.product_short_description ? (
            <View style={{ marginTop: 10 }}>
              <RenderHtml contentWidth={SCREEN_WIDTH - 44} source={{ html: p.product_short_description }} tagsStyles={tagsStyles} baseStyle={{ color: colors.text, fontSize: 14 }} />
            </View>
          ) : null}
        </View>

        {/* Price Comparison */}
        <View style={styles.priceComparisonContainer}>
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
                  <View style={styles.savingBadge}><Text style={styles.savingBadgeText}>Save {discount}%</Text></View>
                </View>
              )}
            </View>
            <View style={styles.priceCardFooter}>
              <TouchableOpacity style={styles.paymentMethodBtn}>
                <Text style={styles.priceDescriptionText}>Check available payment method</Text>
              </TouchableOpacity>
              <View style={styles.bulkRow}>
                <Text style={styles.bulkQuantityText}>
                  Contact for bulk quantity: <Text style={styles.contactNumberText} onPress={handleCall}>01837-441061</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* EMI Card */}
          <View style={styles.emiPriceCard}>
            <View style={styles.priceCardHeader}>
              <MaterialIcons name="credit-card" size={18} color="#EA580C" />
              <Text style={[styles.priceCardTitle, { color: '#111' }]}>EMI Price*</Text>
            </View>
            <View style={styles.priceCardBody}>
              <Text style={styles.mainPriceText}>৳ {formatPrice(emiTotal)}</Text>
              <TouchableOpacity onPress={() => setEmiModalVisible(true)}>
                <Text style={styles.emiLinkText}>
                  Starting from {formatPrice(emiMonthly)}৳/month. {`\n`}
                  For Discount Price Click here to view {emiInfo.length} banks EMI Plans
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Collapsible Sections */}
        <View style={styles.accordionWrap}>
          {/* Specifications */}
          <CollapsibleSection title="Specifications" icon="format-list-bulleted" defaultOpen colors={colors}>
            {specifications.length > 0 ? (
              <View style={styles.specTable}>
                {specifications.map((spec, i) => (
                  <View key={i} style={[styles.specRow, i % 2 === 0 && { backgroundColor: '#F9FAFB' }]}>
                    <Text style={styles.specKey}>{spec.key}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={[styles.noData, { color: colors.muted || '#6B7280' }]}>There are no specifications</Text>
            )}
          </CollapsibleSection>

          {/* Description */}
          <CollapsibleSection title="Description" icon="description" defaultOpen colors={colors}>
            {p.product_description ? (
              <RenderHtml contentWidth={SCREEN_WIDTH - 48} source={{ html: p.product_description }} tagsStyles={tagsStyles} baseStyle={{ color: colors.text }} />
            ) : (
              <Text style={[styles.noData, { color: colors.muted || '#6B7280' }]}>No description available</Text>
            )}
          </CollapsibleSection>

          {/* Video */}
          <CollapsibleSection title="Video" icon="play-circle-outline" colors={colors}>
            {p.product_video ? (
              <View style={styles.videoContainer}>
                <YoutubePlayer
                  height={220}
                  play={false}
                  videoId={p.product_video}
                  webViewProps={{ androidLayerType: 'hardware' }}
                />
              </View>
            ) : (
              <Text style={[styles.noData, { color: colors.muted || '#6B7280' }]}>No video available</Text>
            )}
          </CollapsibleSection>

          {/* Reviews */}
          <View ref={reviewRef}>
          <CollapsibleSection title={`Reviews (${reviewCount.total})`} icon="rate-review" defaultOpen colors={colors}>
            {/* Rating Overview */}
            <View style={styles.ratingOverview}>
              <View style={styles.ratingLeft}>
                <Text style={[styles.ratingBig, { color: colors.text }]}>{reviewCount.average.toFixed(1)}</Text>
                <StarRating rating={reviewCount.average} size={18} />
                <Text style={[styles.ratingTotal, { color: colors.muted || '#6B7280' }]}>{reviewCount.total} total</Text>
              </View>
              <View style={styles.ratingRight}>
                <RatingBar star={5} count={reviewCount.five} total={reviewCount.total} />
                <RatingBar star={4} count={reviewCount.four} total={reviewCount.total} />
                <RatingBar star={3} count={reviewCount.three} total={reviewCount.total} />
                <RatingBar star={2} count={reviewCount.two} total={reviewCount.total} />
                <RatingBar star={1} count={reviewCount.one} total={reviewCount.total} />
              </View>
            </View>

            {/* Review List */}
            <View style={styles.reviewList}>
              {reviews.length > 0 ? reviews.map((r, i) => (
                <View key={i} style={styles.reviewItem}>
                  <View style={styles.reviewItemHeader}>
                    <View>
                      <StarRating rating={r.rating} size={14} />
                      <Text style={[styles.reviewName, { color: colors.text }]}>{r.name}</Text>
                    </View>
                    <Text style={styles.reviewDate}>{r.created_time ? new Date(r.created_time).toLocaleDateString() : ''}</Text>
                  </View>
                  <Text style={[styles.reviewComment, { color: colors.text }]}>{r.comment}</Text>
                </View>
              )) : (
                <Text style={[styles.noData, { color: colors.muted || '#6B7280' }]}>There are no reviews yet</Text>
              )}
            </View>
          </CollapsibleSection>
          </View>
        </View>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <View style={{ marginHorizontal: 12, marginTop: 8 }}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Related Products</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {relatedProducts.map((item) => (
                <View key={String(item.product_id || item.id)} style={styles.relatedCardWrap}>
                  <ProductCard item={item} colors={colors} onPress={(p) => navigation.push('ProductDetail', { product: p })} />
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Fixed Bottom Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity ref={cartRef} style={styles.btnCart} onPress={startFlyToCart} activeOpacity={0.8}>
          <MaterialIcons name="add-shopping-cart" size={20} color="#fff" />
          <Text style={styles.btnCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnBuy} onPress={handleBuyNow} activeOpacity={0.8}>
          <MaterialIcons name="flash-on" size={20} color="#fff" />
          <Text style={styles.btnBuyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>

      <Snackbar visible={snackVisible} onDismiss={() => setSnackVisible(false)} duration={2500} action={{ label: 'View Cart', onPress: () => navigation.navigate('Cart') }}>
        Added to cart
      </Snackbar>

      {/* Fly to Cart Animation */}
      {flyImage && (
        <Animated.View style={[styles.flyImageWrap, {
          left: flyPos.x,
          top: flyPos.y,
          opacity: flyAnim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] }),
          transform: [
            { translateX: flyAnim.interpolate({ inputRange: [0, 1], outputRange: [0, flyTarget.x] }) },
            { translateY: flyAnim.interpolate({ inputRange: [0, 1], outputRange: [0, flyTarget.y] }) },
            { scale: flyAnim.interpolate({ inputRange: [0, 0.8, 1], outputRange: [1, 0.4, 0.2] }) },
          ],
        }]}>
          <Image source={{ uri: flyImage }} style={styles.flyImage} />
        </Animated.View>
      )}

      {/* EMI Modal */}
      <Modal visible={emiModalVisible} transparent animationType="slide" onRequestClose={() => setEmiModalVisible(false)}>
        <View style={styles.emiModalOverlay}>
          <View style={styles.emiModalContent}>
            <View style={styles.emiModalHeader}>
              <Text style={styles.emiModalTitle}>EMI Price Calculator</Text>
              <TouchableOpacity onPress={() => setEmiModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#111" />
              </TouchableOpacity>
            </View>
            <View style={styles.emiModalBody}>
              <View style={styles.emiBankList}>
                <Text style={styles.emiBankListTitle}>Select Bank</Text>
                <FlatList
                  data={emiInfo}
                  keyExtractor={(item) => String(item.id)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.emiBankItem, selectedBankId === item.id && styles.emiBankItemActive]}
                      onPress={() => setSelectedBankId(item.id)}
                    >
                      <Text style={[styles.emiBankItemText, selectedBankId === item.id && styles.emiBankItemTextActive]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.emiTableContainer}>
                <View style={styles.emiTableHeader}>
                  <Text style={styles.emiTableHeaderText}>Month</Text>
                  <Text style={styles.emiTableHeaderText}>Overall Cost</Text>
                </View>
                {singleEmiRecord && (
                  <View>
                    {[
                      { month: 3, rate: singleEmiRecord.month_3 },
                      { month: 6, rate: singleEmiRecord.month_6 },
                      { month: 9, rate: singleEmiRecord.month_9 },
                      { month: 12, rate: singleEmiRecord.month_12 },
                      { month: 18, rate: singleEmiRecord.month_18 },
                      { month: 24, rate: singleEmiRecord.month_24 },
                      { month: 30, rate: singleEmiRecord.month_30 },
                      { month: 36, rate: singleEmiRecord.month_36 },
                    ].map((item, index) => {
                      const emiData = singleEmiProductPrice(price, item.month, item.rate);
                      if (!emiData) return null;
                      return (
                        <View key={index} style={[styles.emiTableRow, index % 2 === 0 && { backgroundColor: '#F9FAFB' }]}>
                          <Text style={styles.emiTableCell}>{emiData.month} Month</Text>
                          <Text style={styles.emiTableCell}>৳ {formatPrice(emiData.overallCost)}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.emiModalFooter} onPress={() => { setEmiModalVisible(false); navigation.navigate('EmiInfo'); }}>
              <Text style={styles.emiModalFooterText}>Find Our All Payment Partners</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  /* Image Gallery */
  carouselWrap: { position: 'relative', backgroundColor: '#fff' },
  carouselItem: { width: SCREEN_WIDTH, height: SCREEN_WIDTH * 0.75, alignItems: 'center', justifyContent: 'center' },
  carouselImage: { width: SCREEN_WIDTH - 32, height: SCREEN_WIDTH * 0.7 },
  dotRow: { flexDirection: 'row', justifyContent: 'center', paddingVertical: 8, gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: '#EB592C', width: 20 },
  discountBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#EF4444', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 },
  discountBadgeText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  thumbnailList: { backgroundColor: '#fff' },
  thumbnail: { width: 60, height: 60, borderRadius: 8, borderWidth: 2, borderColor: 'transparent' },
  thumbnailActive: { borderColor: '#EB592C' },

  /* Full Screen Viewer */
  fullScreenContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)', justifyContent: 'center', alignItems: 'center' },
  fullScreenClose: { position: 'absolute', top: 40, right: 16, zIndex: 10, padding: 8 },
  fullScreenItem: { width: SCREEN_WIDTH, height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center' },
  fullScreenImage: { width: SCREEN_WIDTH - 16, height: Dimensions.get('window').height - 120 },
  fullScreenCounter: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 6 },
  fullScreenCounterText: { color: '#fff', fontSize: 14, fontWeight: '600' },

  /* Section */
  section: { padding: 16 },
  contentCard: { marginHorizontal: 12, marginTop: 8, backgroundColor: '#fff', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#E5E7EB' },

  /* Title */
  title: { fontSize: 18, fontWeight: '700', lineHeight: 24 },

  /* Status */
  statusSingleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  statusText: { fontSize: 12, fontWeight: '700' },
  codeBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  codeLabelText: { fontSize: 11, fontWeight: '500', color: '#6B7280' },
  codeValueText: { fontSize: 12, fontWeight: '700', color: '#374151' },
  reviewBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FEF3C7', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  reviewLabelText: { fontSize: 11, fontWeight: '600', color: '#D97706' },
  reviewCountText: { fontSize: 11, fontWeight: '600', color: '#D97706' },

  /* Short Desc */
  shortDesc: { fontSize: 14, lineHeight: 22 },

  /* Price Comparison */
  priceComparisonContainer: { gap: 10, marginHorizontal: 12, marginTop: 8 },
  cashDiscountCard: { width: '100%', backgroundColor: '#F0FDF4', borderRadius: 12, overflow: 'hidden' },
  emiPriceCard: { width: '100%', backgroundColor: '#FFF7ED', borderRadius: 12, overflow: 'hidden' },
  priceCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 14, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  priceCardTitle: { fontSize: 13, fontWeight: '700', color: '#111', textTransform: 'uppercase', letterSpacing: 0.5 },
  priceCardBody: { paddingHorizontal: 14, paddingVertical: 12 },
  mainPriceText: { fontSize: 28, fontWeight: '800', color: '#EA580C' },
  oldPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  oldPriceText: { fontSize: 15, color: '#9CA3AF', textDecorationLine: 'line-through' },
  savingBadge: { backgroundColor: '#DCFCE7', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  savingBadgeText: { color: '#111', fontSize: 11, fontWeight: '700' },
  savingAmountText: { fontSize: 12, color: '#111', fontWeight: '600', marginTop: 4 },
  priceCardFooter: { paddingHorizontal: 14, paddingBottom: 12, gap: 8 },
  paymentMethodBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  priceDescriptionText: { fontSize: 12, color: '#111', fontWeight: '600' },
  bulkRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bulkQuantityText: { fontSize: 12, color: '#111', flex: 1 },
  contactNumberText: { fontWeight: '800', color: '#111' },
  emiRequiredBadge: { backgroundColor: '#EA580C', borderRadius: 8, width: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  emiRequiredText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  emiMonthlyText: { fontSize: 13, color: '#6B7280', marginTop: 4 },
  emiMonthlyBold: { fontSize: 13, fontWeight: '700', color: '#111' },
  emiPlanBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  emiPlanLinkText: { fontSize: 12, color: '#4F46E5', fontWeight: '600', textDecorationLine: 'underline' },

  /* Accordion */
  accordionWrap: { marginTop: 4 },
  noData: { fontSize: 13, textAlign: 'center', paddingVertical: 16 },

  /* Specifications Table */
  specTable: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, overflow: 'hidden' },
  specRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  specKey: { width: '35%', fontSize: 12, fontWeight: '700', color: '#374151', paddingVertical: 8, paddingHorizontal: 10, backgroundColor: '#F9FAFB' },
  specValue: { flex: 1, fontSize: 12, color: '#6B7280', paddingVertical: 8, paddingHorizontal: 10 },

  /* Video */
  videoContainer: { width: '100%', borderRadius: 8, overflow: 'hidden', backgroundColor: '#000' },

  /* Reviews */
  ratingOverview: { flexDirection: 'row', marginBottom: 12, gap: 12 },
  ratingLeft: { alignItems: 'center', minWidth: 80 },
  ratingRight: { flex: 1 },
  ratingBig: { fontSize: 30, fontWeight: '800' },
  ratingTotal: { fontSize: 11, marginTop: 2 },

  /* Review List */
  reviewList: { marginTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#E5E7EB', paddingTop: 8 },
  reviewItem: { marginBottom: 10, paddingBottom: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  reviewItemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  reviewName: { fontSize: 12, fontWeight: '600', marginTop: 2 },
  reviewDate: { fontSize: 10, color: '#9CA3AF' },
  reviewComment: { fontSize: 12, lineHeight: 18, marginTop: 4 },

  /* Header Cart Badge */
  headerCartBadge: { position: 'absolute', top: -6, right: -10, backgroundColor: '#EF4444', borderRadius: 10, minWidth: 18, height: 18, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  headerCartBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  /* Bottom Bar */
  bottomBar: { flexDirection: 'row', paddingHorizontal: 14, paddingTop: 10, backgroundColor: '#fff', gap: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 15 },
  btnCart: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 14, backgroundColor: '#EB592C', shadowColor: '#EB592C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  btnCartText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnBuy: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 52, borderRadius: 14, backgroundColor: '#000', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  btnBuyText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  /* Related */
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 10 },
  relatedCardWrap: { width: '48%', margin: '1%' },

  /* EMI Link */
  emiLinkText: { fontSize: 12, color: '#111', fontWeight: '600',  marginTop: 4 },

  /* EMI Modal */
  emiModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  emiModalContent: { width: '100%', maxHeight: '80%', backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden' },
  emiModalHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  emiModalTitle: { fontSize: 16, fontWeight: '700', color: '#111' },
  emiModalBody: { flexDirection: 'row', height: 320 },
  emiBankList: { width: '45%', borderRightWidth: 1, borderRightColor: '#E5E7EB' },
  emiBankListTitle: { fontSize: 13, fontWeight: '700', color: '#111', paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E5E7EB', backgroundColor: '#F9FAFB' },
  emiBankItem: { paddingHorizontal: 12, paddingVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  emiBankItemActive: { backgroundColor: '#EB592C' },
  emiBankItemText: { fontSize: 12, color: '#374151' },
  emiBankItemTextActive: { color: '#fff', fontWeight: '700' },
  emiTableContainer: { flex: 1 },
  emiTableHeader: { flexDirection: 'row', backgroundColor: '#F9FAFB', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  emiTableHeaderText: { flex: 1, fontSize: 12, fontWeight: '700', color: '#111', textAlign: 'center', paddingVertical: 10 },
  emiTableRow: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#E5E7EB' },
  emiTableCell: { flex: 1, fontSize: 12, color: '#374151', textAlign: 'center', paddingVertical: 8 },
  emiModalFooter: { paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', alignItems: 'center' },
  emiModalFooterText: { fontSize: 14, fontWeight: '700', color: '#111' },

  /* Fly to Cart */
  flyImageWrap: { position: 'absolute', width: 50, height: 50, borderRadius: 25, overflow: 'hidden', zIndex: 9999 },
  flyImage: { width: 50, height: 50 },
});
