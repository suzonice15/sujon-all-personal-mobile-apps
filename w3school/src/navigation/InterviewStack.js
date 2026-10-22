import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';
import InterviewHomeScreen from '../screens/interview/InterviewHomeScreen';
import InterviewCourseScreen from '../screens/interview/InterviewCourseScreen';
import InterviewQuestionsScreen from '../screens/interview/InterviewQuestionsScreen';
import TryItScreen from '../screens/course/TryItScreen';
import { getHeaderOptions } from './headerOptions';

const Stack = createNativeStackNavigator();

export default function InterviewStack({ navigation }) {
  const { colors } = useTheme();
  const headerOpts = getHeaderOptions(colors, { showMenu: true, navigation });

  return (
    <Stack.Navigator screenOptions={{ ...headerOpts, headerShown: true }}>
      <Stack.Screen name="InterviewHome" component={InterviewHomeScreen} options={{ title: 'Interview' }} />
      {/* headerLeft: undefined drops the drawer menu so these show a back arrow */}
      <Stack.Screen name="InterviewCourse" component={InterviewCourseScreen} options={({ route }) => ({ title: route.params?.headerTitle, headerLeft: undefined })} />
      <Stack.Screen name="InterviewQuestions" component={InterviewQuestionsScreen} options={({ route }) => ({ title: route.params?.headerTitle, headerLeft: undefined })} />
      <Stack.Screen name="TryIt" component={TryItScreen} options={{ title: 'Try it yourself', headerLeft: undefined }} />
    </Stack.Navigator>
  );
}
