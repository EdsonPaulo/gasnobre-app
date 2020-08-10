import React, { useContext, useState } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome'

import AuthContext from '../../contexts/auth/auth-context'
import { CustomButton, CustomInput } from '../../components'
import { metrics, colors } from '../../constants'
import api from '../../services/api';

import styles from './styles'

const SignUp = () => {

    const navigation = useNavigation()
    const { register } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const signUp = () => {
        if (userData.password !== userData.confirmPassword)
            Alert.alert("Erro", "As senhas não conferem!")
        else {
            setLoading(true)

            api.post('/users', userData)
                .then(response => {
                    api.post(response.data)
                        .then(response => console.log(response))
                        .catch(error => {
                            console.error(error)
                            Alert.alert("Erro", "Erro ao criar conta!")
                        })
                        .finally(() => setLoading(false))
                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                    Alert.alert("Erro", "Erro ao criar conta!")
                })
        }
    }


    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />

            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='long-arrow-left' />
            </TouchableOpacity>

            <View style={[, { paddingHorizontal: metrics.baseMargin, width: '100%' }]}>
                <Text style={styles.title}>Criar Conta</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput name="name" type="name" placeholder="Nome de Usuário" onChangText={value => setUserData({ ...userData, name: value })} />
                    <CustomInput style={{ marginVertical: 15 }} name="phone" type="phone" placeholder="Telefone" onChangText={value => setUserData({ ...userData, phone: value })} />
                    <CustomInput name="password" type="password" placeholder="Senha" onChangText={value => setUserData({ ...userData, password: value })} />
                    <CustomInput style={{ marginVertical: 15 }} name="password" type="password" placeholder="Confirmar Senha" onChangText={value => setUserData({ ...userData, confirmPassword: value })} />

                    <CustomButton primary loading={loading} title="Criar Conta" onPress={signUp} />
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