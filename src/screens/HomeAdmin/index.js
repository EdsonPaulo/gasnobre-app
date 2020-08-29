import React, { useContext, useState, useEffect } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import Icon from "@expo/vector-icons/FontAwesome5"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import authContext from '../../contexts/auth/auth-context'

import { StyleSheet } from 'react-native'

import { colors, metrics, general, fonts, constants } from '../../constants'
import api from '../../services/api'

export default index = () => {

  const navigation = useNavigation()
  const { user } = useContext(authContext)

  return (
    <SafeAreaView style={[general.background, { justifyContent: "center", padding: 25, alignItems: "center" }]}>
      <View style={{ flexDirection: "row", margin: 5 }}>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("orders")}>
          <Icon name="bullhorn" style={styles.optionIcon} size={35} />
          <Text bold>Pedidos</Text>
        </RectButton>
        <RectButton style={[styles.option]} onPress={() => navigation.navigate("products")}>
          <Icon name="store-alt" style={styles.optionIcon} size={35} />
          <Text bold>Produtos</Text>
        </RectButton>
      </View>
      <View style={{ flexDirection: "row", margin: 5 }}>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("plan")}>
          <Icon name="handshake" style={styles.optionIcon} size={35} />
          <Text bold>Plano Kamba</Text>
        </RectButton>
        <RectButton style={[styles.option]} onPress={() => navigation.navigate("customers")}>
          <Icon name="users" style={styles.optionIcon} size={35} />
          <Text bold>Clientes</Text>
        </RectButton>
      </View>
      <View style={{ flexDirection: "row", margin: 5 }}>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("profile")}>
          <Icon name="cog" style={styles.optionIcon} size={35} />
          <Text bold>Configurações</Text>
        </RectButton>
        <View style={{ flex: 1 / 2 }} />
      </View>
      <StatusBar style="light" backgroundColor={colors.dark} translucent={false} />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  option: {
    flex: 1 / 2,
    width: "100%",
    height: 130,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 6,
    borderWidth: 1,
  },
  optionIcon: {
    color: colors.dark,
    marginBottom: 5
  },
})
