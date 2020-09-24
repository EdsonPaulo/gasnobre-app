import Icon from "@expo/vector-icons/FontAwesome5"
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, general } from '../../../constants'
import authContext from '../../../contexts/auth/auth-context'

export default index = () => {

  const navigation = useNavigation()
  const { user } = useContext(authContext)

  return (
    <SafeAreaView style={[general.background]}>

      <View style={{ width: 130, height: 80, alignSelf: "center" }}>
        <Image style={{ width: "100%", height: "100%" }}
          resizeMode="contain" source={require("../../../assets/logo.png")} />
      </View>
      <Text style={{ fontSize: 20, fontFamily: 'RobotoCondensed_700Bold',textAlign: "center" }}>ADMINISTRAÇÃO</Text>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("orderStack")}>
            <Icon name="bullhorn" style={styles.optionIcon} size={35} />
            <Text style={styles.optionText}>Pedidos</Text>
          </RectButton>
          <RectButton style={[styles.option]} onPress={() => navigation.navigate("products")}>
            <Icon name="store-alt" style={styles.optionIcon} size={35} />
            <Text style={styles.optionText}>Produtos</Text>
          </RectButton>
        </View>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("customers")}>
            <Icon name="users" style={styles.optionIcon} size={35} />
            <Text style={styles.optionText}>Clientes</Text>
          </RectButton>
          <RectButton style={[styles.option]} onPress={() => navigation.navigate("profilePage")}>
            <Icon name="cog" style={styles.optionIcon} size={35} />
            <Text style={styles.optionText}>Configurações</Text>
          </RectButton>
        </View>
      </View>
      <StatusBar style="light" backgroundColor={colors.dark} translucent={false} />
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    alignItems: "center"
  },
  option: {
    flex: 1 / 2,
    width: "100%",
    height: 130,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 4,
    borderWidth: 1,
  },
  optionIcon: {
    color: colors.dark,
    marginBottom: 5
  },
  optionText: {
    fontFamily: 'RobotoCondensed_700Bold',

  }
})
