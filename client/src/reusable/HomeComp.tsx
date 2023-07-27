import React, { FC, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Data from '../data';
import { ItemBox } from './ItemBox';
import { MD2Colors as Colors } from 'react-native-paper';

export type values = {
    cage : Data.CData
}

export const HomeComp: FC<values> = ({cage}) => {

    const [lamp, setLamp] = useState(
        cage.lampOn ? 'On' : 'Off'
    );

    return (
        <View>
            <ItemBox boxName='Temperature' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp + '°C'} val1_name='current temp' 
                val2={cage.max_temp + '°C'} val2_name='max-temp'
                val3={cage.min_temp + '°C'} val3_name='min-temp'/>

            <ItemBox boxName='Humidity' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp + '%'} val1_name='current humid' 
                val2={cage.max_temp + '%'} val2_name='max-humid'
                val3={cage.min_temp + '%'} val3_name='min-humid'/>

            <ItemBox boxName='Lamp' buttonName='edit settings' 
                needGraph = {false} val1={lamp} val1_name='current status' 
                val2={cage.max_temp} val2_name='start-time'
                val3={cage.min_temp} val3_name='stop-time'/>

            <ItemBox boxName='Pump' buttonName='edit settings' 
                needGraph = {false} val1={cage.current_temp} val1_name='start-time' 
                val2={cage.max_temp} val2_name='stop-time'/>

            <ItemBox boxName='Mode' buttonName='edit mode' 
                needGraph = {false} val1={cage.mode} val1_name='current mode: '/>

            <View style={styles.blank}/>
        </View>
    );
}

const styles = StyleSheet.create({
    blank: {backgroundColor: Colors.grey800 , padding: 30}
})