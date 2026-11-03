import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import NotificationsScreen from '../screens/home/NotificationsScreen';
import NotificationDetailScreen from '../screens/home/NotificationDetailScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import ProductDetailHeader from '../components/ProductDetailHeader';
import SearchProductScreen from '../screens/home/SearchProductScreen';
import EmiInfoScreen from '../screens/product/EmiInfoScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function NotificationStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const baseOpts = getHeaderOptions(colors);
  const menuOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...baseOpts, headerShown: true }}>
      <Stack.Screen name="NotificationsMain" component={NotificationsScreen} options={{ ...menuOpts, title: 'Notifications' }} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ title: 'Details' }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          header: ({ navigation: nav }) => (
            <ProductDetailHeader navigation={nav} title={route.params?.product?.product_title} />
          ),
        })}
      />
      <Stack.Screen name="SearchProduct" component={SearchProductScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EmiInfo" component={EmiInfoScreen} options={{ title: 'EMI Information' }} />
    </Stack.Navigator>
  );
}
