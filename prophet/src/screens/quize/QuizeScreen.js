import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getCategoryWiseQuize } from '../../db/quizeContents';


export default function QuizeScreen({ navigation }) {
  const [data, setData] = useState([]);
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
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>কুইজ লিস্ট</Text>
      {data.map((item) => (
        <TouchableOpacity
          key={item.category}
          style={styles.card}
          activeOpacity={0.7}
          onPress={() => {
            if (item.sub_total > 0) {
              navigation.navigate('QuizeData', {fetch_data:item.sub_category,type:sub_category,title:item.category, item: item })
            } else {
              navigation.navigate('QuizStart', {fetch_data:item.category,type:category,title:item.category, item: item })
            }
          }
        }
        >
          <View style={styles.left}>
            <View>
              <Text style={styles.title}>{item.category}</Text>
              <Text style={styles.sub}>
                {item.quiz_total} টি কুইজ
              </Text>
            </View>
          </View>

          <MaterialIcons name="chevron-right" size={24} color="#bbb" />
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    padding: 16,
  },

  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1a1a1a',
  },

  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },

  sub: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },
});