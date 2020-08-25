import React from "react"
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useRoute } from "@react-navigation/native"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { colors, metrics, general, fonts } from "../../../constants"

export default index = () => {

    const route = useRoute()
    const order = route.params.order

    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)
    const convertDate = date => console.log(date)//Intl.DateTimeFormat('pt-AO').format(new Date(date))

    return (
        <SafeAreaView style={[general.background, { backgroundColor: 'white' }]}>

            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{convertDate(order.createdAt)}</Text>
                    <Text>Estado:
                    <Text style={[styles.statusText, {
                            color: order.status === 'concluído' ? 'lightgreen'
                                : order.status === 'cancelado' ? colors.alert : colors.grayLight
                        }]}> {order.status}
                        </Text></Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Produtos</Text>
                    <View>
                        {
                            order.line_items.map(product => (
                                <View key={product.id}>
                                    <Text style={{ textTransform: 'capitalize' }}>{product.title}</Text>
                                    <View style={styles.textContainer}>
                                        <Text> {product.quantity} x {product.price}</Text>
                                        <Text>{transformPrice(product.subtotal)} </Text>
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
                        <Text>{transformPrice(order.total_tax)} </Text>
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
            </ScrollView>
            <StatusBar style="light" backgroundColor={colors.primary} translucent={false} />
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
