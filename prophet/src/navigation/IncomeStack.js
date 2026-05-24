import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IncomeScreen from '../screens/income/IncomeScreen';
import PointsBadge from '../components/PointsBadge';

const Stack = createNativeStackNavigator();

export default function IncomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IncomeList"
        component={IncomeScreen}
        options={{
          headerTitle: 'ইনকাম ইতিহাস',
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => <PointsBadge />,
        }}
      />
    </Stack.Navigator>
  );
}
