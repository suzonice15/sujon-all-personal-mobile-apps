import { StatusBar, ToastAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './src/theme/lightTheme';
import { darkTheme } from './src/theme/darkTheme';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect } from 'react';
import DrawerNavigator from './src/navigation/DrawerNavigator';
 import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { NotificationsProvider, useNotifications } from './src/context/NotificationsContext';
import { AuthProvider } from './src/context/AuthContext';
 
 
const navigationRef = createNavigationContainerRef();

function AppInner() {
  const { isDark } = useTheme();
  const { refresh: refreshNotifs } = useNotifications();

  useEffect(() => {
    
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
