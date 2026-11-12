// Flutter chapter: Networking.

export default {
  id: 'networking',
  title: 'Networking',
  description: 'HTTP, JSON models and loading states',
  icon: 'cloud',
  lessons: [
    {
      id: 'flutter-http',
      title: 'HTTP requests',
      blocks: [
        { type: 'text', value: 'The http package sends requests. Always check the status code and parse the body defensively. Use a single API client for the app.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<Course>> fetchCourses() async {
  final response = await http.get(
    Uri.parse('https://api.example.com/courses'),
  );

  if (response.statusCode != 200) {
    throw Exception('Request failed: \${response.statusCode}');
  }

  final data = jsonDecode(response.body) as List;
  return data.map((json) => Course.fromJson(json)).toList();
}` },
        { type: 'note', value: 'Never put an API key in a Flutter app. Call your own backend, which holds the secret and can enforce permissions.' },
      ],
    },
    {
      id: 'flutter-json-model',
      title: 'JSON models',
      blocks: [
        { type: 'text', value: 'A model class turns JSON into typed Dart objects. Write fromJson and toJson, and handle missing or wrong types with defaults.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `class Course {
  final int id;
  final String title;
  final int price;

  const Course({required this.id, required this.title, required this.price});

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'] as int? ?? 0,
      title: json['title'] as String? ?? 'Untitled',
      price: json['price'] as int? ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'title': title,
    'price': price,
  };
}` },
        { type: 'note', value: 'Use `as int? ?? 0` for defensive parsing. A missing field should not crash the whole screen.' },
      ],
    },
    {
      id: 'flutter-loading-states',
      title: 'Loading, error and empty',
      blocks: [
        { type: 'text', value: 'A network screen has four states: loading, error, empty and data. Build them explicitly with FutureBuilder or a small state class.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `FutureBuilder<List<Course>>(
  future: fetchCourses(),
  builder: (context, snapshot) {
    if (snapshot.connectionState == ConnectionState.waiting) {
      return const Center(child: CircularProgressIndicator());
    }
    if (snapshot.hasError) {
      return Center(child: Text('Failed: \${snapshot.error}'));
    }
    final courses = snapshot.data ?? [];
    if (courses.isEmpty) {
      return const Center(child: Text('No courses yet'));
    }
    return CourseList(courses: courses);
  },
)` },
        { type: 'note', value: 'Do not create the Future inside build. It restarts on every rebuild. Create it once in initState or a state notifier.' },
      ],
    },
    {
      id: 'flutter-offline',
      title: 'Offline and retries',
      blocks: [
        { type: 'list', items: [
          'Cache the last successful response',
          'Show an offline banner instead of a blank screen',
          'Queue writes and sync when online',
          'Retry with backoff and a limit',
          'Use an idempotency key for writes',
          'Show a clear retry button',
        ] },
        { type: 'text', value: 'Mobile networks fail. The app should degrade to cached data and a clear message, not a permanent spinner.' },
        { type: 'note', value: 'A retry must not duplicate an order or a coin. The server needs a unique request id.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'networking',
      q: 'Which package sends HTTP requests?',
      options: ['http', 'sqflite', 'provider', 'go_router'],
      answer: 0,
      explain: 'The http package is the common choice.',
    },
    {
      chapterId: 'networking',
      q: 'What should you check before parsing?',
      options: ['The status code', 'The font', 'The theme', 'The route'],
      answer: 0,
      explain: 'A non-200 response is not success data.',
    },
    {
      chapterId: 'networking',
      q: 'Why avoid creating a Future in build?',
      options: ['It restarts on every rebuild', 'It is slower to type', 'It uses too much color', 'It breaks navigation'],
      answer: 0,
      explain: 'Create it once in initState or a notifier.',
    },
    {
      chapterId: 'networking',
      q: 'What should a failed request show?',
      options: ['A blank screen', 'A clear error and a retry option', 'A permanent spinner', 'A crash'],
      answer: 1,
      explain: 'The user needs a path forward.',
    },
  ],
};
