import 'react-native-gesture-handler'
import React from 'react'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import 'intl'
import 'intl/locale-data/jsonp/pt-AO'

import { RobotoCondensed_400Regular, RobotoCondensed_700Bold } from '@expo-google-fonts/roboto-condensed'
import { useFonts, Amarante_400Regular } from '@expo-google-fonts/amarante'

import Router from './src/routes/Router'
import AuthProvider from './src/contexts/auth/auth-provider'

enableScreens()

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
    Amarante_400Regular
  })

  if (!fontsLoaded)
    return <AppLoading />
  else
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </AuthProvider>
    )
}