import React, {useEffect} from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {MD2Colors as Colors} from 'react-native-paper';
import { HomeComp } from '../reusable/HomeComp';
import * as Data from '../data';

const arr_home_comp : Data.CData = Data.createCage()

const Content = ({props}) => {
    return(
        <ScrollView style={styles.view}>
            <HomeComp cage = {arr_home_comp} props={props}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    view: {
        flex: 1, backgroundColor: Colors.grey100
    }
})

export default Content
