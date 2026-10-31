import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Skeleton from './Skeleton';

const { width } = Dimensions.get('window');
const SIDE_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (width - SIDE_PADDING * 2 - CARD_GAP) / 2;

function SliderSkeleton() {
  return (
    <View style={s.sliderWrap}>
      <Skeleton width={width} height={200} radius={0} />
      <View style={s.dots}>
        {Array.from({ length: 3 }).map((_, i) => (
          <View key={i} style={[s.dot, i === 0 && s.dotActive]} />
        ))}
      </View>
    </View>
  );
}

function CategoryGridSkeleton({ surface }) {
  return (
    <View style={s.section}>
      <Skeleton width={140} height={16} style={{ marginBottom: 6 }} />
      <Skeleton width={220} height={11} style={{ marginBottom: 12 }} />
      <View style={s.categoryGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <View key={i} style={[s.categoryCard, { backgroundColor: surface }]}>
            <Skeleton width={44} height={44} radius={10} style={{ marginBottom: 8 }} />
            <Skeleton width={50} height={10} />
          </View>
        ))}
      </View>
    </View>
  );
}

function ProductCardSkeleton({ surface }) {
  return (
    <View style={[s.productCard, { backgroundColor: surface }]}>
      <Skeleton width="100%" height={130} radius={0} />
      <View style={s.productBody}>
        <Skeleton width="90%" height={11} style={{ marginBottom: 6 }} />
        <Skeleton width="60%" height={11} style={{ marginBottom: 10 }} />
        <Skeleton width="40%" height={16} />
      </View>
      <Skeleton width="100%" height={36} radius={8} style={s.addBtnBone} />
    </View>
  );
}

function ProductGridSkeleton({ surface }) {
  return (
    <View style={s.section}>
      <Skeleton width={160} height={18} style={{ marginBottom: 6 }} />
      <Skeleton width={240} height={12} style={{ marginBottom: 12 }} />
      <View style={s.productGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} surface={surface} />
        ))}
      </View>
    </View>
  );
}

export default function HomeSkeleton({ colors }) {
  const surface = colors?.surface || '#ffffff';

  return (
    <View style={s.container}>
      <SliderSkeleton />
      <View style={{ paddingHorizontal: SIDE_PADDING }}>
        <CategoryGridSkeleton surface={surface} />
        <ProductGridSkeleton surface={surface} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  sliderWrap: { marginBottom: 16 },
  dots: {
    flexDirection: 'row', justifyContent: 'center',
    position: 'absolute', bottom: 8, left: 0, right: 0,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)', marginHorizontal: 4,
  },
  dotActive: { backgroundColor: '#fff', width: 20 },
  section: { marginBottom: 12, marginTop: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  categoryCard: {
    width: '30%', flexGrow: 1, flexBasis: '30%',
    borderRadius: 12, paddingVertical: 14, paddingHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  productGrid: { flexDirection: 'row', flexWrap: 'wrap', columnGap: CARD_GAP },
  productCard: {
    width: CARD_WIDTH,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 3,
  },
  productBody: { padding: 10, paddingBottom: 8 },
  addBtnBone: { marginHorizontal: 10, marginBottom: 10 },
});
