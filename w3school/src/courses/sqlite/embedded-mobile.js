// SQLite chapter: Embedded & Mobile.

export default {
  id: 'embedded-mobile',
  title: 'Embedded & Mobile',
  description: 'Using SQLite in apps and on-device storage',
  icon: 'phone-android',
  lessons: [
    {
      id: 'sq-mobile',
      title: 'SQLite on mobile',
      blocks: [
        { type: 'text', value: 'Android and iOS include SQLite. React Native, Flutter, Kotlin and Swift all have wrappers. It is the standard choice for local app data that must survive restarts.' },
        { type: 'list', items: [
          'Android: Room or SQLiteOpenHelper',
          'iOS: Core Data or SQLite.swift',
          'React Native: expo-sqlite or react-native-sqlite-storage',
          'Flutter: sqflite or drift',
          'Keep schema migrations under control',
        ] },
        { type: 'note', value: 'On mobile, a local database must have a migration path. Users update the app, not the database, and their data stays.' },
      ],
    },
    {
      id: 'sq-encryption',
      title: 'Security and encryption',
      blocks: [
        { type: 'text', value: 'A SQLite file is readable if copied off the device. For sensitive data, use an encrypted variant such as SQLCipher or the platform keychain for keys. Never store tokens in plain text.' },
        { type: 'code', lang: 'text', tryIt: false, value: `db file -> app private storage
sensitive columns -> encrypted or in secure storage
keys -> platform keystore, not the database` },
        { type: 'note', value: 'Do not put passwords or API secrets in SQLite. Use the platform secure storage.' },
      ],
    },
    {
      id: 'sq-migrations',
      title: 'Migrations and sync',
      blocks: [
        { type: 'text', value: 'Version the schema with user_version or a migrations table. Apply migrations in order on open. If data syncs to a server, store a server id and an updated timestamp.' },
        { type: 'code', lang: 'sql', tryIt: false, value: `PRAGMA user_version;   -- read
PRAGMA user_version = 3;   -- set after migrating

CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY,
  server_id TEXT UNIQUE,
  title TEXT NOT NULL,
  updated_at TEXT NOT NULL
);` },
        { type: 'note', value: 'A sync conflict needs a rule: latest wins, server wins or a manual merge. Choose it before you ship.' },
      ],
    },
  ],
  quiz: [
    {
      chapterId: 'embedded-mobile',
      q: 'What is SQLite used for on mobile?',
      options: ['Network calls', 'Local persistent data', 'UI layout', 'Push notifications'],
      answer: 1,
      explain: 'It stores local data on the device.',
    },
    {
      chapterId: 'embedded-mobile',
      q: 'Is a SQLite file encrypted by default?',
      options: ['Yes', 'No, use SQLCipher or a secure key', 'Only on iOS', 'Only in WAL mode'],
      answer: 1,
      explain: 'Encryption is an explicit choice.',
    },
    {
      chapterId: 'embedded-mobile',
      q: 'Where should secrets be stored?',
      options: ['In SQLite', 'In the platform secure storage', 'In a text file', 'In the app bundle'],
      answer: 1,
      explain: 'Use the keystore or keychain.',
    },
    {
      chapterId: 'embedded-mobile',
      q: 'Why version the schema?',
      options: ['For speed', 'To migrate existing users safely', 'To encrypt', 'To sync'],
      answer: 1,
      explain: 'Migrations update existing installs.',
    },
  ],
};
