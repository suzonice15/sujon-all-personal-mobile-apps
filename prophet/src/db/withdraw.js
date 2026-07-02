import { getDB } from './db';

export const getTotalWithdraw = async () => {
  const db = await getDB();
  const [res] = await db.executeSql('SELECT SUM(amount) as total FROM withdraw_history WHERE status = ?', ['approved']);
  return res.rows.item(0).total || 0;
};
