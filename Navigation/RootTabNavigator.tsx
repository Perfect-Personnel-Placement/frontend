import { RootTabParamList } from '../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen2 from '../component/screens/test';
import RootStackNavigator from './RootStackNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Batches from '../src/screens/Batches';

import React from 'react';
import Navigation from './';

const Tab = createBottomTabNavigator<RootTabParamList>();

//please import your screen and put in your screen in components, SplashScreen2 will is a placeholder! -kai
const RootTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Batches'
    >
      <Tab.Screen
        name='Batches'
        component={Batches}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='home-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Trainers'
        component={SplashScreen2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='teach' color={color} size={size} />
          ),
        }}
      />
      {/** add your main screens down here */}
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
