import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getHeaderOptions } from './headerOptions';

import AccountScreen from '../screens/account/AccountScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import DashboardScreen from '../screens/auth/DashboardScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import AboutAppsScreen from '../screens/settings/AboutAppsScreen';
import AboutDeveloperScreen from '../screens/settings/AboutDeveloperScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import TermsScreen from '../screens/settings/TermsScreen';

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: false, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="AccountMain" component={AccountScreen} options={{ title: 'আমার অ্যাকাউন্ট' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'ডেভেলপার সম্পর্কে' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'মতামত দিন' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'শর্তাবলী' }} />
    </Stack.Navigator>
  );
}
