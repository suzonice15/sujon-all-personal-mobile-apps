import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme';
import HomeScreen from '../screens/HomeScreen';
import DataScreenScreen from '../screens/DataScreen';
import DetailScreen from '../screens/DetailScreen';
import AboutScreen from '../screens/AboutScreen';
import DrawerContent from '../components/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: Colors.primaryDark },
  headerTintColor: Colors.white,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
  headerTitleAlign: 'center',
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'নবীদের জীবন কাহিনী' }} />
      <Stack.Screen name="DataScreen" component={DataScreenScreen} options={{ title: 'নবীর গল্প' }} />
      <Stack.Screen name="StoryDetail" component={DetailScreen} options={{ title: 'গল্পের বিবরণ' }} />
    </Stack.Navigator>
  );
}

function AboutStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'অ্যাপ সম্পর্কে' }} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: '#e0e0e0',
          borderTopWidth: 1,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: 'নবীদের তালিকা',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>📖</Text>,
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutStack}
        options={{
          title: 'সম্পর্কে',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>ℹ️</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: { width: '75%' },
        }}>
        <Drawer.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ title: 'নবীদের কাহিনী' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
