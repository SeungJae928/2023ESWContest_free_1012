import React from 'react';
import { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export type values = {
    title: string
    buttonName: string
    value1?: string
    value2?: string
    value3?: string
}

export const HomeComp: FC<values> = ({
    title, buttonName, value1, value2, value3
    }) => {
    return (
        <TouchableOpacity>
            <Text>테스트 데이터입니다.</Text>
        </TouchableOpacity>
    )
}