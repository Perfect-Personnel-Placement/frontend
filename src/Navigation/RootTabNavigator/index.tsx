import { RootTabParamList } from '../../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Batches from '../../Screens/Batches';
import React from 'react';
import Curricula from '../../Screens/Curricula';
import MainTrainer from '../../Screens/Trainers';
import Clients from '../../Screens/Clients';

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
        component={MainTrainer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='teach' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Curricula'
        component={Curricula}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='notebook-outline' color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name='Clients'
        component={Clients}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name='account-box-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTabNavigator;
