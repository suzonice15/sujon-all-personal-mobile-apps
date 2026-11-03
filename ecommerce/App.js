import { StatusBar, ToastAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './src/theme/lightTheme';
import { darkTheme } from './src/theme/darkTheme';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect, useRef } from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
 import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NotificationsProvider, useNotifications } from './src/context/NotificationsContext';
import { AuthProvider } from './src/context/AuthContext';
import { listenOpened, listenLocalPress } from './src/services/pushNotification';
import { markNotificationRead } from './src/api/notificationApi';
import { getDeviceId } from './src/utils/device';
 
 
const navigationRef = createNavigationContainerRef();

const toDateString = (ms) => new Date(ms || Date.now()).toISOString().slice(0, 19).replace('T', ' ');

// Notification e tap korle kon screen khulbe
const openFromNotification = (msg) => {
  const data = msg?.data || {};
  if (data.product_name) {
    // Product page e detail screen hoy na, tai ekhanei read mark
    if (data.notification_id) {
      getDeviceId().then((id) => markNotificationRead(id, data.notification_id)).catch(() => {});
    }
    navigationRef.navigate('Home', {
      screen: 'Notifications',
      params: {
        screen: 'ProductDetail',
        initial: false,
        params: {
          product: { product_id: data.product_id, product_name: data.product_name, product_title: data.product_title },
        },
      },
    });
    return;
  }
  if (data.order_id) {
    navigationRef.navigate('Home', {
      screen: 'Account',
      params: { screen: 'OrderDetail', initial: false, params: { order_id: data.order_id } },
    });
    return;
  }
  navigationRef.navigate('Home', {
    screen: 'Notifications',
    params: {
      screen: 'NotificationDetail',
      initial: false,
      params: {
        item: {
          id: data.notification_id,
          title: msg?.notification?.title,
          body: msg?.notification?.body,
          type: data.type,
          created_at: toDateString(msg?.sentTime),
        },
      },
    },
  });
};

function AppInner() {
  const { isDark } = useTheme();
  const { refresh: refreshNotifs } = useNotifications();
  const pendingOpen = useRef(null);

  useEffect(() => {
    const handleOpen = (msg) => {
      refreshNotifs();
      if (navigationRef.isReady()) openFromNotification(msg);
      else pendingOpen.current = msg;
    };
    const offFcm = listenOpened(handleOpen);
    const offLocal = listenLocalPress(handleOpen);
    return () => {
      offFcm();
      offLocal();
    };
  }, [refreshNotifs]);

  const onNavReady = () => {
    if (pendingOpen.current) {
      openFromNotification(pendingOpen.current);
      pendingOpen.current = null;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer ref={navigationRef} onReady={onNavReady}>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NotificationsProvider>
          <ThemeProvider>
            <AppInner />
          </ThemeProvider>
        </NotificationsProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
