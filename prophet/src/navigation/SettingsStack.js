import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import SettingsScreen from '../screens/settings/SettingsScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import TermsScreen from '../screens/settings/TermsScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors);

  return (
    <Stack.Navigator screenOptions={headerOpts}>
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: 'ব্যবহারের শর্তাবলী' }} />
    </Stack.Navigator>
  );
}
