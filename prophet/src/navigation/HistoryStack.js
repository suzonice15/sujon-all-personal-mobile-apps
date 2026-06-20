import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import HistoryScreen from '../screens/history/HistoryScreen';
import CoinHistoryScreen from '../screens/history/CoinHistoryScreen';
import PointHistoryScreen from '../screens/history/PointHistoryScreen';
import WithdrawHistoryScreen from '../screens/history/WithdrawHistoryScreen';
import WithdrawRequestScreen from '../screens/history/WithdrawRequestScreen';
import StoryDetail from '../screens/home/StoryDetail';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={getHeaderOptions(colors)}>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} options={{ title: 'হিস্টোরি' }} />
      <Stack.Screen name="CoinHistory" component={CoinHistoryScreen} options={{ title: 'কয়েন হিস্টোরি' }} />
      <Stack.Screen name="PointHistory" component={PointHistoryScreen} options={{ title: 'পয়েন্ট হিস্টোরি' }} />
      <Stack.Screen name="WithdrawHistory" component={WithdrawHistoryScreen} options={{ title: 'উইথড্র হিস্টোরি' }} />
      <Stack.Screen name="WithdrawRequest" component={WithdrawRequestScreen} options={{ title: 'উইথড্র রিকোয়েস্ট' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}
