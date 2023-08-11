import React from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import {MD2Colors as Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function FloatingIcon() {
    return(
        <View style={styles.absoluteView}>
            <Icon name="plus" style={styles.icon} size={60} onPress={() => {Alert.alert('plus pressed.')}}/>
        </View>
    )
};

const styles = StyleSheet.create({
    icon: {color: Colors.purple500},
    absoluteView:{
        alignItems: 'center', flexDirection: 'row', position: 'absolute', backgroundColor: Colors.white,
        borderRadius: 30, right: 15, bottom : 15, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5
    }
})