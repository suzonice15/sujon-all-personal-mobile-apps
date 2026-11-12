// Flutter chapter: Projects and Interview Practice.

export default {
  id: 'projects-interview',
  title: 'Project & Interview Prep',
  description: 'Build a course app, test it and publish it',
  icon: 'workspace-premium',
  lessons: [
    {
      id: 'flutter-project-app',
      title: 'Project: course app',
      blocks: [
        { type: 'text', value: 'Build a small app with a list, a detail page, local progress and a theme toggle. That covers the core skills an interviewer expects.' },
        { type: 'code', lang: 'text', tryIt: false, value: `lib/
  main.dart
  models/course.dart
  data/course_repository.dart
  screens/course_list_screen.dart
  screens/course_detail_screen.dart
  widgets/course_card.dart
  state/progress_store.dart` },
        { type: 'list', items: [
          'List with ListView.builder',
          'Detail with a route param',
          'Progress in sqflite or preferences',
          'Theme toggle with Provider',
          'Loading, error and empty states',
        ] },
        { type: 'note', value: 'A small finished app is a better portfolio piece than a large unfinished one. Ship one feature at a time.' },
      ],
    },
    {
      id: 'flutter-testing',
      title: 'Testing',
      blocks: [
        { type: 'text', value: 'flutter test runs unit and widget tests. A widget test pumps a screen and checks what the user sees. Test behaviour, not private fields.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `testWidgets('counter increments', (tester) async {
  await tester.pumpWidget(const MaterialApp(home: Counter()));

  expect(find.text('0'), findsOneWidget);

  await tester.tap(find.text('Add'));
  await tester.pump();

  expect(find.text('1'), findsOneWidget);
});` },
        { type: 'note', value: 'Use find.byType, find.text and find.byKey. Avoid depending on widget internals that change often.' },
      ],
    },
    {
      id: 'flutter-publishing',
      title: 'Publishing',
      blocks: [
        { type: 'list', items: [
          'Set a unique applicationId and bundle id',
          'Create an upload keystore and keep it safe',
          'Build an app bundle for the Play Store',
          'Add an icon, screenshots and a privacy policy',
          'Test the release build on a real device',
          'Increase versionCode for every upload',
        ] },
        { type: 'code', lang: 'bash', tryIt: false, value: `flutter build appbundle --release
# build/app/outputs/bundle/release/app-release.aab` },
        { type: 'note', value: 'A debug APK is for testing. The store needs a signed AAB and an increasing version code.' },
      ],
    },
    {
      id: 'flutter-interview-practice',
      title: 'Interview practice',
      blocks: [
        { type: 'list', items: [
          'What is a widget?',
          'StatelessWidget versus StatefulWidget?',
          'What does setState do?',
          'How do you handle state across screens?',
          'ListView versus ListView.builder?',
          'How does navigation work?',
          'How do you validate a form?',
          'How do you call an API and model JSON?',
          'Where do you store a token?',
          'How do you publish an app?',
        ] },
        { type: 'text', value: 'Strong answers name the widget, the lifecycle and the failure mode. "Use ListView.builder because it builds only visible items" is better than "use a list".' },
        { type: 'note', value: 'Be ready to build a small screen live: a list, a detail route and a loading state.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'projects-interview',
      q: 'Which widget builds a long list efficiently?',
      options: ['Column', 'ListView.builder', 'Container', 'Stack'],
      answer: 1,
      explain: 'It creates items on demand.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does flutter test run?',
      options: ['Only unit tests', 'Unit and widget tests', 'Only integration tests', 'The app store'],
      answer: 1,
      explain: 'It runs the test files in the project.',
    },
    {
      chapterId: 'projects-interview',
      q: 'What does the Play Store require?',
      options: ['A debug APK', 'A signed AAB with an increasing version code', 'A ZIP', 'Only source code'],
      answer: 1,
      explain: 'The store uses the AAB and versioning.',
    },
    {
      chapterId: 'projects-interview',
      q: 'Why keep the upload keystore safe?',
      options: ['It makes the app faster', 'Losing it blocks future updates', 'It enables ads', 'It reduces size'],
      answer: 1,
      explain: 'The store trusts the key for every update.',
    },
  ],
};
