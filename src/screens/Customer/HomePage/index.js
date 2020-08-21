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

import { colors, metrics, general, fonts, constants } from '../../../constants'
import { HeaderBar, ProductHorizontalList, CategoryList, SwiperCards } from '../../../components'
import { RectButton } from 'react-native-gesture-handler'

const index = () => {
    const navigation = useNavigation()

    const [orders, setOrders] = useState([{
        number: 1212,
        status: "pendente",
        total: 40000,
        dateOrder: "27/12"
    },
    {
        number: 1112,
        status: "pendente",
        total: 40000,
        dateOrder: "27/12"
    }
   ])

    const user = {
        kamba: {
            active: false,
            left: 6,
            balance: 504050
        }
    }

    const convertDate = date => Intl.DateTimeFormat('pt-AO').format(new Date(date))

    const handlePlanoKamba = () => {
        !user.kamba.active ? console.log("SHOW KAMBA INFO")
        : user.kamba.left == 0 ? console.log("SHOW END PLAN INFO")
        : user.kamba.left <= 5 ?  console.log("SHOW left days INFO") : null
        navigation.navigate("kamba")
    }

    return (
        <SafeAreaView style={[general.background]}>
            <View style={styles.container}>
                <View>
                    <View style={{ marginBottom: 30, width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { }}>
                            <Icon name="bell-o" color="darkblue" size={25} />
                        </TouchableOpacity>

                        <View style={{ width: 100, height: 50, }}>
                            <Image style={{ width: "100%", height: "100%" }}
                                resizeMode="contain" source={require("../../assets/logo-transparent.png")} />
                        </View>

                        <TouchableOpacity onPress={() => { }}>
                            <Icon name="share-square-o" color="darkblue" size={25} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.banners}>
                        <SwiperCards />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <TouchableOpacity activeOpacity={0.7}  style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("storeStack")}>
                        <Icon name="bullhorn" color={colors.dark} size={30} />
                        <Text style={styles.optionTitle}>Pedir Agora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.option} onPress={ handlePlanoKamba}>
                        <View style={{ position: "absolute", top: 7, right: 7 }}>
                            {
                                !user.kamba.active ? <Icon name="info-circle" color={colors.dark} size={20} />
                                : user.kamba.left == 0 ? <Icon name="warning" color={colors.alert} size={20} />
                                : user.kamba.left <= 5 ? <Icon name="warning" color={colors.warning} size={20} />
                                : user.kamba.balance > 0 ?  
                                    <Text style={{ fontWeight: 'bold', fontSize: 11, color: colors.primaryDark }}>
                                        -{user.kamba.balance}Kz
                                    </Text>
                                : null
                            }
                        </View>
                        <Icon name="handshake-o" color={colors.dark} size={30} />
                        <Text style={styles.optionTitle}>Plano Kamba</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.historyContainer}>
                    <Text style={{ textAlign: "center", marginTop: 5 }}>Histórico de Pedidos</Text>
                    {
                        orders.map(order => (
                            <TouchableOpacity key={order.number} onPress={() => navigation.navigate("orderDetails", { order })} activeOpacity={0.7} style={styles.history}>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.statusText}>#{order.number}</Text>
                                    <Text style={styles.statusText}>{order.dateOrder}</Text>
                                </View>

                                <View style={styles.rowContainer}>
                                    <Text style={styles.statusText}>Estado:
                                 <Text style={{
                                            fontWeight: "bold",
                                            textTransform: "capitalize",
                                            color: order.status === 'concluido' ? 'green'
                                                : order.status === 'cancelado' ? colors.alert : colors.dark
                                        }}> {order.status}
                                        </Text></Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: colors.primaryDark }}>
                                        {Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(order.total)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("orderStack")}>
                        <Text style={{ textAlign: "center", marginTop: 5 }}>Ver mais »</Text>

                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
        </SafeAreaView>
    )
}

export default index