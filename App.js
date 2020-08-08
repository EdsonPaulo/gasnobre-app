import 'react-native-gesture-handler'
import React from 'react'
import { enableScreens } from 'react-native-screens'
enableScreens()
import 'intl'
import 'intl/locale-data/jsonp/pt-AO'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from './src/routes/Router'
import AuthProvider from './src/contexts/auth/auth-provider'

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <Router />
      </SafeAreaProvider>
    </AuthProvider>
  )
}