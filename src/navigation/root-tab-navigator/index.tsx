import { RootTabParamList } from '../../types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Batches from '../../screens/batches';
import React from 'react';
import Curricula from '../../screens/curricula';
import MainTrainer from '../../screens/trainer';
import Clients from '../../screens/clients';

const Tab = createBottomTabNavigator<RootTabParamList>();

/**
 * Root Tab Navigator - the applications bottom navigation bar that navigates to all main screens
 * @returns {React.FC} - react component for tab navigation
 * @author Kaiyip Ho
 */

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
