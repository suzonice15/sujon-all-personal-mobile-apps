import { getDB } from './db';

export const saveAppSettings = async (data) => {
  if (!data || typeof data !== 'object') return;
  const db = await getDB();
  await db.executeSql(
    "UPDATE settings SET app_settings_json = ? WHERE id = 1",
    [JSON.stringify(data)]
  );
  // console.log('App sedisttings saved:', JSON.stringify(data));
};

export const getAllAppSettings = async () => {
  const db = await getDB();
  const [res] = await db.executeSql(
    'SELECT app_settings_json FROM settings WHERE id = 1'
  );
  // console.log('Fetched app settings from DB:', res.rows.item(0)?.app_settings_json);
  const json = res.rows.item(0)?.app_settings_json || '{}';
  return JSON.parse(json);
};

export const getAppSetting = async (key, defaultValue = null) => {
  const all = await getAllAppSettings();
  return all[key] !== undefined ? all[key] : defaultValue;
};

export const getAppSettingInt = async (key, defaultValue = 0) => {
  const val = await getAppSetting(key, defaultValue);
  return parseInt(val, 10) || defaultValue;
};

export const getAppSettingFloat = async (key, defaultValue = 0) => {
  const val = await getAppSetting(key, defaultValue);
  return parseFloat(val) || defaultValue;
};
