import React, { useContext, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaView } from "react-native-safe-area-context"

import styles from './styles'
import { CustomButton } from '../../components'
import { metrics, fonts, colors } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'


const Landing = () => {

    const navigation = useNavigation()
    const authContext = useContext(AuthContext)

    const signIn = () => {
        const user = {
            name: 'Edson Paulo',
            id: 12
        }
        const token = 'FAKE-TOKEN-FOR-TEST'
        authContext.login(user, token)
    }


    return (
        <SafeAreaView style={[styles.background, { padding: metrics.doubleBaseMargin, }]}>
            <StatusBar style="dark" barStyle='dark-content' backgroundColor={colors.white} />

            <Image resizeMode="contain" source={require('../../assets/logo.png')} style={{ flex: 1.3 / 2, width: '100%'}} />

            <View style={{ width: '100%', flex: 0.7 / 2, justifyContent: "flex-end", paddingHorizontal: metrics.baseMargin }}>
                <CustomButton primary title="ENTRAR NA CONTA" onPress={() => navigation.navigate('login')} />
                <CustomButton title="Criar Conta" onPress={() => navigation.navigate('signup')} />
                <Text style={styles.copyrightText}>c 2020 - ÁguaNobre</Text>
            </View>
        </SafeAreaView>
    )
}
export default Landing