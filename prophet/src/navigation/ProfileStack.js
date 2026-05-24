import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LoginScreen from '../screens/profile/LoginScreen';
import RegisterScreen from '../screens/profile/RegisterScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import PointsBadge from '../components/PointsBadge';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: '#4F46E5' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerRight: () => <PointsBadge />,
};

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="ProfileView" component={ProfileScreen} options={{ title: 'প্রোফাইল' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'লগইন' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'নিবন্ধন' }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'প্রোফাইল এডিট' }} />
    </Stack.Navigator>
  );
}
