import { getDB } from './db';

const migrations = [
  {
    name: 'recreate_earning_history_no_unique',
    sql: `
      CREATE TABLE IF NOT EXISTS earning_history_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_id TEXT NOT NULL,
        content_id INTEGER NOT NULL,
        content_title TEXT,
        points INTEGER DEFAULT 0,
        type TEXT DEFAULT 'income',
        earned_at TEXT DEFAULT (datetime('now', 'localtime'))
      );
      INSERT OR IGNORE INTO earning_history_new SELECT id, device_id, content_id, content_title, points, 'income', earned_at FROM earning_history;
      DROP TABLE earning_history;
      ALTER TABLE earning_history_new RENAME TO earning_history;
    `,
  },
  {
    name: 'add_phone_address_to_users',
    sql: `
      ALTER TABLE users ADD COLUMN phone TEXT DEFAULT '';
    `,
  },
  {
    name: 'add_address_to_users',
    sql: `
      ALTER TABLE users ADD COLUMN address TEXT DEFAULT '';
    `,
  },
  {
    name: 'add_gender_to_users',
    sql: `
      ALTER TABLE users ADD COLUMN gender TEXT DEFAULT 'male';
    `,
  },
  {
    name: 'add_district_id_to_users',
    sql: `
      ALTER TABLE users ADD COLUMN district_id INTEGER DEFAULT 0;
    `,
  },
  {
    name: 'add_server_id_to_users',
    sql: `
      ALTER TABLE users ADD COLUMN server_id INTEGER DEFAULT 0;
    `,
  },
];

export const runMigrations = async () => {
  const db = await getDB();

  await db.executeSql(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      applied_at TEXT
    );
  `);

  for (const migration of migrations) {
    try {
      const [result] = await db.executeSql(
        'SELECT id FROM migrations WHERE name = ?',
        [migration.name]
      );
      if (result.rows.length > 0) continue;

      // multi-statement হলে আলাদা আলাদা execute করতে হবে
      const statements = migration.sql.split(';').map(s => s.trim()).filter(Boolean);
      for (const stmt of statements) {
        await db.executeSql(stmt);
      }

      await db.executeSql(
        'INSERT INTO migrations (name, applied_at) VALUES (?, ?)',
        [migration.name, new Date().toISOString()]
      );
      console.log('Migration applied:', migration.name);
    } catch (e) {
      console.log('Migration failed:', migration.name, e.message);
    }
  }
};
