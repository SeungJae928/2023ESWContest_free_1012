import React from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import { MD2Colors as Colors } from 'react-native-paper';
import Graph from './GraphTest';
import * as Data from '../data';

export type boxData = {
    boxName: string
    buttonName: string
    needGraph: boolean
    val1_name?: string
    val2_name?: string
    val3_name?: string
    val1?: string | number
    val2?: string | number
    val3?: string | number
}

export const ItemBox: FC<boxData> = ({boxName, buttonName, needGraph, val1_name, val2_name, val3_name, val1, val2, val3}) => {
    return (
        <View style={[styles.view]}>
            <View style={[styles.topbox]}>
                <Text style={[styles.name]}>{boxName}</Text>
                <Text style={[styles.button]}>{buttonName}</Text>
            </View>

                <Graph />

            <View style={[styles.bottombox]}>
                <View style={[styles.valueArea]}>
                    <View>
                        <Text style={[styles.valName]}>{val1_name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.val]}>{val1}</Text>
                    </View>
                </View>
                <View style={[styles.valueArea]}>
                <View>
                        <Text style={[styles.valName]}>{val2_name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.val]}>{val2}</Text>
                    </View>
                </View>
                <View style={[styles.valueArea]}>
                <View>
                        <Text style={[styles.valName]}>{val3_name}</Text>
                    </View>
                    <View>
                        <Text style={[styles.val]}>{val3}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {flexDirection: 'column', backgroundColor: Colors.grey300},
    topbox: {flexDirection: 'row', padding: 10},
    name: {flex: 1, textAlign: 'left', fontSize: 35, fontFamily: 'Oswald-Bold'},
    bottombox: {backgroundColor: Colors.black, flexDirection: 'row', padding: 10, justifyContent:'space-between'},
    button: {flex: 0.3, backgroundColor: Colors.black, color: Colors.white, 
        borderRadius: 10, fontFamily: 'Oswald-Bold', textAlign: 'center', padding: 5, height: 40, marginTop: 15},
    valueArea: {flexDirection: 'column', backgroundColor: Colors.black},
    valName: {color: Colors.white, fontSize: 20, fontFamily: 'Oswald-Bold', textAlign: 'center'},
    val: {color: Colors.white, fontSize: 40, fontFamily: 'Oswald-Bold', textAlign: 'center'}
})

