import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const iconList = [ 'thermometer-low', 'clock', 'lamp', 'percent' ];
const iconColor = 'white';
const iconSize = 30;
const onPress = () => {Alert.alert('Icon is pressed', 'testmessage')}

export default function BottomBar() {
    const icon = iconList.map((name) => (
        <Icon key={name} 
        name={name} 
        color={iconColor} 
        size={iconSize} 
        onPress={onPress}/>
    ))
    return <View style={styles.view}>{icon}</View>
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: Colors.grey800, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        padding: 10
    }
})

