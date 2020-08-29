import React, { useState } from 'react'
import {
    View, StyleSheet,
    TouchableOpacity, Text,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { colors, metrics, fonts, general } from '../constants'
import PlaceholderImage from './PlaceholderImage'

const ProductVerticalItem = props => {

    const { width, handleQuantity, ...item } = props
    const [quantity, setQuantity] = useState(0)

    const changeQuantity = (add) => {
        let auxQuantity = add ? (quantity + 1) : (quantity - 1)
        setQuantity(auxQuantity)
        handleQuantity(auxQuantity, item, (add === true))
    }

    return (
        <View style={[general.card, styles.container, { width }]}>

            <View style={styles.productImageContainer}>
                <PlaceholderImage style={styles.productImage}
                    source={item.image ? { uri: item.image } : require('../assets/noimage.png')} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.title}>{item.name} - {item.weight <= 0.99 ? `${item.weight * 1000}ml` : `${item.weight}L`}</Text>
                <Text style={styles.description}>{item.bottles} garrafas de {item.weight <= 0.99 ? `${item.weight * 1000} mililitros` : `${item.weight} litros`}</Text>

                <Text style={styles.price}>
                    {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(item.price)}
                </Text>

                <View>
                    {
                        quantity == 0 ?
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={[styles.btn, { backgroundColor: colors.primaryDark }]}
                                    onPress={() => changeQuantity(true)}>
                                    <MaterialCommunityIcons size={18} color='#fff' name='plus' />
                                </TouchableOpacity>
                            </View>
                            :
                            <View style={styles.btnContainer}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(false)}>
                                    <MaterialCommunityIcons size={18} color={colors.primaryDark} name='minus' />
                                </TouchableOpacity>

                                <Text style={{ fontSize: 14, color: '#fff', marginHorizontal: 20 }}>{quantity}</Text>

                                <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => changeQuantity(true)}>
                                    <MaterialCommunityIcons size={18} color={colors.primaryDark} name='plus' />
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
        height: 250,
        marginVertical: 7,
        marginHorizontal: metrics.baseMargin,
        justifyContent: 'space-between',
        maxWidth: 200,
        alignItems: 'center',
    },
    productImageContainer: {
        width: '100%',
        height: '50%',
    },
    productImage: {
        width: '100%',
        height: '100%'
    },
    infoContainer: {
        height: '50%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        //textTransform: 'capitalize',
        textAlign: 'center',
        fontFamily: 'RobotoCondensed_400Regular',
    },
    description: {
        fontSize: 12,
        color: colors.grayDark,
        textAlign: 'center',
        marginVertical: 8,
        fontFamily: 'RobotoCondensed_400Regular',
    },
    price: {
        fontSize: 14,
        color: colors.primaryDark,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    btnContainer: {
        flexDirection: 'row',
        height: 30,
        backgroundColor: colors.primaryDark,
        borderRadius: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15
    },
    btn: {
        backgroundColor: '#fff', width: 30, height: 30,
        borderRadius: 30,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default ProductVerticalItem