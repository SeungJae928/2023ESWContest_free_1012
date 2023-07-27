import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function MainNavigator(){
    return (
        <View style={[styles.view]}>
            <Text>This is top text</Text>
            <Text>This is bottom text</Text>
        </View>
    )
}

const styles = StyleSheet.create({ 
    view: {flex: 1, alignItems: 'center', justifyContent: 'space-between'}
})