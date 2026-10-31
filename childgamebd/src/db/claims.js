import { getDB } from './db';
import { daily_bonus_coin } from '../config/url';

const getLocalDate = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const localNow = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export const addPendingClaim = async (contentId, contentTitle, amount) => {
  const db = await getDB();
  const existing = await getPendingByContent(contentId);
  if (existing) return false;
  await db.executeSql(
    'INSERT INTO pending_claims (content_id, content_title, amount, created_at) VALUES (?, ?, ?, ?)',
    [contentId, contentTitle, amount, localNow()]
  );
  return true;
};

export const getPendingClaims = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM pending_claims ORDER BY created_at DESC'
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getPendingCount = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT COUNT(*) as count FROM pending_claims'
  );
  return res.rows.item(0).count || 0;
};

export const getPendingByContent = async (contentId) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM pending_claims WHERE content_id = ?',
    [contentId]
  );
  return res.rows.length > 0 ? res.rows.item(0) : null;
};

export const claimPending = async (id) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM pending_claims WHERE id = ?', [id]
  );
  if (res.rows.length === 0) return null;
  const claim = res.rows.item(0);
  await db.executeSql('DELETE FROM pending_claims WHERE id = ?', [id]);
  return claim;
};

export const claimAllPending = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT * FROM pending_claims');
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  if (rows.length === 0) return [];
  await db.executeSql('DELETE FROM pending_claims');
  return rows;
};

export const claimDailyCoinPending = async () => {
  const today = getLocalDate();
  const contentId = 'daily_coin_' + today;
  const existing = await getPendingByContent(contentId);
  if (existing) return { added: false };
  const db = await getDB();
  await db.executeSql(
    'INSERT INTO pending_claims (content_id, content_title, amount, created_at) VALUES (?, ?, ?, ?)',
    [contentId, 'দৈনিক কয়েন', daily_bonus_coin, localNow()]
  );
  return { added: true, amount: daily_bonus_coin };
};
