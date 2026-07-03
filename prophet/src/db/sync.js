import { getDB } from './db';
import { getDeviceId } from './earnings';
import { api_url, apps_slug } from '../config/url';

export const getUnsyncedCoins = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    "SELECT * FROM coin_history WHERE synced = 0 AND type = 'income' ORDER BY id ASC"
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getUnsyncedPoints = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const [res] = await db.executeSql(
    "SELECT * FROM earning_history WHERE device_id = ? AND synced = 0 AND type = 'income' ORDER BY id ASC",
    [deviceId]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const markCoinsSynced = async (ids) => {
  if (ids.length === 0) return;
  const db = await getDB();
  const placeholders = ids.map(() => '?').join(',');
  await db.executeSql(`UPDATE coin_history SET synced = 1 WHERE id IN (${placeholders})`, ids);
};

export const markPointsSynced = async (ids) => {
  if (ids.length === 0) return;
  const db = await getDB();
  const deviceId = await getDeviceId();
  const placeholders = ids.map(() => '?').join(',');
  await db.executeSql(
    `UPDATE earning_history SET synced = 1 WHERE device_id = ? AND id IN (${placeholders})`,
    [deviceId, ...ids]
  );
};

const apiV1 = `${api_url}/v1`;

export const syncCoinsToServer = async () => {
  try {
    const deviceId = await getDeviceId();
    const records = await getUnsyncedCoins();
    if (records.length === 0) return { synced: 0 };
    const body = { device_id: deviceId,slug: apps_slug, records: records.map(r => ({ amount: r.amount, reason: r.reason, type: r.type, name: r.name || '', email: r.email || '', earned_at: r.earned_at })) };
    const res = await fetch(`${apiV1}/sync/coins`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.synced_ids) await markCoinsSynced(data.synced_ids);
    return { synced: data.synced_ids?.length || 0 };
  } catch (e) {
    console.log('Sync coins failed:', e.message);
    return { synced: 0, error: e.message };
  }
};


export const syncPointsToServer = async () => {
  try {
    const deviceId = await getDeviceId();
    const records = await getUnsyncedPoints();
    if (records.length === 0) return { synced: 0 };
    const body = { device_id: deviceId, slug:apps_slug, records: records.map(r => ({ content_id: r.content_id, content_title: r.content_title, points: r.points, type: r.type, earned_at: r.earned_at })) };
    const res = await fetch(`${apiV1}/sync/points`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.synced_ids) await markPointsSynced(data.synced_ids);
    return { synced: data.synced_ids?.length || 0 };
  } catch (e) {
    console.log('Sync points failed:', e.message);
    return { synced: 0, error: e.message };
  }
};