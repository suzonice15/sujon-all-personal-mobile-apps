import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import QuizHomeScreen from '../screens/course/QuizHomeScreen';
import CourseQuizListScreen from '../screens/course/CourseQuizListScreen';
import CourseQuizScreen from '../screens/course/CourseQuizScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function QuizeStack({ navigation }) {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="QuizeMain" component={QuizHomeScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="CourseQuizList" component={CourseQuizListScreen} options={({ route }) => ({ title: route.params?.headerTitle || 'Quiz', headerLeft: undefined })} />
      <Stack.Screen name="CourseQuiz"component={CourseQuizScreen} options={({ route }) => ({ title: route.params?.headerTitle || 'Quiz', headerLeft: undefined })} />
    </Stack.Navigator>
  );
}
