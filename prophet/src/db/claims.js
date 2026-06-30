import { getDB } from './db';

export const addPendingClaim = async (contentId, contentTitle, amount) => {
  const db = await getDB();
  const existing = await getPendingByContent(contentId);
  if (existing) return false;
  await db.executeSql(
    'INSERT INTO pending_claims (content_id, content_title, amount) VALUES (?, ?, ?)',
    [contentId, contentTitle, amount]
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
