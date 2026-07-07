import { getDB } from './db';
import { getDeviceId } from './earnings';

const localNow = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export const addCoins = async (amount, reason, type = 'income') => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  await db.executeSql(
    'INSERT INTO coin_history (device_id, name, email, amount, reason, type, earned_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [deviceId, '', '', amount, reason, type, localNow()]
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
    'SELECT * FROM coin_history ORDER BY id DESC LIMIT ?',
    [limit]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getTodayClaimCount = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM coin_history WHERE date(earned_at) = ? AND reason != 'বিজ্ঞাপন বক্স' AND reason != 'দৈনিক কয়েন সংগ্রহ'`,
    [today]
  );
  return res.rows.item(0).count || 0;
};

export const getDailyCoinStats = async () => {
  const db = await getDB();
  const [res] = await db.executeSql("SELECT COUNT(*) as count, SUM(amount) as total FROM coin_history WHERE reason = 'দৈনিক কয়েন সংগ্রহ'");
  return { total: res.rows.item(0).total || 0, count: res.rows.item(0).count || 0 };
};

export const getTodayClaimCoins = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT SUM(amount) as total FROM coin_history WHERE date(earned_at) = ? AND reason != 'বিজ্ঞাপন বক্স' AND reason != 'দৈনিক কয়েন সংগ্রহ'`,
    [today]
  );
  return res.rows.item(0).total || 0;
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

export const withdrawCoins = async (amount, reason = 'উত্তোলন') => {
  await addCoins(-Math.abs(amount), reason, 'withdraw');
};

export const consolidateCoinHistory = async () => {
  const db = await getDB();
  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const [res] = await db.executeSql(
    `SELECT SUM(amount) as total FROM coin_history WHERE (type IS NULL OR type = 'income') AND earned_at < ?`,
    [firstOfMonth]
  );
  const total = res.rows.item(0).total || 0;
  if (total === 0) return;
  await db.executeSql(
    `DELETE FROM coin_history WHERE (type IS NULL OR type = 'income') AND earned_at < ?`,
    [firstOfMonth]
  );
  await db.executeSql(
    'INSERT INTO coin_history (device_id, name, email, amount, reason, type, earned_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    ['', '', '', total, 'পূর্বের জমা', 'summation', firstOfMonth]
  );
};
