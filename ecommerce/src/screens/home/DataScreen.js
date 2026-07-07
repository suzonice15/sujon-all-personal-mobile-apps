import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, RefreshControl } from 'react-native';
import { getMobileContents, getSingleContent } from '../../db/mobileContents';
import { useTheme as usePaperTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function DataScreen({ route, navigation }) {
  const { item, parent_id,headerTitle } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [singleRecord, setSingleRecord] = useState(null);
  const { colors } = usePaperTheme();
  const s = styles(colors);

  useLayoutEffect(() => {
    navigation.setOptions({ title: headerTitle });
  }, [navigation, headerTitle]);

  useEffect(() => {
    loadData(parent_id);
  }, [parent_id]);

  const loadData = async (id) => {
    setLoading(true);
    const result = await getMobileContents(id);
    const single = await getSingleContent(id);
    setData(result);
    setSingleRecord(single);
    setLoading(false);
  };
 
  return (
    <SafeAreaView style={s.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={s.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => loadData(parent_id)} />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={s.card}
            onPress={() => {
                
              if (!item.content || item.content === '') {
               
                navigation.navigate('DataScreen', { item: item, headerTitle: item.title, parent_id: item.data_id });
              } else {

                navigation.navigate('StoryDetail', { item: item, headerTitle: singleRecord ? singleRecord.title : item.title });
              }
            }}
          >
            <View style={s.cardInner}>
              <View style={s.indexCircle}>
                <Text style={s.indexText}>{index + 1}</Text>
              </View>
              <View style={s.textWrapper}>
                <Text style={s.itemTitle}>{item.title}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={22} color={colors.onSurface} style={{ opacity: 0.3 }} />
            </View>
          </TouchableOpacity>
        )}
      />
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
  
});
