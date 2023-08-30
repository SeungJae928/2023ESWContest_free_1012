import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Data from '../data';
import { ItemBox } from './ItemBox';
import { MD2Colors as Colors } from 'react-native-paper';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export type values = {
    cage : Data.CData
}

export const HomeComp: FC<values> = ({cage, props}) => {
    const [lamp, setLamp] = useState(
        cage.lampOn ? 'On' : 'Off'
    );
    const Url = `http://www.rats-lh.com:8080`

    // @ts-ignore
    const userId = parseInt(JSON.stringify(jwtDecode(props).sub).replace("\"", ""))
    
    const [stompClient, setStompClient] = useState(null)
    const [goalhumid, setGoalHumid] = useState(65.0)
    const [goaltemp, setGoalTemp] = useState(25.0)
    const [currentTemp, setCurrentTemp] = useState(0)
    const [currentHumid, setCurrentHumid] = useState(0)
    const temp = '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]'
    const humid = '[1,2,3,4,5,6,7,8,9,1,11,12,13,14,15,16,17,18,19,20,21,22,23,24]'

    useEffect(() => {
        const sock = new SockJS("http://www.rats-lh.com:8080/chat");
        const client = Stomp.over(sock);
        setStompClient(client);
      }, []);

    const sendMessage = async (_temp, _humid, _des) => {
        if (_temp !== "" && _humid !== "") {
          const data = {
            token: {props}.props,
            temp: _temp,
            humid: _humid,
            lamp_start : new Date(),
            lamp_stop : new Date(),
            pump_start : new Date(),
            pump_stop : new Date(),
          };
          if (stompClient) {
            console.log("message sending.....");
            stompClient.send("/app/chat/" + _des, {}, JSON.stringify(data));
          }
        }
      };

    return (
        <View>
            <ItemBox boxName='Temperature' buttonName='edit settings'
                needGraph = {true} graph_data={temp} val1={cage.current_temp} val1_name='current temp'/>

            <ItemBox boxName='Humidity' buttonName='edit settings' 
                needGraph = {true} graph_data={humid} val1={cage.current_temp} val1_name='current humid'/>

            <ItemBox boxName='Lamp' buttonName='edit settings'
                needGraph = {false} val1={lamp} val1_name='current status' 
                val2={cage.max_temp} val2_name='start-time'
                val3={cage.min_temp} val3_name='stop-time'/>

            <ItemBox boxName='Pump' buttonName='edit settings' 
                needGraph = {false} val1={cage.current_temp} val1_name='start-time' 
                val2={cage.max_temp} val2_name='stop-time'/>

            <ItemBox boxName='Mode' buttonName='edit mode' 
                needGraph = {false} val1={cage.mode} val1_name='current mode: '/>

            <View style={styles.blank}>
                <Text style={styles.copyright}>Copyright by Hojunseo, Seungjaebang, Jihuntak</Text>
                <Text style={styles.copyright}>2023</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button : {flex : 1, textAlign :'center', backgroundColor : Colors.purple500, color: 'white', 
        padding: 10, margin: 10, fontSize: 30, borderRadius : 20, fontFamily: 'Oswald-Bold'},
    blank: {backgroundColor: Colors.grey800 , padding: 30},
    copyright : {flex: 1, color: 'white', textAlign: 'center', fontSize: 15}
})