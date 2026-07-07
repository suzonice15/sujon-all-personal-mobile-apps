import { getDB } from './db';
import { getDeviceId } from './earnings';
import { getUnsyncedWithdraws, markWithdrawsSynced } from './withdraw';
import { api_url, apps_slug } from '../config/url';

export const getUnsyncedCoins = async () => {
  try {
    const db = await getDB();
    const [res] = await db.executeSql(
      "SELECT * FROM coin_history WHERE synced = 0 AND type = 'income' ORDER BY id ASC"
    );
    const rows = [];
    for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
    return rows;
  } catch (e) {
    console.log('getUnsyncedCoins error:', e.message);
    return [];
  }
};

export const getUnsyncedPoints = async () => {
  try {
    const db = await getDB();
    const deviceId = await getDeviceId();
    const [res] = await db.executeSql(
      "SELECT * FROM earning_history WHERE device_id = ? AND synced = 0 AND type = 'income' ORDER BY id ASC",
      [deviceId]
    );
    const rows = [];
    for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
    return rows;
  } catch (e) {
    console.log('getUnsyncedPoints error:', e.message);
    return [];
  }
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
   
    await db.executeSql(`UPDATE earning_history SET synced = 1 WHERE id IN (${placeholders})`, ids);

};

const apiV1 = `${api_url}/v1`;

export const syncCoinsToServer = async () => {
  try {
    const deviceId = await getDeviceId();
    const records = await getUnsyncedCoins();
    if (!records || records.length === 0) return { synced: 0 };
    const localIds = records.map(r => r.id);
    const body = { device_id: deviceId,slug: apps_slug, records: records };
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
    if (!records || records.length === 0) return { synced: 0 };
    const localIds = records.map(r => r.id);
    const body = { device_id: deviceId, slug:apps_slug, records: records };
    const res = await fetch(`${apiV1}/sync/points`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.synced_ids) await markPointsSynced(data.synced_ids);
    return { synced: data.synced_ids?.length || 0 };
  } catch (e) {
    console.log('Sync points failed:', e.message);
    return { synced: 0, error: e.message };
  }
};

export const syncWithdrawToServer = async () => {
  try {
    const deviceId = await getDeviceId();
    const records = await getUnsyncedWithdraws();
    if (!records || records.length === 0) return { synced: 0 };
    const localIds = records.map(r => r.id);
    const body = { device_id: deviceId, slug: apps_slug, records: records };
    const res = await fetch(`${api_url}/v1/sync/withdraw`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    if (data.synced_ids) await markWithdrawsSynced(data.synced_ids);
    if (data.server_id_map) {
      const db = await getDB();
      for (const m of data.server_id_map) {
        await db.executeSql('UPDATE withdraw_history SET server_id = ? WHERE id = ?', [m.server_id, m.local_id]);
      }
    }
    return { synced: data.synced_ids?.length || 0 };
  } catch (e) {
    console.log('Sync withdraw failed:', e.message);
    return { synced: 0, error: e.message };
  }
};