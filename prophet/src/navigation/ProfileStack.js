import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LoginScreen from '../screens/profile/LoginScreen';
import RegisterScreen from '../screens/profile/RegisterScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors);

  return (
    <Stack.Navigator screenOptions={headerOpts}>
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ title: 'প্রোফাইল' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'লগইন' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'নিবন্ধন' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'প্রোফাইল এডিট' }} />
    </Stack.Navigator>
  );
}
