// Flutter chapter: Navigation.

export default {
  id: 'navigation',
  title: 'Navigation',
  description: 'Navigator, routes, params and go_router',
  icon: 'navigation',
  lessons: [
    {
      id: 'flutter-navigator',
      title: 'Navigator',
      blocks: [
        { type: 'text', value: 'Navigator pushes and pops screens like a stack. push adds a screen; pop returns to the previous one. The Android back button pops automatically.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => const CourseScreen(courseId: 'sql'),
  ),
);

// Go back
Navigator.pop(context);` },
        { type: 'note', value: 'Use pushReplacement when the user should not return to the previous screen, for example after login.' },
      ],
    },
    {
      id: 'flutter-routes-params',
      title: 'Routes and params',
      blocks: [
        { type: 'text', value: 'Named routes keep navigation readable. For typed arguments, pass a class or a small value object, not a loose map.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `// main.dart
MaterialApp(
  routes: {
    '/': (context) => const HomeScreen(),
    '/course': (context) => const CourseScreen(),
  },
)

// navigate
Navigator.pushNamed(context, '/course', arguments: 'sql');

// read
final courseId = ModalRoute.of(context)!.settings.arguments as String;` },
        { type: 'note', value: 'Named routes are convenient for small apps. For deep links and complex flows, go_router is easier to reason about.' },
      ],
    },
    {
      id: 'flutter-go-router',
      title: 'go_router',
      blocks: [
        { type: 'text', value: 'go_router maps URL paths to screens. It supports deep links, nested navigation and typed params, and it is the recommended router for new Flutter apps.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `final router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    GoRoute(
      path: '/course/:id',
      builder: (context, state) => CourseScreen(
        courseId: state.pathParameters['id']!,
      ),
    ),
  ],
);

MaterialApp.router(routerConfig: router);` },
        { type: 'note', value: 'A deep link is a URL that opens a specific screen. Test it with adb shell am start -a android.intent.action.VIEW -d "codenest://course/sql".' },
      ],
    },
    {
      id: 'flutter-navigation-patterns',
      title: 'Patterns',
      blocks: [
        { type: 'list', items: [
          'Bottom navigation for top-level areas',
          'Stack per tab so back stays inside the tab',
          'Modal routes for short tasks',
          'pushReplacement after login',
          'Restore state when returning to a tab',
          'Pass ids, not whole objects',
        ] },
        { type: 'text', value: 'Plan the navigation shape before building screens. Changing it later means touching every route.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'navigation',
      q: 'What does Navigator.push do?',
      options: ['Closes a screen', 'Adds a screen on top', 'Deletes the stack', 'Restarts the app'],
      answer: 1,
      explain: 'It pushes a new route onto the stack.',
    },
    {
      chapterId: 'navigation',
      q: 'What does Navigator.pop do?',
      options: ['Adds a screen', 'Returns to the previous screen', 'Opens a URL', 'Clears data'],
      answer: 1,
      explain: 'It removes the top route.',
    },
    {
      chapterId: 'navigation',
      q: 'Which router supports URL paths and deep links well?',
      options: ['go_router', 'Provider', 'sqflite', 'http'],
      answer: 0,
      explain: 'go_router maps paths to screens.',
    },
    {
      chapterId: 'navigation',
      q: 'What should you pass as a route argument?',
      options: ['A whole database object', 'A serialisable id', 'A function', 'A BuildContext'],
      answer: 1,
      explain: 'Ids survive deep links and state restoration.',
    },
  ],
};
