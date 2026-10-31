import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import HistoryScreen from '../screens/history/HistoryScreen';
import CoinHistoryScreen from '../screens/history/CoinHistoryScreen';
import PointHistoryScreen from '../screens/history/PointHistoryScreen';
import WithdrawHistoryScreen from '../screens/history/WithdrawHistoryScreen';
import WithdrawRequestScreen from '../screens/history/WithdrawRequestScreen';
import MobileRechargeScreen from '../screens/history/MobileRechargeScreen';
import StoryDetail from '../screens/home/StoryDetail';
import OrderHistoryScreen from '../screens/history/OrderHistoryScreen';
import OrderDetailScreen from '../screens/history/OrderDetailScreen';
import AllTransactionHistoryScreen from '../screens/history/AllTransactionHistoryScreen';
import { getHeaderOptions, backToDashboardOption } from './headerOptions';

const Stack = createNativeStackNavigator();

// Opened from the Dashboard menu (no bottom tab), so every screen gets a back button.
export default function HistoryStack() {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors);

  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({ ...headerOpts, ...backToDashboardOption(colors, navigation) })}>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} options={{ title: 'History' }} />
      <Stack.Screen name="CoinHistory" component={CoinHistoryScreen} options={{ title: 'Coin History' }} />
      <Stack.Screen name="PointHistory" component={PointHistoryScreen} options={{ title: 'Point History' }} />
      <Stack.Screen name="WithdrawHistory" component={WithdrawHistoryScreen} options={{ title: 'Withdraw History' }} />
      <Stack.Screen name="WithdrawRequest" component={WithdrawRequestScreen} options={{ title: 'bKash Withdraw' }} />
      <Stack.Screen name="MobileRecharge" component={MobileRechargeScreen} options={{ title: 'Mobile Recharge' }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: 'Order Details' }} />
      <Stack.Screen name="AllTransactionHistory" component={AllTransactionHistoryScreen} options={{ title: 'All Transactions' }} />
      <Stack.Screen name="StoryDetail" component={StoryDetail} />
    </Stack.Navigator>
  );
}
