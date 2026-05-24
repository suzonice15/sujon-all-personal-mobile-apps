/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, ToastAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './src/theme/lightTheme';
import { darkTheme } from './src/theme/darkTheme';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { PointsProvider, usePoints } from './src/context/PointsContext';
import { claimDailyBonus } from './src/db/earnings';

import { initDB } from './src/db/db';
import { runMigrations } from './src/db/migrations';
import { seedDB } from './src/db/seed';

function AppInner() {
  const [isDark] = useState(false);
  const { refreshPoints } = usePoints();

  useEffect(() => {
    const syncData = async () => {
      await initDB();
      await runMigrations();
      await seedDB();
      const bonus = await claimDailyBonus();
      if (bonus.added) ToastAndroid.show('🎁 দৈনিক বোনাস ১০০ পয়েন্ট পেয়েছেন!', ToastAndroid.LONG);
      await refreshPoints();
    };
    syncData();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function App() {
  return (
    <PointsProvider>
      <AppInner />
    </PointsProvider>
  );
}

export default App;
