import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizeScreen from '../screens/quize/QuizeScreen';
import QuizStart from '../screens/quize/QuizStartScreen'; 
import QuizeData from '../screens/quize/QuizeData'; 
import PointsBadge from '../components/PointsBadge';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 
const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: '#4F46E5' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerRight: () => <PointsBadge />,
};

export default function QuizeStack({navigation}) {
  return (
    <Stack.Navigator screenOptions={{
            ...headerOptions,
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 10 }}>
                <MaterialIcons name="menu" size={26} color="#fff" />
              </TouchableOpacity>
            ),
          }}>
      <Stack.Screen name="QuizeMain" component={QuizeScreen} options={{ title: 'কুইজ' }} />
      <Stack.Screen name="QuizeData" component={QuizeData} options={{ title: 'কুইজ' }} />
      <Stack.Screen name="QuizStart" component={QuizStart} options={{ title: 'প্রাইভেসি পলিসি' }} />

    </Stack.Navigator>
  );
}
