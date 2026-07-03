import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const dbPromise = SQLite.openDatabase({ name: 'app.db', location: 'default' });
let initPromise = null;

export const getDB = async () => {
  if (!initPromise) initPromise = initDB();
  await initPromise;
  return dbPromise;
};

let _initialized = false;
export const initDB = async () => {
  if (_initialized) return;
  _initialized = true;
  const db = await dbPromise;
 

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dark_mode INTEGER DEFAULT 0
    );
  `);

  try { await db.executeSql('ALTER TABLE settings ADD COLUMN cooldown_seconds INTEGER DEFAULT 180'); } catch (e) {}
  try { await db.executeSql('ALTER TABLE settings ADD COLUMN last_claim_time INTEGER DEFAULT 0'); } catch (e) {}
  try { await db.executeSql('ALTER TABLE settings ADD COLUMN referral_code TEXT DEFAULT \'\''); } catch (e) {}
  try { await db.executeSql('ALTER TABLE settings ADD COLUMN referred_by TEXT DEFAULT \'\''); } catch (e) {}
  try { await db.executeSql('ALTER TABLE settings ADD COLUMN sync_interval INTEGER DEFAULT 60'); } catch (e) {}
  try { await db.executeSql('ALTER TABLE settings ADD COLUMN last_sync_at INTEGER DEFAULT 0'); } catch (e) {}
  try { await db.executeSql("ALTER TABLE settings ADD COLUMN app_settings_json TEXT DEFAULT '{}'"); } catch (e) {}
  await db.executeSql('INSERT OR IGNORE INTO settings (id, dark_mode, cooldown_seconds) VALUES (1, 0, 180)');
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
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
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
      type TEXT DEFAULT 'income',
      earned_at TEXT DEFAULT (datetime('now', 'localtime')),
      synced INTEGER DEFAULT 0
    );
  `);
// users  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);
// auth_session  table 
  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS auth_session (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      user_id INTEGER
    );
  `);


  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      body TEXT,
      type TEXT DEFAULT 'general',
      is_read INTEGER DEFAULT 0,
      reference_id INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);

  try { await db.executeSql('ALTER TABLE notifications ADD COLUMN reference_id INTEGER DEFAULT 0'); } catch (e) { console.log('reference_id col exists'); }

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS coin_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      device_id TEXT DEFAULT '',
      name TEXT DEFAULT '',
      email TEXT DEFAULT '',
      amount INTEGER NOT NULL,
      reason TEXT,
      type TEXT DEFAULT 'income',
      earned_at TEXT DEFAULT (datetime('now', 'localtime')),
      synced INTEGER DEFAULT 0
    );
  `);
  try { await db.executeSql('ALTER TABLE coin_history ADD COLUMN name TEXT DEFAULT ""'); } catch (e) {}
  try { await db.executeSql('ALTER TABLE coin_history ADD COLUMN email TEXT DEFAULT ""'); } catch (e) {}

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS ad_boxes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      box_number INTEGER NOT NULL,
      status TEXT DEFAULT 'pending',
      points INTEGER DEFAULT 10,
      claimed_at TEXT,
      claim_date TEXT,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS pending_claims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_id INTEGER NOT NULL,
      content_title TEXT,
      amount INTEGER NOT NULL DEFAULT 10,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS withdraw_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      method TEXT,
      account TEXT,
      status TEXT DEFAULT 'pending',
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);

  console.log('DB initialized');
};
