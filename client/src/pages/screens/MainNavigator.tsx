import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import type {RouteProp, ParamListBase} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MD2Colors as Colors } from 'react-native-paper'
import TabNavigator from './TabNavigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Drawer = createBottomTabNavigator()

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
            const focusedSize = focused ? size+6 : size
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
            }
            return <Icon name="home" size={size} color={color}/>
        }
    }
}

export default function MainNavigator() {
    return (
        /*<Drawer.Navigator
            screenOptions={{headerShown: false}}>
            <Drawer.Screen name="Tab" component={TabNavigator} />
        </Drawer.Navigator>*/
        <SafeAreaProvider>
            <TabNavigator/>
        </SafeAreaProvider>
    )
}