import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { general, metrics, constants, colors } from '../../constants'
import { CustomButton, CustomStatusBar } from '../../components'


const AddressPage = () => {

    let isMounted = true

    const [editing, setEditing] = useState(false)
    const [address, setAddress] = useState([])
    const address_item = {
        address_1: '',
        city: '',
        country: ''
    }

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
        return () => isMounted = false
    }, [])

    return (
        <SafeAreaView style={general.background}>
      <CustomStatusBar barStyle="light-content" style="light" backgroundColor={role === "customer" ? colors.accent  :  "#111"} translucent={false} />
 
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addressContainer: {

    },
    addAdressContainer: {

    }
})

export default AddressPage