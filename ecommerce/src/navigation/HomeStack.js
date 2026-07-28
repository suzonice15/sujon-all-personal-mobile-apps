import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { apps_title } from '../config/url';
import { getHeaderOptions } from './headerOptions';
import ProductDetailHeader from '../components/ProductDetailHeader';
import AppHeader from '../components/AppHeader';

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
import EmiInfoScreen from '../screens/product/EmiInfoScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: apps_title }} />
      <Stack.Screen name="SearchProduct" component={SearchProductScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          header: ({ navigation: nav }) => (
            <ProductDetailHeader
              navigation={nav}
              title={route.params?.product?.product_title}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CategoryPage"
        component={CategoryScreen}
        options={({ route }) => ({
          header: ({ navigation: nav }) => (
            <AppHeader
              navigation={nav}
              colors={colors}
              showMenu={false}
              title={route.params?.category?.category_title || route.params?.category?.name || route.params?.category?.title || 'Category'}
            />
          ),
        })}
      />
      <Stack.Screen name="NotificationsMain" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Details' }} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'About App' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'About Developer' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="EmiInfo" component={EmiInfoScreen} options={{ title: 'EMI Information' }} />
    </Stack.Navigator>
  );
}
