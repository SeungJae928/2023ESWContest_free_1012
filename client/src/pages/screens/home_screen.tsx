import React from 'react';
import { Text, View} from 'react-native';
import MainNavigator from './MainNavigator';
import FloatingIcon from '../../components/FloatingIcon';
import TopBar from '../../components/TopBar';
import BottomBar from '../../components/BottomBar';
import Content from '../../components/Content';


export default function HomeScreen() {
    return (
        <View>
            <TopBar/>
            <Content/>
            <BottomBar/>
            <FloatingIcon/>
        </View>
    )
}