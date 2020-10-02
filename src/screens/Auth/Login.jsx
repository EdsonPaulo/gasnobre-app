import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Alert, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomInput, CustomStatusBar } from '../../components'
import { colors, metrics } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import api from '../../services/api'
import styles from './styles'
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

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
      setLoading(true)
      try {
        const response = await api(null).post('/users/authenticate', { email, password })
        if (response.data)
          login({ ...response.data?.user, ...response.data?.customer }, response.data?.token, response.data?.role)
      }
      catch (error) {
        console.log(error, error?.response?.data)
        setErrorModalVisible(true)
      }
      finally { setLoading(false) }
    }
  }

  return (
    <SafeAreaView style={styles.background}>
      <CustomStatusBar barStyle="dark-content" style="dark" backgroundColor={colors.bgColor} translucent={false} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.iconHeader} name='long-arrow-left' />
        </TouchableOpacity>

        <Text style={styles.title}>Entrar na Conta</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[{ paddingHorizontal: metrics.baseMargin, width: '100%' }]}>
          <Text style={styles.subtitle}>Informe as suas credenciais (email e senha) para iniciar sessão na sua conta</Text>
          <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
            <CustomInput label="Seu Email" style={{ marginBottom: metrics.baseMargin }} name="email" type="email" placeholder="user@example.com" onChangeText={value => setEmail(value)} />
            <CustomInput label="Senha de acesso" name="password" type="password" placeholder="**********" onChangeText={value => setPassword(value)} />
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
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: "#0000001a" }}>
          <View style={styles.modalView}>
            <Icon name="close" style={{ alignSelf: "center" }} size={50} color={colors.alert} />
            <View style={{ padding: 25, alignItems: "center" }}>
              <Text style={styles.modalText}>Email ou Senha incorreta!</Text>
              <Text style={styles.modalText}>Verifique as suas credenciais.</Text>
            </View>
            <TouchableOpacity style={{ padding: 10, width: 80 }} onPress={() => setErrorModalVisible(false)}>
              <Text style={styles.modalText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
export default Login