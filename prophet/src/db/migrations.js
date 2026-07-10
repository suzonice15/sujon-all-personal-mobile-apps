import { getDB } from './db';

const addColumnIfMissing = async (db, table, column, def) => {
  const [info] = await db.executeSql(`PRAGMA table_info(${table})`);
  const cols = [];
  for (let i = 0; i < info.rows.length; i++) cols.push(info.rows.item(i).name);
  if (!cols.includes(column)) {
    await db.executeSql(`ALTER TABLE ${table} ADD COLUMN ${column} ${def}`);
  }
};

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
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'phone', "TEXT DEFAULT ''");
    },
  },
  {
    name: 'add_address_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'address', "TEXT DEFAULT ''");
    },
  },
  {
    name: 'add_gender_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'gender', "TEXT DEFAULT 'male'");
    },
  },
  {
    name: 'add_district_id_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'district_id', 'INTEGER DEFAULT 0');
    },
  },
  {
    name: 'add_server_id_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'server_id', 'INTEGER DEFAULT 0');
    },
  },
  {
    name: 'add_device_id_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'device_id', "TEXT DEFAULT ''");
    },
  },
  {
    name: 'add_referral_code_to_users',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'users', 'referral_code', "TEXT DEFAULT ''");
    },
  },
  {
    name: 'add_auth_token_to_settings',
    migrate: async (db) => {
      await addColumnIfMissing(db, 'settings', 'auth_token', "TEXT DEFAULT ''");
    },
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

      if (migration.migrate) {
        await migration.migrate(db);
      } else {
        const statements = migration.sql.split(';').map(s => s.trim()).filter(Boolean);
        for (const stmt of statements) {
          await db.executeSql(stmt);
        }
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
