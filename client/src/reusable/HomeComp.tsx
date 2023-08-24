
import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import * as Data from '../data';
import { ItemBox } from './ItemBox';
import { MD2Colors as Colors } from 'react-native-paper';
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useQuery } from "react-query";

export type values = {
    cage : Data.CData
}

export const HomeComp: FC<values> = ({cage, props}) => {
    const [lamp, setLamp] = useState(
        cage.lampOn ? 'On' : 'Off'
    );
    const Url = `http://10.0.2.2:8080`

    // @ts-ignore
    const userId = parseInt(JSON.stringify(jwtDecode(props).sub).replace("\"", ""))

    const [humid, setHumid] = useState('')
    const [temp, setTemp] = useState('')
    const [maxTemp, setMaxTemp] = useState('')
    const [maxHumid, setMaxHumid] = useState('')
    const [minTemp, setMinTemp] = useState('')
    const [minHumid, setMinHumid] = useState('')
    const [currentTemp, setCurrentTemp] = useState('')
    const [currentHumid, setCurrentHumid] = useState('')

    // const { isLoading, isError, data, error } = useQuery()

    // 메인 접속시 최초 사육장 데이터 로드
    useEffect(() => {
        getTemp()
        getHumid()
        setMaxTemp(getMaxData(temp))
        setMaxHumid(getMaxData(humid))
        setMinTemp(getMinData(temp))
        setMinHumid(getMinData(humid))
        setCurrentTemp(getCurrentData(temp))
        setCurrentHumid(getCurrentData(humid))
    }, [])

    // 60초 주기로 사육장 데이터 갱신
    useEffect(()=>{
        let timer = setInterval(() => {
            getTemp()
            getHumid()
            setMaxTemp(getMaxData(temp))
            setMaxHumid(getMaxData(humid))
            setMinTemp(getMinData(temp))
            setMinHumid(getMinData(humid))
            setCurrentTemp(getCurrentData(temp))
            setCurrentHumid(getCurrentData(humid))
            console.log("updatae data!")
        }, 60000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useQuery

    function getTemp() {
        axios.post(Url + "/api/cage/getTemp", {
            id: userId,
            name: ""
        })
            .then((response) => {
                setTemp(JSON.stringify(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getHumid() {
        axios.post(Url + "/api/cage/getHumid", {
            id: userId,
            name: ""
        })
            .then((response) => {
                setHumid(JSON.stringify(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    function getMaxData(str :string) {
        let parsedStr = str.replace('[', '')
        parsedStr = parsedStr.replace(']', '')
        parsedStr = parsedStr.replace('"', '')
        let arr = parsedStr.split(',').map(Number)
        return Math.max(...arr)
    }

    function getMinData(str :string) {
        let parsedStr = str.replace('[', '')
        parsedStr = parsedStr.replace(']', '')
        parsedStr = parsedStr.replace('"', '')
        let arr = parsedStr.split(',').map(Number)
        return Math.min(...arr)
    }

    function getCurrentData(str :string) {
        let parsedStr = str.replace('[', '')
        parsedStr = parsedStr.replace(']', '')
        parsedStr = parsedStr.replace('"', '')
        let arr = parsedStr.split(',').map(Number)
        return arr[arr.length - 1]
    }

    return (
        <View>
            <ItemBox boxName='Temperature' buttonName='edit settings'
                needGraph = {true} graph_data={temp} val1={cage.current_temp} val1_name='current temp'
                val2={cage.max_temp} val2_name='max temp'
                val3={cage.min_temp} val3_name='min temp'/>

            <ItemBox boxName='Humidity' buttonName='edit settings' 
                needGraph = {true} graph_data={humid} val1={cage.current_temp} val1_name='current humid'
                val2={cage.max_temp} val2_name='max humid'
                val3={cage.min_temp} val3_name='min humid'/>

            <ItemBox boxName='Lamp' buttonName='edit settings'
                needGraph = {false} val1={lamp} val1_name='current status' 
                val2={cage.max_temp} val2_name='start-time'
                val3={cage.min_temp} val3_name='stop-time'/>

            <ItemBox boxName='Pump' buttonName='edit settings' 
                needGraph = {false} val1={cage.current_temp} val1_name='start-time' 
                val2={cage.max_temp} val2_name='stop-time'/>

            <ItemBox boxName='Mode' buttonName='edit mode' 
                needGraph = {false} val1={cage.mode} val1_name='current mode: '/>

            <View style={styles.blank}/>
        </View>
    );
}

const styles = StyleSheet.create({
    blank: {backgroundColor: Colors.grey800 , padding: 30}
})