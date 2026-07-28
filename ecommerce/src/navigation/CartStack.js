import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getHeaderOptions } from './headerOptions';
import ProductDetailHeader from '../components/ProductDetailHeader';

import CartScreen from '../screens/cart/CartScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import SearchProductScreen from '../screens/home/SearchProductScreen';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import NotificationDetailScreen from '../screens/home/NotificationDetailScreen';

const Stack = createNativeStackNavigator();

export default function CartStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="CartMain" component={CartScreen} options={{ title: 'My Cart' }} />
      <Stack.Screen name="SearchProduct" component={SearchProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationsMain" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Details' }} />
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
    </Stack.Navigator>
  );
}
