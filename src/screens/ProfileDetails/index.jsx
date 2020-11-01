import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomInput, CustomStatusBar } from '../../components'
import { colors, general } from '../../constants'
import authContext from '../../contexts/auth/auth-context'

export default index = () => {
  const navigation = useNavigation()
  const { user, role } = useContext(authContext)
  const [editable, setEditable] = useState(false)
  const [saving, setSaving] = useState(false)
  const [userInfo, setUserInfo] = useState({ ...user })

  useEffect(() => {
    return () => {
      //salvar dados dos inputs
    }
  }, [])

  const handleSave = () => {
    setSaving(true)

    setTimeout(() => {
      ToastAndroid.show('Dados salvos com sucesso!', 1000)
      setSaving(false)
      setEditable(false)
    }, 2000)
  }

  const inputStyle = editable
    ? null
    : { backgroundColor: colors.bgColor, borderWidth: 0 }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
        translucent={false}
      />

      <View style={styles.topContainer}>
        <FontAwesome5 name="user-circle" color={colors.dark} size={40} />
        <Text style={[styles.userName, styles.userDetails]}>
          {userInfo?.name}
        </Text>
        <Text style={styles.userDetails}>
          {role === 'customer' ? 'Cliente' : 'Gerente'}
        </Text>
        <Text style={styles.userDetails}>{userInfo?.phone || userInfo?.email}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {editable ? null : (
          <RectButton
            style={{ alignSelf: 'flex-end', padding: 7 }}
            onPress={() => setEditable(true)}
          >
            <Text style={{ fontFamily: 'RobotoCondensed_700Bold' }}>
              <FontAwesome5 name="edit" /> Editar
            </Text>
          </RectButton>
        )}
        <Text style={styles.labelStyle}>Nome</Text>
        <CustomInput
          type="name"
          value={userInfo.name}
          style={inputStyle}
          editable={editable}
          placeholder="Nome e Sobrenome"
          onChangeText={name => setUserInfo({ ...userInfo, name: name })}
        />

        <Text style={styles.labelStyle}>Telefone</Text>
        <CustomInput
          type="phone"
          placeholder="Telefone"
          style={inputStyle}
          editable={editable}
          value={userInfo.phone}
          onChangeText={phone => setUserInfo({ ...userInfo, phone: phone })}
        />

        <Text style={styles.labelStyle}>Email</Text>
        <CustomInput
          type="email"
          placeholder="Email de Contacto"
          style={inputStyle}
          editable={editable}
          value={userInfo.email}
          onChangeText={email => setUserInfo({ ...userInfo, email: email })}
        />

        {!editable && (
          <CustomButton
            style={{ marginTop: 40 }}
            title="Meus Endereços"
            icon="ios-map"
            onPress={() => navigation.navigate('address')}
          />
        )}

        {editable && (
          <View style={{ marginTop: 20, flexDirection: 'row', flex: 1 }}>
            <CustomButton
              style={{ flex: 1, marginRight: 20 }}
              title="Salvar"
              loading={saving}
              primary
              onPress={handleSave}
            />
            <CustomButton
              style={{ flex: 1 }}
              title="Cancelar"
              onPress={() => setEditable(false)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  topContainer: {
    height: 'auto',
    //width: 200,
    alignSelf: 'center',
    margin: 10,
    //backgroundColor: colors.white,
    //elevation: 5,
    //borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  userDetails: {
    fontFamily: 'RobotoCondensed_400Regular',
    color: colors.dark,
  },
  labelStyle: {
    color: colors.grayDark,
    marginTop: 10,
    marginBottom: 2,
    marginLeft: 10,
    fontFamily: 'RobotoCondensed_700Bold',
  },
})
