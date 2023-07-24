import React, {Component, useEffect} from 'react';
import TopBar from './src/components/TopBar';
import BottomBar from './src/components/BottomBar';
import Content from './src/components/Content';
import { SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import { MD2Colors as Colors, Menu } from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import FloatingIcon from './src/components/FloatingIcon'

export default function App(){

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
    <SafeAreaView style={styles.flex}>
      <TopBar />
      <Content/>
      <BottomBar />
      <FloatingIcon/>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.white},
});

