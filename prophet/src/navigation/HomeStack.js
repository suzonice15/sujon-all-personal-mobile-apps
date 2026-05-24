import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { apps_title } from '../config/url';
import PointsBadge from '../components/PointsBadge';

import HomeScreen from '../screens/home/HomeScreen';
import DataScreen from '../screens/home/DataScreen';
import StoryDetail from '../screens/home/StoryDetail';
import AboutAppsScreen from '../screens/settings/AboutAppsScreen';
import AboutDeveloperScreen from '../screens/settings/AboutDeveloperScreen';
import PrivacyScreen from '../screens/settings/PrivacyScreen';
import FeedbackScreen from '../screens/settings/FeedbackScreen';
import AdEarnScreen from '../screens/income/AdEarnScreen';
// import SettingsScreen from '../screens/settings/SettingsScreen';
import SettingsStack from './SettingsStack';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: '#4F46E5' },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: 'bold' },
  headerRight: () => <PointsBadge />,
};

export default function HomeStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        ...headerOptions,
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 10 }}>
            <MaterialIcons name="menu" size={26} color="#fff" />
          </TouchableOpacity>
        ),
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: apps_title }} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
       <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'ডেভেলপার সম্পর্কে' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'মতামত দিন' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="AdEarn" component={AdEarnScreen} options={{ title: 'আয় করুন' }} />
    </Stack.Navigator>
  );
}
