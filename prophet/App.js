import { StatusBar, AppState } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './src/theme/lightTheme';
import { darkTheme } from './src/theme/darkTheme';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect } from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { PointsProvider, usePoints } from './src/context/PointsContext';
import { CoinsProvider, useCoins } from './src/context/CoinsContext';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NotificationsProvider, useNotifications } from './src/context/NotificationsContext';
import { claimDailyBonus, getDeviceId } from './src/db/earnings';
import ErrorBoundary from './src/components/ErrorBoundary';
import { initDB } from './src/db/db';
import { runMigrations } from './src/db/migrations';
import { seedDB } from './src/db/seed';
import { claimDailyCoinPending } from './src/db/claims';
import { showLocalNotification } from './src/utils/localNotifications';
import { getLastClaimTime, getLastSyncAt, setLastSyncAt, getLastVisitDate, setLastVisitDate } from './src/db/settings';
import { saveAppSettings, getAppSettingInt } from './src/db/appSettings';
import { getAppInfo, trackVisitor } from './src/api/homeApi';
import { consolidateCoinHistory } from './src/db/coins';
import { consolidatePointHistory } from './src/db/earnings';
import { syncCoinsToServer, syncPointsToServer } from './src/db/sync';
import { ADMOB_ENABLED, ADMOB_TEST_MODE } from './src/config/url';
import { daily_bonus_coin } from './src/config/url';
import MobileAds from 'react-native-google-mobile-ads';

const navigationRef = createNavigationContainerRef();

function AppInner() {
  const { isDark } = useTheme();
  const { refreshPoints } = usePoints();
  const { refreshCoins } = useCoins();
  const { refresh: refreshNotifs } = useNotifications();

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && ADMOB_ENABLED) {
        MobileAds().initialize().catch(() => {});
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await initDB();
        await runMigrations();

        if (ADMOB_ENABLED) {
          MobileAds()
            .initialize()
            .then(() => {
              if (ADMOB_TEST_MODE) {
                MobileAds().setRequestConfiguration({
                  testDeviceIdentifiers: [],
                });
              }
            })
            .catch(() => {});
        }

        seedDB();
        
        const bonus = await claimDailyBonus();
        // if (bonus.added) ToastAndroid.show('দৈনিক বোনাস ১০০ পয়েন্ট পেয়েছেন!', ToastAndroid.LONG);
        if (daily_bonus_coin > 0) {
          const lastClaim = await getLastClaimTime();
          const todayStr = new Date().toDateString();
          const lastClaimDate = lastClaim > 0 ? new Date(lastClaim).toDateString() : '';
          if (lastClaimDate !== todayStr) {
            const coinPending = await claimDailyCoinPending();
            if (coinPending.added) {
              showLocalNotification({
                title: 'দৈনিক কয়েন',
                body: `দৈনিক ${coinPending.amount} কয়েন পেন্ডিং হয়েছে!`,
              });
              refreshCoins();
            }
          }
        }
       
        getAppInfo()
          .then((info) => {
            if (info?.data) {
              return saveAppSettings(info.data);
            }
            console.log('App info response missing data:', info);
          })
          .catch((e) => console.log('App info fetch failed:', e.message));

        try {
          const today = new Date().toDateString();
          const lastVisit = await getLastVisitDate();
          if (lastVisit !== today) {
            const deviceId = await getDeviceId();
            trackVisitor(deviceId).catch((e) => console.log('Visitor track failed:', e.message));
            await setLastVisitDate(today);
          }
        } catch (e) {
          console.log('Visitor track failed:', e.message);
        }

        await refreshPoints();
        await refreshNotifs();
       
      } catch (e) {
        console.log('App init failed:', e?.message);
      } finally {
                SplashScreen.hide();

         await consolidateCoinHistory();
        await consolidatePointHistory();
      }
    })();
  }, [refreshCoins, refreshPoints, refreshNotifs]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider theme={isDark ? darkTheme : lightTheme}>
          <NavigationContainer ref={navigationRef}>
            <DrawerNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );}

function App() {
  return (
    <ErrorBoundary>
      <PointsProvider>
        <CoinsProvider>
          <CartProvider>
            <NotificationsProvider>
              <ThemeProvider>
                <AppInner />
              </ThemeProvider>
            </NotificationsProvider>
          </CartProvider>
        </CoinsProvider>
      </PointsProvider>
    </ErrorBoundary>
  );
}

export default App;
