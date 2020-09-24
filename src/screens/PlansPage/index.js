import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomStatusBar } from '../../components'
import { colors, general } from '../../constants'
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
      <CustomStatusBar barStyle="light-content" style="light" backgroundColor={role === "customer" ? colors.accent  :  "#111"} translucent={false} />

      <Text>Plano</Text>
      <Text>{JSON.stringify(user)}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})

export default Plan