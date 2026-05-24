import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import IncomeStack from './IncomeStack';
import ProfileStack from './ProfileStack';
import BookmarkStack from './BookmarkStack';
import SettingsStack from './SettingsStack';
import QuizeStack from './QuizeStack';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
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
            Profile: 'person',
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={24} color={color} />;
        },
        tabBarStyle: { height: 100, backgroundColor: '#fff', borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'হোম' }} />
      <Tab.Screen name="Bookmarks" component={BookmarkStack} options={{ tabBarLabel: 'বুকমার্ক' }} />
      {/* <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: 'সেটিংস' }} /> */}
     <Tab.Screen name="Quize" component={QuizeStack} options={{ tabBarLabel: 'কুইজ' }} />
      <Tab.Screen name="Income" component={IncomeStack} options={{ tabBarLabel: 'পয়েন্ট' }} />
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: 'প্রোফাইল' }} />
    </Tab.Navigator>
  );
}