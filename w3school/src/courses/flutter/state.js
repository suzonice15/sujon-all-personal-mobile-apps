// Flutter chapter: State.

export default {
  id: 'state',
  title: 'State Management',
  description: 'setState, lifting state and app-wide state',
  icon: 'sync',
  lessons: [
    {
      id: 'flutter-setstate',
      title: 'setState',
      blocks: [
        { type: 'text', value: 'For a single screen, setState is enough. Keep the state in the State object and call setState when it changes. Flutter then rebuilds that widget.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class ThemeToggle extends StatefulWidget {
  const ThemeToggle({super.key});

  @override
  State<ThemeToggle> createState() => _ThemeToggleState();
}

class _ThemeToggleState extends State<ThemeToggle> {
  bool dark = false;

  @override
  Widget build(BuildContext context) {
    return Switch(
      value: dark,
      onChanged: (value) => setState(() => dark = value),
    );
  }
}` },
        { type: 'note', value: 'setState should contain only the state change. Do not start a network request inside the callback; call the async method and update state when it finishes.' },
      ],
    },
    {
      id: 'flutter-lifting-state',
      title: 'Lifting state',
      blocks: [
        { type: 'text', value: 'When two widgets need the same value, move the state to their closest common parent. Pass the value down and callbacks up.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  String query = '';

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SearchBox(value: query, onChanged: (v) => setState(() => query = v)),
        ResultCount(query: query),
      ],
    );
  }
}` },
        { type: 'note', value: 'Lifting state is simple and explicit. Use it until the prop drilling becomes painful, then introduce a state library.' },
      ],
    },
    {
      id: 'flutter-provider',
      title: 'Provider and Riverpod',
      blocks: [
        { type: 'text', value: 'For app-wide state such as theme, auth or cart, a provider avoids passing values through every widget. Provider is the classic choice; Riverpod is a popular modern alternative.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class Cart extends ChangeNotifier {
  final items = <String>[];

  void add(String item) {
    items.add(item);
    notifyListeners();
  }
}

// In main:
ChangeNotifierProvider(create: (_) => Cart(), child: const MyApp())

// In a widget:
final cart = context.watch<Cart>();
Text('\${cart.items.length} items')` },
        { type: 'note', value: 'Do not put every value in a global provider. Local state stays local; only shared state goes into the store.' },
      ],
    },
    {
      id: 'flutter-state-choice',
      title: 'Choosing an approach',
      blocks: [
        { type: 'list', items: [
          'One widget - setState',
          'A few related widgets - lift state',
          'App-wide theme, auth, cart - Provider / Riverpod',
          'Complex async data - a repository plus a state notifier',
          'Large team - agree on one pattern and document it',
        ] },
        { type: 'text', value: 'Start with setState and lifting state. Add a library when the pain is real, not because a tutorial used one.' },
        { type: 'note', value: 'The best state management is the one your team understands. Mixing three patterns in one app is the real problem.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'state',
      q: 'What does setState do?',
      options: ['Saves to the database', 'Marks the widget dirty and rebuilds it', 'Starts a new screen', 'Deletes state'],
      answer: 1,
      explain: 'It schedules a rebuild with the new state.',
    },
    {
      chapterId: 'state',
      q: 'What is lifting state?',
      options: ['Deleting state', 'Moving shared state to a common parent', 'Using a global variable', 'Caching images'],
      answer: 1,
      explain: 'The parent owns the value and passes it down.',
    },
    {
      chapterId: 'state',
      q: 'When use Provider or Riverpod?',
      options: ['For one local counter', 'For app-wide shared state', 'For CSS', 'Never'],
      answer: 1,
      explain: 'Libraries help when many widgets need the same state.',
    },
    {
      chapterId: 'state',
      q: 'What should you avoid?',
      options: ['Local state', 'Mixing many state patterns without a reason', 'Lifting state', 'Using setState'],
      answer: 1,
      explain: 'Consistency keeps the app understandable.',
    },
  ],
};
