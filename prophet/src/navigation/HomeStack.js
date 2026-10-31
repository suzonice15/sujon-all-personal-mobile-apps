import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { apps_title } from '../config/url';
import { getHeaderOptions } from './headerOptions';

import HomeScreen from '../screens/home/HomeScreen';
import DataScreen from '../screens/home/DataScreen';
import StoryDetail from '../screens/home/StoryDetail';
import AboutAppsScreen from '../screens/settings/AboutAppsScreen';
import AboutDeveloperScreen from '../screens/settings/AboutDeveloperScreen';
import DonationScreen from '../screens/settings/DonationScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import AdEarnScreen from '../screens/income/AdEarnScreen';
import DailyCoinScreen from '../screens/income/DailyCoinScreen';
import ClaimScreen from '../screens/income/ClaimScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: apps_title }} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
      <Stack.Screen name="Donation" component={DonationScreen} options={{ title: 'সহযোগিতা করুন' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'ডেভেলপার সম্পর্কে' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'মতামত দিন' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="AdEarn" component={AdEarnScreen} options={{ title: 'বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন' }} />
      <Stack.Screen name="DailyCoin" component={DailyCoinScreen} options={{ title: 'দৈনিক কয়েন সংগ্রহ করুন' }} />
      <Stack.Screen name="Claim" component={ClaimScreen} options={{ title: 'অর্জিত কয়েন গ্রহণ করুন' }} />
    </Stack.Navigator>
  );
}
