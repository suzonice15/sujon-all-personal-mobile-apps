import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getMobileContents } from '../../db/mobileContents';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AdBanner from '../../components/ads/AdBanner';
 
export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = usePaperTheme();
  const s = styles(colors);

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await getMobileContents();
      setData(response || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => loadData()} />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={s.card}
            onPress={() => {
              const content = item.content || '';
              if (content.trim().length < 15) {
                navigation.navigate('DataScreen', { item: item, headerTitle: item.title, parent_id: item.data_id });
              } else {
                navigation.navigate('StoryDetail', { item: item, headerTitle: item.title });
              }
            }}
          >
            <View style={s.cardInner}>
              <View style={s.indexCircle}>
                <Text style={s.indexText}>{index + 1}</Text>
              </View>
              <View style={s.textWrapper}>
                <Text style={s.itemTitle}>{item.title}</Text>
                <Text style={s.itemSubtitle} numberOfLines={1}>{item.sub_title}</Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
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
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: colors.circleBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  indexText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.circleText,
  },
  textWrapper: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 13,
    color: colors.text,
    fontWeight: '500',
  },
});
