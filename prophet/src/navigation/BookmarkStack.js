import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import BookmarksScreen from '../screens/home/BookmarksScreen';
import StoryDetail from '../screens/home/StoryDetail';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function BookmarkStack({ navigation }) {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="BookmarksScreen" component={BookmarksScreen} options={{ title: 'বুকমার্ক' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}
