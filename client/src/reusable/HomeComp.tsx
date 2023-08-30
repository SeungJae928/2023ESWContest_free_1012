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

    const [stompClient, setStompClient] = useState(null);
    const [lamp, setLamp] = useState(
        cage.lampOn ? 'On' : 'Off'
    );
    const [data, setData] = useState('')
    
    // 60초 주기로 사육장 데이터 갱신
    useEffect(() => {
        let timer = setInterval(() => {
            axios.post(Url + "/api/cage/getCurrentData", {
                token: {props}.props
              })
            .then((data) => {
                setCurrentTemp(data.data.current_temp)
                setCurrentHumid(data.data.current_humid)
            })
            .catch((e) => {
              console.log(e)
            })
            const date = new Date()
            if (date.getMinutes()){
                axios.post(Url + "/api/cage/getTemp", {
                    token: {props}.props
                  })
                .then((data) => {
                    setTempList(data.data)
                })
                .catch((e) => {
                  console.log(e)
                })

                axios.post(Url + "/api/cage/getHumid", {
                    token: {props}.props
                  })
                .then((data) => {
                    setHumidList(data.data)
                })
                .catch((e) => {
                  console.log(e)
                })
            }
            //console.log("updated data!")
        }, 5000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const Url = `http://www.rats-lh.com:8080`

    // @ts-ignore
    const userId = parseInt(JSON.stringify(jwtDecode(props).sub).replace("\"", ""))
    const [currentTemp, setCurrentTemp] = useState(0)
    const [currentHumid, setCurrentHumid] = useState(0)
    const [temp, setTempList] = useState('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]')
    const [humid, setHumidList] = useState('[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]')

    useEffect(() => {
        const sock = new SockJS("http://www.rats-lh.com:8080/chat");
        const client = Stomp.over(sock);
        setStompClient(client);
      }, []);

    return (
        <View>
            <ItemBox boxName='Temperature' buttonName='edit settings'
                needGraph = {true} graph_data={temp} val1={currentTemp} val1_name='current temp'/>

            <ItemBox boxName='Humidity' buttonName='edit settings' 
                needGraph = {true} graph_data={humid} val1={currentHumid} val1_name='current humid'/>

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