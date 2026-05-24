import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookmarksScreen from '../screens/home/BookmarksScreen';
import StoryDetail from '../screens/home/StoryDetail';
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

export default function BookmarkStack({navigation}) {
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
      <Stack.Screen name="BookmarksScreen" component={BookmarksScreen} options={{ title: 'বুকমার্ক' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}
