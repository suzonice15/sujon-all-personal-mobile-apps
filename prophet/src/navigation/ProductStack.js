import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductListScreen from '../screens/product/ProductListScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import KinaKataScreen from '../screens/product/KinaKataScreen';
import CartScreen from '../screens/product/CartScreen';
import CheckoutScreen from '../screens/product/CheckoutScreen';
import { useCart } from '../context/CartContext';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

function CartIcon({ navigation, colors }) {
  const { count } = useCart();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginLeft: 12, position: 'relative' }}>
      <MaterialIcons name="shopping-cart" size={24} color={colors.headerColor || '#fff'} />
      {count > 0 && (
        <View style={{
          position: 'absolute', top: -4, right: -6,
          backgroundColor: '#EF4444', borderRadius: 9,
          width: 18, height: 18,
          justifyContent: 'center', alignItems: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function cartHeader(colors, navigation) {
  return {
    headerRight: () => <CartIcon navigation={navigation} colors={colors} />,
  };
}

export default function ProductStack() {
  const { colors } = useTheme();
  const baseOpts = getHeaderOptions(colors);

  return (
    <Stack.Navigator screenOptions={baseOpts}>
      <Stack.Screen name="ProductList" component={ProductListScreen} options={({ navigation }) => ({ title: 'প্রোডাক্ট', ...cartHeader(colors, navigation) })} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'প্রোডাক্ট ডিটেইল', headerShown: false }} />
      <Stack.Screen name="KinaKata" component={KinaKataScreen} options={({ navigation }) => ({ title: 'কিনা কাটা করুণ', ...cartHeader(colors, navigation) })} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'কার্ট' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'চেকআউট' }} />
    </Stack.Navigator>
  );
}
