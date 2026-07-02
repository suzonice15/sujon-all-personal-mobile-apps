import { getDB } from './db';
import { addCoins } from './coins';
import { DAILY_BOXES, video_coin_per_box } from '../config/url';

 
const cleanOldBoxes = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  await db.executeSql(`DELETE FROM ad_boxes WHERE date(created_at) < ?`, [today]);
};

export const initTodayBoxes = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ?`,
    [today]
  );
  if (res.rows.item(0).count > 0) return;
  const values = Array.from({ length: DAILY_BOXES }, (_, i) =>
    `(${i + 1}, 'pending', 10, datetime('now'))`
  ).join(',');
  await db.executeSql(
    `INSERT INTO ad_boxes (box_number, status, points, created_at) VALUES ${values}`
  );
};

export const getTodayBoxes = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT * FROM ad_boxes WHERE date(created_at) = ? ORDER BY box_number ASC`,
    [today]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const claimBox = async (boxId) => {
  await cleanOldBoxes();
  await addCoins(video_coin_per_box, 'বিজ্ঞাপন বক্স');
  const db = await getDB();
  const now = new Date().toISOString();
  const today = now.slice(0, 10);
  await db.executeSql(
    `UPDATE ad_boxes SET status = 'claimed', claimed_at = ?, claim_date = ? WHERE id = ?`,
    [now, today, boxId]
  );
};

export const getClaimedCount = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ? AND status = 'claimed'`,
    [today]
  );
  return res.rows.item(0).count || 0;
};

export const getPendingBoxesCount = async () => {
  const db = await getDB();
  const today = new Date().toISOString().slice(0, 10);
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ? AND status = 'pending'`,
    [today]
  );
  return res.rows.item(0).count || 0;
};
