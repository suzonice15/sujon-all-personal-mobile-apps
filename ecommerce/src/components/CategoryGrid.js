import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { api_image } from '../config/url';

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

export default function CategoryGrid({ data, colors, onPress }) {
  if (!data || data.length === 0) return null;

  return (
    <View style={s.wrap}>
      <Text style={[s.title, { color: colors.text }]}>Categories</Text>
      <View style={s.grid}>
        {data.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={[s.card, { backgroundColor: colors.surface }]}
            onPress={() => onPress?.(item)}
            activeOpacity={0.7}
          >
            {item.banner && (
              <Image
                source={{ uri: toFullUrl(item.banner, 'category') }}
                style={s.image}
                resizeMode="contain"
              />
            )}
            <Text style={[s.label, { color: colors.text }]} numberOfLines={1}>
              {item.category_title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { marginBottom: 20 },
  title: { fontSize: 17, fontWeight: '700', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: {
    width: '30%', flexGrow: 1, flexBasis: '30%',
    borderRadius: 12, paddingVertical: 16, paddingHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 2, elevation: 0,
  },
  image: { width: 48, height: 48, marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', textAlign: 'center' },
});
