import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
  
 import NotificationStack from './NotificationStack';
  
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
 
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

            Notifications: 'notifications',
            Product: 'store',
            Profile: loggedIn ? 'dashboard' : 'person',
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={24} color={color} />;
        },
        tabBarStyle: { height: 100, backgroundColor: '#fff', borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'হোম' }} />
     
        <Tab.Screen name="Notifications" component={NotificationStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />

    </Tab.Navigator>
  );
}