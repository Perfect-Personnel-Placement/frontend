import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as Font from 'expo-font';
import RootStackNavigator from './src/Navigation/RootStackNavigator';

const App = () => {
  const [fontsLoaded, setFonts] = useState(false);

  useEffect(() => {
    loadFonts();
  });

  const loadFonts = async () => {
    await Font.loadAsync({
      FuturaBold: require('./src/assets/fonts/Futura-Std-Bold.otf'),
      FuturaBook: require('./src/assets/fonts/Futura-Std-Book.otf'),
      FuturaMedium: require('./src/assets/fonts/Futura-Std-Medium.otf'),
    });
    setFonts(true);
  };

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider style={styles.container}>
        <Text>The app is loading</Text>
        <StatusBar style='auto' />
      </SafeAreaProvider>
    );
  } else {
    return (
      <SafeAreaProvider style={styles.container}>
        <NavigationContainer>
          <PaperProvider theme={DefaultTheme}>
            <StatusBar style='auto' />
            <RootStackNavigator />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
