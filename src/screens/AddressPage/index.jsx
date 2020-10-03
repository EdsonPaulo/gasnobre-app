import Icon from '@expo/vector-icons/Ionicons'
import React, { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomStatusBar } from '../../components'
import { colors, general, metrics } from '../../constants'
import authContext from '../../contexts/auth/auth-context'
import api from '../../services/api'

const AddressPage = () => {
  let isMounted = true

  const { user, role, token, updateUser } = useContext(authContext)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState([])

  const getAddress = async () => {
    try {
      const userFromServer = await api(token).get('/customers/me')
      console.log(userFromServer.data)
      if (userFromServer?.data) {
        updateUser(userFromServer?.data)
        setAddress(userFromServer?.data?.address)
      }
    } catch (error) {
      console.log(error.response)
      console.log(error.message)
    }
  }

  const handleDeleteAddress = index => {
    Alert.alert(
      'Eliminar Endereço',
      'Deseja eliminar este endereço?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => {} },
      ],
      { cancelable: true },
    )
  }

  useEffect(() => {
    if (isMounted) {
      getAddress()
      setAddress(user?.address)
    }
    return () => (isMounted = false)
  }, [])

  const renderAddresses = () =>
    user?.address?.map((item, index) => (
      <View style={styles.addressContainer} key={index}>
        <Text
          style={styles.addressText}
        >{`Casa ${item?.home} - ${item?.street} - ${item?.neighborhood}`}</Text>
        <Text style={styles.addressText}>{`${item?.city}`}</Text>
        <View style={styles.row}>
          <RectButton style={styles.actionBtn}>
            <Icon name="md-create" color={colors.grayDark} size={25} />
          </RectButton>

          <RectButton
            style={styles.actionBtn}
            onPress={() => handleDeleteAddress(index)}
          >
            <Icon name="md-trash" color={colors.alert} size={25} />
          </RectButton>
        </View>
      </View>
    ))

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
        translucent={false}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        stickyHeaderIndices={[0]}
      >
        {address?.length == 0 ? (
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.title}>Nenhum Endereço Cadastrado</Text>
            <Text style={styles.title}>
              Adicione um para poder fazer um pedido
            </Text>
          </View>
        ) : (
          renderAddresses()
        )}

        <CustomButton
          onPress={() => setEditing(true)}
          primary
          title="Adicionar Endereço"
          icon="ios-add-circle"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  addressContainer: {
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: colors.grayLight,
    borderRadius: metrics.baseRadius,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressContainer: {
    padding: 10,
  },
  addressText: {
    fontSize: 17,
    textTransform: 'capitalize',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  title: {
    color: colors.grayDark,
    fontFamily: 'RobotoCondensed_700Bold',
    fontSize: 16,
    textAlign: 'center',
  },
})

export default AddressPage
