import React, { createContext, useContext, useState, useCallback } from 'react';
 
const NotificationsContext = createContext({ unread: 0, refresh: () => {} });

export const NotificationsProvider = ({ children }) => {
  const [unread, setUnread] = useState(0);

  const refresh = useCallback(async () => {
    await fetchNotifications();
    const count = await getUnreadCount();
    setUnread(count);
  }, []);

  return (
    <NotificationsContext.Provider value={{ unread, refresh }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
