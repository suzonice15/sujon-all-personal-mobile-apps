// Flutter chapter: Widgets.

export default {
  id: 'widgets',
  title: 'Widgets',
  description: 'Everything is a widget: stateless, stateful and composition',
  icon: 'widgets',
  lessons: [
    {
      id: 'flutter-widget-tree',
      title: 'The widget tree',
      blocks: [
        { type: 'text', value: 'Every part of a Flutter UI is a widget: text, spacing, layout, even the app itself. Widgets are immutable descriptions; Flutter rebuilds them when state changes.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Scaffold(
  appBar: AppBar(title: const Text('Courses')),
  body: Column(
    children: const [
      Text('SQL'),
      SizedBox(height: 8),
      Text('C#'),
    ],
  ),
)` },
        { type: 'note', value: 'A widget is not the visual object itself. It is a recipe; the element and render objects do the actual work.' },
      ],
    },
    {
      id: 'flutter-stateless',
      title: 'StatelessWidget',
      blocks: [
        { type: 'text', value: 'Use StatelessWidget when the UI depends only on the inputs. It is simple, fast and easy to test. Pass data through the constructor.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class CourseCard extends StatelessWidget {
  final String title;
  final int lessons;

  const CourseCard({super.key, required this.title, required this.lessons});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(title),
        subtitle: Text('$lessons lessons'),
      ),
    );
  }
}` },
        { type: 'note', value: 'A stateless widget can still contain final fields and computed values. It just cannot change its own state.' },
      ],
    },
    {
      id: 'flutter-stateful',
      title: 'StatefulWidget',
      blocks: [
        { type: 'text', value: 'Use StatefulWidget when the UI changes over time. The State object holds the mutable fields and setState triggers a rebuild.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('$count'),
        ElevatedButton(
          onPressed: () => setState(() => count++),
          child: const Text('Add'),
        ),
      ],
    );
  }
}` },
        { type: 'note', value: 'Call setState only for values that affect the UI. Mutating a field without setState changes the data but not the screen.' },
      ],
    },
    {
      id: 'flutter-composition',
      title: 'Composition',
      blocks: [
        { type: 'text', value: 'Flutter prefers composition over deep inheritance. Build small widgets and combine them instead of creating a huge build method with hundreds of lines.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class CoursePage extends StatelessWidget {
  const CoursePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('SQL')),
      body: const Column(
        children: [
          CourseHeader(),
          SizedBox(height: 16),
          LessonList(),
        ],
      ),
    );
  }
}` },
        { type: 'note', value: 'If a build method is hard to read, extract a widget. A private widget class is often clearer than a helper method that returns a widget.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'widgets',
      q: 'What is a widget?',
      options: ['A database row', 'An immutable UI description', 'A native process', 'A style sheet'],
      answer: 1,
      explain: 'Widgets describe the UI; Flutter renders them.',
    },
    {
      chapterId: 'widgets',
      q: 'When use StatelessWidget?',
      options: ['When the UI depends only on inputs', 'When state changes', 'When using a database', 'Never'],
      answer: 0,
      explain: 'No mutable state means a stateless widget is enough.',
    },
    {
      chapterId: 'widgets',
      q: 'What triggers a rebuild in a StatefulWidget?',
      options: ['setState', 'print', 'A final field', 'A const widget'],
      answer: 0,
      explain: 'setState marks the widget dirty and schedules a rebuild.',
    },
    {
      chapterId: 'widgets',
      q: 'What does Flutter prefer over deep inheritance?',
      options: ['Composition', 'Global variables', 'A single giant widget', 'Multiple inheritance'],
      answer: 0,
      explain: 'Small composed widgets are easier to read and reuse.',
    },
  ],
};
