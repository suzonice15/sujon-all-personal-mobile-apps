import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getHeaderOptions } from './headerOptions';
import ProductDetailHeader from '../components/ProductDetailHeader';

import CartScreen from '../screens/cart/CartScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';

const Stack = createNativeStackNavigator();

export default function CartStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: false, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="CartMain" component={CartScreen} options={{ title: 'আমার কার্ট' }} />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          tabBarStyle: { display: 'none' },
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
