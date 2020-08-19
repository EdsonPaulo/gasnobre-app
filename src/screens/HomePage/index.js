import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import Icon from "@expo/vector-icons/FontAwesome"

const { height, width } = Dimensions.get("window")
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
import { HeaderBar, ProductHorizontalList, CategoryList, SwiperCards } from '../../components'
import { RectButton } from 'react-native-gesture-handler'

const index = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={[general.background]}>
            <View style={styles.container}>
                <View>
                    <View style={{ marginBottom: 30, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                        <View />

                        <View style={{ width: 130, height: 50, }}>
                            <Image style={{ width: "100%", height: "100%" }}
                                resizeMode="contain" source={require("../../assets/logo-transparent.png")} />
                        </View>

                        <TouchableOpacity onPress={() => { }}>
                            <Icon name="bell" color={colors.grayDark2} size={25} />
                        </TouchableOpacity>
                    </View>


                    <View style={{ height: 190, width: "100%", alignSelf: "center", backgroundColor: "transparent", borderRadius: 25 }}>
                        <SwiperCards />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <RectButton style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("products")}>
                        <Icon name="bullhorn" color={colors.grayDark2} size={30} />
                        <Text style={styles.optionTitle}>Pedir Agora</Text>
                    </RectButton>
                    <RectButton style={styles.option} onPress={() => navigation.navigate("plans")}>
                        <Icon name="handshake-o" color={colors.grayDark2} size={30} />
                        <Text style={{ fontSize: 14, margin: 5 }}>Plano Kamba</Text>
                    </RectButton>
                </View>

                <View style={styles.historyContainer}>
                    <Text style={{ textAlign: "center", marginTop: 5 }}>Histórico de Pedidos</Text>
                    <TouchableOpacity activeOpacity={0.5} style={styles.history}></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} style={styles.history}></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate("orders")}>
                    <Text style={{ textAlign: "center", marginTop: 5 }}>Ver mais »</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default index