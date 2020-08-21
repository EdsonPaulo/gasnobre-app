import React, { useContext, useState } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { CustomButton, CustomInput } from '../../components'
import { metrics, colors } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import api from '../../services/api'

import styles from './styles'

const Login = () => {

    const navigation = useNavigation()
    const { login } = useContext(AuthContext)

    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const [user, setuser] = useState({
        id: 12313,
        name: 'Edson Paulo',
        initials: 'EP',
        phone: '+244942682194',
        email: 'edsonpaulo24@gmail.com',
        address1: 'Casa 12, Luanda - Angola',
        address2: '',
    })

    const signIn = () => {
        console.log(phone)
        setLoading(true)

        api.get(`/users?phone=${phone}`)
            .then(response => {
                console.log(response)
                if (response.data?.password === password)
                    console.log("Sucesso!")
            })
            .catch(error => {
                console.error(error)
                Alert.alert("Erro", "Verifique as suas credenciais!")
                setLoading(false)
            })
            .finally(() => setLoading(false))
    }


    return (
        <SafeAreaView style={styles.background}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='long-arrow-left' />
            </TouchableOpacity>

            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={[{ paddingHorizontal: metrics.baseMargin, width: '100%' }]}>

                    <Text style={[styles.title, { fontFamily: 'Amarante_400Regular' }]}>Entrar na Conta</Text>

                    <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                        <CustomInput label="Telefone" style={{ marginBottom: metrics.baseMargin }} name="phone" type="phone" placeholder="9XXXXXXXX" onChangeText={value => setPhone(value)} />
                        <CustomInput label="Senha" name="password" type="password" placeholder="**********" onChangeText={value => setPassword(value)} />
                        <CustomButton style={{ marginTop: 20 }} loading={loading} primary icon="ios-arrow-round-forward" title="Entrar" onPress={signIn} />
                    </View>
                </View>
            </KeyboardAvoidingView>


            <View style={{ width: '100%', marginVertical: metrics.doubleBaseMargin }}>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.bottomText}>Não possui uma conta?
                    <Text style={{ fontWeight: 'bold' }}>  Criar Conta</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                    <Text style={[styles.bottomText, { marginTop: metrics.doubleBaseMargin }]}>Esqueceu a sua senha?</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />    
        </SafeAreaView>
    )
}
export default Login