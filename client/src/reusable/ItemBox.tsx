import React from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, Alert} from 'react-native';
import { MD2Colors as Colors } from 'react-native-paper';
import {Graph} from './GraphTest';
import * as Data from '../data';

export type boxData = {
    boxName: string
    buttonName: string
    needGraph: boolean
    graph_data?: string
    val1_name?: string
    val2_name?: string
    val3_name?: string
    val1?: string | number 
    val2?: string | number
    val3?: string | number
}

export const ItemBox: FC<boxData> = ({boxName, buttonName, needGraph, graph_data, val1_name, val2_name, val3_name, val1, val2, val3}) => {

    // console.log(graph_data)

    return (
        <View style={[styles.view]}>
            <View style={[styles.topbox]}>
                <Text style={[styles.name]}>{boxName}</Text>

                <Text onPress={() => {Alert.alert('Button Pressed')}} 
                    style={[styles.button]}>{buttonName}</Text>
            </View>

                { needGraph && <Graph data={graph_data} /> }
                
            <View style={[styles.bottombox]}>
                <View style={[styles.valueArea]}>
                    <View>
                        <Text style={[styles.valName]}>{val1_name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.val]}>{val1}</Text>
                    </View>
                </View>

                {val2_name && <><View style={[styles.valueArea]}><View>
                    <Text style={[styles.valName]}>{val2_name}</Text>
                    </View>
                    <View><Text style={[styles.val]}>{val2}</Text></View></View></>}
                    
                {val3_name && <><View style={[styles.valueArea]}><View>
                    <Text style={[styles.valName]}>{val3_name}</Text>
                    </View>
                    <View><Text style={[styles.val]}>{val3}</Text></View></View></>}
                    
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {flexDirection: 'column', backgroundColor: Colors.grey300, margin: 10, borderRadius: 20},
    topbox: {flexDirection: 'row', padding: 10, backgroundColor: Colors.grey400, borderTopLeftRadius: 20, borderTopRightRadius: 20},
    name: {flex: 1, textAlign: 'left', fontSize: 30, fontFamily: 'Oswald-Bold', color: Colors.black, marginLeft: 5},
    bottombox: {backgroundColor: Colors.grey800, flexDirection: 'row', padding: 10, justifyContent:'space-between', borderBottomLeftRadius: 20, borderBottomRightRadius: 20},
    button: {flex: 0.4, backgroundColor: Colors.black, color: Colors.white,
        borderRadius: 10, fontFamily: 'Oswald-Bold', textAlign: 'center', padding: 5, height: 40, marginTop: 10},
    valueArea: {flexDirection: 'column', flex: 1},
    valName: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', textAlign: 'center'},
    val: {color: Colors.white, fontSize: 40, fontFamily: 'Oswald-Bold', textAlign: 'center'}
})

