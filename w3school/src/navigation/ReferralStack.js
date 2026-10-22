import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReferralHome from '../screens/profile/ReferralScreen';
import ReferralHistoryScreen from '../screens/profile/ReferralHistoryScreen';
import TopAffiliatesScreen from '../screens/profile/TopAffiliatesScreen';
import TopEarnersScreen from '../screens/profile/TopEarnersScreen';
import TopReferrersScreen from '../screens/profile/TopReferrersScreen';

const Stack = createNativeStackNavigator();

export default function ReferralStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReferralHome" component={ReferralHome} />
      <Stack.Screen name="ReferralHistory" component={ReferralHistoryScreen} />
      <Stack.Screen name="TopAffiliates" component={TopAffiliatesScreen} />
      <Stack.Screen name="TopEarners" component={TopEarnersScreen} />
      <Stack.Screen name="TopReferrers" component={TopReferrersScreen} />
    </Stack.Navigator>
  );
}
