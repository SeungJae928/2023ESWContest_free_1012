import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import type {RouteProp, ParamListBase} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD2Colors as Colors } from 'react-native-paper'
import HomeScreen from './home_screen'
import PumpScreen from './pump_screen'
import TempScreen from './temp_screen'
import LampScreen from './lamp_screen'
import HumidScreen from './humid_screen'
import {values} from "../../reusable/HomeComp";
import InputScreen from './input_screen'

const Tab = createBottomTabNavigator()

type TabBarIconProps = {

    focused: boolean,
    color: string,
    size: number

}

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
    return{
        headerShown: false,
        tabBarStyle: {backgroundColor : Colors.grey800},
        tabBarActiveTintColor: 'white',
        tabBarIcon: ({focused, color, size} : TabBarIconProps) => {
            const {name} = route
            const focusedSize = focused ? size + 6 : size
            const focusedColor = focused ? Colors.black : color
            switch (name) {
                case 'Pump' :
                    return <Icon name="water" size={size} color={color}/>
                case 'Humid' :
                    return <Icon name="percent" size={size} color={color}/>
                case 'Lamp' :
                    return <Icon name="lamp" size={size} color={color}/>
                case 'Temp' :
                    return <Icon name="thermometer-low" size={size} color={color}/>
                case 'Input' :
                    return <Icon name="keyboard" size={size} color={color}/>
            }
            return <Icon name="home" size={size} color={color}/>
        }
    }
}

const TabNavigator = ({props}) => {
    return (
        <Tab.Navigator screenOptions={screenOptions} >
            <Tab.Screen name="Home" children={() => <HomeScreen props={props}/>}/>
            {/*<Tab.Screen name="Humid" children={() => <HumidScreen props={props}/>}/>
            <Tab.Screen name="Lamp" children={() => <LampScreen props={props}/>}/>
            <Tab.Screen name="Temp" children={() => <TempScreen props={props}/>}/>
            <Tab.Screen name="Pump" children={() => <PumpScreen props={props}/>}/>*/}
            <Tab.Screen name="Input" children={() => <InputScreen props={props}/>}/>
        </Tab.Navigator>
    )
}

export default TabNavigator