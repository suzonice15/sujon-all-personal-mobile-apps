import { getDB } from './db';
import DeviceInfo from 'react-native-device-info';

const getLocalDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const localNow = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export const getDeviceId = async () => {
  return await DeviceInfo.getUniqueId();
};

export const claimDailyBonus = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const today = getLocalDate(); // 'YYYY-MM-DD'

  const [res] = await db.executeSql(
    `SELECT id FROM earning_history WHERE device_id = ? AND content_id = -1 AND date(earned_at) = ?`,
    [deviceId, today]
  );
  if (res.rows.length > 0) return { added: false };

  await db.executeSql(
    'INSERT INTO earning_history (device_id, content_id, content_title, points, type, earned_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, -1, 'দৈনিক বোনাস', 100, 'income', localNow()]
  );
  return { added: true, points: 100 };
};

export const hasClaimedAdToday = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const today = getLocalDate();
  const [res] = await db.executeSql(
    `SELECT id FROM earning_history WHERE device_id = ? AND content_id = 2000 AND date(earned_at) = ?`,
    [deviceId, today]
  );
  return res.rows.length > 0;
};

export const addEarning = async (contentId, contentTitle, points) => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  await db.executeSql(
    'INSERT INTO earning_history (device_id, content_id, content_title, points, type, earned_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, contentId, contentTitle, points, 'income', localNow()]
  );
  return { added: true, points };
};

export const getEarnings = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  
  const [res] = await db.executeSql(
    'SELECT * FROM earning_history WHERE device_id = ? ORDER BY id DESC',
    [deviceId]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));

  //  console.log('rows point ', rows);
  return rows.map(row => ({
    ...row,
    synced: row.synced > 0,
  }));
};

export const getTotalPoints = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const [res] = await db.executeSql(
    'SELECT SUM(points) as total FROM earning_history WHERE device_id = ?',
    [deviceId]
  );
  return res.rows.item(0).total || 0;
};

export const getTodayEarnings = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const today = getLocalDate();
  const [res] = await db.executeSql(
    `SELECT SUM(points) as total FROM earning_history WHERE device_id = ? AND date(earned_at) = ?`,
    [deviceId, today]
  );
  return res.rows.item(0).total || 0;
};

export const getStoriesReadCount = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const [res] = await db.executeSql(
    'SELECT COUNT(*) as count FROM earning_history WHERE device_id = ? AND content_id > 0 AND content_id != 2000',
    [deviceId]
  );
  return res.rows.item(0).count || 0;
};

export const getRecentEarnings = async (limit = 5) => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const [res] = await db.executeSql(
    'SELECT * FROM earning_history WHERE device_id = ? ORDER BY id DESC LIMIT ?',
    [deviceId, limit]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const withdrawPoints = async (amount, reason = 'উত্তোলন') => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  await db.executeSql(
    'INSERT INTO earning_history (device_id, content_id, content_title, points, type, earned_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, -2, reason, -Math.abs(amount), 'withdraw', localNow()]
  );
};

export const consolidatePointHistory = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const now = new Date();
  const firstOfMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  const [res] = await db.executeSql(
    `SELECT SUM(points) as total FROM earning_history WHERE device_id = ? AND (type IS NULL OR type = 'income') AND earned_at < ?`,
    [deviceId, firstOfMonth]
  );
  const total = res.rows.item(0).total || 0;
  if (total === 0) return;
  await db.executeSql(
    `DELETE FROM earning_history WHERE device_id = ? AND (type IS NULL OR type = 'income') AND earned_at < ?`,
    [deviceId, firstOfMonth]
  );
  await db.executeSql(
    'INSERT INTO earning_history (device_id, content_id, content_title, points, type, earned_at) VALUES (?, ?, ?, ?, ?, ?)',
    [deviceId, -3, 'পূর্বের জমা', total, 'summation', firstOfMonth]
  );
};
