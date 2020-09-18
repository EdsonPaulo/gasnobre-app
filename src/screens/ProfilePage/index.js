import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useContext } from 'react'
import { Alert, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from "react-native-safe-area-context"
import { colors, general } from '../../constants'
import { CustomStatusBar } from "../../components"
import AuthContext from '../../contexts/auth/auth-context'
import styles from './styles'

export default index = () => {

  const navigation = useNavigation()
  const { logout, user } = useContext(AuthContext)
  const userInitials = user?.name?.split(" ")[0][0] + (user?.name?.split(" ")[1] ? user?.name?.split(" ")[1][0] : "")

  const Logout = () => {
    Alert.alert(
      'Terminar Sessão', 'Deseja terminar sessão da sua conta?', [
      { text: 'Não', style: 'cancel' },
      { text: 'SIm', onPress: () => logout() },
    ], { cancelable: true })
  }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar barStyle="light-content" style="light" backgroundColor={colors.accent} translucent={false} />

      <View style={styles.topContainer} />

      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 20, color: colors.dark }}>{userInitials || null}</Text>
        </View>
        <View style={styles.user}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userDetails}>{user?.phone}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>>
        <Text style={styles.sectionTitle}>Meus Dados</Text>
        <RectButton activeOpacity={0.7} style={styles.btn} onPress={() => { navigation.navigate('profileDetails') }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Ionicons name='ios-person' style={styles.icons} />
            <Text style={styles.textStyle}>Dados Pessoais</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </RectButton>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => { navigation.navigate('address') }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialCommunityIcons name='map' style={styles.icons} />
            <Text style={styles.textStyle}> Meus Endereços </Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => { navigation.navigate('kamba') }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <Ionicons name='ios-cart' style={styles.icons} />
            <Text style={styles.textStyle}>Planos de Serviços</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Mais</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => { onShare() }}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>

            <MaterialCommunityIcons name='share-variant' style={styles.icons} />
            <Text style={styles.textStyle}>Partilhar </Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialCommunityIcons name='account-supervisor' style={styles.icons} />
            <Text style={styles.textStyle}>Ajuda e Suporte </Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} style={styles.btn} onPress={() => Logout()}>
          <View style={{ flexDirection: "row", alignItems: 'center' }}>
            <MaterialCommunityIcons name='logout' style={styles.icons} />
            <Text style={styles.textStyle}> Terminar Sessão </Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
