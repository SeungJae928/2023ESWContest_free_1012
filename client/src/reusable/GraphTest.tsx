import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";


export const Graph = (props) => {
    function parseInt(str: string) {
        let parsedStr = str.replace('[', '')
        parsedStr = parsedStr.replace(']', '')
        let arr = parsedStr.split(',')
        return arr
    }

    let tempData = parseInt(props.data)

    return(
        <View style={[styles.graph]}>
  <LineChart

    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
              Number.parseInt(tempData[0]),
              Number.parseInt(tempData[1]),
              Number.parseInt(tempData[2]),
              Number.parseInt(tempData[3]),
              Number.parseInt(tempData[4]),
              Number.parseInt(tempData[5])
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width - 20} // from react-native
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
  />
</View>
    );
}

const styles = StyleSheet.create({
  graph: {flex: 1, padding: 10}
})