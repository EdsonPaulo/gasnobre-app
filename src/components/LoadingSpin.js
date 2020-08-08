import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'

import { colors } from '../constants'

const LoadingSpin = ({text}) => {

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.bgColor
        }}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={{ fontSize: 16 }}> {text || "Carregando.."}</Text>
        </View>
    )
}


export default LoadingSpin