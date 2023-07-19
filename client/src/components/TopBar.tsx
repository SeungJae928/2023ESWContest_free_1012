import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Title = 'LH Project';

export default function TopBar() {
    return(
        <View style={styles.view}>
            <Image style={styles.image} source={require("../images/pin.png")}/>
            <View style={styles.centerView}>
                <Text style={styles.text}>{Title}</Text>
            </View>
            <Icon name="menu" style={styles.icon} size={40}/>
        </View>
    ) 
};

const styles = StyleSheet.create({
    view: {backgroundColor: Colors.purple500, alignItems: 'center', flexDirection: 'row', padding: 10},
    image: {width: 40, height:40, backgroundColor: Colors.white, borderRadius: 20},
    text: {color: Colors.white, textAlign: 'center', fontSize: 25},
    icon: {color: Colors.white},
    centerView:{flex: 1}
})

