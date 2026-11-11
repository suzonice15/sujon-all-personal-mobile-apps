// React Native chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a course app, test it and publish it',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'rn-project-app',
      title: 'Project: course app',
      blocks: [
        { type: 'text', value: 'Build a small app with a list, a detail screen, local progress and a settings screen. That covers the core skills an interviewer expects.' },
        { type: 'code', lang: 'text', tryIt: false, value: `src/
  navigation/AppNavigator.js
  screens/CourseListScreen.js
  screens/CourseDetailScreen.js
  screens/SettingsScreen.js
  components/CourseCard.js
  storage/progress.js
  context/ThemeContext.js` },
        { type: 'list', items: [
          'List: FlatList with a stable key',
          'Detail: route params and a back button',
          'Progress: SQLite or AsyncStorage',
          'Settings: theme toggle persisted',
          'Loading and empty states on every screen',
        ] },
        { type: 'note', value: 'A small finished app is a better portfolio piece than a large unfinished one. Ship one feature at a time.' },
      ],
    },
    {
      id: 'rn-testing',
      title: 'Testing',
      blocks: [
        { type: 'text', value: 'Test logic with Jest and components with React Native Testing Library. Mock native modules, not your own code.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { render, fireEvent } from '@testing-library/react-native';
import Counter from '../Counter';

test('increments the counter', () => {
  const screen = render(<Counter />);
  fireEvent.press(screen.getByText('Add'));
  expect(screen.getByText('1')).toBeTruthy();
});` },
        { type: 'note', value: 'Test behaviour the user can see: labels, buttons and visible text. Avoid asserting on private state or component internals.' },
      ],
    },
    {
      id: 'rn-publishing',
      title: 'Publishing',
      blocks: [
        { type: 'list', items: [
          'Android: generate an upload key and an AAB',
          'iOS: archive in Xcode and upload to App Store Connect',
          'Version code must increase for every Play Store upload',
          'Store listing: icon, screenshots, description, privacy policy',
          'Test the release build on a real device before submitting',
          'Keep the signing key safe; losing it blocks updates',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `cd android
./gradlew bundleRelease

# Output
app/build/outputs/bundle/release/app-release.aab` },
        { type: 'note', value: 'A debug APK is for testing. The Play Store needs a signed AAB with the release key.' },
      ],
    },
    {
      id: 'rn-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is the difference between React and React Native?',
          'View versus div?',
          'How does Flexbox differ from the web?',
          'Controlled versus uncontrolled TextInput?',
          'FlatList versus ScrollView?',
          'How do you handle navigation params?',
          'Where do you store a token?',
          'How do you debug a native module issue?',
          'How do you improve list performance?',
          'How do you publish an Android app?',
        ] },
        { type: 'text', value: 'Strong answers name the component, the lifecycle and the failure mode. "Use FlatList because it recycles rows and stays fast with long data" beats "use FlatList".' },
        { type: 'note', value: 'Be ready to build a small screen live: a list, a detail route, loading and error states. That is the practical round.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which list component should a course list use?',
      options: ['ScrollView', 'FlatList', 'View', 'Modal'],
      answer: 1,
      explain: 'FlatList recycles rows and handles long data.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What should a component test assert?',
      options: ['Private state', 'Visible behaviour and text', 'The file path', 'The bundle size'],
      answer: 1,
      explain: 'Tests should reflect what the user sees and does.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does the Play Store require?',
      options: ['A debug APK', 'A signed AAB with an increasing version code', 'A ZIP file', 'Only source code'],
      answer: 1,
      explain: 'The store uses the AAB and requires version increments.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why keep the signing key safe?',
      options: ['It makes the app faster', 'Losing it blocks future updates', 'It enables ads', 'It reduces size'],
      answer: 1,
      explain: 'The store trusts the key for every update.',
    },
  ],
};
