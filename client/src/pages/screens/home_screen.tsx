import React from 'react'
import { View, StyleSheet } from 'react-native'
import FloatingIcon from '../../components/FloatingIcon'
import Content from '../../components/Content'
import jwtDecode from "jwt-decode";


const HomeScreen = ({props}) => {
    return (
        <View style={[styles.flex]}>
            <Content props={props}/>
            <FloatingIcon/>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1, backgroundColor: 'white'},
  });

export default HomeScreen;
  