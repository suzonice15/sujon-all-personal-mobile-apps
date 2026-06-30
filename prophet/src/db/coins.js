import { getDB } from './db';

export const addCoins = async (amount, reason) => {
  const db = await getDB();
  await db.executeSql(
    'INSERT INTO coin_history (amount, reason) VALUES (?, ?)',
    [amount, reason]
  );
};

export const getTotalCoins = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT SUM(amount) as total FROM coin_history');
  return res.rows.item(0).total || 0;
};

export const getRecentCoins = async (limit = 10) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM coin_history ORDER BY earned_at DESC LIMIT ?',
    [limit]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getTodayCoins = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT SUM(amount) as total FROM coin_history WHERE date(earned_at) = ?`,
    [today]
  );
  return res.rows.item(0).total || 0;
};
