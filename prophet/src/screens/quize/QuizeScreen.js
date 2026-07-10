import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';
import { getCategoryWiseQuize } from '../../db/quizeContents';
import AdBanner from '../../components/ads/AdBanner';
 
export default function QuizeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const { colors } = useTheme();
  const s = styles(colors);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getCategoryWiseQuize();
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
        keyExtractor={(item, index) => String(item.category ?? index)}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={s.card}
            activeOpacity={0.7}
            onPress={() => {
              if (item.sub_total > 0) {
                navigation.navigate('QuizeData', { fetch_data: item.sub_category, type: 'sub_category', title: item.category, item });
              } else {
                navigation.navigate('QuizStart', { fetch_data: item.category, type: 'category', title: item.category, item });
              }
            }}
          >
            <View style={s.cardInner}>
              <View style={s.indexCircle}>
                <Text style={s.indexText}>{index + 1}</Text>
              </View>
              <View style={s.textWrapper}>
                <Text style={s.itemTitle}>{item.category}</Text>
                <Text style={s.itemSubtitle}>{item.quiz_total} টি কুইজ</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.onSurface} style={{ opacity: 0.3 }} />
            </View>
          </TouchableOpacity>
        )}
      />
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
