import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbPromise = SQLite.openDatabase({ name: 'app.db', location: 'default' });

export const getDB = () => dbPromise;

export const initDB = async () => {
  const db = await dbPromise;
 

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dark_mode INTEGER DEFAULT 0
    );
  `);
// mobile_contents  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS mobile_contents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      data_id INTEGER,
      sub_title TEXT,
      serial INTEGER DEFAULT 999,
      audio TEXT,
      image TEXT,
      audio_title TEXT,
      slug TEXT UNIQUE,
      content TEXT,
      parent_id INTEGER
    );
  `);

  // mobile_contents  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS mobile_quizzes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT,
      data_id TEXT UNIQUE,
      sub_category TEXT,
      name TEXT,
      option_a TEXT,
      option_b TEXT,
      option_c TEXT,
      option_d TEXT,
      answer TEXT
    );
  `);
 

   await db.executeSql(`
    CREATE INDEX IF NOT EXISTS idx_mobile_contents_parent_id
    ON mobile_contents (parent_id);
  `);
 
// bookmark_folders  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS bookmark_folders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
// bookmark_items  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS bookmark_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      folder_id INTEGER,
      content_id INTEGER,
      title TEXT,
      FOREIGN KEY (folder_id) REFERENCES bookmark_folders(id) ON DELETE CASCADE,
      UNIQUE(folder_id, content_id)
    );
  `);
// bookmarks  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER UNIQUE,
      title TEXT
    );
  `);
// earning_history  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS earning_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT NOT NULL,
      content_id INTEGER NOT NULL,
      content_title TEXT,
      points INTEGER DEFAULT 0,
      earned_at TEXT DEFAULT (datetime('now'))
    );
  `);
// users  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);
// auth_session  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS auth_session (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      user_id INTEGER
    );
  `);


  console.log('DB initialized');
};
