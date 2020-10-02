import Icon from '@expo/vector-icons/FontAwesome'
import { yupResolver } from '@hookform/resolvers'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as yup from 'yup'
import { CustomButton, CustomInput, CustomStatusBar } from '../../components'
import { colors, metrics } from '../../constants'
import AuthContext from '../../contexts/auth/auth-context'
import api from '../../services/api'
import styles from './styles'

const SignUp = () => {
  const navigation = useNavigation()
  const { register } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [sendCodeQtd, setSendCodeQtd] = useState(0)
  const [userData, setUserData] = useState({})
  const [step, setStep] = useState(1)

  //verification code field
  const [codeValueFromServer, setCodeValueFromServer] = useState('12345')
  const [codeValue, setCodeValue] = useState('')
  const codeFieldRef = useBlurOnFulfill({ codeValue, cellCount: 5 })
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeValue,
    setCodeValue,
  })

  /**
   *** Schemas de validação dos forms
   */
  const userSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome é obrigatório')
      .min(4, 'O nome deve ter mais de 4 letras'),
    phone: yup
      .string()
      .required('Telefone é obrigatório')
      .length(13, 'Digite um número de telefone válido'),
    email: yup
      .string()
      .required('Email é obrigatório')
      .email('Digite um email válido!')
      .lowercase(),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(6, 'A deve possuir 6 ou mais caracteres'),
  })
  const addressSchema = yup.object().shape({
    city: yup
      .string()
      .required('Cidade é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'),
    neighborhood: yup
      .string()
      .required('Bairro é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'), //bairro
    street: yup
      .string()
      .required('Rua é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'),
    home: yup.string().trim(),
  })

  const userFormData = useForm({ resolver: yupResolver(userSchema) })
  const addressFormData = useForm({ resolver: yupResolver(addressSchema) })

  const signUp = async () => {
    if (loading) return
    setLoading(true)
    try {
      const response = await api(null).post('/users/register', userData)
      console.log(response.data)
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar conta!', error.message)
    } finally {
      setLoading(false)
    }
  }

  const codeValidation = () => {
    console.log(codeValue)
    if (codeValue.length != 5)
      Alert.alert(
        'Código Inválido',
        `O código de verificação tem 5 dígitos, e foi enviado para ${
          userData.email || 'o seu email'
        }.`,
      )
    else if (codeValue == codeValueFromServer) {
      setUserData({ ...userData, code: codeValue })
      console.log('Passou')
      setStep(step + 1)
      setCodeValue('')
    } else Alert.alert('Código Incorreto', `O código inserido está incorreto`)
  }

  const onSubmit = data => {
    console.log(data)
    if (step == 1) {
      setUserData(data)
      setStep(step + 1)
    } else if (step == 3) {
      setUserData({ ...userData, address: [{ ...data }] })
      signUp()
    }
  }

  const prevStep = () => setStep(step - 1)

  const nextStep = () => {
    switch (step) {
      case 1:
        userFormData.handleSubmit(onSubmit)()
        break
      case 2:
        codeValidation()
        break
      case 3:
        addressFormData.handleSubmit(onSubmit)()
        break
      case 4:
        signUp()
    }
  }

  //Renderizar passo 1, detalhes pessoais
  const renderStep1 = () => (
    <View>
      <Text style={styles.subtitle}>Informe seus dados pessoais</Text>
      <Controller
        control={userFormData.control}
        defaultValue={userData?.name || ''}
        name="name"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            onChangeText={value => onChange(value)}
            error={userFormData.errors?.name?.message}
            type="name"
            placeholder="Nome e Sobrenome"
          />
        )}
      />
      <Controller
        control={userFormData.control}
        defaultValue={userData?.phone || '+244'}
        name="phone"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            type="phone"
            containerStyle={{ marginVertical: 15 }}
            maxLength={13}
            onChangeText={value =>
              onChange(value.includes('+244') ? value.trim() : `+244`)
            }
            error={userFormData.errors?.phone?.message}
            placeholder="Telefone (obrigatório)"
          />
        )}
      />
      <Controller
        control={userFormData.control}
        defaultValue={userData?.email || ''}
        name="email"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            type="email"
            placeholder="Email (obrigatório)"
            onChangeText={value => onChange(value)}
            error={userFormData.errors?.email?.message}
          />
        )}
      />
      <Controller
        control={userFormData.control}
        defaultValue={userData?.password || ''}
        name="password"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            type="password"
            containerStyle={{ marginVertical: 15 }}
            placeholder="Senha"
            onChangeText={value => onChange(value)}
            error={userFormData.errors?.password?.message}
          />
        )}
      />
    </View>
  )

  //Renderizar passo 2, código de verificação
  const renderStep2 = () => (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.subtitle}>
        Enviámos um código de 5 dígitos para {userData.email}. Se não receber em
        3 minutos, tente reenviar o código.
      </Text>

      <CodeField
        {...codeProps}
        ref={codeFieldRef}
        value={codeValue}
        onChangeText={setCodeValue}
        cellCount={5}
        rootStyle={styles.root}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  )

  //Renderizar passo 3, endereço
  const renderStep3 = () => (
    <ScrollView style={{ marginBottom: 5 }}>
      <Text style={styles.subtitle}>
        Para terminar informe-nos o seu endereço principal (onde serão feitas as
        entregas)
      </Text>
      <Controller
        control={addressFormData.control}
        defaultValue={userData?.address?.[0]?.city || ''}
        name="city"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Município/Distrito (obrigatório)"
            placeholder="ex: Maianga, Av. Deolinda Rodrigues"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.city?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={userData?.address?.[0]?.neighborhood || ''}
        name="neighborhood"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            containerStyle={{ marginVertical: 10 }}
            label="Bairro (obrigatório)"
            placeholder="ex: Bairro Cassenda"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.neighborhood?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={userData?.address?.[0]?.street || ''}
        name="street"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Rua (obrigatório)"
            placeholder="ex: Rua Cheguevara"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.street?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={userData?.address?.[0]?.home || ''}
        name="home"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Nº da Casa (caso tenha)"
            containerStyle={{ marginVertical: 10 }}
            placeholder="Identificação da casa"
            onChangeText={value => onChange(value)}
          />
        )}
      />
    </ScrollView>
  )

  return (
    <SafeAreaView style={styles.background}>
      <CustomStatusBar
        barStyle="dark-content"
        style="dark"
        backgroundColor={colors.bgColor}
        translucent={false}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon style={styles.iconHeader} name="long-arrow-left" />
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            { paddingHorizontal: metrics.baseMargin, justifyContent: 'center' },
          ]}
        >
          <Text style={styles.title}>
            <Text style={[styles.title, { color: colors.primaryDark }]}>
              {step}
            </Text>{' '}
            / 3
          </Text>
          <View style={{ marginTop: metrics.doubleBaseMargin }}>
            {step == 1 ? (
              renderStep1()
            ) : step == 2 ? (
              renderStep2()
            ) : step == 3 ? (
              renderStep3()
            ) : (
              <View />
            )}
            <View style={{ flexDirection: 'row' }}>
              {step == 1 || step == 3 ? null : (
                <CustomButton
                  style={{ flex: 1, marginRight: 8 }}
                  title="Anterior"
                  onPress={prevStep}
                />
              )}
              <CustomButton
                primary
                style={{ flex: 1 }}
                loading={loading}
                title={step == 3 ? 'Concluir' : 'Seguinte'}
                onPress={nextStep}
                icon={
                  step == 3
                    ? 'ios-checkmark'
                    : step == 1
                    ? 'ios-arrow-round-forward'
                    : null
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {step != 1 ? (
        <View />
      ) : (
        <View style={{ width: '100%', marginBottom: metrics.doubleBaseMargin }}>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.bottomText}>
              Já tem uma conta?
              <Text style={{ fontWeight: 'bold' }}> Fazer Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal animationType="slide" transparent visible={setSuccessModalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#0000001a',
          }}
        >
          <View style={styles.modalView}>
            <Icon
              name="check"
              style={{ alignSelf: 'center' }}
              size={50}
              color={colors.success}
            />
            <View style={{ padding: 25, alignItems: 'center' }}>
              <Text style={styles.modalText}>Conta Criada com Sucesso!</Text>
              <Text style={styles.modalText}>
                A sua conta foi criada com sucesso. Bem-vindo ao Delivery Nobre
                :)
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
export default SignUp
