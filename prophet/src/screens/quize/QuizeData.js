import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getQuizeSubCategory } from '../../db/quizeContents';
import AdNative from '../../components/ads/AdNative';
import AdBanner from '../../components/ads/AdBanner';

export default function QuizeData({ route, navigation }) {
  const { item } = route.params;
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const s = styles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({ title: item.category });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getQuizeSubCategory(item.category);
        setData(response || []);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.sub_category}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('QuizStart', { fetch_data: item.sub_category, type: 'sub_category', title: item.sub_category, item })}
          >
            <View style={s.cardInner}>
              <View style={s.indexCircle}>
                <Text style={s.indexText}>{index + 1}</Text>
              </View>
              <View style={s.textWrapper}>
                <Text style={s.itemTitle}>{item.sub_category}</Text>
                <Text style={s.itemSubtitle}>{item.quiz_total} টি কুইজ</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.onSurface} style={{ opacity: 0.3 }} />
            </View>
          </TouchableOpacity>
        )}
      />
      <AdNative style={{ marginBottom: 5, marginTop: 10 }} />
      <AdBanner />
    </SafeAreaView>
  );
}

const styles = (colors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16 },
  card: {
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  cardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  indexCircle: {
    width: 45, height: 45, borderRadius: 22.5,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 16,
  },
  indexText: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
  textWrapper: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: colors.onSurface, marginBottom: 4 },
  itemSubtitle: { fontSize: 13, color: colors.secondary, fontWeight: '500' },
});
