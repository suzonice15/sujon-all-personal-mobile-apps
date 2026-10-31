import React, { useState } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, Modal,
  Dimensions, StatusBar, StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { api_image } from '../../../config/url';

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

export default function ImageCarousel({
  product,
  galleryImages = [],
  fullScreenIndex,
  setFullScreenIndex,
  carouselRef,
}) {
  const [fullScreenVisible, setFullScreenVisible] = useState(false);

  const p = product;
  const price = p.discount_price || p.product_price;
  const oldPrice = p.product_price;
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const hasOffer = discount > 0;

  return (
    <>
      {/* Main Carousel */}
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
              <TouchableOpacity activeOpacity={0.9} onPress={() => { setFullScreenIndex(index); setFullScreenVisible(true); }}>
                <View style={styles.carouselItem}>
                  <Image source={{ uri: imgUrl(p, item) }} style={styles.carouselImage} resizeMode="contain" />
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

      {/* Full Screen Viewer */}
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
    </>
  );
}

const styles = StyleSheet.create({
  carouselWrap: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  carouselItem: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    width: SCREEN_WIDTH - 32,
    height: SCREEN_WIDTH * 0.7,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#EB592C',
    width: 20,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  discountBadgeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenClose: {
    position: 'absolute',
    top: 40,
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  fullScreenItem: {
    width: SCREEN_WIDTH,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: SCREEN_WIDTH - 16,
    height: Dimensions.get('window').height - 120,
  },
  fullScreenCounter: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  fullScreenCounterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
