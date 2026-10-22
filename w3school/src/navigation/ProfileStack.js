import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import ProfileScreen from '../screens/profile/ProfileScreen';
import DashboardScreen from '../screens/profile/DashboardScreen';
import ReferralStack from './ReferralStack';
import LoginScreen from '../screens/profile/LoginScreen';
import RegisterScreen from '../screens/profile/RegisterScreen';
import ForgotPasswordScreen from '../screens/profile/ForgotPasswordScreen';
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
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ ...menuOpts, title: 'Dashboard' }} />
      <Stack.Screen name="Referral" component={ReferralStack} options={{ headerShown: false }} />
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ ...menuOpts, title: 'Profile' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Reset Password' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
    </Stack.Navigator>
  );
}
