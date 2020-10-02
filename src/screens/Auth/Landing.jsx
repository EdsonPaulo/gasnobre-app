import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, CustomStatusBar } from '../../components'
import { colors, metrics } from '../../constants'
import styles from './styles'

const Landing = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView
      style={[styles.background, { padding: metrics.tripleBaseMargin }]}
    >
      <CustomStatusBar
        barStyle="dark-content"
        style="dark"
        backgroundColor={colors.bgColor}
        translucent={false}
      />

      <View style={{ flex: 1.3 / 2, width: '100%' }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/logo.png')}
          style={{ flex: 1.7 / 2, width: '100%' }}
        />
        <Text style={styles.subtitle}>Isso é um texto slogan de exemplo</Text>
      </View>

      <View
        style={{
          width: '100%',
          flex: 0.7 / 2,
          justifyContent: 'flex-start',
          paddingHorizontal: metrics.baseMargin,
        }}
      >
        <CustomButton
          primary
          title="ENTRAR NA CONTA"
          onPress={() => navigation.navigate('login')}
        />
        <CustomButton
          title="Criar Conta"
          onPress={() => navigation.navigate('signup')}
        />
      </View>
      <Text style={styles.copyrightText}>© 2020 - Delivery Nobre</Text>
    </SafeAreaView>
  )
}
export default Landing
