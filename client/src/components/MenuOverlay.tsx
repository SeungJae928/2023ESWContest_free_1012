import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const menuList = ["설정", "기타", "로그아웃"];

export default function MenuOverlay() {
    const menus = menuList.map((menu) => {return <Text style = {styles.text}>
        {menu}
        </Text>})
    return(
        <View style={styles.flex}>
            <View style={styles.menu}>
                {menus}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    flex: {
        flex: 1, 
        position: 'absolute', 
        backgroundColor: 'rgba(1, 0, 0, 0.4)', 
        width: '100%', 
        height: '100%'
    },
    menu: {
        position: 'relative',
        backgroundColor: 'white', 
        flexDirection: 'column',
        width: '40%',
        height: '100%'
    },
    text: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        padding: 10
    }
})
