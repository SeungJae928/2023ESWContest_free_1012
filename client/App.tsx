import React, {useEffect} from 'react'
import { StyleSheet, Alert, Image } from 'react-native'
import { MD2Colors as Colors } from 'react-native-paper'
import SplashScreen from 'react-native-splash-screen'
import LoginScreen from './src/pages/screens/login_screen'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler'
import Title from './src/components/Title'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Data from './src/data'
import MainNavigator from './src/pages/screens/MainNavigator'

const Stack = createStackNavigator()

export default function App(){

  const User : Data.UserInfo = Data.createUserInfo()

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
          <Stack.Screen name='Main' component={MainNavigator}
            options={
              {headerLeft: ()=>(<Image style={styles.image} source={{uri: User.profileImage}}/>),
                headerTitle: () => (
                <Title/>
              ), headerStyle: {backgroundColor: Colors.purple500},
              headerRight: () => (
                <Icon name="menu" style={styles.icon} size={35} onPress={() => {Alert.alert('menu pressed.')}}/>
              )}
            }/>
        </Stack.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  topview: {flex: 1, backgroundColor: Colors.white},
  image: {width: 40, height:40, backgroundColor: Colors.white, borderRadius: 20, margin: 10},
  icon: {color: Colors.white, margin: 10}
});
