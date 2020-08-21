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
    <SafeAreaView style={general.background}>
      <View>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("orders")}>
          <Icon name="box" style={styles.optionIcon} size={35} />
          <Text bold>Pedidos</Text>
        </RectButton>
        <RectButton style={[styles.option]} onPress={() => { }}>
          <Icon name="handshake" style={styles.optionIcon} size={35} />
          <Text bold>Produtos</Text>
        </RectButton>
      </View>
      <View>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("solicitacoes")}>
          <Icon name="bullhorn" style={styles.optionIcon} size={35} />
          <Text bold>Fretes Disponíveis</Text>
        </RectButton>
        <RectButton style={[styles.option]} onPress={() => navigation.navigate("profile")}>
          <Icon name="user-edit" style={styles.optionIcon} size={35} />
          <Text bold>Meu Perfil</Text>
        </RectButton>
      </View>
      <View>
        <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("profile")}>
          <Icon name="cog" style={styles.optionIcon} size={35} />
          <Text bold>Configurações</Text>
        </RectButton>
        <View style={{ flex: 1 / 2 }} />
      </View>
      <StatusBar style="dark" backgroundColor="#fff" translucent={false} />
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
