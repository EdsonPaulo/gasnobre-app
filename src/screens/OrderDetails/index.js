import React, { useState } from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRoute, useNavigation } from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { colors, metrics, general, fonts } from "../../constants"
import { CustomButton } from "../../components"

export default index = () => {

  const route = useRoute()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const order = route.params?.order
  let cart = []

  console.log(order)

  const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)
  const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

  return (
    <SafeAreaView style={[general.background, { backgroundColor: 'white' }]}>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <Text>Estado:
                    <Text style={[styles.statusText, {
              color: order.status === 'concluído' ? 'lightgreen'
                : order.status === 'cancelado' ? colors.alert : colors.primaryDark
            }]}> {order.status}
            </Text></Text>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{convertDate(order.createdAt)}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <View>
            {
              order?.products.map(item => (
                <View key={item._id}>
                  <Text style={{ textTransform: 'capitalize' }}>{item.product.name}</Text>
    
                  <View style={styles.textContainer}>
                    <Text> {item.quantity} x {item.product.price}Kz</Text>
                    <Text>{transformPrice(item.product.subtotal)} </Text>
                  </View>
                </View>
              ))
            }
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custo</Text>
          <View style={styles.textContainer}>
            <Text>Subtotal</Text>
            <Text>{transformPrice(order.subtotal)} </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Taxa de Entrega</Text>
            <Text>{transformPrice(order.tax)} </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.totalText}>Total </Text>
            <Text style={styles.totalText}> {transformPrice(order.total)} </Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entrega</Text>
          <Text>{order.customer?.name}</Text>
          <Text>{order.address}</Text>
          <Text>Angola - {order.city}</Text>
          <Text>+244 {order.customer?.phone}</Text>
        </View>

        <CustomButton title="Voltar a pedir" primary onPress={() => navigation.navigate("checkout", { cart: [...order.products], subtotal: order.subtotal || 0 })} />
      </ScrollView>
      <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.baseMargin
  },
  sectionTitle: {
    color: colors.grayDark,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'RobotoCondensed_400Regular',
    marginBottom: metrics.baseMargin
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    elevation: 1,
    padding: metrics.baseMargin,
    marginVertical: metrics.smallMargin,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: metrics.baseRadius
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2
  },
  totalText: {
    fontSize: fonts.input,
    fontWeight: 'bold'
  },
  statusText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  }
})
