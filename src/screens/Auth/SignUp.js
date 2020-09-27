import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomInput, CustomStatusBar } from '../../components'
import { colors, metrics } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import api from '../../services/api'
import styles from './styles'

const SignUp = () => {
  const navigation = useNavigation()
  const { register } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    name: null,
    phone: "+244",
    email: null,
    password: null,
    code: null
  })

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

  const nextStep = () => setStep(step + 1)

  const prevStep = () => setStep(step - 1)

  const renderStep1 = () => (
    <View>
      <Text style={styles.subtitle}>Informe seus dados pessoais</Text>
      <CustomInput type="name" placeholder="Nome e Sobrenome" onChangText={value => setUserData({ ...userData, name: value })} />
      <CustomInput style={{ marginVertical: 15 }} type="phone" maxLength={9} placeholder="Telefone (obrigatório)" onChangText={value => setUserData({ ...userData, phone: value })} />
      <CustomInput type="email" placeholder="Email (obrigatório)" onChangText={value => setUserData({ ...userData, email: value })} />
      <CustomInput style={{ marginVertical: 15 }} type="password" placeholder="Senha" onChangText={value => setUserData({ ...userData, password: value })} />
    </View>
  )

  const renderStep2 = () => (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.subtitle}>Enviámos um código de 6 dígitos para {userData.email}</Text>
      <CustomInput type="code" maxLength={6} placeholder="XXXXXX" onChangText={value => setUserData({ ...userData, code: value })} />
    </View>
  )


  return (
    <SafeAreaView style={styles.background}>
      <CustomStatusBar barStyle="dark-content" style="dark" backgroundColor={colors.bgColor} translucent={false} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.iconHeader} name='long-arrow-left' />
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={[{ paddingHorizontal: metrics.baseMargin, justifyContent: "center" }]}>
          <Text style={styles.title}>
            <Text style={[styles.title, { color: colors.primaryDark }]}>{step}</Text> / 3
          </Text>
          <View style={{ marginTop: metrics.doubleBaseMargin }}>
            {
              step == 1 ?
                renderStep1()
                : step == 2 ?
                  renderStep2()
                  : step == 3 ?
                    renderStep3()
                    : step == 4 ?
                      <View />
                      :
                      <View />
            }
            <View style={{ flexDirection: "row" }}>
              {
                step == 1 ? null :
                  <CustomButton style={{ flex: 1, marginRight: 8 }} title="Anterior" onPress={prevStep} />
              }
              <CustomButton primary style={{ flex: 1 }} loading={loading} title={step == 3 ? "Criar Conta" : "Seguinte"} onPress={nextStep}
                icon={step == 4 ? "check" : step == 1 ? "ios-arrow-round-forward" : null} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {
        step != 1 ? <View /> :

          <View style={{ width: '100%', marginBottom: metrics.doubleBaseMargin }}>
            <TouchableOpacity onPress={() => navigation.navigate('login')}>
              <Text style={styles.bottomText}>Já tem uma conta?
                        <Text style={{ fontWeight: 'bold' }}> Fazer Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
      }
    </SafeAreaView>
  )
}
export default SignUp