import React, { useContext, useState } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from '@expo/vector-icons/FontAwesome5'
import { CustomButton, CustomInput } from '../../components'
import { metrics, fonts, colors } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import styles from './styles'

const Login = () => {

    const navigation = useNavigation()
    const { login } = useContext(AuthContext)

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [user, setuser] = useState({
        id: 12313,
        name: 'Edson Paulo',
        initials: 'EP',
        phone: '+244942682194',
        email: 'edsonpaulo24@gmail.com',
        address1: 'Casa 12, Luanda - Angola',
        address2: '',
    })

    return (
        <KeyboardAvoidingView style={styles.background} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon style={styles.iconHeader} name='long-arrow-alt-left' />
            </TouchableOpacity>

            <View style={[{ paddingHorizontal: metrics.baseMargin, width: '100%' }]}>

                <Text style={styles.title}>ENTRAR NA CONTA</Text>

                <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                    <CustomInput label="Telefone" style={{ marginTop: 0 }} name="phone" type="phone" placeholder="9XXXXXX" />
                    <CustomInput label="Senha" containerStyle={{ marginTop: 0 }} name="password" type="password" placeholder="**********" />
                    <CustomButton style={{ marginTop: 20 }} primary icon="ios-arrow-round-forward" title="Entrar" onPress={() => { login(user, "auth-dummy-token") }} />
                </View>
            </View>

            <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                    <Text style={styles.bottomText}>Não possui uma conta?
                    <Text style={{ fontWeight: 'bold' }}>  Criar Conta</Text></Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
                    <Text style={[styles.bottomText, {marginTop: metrics.doubleBaseMargin}]}>Esqueceu a sua senha?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
export default Login