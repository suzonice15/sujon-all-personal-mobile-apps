import { getDB } from './db';

export const saveReferralCache = async (key, data) => {
  const db = await getDB();
  await db.executeSql(
    `INSERT OR REPLACE INTO referral_cache (key, data, updated_at) VALUES (?, ?, datetime('now', 'localtime'))`,
    [key, JSON.stringify(data)]
  );
};

export const getReferralCache = async (key) => {
  const db = await getDB();
  const [res] = await db.executeSql(`SELECT data FROM referral_cache WHERE key = ?`, [key]);
  if (res.rows.length === 0) return null;
  return JSON.parse(res.rows.item(0).data);
};

export const clearReferralCache = async () => {
  const db = await getDB();
  await db.executeSql(`DELETE FROM referral_cache`);
};

export const insertReferralCoinHistory = async (records, deviceId) => {
  if (!records || records.length === 0) return;
  const db = await getDB();
  for (const r of records) {
    await db.executeSql(
      `INSERT OR IGNORE INTO coin_history (device_id, amount, reason, type, earned_at, synced, server_id) VALUES (?, ?, ?, 'income', ?, 0, ?)`,
      [deviceId || '', r.amount, r.reason || 'রেফারেল কমিশন', r.earned_at || new Date().toISOString(), r.id || 0]
    );
  }
};

export const insertReferralCommissions = async (coinCommissions, pointCommissions, deviceId) => {
  const db = await getDB();
  if (coinCommissions && coinCommissions.length > 0) {
    for (const r of coinCommissions) {
      await db.executeSql(
        `INSERT OR IGNORE INTO coin_history (device_id, amount, reason, type, earned_at, synced, server_id) VALUES (?, ?, ?, 'commission', ?, 1, ?)`,
        [deviceId || '', r.amount, r.reason || 'রেফারেল কমিশন', r.earned_at || new Date().toISOString(), r.id || 0]
      );
    }
  }
  if (pointCommissions && pointCommissions.length > 0) {
    for (const r of pointCommissions) {
      await db.executeSql(
        `INSERT OR IGNORE INTO earning_history (device_id, points, content_title, type, earned_at, server_id, synced, content_id) VALUES (?, ?, ?, 'commission', ?, 1, ?, 0)`,
        [deviceId || '', r.points, r.content_title || 'রেফারেল কমিশন', r.earned_at || new Date().toISOString(), r.id || 0]
      );
    }
  }
};
