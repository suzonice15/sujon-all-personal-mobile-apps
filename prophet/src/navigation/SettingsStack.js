import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../screens/settings/SettingsScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import TermsScreen from '../screens/settings/TermsScreen';
import PointsBadge from '../components/PointsBadge';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: '#4F46E5' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerRight: () => <PointsBadge />,
};

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={headerOptions}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'ব্যবহারের শর্তাবলী' }} />
    </Stack.Navigator>
  );
}
