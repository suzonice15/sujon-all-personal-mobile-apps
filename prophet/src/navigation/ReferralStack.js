import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReferralHome from '../screens/profile/ReferralScreen';
import ReferralSectionScreen from '../screens/profile/ReferralSectionScreen';

const Stack = createNativeStackNavigator();

const titles = {
  ReferralHistory: 'রেফারেল ইতিহাস',
  TopAffiliates: 'শীর্ষ অ্যাফিলিয়েট',
  TopEarners: 'শীর্ষ আয়কারী',
  TopReferrers: 'শীর্ষ রেফারার',
};

export default function ReferralStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ReferralHome" component={ReferralHome} />
      {Object.keys(titles).map((name) => (
        <Stack.Screen key={name} name={name}>
          {(props) => <ReferralSectionScreen {...props} section={name} title={titles[name]} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
}
