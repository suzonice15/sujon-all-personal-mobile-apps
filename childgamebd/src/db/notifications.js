import { getDB } from './db';
import { api_url, apps_slug } from '../config/url';

export const fetchNotifications = async () => {
  try {
    const res = await fetch(`${api_url}/notifications?slug=${apps_slug}`);
    const json = await res.json();
    if (!json.notifications || !Array.isArray(json.notifications)) return;

    const db = await getDB();
    for (const n of json.notifications) {
      await db.executeSql(
        'INSERT OR IGNORE INTO notifications (id, title, body, type, created_at) VALUES (?, ?, ?, ?, ?)',
        [n.id, n.title, n.body || '', n.type || 'general', n.created_at || new Date().toISOString()]
      );
    }
  } catch (e) {
    console.log('fetchNotifications error:', e.message);
  }
};

export const getUnreadCount = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT COUNT(*) as count FROM notifications WHERE is_read = 0'
  );
  return res.rows.item(0).count || 0;
};

export const markAsRead = async (id) => {
  const db = await getDB();
  await db.executeSql('UPDATE notifications SET is_read = 1 WHERE id = ?', [id]);
};

export const markAllRead = async () => {
  const db = await getDB();
  await db.executeSql('UPDATE notifications SET is_read = 1 WHERE is_read = 0');
};

export const addLocalNotification = async (title, body, type = 'general', referenceId = 0) => {
  const db = await getDB();
  await db.executeSql(
    'INSERT INTO notifications (title, body, type, reference_id) VALUES (?, ?, ?, ?)',
    [title, body, type, referenceId]
  );
};

export const deleteNotificationByReference = async (referenceId) => {
  const db = await getDB();
  await db.executeSql('DELETE FROM notifications WHERE reference_id = ?', [referenceId]);
};

export const deleteAllNotifications = async () => {
  const db = await getDB();
  await db.executeSql('DELETE FROM notifications');
};
