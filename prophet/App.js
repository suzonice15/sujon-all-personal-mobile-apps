import { StatusBar, ToastAndroid } from 'react-native';
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
import { claimDailyBonus } from './src/db/earnings';
import { initDB } from './src/db/db';
import { runMigrations } from './src/db/migrations';
import { seedDB } from './src/db/seed';
import { claimDailyCoinPending } from './src/db/claims';
import { getLastClaimTime, getLastSyncAt, setLastSyncAt } from './src/db/settings';
import { saveAppSettings, getAppSettingInt } from './src/db/appSettings';
import { getAppInfo } from './src/api/homeApi';
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
    (async () => {
      if (ADMOB_ENABLED) {
        await MobileAds().initialize();
        if (ADMOB_TEST_MODE) {
          MobileAds().setRequestConfiguration({
            testDeviceIdentifiers: [],
          });
        }
      }
      await initDB();
      await runMigrations();
      const bonus = await claimDailyBonus();
      if (bonus.added) ToastAndroid.show('দৈনিক বোনাস ১০০ পয়েন্ট পেয়েছেন!', ToastAndroid.LONG);
      if (daily_bonus_coin > 0) {
        const lastClaim = await getLastClaimTime();
        const todayStr = new Date().toDateString();
        const lastClaimDate = lastClaim > 0 ? new Date(lastClaim).toDateString() : '';
        if (lastClaimDate !== todayStr) {
          const coinPending = await claimDailyCoinPending();
          if (coinPending.added) {
            ToastAndroid.show(`দৈনিক ${coinPending.amount} কয়েন পেন্ডিং হয়েছে!`, ToastAndroid.SHORT);
            refreshCoins();
          }
        }
      }
      await consolidateCoinHistory();
      await consolidatePointHistory();
      try {
        const info = await getAppInfo();
        if (info?.data) {
           await saveAppSettings(info.data);
         } else {
          console.log('App info response missing data:', info);
        }
      } catch (e) {
        console.log('App info fetch failed:', e.message);
      }
       
        await syncCoinsToServer();
        await syncPointsToServer();
       
      await refreshPoints();
      await refreshNotifs();
      seedDB();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer ref={navigationRef}>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function App() {
  return (
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
  );
}

export default App;
