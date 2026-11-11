// React Native chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What React Native is, Expo versus bare and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'rn-what-is',
      title: 'What is React Native?',
      blocks: [
        { type: 'text', value: 'React Native runs React on a mobile device. Your components describe the UI, and React Native maps them to real Android and iOS views instead of HTML.' },
        { type: 'list', items: [
          'One codebase for Android and iOS',
          'JavaScript and React, no HTML or CSS',
          'Native views, not a WebView',
          'A large ecosystem of libraries',
        ] },
        { type: 'note', value: 'React Native is not a website in a browser. There is no DOM. You use View, Text, Image and other native components.' },
      ],
    },
    {
      id: 'rn-expo-bare',
      title: 'Expo or bare?',
      blocks: [
        { type: 'text', value: 'Expo is the fastest way to start: no Android Studio or Xcode needed for development, and you can preview on a phone with Expo Go. Bare React Native gives full native control.' },
        { type: 'list', items: [
          'Expo: fast start, managed builds, great for learning',
          'Bare: custom native modules, full control, more setup',
          'Expo can prebuild to native when you need it',
          'Choose Expo unless a library requires bare setup',
        ] },
        { type: 'note', value: 'This CodeNest app is a bare React Native project with a custom Android build. It uses native modules such as SQLite, AdMob and Notifee.' },
      ],
    },
    {
      id: 'rn-first-app',
      title: 'Your first app',
      blocks: [
        { type: 'text', value: 'A React Native screen is a function component that returns JSX. View is a container, Text displays text, and StyleSheet creates styles.' },
        { type: 'code', lang: 'rn', tryIt: false, value: `import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello, React Native!</Text>
        <Text style={styles.subtitle}>My first mobile app</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6FB', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A' },
  subtitle: { marginTop: 8, fontSize: 16, color: '#64748B' },
});` },
        { type: 'note', value: 'There is no <div> or <span>. A View is the basic container and Text is required for every piece of visible text.' },
      ],
    },
    {
      id: 'rn-project-structure',
      title: 'Project structure',
      blocks: [
        { type: 'text', value: 'Keep screens, components, navigation, data and services separate. A predictable structure makes a growing app easier to navigate.' },
        { type: 'code', lang: 'text', tryIt: false, value: `src/
  navigation/     stacks, tabs, drawer
  screens/        one file per screen
  components/     reusable UI
  context/        global state
  db/             local database
  api/            network clients
  utils/          helpers
  theme/          colors and spacing` },
        { type: 'note', value: 'Start flat and split folders when a file gets too large. Premature structure can be as confusing as none.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What does React Native render?',
      options: ['HTML in a WebView', 'Native platform views', 'PDF pages', 'Server-side templates'],
      answer: 1,
      explain: 'React Native maps components to real Android and iOS views.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which is the fastest way to start learning React Native?',
      options: ['Expo', 'A bare project with a custom native module', 'Xcode only', 'A web browser'],
      answer: 0,
      explain: 'Expo removes most native setup and supports phone previews.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which component must wrap visible text?',
      options: ['View', 'Text', 'Image', 'Pressable'],
      answer: 1,
      explain: 'Raw text outside a Text component is not valid React Native.',
    },
    {
      chapterId: 'getting-started',
      q: 'What creates styles in React Native?',
      options: ['CSS files', 'StyleSheet.create', 'className', 'SCSS'],
      answer: 1,
      explain: 'Styles are JavaScript objects, usually created with StyleSheet.create.',
    },
  ],
};
