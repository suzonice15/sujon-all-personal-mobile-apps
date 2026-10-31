import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import QuizeScreen from '../screens/quize/QuizeScreen';
import QuizStart from '../screens/quize/QuizStartScreen';
import QuizeData from '../screens/quize/QuizeData';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function QuizeStack({ navigation }) {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="QuizeMain" component={QuizeScreen} options={{ title: 'কুইজ' }} />
      <Stack.Screen name="QuizeData" component={QuizeData} options={{ title: 'কুইজ' }} />
      <Stack.Screen name="QuizStart" component={QuizStart} options={{ title: 'কুইজ শুরু' }} />
    </Stack.Navigator>
  );
}
