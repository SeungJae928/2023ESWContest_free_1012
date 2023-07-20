import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const title = 'LH Project';

export default function Title() {
    return(
        <View style={styles.centerView}>
            <Icon name="snake" style={styles.icon} size={30}/>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    text: {color: Colors.white, textAlign: 'center', fontSize: 25, fontWeight: 'bold'},
    icon: {color: Colors.white},
    centerView:{alignItems: 'center', flexDirection: 'row'}
})