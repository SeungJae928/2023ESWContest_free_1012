import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, FlatList, SafeAreaView} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuOverlay from './MenuOverlay';
import { HomeComp, values } from '../reusable/HomeComp';
import * as Data from '../data';

const arr_home_comp : Data.CData = Data.createCage()

export default function Content() {
    return(
        <ScrollView style={styles.view}>
            <HomeComp cage = {arr_home_comp}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1
    }
})
