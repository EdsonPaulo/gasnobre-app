import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import React, { useContext, useEffect, useRef, useState } from 'react';

import Splash from '../components/Splash';
import AuthContext from '../contexts/auth/auth-context';
import {
  AdminNavigation,
  AuthNavigation,
  MainNavigation
} from './MainNavigation';

export default Router = () => {
  const { role, isLogged, isLoading, retrieveToken } = useContext(AuthContext);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });


  useEffect(() => {
    retrieveToken();
    // if (pushToken)  sendPushNotification(pushToken)
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      notification => {
        setNotification(notification);
        // console.log("Notificação: ", notification)
      },
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      },
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const RootStack = createStackNavigator();
  return (
    <NavigationContainer>
      <>
        {
          <RootStack.Navigator screenOptions={{ headerShown: false }}>
            {isLoading ? (
              <RootStack.Screen name="Splash" component={Splash} />
            ) : isLogged && role === 'customer' ? (
              <RootStack.Screen name="customer" component={MainNavigation} />
            ) : isLogged && role === 'admin' ? (
              <RootStack.Screen name="admin" component={AdminNavigation} />
            ) : (
                    <RootStack.Screen name="auth" component={AuthNavigation} />
                  )}
          </RootStack.Navigator>
        }
      </>
    </NavigationContainer>
  );
};
