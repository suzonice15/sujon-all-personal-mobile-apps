import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { apps_title } from '../config/url';
import { getHeaderOptions } from './headerOptions';

import HomeScreen from '../screens/home/HomeScreen';
import SearchProductScreen from '../screens/home/SearchProductScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import NotificationDetailScreen from '../screens/home/NotificationDetailScreen';
import CategoryScreen from '../screens/categories/CategoryScreen';
import AboutAppsScreen from '../screens/settings/AboutAppsScreen';
import AboutDeveloperScreen from '../screens/settings/AboutDeveloperScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: apps_title }} />
      <Stack.Screen name="SearchProduct" component={SearchProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'পণ্যের বিবরণ' }} />
      <Stack.Screen name="CategoryPage" component={CategoryScreen} options={{ title: 'ক্যাটেগরি' }} />
      <Stack.Screen name="NotificationsMain" component={NotificationsScreen} options={{ title: 'নোটিফিকেশন' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'বিস্তারিত' }} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'ডেভেলপার সম্পর্কে' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'মতামত দিন' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
    </Stack.Navigator>
  );
}
