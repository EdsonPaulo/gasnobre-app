import React, { useState } from 'react'
import {
    View, StyleSheet,
    TouchableOpacity, Text,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, metrics, fonts, general } from '../../constants'
import PlaceholderImage from '../PlaceholderImage'

const ProductHorizontalItem = ({ item, handleQuantity }) => {

    const [quantity, setQuantity] = useState(0)

    const changeQuantity = (add) => {
        let auxQuantity = add ? (quantity + 1) : (quantity - 1)
        setQuantity(auxQuantity)
        handleQuantity(auxQuantity, item)
    }

    return (
        <View  style={[general.card, styles.productContainer]}>
            <View style={styles.productImage}>
                <PlaceholderImage style={styles.productImage}
                    source={item.image ? { uri: item.image} : require('../../assets/noimage.png')} />
            </View>
            <View style={styles.productInfoContainer}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>
                    {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.price)}
                </Text>
                <View>
                {
                    quantity == 0 ?
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: "#E37E24" }]}
                                onPress={() => changeQuantity(true)}>
                                <MaterialCommunityIcons size={20} color="#fff" name="plus" />
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.btnContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(false)}>
                                <MaterialCommunityIcons size={20} color="#E37E24" name="minus" />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 14, color: "#fff", marginHorizontal: 20 }}>{quantity}</Text>

                            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(true)}>
                                <MaterialCommunityIcons size={20} color="#E37E24" name="plus" />
                            </TouchableOpacity>
                        </View>
                }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    // Products
    productContainer: {
        height: 150,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: colors.white,
        marginHorizontal: metrics.baseMargin,
        marginBottom: metrics.smallMargin,
        marginTop: metrics.baseMargin,
    },
    productImage: {
        width: 150,
        height: '100%'
    },
    productInfoContainer: {
        justifyContent: 'space-between',
        alignItems: "center",
        height: "100%",
        paddingVertical: metrics.smallMargin,
        flex: 1
    },
    productTitle: {
        fontSize: fonts.input,
        textTransform: 'capitalize',
        //  fontFamily: 'Lato'
    },
    productPrice: {
        fontSize: fonts.medium,
        fontWeight: 'bold',
        fontSize: 14,
        color: "#E37E24",
        fontWeight: 'bold',
    },
     btnContainer: {
        flexDirection: "row",
        height: 25,
        backgroundColor: "#E37E24",
        borderRadius: 20,
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15
    },
    btn: {
        backgroundColor: "#fff", 
        width: 25, 
        height: 25,
        borderRadius: 30,
        elevation: 3,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ProductHorizontalItem