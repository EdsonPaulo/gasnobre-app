import React, { } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome'

import { CustomButton, CustomInput } from '../../components'
import { metrics, colors } from '../../constants'
import styles from './styles'

const Forgot = () => {

    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.background}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='long-arrow-left' />
            </TouchableOpacity>

            <View style={[{ padding: metrics.baseMargin, width: '100%' }]}>
                <Text style={styles.title}>Recuperar Conta</Text>
                <Text style={styles.subtitle}>Caso tenha esquecido a sua senha informe o seu email para ajudá-lo a recuperar a sua conta..</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput style={{ marginBottom: 15 }} label="Seu Email" name="email" type="email" placeholder="exemplo@email.com" />

                    <CustomButton primary title="Recuperar" onPress={() => { }} />
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}
export default Forgot