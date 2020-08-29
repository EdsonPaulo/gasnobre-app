import React, { useContext, useState } from 'react'
import { Text, View, KeyboardAvoidingView, TouchableOpacity, Alert, Platform, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

import { CustomButton, CustomInput } from '../../components'
import { metrics, colors } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import api from '../../services/api'

import styles from './styles'
import { RectButton } from 'react-native-gesture-handler'

const Login = () => {

    const navigation = useNavigation()
    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorModalVisible, setErrorModalVisible] = useState(false)

    const signIn = async () => {
        if (!email || !password)
            Alert.alert('Preencha todos os campos', 'Informe o telefone/email e a senha!')
        else {
            if (password.length < 6)
                Alert.alert('Senha Inválida', 'A senha deve ter mais de 6 caracteres')
            else {
                setLoading(true)
                try {
                    const response = await api(null).post('/users/authenticate', { email, password })
                    if (response.data) 
                        login({...response.data?.user, ...response.data?.customer}, response.data?.token, response.data?.role)
                }
                catch (error) {
                    console.log(error)
                    setErrorModalVisible(true)
                }
                finally { setLoading(false) }
            }
        }
    }


    return (
        <SafeAreaView style={styles.background}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <FontAwesome style={styles.iconHeader} name='long-arrow-left' />
            </TouchableOpacity>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={[{ paddingHorizontal: metrics.baseMargin, width: '100%' }]}>

                    <Text style={[styles.title, { fontFamily: 'Amarante_400Regular' }]}>Entrar na Conta</Text>

                    <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
                        <CustomInput label="Email" style={{ marginBottom: metrics.baseMargin }} name="email" type="email" placeholder="user@example.com" onChangeText={value => setEmail(value)} />
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
                    <Text style={[styles.bottomText, { marginTop: metrics.baseMargin }]}>Esqueceu a sua senha?</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent visible={errorModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={styles.modalView}>
                        <AntDesign name="closecircleo" style={{ alignSelf: "center" }} size={50} color={colors.alert} />
                        <View style={{ padding: 25, alignItems: "center" }}>
                            <Text style={styles.modalText}>Email ou Senha inválida!</Text>
                            <Text style={styles.modalText}>Verifique as suas credenciais.</Text>
                        </View>
                        <TouchableOpacity style={{padding: 10, width: 80}} onPress={() => setErrorModalVisible(false)}>
                            <Text style={styles.modalText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <StatusBar style="dark" backgroundColor={colors.bgColor} translucent={false} />
        </SafeAreaView>
    )
}
export default Login