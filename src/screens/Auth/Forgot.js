import Icon from '@expo/vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomInput, CustomStatusBar } from '../../components'
import { colors, metrics } from '../../constants'
import styles from './styles'


const Forgot = () => {

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.background}>
      <CustomStatusBar barStyle="dark-content" style="dark" backgroundColor={colors.bgColor} translucent={false} />

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon style={styles.iconHeader} name='long-arrow-left' />
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View style={[{ padding: metrics.baseMargin, width: '100%' }]}>
          <Text style={styles.title}>Recuperar Conta</Text>
          <Text style={styles.subtitle}>Caso tenha esquecido a sua senha informe o seu email para ajudá-lo a recuperar a sua conta..</Text>

          <View style={{ width: '100%', marginTop: metrics.doubleBaseMargin }}>
            <CustomInput style={{ marginBottom: 15 }} label="Seu Email" name="email" type="email" placeholder="exemplo@email.com" />

            <CustomButton primary title="Recuperar" onPress={() => { }} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View />

    </SafeAreaView>
  )
}
export default Forgot