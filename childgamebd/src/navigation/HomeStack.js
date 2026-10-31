import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { apps_title } from '../config/url';
import { getHeaderOptions } from './headerOptions';

import HomeScreen from '../screens/home/HomeScreen';
import GamePlaceholderScreen from '../screens/home/GamePlaceholderScreen';
import NamePlaceFlowerFruitScreen from '../screens/games/NamePlaceFlowerFruitScreen';
import LetterAdventureStartScreen from '../screens/games/letterAdventure/LetterAdventureStartScreen';
import LetterAdventureLevelsScreen from '../screens/games/letterAdventure/LetterAdventureLevelsScreen';
import LetterAdventureLessonScreen from '../screens/games/letterAdventure/LetterAdventureLessonScreen';
import SeekRushStartScreen from '../screens/games/seekRush/SeekRushStartScreen';
import SeekRushLevelsScreen from '../screens/games/seekRush/SeekRushLevelsScreen';
import SeekRushPlayScreen from '../screens/games/seekRush/SeekRushPlayScreen';
import GuessWordStartScreen from '../screens/games/guessWord/GuessWordStartScreen';
import GuessWordLevelsScreen from '../screens/games/guessWord/GuessWordLevelsScreen';
import GuessWordPlayScreen from '../screens/games/guessWord/GuessWordPlayScreen';
import WordSearchStartScreen from '../screens/games/wordSearch/WordSearchStartScreen';
import WordSearchLevelsScreen from '../screens/games/wordSearch/WordSearchLevelsScreen';
import WordSearchPlayScreen from '../screens/games/wordSearch/WordSearchPlayScreen';
import BlockFillStartScreen from '../screens/games/blockFill/BlockFillStartScreen';
import BlockFillLevelsScreen from '../screens/games/blockFill/BlockFillLevelsScreen';
import BlockFillPlayScreen from '../screens/games/blockFill/BlockFillPlayScreen';
import SubjectQuizStartScreen from '../screens/games/subjectQuiz/SubjectQuizStartScreen';
import SubjectQuizLevelsScreen from '../screens/games/subjectQuiz/SubjectQuizLevelsScreen';
import SubjectQuizPlayScreen from '../screens/games/subjectQuiz/SubjectQuizPlayScreen';
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
import ContactUsScreen from '../screens/settings/ContactUsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: apps_title }} />
      <Stack.Screen name="GamePlaceholder" component={GamePlaceholderScreen} options={{ title: 'খেলা' }} />
      <Stack.Screen
        name="NamePlaceFlowerFruit"
        component={NamePlaceFlowerFruitScreen}
        options={{ title: 'নাম দেশ ফুল ফল', headerShown: false }}
      />
      <Stack.Screen name="LetterAdventure" component={LetterAdventureStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LetterAdventureLevels" component={LetterAdventureLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LetterAdventureLesson" component={LetterAdventureLessonScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SeekRush" component={SeekRushStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SeekRushLevels" component={SeekRushLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SeekRushPlay" component={SeekRushPlayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GuessWord" component={GuessWordStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GuessWordLevels" component={GuessWordLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GuessWordPlay" component={GuessWordPlayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WordSearch" component={WordSearchStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WordSearchLevels" component={WordSearchLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WordSearchPlay" component={WordSearchPlayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BlockFill" component={BlockFillStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BlockFillLevels" component={BlockFillLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="BlockFillPlay" component={BlockFillPlayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SubjectQuiz" component={SubjectQuizStartScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SubjectQuizLevels" component={SubjectQuizLevelsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SubjectQuizPlay" component={SubjectQuizPlayScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DataScreen" component={DataScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
      <Stack.Screen name="AboutApps" component={AboutAppsScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
      <Stack.Screen name="Donation" component={DonationScreen} options={{ title: 'সহযোগিতা করুন' }} />
      <Stack.Screen name="AboutDeveloper" component={AboutDeveloperScreen} options={{ title: 'ডেভেলপার সম্পর্কে' }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'প্রাইভেসি পলিসি' }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'মতামত দিন' }} />
      <Stack.Screen name="SettingInfo" component={SettingsScreen} options={{ title: 'সেটিংস' }} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} options={{ title: 'যোগাযোগ করুন' }} />
      <Stack.Screen name="AdEarn" component={AdEarnScreen} options={{ title: 'বিজ্ঞাপন দেখে কয়েন সংগ্রহ করুন' }} />
      <Stack.Screen name="DailyCoin" component={DailyCoinScreen} options={{ title: 'দৈনিক কয়েন সংগ্রহ করুন' }} />
      <Stack.Screen name="Claim" component={ClaimScreen} options={{ title: 'অর্জিত কয়েন গ্রহণ করুন' }} />
    </Stack.Navigator>
  );
}
