import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './HomeStack';
import IncomeStack from './IncomeStack';
import ProfileStack from './ProfileStack';
import SettingsStack from './SettingsStack';
import QuizeStack from './QuizeStack';
import InterviewStack from './InterviewStack';
import SkillTestStack from './SkillTestStack';
import HistoryStack from './HistoryStack';
import BookmarkStack from './BookmarkStack';
import NotificationStack from './NotificationStack';
import ProductStack from './ProductStack';
import { getLoggedInUser } from '../db/auth';
import { useUI } from '../components/course/ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const navigation = useNavigation();
  const ui = useUI();
  const insets = useSafeAreaInsets();
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
    // backBehavior="history": Android back from History/Shop returns to the Dashboard, not to Learn
    <Tab.Navigator
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: ui.brand,
        tabBarInactiveTintColor: ui.sub,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '700' },
        tabBarIcon: ({ color }) => {
          const icons = {
            Home: 'school',
            Bookmarks: 'bookmark',
            Settings: 'settings',
            Income: 'star',
            Quize: 'quiz',
            Interview: 'record-voice-over',
            SkillTest: 'assignment-turned-in',
            History: 'history',
            Notifications: 'notifications',
            Product: 'store',
            ProductList: 'storefront',
            Profile: loggedIn ? 'dashboard' : 'person',
          };
          return <MaterialIcons name={icons[route.name] || 'home'} size={24} color={color} />;
        },
        // A fixed height disables the automatic inset, so add the system nav bar inset ourselves.
        tabBarStyle: {
          height: 62 + insets.bottom, paddingTop: 6, paddingBottom: 8 + insets.bottom,
          backgroundColor: ui.card, borderTopColor: ui.border, borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ tabBarLabel: 'Learn' }} />
      {/* <Tab.Screen name="Settings" component={SettingsStack} options={{ tabBarLabel: 'Settings' }} /> */}
      <Tab.Screen name="Quize" component={QuizeStack} options={{ tabBarLabel: 'Quiz' }} />
      <Tab.Screen name="Interview" component={InterviewStack} options={{ tabBarLabel: 'Interview' }} />
      {/* The tab bar is hidden during an exam so it cannot be left by accident */}
      <Tab.Screen name="SkillTest" component={SkillTestStack} options={({ route }) => ({
        tabBarLabel: 'Skill Test',
        ...(getFocusedRouteNameFromRoute(route) === 'SkillTestExam' ? { tabBarStyle: { display: 'none' } } : {}),
      })} />
      {/* <Tab.Screen name="Income" component={IncomeStack} /> */}
      <Tab.Screen name="Profile" component={ProfileStack} options={{ tabBarLabel: loggedIn ? 'Dashboard' : 'Profile' }} />
      {/* History and Shop are opened from the Dashboard menu, so they have no tab button */}
      <Tab.Screen name="History" component={HistoryStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />
      <Tab.Screen name="ProductList" component={ProductStack} options={({ route }) => {
        const hidden = { tabBarButton: () => null, tabBarItemStyle: { display: 'none' } };
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOn = ['ProductDetail', 'Cart', 'Checkout', 'KinaKata'];
        if (routeName && hideOn.includes(routeName)) return { ...hidden, tabBarStyle: { display: 'none' } };
        return hidden;
      }} />
      <Tab.Screen name="Bookmarks" component={BookmarkStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />
      <Tab.Screen name="Notifications" component={NotificationStack} options={{ tabBarButton: () => null, tabBarItemStyle: { display: 'none' } }} />

    </Tab.Navigator>
  );
}