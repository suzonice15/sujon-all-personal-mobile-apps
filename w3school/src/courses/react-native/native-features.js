// React Native chapter: Native Features.

export default {
  id: 'native-features',
  title: 'Native Features',
  description: 'Permissions, notifications, linking and native modules',
  icon: 'phone-android',
  lessons: [
    {
      id: 'rn-permissions',
      title: 'Permissions',
      blocks: [
        { type: 'text', value: 'Android and iOS require runtime permission for camera, notifications, location and more. Ask when the user needs the feature, not at first launch.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { PermissionsAndroid } from 'react-native';

const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
);

if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  console.log('Notifications allowed');
}` },
        { type: 'note', value: 'A denied permission is not a crash. Show a clear message and a path to settings, and keep the rest of the app usable.' },
      ],
    },
    {
      id: 'rn-notifications',
      title: 'Notifications',
      blocks: [
        { type: 'text', value: 'Notifee handles local notifications on Android. Create a channel once, request permission once and display the notification.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import notifee from '@notifee/react-native';

await notifee.createChannel({
  id: 'general',
  name: 'General',
  importance: 4,
});

await notifee.displayNotification({
  title: 'Daily coins',
  body: '10 coins are waiting for you',
  android: { channelId: 'general', pressAction: { id: 'default' } },
});` },
        { type: 'note', value: 'Do not request permission every time you show a notification. Ask once, remember the answer and respect a denial.' },
      ],
    },
    {
      id: 'rn-linking-device',
      title: 'Linking and device info',
      blocks: [
        { type: 'text', value: 'Linking opens URLs, dials a number or sends an email. react-native-device-info exposes the device id and app version for support and diagnostics.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import { Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

await Linking.openURL('https://codenest.app');

console.log(DeviceInfo.getUniqueId());
console.log(DeviceInfo.getVersion());
console.log(DeviceInfo.getSystemVersion());` },
        { type: 'note', value: 'A device id is not a secure identity. It can be reset or spoofed. Use it for analytics and session binding, not as a password.' },
      ],
    },
    {
      id: 'rn-native-modules',
      title: 'Native modules',
      blocks: [
        { type: 'text', value: 'When a library needs platform APIs, it ships a native module. Autolinking connects it on Android and iOS. Some modules require a rebuild, not just a JS reload.' },
        { type: 'list', items: [
          'Check the library supports your React Native version',
          'Rebuild the app after adding a native module',
          'Grant any new manifest permissions',
          'Test on a real device, not only a simulator',
          'Prefer maintained libraries with recent releases',
        ] },
        { type: 'note', value: 'A JS-only change reloads instantly. A native dependency change needs gradle or Xcode. Mixing them up wastes a lot of debugging time.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'native-features',
      q: 'When should you request a permission?',
      options: ['At first launch', 'When the user needs the feature', 'Every screen', 'Never'],
      answer: 1,
      explain: 'Context makes the request understandable and increases acceptance.',
    },
    {
      chapterId: 'native-features',
      q: 'How many times should you request notification permission?',
      options: ['Every notification', 'Once, then respect the answer', 'Every launch', 'Never'],
      answer: 1,
      explain: 'Repeated prompts are annoying and the OS may stop showing them.',
    },
    {
      chapterId: 'native-features',
      q: 'What does Linking.openURL do?',
      options: ['Opens a URL or another app', 'Fetches JSON', 'Creates a database', 'Requests permission'],
      answer: 0,
      explain: 'It hands the URL to the operating system.',
    },
    {
      chapterId: 'native-features',
      q: 'When is a rebuild required?',
      options: ['After a text change', 'After adding a native module', 'After a style change', 'After a state change'],
      answer: 1,
      explain: 'Native code must be compiled into the app.',
    },
  ],
};
