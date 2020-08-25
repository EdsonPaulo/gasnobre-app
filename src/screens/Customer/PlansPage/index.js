import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { general, constants, colors } from '../../../constants'
import { CustomButton, HeaderBar } from '../../../components'


const Plan = () => {

    let isMounted = true

    const [editing, setEditing] = useState(false)
    const [address, setAddress] = useState([])
   

    const getAddress = async () => {
        try {
            const data = await AsyncStorage.getItem(constants.ADDRESS_KEY)
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {

        }
    }

    const saveAddress = async () => {
        try {
            const data = await AsyncStorage.setItem(constants.ADDRESS_KEY, JSON.stringify(address))
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {

        }
    }

    useEffect(() => {
        getAddress()
        return () => isMounted = false
    }, [])

    return (
        <SafeAreaView style={general.background}>

            <Text>Plano</Text>
            <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   
})

export default Plan