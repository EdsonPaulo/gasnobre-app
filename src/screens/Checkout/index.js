import Icon from '@expo/vector-icons/FontAwesome5'
import { Picker } from '@react-native-community/picker'
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, AsyncStorage, Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomStatusBar } from '../../components'
import { colors, constants, general } from '../../constants'
import authContext from '../../contexts/auth/auth-context'
import api from '../../services/api'
import styles from './styles'


const { height } = Dimensions.get('window')

const index = () => {
  let isMounted = true
  const { user, token } = useContext(authContext)
  const navigation = useNavigation()
  const route = useRoute()
  const cart = route.params.cart
  const subtotal = route.params.subtotal
  const [tax, setTax] = useState(1350)
  const [address, setAddress] = useState(['Rua E - Bairro Palanca - Luanda', 'Rua 14 - Bairro Prenda - Luanda'])
  const [deliveryAddress, setDeliveryAddress] = useState(address[0] || '')
  const [orderObs, setOrderObs] = useState('')
  const [loading, setLoading] = useState(false)

  const [orderDetails, setOrderDetails] = useState({
    tax,
    subtotal,
    products: [],
    debit: false,
    obs: orderObs,
    total: subtotal + tax,
  })

  const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

  //carregar endereços do armazenamento
  const getAddress = async () => {
    try {
      const data = await AsyncStorage.getItem(constants.ADDRESS_KEY)
      if (data && isMounted)
        setAddress(JSON.parse(data))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    //  getAddress()

    return () => isMounted = false
  }, [])

  //finalizar compra/pedido
  const makeOrder = () => {
    let products = []
    let order = orderDetails
    setLoading(true)
    cart.map(product => {
      if (product.product)
        product = { quantity: product.quantity, ...product.product }
      console.log(product._id)
      products.push({
        product: product._id,
        quantity: product.quantity
      })
    })
    order.products = [...products]
    console.log(order)
    api(token).post('/orders', order).then(response => { 
      Alert.alert("Sucesso", response.data.message)
      navigation.navigate("orders")
    }).catch(error => {
      console.log(error, error?.response?.data)
    }).finally(() => setLoading(false))
  }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar barStyle="light-content" style="light" backgroundColor={colors.accent} translucent={false} />

      <ScrollView contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Icon name='list' size={15} color={colors.accent} />
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          </View>
          <View style={styles.section}>
            {
              cart.map(product => {
                if (product.product) product = { quantity: product.quantity, ...product.product }
                return (
                  <View key={product._id} style={styles.textContainer}>
                    <Text style={{ textTransform: 'capitalize' }}>
                      {product.name} {product.weight <= 0.99 ? `${product.weight * 1000}ml` : `${product.weight}L`} (x{product.quantity})
                                    </Text>
                    <Text>{transformPrice(product.price * product.quantity)}
                    </Text>
                  </View>
                )
              }
              )
            }
            <View style={[styles.textContainer, { marginTop: 15 }]}>
              <Text>Subtotal</Text>
              <Text>{transformPrice(subtotal)} </Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Taxa de Entrega</Text>
              <Text>{transformPrice(tax)} </Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.totalText}>Total </Text>
              <Text style={styles.totalText}> {transformPrice(subtotal + tax)} </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Icon name='info-circle' size={15} color={colors.accent} />
            <Text style={styles.sectionTitle}>Detalhes da Entrega</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Nome do Cliente</Text>
              <TextInput returnKeyType='next'
                value={user?.name}
                editable={false}
                onChangeText={value => {
                  setOrderDetails(
                    orderDetails => {
                      return ({ ...orderDetails })
                    }
                  )
                }}
                textContentType='name' style={[styles.inputStyle, { borderWidth: 0 }]} placeholder="Nome e sobrenome" />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Telefone (obrigatório)</Text>
              <TextInput returnKeyType='next' editable={false}
                value={"+244"+user?.phone}
                onChangeText={value => {
                  setOrderDetails(
                    orderDetails => {
                      return ({ ...orderDetails })
                    }
                  )
                }}
                keyboardType='phone-pad' style={[styles.inputStyle, { borderWidth: 0 }]} placeholder="Para contacto na entrega" />
            </View>
            {
              user?.address?.length === 0 ?
                <TouchableOpacity onPress={() => navigation.navigate('address')} activeOpacity={0.7} style={styles.btnAdress}>
                  <Icon name="plus-circle" color={colors.grayDark} size={20} />
                  <Text style={{ marginTop: 2 }}>Adicionar Endereço</Text>
                </TouchableOpacity>
                :
                <View style={styles.inputContainer}>
                  <Text style={styles.labelStyle}>Endereço de entrega</Text>
                  <Picker selectedValue={deliveryAddress}
                    itemStyle={{ borderWidth: 1 }}
                    style={{ height: 35, borderWidth: 5, borderRadius: 5, borderColor: colors.magenta, backgroundColor: colors.grayLight }}
                    onValueChange={(itemValue, itemIndex) => setDeliveryAddress(itemValue)}>

                    {user?.address?.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}

                  </Picker>
                </View>
            }
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Observação do pedido (opcional)</Text>
              <TextInput returnKeyType='done' multiline style={[styles.inputStyle, { height: 75 }]}
                onChangeText={value => setOrderObs(value)}
                placeholder="Qualquer detalhe ou observação sobre o pedido..." />
            </View>
          </View>
        </View>
        <CustomButton loading={loading} primary title="Fazer Pedido" icon="ios-checkmark" style={{ margin: 20 }} onPress={() => makeOrder()} />
      </ScrollView>
        </SafeAreaView>
  )
}


export default index