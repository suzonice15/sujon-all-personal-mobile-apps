// Flutter & Dart interview questions, grouped by chapter id.
// { q, a, level: 'basic' | 'intermediate' | 'advanced' }

export default {
  'getting-started': [
    {
      q: 'What is Flutter?',
      a: 'A cross-platform UI toolkit from Google. You write Dart, and Flutter renders the UI with its own engine, so apps look consistent on Android, iOS, web and desktop.',
      level: 'basic',
    },
    {
      q: 'Flutter versus React Native?',
      a: 'React Native maps components to native views. Flutter draws its own UI. Flutter is strong for custom design and consistency; React Native benefits from the JavaScript ecosystem and native look.',
      level: 'intermediate',
    },
    {
      q: 'What is hot reload?',
      a: 'It applies code changes to the running app without losing state, which makes UI work very fast.',
      level: 'basic',
    },
    {
      q: 'What does flutter doctor do?',
      a: 'It checks the Flutter SDK, platform toolchains, devices and licenses, and reports what is missing.',
      level: 'basic',
    },
  ],
  'dart-basics': [
    {
      q: 'What is null safety?',
      a: 'Dart distinguishes nullable and non-nullable types at compile time. A String? may be null; a String must have a value. This prevents many crashes.',
      level: 'basic',
    },
    {
      q: 'final versus const?',
      a: 'final is assigned once at runtime. const is a compile-time constant and can be shared across instances.',
      level: 'basic',
    },
    {
      q: 'What does async/await do?',
      a: 'It waits for a Future without blocking the UI thread, so the app stays responsive during network or file work.',
      level: 'intermediate',
    },
    {
      q: 'List, Set and Map?',
      a: 'List is ordered and allows duplicates. Set stores unique values. Map stores key-value pairs.',
      level: 'basic',
    },
  ],
  widgets: [
    {
      q: 'What is a widget?',
      a: 'An immutable description of part of the UI. Flutter turns widgets into elements and render objects.',
      level: 'basic',
    },
    {
      q: 'Stateless versus Stateful?',
      a: 'A StatelessWidget depends only on its inputs. A StatefulWidget owns mutable state and can rebuild via setState.',
      level: 'basic',
    },
    {
      q: 'What does setState do?',
      a: 'It marks the State dirty and schedules a rebuild, so the UI reflects the new value.',
      level: 'basic',
    },
    {
      q: 'Why prefer composition?',
      a: 'Small widgets are easier to read, test and reuse. Deep inheritance and giant build methods become hard to maintain.',
      level: 'intermediate',
    },
  ],
  layout: [
    {
      q: 'How do Row and Column differ?',
      a: 'Row lays children horizontally. Column lays them vertically. Both use mainAxisAlignment and crossAxisAlignment.',
      level: 'basic',
    },
    {
      q: 'What does Expanded do?',
      a: 'It takes the remaining space along the main axis of a Row or Column. flex controls the share.',
      level: 'basic',
    },
    {
      q: 'How do you fix overflow?',
      a: 'Use a scroll view or a virtualised list, reduce fixed sizes, or let the content wrap. Never ignore the overflow indicator.',
      level: 'intermediate',
    },
    {
      q: 'How do you make a responsive layout?',
      a: 'Use LayoutBuilder or MediaQuery to adapt column counts and spacing to the available width, and test multiple screen sizes.',
      level: 'intermediate',
    },
  ],
  state: [
    {
      q: 'When is setState enough?',
      a: 'For state owned by one screen or a small subtree. Use lifting or a state library when many widgets need the same value.',
      level: 'basic',
    },
    {
      q: 'What is lifting state?',
      a: 'Moving shared state to the closest common parent and passing values down with callbacks up.',
      level: 'intermediate',
    },
    {
      q: 'Provider versus Riverpod?',
      a: 'Both provide shared state. Provider is older and widely used; Riverpod is newer, compile-safe and easier to test in many cases.',
      level: 'intermediate',
    },
    {
      q: 'Why avoid global mutable state?',
      a: 'It makes tests and reasoning hard. Prefer scoped providers or explicit dependency injection.',
      level: 'advanced',
    },
  ],
  lists: [
    {
      q: 'ListView versus ListView.builder?',
      a: 'ListView builds all children at once. builder creates items on demand, so it is the choice for long or dynamic lists.',
      level: 'basic',
    },
    {
      q: 'Why use keys in lists?',
      a: 'Stable keys help Flutter match elements to items when the list changes, preserving the correct state.',
      level: 'intermediate',
    },
    {
      q: 'How do you optimise a long list?',
      a: 'Use builder constructors, keep item widgets small and const, avoid heavy work in itemBuilder, and profile before optimising.',
      level: 'intermediate',
    },
    {
      q: 'What causes grid overflow?',
      a: 'A childAspectRatio that leaves too little height for the content, especially with long text or larger font settings.',
      level: 'basic',
    },
  ],
  navigation: [
    {
      q: 'How does Navigator work?',
      a: 'It keeps a stack of routes. push adds a screen, pop removes the top one, and the system back button pops automatically.',
      level: 'basic',
    },
    {
      q: 'Push versus pushReplacement?',
      a: 'push keeps the previous screen in the stack. pushReplacement removes it, which is useful after login.',
      level: 'basic',
    },
    {
      q: 'What is go_router?',
      a: 'A router that maps URL paths to screens and supports deep links, nested navigation and typed params.',
      level: 'intermediate',
    },
    {
      q: 'Why pass ids instead of whole objects?',
      a: 'Ids are serialisable and survive deep links and state restoration. Whole objects may not be restorable.',
      level: 'advanced',
    },
  ],
  forms: [
    {
      q: 'What does a TextEditingController do?',
      a: 'It reads and sets the text and selection of a field. Dispose it when the widget is removed.',
      level: 'basic',
    },
    {
      q: 'How do you validate a Flutter form?',
      a: 'Wrap fields in a Form with a GlobalKey, give each field a validator, and call currentState!.validate() on submit.',
      level: 'basic',
    },
    {
      q: 'Why use resizeToAvoidBottomInset?',
      a: 'It resizes the body when the keyboard appears so content is not hidden behind it.',
      level: 'intermediate',
    },
    {
      q: 'Why validate on the server as well?',
      a: 'The client can be modified. The server is the only place that can guarantee valid data.',
      level: 'intermediate',
    },
  ],
  networking: [
    {
      q: 'How do you call an API in Flutter?',
      a: 'Use the http package or dio, check the status code, parse JSON into a model, and handle loading and errors explicitly.',
      level: 'basic',
    },
    {
      q: 'Why not create a Future in build?',
      a: 'build can run many times, which restarts the request. Create it once in initState or a state notifier.',
      level: 'intermediate',
    },
    {
      q: 'How do you model JSON safely?',
      a: 'A model class with fromJson, defensive casts and defaults for missing fields. Validate before using the data.',
      level: 'intermediate',
    },
    {
      q: 'How do you support offline use?',
      a: 'Cache the last response, show an offline banner, queue writes in an outbox, and sync with idempotent requests.',
      level: 'advanced',
    },
  ],
  storage: [
    {
      q: 'What is shared_preferences for?',
      a: 'Small unencrypted key-value data such as theme choice and onboarding flags.',
      level: 'basic',
    },
    {
      q: 'When use sqflite?',
      a: 'For structured local data, queries and an offline outbox. It is a real SQLite database on the device.',
      level: 'intermediate',
    },
    {
      q: 'Where do tokens belong?',
      a: 'In flutter_secure_storage, which uses the Android Keystore and iOS Keychain. Never in preferences or a plain file.',
      level: 'basic',
    },
    {
      q: 'What should not be local-only?',
      a: 'Data the user expects to keep across devices or reinstalls. That belongs on the server or in an export feature.',
      level: 'advanced',
    },
  ],
  'projects-interview': [
    {
      q: 'What makes a good Flutter portfolio app?',
      a: 'One small finished flow with real data, loading and error states, local persistence and a clean UI. Depth beats a large unfinished feature list.',
      level: 'basic',
    },
    {
      q: 'How do you test a widget?',
      a: 'Use testWidgets to pump the widget, interact through visible text or keys, and assert what the user sees.',
      level: 'intermediate',
    },
    {
      q: 'What is needed to publish on Android?',
      a: 'A signed AAB, an increasing version code, a store listing and a privacy policy. Test the release build on a real device.',
      level: 'intermediate',
    },
    {
      q: 'Why is losing the upload key serious?',
      a: 'The store trusts that key for every update. Without it you cannot publish under the same app identity.',
      level: 'advanced',
    },
  ],
};
