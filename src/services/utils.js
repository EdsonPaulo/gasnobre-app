import AsyncStorage from '@react-native-community/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Alert, ToastAndroid } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate';
import { constants } from '../constants';
import api from './api';

//import Share from 'react-native-share'

export const onRate = async () => {
  const options = {
    AppleAppID: '2193813192',
    GooglePackageName: 'com.okulikapaco.nobiva',
    //  AmazonPackageName: 'com.okulikapaco.nobiva'",
    // OtherAndroidURL: "http://www.randomappstore.com/app/47172391",
    preferredAndroidMarket: AndroidMarket.Google,
    preferInApp: false,
    openAppStoreIfInAppFails: true,
    fallbackPlatformURL: 'http://deltacorp.co.ao/',
  };
  Alert.alert(
    'Avaliar o No Biva',
    'Avalie-nos, comente o que achou e em que podemos melhorar!',
    [
      { text: 'Não, Obrigado', style: 'cancel' },
      {
        text: 'Avaliar',
        onPress: () => {
          Rate.rate(options, success => {
            if (success) ToastAndroid.show('Obrigado por Avaliar-nos!');
          });
        },
      },
    ],
    { cancelable: true },
  );
};

export const onShare = () => {
  /** 
    try {
        const result = await Share.share({
            title: 'CarneSul',
            message: 'Carnesul | Carnes Frescas de Boa Qualidade',
            url: 'https://deltacorp.co.ao',
        }, { dialogTitle: 'CarneSul' })

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    }
    catch (error) { alert(error.message) }

    const url = 'http://deltacorp.co.ao'
    const title = 'CarneSul'
    const message = 'Compartilhe o carnesul com amigos. Compartilhar é Carinhoso :)'
    //const icon = 'data:<data_type>/<file_extension>base64,<base64_data>'
    const options = Platform.select({
        ios: {
            activityItemSources: [
                { // For sharing url with custom title.
                    placeholderItem: { type: 'url', content: url },
                    item: {
                        default: {
                            type: 'text',
                            content: `${message} ${url}`
                        }
                    },
                    subject: { default: title },
                    linkMetadata: { originalUrl: url, url, title },
                }
            ],
        },
        default: {
            title,
            subject: title,
            message: `${message} ${url}`,
        },
    })

    Share.open(options)
    */
};

//save in async storage

export const transformPrice = value =>
  Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(
    value,
  );

export const uploadImage = (file, token) => {
  const nameFile = `file_name_${Math.random().toString(36).substring(7)}`;
  const formData = new FormData();
  formData.append('file', {
    name: file.fileName || nameFile,
    type: file.mime,
    uri: file.path,
  });
  return (
    api(token).post('/files'),
    formDaa,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};

export const verifyExpoPushToken = async () => {
  try {
    const expoPushToken = await AsyncStorage.getItem(constants.PUSH_TOKEN_KEY);
    return JSON.parse(expoPushToken);
  } catch (error) {
    console.log(error, error?.response?.data);
    return null;
  }
};

export const getNotificationsPermission = async () => {
  try {
    if (!Constants.isDevice)
      console.log('Must use physical device for Push Notifications');
    else {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS,
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS,
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      } else console.log('permissão garantida');

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          sound: true,
          showBadge: true,
          enableVibrate: true,
          enableLights: true,
          lockscreenVisibility: Notifications.AndroidImportance.HIGH,
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      }
      return Notifications.getExpoPushTokenAsync();
    }
  } catch (error) {
    console.log(error, error?.response?.data);
  }
};

export const getExpoPushToken = async () => {
  try {
    const expoPushToken = await AsyncStorage.getItem(constants.PUSH_TOKEN_KEY);
    if (expoPushToken) return expoPushToken;
    return getNotificationsPermission();
  } catch (error) {
    console.log(error);
  }
};

export const saveOnAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
    console.log('ocorreu um erro inesperado ao salvar dados!');
  }
};

export const readOnAsyncStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) return data;
  } catch (error) {
    console.log(error);
    console.log('ocorreu um erro inesperado!');
  }
};
