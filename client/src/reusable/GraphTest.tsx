import React, { useState, useEffect } from 'react';
import {MD2Colors as Colors} from 'react-native-paper'
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import axios from "axios";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import Splash from "../components/Splash";


export const Graph = (props) => {

    const [exist, setExist] = useState(false)
    const [xAxis, setxAsis] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
    const [cageData, setData] = useState([])
    const [date, setDate] = useState(new Date())
    let i = 0;

    useEffect(() => {
        let timer = setInterval(() => {
            setDate(new Date())
            const hour = date.getHours()
            for(i = 0; i < 24; i++){
                if(i == 0){
                    xAxis[i] = hour + 1
                }
                else{
                    xAxis[i] = xAxis[i - 1] + 1
                    if(xAxis[i] > 23){
                        xAxis[i] = xAxis[i] % 24 
                    }
                }
            }
        }, 50000)
    }, [])

    useEffect(()=>{

        function parseInt(str: string) {
            let parsedStr = str.replace('[', '')
            parsedStr = parsedStr.replace(']', '')
            parsedStr = parsedStr.replace('"', '')
            let arr = parsedStr.split(',')
            return arr
        }

        setData(parseInt(JSON.stringify(props.data)))

        if (props.data !== "") {
            setExist(true)
        } else {
            setExist(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    return(
        <View style={[styles.graph]}>
            { !exist ? <Splash/> :
                <LineChart
                    data={{
                        labels: xAxis,
                        datasets: [
                            {
                                data: [
                                    Number.parseInt(cageData[0]),
                                    Number.parseInt(cageData[1]),
                                    Number.parseInt(cageData[2]),
                                    Number.parseInt(cageData[3]),
                                    Number.parseInt(cageData[4]),
                                    Number.parseInt(cageData[5]),
                                    Number.parseInt(cageData[6]),
                                    Number.parseInt(cageData[7]),
                                    Number.parseInt(cageData[8]),
                                    Number.parseInt(cageData[9]),
                                    Number.parseInt(cageData[10]),
                                    Number.parseInt(cageData[11]),
                                    Number.parseInt(cageData[12]),
                                    Number.parseInt(cageData[13]),
                                    Number.parseInt(cageData[14]),
                                    Number.parseInt(cageData[15]),
                                    Number.parseInt(cageData[16]),
                                    Number.parseInt(cageData[17]),
                                    Number.parseInt(cageData[18]),
                                    Number.parseInt(cageData[19]),
                                    Number.parseInt(cageData[20]),
                                    Number.parseInt(cageData[21]),
                                    Number.parseInt(cageData[22]),
                                    Number.parseInt(cageData[23])
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width * 0.9} // from react-native
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix=""
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: Colors.green50,
                        backgroundGradientFrom: Colors.purple200,
                        backgroundGradientTo: Colors.red200,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "4",
                            strokeWidth: "1",
                            stroke: Colors.purple600
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 15
                    }}
                />}
</View>
    );
}

const styles = StyleSheet.create({
  graph: { margin: 10 , flex: 1, justifyContent: 'center', alignItems: 'center'}
})