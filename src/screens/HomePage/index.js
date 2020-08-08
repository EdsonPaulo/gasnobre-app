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

import styles from './styles'

import { colors, metrics, general, fonts, constants } from '../../constants'
import { HeaderBar, ProductHorizontalList, CategoryList } from '../../components'

const index = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={general.background}>
            <View style={{ flex: 3 / 3 }}>

                <Text style={{ fontSize: 20, margin: 20, }}>Olá, Edson Paulo</Text>
                <Text style={styles.homeTitle}>O QUE VAI PEDIR HOJE?</Text>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "gas" })}>
                    <Image style={{ width: "100%", height: "100%" }} resizeMode="contain" source={require("../../assets/gas-btn2.png")} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("products", { category: "water" })}>
                    <Image style={{ width: "100%", height: "100%" }} resizeMode="contain" source={require("../../assets/agua-btn2.png")} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default index