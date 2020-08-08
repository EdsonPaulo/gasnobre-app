import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
const { height } = Dimensions.get("window")
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
    */
    return (
        <SafeAreaView style={general.background}>
            <View style={{ flex: 3 / 3 }}>

                <Text style={{ fontSize: 20, margin: 20, }}>Olá, Edson Paulo</Text>
                <Text style={styles.homeTitle}>O QUE VAI PEDIR HOJE?</Text>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "gas" })}>
                        <Image style={{ width: "100%", height: "100%" }} resizeMode="contain" source={require("../../assets/gas-btn2.png")} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "agua" })}>
                        <Image style={{ width: "100%", height: "100%" }} resizeMode="contain" source={require("../../assets/agua-btn2.png")} />
                    </TouchableOpacity>
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
        fontSize: 16,
        fontWeight: "bold",
        color: colors.grayDark2,
        textAlign: "center",
        marginBottom: metrics.doubleBaseMargin

    },
    optionContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    option: {
        flex: 1 / 2,
        width: "100%",
        height: 110,
        // borderRadius: 8,
        //borderWidth: 1,
        //padding: metrics.baseMargin,
        // backgroundColor: colors.grayMedium,
    },
    historyContainer: {
        flex: 1.3 / 3,
        padding: metrics.baseMargin,
        marginHorizontal: metrics.doubleBaseMargin,
        borderWidth: 1,
        borderRadius: metrics.baseRadius,
        borderColor: colors.borderColor,
        backgroundColor: colors.grayLight
    },
    history: {
        padding: metrics.baseMargin,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        borderColor: colors.grayMedium,
        marginVertical: 3
    }
})

export default index