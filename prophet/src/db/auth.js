import { getDB } from './db';
import { registerUser as apiRegister, loginUser as apiLogin } from '../api/userApi';
import { apps_slug } from '../config/url';
import { getDeviceId } from './earnings';

export const registerUser = async (name, email, password, phone, gender = 'male', districtId = 0, address = '', referralCode = '') => {
  const db = await getDB();
  const [check] = await db.executeSql('SELECT id FROM users WHERE email = ?', [email]);
  if (check.rows.length > 0) return { success: false, message: 'এই ইমেইল আগেই নিবন্ধিত আছে' };

  const deviceId = await getDeviceId();
  const apiRes = await apiRegister({
    name, email, password, phone, gender,
    district_id: districtId, address,
    referral_code: referralCode,
    device_id: deviceId,
  });

  if (!apiRes.success) {
    return { success: false, message: apiRes.message || 'সার্ভারে রেজিস্ট্রেশন ব্যর্থ' };
  }

  await db.executeSql(
    'INSERT INTO users (name, email, password, phone, gender, district_id, address) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [name, email, password, phone, gender, districtId, address]
  );
  const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
  const user = res.rows.item(0);
  await saveSession(user.id);

  if (apiRes.user?.id) {
    try {
      await db.executeSql("INSERT OR REPLACE INTO settings (key, value) VALUES ('server_user_id', ?)", [String(apiRes.user.id)]);
    } catch (e) {}
  }

  if (apiRes.user?.referral_code) {
    try {
      await db.executeSql(
        "INSERT OR REPLACE INTO settings (key, value) VALUES ('referral_code', ?)",
        [apiRes.user.referral_code]
      );
    } catch (e) {}
  }

  return { success: true, user };
};

export const loginUser = async (email, password) => {
  const db = await getDB();

  const deviceId = await getDeviceId();
  const apiRes = await apiLogin(email, password, deviceId);
  if (!apiRes.success) {
    return { success: false, message: apiRes.message || 'ইমেইল বা পাসওয়ার্ড ভুল' };
  }

  const serverUser = apiRes.user;
  const token = apiRes.token;

  const [existing] = await db.executeSql('SELECT id FROM users WHERE email = ?', [email]);
  let user;
  if (existing.rows.length > 0) {
    const localId = existing.rows.item(0).id;
    await db.executeSql(
      'UPDATE users SET name = ?, phone = ?, gender = ?, address = ?, district_id = ?, server_id = ? WHERE id = ?',
      [serverUser.name, serverUser.phone || '', serverUser.gender || 'male', serverUser.address || '', serverUser.district_id || 0, serverUser.id, localId]
    );
    const [res] = await db.executeSql('SELECT * FROM users WHERE id = ?', [localId]);
    user = res.rows.item(0);
  } else {
    await db.executeSql(
      'INSERT INTO users (name, email, password, phone, gender, district_id, address, server_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [serverUser.name, email, password, serverUser.phone || '', serverUser.gender || 'male', serverUser.district_id || 0, serverUser.address || '', serverUser.id]
    );
    const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
    user = res.rows.item(0);
  }

  await saveSession(user.id);
  if (token) {
    try {
      await db.executeSql("INSERT OR REPLACE INTO settings (key, value) VALUES ('auth_token', ?)", [token]);
    } catch (e) {}
  }
  if (serverUser.id) {
    try {
      await db.executeSql("INSERT OR REPLACE INTO settings (key, value) VALUES ('server_user_id', ?)", [String(serverUser.id)]);
    } catch (e) {}
  }

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
