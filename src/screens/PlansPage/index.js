import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { general, constants, colors } from '../../constants'
import { CustomButton, HeaderBar } from '../../components'
import AuthContext from '../../contexts/auth/auth-context'


const Plan = () => {

  let isMounted = true
  const { user, token } = useContext(AuthContext)
  const [editing, setEditing] = useState(false)
  const [address, setAddress] = useState([])

 

  useEffect(() => {
    return () => isMounted = false
  }, [])

  return (
    <SafeAreaView style={general.background}>
      <Text>Plano</Text>
      <Text>{JSON.stringify(user)}</Text>
      <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})

export default Plan