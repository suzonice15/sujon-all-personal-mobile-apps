// Flutter chapter: Dart Basics.

export default {
  id: 'dart-basics',
  title: 'Dart Basics',
  description: 'Types, null safety, functions and collections',
  icon: 'code',
  lessons: [
    {
      id: 'flutter-dart-types',
      title: 'Variables and types',
      blocks: [
        { type: 'text', value: 'Dart is statically typed. var lets the compiler infer a type; final means assigned once; const means a compile-time constant. Null safety forces you to handle missing values.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `void main() {
  var name = 'Ayesha';        // String
  final price = 5000;         // final int
  const maxLessons = 12;      // compile-time constant

  String? nickname;           // may be null
  print(nickname?.length ?? 0);

  print('$name pays $price for $maxLessons lessons');
}` },
        { type: 'note', value: 'A non-nullable String must always have a value. That eliminates a huge class of crashes at compile time.' },
      ],
    },
    {
      id: 'flutter-dart-functions',
      title: 'Functions',
      blocks: [
        { type: 'text', value: 'A function has a return type, a name and parameters. Named parameters use braces and make call sites readable. Optional parameters need a default or a nullable type.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `String greet(String name, {String title = 'Student'}) {
  return '$title $name';
}

int add(int a, int b) => a + b;

void main() {
  print(greet('Ayesha'));
  print(greet('Rahim', title: 'Mr.'));
  print(add(2, 3));
}` },
        { type: 'note', value: 'Use named parameters for anything with more than two arguments. It prevents the classic bug of swapping two same-typed values.' },
      ],
    },
    {
      id: 'flutter-dart-collections',
      title: 'Collections',
      blocks: [
        { type: 'text', value: 'Dart has List (ordered), Map (key-value) and Set (unique). Collection literals are concise, and methods such as map, where and reduce work like LINQ.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `void main() {
  final names = <String>['Ayesha', 'Rahim'];
  final scores = <String, int>{'Ayesha': 92, 'Rahim': 78};
  final unique = <int>{1, 2, 2, 3};

  names.add('Nusrat');
  scores['Nusrat'] = 88;

  final passed = scores.entries.where((e) => e.value >= 80).toList();

  print(names.length);
  print(unique.length);
  print(passed.map((e) => e.key).join(', '));
}` },
        { type: 'note', value: 'Use a Set when duplicates are meaningless, a List when order matters, and a Map when you look up by key.' },
      ],
    },
    {
      id: 'flutter-dart-async',
      title: 'Async and await',
      blocks: [
        { type: 'text', value: 'Network and file work returns a Future. await waits for it without blocking the UI. Mark the function async. Errors are handled with try/catch.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `Future<String> fetchTitle() async {
  await Future.delayed(const Duration(seconds: 1));
  return 'SQL';
}

Future<void> main() async {
  try {
    final title = await fetchTitle();
    print(title);
  } catch (error) {
    print('Failed: $error');
  }
}` },
        { type: 'note', value: 'Never use a busy loop or a blocking sleep in the UI isolate. Use await so the frame can render.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'dart-basics',
      q: 'What does final mean?',
      options: ['The value can change', 'The variable is assigned once', 'It is a constant at compile time', 'It is nullable'],
      answer: 1,
      explain: 'final is set once at runtime; const is compile-time.',
    },
    {
      chapterId: 'dart-basics',
      q: 'What does String? mean?',
      options: ['A required string', 'A string that may be null', 'A list of strings', 'A constant'],
      answer: 1,
      explain: 'The question mark marks a nullable type.',
    },
    {
      chapterId: 'dart-basics',
      q: 'Which collection stores key-value pairs?',
      options: ['List', 'Set', 'Map', 'Queue'],
      answer: 2,
      explain: 'A Map maps keys to values.',
    },
    {
      chapterId: 'dart-basics',
      q: 'What does await do?',
      options: ['Blocks the UI', 'Waits for a Future without blocking the UI', 'Starts a new isolate', 'Deletes the Future'],
      answer: 1,
      explain: 'It suspends the function, not the whole app.',
    },
  ],
};
