import React, { useState, useEffect, useContext } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import AuthContext from '../../../contexts/auth/auth-context'
import { colors, metrics, general } from '../../../constants'
import { LoadingSpin } from '../../../components'
import api from '../../../services/api'

export default index = () => {

  let isMounted = true
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const getOrders = () => {
    api.get(`/orders?customer=${user}`)
      .then(response => {
        if (isMounted) {
          setOrders(response.data)
          setLoading(false)
        }
      })
      .catch(error => {
        console.error(error)
        if (isMounted)
          setLoading(false)
      })
  }

  useEffect(() => {
    isMounted = true
    getOrders()
    return () => isMounted = false
  }, [])

  const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

  const Order = ({ order }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.orderContainer} onPress={() => navigation.navigate('orderDetails', { order })}>
      <View style={styles.rowContainer}>
        <Text style={styles.statusText}>Pedido nº {order.number}</Text>
        <Text style={styles.statusText}>{convertDate(order.createdAt)}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.statusText}>Estado:
        <Text style={{
            fontWeight: "bold",
            color: order.status === 'processing' ? 'green'
              : order.status === 'canceled' ? colors.alert : colors.dark
          }}> {order.status}
          </Text></Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.primaryDark }}>
          {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const renderOrdersList = () => (
    <FlatList contentContainerStyle={{ padding: metrics.baseMargin }}
      data={orders}
      renderItem={({ item }) => <Order order={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  const renderEmptyOrders = () => (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 22, color: colors.grayDark }}>Sem pedidos registados!</Text>
    </View>
  )


  return (
    <SafeAreaView style={general.background}>
      <View style={{ flex: 1 }}>
        {
          loading ? <LoadingSpin /> :
            orders.length > 0 ? renderOrdersList() : renderEmptyOrders()
        }
      </View>
      <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderContainer: {
    flex: 1,
    paddingVertical: metrics.smallMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
    borderRadius: metrics.baseRadius,
    borderColor: colors.borderColor,
    marginVertical: metrics.smallMargin
  },
  rowContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: metrics.smallMargin
  },
  statusText: {
    fontSize: 13,
    textTransform: 'capitalize',
  }
})