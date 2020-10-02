import React from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../constants'

const Splash = ({ text }) => (
  <SafeAreaView
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
      backgroundColor: colors.bgColor,
    }}
  >
    <Image
      resizeMode="contain"
      source={require('../../assets/logo-transparent.png')}
      style={{ width: '100%' }}
    />
    <View>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ fontSize: 17 }}> {text || 'Carregando...'}</Text>
    </View>
  </SafeAreaView>
)

export default Splash
