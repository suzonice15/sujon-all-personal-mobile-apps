import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';
import DrawerMenuScreen from './DrawerMenuScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 280 },
        overlayColor: 'rgba(0,0,0,0.5)',
        drawerType: 'front',
        swipeEnabled: true,
      }}
      drawerContent={(props) => <DrawerMenuScreen {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
