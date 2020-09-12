import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Icon from "@expo/vector-icons/FontAwesome"
import { RectButton } from 'react-native-gesture-handler'
const { height, width } = Dimensions.get("window")
import {
  Text,
  View,
  Image,
  Dimensions,
  AsyncStorage,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from 'react-native'

import styles from './styles'

import { colors, metrics, general, fonts, } from '../../constants'
import authContext from '../../contexts/auth/auth-context'
import { SwiperCards } from '../../components'
import api from '../../services/api'

const index = () => {
  let isMounted = true
  const navigation = useNavigation()
  const { user, token } = useContext(authContext)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])


  const getOrders = () => {

    setLoading(true)
    api(token).get(`/orders?perPage=4`)
      .then(response => {
        if (isMounted)
          setOrders(response.data?.data)
      })
      .catch(error => {
        console.log(error + ' ==> erro')
      })
      .finally(() => {
        if (isMounted)
          setLoading(false)
      })
  }

  useEffect(() => {
    getOrders()
    return () => isMounted = false
  }, [])

  const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

  const handlePlanoKamba = () => {
    user?.kambaPlan?.active ? console.log("SHOW KAMBA INFO")
      : user?.kambaPlan?.left == 0 ? console.log("SHOW END PLAN INFO")
        : user?.kambaPlan?.left <= 5 ? console.log("SHOW left days INFO") : null
    navigation.navigate("kamba")
  }

  return (
    <SafeAreaView style={[general.background]}>
      <View style={styles.container}>
        <View style={{}}>
          <View style={{ marginBottom: 30, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          

            <View style={{ width: 130, height: 80, }}>
              <Image style={{ width: "100%", height: "100%" }}
                resizeMode="contain" source={require("../../assets/logo-transparent.png")} />
            </View>

            <TouchableOpacity onPress={() => { }}>
              <Icon name="share-square-o" color="darkblue" size={25} />
            </TouchableOpacity>
          </View>

          <View style={styles.banners}>
            <SwiperCards />
          </View>
        </View>

        <View style={styles.optionContainer}>
          <TouchableOpacity activeOpacity={0.7} style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("storeStack")}>
            <Icon name="bullhorn" color={colors.dark} size={30} />
            <Text style={styles.optionTitle}>Pedir Agora</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.option} onPress={handlePlanoKamba}>
            <View style={{ position: "absolute", top: 7, right: 7 }}>
              {
                !user?.kambaPlan?.active ? <Icon name="info-circle" color={colors.dark} size={20} />
                  : user?.kambaPlan?.left == 0 ? <Icon name="warning" color={colors.alert} size={20} />
                    : user?.kambaPlan?.left <= 5 ? <Icon name="warning" color={colors.warning} size={20} />
                      : user?.kambaPlan?.debt > 0 ?
                        <Text style={{ fontWeight: 'bold', fontSize: 11, color: colors.primaryDark }}>
                          - {user?.kambaPlan?.debt}Kz
                                    </Text>
                        : null
              }
            </View>
            <Icon name="handshake-o" color={colors.dark} size={30} />
            <Text style={styles.optionTitle}>Plano Kamba</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.historyContainer}>
          <Text style={{ textAlign: "center", marginBottom: 5 }}>Últimos de Pedidos</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 5 }}>
            {
              orders.map(order => (
                <TouchableOpacity key={order.number} onPress={() => navigation.navigate("orderDetails", { order })} activeOpacity={0.7} style={styles.history}>
                  <View style={styles.rowContainer}>
                    <Text style={styles.statusText}>{order.number}</Text>
                    <Text style={styles.statusText}>{order.orderDate}</Text>
                  </View>

                  <View style={styles.rowContainer}>
                    <Text style={[styles.statusText, {
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: order.status === 'concluido' ? 'green'
                        : order.status === 'cancelado' ? colors.alert : colors.primary
                    }]}>
                      {order.status}
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.primaryDark }}>
                      {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            }
            <RectButton style={styles.seeMore} onPress={() => navigation.navigate("orderStack")}>
              <Text>Ver mais</Text>
            </RectButton>
          </ScrollView>



        </View>
      </View>
      <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
    </SafeAreaView>
  )
}

export default index