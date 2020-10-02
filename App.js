import { Acme_400Regular } from '@expo-google-fonts/acme'
import {
  RobotoCondensed_400Regular,
  RobotoCondensed_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto-condensed'
import { AppLoading } from 'expo'
import 'intl'
import 'intl/locale-data/jsonp/pt-AO'
import React from 'react'
import 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import AuthProvider from './src/contexts/auth/auth-provider'
import Router from './src/routes/Router'

enableScreens()

export default function App() {
  let [fontsLoaded] = useFonts({
    RobotoCondensed_400Regular,
    RobotoCondensed_700Bold,
    Acme_400Regular,
  })

  if (!fontsLoaded) return <AppLoading />
  else
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <Router />
        </SafeAreaProvider>
      </AuthProvider>
    )
}
