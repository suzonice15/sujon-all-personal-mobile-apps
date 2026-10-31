import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import NotificationDetailScreen from '../screens/home/NotificationDetailScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function NotificationStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const baseOpts = getHeaderOptions(colors);
  const menuOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...baseOpts, headerShown: true }}>
      <Stack.Screen name="NotificationsMain" component={NotificationsScreen} options={{ ...menuOpts, title: 'নোটিফিকেশন' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'বিস্তারিত' }} />
    </Stack.Navigator>
  );
}
