import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
enableScreens()
import 'intl'
import 'intl/locale-data/jsonp/pt-AO'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './src/routes/Router'
import AuthProvider from './src/contexts/auth/auth-provider'
import { useFonts, OleoScript_400Regular } from '@expo-google-fonts/oleo-script'
import { Roboto_400Regular } from '@expo-google-fonts/roboto'

export default function App() {
  let [fontsLoaded] = useFonts({
    OleoScript_400Regular,
    Roboto_400Regular
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