import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator,
  ScrollView, Modal, PanResponder, Dimensions, TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCategoryProducts } from '../../api/homeApi';
import { useTheme as usePaperTheme } from 'react-native-paper';
import ProductCard from '../../components/ProductCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_PADDING = 20;
const SLIDER_WIDTH = SCREEN_WIDTH - 40;

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price (Low to High)', value: 'price_asc' },
  { label: 'Price (High to Low)', value: 'price_desc' },
  { label: 'Name (A-Z)', value: 'name_asc' },
  { label: 'Name (Z-A)', value: 'name_desc' },
];

function getEffectivePrice(item) {
  if (item.offerActive === 1 && item.offer_price > 0) return Number(item.offer_price);
  return Number(item.product_price || 0);
}

function RangeSlider({ min, max, low, high, onLowChange, onHighChange }) {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(SLIDER_WIDTH - SLIDER_PADDING * 2);
  const range = max - min || 1;

  const lowPercent = ((low - min) / range) * 100;
  const highPercent = ((high - min) / range) * 100;

  const posToValue = (pageX, trackLeft) => {
    const ratio = Math.max(0, Math.min(1, (pageX - trackLeft) / trackWidth));
    return Math.round(min + ratio * range);
  };

  const createPanResponder = (isLow) => {
    let startValue = 0;
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        startValue = isLow ? low : high;
      },
      onPanResponderMove: (_, gesture) => {
        trackRef.current?.measure((x, y, w, h, pageX) => {
          const newVal = posToValue(pageX + gesture.moveX - (isLow ? 0 : 0), pageX);
          if (isLow) {
            onLowChange(Math.min(newVal, high));
          } else {
            onHighChange(Math.max(newVal, low));
          }
        });
      },
    });
  };

  const lowPan = useRef(createPanResponder(true)).current;
  const highPan = useRef(createPanResponder(false)).current;

  return (
    <View style={sliderStyles.wrap}>
      <View style={sliderStyles.labels}>
        <Text style={sliderStyles.labelText}>৳{low.toLocaleString('en-IN')}</Text>
        <Text style={sliderStyles.labelText}>৳{high.toLocaleString('en-IN')}</Text>
      </View>
      <View
        ref={trackRef}
        style={sliderStyles.track}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      >
        <View
          style={[
            sliderStyles.fill,
            { left: `${lowPercent}%`, width: `${highPercent - lowPercent}%` },
          ]}
        />
        <View
          style={[sliderStyles.thumb, { left: `${lowPercent}%` }]}
          {...lowPan.panHandlers}
        />
        <View
          style={[sliderStyles.thumb, { left: `${highPercent}%` }]}
          {...highPan.panHandlers}
        />
      </View>
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  wrap: { paddingHorizontal: SLIDER_PADDING, marginTop: 8 },
  labels: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelText: { fontSize: 14, fontWeight: '700', color: '#EB592C' },
  track: {
    height: 6, backgroundColor: '#E5E7EB', borderRadius: 3,
    position: 'relative', justifyContent: 'center',
  },
  fill: {
    position: 'absolute', height: 6, backgroundColor: '#EB592C',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute', top: -10,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#fff', borderWidth: 3, borderColor: '#EB592C',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 3,
    marginLeft: -13,
  },
});

export default function CategoryScreen({ route, navigation }) {
  const { category } = route.params;
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [showSort, setShowSort] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [sliderLow, setSliderLow] = useState(0);
  const [sliderHigh, setSliderHigh] = useState(0);
  const [appliedLow, setAppliedLow] = useState(0);
  const [appliedHigh, setAppliedHigh] = useState(0);
  const { colors } = usePaperTheme();

  const catName = category.category_title || category.name || category.title ||               'Category';
  const slug = category.slug || category.category_slug || category.category_title?.toLowerCase().replace(/\s+/g, '-');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res = await getCategoryProducts(slug);
      const list = Array.isArray(res) ? res : res?.data || res?.products || [];
      setAllProducts(list);
      if (res?.brands) setBrands(res.brands);
    } catch (e) {
      console.log('Category load error:', e);
    } finally {
      setLoading(false);
    }
  };

  const globalMin = allProducts.length > 0 ? Math.min(...allProducts.map(p => getEffectivePrice(p))) : 0;
  const globalMax = allProducts.length > 0 ? Math.max(...allProducts.map(p => getEffectivePrice(p))) : 100000;

  const filtered = allProducts.filter((p) => {
    if (selectedBrandId && Number(p.brand_id) !== Number(selectedBrandId)) return false;
    const price = getEffectivePrice(p);
    if (appliedLow > 0 && price < appliedLow) return false;
    if (appliedHigh > 0 && price > appliedHigh) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price_asc') return getEffectivePrice(a) - getEffectivePrice(b);
    if (sortBy === 'price_desc') return getEffectivePrice(b) - getEffectivePrice(a);
    if (sortBy === 'name_asc') return (a.product_title || '').localeCompare(b.product_title || '');
    if (sortBy === 'name_desc') return (b.product_title || '').localeCompare(a.product_title || '');
    return 0;
  });

  const handleOpenFilter = () => {
    setSliderLow(appliedLow || globalMin);
    setSliderHigh(appliedHigh || globalMax);
    setShowFilter(true);
  };

  const handleApplyFilter = () => {
    setAppliedLow(sliderLow);
    setAppliedHigh(sliderHigh);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setSliderLow(globalMin);
    setSliderHigh(globalMax);
    setAppliedLow(0);
    setAppliedHigh(0);
    setSelectedBrandId(null);
    setShowFilter(false);
  };

  const hasActiveFilter = selectedBrandId || appliedLow > 0 || appliedHigh > 0;

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <TouchableOpacity style={[styles.btnOutline]} onPress={() => setShowSort(!showSort)}>
          <MaterialIcons name="sort" size={18} color={colors.text} />
          <Text style={[styles.btnOutlineText, { color: colors.text }]}>
            {sortOptions.find(o => o.value === sortBy)?.label || 'Sort'}
          </Text>
          <MaterialIcons name={showSort ? 'expand-less' : 'expand-more'} size={18} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.count, { color: colors.text }]}>{sorted.length} items</Text>
        <TouchableOpacity style={[styles.btnOutline, hasActiveFilter && styles.btnOutlineActive]} onPress={handleOpenFilter}>
          <MaterialIcons name="filter-list" size={18} color={hasActiveFilter ? '#fff' : colors.text} />
          <Text style={[styles.btnOutlineText, { color: hasActiveFilter ? '#fff' : colors.text }]}>Filter</Text>
          {hasActiveFilter && <View style={styles.filterBadge} />}
        </TouchableOpacity>
      </View>

      {showSort && (
        <View style={styles.dropdownOverlay}>
          <TouchableOpacity style={styles.dropdownBackdrop} onPress={() => setShowSort(false)} />
          <View style={[styles.dropdown, { backgroundColor: colors.surface }]}>
            {sortOptions.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.dropdownItem, sortBy === opt.value && { backgroundColor: colors.primary + '12' }]}
                onPress={() => { setSortBy(opt.value); setShowSort(false); }}
              >
                <Text style={[styles.dropdownItemText, { color: sortBy === opt.value ? colors.primary : colors.text }]}>
                  {opt.label}
                </Text>
                {sortBy === opt.value && (
                  <MaterialIcons name="check-circle" size={18} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {brands.length > 0 && (
        <View style={styles.brandRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.brandScroll}>
            <TouchableOpacity
              style={[styles.brandChip, selectedBrandId === null && styles.brandChipActive]}
              onPress={() => setSelectedBrandId(null)}
            >
              <Text style={[styles.brandChipText, selectedBrandId === null && styles.brandChipTextActive]}>
                All
              </Text>
            </TouchableOpacity>
            {brands.map((b) => (
              <TouchableOpacity
                key={b.brand_id}
                style={[styles.brandChip, selectedBrandId === b.brand_id && styles.brandChipActive]}
                onPress={() => setSelectedBrandId(selectedBrandId === b.brand_id ? null : b.brand_id)}
              >
                <Text style={[styles.brandChipText, selectedBrandId === b.brand_id && styles.brandChipTextActive]}>
                  {b.brand_title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={sorted}
        keyExtractor={(item, i) => String(item.id || i)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 12, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 10 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <MaterialIcons name="search-off" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
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

      <Modal visible={showFilter} transparent animationType="slide" onRequestClose={() => setShowFilter(false)}>
        <View style={styles.overlay}>
          <View style={[styles.filterModal, { backgroundColor: colors.surface }]}>
            <View style={styles.filterModalHeader}>
              <Text style={[styles.filterModalTitle, { color: colors.text }]}>Filter</Text>
              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <MaterialIcons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <Text style={[styles.filterSectionTitle, { color: colors.text }]}>Price Range</Text>
            <View style={styles.priceRow}>
              <View style={styles.priceInputWrap}>
                <Text style={[styles.priceInputLabel, { color: colors.text }]}>Min</Text>
                <TextInput
                  style={[styles.priceInput, { borderColor: '#E5E7EB', color: colors.text }]}
                  value={sliderLow > 0 ? String(sliderLow) : ''}
                  onChangeText={(t) => setSliderLow(Number(t) || 0)}
                  keyboardType="numeric"
                  placeholder="৳"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <Text style={[styles.priceSep, { color: colors.text }]}>—</Text>
              <View style={styles.priceInputWrap}>
                <Text style={[styles.priceInputLabel, { color: colors.text }]}>Max</Text>
                <TextInput
                  style={[styles.priceInput, { borderColor: '#E5E7EB', color: colors.text }]}
                  value={sliderHigh > 0 ? String(sliderHigh) : ''}
                  onChangeText={(t) => setSliderHigh(Number(t) || 0)}
                  keyboardType="numeric"
                  placeholder="৳"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
            <RangeSlider
              min={globalMin}
              max={globalMax || 100000}
              low={sliderLow}
              high={sliderHigh}
              onLowChange={setSliderLow}
              onHighChange={setSliderHigh}
            />

            <View style={styles.filterModalActions}>
              <TouchableOpacity style={styles.resetBtn} onPress={handleResetFilter}>
                <Text style={styles.resetBtnText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={handleApplyFilter}>
                <Text style={styles.applyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  brandRow: {
    borderBottomWidth: 1, borderBottomColor: '#eee',
    paddingVertical: 10, paddingLeft: 12,
  },
  brandScroll: { alignItems: 'center', gap: 8, paddingRight: 12 },
  brandChip: {
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, borderWidth: 1, borderColor: '#E5E7EB',
    backgroundColor: '#fff', marginRight: 8,
  },
  brandChipActive: { backgroundColor: '#EB592C', borderColor: '#EB592C' },
  brandChipText: { fontSize: 13, fontWeight: '600', color: '#374151' },
  brandChipTextActive: { color: '#fff' },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: '#eee',
  },
  btnOutline: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 8,
    position: 'relative',
  },
  btnOutlineActive: {
    backgroundColor: '#EB592C', borderColor: '#EB592C',
  },
  btnOutlineText: { fontSize: 13, fontWeight: '600' },
  filterBadge: {
    position: 'absolute', top: -4, right: -4,
    width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444',
  },
  count: { fontSize: 13, fontWeight: '500' },
  dropdownOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 100,
  },
  dropdownBackdrop: { flex: 1 },
  dropdown: {
    position: 'absolute', top: 48, left: 12,
    borderRadius: 12, paddingVertical: 6,
    elevation: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 10,
    minWidth: 200,
  },
  dropdownItem: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 16,
  },
  dropdownItemText: { fontSize: 14, fontWeight: '500' },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyText: { fontSize: 15, color: '#999', marginTop: 12 },

  overlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    borderTopLeftRadius: 16, borderTopRightRadius: 16,
    paddingHorizontal: 20, paddingBottom: 40,
  },
  filterModalHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  filterModalTitle: { fontSize: 18, fontWeight: '700' },
  filterSectionTitle: { fontSize: 15, fontWeight: '600', marginTop: 16, marginBottom: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginBottom: 8 },
  priceInputWrap: { flex: 1 },
  priceInputLabel: { fontSize: 12, fontWeight: '500', marginBottom: 6 },
  priceInput: {
    borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 15, fontWeight: '600',
  },
  priceSep: { fontSize: 18, fontWeight: '700', paddingBottom: 10 },
  filterModalActions: {
    flexDirection: 'row', gap: 12, marginTop: 20,
  },
  resetBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    borderWidth: 1, borderColor: '#E5E7EB', alignItems: 'center',
  },
  resetBtnText: { fontSize: 15, fontWeight: '700', color: '#374151' },
  applyBtn: {
    flex: 1, paddingVertical: 14, borderRadius: 10,
    backgroundColor: '#EB592C', alignItems: 'center',
  },
  applyBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
