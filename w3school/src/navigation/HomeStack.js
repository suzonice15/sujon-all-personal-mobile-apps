import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { getHeaderOptions } from './headerOptions';
import { getCourse } from '../courses';
import HomeScreen from '../screens/home/HomeScreen';
import CourseScreen from '../screens/course/CourseScreen';
import ChapterScreen from '../screens/course/ChapterScreen';
import LessonScreen from '../screens/course/LessonScreen';
import TryItScreen from '../screens/course/TryItScreen';
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
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'CodeNest' }} />
      {/* headerLeft: undefined drops the drawer menu so these show a back arrow */}
      <Stack.Screen name="Course" component={CourseScreen} options={({ route }) => ({ title: route.params?.headerTitle, headerLeft: undefined })} />
      <Stack.Screen name="Chapter" component={ChapterScreen} options={({ route }) => ({ title: route.params?.headerTitle, headerLeft: undefined })} />
      {/* The lesson title is shown large in the screen itself, so the header names the course */}
      <Stack.Screen name="Lesson" component={LessonScreen} options={({ route }) => ({ title: getCourse(route.params?.courseId)?.title, headerLeft: undefined })} />
      <Stack.Screen name="TryIt" component={TryItScreen} options={{ title: 'Try it yourself', headerLeft: undefined }} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'About the App' }} />
      <Stack.Screen name="Donation" component={DonationScreen} options={{ title: 'Support Us' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'About the Developer' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="AdEarn" component={AdEarnScreen} options={{ title: 'Watch Ads, Earn Coins' }} />
      <Stack.Screen name="DailyCoin" component={DailyCoinScreen} options={{ title: 'Collect Daily Coins' }} />
      <Stack.Screen name="Claim" component={ClaimScreen} options={{ title: 'Claim Earned Coins' }} />
    </Stack.Navigator>
  );
}
