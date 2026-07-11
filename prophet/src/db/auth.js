import { getDB } from './db';
import { registerUser as apiRegister, loginUser as apiLogin, updateProfile as apiUpdateProfile, resetPassword as apiResetPassword } from '../api/userApi';
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
    app_slug: apps_slug,
  });

  if (!apiRes.success) {
    return { success: false, message: apiRes.message || 'সার্ভারে রেজিস্ট্রেশন ব্যর্থ' };
  }

  await db.executeSql(
    'INSERT INTO users (name, email, password, phone, gender, district_id, address, device_id, referral_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, email, password, phone, gender, districtId, address, deviceId, referralCode]
  );
  const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
  const user = res.rows.item(0);
  await saveSession(user.id);

  if (apiRes.user?.id) {
    try {
      await db.executeSql("INSERT OR REPLACE INTO settings (key, value) VALUES ('server_user_id', ?)", [String(apiRes.user.id)]);
    } catch (e) {}
  }

  if (apiRes.token) {
    try {
      await db.executeSql("UPDATE settings SET auth_token = ? WHERE id = 1", [apiRes.token]);
    } catch (e) {}
  }

  let myReferralCode = '';
  if (apiRes.user?.referral_code) {
    try {
      myReferralCode = apiRes.user.referral_code;
      await db.executeSql("UPDATE settings SET referral_code = ? WHERE id = 1", [myReferralCode]);
    } catch (e) {}
  }

  return { success: true, user, referral_code: myReferralCode };
};

export const loginUser = async (email, password) => {
  const db = await getDB();

  const deviceId = await getDeviceId();
  const apiRes = await apiLogin(email, password, deviceId);

  if (apiRes.success) {
    const serverUser = apiRes.user;
    const token = apiRes.token;

    const [existing] = await db.executeSql('SELECT id FROM users WHERE email = ?', [email]);
    let user;
    if (existing.rows.length > 0) {
      const localId = existing.rows.item(0).id;
      await db.executeSql(
        'UPDATE users SET name = ?, phone = ?, gender = ?, address = ?, district_id = ?, server_id = ?, device_id = ? WHERE id = ?',
        [serverUser.name, serverUser.phone || '', serverUser.gender || 'male', serverUser.address || '', serverUser.district_id || 0, serverUser.id, deviceId, localId]
      );
      const [res] = await db.executeSql('SELECT * FROM users WHERE id = ?', [localId]);
      user = res.rows.item(0);
    } else {
      await db.executeSql(
        'INSERT INTO users (name, email, password, phone, gender, district_id, address, server_id, device_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [serverUser.name, email, password, serverUser.phone || '', serverUser.gender || 'male', serverUser.district_id || 0, serverUser.address || '', serverUser.id, deviceId]
      );
      const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
      user = res.rows.item(0);
    }

    await saveSession(user.id);
    if (token) {
      try { await db.executeSql("UPDATE settings SET auth_token = ? WHERE id = 1", [token]); } catch (e) {}
    }
    if (serverUser.id) {
      try { await db.executeSql("UPDATE settings SET server_user_id = ? WHERE id = 1", [String(serverUser.id)]); } catch (e) {}
    }

    return { success: true, user };
  }

  // API failed — local login fallback
  const [local] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
  if (local.rows.length === 0 || local.rows.item(0).password !== password) {
    return { success: false, message: 'ইমেইল বা পাসওয়ার্ড ভুল' };
  }
  const user = local.rows.item(0);
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
  const deviceId = await getDeviceId();

  try {
    await apiUpdateProfile({
      device_id: deviceId,
      slug: apps_slug,
      name, phone, gender, address,
      district_id: districtId,
      password: newPassword || undefined,
    });
  } catch (e) {}

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

export const getUserByDeviceId = async () => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const [res] = await db.executeSql('SELECT * FROM users WHERE device_id = ?', [deviceId]);
  if (res.rows.length === 0) return null;
  return res.rows.item(0);
};

export const resetPasswordAndLogin = async (email, otp, password) => {
  const db = await getDB();
  const deviceId = await getDeviceId();
  const apiRes = await apiResetPassword(email, otp, password, deviceId);

  if (!apiRes.success) {
    return { success: false, message: apiRes.message || 'পাসওয়ার্ড রিসেট ব্যর্থ হয়েছে' };
  }

  const serverUser = apiRes.user;
  const token = apiRes.token;

  const [existing] = await db.executeSql('SELECT id FROM users WHERE email = ?', [email]);
  let user;
  if (existing.rows.length > 0) {
    const localId = existing.rows.item(0).id;
    await db.executeSql(
      'UPDATE users SET name = ?, phone = ?, gender = ?, address = ?, district_id = ?, server_id = ?, device_id = ?, password = ? WHERE id = ?',
      [serverUser.name, serverUser.phone || '', serverUser.gender || 'male', serverUser.address || '', serverUser.district_id || 0, serverUser.id, deviceId, password, localId]
    );
    const [res] = await db.executeSql('SELECT * FROM users WHERE id = ?', [localId]);
    user = res.rows.item(0);
  } else {
    await db.executeSql(
      'INSERT INTO users (name, email, password, phone, gender, district_id, address, server_id, device_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [serverUser.name, email, password, serverUser.phone || '', serverUser.gender || 'male', serverUser.district_id || 0, serverUser.address || '', serverUser.id, deviceId]
    );
    const [res] = await db.executeSql('SELECT * FROM users WHERE email = ?', [email]);
    user = res.rows.item(0);
  }

  await saveSession(user.id);
  if (token) {
    try { await db.executeSql("UPDATE settings SET auth_token = ? WHERE id = 1", [token]); } catch (e) {}
  }
  if (serverUser.id) {
    try { await db.executeSql("UPDATE settings SET server_user_id = ? WHERE id = 1", [String(serverUser.id)]); } catch (e) {}
  }

  return { success: true, user };
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
