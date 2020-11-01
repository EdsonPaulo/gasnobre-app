import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, general } from '../../constants'
import { CustomStatusBar } from '../../components'
import AuthContext from '../../contexts/auth/auth-context'
import styles from './styles'

export default index = () => {
  const navigation = useNavigation()
  const { logout, user, role } = useContext(AuthContext)
  const [supportModalVisible, setSupportModalVisible] = useState(false)
  const userInitials =
    user?.name?.split(' ')[0][0] +
    (user?.name?.split(' ')[1] ? user?.name?.split(' ')[1][0] : '')

  const Logout = () => {
    Alert.alert(
      'Terminar Sessão',
      'Deseja terminar sessão da sua conta?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => logout() },
      ],
      { cancelable: true },
    )
  }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
        translucent={false}
      />

      <View style={styles.topContainer} />

      <View style={styles.userContainer}>
        <View style={styles.avatar}>
          <Text style={{ fontSize: 20, color: colors.dark }}>
            {userInitials || null}
          </Text>
        </View>
        <View style={styles.user}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userDetails}>{user?.phone}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Meus Dados</Text>
        <RectButton
          activeOpacity={0.7}
          style={[styles.btn, { justifyContent: 'space-between' }]}
          onPress={() => {
            navigation.navigate('profileDetails')
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="ios-person" style={styles.icons} />
            <Text style={styles.textStyle}>Dados Pessoais</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </RectButton>

        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.btn, { justifyContent: 'space-between' }]}
          onPress={() => navigation.navigate('address')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="home-map-marker"
              style={styles.icons}
            />
            <Text style={styles.textStyle}>Meus Endereços </Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={18} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Mais</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={() => {
            onShare()
          }}
        >
          <MaterialCommunityIcons name="share-variant" style={styles.icons} />
          <Text style={styles.textStyle}>Partilhar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setSupportModalVisible(true)}
          activeOpacity={0.7}
          style={styles.btn}
        >
          <MaterialCommunityIcons name="headset" style={styles.icons} />
          <Text style={styles.textStyle}>Ajuda e Suporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btn}
          onPress={() => Logout()}
        >
          <MaterialCommunityIcons name="power" style={styles.icons} />
          <Text style={styles.textStyle}>Terminar Sessão</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal animationType="slide" transparent visible={supportModalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#0000004a',
          }}
        >
          <View style={styles.modalView}>
            <MaterialCommunityIcons
              name="headset"
              style={{ alignSelf: 'center' }}
              size={40}
              color={colors.dark}
            />
            <Text style={styles.modalText}>Ajuda e Suporte</Text>
            <View style={{ padding: 25, alignItems: 'center' }}>
              <Text style={styles.modalText}>
                Se estiver com dificuldades no app, alguma dúvida ou sugestões,
                entre em contacto pelas vias:
              </Text>
              <Text style={styles.modalText}>Whatsapp: +244 942 682 194</Text>
              <Text style={styles.modalText}>
                Email: suporte@deliverynobre.co.ao
              </Text>
            </View>
            <TouchableOpacity
              style={{ padding: 10, width: 80 }}
              onPress={() => setSupportModalVisible(false)}
            >
              <Text style={[styles.modalText, { textAlign: 'center' }]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}
