import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';

const DEFAULT_CHANNEL_ID = 'prophet_default';
let channelReady = false;

const ensureChannel = async (channelId = DEFAULT_CHANNEL_ID) => {
  if (channelReady) return;
  const channels = await notifee.getChannels();
  if (!channels.some((c) => c.id === channelId)) {
    await notifee.createChannel({
      id: channelId,
      name: 'সাধারণ বিজ্ঞপ্তি',
      importance: AndroidImportance.HIGH,
    });
  }
  channelReady = true;
};

export const showLocalNotification = async ({ title, body, id, channelId = DEFAULT_CHANNEL_ID }) => {
  try {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      console.log('Notification permission not granted:', settings.authorizationStatus);
      return false;
    }
    await ensureChannel(channelId);
    const notification = {
      title,
      body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
      },
    };
    if (id != null) notification.id = String(id);
    await notifee.displayNotification(notification);
    console.log('Notification shown:', title);
    return true;
  } catch (e) {
    console.log('Local notification failed:', e?.message);
    return false;
  }
};
