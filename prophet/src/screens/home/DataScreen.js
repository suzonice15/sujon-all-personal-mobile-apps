import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getMobileContents } from '../../db/mobileContents';

export default function DataScreen({ route, navigation }) {
  const { item,parent_id } = route.params;
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 HEADER TITLE SET
  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title,
    });
  }, [navigation, parent_id]);

  useEffect(() => {
    loadData(parent_id);
  }, [parent_id]);

  const loadData = async (parent_id) => {
    setLoading(true);
    const data = await getMobileContents(parent_id);
    setData(data);
    setLoading(false);
  };
 
  return (
    <View style={styles.container}>


      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (

          <TouchableOpacity
            style={styles.item}
            onPress={() => { 
             
              if(item.content==null || item.content==''){
              navigation.navigate('DataScreen', { item: item,parent_id:item.data_id })
              }else{
              navigation.navigate('StoryDetail', {
                item: item,
                title: item.title,
              })
              }
            }}
          >

            <View style={styles.indexBox}>
              <Text style={styles.indexText}>{index + 1}</Text>
            </View>

            <Text style={styles.text}>
              {item.title}
            </Text>

            <Text style={styles.arrow}>›</Text>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#25D366',
  },

  list: {
    paddingBottom: 20,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  indexBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  indexText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },

  text: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
  },

  arrow: {
    fontSize: 22,
    color: '#999',
  },

});