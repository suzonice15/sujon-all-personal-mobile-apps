// React Native chapter: Navigation.

export default {
  id: 'navigation',
  title: 'Navigation',
  description: 'Stacks, tabs, params and deep links',
  icon: 'navigation',
  lessons: [
    {
      id: 'rn-navigation-basics',
      title: 'React Navigation',
      blocks: [
        { type: 'text', value: 'React Navigation is the standard library. A NavigationContainer wraps the navigator. A stack pushes screens and the back button pops them.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CourseScreen from './screens/CourseScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Course" component={CourseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}` },
        { type: 'note', value: 'Keep one NavigationContainer at the root. Nesting containers creates separate navigation histories and confusing back behaviour.' },
      ],
    },
    {
      id: 'rn-navigation-params',
      title: 'Params and types',
      blocks: [
        { type: 'text', value: 'Screens receive route params. Type the param list so navigation calls are checked. Read params with route.params.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `function CourseScreen({ route, navigation }) {
  const { courseId } = route.params;

  return (
    <Button
      title="Open lesson"
      onPress={() => navigation.navigate('Lesson', { courseId, lessonId: 'intro' })}
    />
  );
}

// TypeScript param list
type RootStackParamList = {
  Home: undefined;
  Course: { courseId: string };
  Lesson: { courseId: string; lessonId: string };
};` },
        { type: 'note', value: 'Pass ids, not whole objects. A param should be serialisable so deep links and state persistence work.' },
      ],
    },
    {
      id: 'rn-tabs-drawer',
      title: 'Tabs and drawer',
      blocks: [
        { type: 'text', value: 'A bottom tab navigator switches between top-level areas. A drawer adds a side menu. Both can contain a stack per tab.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Learn" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Main" component={Tabs} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}` },
        { type: 'note', value: 'A common shape is drawer > tabs > stack. Each tab keeps its own stack, so back behaves naturally.' },
      ],
    },
    {
      id: 'rn-deep-links',
      title: 'Deep links',
      blocks: [
        { type: 'text', value: 'A deep link opens a screen from a URL or a notification. Configure a linking object that maps paths to screens.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `const linking = {
  prefixes: ['codenest://', 'https://codenest.app'],
  config: {
    screens: {
      Home: '',
      Course: 'course/:courseId',
      Lesson: 'course/:courseId/lesson/:lessonId',
    },
  },
};

<NavigationContainer linking={linking}>...</NavigationContainer>` },
        { type: 'note', value: 'Test deep links with adb shell am start -a android.intent.action.VIEW -d "codenest://course/sql". A broken link is a broken notification.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'navigation',
      q: 'What wraps a React Navigation app?',
      options: ['SafeAreaView', 'NavigationContainer', 'FlatList', 'Provider'],
      answer: 1,
      explain: 'It holds the navigation state and linking config.',
    },
    {
      chapterId: 'navigation',
      q: 'How does a screen read params?',
      options: ['route.params', 'props.params', 'navigation.params', 'state.params'],
      answer: 0,
      explain: 'The route object contains the params passed to the screen.',
    },
    {
      chapterId: 'navigation',
      q: 'What should you pass as a param?',
      options: ['The whole object', 'A serialisable id', 'A function', 'A database connection'],
      answer: 1,
      explain: 'Ids survive deep links and state persistence.',
    },
    {
      chapterId: 'navigation',
      q: 'Which navigator is best for top-level areas?',
      options: ['Stack', 'Bottom tabs', 'Modal only', 'None'],
      answer: 1,
      explain: 'Tabs are the usual pattern for top-level sections.',
    },
  ],
};
