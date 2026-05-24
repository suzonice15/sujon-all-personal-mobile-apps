import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';

import { getMobileContents } from '../../db/mobileContents';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // LOAD DATA
  const loadData = async (force = false) => {
    try {
      // data already loaded থাকলে আবার call দিবে না
      if (!force && data.length > 0) {
        return;
      }
      setLoading(true);
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
      if (data.length === 0) {
        loadData();
      }
    }, [data])
  );

  // PULL TO REFRESH
  const onRefresh = () => {
    loadData(true);
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }

        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log(item)
              // Alert.alert('d',item.data_id)
               const content = item.content || ''; 
              if (content.trim().length < 15) {
                navigation.navigate('DataScreen', {
                  item: item,
                  parent_id: item.data_id
                });

              } else {
 
                navigation.navigate('StoryDetail', {
                  item: item,
                  title: item.title,
                });

              }

            }}
          >

            <View style={styles.indexBox}>
              <Text style={styles.indexText}>
                {index + 1}
              </Text>
            </View>

            <View style={styles.textBox}>
              <Text style={styles.name}>
                {item.title}
              </Text>

              <Text style={styles.title}>
                {item.sub_title}
              </Text>
            </View>

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
    backgroundColor: "#ddd"
  },

  list: {
    padding: 16,
    gap: 10
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: 14,
    padding: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    gap: 12,
  },

  indexBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "lightgray",
    alignItems: 'center',
    justifyContent: 'center',
  },

  indexText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "black"
  },

  textBox: {
    flex: 1
  },

  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "black"
  },

  title: {
    fontSize: 13,
    fontWeight: '500',
    color: "black"
  },

  arrow: {
    fontSize: 22,
    color: "black",
    fontWeight: 'bold'
  },
});