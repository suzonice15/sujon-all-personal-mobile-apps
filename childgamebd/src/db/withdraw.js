import { getDB } from './db';
import { addCoins } from './coins';

export const getTotalWithdraw = async () => {
  const db = await getDB();
  const [res] = await db.executeSql("SELECT SUM(amount) as total FROM withdraw_history WHERE status = 'approved'");
  return res.rows.item(0).total || 0;
};

export const addWithdrawRecord = async ({
  type = 'withdraw',
  method,
  account,
  connection_type,
  amount,
  coins_used,
  coin_rate = 100,
  fee_coins = 0,
  status = 'pending',
  synced = 0,
  server_id = null,
}) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    `INSERT INTO withdraw_history (type, method, account, connection_type, amount, coins_used, coin_rate, fee_coins, status, synced, server_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [type, method, account, connection_type || null, amount, coins_used, coin_rate, fee_coins, status, synced, server_id]
  );
  return res.insertId;
};

export const getAllWithdrawRecords = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT * FROM withdraw_history ORDER BY id DESC');
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getWithdrawRecordsByType = async (type) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM withdraw_history WHERE type = ? ORDER BY id DESC',
    [type]
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const getUnsyncedWithdraws = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    "SELECT * FROM withdraw_history WHERE synced = 0 ORDER BY id ASC"
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const markWithdrawsSynced = async (ids) => {
  if (ids.length === 0) return;
  const db = await getDB();
  const placeholders = ids.map(() => '?').join(',');
  await db.executeSql(
    `UPDATE withdraw_history SET synced = 1 WHERE id IN (${placeholders})`,
    ids
  );
};

export const updateWithdrawStatusByServerId = async (serverId, status, transactionId, adminNote) => {
  const db = await getDB();
  await db.executeSql(
    'UPDATE withdraw_history SET status = ?, transaction_id = ?, admin_note = ? WHERE server_id = ?',
    [status, transactionId || null, adminNote || null, serverId]
  );
};

export const updateWithdrawStatusByMatch = async (type, method, account, amount, status, transactionId, adminNote) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT id FROM withdraw_history WHERE type = ? AND method = ? AND account = ? AND amount = ? AND status = \'pending\' ORDER BY id DESC LIMIT 1',
    [type, method, account, amount]
  );
  if (res.rows.length > 0) {
    await db.executeSql(
      'UPDATE withdraw_history SET status = ?, transaction_id = ?, admin_note = ? WHERE id = ?',
      [status, transactionId || null, adminNote || null, res.rows.item(0).id]
    );
  }
};

export const getWithdrawByServerIds = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT id, server_id FROM withdraw_history WHERE server_id IS NOT NULL'
  );
  const rows = [];
  for (let i = 0; i < res.rows.length; i++) rows.push(res.rows.item(i));
  return rows;
};

export const refundCoinsForRejected = async (matchType, method, account, amount, coinsUsed, coinRate) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    `SELECT id, refunded FROM withdraw_history 
     WHERE type = ? AND method = ? AND account = ? AND amount = ? AND status = 'rejected' AND refunded = 0 
     ORDER BY id DESC LIMIT 1`,
    [matchType, method, account, amount]
  );
  if (res.rows.length === 0) return false;
  const row = res.rows.item(0);
  const reason = matchType === 'recharge' ? 'রিচার্জ বাতিল (কয়েন ফেরত)' : 'উইথড্র বাতিল (কয়েন ফেরত)';
  await addCoins(coinsUsed, reason, 'rejected');
  await db.executeSql('UPDATE withdraw_history SET refunded = 1 WHERE id = ?', [row.id]);
  return true;
};
