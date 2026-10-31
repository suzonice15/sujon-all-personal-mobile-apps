import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import IncomeScreen from '../screens/income/IncomeScreen';
import StoryDetail from '../screens/home/StoryDetail';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function IncomeStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={getHeaderOptions(colors)}>
      <Stack.Screen name="IncomeList" component={IncomeScreen} options={{ title: 'ইনকাম হিস্টোরি' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}
