import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import IncomeStack from './IncomeStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import QuizeStack from './QuizeStack';
import HistoryStack from './HistoryStack';
import BookmarkStack from './BookmarkStack';
import NotificationStack from './NotificationStack';
import ProductStack from './ProductStack';
import { getLoggedInUser } from '../db/auth';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuth = async () => {
    const u = await getLoggedInUser();
    setLoggedIn(!!u);
  };

  useEffect(() => {
    checkAuth();
    const unsub = navigation.addListener('state', checkAuth);
    return unsub;
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#25D366',
        tabBarInactiveTintColor: '#777',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginBottom: 3 },
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'home',
            Bookmarks: 'bookmark',
            Settings: 'settings',
            Income: 'star',
            Quize: 'quiz',
            History: 'history',
            Notifications: 'notifications',
            Product: 'store',
            ProductList: 'storefront',
            Profile: loggedIn ? 'dashboard' : 'person',
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={24} color={color} />;
        },
        tabBarStyle: { height: 100, backgroundColor: '#fff', borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'হোম' }} />
      {/* <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: 'সেটিংস' }} /> */}
      <Tab.Screen name="Quize" component={QuizeStack} options={{ tabBarLabel: 'কুইজ' }} />
      <Tab.Screen name="History" component={HistoryStack} options={{ tabBarLabel: 'হিস্টোরি' }} />
      {/* <Tab.Screen name="Income" component={IncomeStack} options={{ tabBarLabel: 'পয়েন্ট' }} /> */}
      <Tab.Screen name="ProductList" component={ProductStack} options={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOn = ['ProductDetail', 'Cart', 'Checkout', 'KinaKata'];
        if (routeName && hideOn.includes(routeName)) {
          return { tabBarLabel: 'কিনা কাটা', tabBarStyle: { display: 'none' } };
        }
        return { tabBarLabel: 'কিনা কাটা' };
      }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: loggedIn ? 'ড্যাশবোর্ড' : 'প্রোফাইল' }} />
      <Tab.Screen name="Bookmarks" component={BookmarkStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />
      <Tab.Screen name="Notifications" component={NotificationStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />

    </Tab.Navigator>
  );
}