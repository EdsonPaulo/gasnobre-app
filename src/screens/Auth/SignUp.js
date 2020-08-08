import React, { } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { CustomButton, CustomInput } from '../../components'
import { metrics, colors } from '../../constants'
import styles from './styles'

const SignUp = () => {

    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='long-arrow-alt-left' />
            </TouchableOpacity>

            <View style={[, { paddingHorizontal: metrics.baseMargin, width: '100%' }]}>
                <Text style={styles.title}>Criar Conta</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput name="name" type="name" placeholder="Nome de Usuário" />
                    <CustomInput style={{ marginVertical: 15 }} name="email" type="email" placeholder="Email" />
                    <CustomInput name="password" type="password" placeholder="Senha" />
                    <CustomInput style={{ marginVertical: 15 }} name="password" type="password" placeholder="Confirmar Senha" />

                    <CustomButton primary title="Criar Conta" onPress={() => { }} />
                </View>
            </View>

            <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                <TouchableOpacity onPress={() => navigation.navigate('login')}>
                    <Text style={styles.bottomText}>Já tens uma conta?
                        <Text style={{ fontWeight: 'bold' }}> Fazer Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default SignUp