// React Native chapter: Storage.

export default {
  id: 'storage',
  title: 'Storage',
  description: 'AsyncStorage, SQLite, secure storage and offline sync',
  icon: 'storage',
  lessons: [
    {
      id: 'rn-asyncstorage',
      title: 'AsyncStorage',
      blocks: [
        { type: 'text', value: 'AsyncStorage is a simple key-value store. It is asynchronous and persistent, but it is not encrypted and not suitable for large data or queries.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('theme', 'dark');
const theme = await AsyncStorage.getItem('theme');
await AsyncStorage.removeItem('theme');` },
        { type: 'note', value: 'Store small preferences and flags. Do not store tokens, passwords or a large offline database in AsyncStorage.' },
      ],
    },
    {
      id: 'rn-sqlite',
      title: 'SQLite',
      blocks: [
        { type: 'text', value: 'SQLite gives a real relational database inside the app. Use it for structured data, queries, progress and an offline outbox.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);
const db = await SQLite.openDatabase({ name: 'app.db', location: 'default' });

await db.executeSql(
  'CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY, title TEXT)'
);

await db.executeSql('INSERT INTO courses (title) VALUES (?)', ['SQL']);
const [result] = await db.executeSql('SELECT * FROM courses');
console.log(result.rows.item(0));` },
        { type: 'note', value: 'Use placeholders for every value. Never concatenate user input into SQL.' },
      ],
    },
    {
      id: 'rn-secure-storage',
      title: 'Secure storage',
      blocks: [
        { type: 'text', value: 'Tokens belong in the Android Keystore or iOS Keychain. react-native-keychain wraps both and keeps secrets out of plain files.' },
        { type: 'code', lang: 'js', tryIt: false, value: `import * as Keychain from 'react-native-keychain';

await Keychain.setGenericPassword('user', token, {
  service: 'codenest.auth',
});

const credentials = await Keychain.getGenericPassword({ service: 'codenest.auth' });
if (credentials) {
  console.log(credentials.password);
}` },
        { type: 'note', value: 'Secure storage protects at rest. It does not protect a rooted device from a determined attacker, so keep tokens short lived.' },
      ],
    },
    {
      id: 'rn-offline-sync',
      title: 'Offline sync',
      blocks: [
        { type: 'text', value: 'Store changes locally with a synced flag or an outbox table. Push when online and make the server idempotent with unique ids.' },
        { type: 'code', lang: 'js', tryIt: false, value: `// Outbox pattern
await db.executeSql(
  'INSERT INTO outbox (payload, synced) VALUES (?, 0)',
  [JSON.stringify({ type: 'coin', amount: 10 })]
);

const [pending] = await db.executeSql('SELECT * FROM outbox WHERE synced = 0');
// Send pending rows, then mark them synced by id.` },
        { type: 'note', value: 'A retry must not double-count a coin or an order. The server needs a unique request id and a uniqueness constraint.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'storage',
      q: 'What is AsyncStorage suitable for?',
      options: ['Tokens and passwords', 'Small preferences and flags', 'Large relational data', 'Images only'],
      answer: 1,
      explain: 'It is a simple unencrypted key-value store.',
    },
    {
      chapterId: 'storage',
      q: 'Which storage supports SQL queries?',
      options: ['AsyncStorage', 'SQLite', 'Keychain', 'A text file'],
      answer: 1,
      explain: 'SQLite is a relational database inside the app.',
    },
    {
      chapterId: 'storage',
      q: 'Where should an auth token live?',
      options: ['AsyncStorage', 'A JSON file', 'Keystore / Keychain', 'A constant'],
      answer: 2,
      explain: 'Secure storage keeps tokens out of plain files.',
    },
    {
      chapterId: 'storage',
      q: 'What makes offline sync safe to retry?',
      options: ['A large timeout', 'Idempotent server writes with unique ids', 'A spinner', 'Caching images'],
      answer: 1,
      explain: 'A repeated request must not create a duplicate record.',
    },
  ],
};
