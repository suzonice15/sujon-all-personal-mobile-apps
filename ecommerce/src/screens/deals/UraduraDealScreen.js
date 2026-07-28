import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator,
  TouchableOpacity, Image, Dimensions, TextInput, ScrollView,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PriceSlider from '../../components/PriceSlider';
import { useTheme as usePaperTheme } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api_image } from '../../config/url';
import ProductCard from '../../components/ProductCard';
import {
  getOfferDetails,
  getOfferCategories,
  getOfferProducts,
  getBrandByCategory,
  getProductByBrand,
  filterOfferByPrice,
} from '../../api/homeApi';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const toFullBannerUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  return base + '/public/pages/' + path;
};

const DEFAULT_OFFER = 'offer';

export default function UraduraDealScreen({ navigation }) {
  const { colors } = usePaperTheme();
  const insets = useSafeAreaInsets();
  const listRef = useRef(null);

  const scrollToTop = () => {
    setTimeout(() => listRef.current?.scrollToOffset({ offset: 0, animated: true }), 300);
  };

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [offerBanner, setOfferBanner] = useState(null);
  const [offerActive, setOfferActive] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [valueMin, setValueMin] = useState('');
  const [valueMax, setValueMax] = useState('');
  const [globalMin, setGlobalMin] = useState(0);
  const [globalMax, setGlobalMax] = useState(50000);

  const [activePage, setActivePage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 20;
  const [filterMode, setFilterMode] = useState('none');

  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: undefined });
    }, [])
  );

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [offerRes, catRes, prodRes] = await Promise.all([
        getOfferDetails(DEFAULT_OFFER).catch(() => null),
        getOfferCategories().catch(() => []),
        getOfferProducts().catch(() => ({ products: [], min_price: 0, max_price: 50000 })),
      ]);

      if (offerRes?.setting) {
        setOfferBanner(toFullBannerUrl(offerRes.setting.offer_banner));
        setOfferActive(offerRes.setting.offerActiveStatus === 1);
      }

      const catList = Array.isArray(catRes) ? catRes : catRes?.data || catRes?.categories || [];
      setCategories(catList);

      const prodList = Array.isArray(prodRes)
        ? prodRes
        : prodRes?.products || prodRes?.data || [];
      setProducts(prodList);
      setTotal(prodList.length);

      const minP = prodRes?.min_price || 0;
      const maxP = prodRes?.max_price || 50000;
      setGlobalMin(minP);
      setGlobalMax(maxP);
      setValueMin(String(minP));
      setValueMax(String(maxP));
    } catch (e) {
      console.log('Offer init error:', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBrandsForCategory = async (categoryId) => {
    if (!categoryId) return;
    try {
      const res = await getBrandByCategory(categoryId, 1);
      setBrands(res?.brands || []);
    } catch (e) {
      setBrands([]);
    }
  };

  const handleApplyFilter = async (categoryId, brandId, minVal, maxVal) => {
    setFilterModalVisible(false);
    scrollToTop();
    setLoading(true);
    setActivePage(1);

    const minStr = minVal || String(globalMin);
    const maxStr = maxVal || String(globalMax);

    setSelectedCategory(categoryId);
    setSelectedBrand(brandId);
    setValueMin(minStr);
    setValueMax(maxStr);

    try {
      let res;
      if (brandId) {
        setFilterMode('brand');
        res = await getProductByBrand(brandId, 1);
        const list = res?.data || [];
        setProducts(list);
        setTotal(res?.total || list.length);
      } else if (categoryId) {
        setFilterMode('category');
        res = await getBrandByCategory(categoryId, 1);
        const list = res?.products?.data || res?.data || [];
        setProducts(list);
        setBrands(res?.brands || []);
        setTotal(res?.products?.total || res?.total || list.length);
      } else {
        setFilterMode('price');
        res = await filterOfferByPrice(minStr || 0, maxStr || 50000, 1);
        const list = res?.data || [];
        setProducts(list);
        setTotal(res?.total || list.length);
      }
    } catch (e) {
      console.log('Apply filter error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = activePage + 1;
    setLoading(true);
    try {
      let res;
      if (filterMode === 'category') {
        res = await getBrandByCategory(selectedCategory, nextPage);
      } else if (filterMode === 'brand') {
        res = await getProductByBrand(selectedBrand, nextPage);
      } else if (filterMode === 'price') {
        res = await filterOfferByPrice(valueMin || 0, valueMax || 50000, nextPage);
      } else {
        setLoading(false);
        return;
      }
      const newList = res?.products?.data || res?.data || [];
      setProducts((prev) => [...prev, ...newList]);
      setActivePage(nextPage);
      setTotal(res?.products?.total || res?.total || 0);
    } catch (e) {
      console.log('Load more error:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilter = () => {
    scrollToTop();
    setSelectedCategory(null);
    setSelectedBrand(null);
    setBrands([]);
    setFilterMode('none');
    setActivePage(1);
    setValueMin(String(globalMin));
    setValueMax(String(globalMax));
    loadInitialData();
  };

  const hasMore = products.length < total;

  if (loading && products.length === 0) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const renderHeader = () => (
    <View>
      {offerBanner && (
        <Image source={{ uri: offerBanner }} style={styles.bannerImg} resizeMode="cover" />
      )}
      {!offerBanner && (
        <View style={styles.bannerFallback}>
          <View style={[styles.bannerOverlay]} />
          <View style={styles.bannerContent}>
            <View style={styles.bannerTag}>
              <MaterialIcons name="local-offer" size={20} color="#fff" />
              <Text style={styles.bannerTagText}>SPECIAL OFFERS</Text>
            </View>
                <Text style={styles.bannerTitle}>Best Offers</Text>
                <Text style={styles.bannerSub}>Special discounts for limited time</Text>
          </View>
        </View>
      )}

      <View style={styles.countRow}>
        <Text style={styles.countText}>
          {total} products found
        </Text>
        <TouchableOpacity style={styles.filterToggle} onPress={() => setFilterModalVisible(true)}>
          <MaterialIcons name="filter-list" size={20} color="#EB592C" />
          <Text style={styles.filterToggleText}>Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <TouchableOpacity style={styles.loadMoreBtn} onPress={handleLoadMore}>
            <Text style={styles.loadMoreText}>Load More</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.empty}>
      <MaterialIcons name="card-giftcard" size={60} color="#ccc" />
      <Text style={styles.emptyText}>No products found</Text>
    </View>
  );

  if (!offerActive) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <MaterialIcons name="hourglass-empty" size={60} color="#ccc" />
        <Text style={styles.emptyText}>No offers available</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ref={listRef}
        data={products}
        keyExtractor={(item, i) => String(item.product_id || item.id || i)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <ProductCard
              item={item}
              colors={colors}
              onPress={(product) => navigation.navigate('ProductDetail', { product })}
            />
          </View>
        )}
      />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        categories={categories}
        brands={brands}
        activeCategory={selectedCategory}
        activeBrand={selectedBrand}
        activeMin={valueMin}
        activeMax={valueMax}
        globalMin={globalMin}
        globalMax={globalMax}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
        onFetchBrands={fetchBrandsForCategory}
        insets={insets}
      />
    </View>
  );
}

function FilterModal({
  visible, onClose,
  categories, brands,
  activeCategory, activeBrand,
  activeMin, activeMax, globalMin, globalMax,
  onApply, onReset,
  onFetchBrands,
  insets,
}) {
  const [tempCategory, setTempCategory] = useState(null);
  const [tempBrand, setTempBrand] = useState(null);
  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');

  React.useEffect(() => {
    if (visible) {
      setTempCategory(activeCategory);
      setTempBrand(activeBrand);
      setTempMin(activeMin);
      setTempMax(activeMax);
      if (activeCategory) onFetchBrands(activeCategory);
    }
  }, [visible]);

  const min = Number(tempMin) || globalMin;
  const max = Number(tempMax) || globalMax;

  const handleSliderMin = (val) => {
    setTempMin(String(val));
  };

  const handleSliderMax = (val) => {
    setTempMax(String(val));
  };

  const handleApply = () => {
    onApply(tempCategory, tempBrand, tempMin, tempMax);
  };

  const handleReset = () => {
    setTempCategory(null);
    setTempBrand(null);
    setTempMin(String(globalMin));
    setTempMax(String(globalMax));
    onReset();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View />
      </TouchableOpacity>
      <View style={[styles.modalContent, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.modalHandle} />
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filter</Text>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.length > 0 && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderRow}>
                <MaterialIcons name="category" size={18} color="#EB592C" />
                <Text style={styles.sectionTitle}> Categories</Text>
              </View>
              <View style={styles.chipWrap}>
                <TouchableOpacity
                  style={[styles.chip, !tempCategory && styles.chipActive]}
                  onPress={() => setTempCategory(null)}
                >
                  <Text style={[styles.chipText, !tempCategory && styles.chipTextActive]}>
                    All
                  </Text>
                </TouchableOpacity>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.category_id || cat.id}
                    style={[
                      styles.chip,
                      tempCategory === (cat.category_id || cat.id) && styles.chipActive,
                    ]}
                    onPress={() => {
                      setTempCategory(cat.category_id || cat.id);
                      setTempBrand(null);
                      onFetchBrands(cat.category_id || cat.id);
                    }}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        tempCategory === (cat.category_id || cat.id) && styles.chipTextActive,
                      ]}
                    >
                      {cat.category_title || cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {brands.length > 0 && tempCategory && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderRow}>
                <MaterialIcons name="branding-watermark" size={18} color="#EB592C" />
                <Text style={styles.sectionTitle}> Brands</Text>
              </View>
              <View style={styles.chipWrap}>
                <TouchableOpacity
                  style={[styles.chip, !tempBrand && styles.chipActive]}
                  onPress={() => setTempBrand(null)}
                >
                  <Text style={[styles.chipText, !tempBrand && styles.chipTextActive]}>
                    All
                  </Text>
                </TouchableOpacity>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand.brand_id || brand.id}
                    style={[
                      styles.chip,
                      tempBrand === (brand.brand_id || brand.id) && styles.chipActive,
                    ]}
                    onPress={() => setTempBrand(brand.brand_id || brand.id)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        tempBrand === (brand.brand_id || brand.id) && styles.chipTextActive,
                      ]}
                    >
                      {brand.brand_title || brand.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          <View style={styles.sectionWrap}>
            <View style={styles.priceRow}>
              <View style={styles.priceInputWrap}>
                <Text style={styles.priceInputSymbol}>৳</Text>
                <TextInput
                  style={styles.priceInput}
                  keyboardType="numeric"
                  value={String(min)}
                  onChangeText={(v) => setTempMin(v)}
                  placeholder="Min"
                  placeholderTextColor="#999"
                />
              </View>
              <Text style={styles.priceSep}>—</Text>
              <View style={styles.priceInputWrap}>
                <Text style={styles.priceInputSymbol}>৳</Text>
                <TextInput
                  style={styles.priceInput}
                  keyboardType="numeric"
                  value={String(max)}
                  onChangeText={(v) => setTempMax(v)}
                  placeholder="Max"
                  placeholderTextColor="#999"
                />
              </View>
            </View>
            <View style={styles.sliderWrap}>
              <View style={styles.sliderLabelRow}>
                <Text style={styles.sliderLabel}>৳{min.toLocaleString('en-IN')}</Text>
                <Text style={styles.sliderLabel}>৳{max.toLocaleString('en-IN')}</Text>
              </View>
              <PriceSlider
                min={globalMin}
                max={globalMax}
                valueMin={min}
                valueMax={max}
                onValueMinChange={handleSliderMin}
                onValueMaxChange={handleSliderMax}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.resetBtnLarge} onPress={handleReset}>
            <MaterialIcons name="refresh" size={20} color="#EB592C" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <MaterialIcons name="search" size={20} color="#fff" />
            <Text style={styles.applyBtnText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  bannerImg: {
    width: SCREEN_WIDTH,
    height: 210,
  },
  bannerFallback: {
    height: 200,
    backgroundColor: '#059669',
    justifyContent: 'center',
    padding: 24,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  bannerContent: {},
  bannerTag: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 100, marginBottom: 12,
  },
  bannerTagText: { color: '#fff', fontSize: 12, fontWeight: '800', letterSpacing: 1.2 },
  bannerTitle: { color: '#fff', fontSize: 26, fontWeight: '800', letterSpacing: -0.5 },
  bannerSub: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 6 },

  countRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8,
  },
  countText: {
    fontSize: 14, color: '#6B7280', fontWeight: '600',
  },
  filterToggle: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1, borderColor: '#FED7C2',
  },
  filterToggleText: {
    fontSize: 14, color: '#EB592C', fontWeight: '700',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
    paddingTop: 8,
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  modalHandle: {
    width: 48, height: 5,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 4,
  },
  modalHeader: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingVertical: 16,
    borderBottomWidth: 1, borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 20, fontWeight: '800', color: '#111827',
    letterSpacing: -0.3,
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },

  sectionWrap: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  sectionHeaderRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#111827',
    marginLeft: 6,
  },
  chipWrap: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  chip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
  },
  chipActive: {
    backgroundColor: '#EB592C',
    borderColor: '#EB592C',
  },
  chipText: {
    fontSize: 13, fontWeight: '600', color: '#6B7280',
  },
  chipTextActive: {
    color: '#fff',
  },

  priceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  priceInputWrap: {
    flex: 1,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12,
    backgroundColor: '#F9FAFB',
    paddingRight: 4,
  },
  priceInputSymbol: {
    fontSize: 15, fontWeight: '700', color: '#6B7280',
    paddingLeft: 12,
  },
  priceInput: {
    flex: 1,
    paddingHorizontal: 8, paddingVertical: 10,
    fontSize: 14, color: '#111827',
    fontWeight: '600',
  },
  priceSep: {
    fontSize: 18, color: '#D1D5DB', fontWeight: '300',
  },
  priceBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#EB592C',
    paddingHorizontal: 20, paddingVertical: 12,
    borderRadius: 12,
  },
  priceBtnText: {
    color: '#fff', fontSize: 14, fontWeight: '700',
  },

  sliderWrap: {
    marginTop: 16,
    paddingHorizontal: 4,
  },
  sliderLabelRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 8,
  },
  sliderLabel: {
    fontSize: 13, fontWeight: '700', color: '#374151',
  },

  bottomActions: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 24, paddingTop: 16, paddingBottom: 8,
    borderTopWidth: 1, borderTopColor: '#F3F4F6',
  },
  resetBtnLarge: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1.5, borderColor: '#EB592C',
    backgroundColor: '#FFF5F0',
    flex: 1,
  },
  resetText: {
    fontSize: 15, color: '#EB592C', fontWeight: '700',
  },
  applyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: '#EB592C',
    paddingVertical: 14, paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
  },
  applyBtnText: {
    color: '#fff', fontSize: 15, fontWeight: '700',
  },

  footer: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  loadMoreBtn: {
    backgroundColor: '#EB592C',
    paddingHorizontal: 40, paddingVertical: 14,
    borderRadius: 100,
    elevation: 4,
    shadowColor: '#EB592C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loadMoreText: {
    color: '#fff', fontSize: 15, fontWeight: '800',
    letterSpacing: 0.5,
  },

  empty: { alignItems: 'center', marginTop: 80 },
  emptyText: { fontSize: 16, color: '#9CA3AF', marginTop: 16, fontWeight: '600' },
});
