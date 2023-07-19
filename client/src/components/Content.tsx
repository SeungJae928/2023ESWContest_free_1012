import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MenuOverlay from './MenuOverlay';

export default function Content() {
    return(
        <View style={styles.view}>

        </View>
    )
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.grey100,
        alignItems: 'center', 
        flex: 1
    }
})
