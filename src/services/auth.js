import axios from 'axios'
import * as Facebook from 'expo-facebook'
import { Alert } from 'react-native'

import api from '../services/api'
import { constants } from '../constants'

export async function register(data) {
  try {
    let res = await axios.post(api + '/auth/register', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function login(data) {
  try {
    let res = await axios.post(api + '/auth/login', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

export async function forgotPassword(data) {
  try {
    let res = await axios.post(api + '/auth/forgot', data)

    return res.data
  } catch (e) {
    throw handler(e)
  }
}

/*
export async function updateProfile(userId, data) {
  try {
    const options = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      }
    }
    const form_data = new FormData()
    for (let key in data)
      form_data.append(key, data[key])

    let res = await axios.put(`${c.UPDATE_PROFILE}/${userId}`, form_data, options)
    return res.data
  } catch (e) {
    throw handler(e)
  }
}
*/

export function handler(err) {
  let error = err

  if (err.response && err.response.data.hasOwnProperty('message'))
    error = err.response.data
  else if (!err.hasOwnProperty('message')) error = err.toJSON()

  return new Error(error.message)
}

export const facebookAuth = async () => {
  try {
    await Facebook.initializeAsync({
      appId: constants.FACEBOOK_APP_ID,
      appName: 'Delivery Nobre',
    })
    const auth = await Facebook.getAuthenticationCredentialAsync()
    console.log(" autenticado"+ JSON.stringify(auth))
    if (auth) await Facebook.logOutAsync()

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    })
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email,address&access_token=${token}`,
      )
      console.log(await response.json())
      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`)
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`)
  }
}

export const toggleAuthAsync = async () => {
  const auth = await Facebook.getAuthenticationCredentialAsync()

  if (!auth) {
    // Log in
  } else {
    // Log out
  }
}

// Get default info about the currently authenticated user.
async function getUserAsync() {
  const { name } = await requestAsync('me')
  console.log(`Hello ${name} 👋`)
}

// Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
async function requestAsync(path, token) {
  let resolvedToken = token
  if (!token) {
    const auth = await Facebook.getAuthenticationCredentialAsync()
    if (!auth) {
      throw new Error(
        'User is not authenticated. Ensure `logInWithReadPermissionsAsync` has successfully resolved before attempting to use the FBSDK Graph API.',
      )
    }
    resolvedToken = auth.token
  }
  const response = await fetch(
    `https://graph.facebook.com/${path}?access_token=${encodeURIComponent(
      resolvedToken,
    )}`,
  )
  const body = await response.json()
  return body
}
