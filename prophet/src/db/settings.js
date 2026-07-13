import { getDB } from './db';

export const getCooldown = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT cooldown_seconds FROM settings WHERE id = 1');
  return res.rows.item(0)?.cooldown_seconds || 180;
};

export const setCooldown = async (seconds) => {
  const db = await getDB();
  await db.executeSql('UPDATE settings SET cooldown_seconds = ? WHERE id = 1', [seconds]);
};

export const setLastClaimTime = async () => {
  const db = await getDB();
  await db.executeSql('UPDATE settings SET last_claim_time = ? WHERE id = 1', [Date.now()]);
};

export const getLastClaimTime = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT last_claim_time FROM settings WHERE id = 1');
  return res.rows.item(0)?.last_claim_time || 0;
};

export const getLastSyncAt = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT last_sync_at FROM settings WHERE id = 1');
  return res.rows.item(0)?.last_sync_at || 0;
};

export const setLastSyncAt = async () => {
  const db = await getDB();
  await db.executeSql('UPDATE settings SET last_sync_at = ? WHERE id = 1', [Date.now()]);
};

export const getSyncInterval = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT sync_interval FROM settings WHERE id = 1');
  return res.rows.item(0)?.sync_interval || 60;
};

export const setSyncInterval = async (minutes) => {
  const db = await getDB();
  await db.executeSql('UPDATE settings SET sync_interval = ? WHERE id = 1', [minutes]);
};

export const getLastVisitDate = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT last_visit_date FROM settings WHERE id = 1');
  return res.rows.item(0)?.last_visit_date || '';
};

export const setLastVisitDate = async (dateStr) => {
  const db = await getDB();
  await db.executeSql('UPDATE settings SET last_visit_date = ? WHERE id = 1', [dateStr]);
};
