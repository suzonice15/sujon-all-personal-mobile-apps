import { getDB } from './db';

export const registerUser = async (name, email, password, phone, gender = 'male', districtId = 0, address = '') => {
  const db = await getDB();
  const [check] = await db.executeSql('SELECT id FROM users WHERE email = ?', [email]);
  if (check.rows.length > 0) return { success: false, message: 'এই ইমেইল আগেই নিবন্ধিত আছে' };

  await db.executeSql(
    'INSERT INTO users (name, email, password, phone, gender, district_id, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, password, phone, gender, districtId, address]
  );
  const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
  const user = res.rows.item(0);
  await saveSession(user.id);
  return { success: true, user };
};

export const loginUser = async (email, password) => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
  if (res.rows.length === 0) return { success: false, message: 'ইমেইল বা পাসওয়ার্ড ভুল' };
  const user = res.rows.item(0);
  await saveSession(user.id);
  return { success: true, user };
};

export const getLoggedInUser = async () => {
  const db = await getDB();
  const [session] = await db.executeSql('SELECT user_id FROM auth_session WHERE id = 1');
  if (session.rows.length === 0) return null;
  const userId = session.rows.item(0).user_id;
  if (!userId) return null;
  const [res] = await db.executeSql('SELECT * FROM users WHERE id = ?', [userId]);
  if (res.rows.length === 0) return null;
  return res.rows.item(0);
};

export const updateUser = async (userId, name, newPassword, phone, address, gender, districtId = 0) => {
  const db = await getDB();
  let sql = 'UPDATE users SET name = ?, phone = ?, address = ?, gender = ?, district_id = ?';
  const params = [name, phone, address, gender, districtId];
  if (newPassword) {
    sql += ', password = ?';
    params.push(newPassword);
  }
  sql += ' WHERE id = ?';
  params.push(userId);
  await db.executeSql(sql, params);
  const [res] = await db.executeSql('SELECT * FROM users WHERE id = ?', [userId]);
  return res.rows.item(0);
};

export const logoutUser = async () => {
  const db = await getDB();
  await db.executeSql('DELETE FROM auth_session WHERE id = 1');
};

const saveSession = async (userId) => {
  const db = await getDB();
  await db.executeSql(
    'INSERT OR REPLACE INTO auth_session (id, user_id) VALUES (1, ?)',
    [userId]
  );
};
