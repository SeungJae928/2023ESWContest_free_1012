import React, {Component, useEffect, useCallback} from 'react';
import { SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import { MD2Colors as Colors, Menu } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/pages/screens/login_screen';
import HomeScreen from './src/pages/screens/home_screen';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {useColorScheme} from 'react-native-appearance';
import 'react-native-gesture-handler'

enableScreens()

export default function App(){

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <LoginScreen/>
      </NavigationContainer>
    </SafeAreaProvider> 
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.white},
});

