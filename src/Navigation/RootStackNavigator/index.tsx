import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { RootStackParamList } from '../../types';
import React from 'react';
import ViewBatch from '../../Screens/ViewBatch';
import Navigation from '..';
import AddEditBatch from '../../Screens/AddEditBatch';
import Curricula from '../../Screens/Curricula';
import AddEditCurriculum from '../../Screens/AddEditCurriculum';
import AddClient from '../../Screens/AddClient';
import CreateTrainer from '../../Screens/CreateTrainer';
import ViewEditTrainer from '../../Screens/ViewEditTrainer';
import ViewClient from '../../Screens/ViewClient';
import Diagram from '../../Screens/Diagram';
//see what happens
//please import your screen and put in your screen in components-kai
const Stack = createStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name='Main' component={Navigation} />
      <Stack.Screen name='ViewBatch' component={ViewBatch} />
      <Stack.Screen name='AddEditBatch' component={AddEditBatch} />
      <Stack.Screen
        name='AddTrainer'
        component={CreateTrainer}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='ViewEditTrainer'
        component={ViewEditTrainer}
        options={{ headerShown: true }}
      />
      {/** add your view/addedit screens here */}
      <Stack.Screen name='Curricula' component={Curricula} />
      <Stack.Screen name='AddEditCurriculum' component={AddEditCurriculum} />
      <Stack.Screen name='ViewClient' component={ViewClient} />
      <Stack.Screen name='AddClient' component={AddClient} />
      <Stack.Screen name='Diagram' component={Diagram} options={{ headerShown: true }} />
      {/* <Stack.Screen name='Clients' component={ClientScreen} />
      <Stack.Screen name='EditClient' component={EditClient} />
      <Stack.Screen name='AddClient' component={AddClient} />
      <Stack.Screen name='AddDemand' component={AddDemandScreen} />
      <Stack.Screen name='EditDemand' component={EditDemandScreen} /> */}
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
