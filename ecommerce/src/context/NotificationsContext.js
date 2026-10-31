import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import {
  deviceLogin,
  deviceLogout,
  getUnreadCount,
  setDeviceNotifications,
} from '../api/notificationApi';
import {
  askPermission,
  syncDevice,
  getLocalEnabled,
  setLocalEnabled,
  listenForeground,
  listenTokenRefresh,
  ensureChannel,
  showLocalNotification,
} from '../services/pushNotification';
import { getDeviceId } from '../utils/device';

const NotificationsContext = createContext({
  deviceId: null,
  unread: 0,
  enabled: true,
  refresh: () => {},
  setEnabled: () => {},
});

export const NotificationsProvider = ({ children }) => {
  const { user, token, loading: authLoading } = useAuth();
  const [deviceId, setDeviceId] = useState(null);
  const [unread, setUnread] = useState(0);
  const [enabled, setEnabledState] = useState(true);
  const deviceIdRef = useRef(null);

  const refresh = useCallback(async () => {
    const id = deviceIdRef.current || (await getDeviceId());
    try {
      const res = await getUnreadCount(id);
      setUnread(Number(res?.unread) || 0);
    } catch {}
  }, []);

  // App open + login/logout: device register, tarpor login state server e pathano
  useEffect(() => {
    if (authLoading) return;
    (async () => {
      try {
        const isEnabled = await getLocalEnabled();
        setEnabledState(isEnabled);
        if (isEnabled) await askPermission();

        const id = await syncDevice();
        deviceIdRef.current = id;
        setDeviceId(id);

        if (user?.id && token) await deviceLogin(id, token);
        else await deviceLogout(id);
      } catch (e) {
        console.log('Push: device sync failed', e?.message);
      }
      refresh();
    })();
  }, [authLoading, user?.id, token, refresh]);

  useEffect(() => {
    const offToken = listenTokenRefresh((token) => {
      syncDevice(token).catch(() => {});
    });
    ensureChannel().catch(() => {});
    // App khola obosthay o status bar e notification dekhano + badge update
    const offMessage = listenForeground((msg) => {
      showLocalNotification(msg).catch(() => {});
      refresh();
    });
    return () => {
      offToken();
      offMessage();
    };
  }, [refresh]);

  const setEnabled = useCallback(async (value) => {
    setEnabledState(value);
    await setLocalEnabled(value);
    if (value) await askPermission();
    try {
      const id = deviceIdRef.current || (await getDeviceId());
      await setDeviceNotifications(id, value);
    } catch {}
  }, []);

  return (
    <NotificationsContext.Provider value={{ deviceId, unread, enabled, refresh, setEnabled }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
