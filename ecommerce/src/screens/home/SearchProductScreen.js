import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator, Alert, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import ProductCard from '../../components/ProductCard';
import { searchProducts } from '../../api/homeApi';

const HISTORY_KEY = '@search_history';
const MAX_HISTORY = 10;

export default function SearchProductScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [history, setHistory] = useState([]);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await AsyncStorage.getItem(HISTORY_KEY);
      if (data) setHistory(JSON.parse(data));
    } catch {}
  };

  const saveHistory = async (newHistory) => {
    setHistory(newHistory);
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  };

  const addToHistory = async (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = async (term) => {
    const updated = history.filter((h) => h !== term);
    await saveHistory(updated);
  };

  const clearAllHistory = () => {
    Alert.alert('Clear History', 'Remove all search history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: () => saveHistory([]) },
    ]);
  };

  const doSearch = useCallback(async (q) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    await addToHistory(trimmed);
    try {
      const res = await searchProducts(trimmed);
      const arr = Array.isArray(res) ? res : res?.data && Array.isArray(res.data) ? res.data : res?.products && Array.isArray(res.products) ? res.products : [];
      setResults(arr);
    } catch (e) {
      console.log('Search error:', e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => doSearch(query), 400);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [query, doSearch]);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  };

  const s = styles(colors);

  return (
    <View style={s.container}>
      <View style={[s.header, { backgroundColor: colors.headerBackground, paddingTop: insets.top + 6 }]}>
        <View style={s.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color={colors.headerColor} />
          </TouchableOpacity>

          <View style={s.inputWrap}>
            <MaterialIcons name="search" size={18} color={colors.headerColor + '99'} />
            <TextInput
              ref={inputRef}
              style={s.input}
              placeholder="Search products..."
              placeholderTextColor={colors.headerColor + '99'}
              value={query}
              onChangeText={setQuery}
              autoFocus
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={handleClear}>
                <MaterialIcons name="close" size={18} color={colors.headerColor + '99'} />
              </TouchableOpacity>
            )}
          </View>

          <NotificationBell color={colors.headerColor} />
        </View>
      </View>

      {loading && (
        <View style={s.loadingWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {!loading && !query.trim() && history.length > 0 && (
        <View style={s.historySection}>
          <View style={s.historyHeader}>
            <Text style={[s.historyTitle, { color: colors.text }]}>Recent Searches</Text>
            <TouchableOpacity onPress={clearAllHistory}>
              <Text style={s.clearAllText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <View style={s.historyChipWrap}>
            {history.map((h, i) => (
              <View key={i} style={s.historyChip}>
                <TouchableOpacity style={s.historyChipTouch} onPress={() => setQuery(h)} activeOpacity={0.7}>
                  <MaterialIcons name="history" size={15} color="#6B7280" />
                  <Text style={s.historyChipText} numberOfLines={1}>{h}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeFromHistory(h)} style={s.historyChipClose}>
                  <MaterialIcons name="close" size={15} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      {!loading && !query.trim() && history.length === 0 && (
        <View style={s.empty}>
          <MaterialIcons name="search" size={64} color={colors.onSurface + '25'} />
          <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>Type to search products</Text>
          <Text style={[s.emptySub, { color: colors.onSurface + '30' }]}>Search by product name</Text>
        </View>
      )}

      {!loading && query.trim() && (
        <FlatList
          key={isGridView ? 'grid' : 'list'}
          data={results}
          keyExtractor={(_, i) => i.toString()}
          numColumns={isGridView ? 2 : undefined}
          columnWrapperStyle={isGridView ? { gap: 10, paddingHorizontal: 12 } : undefined}
          contentContainerStyle={s.list}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            results.length > 0 ? (
              <View style={s.resultHeader}>
                <Text style={[s.resultCount, { color: colors.text }]}>
                  {results.length} {results.length === 1 ? 'product' : 'products'} found
                </Text>
                <View style={s.viewToggleGroup}>
                  <TouchableOpacity
                    style={[s.viewToggleBtn, !isGridView && s.viewToggleActive]}
                    onPress={() => setIsGridView(false)}
                  >
                    <MaterialIcons name="view-list" size={20} color={!isGridView ? '#fff' : colors.text} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[s.viewToggleBtn, isGridView && s.viewToggleActive]}
                    onPress={() => setIsGridView(true)}
                  >
                    <MaterialIcons name="grid-view" size={20} color={isGridView ? '#fff' : colors.text} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : null
          }
          ListEmptyComponent={
            results.length === 0 && searched ? (
              <View style={s.empty}>
                <MaterialIcons name="search-off" size={64} color={colors.onSurface + '25'} />
                <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>No products found</Text>
              </View>
            ) : null
          }
          renderItem={({ item, index }) => {
            if (isGridView) {
              return (
                <View style={{ flex: 1 }}>
                  <ProductCard
                    item={item}
                    colors={colors}
                    onPress={(product) => navigation.navigate('ProductDetail', { product })}
                  />
                </View>
              );
            }
            const hasOffer = item.offerActive === 1 && item.offer_price > 0;
            const price = hasOffer ? item.offer_price : item.product_price;
            const imgUrl = item.main_image
              ? `https://www.adminpanel.jncomputerbd.com/products/${item.folder || ''}/${item.main_image}`
              : null;
            return (
              <TouchableOpacity style={s.itemCard} activeOpacity={0.7} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                <View style={s.itemCardLeft}>
                  {imgUrl ? (
                    <Image source={{ uri: imgUrl }} style={s.itemCardImg} resizeMode="contain" />
                  ) : (
                    <View style={[s.itemCardImg, { backgroundColor: colors.onSurface + '10', alignItems: 'center', justifyContent: 'center' }]}>
                      <MaterialIcons name="image" size={24} color={colors.onSurface + '30'} />
                    </View>
                  )}
                </View>
                <View style={s.itemCardBody}>
                  <Text style={[s.itemCardTitle, { color: colors.text }]} numberOfLines={2}>{item.product_title}</Text>
                  <Text style={[s.itemCardPrice, { color: '#EA580C' }]}>৳{price}</Text>
                  {hasOffer && <Text style={s.itemCardOldPrice}>৳{item.product_price}</Text>}
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.onSurface + '30'} />
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    padding: 6,
    marginRight: 2,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    height: 40,
  },
  input: {
    flex: 1,
    color: colors.headerColor,
    fontSize: 15,
    marginLeft: 6,
    padding: 0,
  },
  loadingWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySub: {
    marginTop: 4,
    fontSize: 13,
  },
  historySection: { flex: 1 },
  historyHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8,
  },
  historyTitle: { fontSize: 15, fontWeight: '700' },
  clearAllText: { fontSize: 13, fontWeight: '600', color: '#EF4444' },
  historyChipWrap: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 8,
  },
  historyChip: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderRadius: 20,
    borderWidth: 1, borderColor: '#E5E7EB',
    paddingLeft: 10, paddingRight: 4, paddingVertical: 5,
  },
  historyChipTouch: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  historyChipText: { fontSize: 13, fontWeight: '500', color: '#374151', maxWidth: 140 },
  historyChipClose: { padding: 3, marginLeft: 2 },
  resultHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#E5E7EB',
  },
  viewToggleGroup: { flexDirection: 'row', gap: 4 },
  viewToggleBtn: {
    padding: 6, borderRadius: 6,
    borderWidth: 1, borderColor: '#D1D5DB',
  },
  viewToggleActive: { backgroundColor: '#EB592C', borderColor: '#EB592C' },
  resultCount: { fontSize: 14, fontWeight: '600' },
  itemCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface, borderRadius: 12,
    marginHorizontal: 12, marginTop: 10,
    padding: 12, gap: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 3,
  },
  itemCardLeft: { width: 70, height: 70, borderRadius: 8, overflow: 'hidden' },
  itemCardImg: { width: 70, height: 70, borderRadius: 8 },
  itemCardBody: { flex: 1 },
  itemCardTitle: { fontSize: 14, fontWeight: '600', lineHeight: 18 },
  itemCardPrice: { fontSize: 16, fontWeight: '800', marginTop: 4 },
  itemCardOldPrice: { fontSize: 12, color: '#9CA3AF', textDecorationLine: 'line-through', marginTop: 2 },

});
