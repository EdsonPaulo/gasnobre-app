import React, { useState, useRef, useEffect } from 'react'
import { Text, View, TextInput, Alert, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Picker } from '@react-native-community/picker'
import { StatusBar } from 'expo-status-bar'

import { colors, metrics, general, constants, fonts } from '../../../constants'
import { HeaderBar, CustomButton } from '../../../components'
import api from '../../../services/api'
import styles from './styles'

const { height } = Dimensions.get('window')

const index = () => {
    let isMounted = true
    const navigation = useNavigation()
    const route = useRoute()
    const cart = route.params.cart
    const subtotal = route.params.subtotal
    const [tax, setTax] = useState(5000)
    const [address, setAddress] = useState(['Rua E - Bairro Palanca - Luanda', 'Rua 14 - Bairro Prenda - Luanda'])
    const [deliveryAddress, setDeliveryAddress] = useState(address[0] || '')
    const [submiting, setSubmiting] = useState(false)

    const [orderDetails, setOrderDetails] = useState({
        billing: {
            first_name: '',
            last_name: '',
            address_1: deliveryAddress,
            country: "AO",
            email: '',
            phone: ''
        },
        shipping: {
            first_name: '',
            last_name: '',
            address_1: deliveryAddress,
            country: "AO"
        },
        shipping_tax: '5000',
        customer_id: 2,
        line_products: []
    })


    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

    //carregar enderecos do armazenamento
    const getAddress = async () => {
        try {
            const data = await AsyncStorage.getItem(constants.ADDRESS_KEY)
            if (data && isMouted)
                setAddress(JSON.parse(data))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAddress()
        return () => isMounted = false
    }, [])

    //finalizar compra/pedido
    const makeOrder = () => {
        let listItem = []
        let order = orderDetails

        cart.map(element => {
            listItem.push({
                product_id: element.id,
                quantity: element.quantity
            })
        })

        order.line_products = listItem

        setSubmiting(true)
        console.log(order)

        api.post('orders', order).then(response => {
            console.log(response.data)
        }).catch(response => {
            console.log(response)
        }).finally(() => setSubmiting(false))
    }

    return (
        <SafeAreaView style={general.background}>
            <ScrollView contentContainerStyle={{ paddingVertical: 10 }} showsVerticalScrollIndicator={false}>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionTitleContainer}>
                        <Icon name='list' size={15} color={colors.accent} />
                        <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
                    </View>
                    <View style={styles.section}>
                        {

                            cart.map(product => (
                                <View key={product.id} style={styles.textContainer} key={product.id}>
                                    <Text style={{ textTransform: 'capitalize' }}>{product.title} (x{product.quantity})</Text>
                                    <Text>{transformPrice(product.price * product.quantity)}
                                    </Text>
                                </View>
                            ))
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
                            <Text style={styles.labelStyle}>Nome Completo</Text>
                            <TextInput returnKeyType='next'
                                onChangeText={value => {
                                    setOrderDetails(
                                        orderDetails => {
                                            orderDetails.billing.first_name = value
                                            orderDetails.shipping.first_name = value
                                            return ({ ...orderDetails })
                                        }
                                    )
                                }}
                                textContentType='name' style={styles.inputStyle} placeholder="Nome e sobrenome" />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Telefone (obrigatório)</Text>
                            <TextInput returnKeyType='next' onChangeText={value => {
                                setOrderDetails(
                                    orderDetails => {
                                        orderDetails.billing.phone = value
                                        return ({ ...orderDetails })
                                    }
                                )
                            }}
                                keyboardType='phone-pad' style={styles.inputStyle} placeholder="Para contacto na entrega" />
                        </View>
                        {
                            address.length === 0 ?
                                <TouchableOpacity onPress={navigation.navigate('address')} activeOpacity={0.7} style={styles.btnAdress}>
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

                                        {address.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}

                                    </Picker>
                                </View>
                        }
                        <View style={styles.inputContainer}>
                            <Text style={styles.labelStyle}>Observação do pedido (opcional)</Text>
                            <TextInput returnKeyType='done' multiline style={[styles.inputStyle, { height: 75 }]}
                                placeholder="Observação sobre o pedido..." />
                        </View>
                    </View>
                </View>
                <CustomButton loading={submiting} primary title="Fazer Pedido" icon="ios-checkmark" style={{ margin: 20 }} onPress={() => makeOrder()} />
            </ScrollView>
            <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
        </SafeAreaView>
    )
}


export default index