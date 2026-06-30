import { getDB } from './db';
import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async () => {
  return await DeviceInfo.getUniqueId();
};

export const claimDailyBonus = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

  const [res] = await db.executeSql(
    `SELECT id FROM earning_history WHERE device_id = ? AND content_id = -1 AND date(earned_at) = ?`,
    [deviceId, today]
  );
  if (res.rows.length > 0) return { added: false };

  await db.executeSql(
    'INSERT INTO earning_history (device_id, content_id, content_title, points) VALUES (?, ?, ?, ?)',
    [deviceId, -1, 'দৈনিক বোনাস', 100]
  );
  return { added: true, points: 100 };
};

export const hasClaimedAdToday = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const today = new Date().toISOString().slice(0, 10);
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
    'INSERT INTO earning_history (device_id, content_id, content_title, points) VALUES (?, ?, ?, ?)',
    [deviceId, contentId, contentTitle, points]
  );
  return { added: true, points };
};

export const getEarnings = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  console.log('deviceId: ', deviceId  )
  const [res] = await db.executeSql(
    'SELECT * FROM earning_history WHERE device_id = ? ORDER BY earned_at DESC',
    [deviceId]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
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
  const today = new Date().toISOString().slice(0, 10);
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
    'SELECT * FROM earning_history WHERE device_id = ? ORDER BY earned_at DESC LIMIT ?',
    [deviceId, limit]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};
