import React from 'react'

import { Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'

import { SafeAreaView } from "react-native-safe-area-context"

import styles from './styles'
import { CustomButton } from '../../components'
import { metrics, fonts, colors } from '../../constants'


const Landing = () => {

    const navigation = useNavigation()

    return (
        <SafeAreaView style={[styles.background, { padding: metrics.doubleBaseMargin, }]}>
            <Image resizeMode="contain" source={require('../../assets/logo.png')} style={{ flex: 1.3 / 2, width: '100%'}} />

            <View style={{ width: '100%', flex: 0.7 / 2, justifyContent: "flex-start", paddingHorizontal: metrics.baseMargin }}>
                <CustomButton primary title="ENTRAR NA CONTA" onPress={() => navigation.navigate('login')} />
                <CustomButton title="Criar Conta" onPress={() => navigation.navigate('signup')} />
            </View>
            <Text style={styles.copyrightText}>© 2020 - Delivery Nobre</Text>

            <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />    
        </SafeAreaView>
    )
}
export default Landing