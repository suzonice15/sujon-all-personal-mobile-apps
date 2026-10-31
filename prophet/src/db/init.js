import { db } from './db';

export const initDB = () => {
  db.exec(` 
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY,
      dark_mode INTEGER DEFAULT 0
    );
  `);
};