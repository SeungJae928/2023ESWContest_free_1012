import React from 'react';
import {View, Text, StyleSheet } from 'react-native';

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
