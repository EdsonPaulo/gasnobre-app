import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

import AuthContext from '../../contexts/auth/auth-context'
import { colors, metrics, general } from '../../constants'
import { LoadingSpin } from '../../components'
import api from '../../services/api'

export default index = () => {

  let isMounted = true
  const navigation = useNavigation()
  const { user, token, role } = useContext(AuthContext)

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true)
      setPage(1)
      getOrders()
    }
  }, [])

  const getOrders = () => {
    if (loading) return
    if (total > 0 && orders.length >= total) {
      setLoading(false)
      setRefreshing(false)
      return
    }
    setLoading(true)
    api(token).get(`/orders?page=${page}`)
      .then(response => {
        if (isMounted) {
          setTotal(response.data?.total)
          if (refreshing)
            setOrders(response.data?.data)
          else
            setOrders([...orders, ...response.data?.data])
          setPage(page + 1)
        }
      })
      .catch(error => {
        console.log(error + ' ==> erro')
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false)
          setRefreshing(false)
        }
      })
  }

  useEffect(() => {
    getOrders()
    return () => isMounted = false
  }, [])

  const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

  const Order = ({ order }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.orderContainer} onPress={() => navigation.navigate('orderDetails', { order })}>
      <View style={styles.rowContainer}>
        <Text style={[styles.statusText]}>Referência: <Text style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{order.number}</Text></Text>
        <Text style={styles.statusText}>{convertDate(order.createdAt)}</Text>
      </View>

      <View style={styles.rowContainer}>
        <Text style={styles.statusText}>Estado:
        <Text style={{
            fontWeight: "bold",
            color: order.status === 'pendente' ? colors.success
              : order.status === 'cancelado' ? colors.alert : colors.dark
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
      onEndReached={getOrders}
      onEndReachedThreshold={0.2}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <Text style={{ textAlign: "right", color: colors.grayDark }}>Total: {total} | Mostrando: {orders.length}</Text>
      }
      ListFooterComponent={
        orders.length !== total && loading ?
          <View style={{ margin: metrics.doubleBaseMargin }}>
            <ActivityIndicator color={colors.dark} size="small" />
          </View> : null
      }
    />
  )

  const renderEmptyOrders = () => (
    <View style={styles.container}>
      <Icon name="file-find" size={40} color={colors.grayDark} />
      <Text style={{ textAlign: 'center', fontSize: 18, marginTop: 5, color: colors.grayDark }}>Sem pedidos registados!</Text>
    </View>
  )

  return (
    <SafeAreaView style={general.background}>
      <View style={{ flex: 1 }}>
        {
          (loading && orders.length == 0) ? <LoadingSpin />
            : orders.length > 0 ? renderOrdersList()
              : (total == 0 && !loading) ? renderEmptyOrders() : null
        }
      </View>
      <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
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