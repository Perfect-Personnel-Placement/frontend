import { enableScreens } from 'react-native-screens';
import { DrawerContent } from './DrawerNav';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootDrawerParamList } from '../types';
import React from 'react';
import RootTabNavigator from './RootTabNavigator';
import Logo from '../assets/logo';

//https://docs.expo.dev/versions/latest/sdk/screens/ -Kai
enableScreens();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const Navigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: () => <Logo />,
      }}
      drawerContent={() => <DrawerContent />}
    >
      <Drawer.Screen name='DrawerRoot' component={RootTabNavigator} />
    </Drawer.Navigator>
  );
};

export default Navigation;
