import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import ProductListScreen from '../screens/product/ProductListScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={getHeaderOptions(colors)}>
      <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'প্রোডাক্ট' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'প্রোডাক্ট ডিটেইল' }} />
    </Stack.Navigator>
  );
}
