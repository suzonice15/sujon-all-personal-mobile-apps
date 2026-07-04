import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DashboardScreen from '../screens/profile/DashboardScreen';
import ReferralStack from './ReferralStack';
import LoginScreen from '../screens/profile/LoginScreen';
import RegisterScreen from '../screens/profile/RegisterScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const baseOpts = getHeaderOptions(colors);
  const menuOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={baseOpts}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ ...menuOpts, title: 'ড্যাশবোর্ড' }} />
      <Stack.Screen name="Referral" component={ReferralStack} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ ...menuOpts, title: 'প্রোফাইল' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'লগইন' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'নিবন্ধন' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'প্রোফাইল এডিট' }} />
    </Stack.Navigator>
  );
}
