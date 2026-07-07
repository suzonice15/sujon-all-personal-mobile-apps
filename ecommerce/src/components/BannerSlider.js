import React, { useRef, useEffect, useState, useCallback } from 'react';
import { View, Image, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { api_image } from '../config/url';

const { width } = Dimensions.get('window');

const toFullUrl = (path, subdir = '') => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = api_image.endsWith('/') ? api_image.slice(0, -1) : api_image;
  const prefix = subdir ? (subdir.startsWith('/') ? subdir : '/' + subdir) + '/' : '/';
  return base + prefix + path;
};

export default function BannerSlider({ data }) {
  const listRef = useRef(null);
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const [errors, setErrors] = useState({});

  const startAutoPlay = useCallback(() => {
    if (!data || data.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = prev + 1 >= data.length ? 0 : prev + 1;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);
  }, [data]);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  if (!data || data.length === 0) return null;

  return (
    <View style={s.wrapper}>
      <FlatList
        ref={listRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onMomentumScrollEnd={e => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setActive(idx);
        }}
        onTouchStart={stopAutoPlay}
        onTouchEnd={startAutoPlay}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={s.slide}>
            {errors[index] ? (
              <View style={s.fallback}>
                <Text style={s.fallbackText}>{item.slider_title || 'Slider'}</Text>
              </View>
            ) : (
              <Image
                source={{ uri: toFullUrl(item.slider_picture, 'sliders') }}
                style={s.image}
                resizeMode="cover"
                onError={() => setErrors(prev => ({ ...prev, [index]: true }))}
              />
            )}
          </View>
        )}
      />
      {data.length > 1 && (
        <View style={s.dots}>
          {data.map((_, i) => (
            <View key={i} style={[s.dot, i === active && s.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { height: 200, marginBottom: 16 },
  slide: { width, height: 200, overflow: 'hidden', backgroundColor: '#e0e0e0' },
  image: { width: '100%', height: '100%' },
  fallback: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  fallbackText: { color: '#999', fontSize: 14 },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    position: 'absolute', bottom: 8, left: 0, right: 0,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4,
  },
  dotActive: { backgroundColor: '#fff', width: 20 },
});
