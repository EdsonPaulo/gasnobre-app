import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { AuthNavigation, MainNavigation, AdminNavigation } from './MainNavigation'

import AuthContext from '../contexts/auth/auth-context'
import Splash from '../components/Splash'

export default Router = () => {

  const { 
    //isLogged, isLoading, 
    retrieveToken } = useContext(AuthContext)

  const role = "customer"
  const isLogged = true
  const isLoading = false

  useEffect(() => {
    const bootstrapAsync = async () => {
      retrieveToken()
    }
    bootstrapAsync()
  }, [])

  const RootStack = createStackNavigator()
  return (
    <NavigationContainer>
      <>
        {
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {
              isLoading ? (<RootStack.Screen name="Splash" component={Splash} />)
              : !isLogged ? (<RootStack.Screen name="auth" component={AuthNavigation} />)
              : (role === "customer") 
              ? (<RootStack.Screen name="customer" component={MainNavigation} />)
              : (role === "admin") 
              ? (<RootStack.Screen name="admin" component={AdminNavigation} />)
              : (<RootStack.Screen name="auth" component={AuthNavigation} />)
            }
          </RootStack.Navigator>
        }
      </>
    </NavigationContainer>
  )
}