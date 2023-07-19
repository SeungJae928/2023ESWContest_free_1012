import React from 'react';
import TopBar from './src/components/TopBar';
import BottomBar from './src/components/BottomBar';
import Content from './src/components/Content';
import { SafeAreaView,ScrollView,StyleSheet,Text,View } from 'react-native';
import { MD2Colors as Colors, Menu } from 'react-native-paper';

export default function App(){
  return (
    <>
    <SafeAreaView style={styles.flex}>
      <TopBar />
      <Content />
      <BottomBar />
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1, backgroundColor: Colors.white},
});

