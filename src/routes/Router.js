import React, { useContext, useEffect, useState, useRef } from 'react'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

import { AsyncStorage, Platform } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

import { AuthNavigation, MainNavigation, AdminNavigation } from './MainNavigation'

import AuthContext from '../contexts/auth/auth-context'
import Splash from '../components/Splash'
import { constants } from '../constants'

export default Router = () => {

  const { role, isLogged, isLoading, retrieveToken } = useContext(AuthContext)
  const [pushToken, setPushToken] = useState(null)
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    })
  })

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
          return
        }
        else console.log("permissão garantida")

        const token = await Notifications.getExpoPushTokenAsync()
        await AsyncStorage.setItem(constants.PUSH_TOKEN_KEY, JSON.stringify(token.data))
        console.log("PUSH TOKEN: " + token)
        setPushToken(token?.data)
      }
      else {
        alert('Must use physical device for Push Notifications')
      }
      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        })
      }
    } catch (error) { console.log(error) }
  }


  const verifyExpoPushToken = async () => {
    try {
      const expoPushToken = await AsyncStorage.getItem(constants.PUSH_TOKEN_KEY)
      if (expoPushToken) setPushToken(expoPushToken)
      else await registerForPushNotificationsAsync()
    }
    catch (error) { console.log(error) }
  }


  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  const sendPushNotification = async (expoPushToken) => {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Delivery Nobre - Um cliente fez um pedido.',
      body: 'O cliente Edson Customer fez um pedido,',
      data: { data: 'goes here' },
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    })
  }


  useEffect(() => {
    await verifyExpoPushToken()
    retrieveToken()
    if (pushToken)
      sendPushNotification()

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
      console.log("Notifição: ", notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    }
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