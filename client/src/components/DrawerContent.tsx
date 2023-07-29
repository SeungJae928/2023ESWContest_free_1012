import React, { FC } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { DrawerContentComponentProps } from '@react-navigation/drawer'

const title = 'DrawerContent'

const DrawerContent : FC<DrawerContentComponentProps> = (props) => {
    console.log(Object.keys(props))
    return(
        <SafeAreaView>
            <Text>{title}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {fontSize: 20},
    content: {flex: 1, alignItems: 'center', justifyContent: 'center'}
})
export default DrawerContent