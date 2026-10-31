import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import SkillTestHomeScreen from '../screens/skilltest/SkillTestHomeScreen';
import SkillTestExamScreen from '../screens/skilltest/SkillTestExamScreen';
import SkillTestResultScreen from '../screens/skilltest/SkillTestResultScreen';
import SkillTestHistoryScreen from '../screens/skilltest/SkillTestHistoryScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function SkillTestStack({ navigation }) {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="SkillTestHome" component={SkillTestHomeScreen} options={{ title: 'Skill Test' }} />
      {/* headerLeft: undefined drops the drawer menu so these show a back arrow */}
      <Stack.Screen name="SkillTestExam" component={SkillTestExamScreen} options={{ title: 'Skill Test', headerLeft: undefined, gestureEnabled: false }} />
      <Stack.Screen name="SkillTestResult" component={SkillTestResultScreen} options={{ title: 'Result', headerLeft: undefined }} />
      <Stack.Screen name="SkillTestHistory" component={SkillTestHistoryScreen} options={{ title: 'My Results', headerLeft: undefined }} />
    </Stack.Navigator>
  );
}
