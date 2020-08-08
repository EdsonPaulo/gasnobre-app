import React, { useEffect, useState, useContext } from 'react'
import { Text, View, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from "react-native-safe-area-context"
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'

import { HeaderBar, CustomInput } from '../../components'
import { colors, metrics, general, fonts } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'


export default index = () => {

    const navigation = useNavigation()

    const { logout, user } = useContext(AuthContext)

    const Logout = () => {
        Alert.alert(
            'Terminar Sessão', 'Deseja terminar sessão da sua conta?', [
            { text: 'Não', style: 'cancel' },
            { text: 'SIm', onPress: () => logout() },
        ], { cancelable: true })
    }


    return (
        <SafeAreaView style={general.background}>

            <View style={styles.topContainer} />

            <View style={styles.userContainer}>
                <View style={styles.avatar}>
                    <Text style={{ fontSize: 20, color: "#fff" }}>{user.initials}EP</Text>
                </View>
                <View style={styles.user}>
                    <Text style={styles.userName}>{user.name}Edson Paulo</Text>
                    <Text style={styles.userDetails}>{user.phone}942682194</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionTitle}>Meus Dados</Text>
                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('profileDetails') }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Ionicons name='ios-person' style={styles.icons} />
                        <Text style={styles.textStyle}>Dados Pessoais</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('address') }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <MaterialCommunityIcons name='map' style={styles.icons} />
                        <Text style={styles.textStyle}> Meus Endereços </Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => { navigation.navigate('plans') }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <Ionicons name='ios-cart' style={styles.icons} />
                        <Text style={styles.textStyle}>Planos de Serviços</Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Mais</Text>
                <TouchableOpacity style={styles.btn} onPress={() => { onShare() }}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>

                        <MaterialCommunityIcons name='share-variant' style={styles.icons} />
                        <Text style={styles.textStyle}>Partilhar </Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <MaterialCommunityIcons name='account-supervisor' style={styles.icons} />
                        <Text style={styles.textStyle}>Ajuda e Suporte </Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => Logout()}>
                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                        <MaterialCommunityIcons name='logout' style={styles.icons} />
                        <Text style={styles.textStyle}> Terminar Sessão </Text>
                    </View>
                    <Ionicons name="ios-arrow-forward" size={18} />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingVertical: 10,
    },
    topContainer: {
        height: 50,
        marginBottom: 35,
        backgroundColor: colors.primary,
        elevation: 3,
        position: "relative"
    },
    userContainer: {
        top: 10,
        height: 70,
        width: "80%",
        elevation: 4,
        alignSelf: "center",
        position: "absolute",
        padding: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: metrics.baseRadius,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: metrics.baseMargin,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryDark
    },
    sectionTitle: {
        //fontFamily: 'Lato',
        fontSize: fonts.regular,
        color: colors.grayMedium,
        marginTop: metrics.baseMargin,
    },
    user: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    userName: {
        //fontFamily: 'Lato',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: metrics.smallMargin,
    },
    userDetails: {
        //fontFamily: 'Lato',
        textAlign: 'justify'
    },
    inputContainer: {
        marginVertical: metrics.smallMargin
    },
    icons: {
        color: colors.grayDark2,
        fontSize: 20,
        marginRight: metrics.baseMargin,
    },
    btn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        borderRadius: 5,
        elevation: 2,
        backgroundColor: "white",
        marginVertical: metrics.smallMargin,
        padding: metrics.baseMargin,
        paddingHorizontal: metrics.doubleBaseMargin
    }
})
