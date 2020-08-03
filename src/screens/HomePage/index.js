import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
const { height } = Dimensions.get("window")
import {
    Text,
    View,
    Dimensions,
    AsyncStorage,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'

import { colors, metrics, general, fonts, constants } from '../../constants'
import { HeaderBar, ProductHorizontalList, CategoryList } from '../../components'

const index = () => {

    const navigation = useNavigation()
    //const context = useContext(ShopContext)
    const [cart, setCart] = useState([])

    //obter o carrinho do armazenamento
    const getDataCart = async () => {
        try {
            const datacart = await AsyncStorage.getItem(constants.CART_KEY)
            if (datacart)
                context.cart = [...JSON.parse(datacart)]
            //console.log('dados lidos context: ' + context.cart)
        }
        catch (e) {
            console.error('Ocorreu um erro ao obter produtos do carrinho!' + e)
        }
    }

    //salvar alteracoes do carrinho no armazenamento
    const saveDataCart = async () => {
        try { await AsyncStorage.setItem(constants.CART_KEY, JSON.stringify(cart)) }
        catch (e) { console.error('Ocorreu um erro ao salvar dados!' + e) }
    }
    /** 
        useEffect(() => {
            getDataCart()
            return () => { }
        }, [])
    
        useEffect(() => {
            setCart(context.cart)
            saveDataCart()
        }, [context.cart])

            <HeaderBar raised title="Carnesul" home />

    */
    return (
        <SafeAreaView style={general.background}>
            <View style={styles.homeHeader}>
                <Text style={{fontSize: 16, color: "#fff", fontWeight: "bold", marginBottom: 5,}}>Olá, Edson Paulo</Text>
                <View style={styles.addressContainer}>
                    <Text>O seu endereço actual é: </Text>
                    <Text>AV. Deolinda Rodrigues, Rua E, Casa nº 21, Lua... </Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.homeTitle}>O QUE VAI PEDIR HOJE?</Text>
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "gas" })}>
                        <Text>GÁS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "agua" })}>
                        <Text>ÁGUA</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: height - 260,
        flex: 1,
        bottom: 0,
        width: "100%",
        backgroundColor: colors.bgColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 15,
    },
    homeHeader: {
        height: 150,
        backgroundColor: colors.primaryDark,
        paddingHorizontal: 10,
        justifyContent: "center"
        // elevation: 5
    },
    addressContainer: {
        backgroundColor: "#ffffff29",
        padding: 15,
        borderRadius: metrics.baseRadius
    },
    homeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.primaryDark,
        textAlign: "center",
        marginBottom: metrics.baseMargin
    },
    optionContainer: {
        flex: 1
    },
    option: {
        flex: 1 / 2,
        width: "100%",
        padding: metrics.baseMargin,
        marginVertical: metrics.smallMargin,
        backgroundColor: colors.grayMedium,
    },
})

export default index