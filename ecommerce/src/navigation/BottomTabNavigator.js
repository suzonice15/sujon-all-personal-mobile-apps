import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import DealStack from './DealStack';
import CartStack from './CartStack';
import AccountStack from './AccountStack';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator();

function CartBadge({ count }) {
  if (count === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const tabBarStyle = {
    height: Platform.OS === 'android' ? 65 + insets.bottom : 65,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    paddingBottom: Platform.OS === 'android' ? insets.bottom + 8 : 8,
    paddingTop: 6,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#EB592C',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: 2 },
        tabBarStyle,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: 'home',
            Deals: 'local-fire-department',
            Cart: 'shopping-cart',
            Account: 'person',
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Deals"
        component={DealStack}
        options={{ tabBarLabel: 'উরাধুরা ডিল' }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialIcons name="shopping-cart" size={size} color={color} />
              <CartContent />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{ tabBarLabel: user?.name?.trim() || 'Account' }}
      />
    </Tab.Navigator>
  );
}

function CartContent() {
  const { count } = useCart();
  return <CartBadge count={count} />;
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});
