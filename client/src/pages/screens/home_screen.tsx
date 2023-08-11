import React from 'react'
import { View, StyleSheet } from 'react-native'
import FloatingIcon from '../../components/FloatingIcon'
import Content from '../../components/Content'


export default function HomeScreen() {
    return (
        <View style={[styles.flex]}>
            <Content/>
            <FloatingIcon/>
        </View>
    )
}

const styles = StyleSheet.create({
    flex: {flex: 1, backgroundColor: 'white'},
  });
  