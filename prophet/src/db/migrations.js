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
        earned_at TEXT DEFAULT (datetime('now'))
      );
      INSERT OR IGNORE INTO earning_history_new SELECT id, device_id, content_id, content_title, points, earned_at FROM earning_history;
      DROP TABLE earning_history;
      ALTER TABLE earning_history_new RENAME TO earning_history;
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
