import React, { useContext, useState } from 'react'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'
import {
  View,
  ScrollView,
  ToastAndroid,
  Alert,
  Text,
  StyleSheet
} from 'react-native'

import { onRate, onShare } from '../services/utils'

import AuthContext from '../contexts/auth/auth-context'

import { colors, fonts, metrics } from '../constants' 

export default SideBar = () => {

  const navigation = useNavigation()
  const { user, role, logout } = useContext(AuthContext)
  const initials = user?.nome ? user?.nome[0] : null

  const [modalVisible, setModalVisible] = useState(false)

  const signOut = () => {
    Alert.alert(
      'Terminar Sessão', 'Deseja terminar sessão da sua conta?', [
      { text: 'Não', style: 'cancel' },
      { text: 'SIm', onPress: () => logout() },
    ], { cancelable: true })
  }

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <View>
          <Text>{initials}</Text>
        </View>
        <View>
          <Text color={colors.dark}>{user?.nome}</Text>
          <Text >
            {role === "customer" ? "Cliente" : "Gerente"}
          </Text>
          <Text >{user?.telefone || user?.email}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.optionsContainer}>
        <RectButton style={styles.btn} onPress={() => { navigation.navigate('home') }}>
          <View style={styles.rowView}>
            <MaterialCommunityIcons name='home-outline' style={styles.icons} />
            <Text>Página Inicial</Text>
          </View>
        </RectButton>

        <RectButton style={styles.btn} onPress={() => { navigation.navigate('profile') }}>
          <View style={styles.rowView}>
            <MaterialCommunityIcons name="account-outline" style={styles.icons} />
            <Text>Meu Perfil</Text>
          </View>
        </RectButton>
        {
          role !== "admin" ? null :
            <RectButton style={styles.btn} onPress={() => { navigation.navigate('customers') }}>
              <View style={styles.rowView}>
                <MaterialCommunityIcons name="car-back" style={styles.icons} />
                <Text>Clientes</Text>
              </View>
            </RectButton>
        }
        <RectButton style={styles.btn} onPress={() => { navigation.navigate('fretes') }}>
          <View style={styles.rowView}>
            <MaterialCommunityIcons name='clipboard-check-outline' style={styles.icons} />
            <Text> Meus Fretes </Text>
          </View>
        </RectButton>

        <RectButton style={styles.btn} onPress={() => { navigation.navigate('propostas') }}>
          <View style={styles.rowView}>
            <FontAwesome name="handshake-o" color={colors.dark} size={20} style={{ marginRight: 5 }} />
            <Text>Minhas Propostas</Text>
          </View>
        </RectButton>

        <RectButton style={styles.btn} onPress={() => { navigation.navigate('solicitacoes') }}>
        <View style={styles.rowView}>
            <MaterialCommunityIcons name='bullhorn-outline' style={styles.icons} />
            <Text>Fretes Disponíveis</Text>
          </View>
        </RectButton>

        <View style={styles.divider} />

        <RectButton style={styles.btn} onPress={onShare}>
        <View style={styles.rowView}>
            <MaterialCommunityIcons name='share-outline' style={styles.icons} />
            <Text>Compartilhar </Text>
          </View>
        </RectButton>

        <RectButton style={styles.btn} onPress={onRate}>
        <View style={styles.rowView}>
            <MaterialCommunityIcons name='star-outline' style={styles.icons} />
            <Text>Avalie-nos </Text>
          </View>
        </RectButton>

        <RectButton style={styles.btn} onPress={() => setModalVisible(true)}>
        <View style={styles.rowView}>
            <MaterialCommunityIcons name='help-circle-outline' style={styles.icons} />
            <Text>Ajuda e Suporte </Text>
          </View>
        </RectButton>

        <RectButton style={[styles.btn, { left: metrics.baseMargin, bottom: "10%", position: "absolute" }]} onPress={signOut}>
          <View style={styles.rowView}>
            <MaterialCommunityIcons name='power' style={styles.icons} />
            <Text>Terminar Sessão </Text>
          </View>
        </RectButton>
        {/**
        <Portal>
          <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
            <Dialog.Content>
              <View style={{ alignItems: "center", marginBottom: 15 }}>
                <MaterialCommunityIcons name='headphones' size={25} />
                <Text>Ajuda e Suporte</Text>
              </View>
              <Text>Se estiver em dificuldades, alguma dúvida ou sugestões, entre em contacto e fale conosco pelas vias:</Text>
              <Text style={{ marginTop: 10 }}>Whatsapp</Text>
              <Text>+244 942 682 194</Text>
              <Text style={{ marginTop: 10 }}>Endereço de Email</Text>
              <Text>deliverynobre@gmail.com</Text>
            <Dialog.Actions>
              <Button onPress={() => setModalVisible(false)}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
         */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  userContainer: {
    padding: metrics.doubleBaseMargin,
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    height: "auto",
    backgroundColor: "#EEE",
  },
  rowView: {

  },
  optionsContainer: {
    padding: metrics.baseMargin,
    flex: 1
  },
  icons: {
    color: colors.dark,
    fontSize: 26,
    marginRight: 3
  },
  btn: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: metrics.baseMargin,
    marginVertical: 1,
  },
})
