// Flutter chapter: Storage.

export default {
  id: 'storage',
  title: 'Storage',
  description: 'Preferences, SQLite and secure storage',
  icon: 'storage',
  lessons: [
    {
      id: 'flutter-preferences',
      title: 'Shared preferences',
      blocks: [
        { type: 'text', value: 'shared_preferences stores small key-value data such as theme choice and onboarding flags. It is not encrypted and not a database.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `import 'package:shared_preferences/shared_preferences.dart';

Future<void> saveTheme(bool dark) async {
  final prefs = await SharedPreferences.getInstance();
  await prefs.setBool('darkMode', dark);
}

Future<bool> loadTheme() async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.getBool('darkMode') ?? false;
}` },
        { type: 'note', value: 'Do not store tokens, passwords or large lists in preferences. Use secure storage for secrets and SQLite for structured data.' },
      ],
    },
    {
      id: 'flutter-sqflite',
      title: 'SQLite with sqflite',
      blocks: [
        { type: 'text', value: 'sqflite is a real SQL database on the device. Use it for structured data, offline lists and an outbox for sync.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `final db = await openDatabase(
  'app.db',
  version: 1,
  onCreate: (db, version) async {
    await db.execute(
      'CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT)',
    );
  },
);

await db.insert('courses', {'id': 1, 'title': 'SQL'});
final rows = await db.query('courses');` },
        { type: 'note', value: 'Use placeholders in whereArgs for values. Never build SQL by joining user input into a string.' },
      ],
    },
    {
      id: 'flutter-secure-storage',
      title: 'Secure storage',
      blocks: [
        { type: 'text', value: 'flutter_secure_storage uses the Android Keystore and iOS Keychain. Store tokens and secrets there, never in preferences or a plain file.' },
        { type: 'code', lang: 'dart', tryIt: false, value: `import 'package:flutter_secure_storage/flutter_secure_storage.dart';

const storage = FlutterSecureStorage();

await storage.write(key: 'token', value: token);
final token = await storage.read(key: 'token');
await storage.delete(key: 'token');` },
        { type: 'note', value: 'Secure storage protects data at rest. It does not stop a rooted device, so keep tokens short lived and revocable.' },
      ],
    },
    {
      id: 'flutter-storage-choice',
      title: 'Choosing storage',
      blocks: [
        { type: 'list', items: [
          'shared_preferences - flags and small settings',
          'sqflite / drift - structured local data and queries',
          'flutter_secure_storage - tokens and secrets',
          'A file - downloaded documents and media',
          'A remote database - data that must sync across devices',
        ] },
        { type: 'text', value: 'Local storage is a cache and an outbox, not the source of truth for multi-device data. Decide what the server owns.' },
        { type: 'note', value: 'If a user can lose their data by reinstalling, the data belongs on the server or in an export feature.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'storage',
      q: 'What is shared_preferences for?',
      options: ['Large databases', 'Small key-value settings', 'Tokens', 'Images'],
      answer: 1,
      explain: 'It stores simple flags and choices.',
    },
    {
      chapterId: 'storage',
      q: 'Which storage supports SQL queries?',
      options: ['shared_preferences', 'sqflite', 'secure storage', 'A text file'],
      answer: 1,
      explain: 'sqflite is a SQLite database.',
    },
    {
      chapterId: 'storage',
      q: 'Where should a token live?',
      options: ['shared_preferences', 'A plain file', 'flutter_secure_storage', 'A constant'],
      answer: 2,
      explain: 'It uses the platform keystore/keychain.',
    },
    {
      chapterId: 'storage',
      q: 'What should sync across devices?',
      options: ['Everything local', 'Only settings', 'Data the server owns', 'Nothing'],
      answer: 2,
      explain: 'The server is the source of truth for shared data.',
    },
  ],
};
