import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types';

export const DrawerContent: React.FC = () => {
  type mainScreenProp = StackNavigationProp<RootStackParamList, 'Main'>;
  const navigation = useNavigation<mainScreenProp>();

  const signOut = () => {
    console.log('SIGNED OUT');
    // dispatch({
    //     type: AppAction.LOGOUT,
    //     payload: {}
    // })
  };

  //the onPress is the navigationing so if you need to change it to get to your screens change it to what you named your screens. these are placeholders for now- Kai

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={require('../../assets/images/revatureFav.png')}
                size={60}
                style={{ marginTop: 8 }}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{'Revature Manager'}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='home-outline' color={color} size={size} />
              )}
              label='Home'
              onPress={() => {
                navigation.navigate('Main');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name='chart-bell-curve' color={color} size={size} />
              )}
              label='Diagram'
              onPress={() => {
                navigation.navigate('Diagram');
              }}
            />
            <DrawerItem
              labelStyle={styles.label}
              icon={({ color, size }) => (
                <Icon name='calendar-check-outline' color={color} size={size} />
              )}
              label='Calendar'
              onPress={() => {
                navigation.navigate('Calendar');
              }}
            />
          </Drawer.Section>
        </View>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name='exit-to-app' color={color} size={size} />
          )}
          label='Sign Out'
          onPress={() => {
            signOut();
          }}
        />
        {/* <Drawer.Section style={styles.bottomDrawerSection}></Drawer.Section> */}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  label: {},
});
