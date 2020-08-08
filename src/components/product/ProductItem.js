import React, { useState } from 'react'
import {
    View, StyleSheet,
    TouchableOpacity, Text,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, metrics, fonts, general } from '../../constants'
import PlaceholderImage from '../PlaceholderImage'

const ProductItem = ({ item, handleQuantity }) => {

    const navigation = useNavigation()
    const [quantity, setQuantity] = useState(0)

    const containerWidth = 160

    const changeQuantity = (add) => {
        let auxQuantity = add ? (quantity + 1) : (quantity - 1)
        setQuantity(auxQuantity)
        handleQuantity(auxQuantity)
    }

    return (
        <View activeScale={0.7} style={[general.card, styles.container, { width: containerWidth, maxWidth: 200, alignItems: "center" }]}
            onPress={() => navigation.navigate('product', { product: item })}>

            <View style={styles.productImageContainer}>
                <PlaceholderImage style={styles.productImage}
                    source={(item.images?.length > 0) ? { uri: item.images[0].src } : require('../../assets/noimage.png')} />
            </View>

            <View style={{height: "50%", justifyContent: "space-between"}}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
 
                <Text style={styles.price}>
                    {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.price)}
                </Text>

                <View>
                    {
                        quantity == 0 ?
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primaryDark }]}
                                    onPress={() => changeQuantity(true)}>
                                    <MaterialCommunityIcons size={20} color="#fff" name="plus" />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.btnContainer}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(false)}>
                                    <MaterialCommunityIcons size={20} color={colors.primaryDark} name="minus" />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 14, color: "#fff", marginHorizontal: 20 }}>{quantity}</Text>

                                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(true)}>
                                    <MaterialCommunityIcons size={20} color={colors.primaryDark} name="plus" />
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 240,
        borderRadius: metrics.doubleBaseRadius,
        marginVertical: metrics.smallMargin,
        marginHorizontal: metrics.baseMargin,
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 5,
    },
    productImageContainer: {
        width: '100%',
        height: "50%"
    },
    productImage: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 14,
        textTransform: 'capitalize',
        textAlign: 'center',
        //fontFamily: 'Lato',
    },
    price: {
        fontSize: 15,
        color: colors.primaryDark,
        fontWeight: 'bold',
        marginTop: 2,
    },
    btnContainer: {
        flexDirection: "row",
        height: 25,
        backgroundColor: colors.primaryDark,
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15
    },
    btn: {
        backgroundColor: "#fff", width: 25, height: 25,
        borderRadius: 30,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ProductItem