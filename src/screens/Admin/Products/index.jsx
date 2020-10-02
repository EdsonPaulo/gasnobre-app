import { Entypo } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions, FlatList,
  InteractionManager,
  RefreshControl, StyleSheet, Text, View
} from 'react-native'
import { Modalize } from 'react-native-modalize'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, LoadingSpin } from '../../../components'
import { colors, fonts, general, metrics } from '../../../constants'
import authContext from '../../../contexts/auth/auth-context'
import api from '../../../services/api'

//const data = require("../../services/mock/mock.json")

export default index = () => {
  let isMounted = true
  const route = useRoute()
  const { token } = useContext(authContext)

  const modalizeRef = useRef(null)
  const navigation = useNavigation()
  const { width, height } = Dimensions.get('window')
  const [interactionsComplete, setInteractionsComplete] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  const [products, setProducts] = useState([])

  const openModal = () => modalizeRef.current?.open()

  const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true)
      setPage(1)
      getProducts()
    }
  }, [])

  const getProducts = () => {
    if (loading) return
    if (total > 0 && products.length >= total) {
      setLoading(false)
      setRefreshing(false)
      return
    }
    setLoading(true)
    api(token).get(`/products?page=${page}`)
      .then(response => {
        if (isMounted) {
          setTotal(response.data?.total)
          if (refreshing)
            setProducts(response.data?.data)
          else
            setProducts([...products, ...response.data?.data])
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
    InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true)
    }).then(() => {
      isMounted = true
      getProducts()
    })
    return () => isMounted = false
  }, [])

const renderItem = product => (
  <View>
    <Text>{product.name}</Text>
  </View>
)

  const renderProductsList = () => {
    if (loading && products.length == 0)
      return <LoadingSpin />
    return (
      <FlatList bounces 
        data={products}
        contentContainerStyle={{ paddingVertical: 15 }}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={getProducts}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          products.length !== total && loading ?
            <View style={{ margin: metrics.doubleBaseMargin }}>
              <ActivityIndicator color={colors.dark} size="small" />
            </View> : null
        }
      />
    )
  }

 
  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Entypo name="emoji-sad" size={40} color={colors.grayDark} />
      <Text style={{ marginVertical: 4, color: colors.grayDark }}>Falha ao carregar os produtos.</Text>
      <Text style={{ color: colors.grayDark }}>Verifique a sua internet ou tente mais tarde!</Text>
    </View>
  )

  if (!interactionsComplete) { return <LoadingSpin /> }

  return (
    <SafeAreaView style={general.background}>
      <View style={styles.scene}>
        {
          (total == 0 && !loading)
            ? renderEmpty()
            : renderProductsList()
        }
       
        <Modalize ref={modalizeRef} rootStyle={{ elevation: 5 }} modalHeight={height - 120}
          FooterComponent={
            <CustomButton primary style={styles.makeOrderButton} rounded
              onPress={() => navigation.navigate("checkout", { cart, subtotal })}

              title={`Fazer Pedido (${transformPrice(subtotal)})`} />
          }>
         
        </Modalize>
      </View>
      <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
    </SafeAreaView>
  )
}
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  }, 
  categoryListContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'flex-end',
  },
  categoryItem: {
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    paddingHorizontal: metrics.baseMargin,
  },
  categoryItemText: {
    fontSize: fonts.input,
    textTransform: 'capitalize',
    color: 'white',
    fontFamily: 'RobotoCondensed_400Regular'
  },
  makeOrderButton: {
    width: 250,
    height: 40,
    marginVertical: 30,
    alignSelf: "center"
  }
})