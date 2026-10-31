import { getDB } from './db';
import { addCoins } from './coins';
import { DAILY_BOXES, video_coin_per_box } from '../config/url';

const getLocalDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const cleanOldBoxes = async () => {
  const db = await getDB();
  const today = getLocalDate();
  await db.executeSql(`DELETE FROM ad_boxes WHERE date(created_at) < ?`, [today]);
};

export const initTodayBoxes = async () => {
  const db = await getDB();
  const today = getLocalDate();
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ?`,
    [today]
  );
  const count = res.rows.item(0).count;
  if (count === 0) {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const localNow = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const values = Array.from({ length: DAILY_BOXES }, (_, i) =>
      `(${i + 1}, 'pending', 10, '${localNow}')`
    ).join(',');
    await db.executeSql(
      `INSERT INTO ad_boxes (box_number, status, points, created_at) VALUES ${values}`
    );
  } else if (count > DAILY_BOXES) {
    await db.executeSql(
      `DELETE FROM ad_boxes WHERE date(created_at) = ? AND id NOT IN (SELECT id FROM ad_boxes WHERE date(created_at) = ? ORDER BY id ASC LIMIT ?)`,
      [today, today, DAILY_BOXES]
    );
  }
};

export const getTodayBoxes = async () => {
  const db = await getDB();
  const today = getLocalDate();
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
  const today = getLocalDate();
  await db.executeSql(
    `UPDATE ad_boxes SET status = 'claimed', claimed_at = ?, claim_date = ? WHERE id = ?`,
    [now, today, boxId]
  );
};

export const getClaimedCount = async () => {
  const db = await getDB();
  const today = getLocalDate();
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ? AND status = 'claimed'`,
    [today]
  );
  return res.rows.item(0).count || 0;
};

export const getPendingBoxesCount = async () => {
  const db = await getDB();
  const today = getLocalDate();
  const [res] = await db.executeSql(
    `SELECT COUNT(*) as count FROM ad_boxes WHERE date(created_at) = ? AND status = 'pending'`,
    [today]
  );
  return res.rows.item(0).count || 0;
};
