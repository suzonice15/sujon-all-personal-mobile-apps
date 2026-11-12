// Flutter chapter: Getting Started.

export default {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'What Flutter is, why Dart and your first app',
  icon: 'rocket-launch',
  lessons: [
    {
      id: 'flutter-what-is',
      title: 'What is Flutter?',
      blocks: [
        { type: 'text', value: 'Flutter is a UI toolkit from Google. You write Dart, and Flutter draws every pixel itself. That is why the same code looks nearly identical on Android, iOS, web and desktop.' },
        { type: 'list', items: [
          'One codebase for Android and iOS',
          'Widgets for every visual element',
          'Hot reload for a fast feedback loop',
          'Own rendering engine, consistent UI',
          'Strong for custom designs and animations',
        ] },
        { type: 'note', value: 'React Native maps components to native views. Flutter draws its own UI. Both are good; the choice depends on the team and the design.' },
      ],
    },
    {
      id: 'flutter-why-dart',
      title: 'Why Dart?',
      blocks: [
        { type: 'text', value: 'Dart is the language of Flutter. It is typed, object-oriented and optimised for UI. It compiles to native code for release and supports hot reload during development.' },
        { type: 'list', items: [
          'Null safety catches missing values at compile time',
          'async/await for network and file work',
          'A single language for logic and UI',
          'Fast development with hot reload',
        ] },
        { type: 'note', value: 'You do not need to master every Dart feature before building a screen. Learn classes, null safety and async, then build.' },
      ],
    },
    {
      id: 'flutter-first-app',
      title: 'Your first app',
      blocks: [
        { type: 'text', value: 'A Flutter app is a tree of widgets. MaterialApp sets up the app, Scaffold gives a screen structure, and build returns the widget tree.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `import 'package:flutter/material.dart';

void main() => runApp(const CodeNestApp());

class CodeNestApp extends StatelessWidget {
  const CodeNestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CodeNest',
      home: Scaffold(
        appBar: AppBar(title: const Text('CodeNest')),
        body: const Center(
          child: Text('Hello, Flutter!'),
        ),
      ),
    );
  }
}` },
        { type: 'note', value: 'super.key forwards the widget key to the parent. It is the modern constructor style; use it in every widget.' },
      ],
    },
    {
      id: 'flutter-tools',
      title: 'Tools',
      blocks: [
        { type: 'list', items: [
          'flutter doctor - check the setup',
          'flutter create - new project',
          'flutter run - build and launch',
          'r - hot reload, R - hot restart',
          'flutter test - run tests',
          'flutter build apk / appbundle - release',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `flutter doctor
flutter create codenest
cd codenest
flutter run

flutter build appbundle --release` },
        { type: 'note', value: 'Run flutter doctor first. It tells you which SDK, device or license is missing before you waste time on a broken build.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'getting-started',
      q: 'What language does Flutter use?',
      options: ['JavaScript', 'Dart', 'Kotlin', 'Swift'],
      answer: 1,
      explain: 'Flutter apps are written in Dart.',
    },
    {
      chapterId: 'getting-started',
      q: 'How does Flutter render the UI?',
      options: ['With native views', 'With its own rendering engine', 'In a WebView', 'With HTML'],
      answer: 1,
      explain: 'Flutter draws every pixel itself.',
    },
    {
      chapterId: 'getting-started',
      q: 'What does hot reload do?',
      options: ['Rebuilds the store package', 'Applies code changes without losing state', 'Restarts the phone', 'Deletes the cache'],
      answer: 1,
      explain: 'It updates the running app quickly.',
    },
    {
      chapterId: 'getting-started',
      q: 'Which command checks the Flutter setup?',
      options: ['flutter doctor', 'flutter run', 'flutter test', 'flutter build'],
      answer: 0,
      explain: 'It reports missing SDKs and devices.',
    },
  ],
};
