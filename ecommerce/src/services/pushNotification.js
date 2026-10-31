import { AppState, PermissionsAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {
  getMessaging,
  getToken,
  onMessage,
  onTokenRefresh,
  requestPermission,
  setBackgroundMessageHandler,
  getInitialNotification,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle, EventType } from '@notifee/react-native';
import { registerDevice } from '../api/notificationApi';
import { getDeviceId } from '../utils/device';

const ENABLED_KEY = 'notifications_enabled';
// AndroidManifest e default_notification_channel_id o eta, tai app bondho thakleo same channel
const CHANNEL_ID = 'default';

// google-services.json na thakle Firebase init hoy na; tokhon null return kore, app crash kore na
const messaging = () => {
  try {
    return getMessaging();
  } catch (e) {
    console.log('Push: Firebase not configured', e?.message);
    return null;
  }
};

export const askPermission = async () => {
  if (Platform.OS === 'android') {
    if (Platform.Version < 33) return true;
    const res = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    return res === PermissionsAndroid.RESULTS.GRANTED;
  }
  const m = messaging();
  if (!m) return false;
  const status = await requestPermission(m);
  return status === 1 || status === 2; // AUTHORIZED / PROVISIONAL
};

export const getFcmToken = async () => {
  const m = messaging();
  if (!m) return null;
  try {
    return await getToken(m);
  } catch (e) {
    console.log('Push: getToken failed', e?.message);
    return null;
  }
};

// Device ke server e register / update kore. device_id return kore.
export const syncDevice = async (token) => {
  const deviceId = await getDeviceId();
  const fcmToken = token || (await getFcmToken());
  if (!fcmToken) return deviceId;
  // Firebase Console theke test message pathanor jonno (shudhu debug build e)
  if (__DEV__) console.log('Push: FCM token', fcmToken);
  await registerDevice({
    device_id: deviceId,
    fcm_token: fcmToken,
    platform: Platform.OS,
    app_version: DeviceInfo.getVersion(),
  });
  return deviceId;
};

export const getLocalEnabled = async () => (await AsyncStorage.getItem(ENABLED_KEY)) !== '0';
export const setLocalEnabled = (enabled) => AsyncStorage.setItem(ENABLED_KEY, enabled ? '1' : '0');

// Listener gulo; unsubscribe function return kore
export const listenForeground = (cb) => {
  const m = messaging();
  return m ? onMessage(m, cb) : () => {};
};

export const listenTokenRefresh = (cb) => {
  const m = messaging();
  return m ? onTokenRefresh(m, cb) : () => {};
};

export const listenOpened = (cb) => {
  const m = messaging();
  if (!m) return () => {};
  // App bondho obosthay notification e tap kore khulle
  getInitialNotification(m).then((msg) => msg && cb(msg)).catch(() => {});
  // App background e thaka obosthay tap korle
  return onNotificationOpenedApp(m, cb);
};

// HIGH importance channel: notification upore pop-up hoye ashe, sound shoho
export const ensureChannel = () =>
  notifee.createChannel({ id: CHANNEL_ID, name: 'Notifications', importance: AndroidImportance.HIGH, sound: 'default' });

// App khola obosthay FCM notification nije dekhay na; tai notifee diye status bar e dekhano
export const showLocalNotification = async (msg) => {
  const n = msg?.notification || {};
  if (!n.title && !n.body) return;
  await ensureChannel();
  const image = n.android?.imageUrl;
  await notifee.displayNotification({
    title: n.title,
    body: n.body,
    data: msg.data || {},
    android: {
      channelId: CHANNEL_ID,
      smallIcon: 'ic_notification',
      color: '#EB592C',
      pressAction: { id: 'default' },
      ...(image ? { style: { type: AndroidStyle.BIGPICTURE, picture: image } } : {}),
    },
  });
};

// notifee notification e tap: FCM message er moto shape e cb ke dey
const toMessage = (n) => ({ data: n?.data || {}, notification: { title: n?.title, body: n?.body } });
let pendingPress = null;

export const listenLocalPress = (cb) => {
  notifee.getInitialNotification().then((res) => res && cb(toMessage(res.notification))).catch(() => {});
  const offForeground = notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.PRESS) cb(toMessage(detail.notification));
  });
  // App background e thaka obosthay tap korle onBackgroundEvent e jay; app samne ashle khulbe
  const appState = AppState.addEventListener('change', (state) => {
    if (state === 'active' && pendingPress) {
      cb(toMessage(pendingPress));
      pendingPress = null;
    }
  });
  return () => {
    offForeground();
    appState.remove();
  };
};

// index.js theke call hoy, App register howar age
export const registerBackgroundHandler = () => {
  const m = messaging();
  if (m) setBackgroundMessageHandler(m, async () => {});
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.PRESS) pendingPress = detail.notification;
  });
};
