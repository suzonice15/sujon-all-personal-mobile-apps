import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, ActivityIndicator, Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationBell from '../../components/NotificationBell';
import { searchProducts } from '../../api/homeApi';
import { api_image } from '../../config/url';

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

const imgUrl = (item) => {
  if (!item.main_image) return null;
  return toFullUrl(item.main_image, 'products/' + (item.folder || ''));
};

export default function SearchProductScreen({ navigation }) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async (q) => {
    const trimmed = q.trim();
    if (!trimmed) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const res = await searchProducts(trimmed);
      const arr = Array.isArray(res) ? res : res?.data && Array.isArray(res.data) ? res.data : [];
      setResults(arr);
    } catch {
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

  const renderItem = ({ item }) => (
    <TouchableOpacity style={s.item} activeOpacity={0.7} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      {imgUrl(item) && (
        <Image source={{ uri: imgUrl(item) }} style={s.itemImage} resizeMode="cover" />
      )}
      <View style={s.itemBody}>
        <Text style={[s.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.product_title}
        </Text>
        <View style={s.priceRow}>
          {item.offerActive === 1 && item.offer_price > 0 ? (
            <>
              <Text style={[s.price, { color: colors.primary }]}>৳{item.offer_price}</Text>
              <Text style={[s.oldPrice, { color: colors.onSurface + '80' }]}>৳{item.product_price}</Text>
            </>
          ) : (
            <Text style={[s.price, { color: colors.primary }]}>৳{item.product_price}</Text>
          )}
        </View>
      </View>
      <MaterialIcons name="chevron-right" size={22} color={colors.onSurface + '40'} />
    </TouchableOpacity>
  );

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

      {!loading && (
        <FlatList
          data={results}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={s.list}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={s.empty}>
              <MaterialIcons
                name={searched ? 'search-off' : 'search'}
                size={64}
                color={colors.onSurface + '25'}
              />
              <Text style={[s.emptyText, { color: colors.onSurface + '50' }]}>
                {searched ? 'No products found' : 'Type to search products'}
              </Text>
              {!searched && (
                <Text style={[s.emptySub, { color: colors.onSurface + '30' }]}>
                  Search by product name
                </Text>
              )}
            </View>
          }
          renderItem={renderItem}
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.onSurface + '10',
  },
  itemBody: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
});
