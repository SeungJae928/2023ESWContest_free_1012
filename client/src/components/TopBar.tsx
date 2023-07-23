import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Title from './Title';
import * as Data from '../data';

const User : Data.UserInfo = Data.createUserInfo()

export default function TopBar() {
    return(
        <View style={styles.view}>
            <Image style={styles.image} source={{uri: User.profileImage}}/>
            <Title />
            <Icon name="menu" style={styles.icon} size={40}/>
        </View>
    ) 
};

const styles = StyleSheet.create({
    view: {backgroundColor: Colors.purple500, alignItems: 'center', flexDirection: 'row', padding: 10, justifyContent: 'space-between'},
    image: {width: 40, height:40, backgroundColor: Colors.white, borderRadius: 20},
    icon: {color: Colors.white},
})

