import { api } from './client';

// App open / FCM token change: device row insert or update
export const registerDevice = (data) => {
  return api.post('/notification/device/register', data);
};

// Login: server token theke user_id ber kore device e boshay, is_logged_in = 1
export const deviceLogin = (deviceId, apiToken) => {
  return api.post('/notification/device/login', { device_id: deviceId, api_token: apiToken });
};

// Logout: is_logged_in = 0 (user_id thakbe)
export const deviceLogout = (deviceId) => {
  return api.post('/notification/device/logout', { device_id: deviceId });
};

// Settings toggle: notifications_enabled = 1 / 0
export const setDeviceNotifications = (deviceId, enabled) => {
  return api.post('/notification/device/toggle', { device_id: deviceId, enabled: enabled ? 1 : 0 });
};

export const getNotifications = (deviceId, page = 1) => {
  return api.get(`/notification/list/${deviceId}?page=${page}`);
};

export const getUnreadCount = (deviceId) => {
  return api.get(`/notification/unread-count/${deviceId}`);
};

// notificationId na dile shob gulo read hobe
export const markNotificationRead = (deviceId, notificationId = null) => {
  return api.post('/notification/read', { device_id: deviceId, notification_id: notificationId });
};
