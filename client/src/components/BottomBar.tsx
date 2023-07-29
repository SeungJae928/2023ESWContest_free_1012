import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native'
import {MD2Colors as Colors} from 'react-native-paper'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import LoginScreen from '../pages/screens/login_screen'
import HomeScreen from '../pages/screens/home_screen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome'
import type {RouteProp, ParamListBase} from '@react-navigation/native'

//const iconList = [ 'thermometer-low', 'clock', 'lamp', 'percent' ];
//const iconColor = Colors.white;
//const iconSize = 30;
//const onPress = () => {Alert.alert('Icon is pressed', 'testmessage')}

const Tab = createBottomTabNavigator()

type TabBarIconProps = {

    focused: boolean,
    color: string,
    size: number

}

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
    return{
        headerShown: false,
        tabBarIcon: ({focused, color, size} : TabBarIconProps) => {
            const {name} = route
            switch (name) {
                case 'Login' :
                    return <AntIcon name="login" size={size} color={color}/>
                case 'SignUp' : 
                    return <FontawesomeIcon name="sign-in" size={size} color={color}/>
            }
            return <Icon name="home" size={size} color={color}/>
        }
    }
}

export default function BottomBar() {
    /*const icon = iconList.map((name) => (
        <Icon key={name} 
        name={name} 
        color={iconColor} 
        size={iconSize} 
        onPress={onPress} 
        //backgroundColor={Colors.white} padding={5}
        />
    ))
    return <View style={styles.view}>{icon}</View>*/
    return (
            <></>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.grey800, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        padding: 10,
    }
})

