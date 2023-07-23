import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, FlatList} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuOverlay from './MenuOverlay';
import { HomeComp, values } from '../reusable/HomeComp';
import * as Data from '../data';

const arr_home_comp : string = Data.makeArray(50).map(Data.createCage).toString()

export default function Content() {
    return(
        <ScrollView style={styles.view}>
            <Text>{arr_home_comp}</Text>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    view: {
        borderColor: Colors.grey800,
        borderWidth: 1,
    }
})
