import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
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
    const [cageData, setData] = useState([])

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
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Number.parseInt(cageData[0]),
                                    Number.parseInt(cageData[1]),
                                    Number.parseInt(cageData[2]),
                                    Number.parseInt(cageData[3]),
                                    Number.parseInt(cageData[4]),
                                    Number.parseInt(cageData[5])
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width - 40} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />}
</View>
    );
}

const styles = StyleSheet.create({
  graph: { margin: 10 }
})