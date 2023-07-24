import React from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Data from '../data';
import { ItemBox } from './ItemBox';

export type values = {
    cage : Data.CData
}

export const HomeComp: FC<values> = ({cage}) => {
    return (
        <View>
            <ItemBox boxName='Temperature' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp} val1_name='current temp' 
                val2={cage.max_temp} val2_name='max temp'
                val3={cage.min_temp} val3_name='min temp'/>

            <ItemBox boxName='Humidity' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp} val1_name='current humid' 
                val2={cage.max_temp} val2_name='max humid'
                val3={cage.min_temp} val3_name='min humid'/>

            <ItemBox boxName='Temperature' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp} val1_name='current temp' 
                val2={cage.max_temp} val2_name='max temp'
                val3={cage.min_temp} val3_name='min temp'/>

            <ItemBox boxName='Temperature' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp} val1_name='current temp' 
                val2={cage.max_temp} val2_name='max temp'
                val3={cage.min_temp} val3_name='min temp'/>

            <ItemBox boxName='Temperature' buttonName='edit settings' 
                needGraph = {true} val1={cage.current_temp} val1_name='current temp' 
                val2={cage.max_temp} val2_name='max temp'
                val3={cage.min_temp} val3_name='min temp'/>
        </View>
    );
}