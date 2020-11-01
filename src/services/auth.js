import axios from 'axios';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

import api from '../services/api';
import { constants } from '../constants';

export function handler(err) {
  let error = err;
  if (err.response && err.response.data.hasOwnProperty('message'))
    error = err.response.data;
  else if (!err.hasOwnProperty('message')) error = err.toJSON();

  return new Error(error.message);
}

export async function register(data) {
  try {
    return axios.post(api + '/register', data);
  } catch (e) {
    throw handler(e);
  }
}

export async function login(data) {
  try {
    return axios.post(api + '/authenticate', data);
  } catch (e) {
    throw handler(e);
  }
}

export async function forgotPassword(data) {
  try {
    return axios.post(api + '/forgot', data);
  } catch (e) {
    throw handler(e);
  }
}

export const facebookAuth = async () => {
  try {
    await Facebook.initializeAsync({
      appId: constants.FACEBOOK_APP_ID,
      appName: 'Delivery Nobre',
    });
    const auth = await Facebook.getAuthenticationCredentialAsync();
    console.log(' autenticado' + JSON.stringify(auth));
    if (auth) await Facebook.logOutAsync();

    const { type, token } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile', 'email'],
    });

    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      return fetch(
        `https://graph.facebook.com/me?fields=id,name,email,address&access_token=${token}`,
      );
    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
};

export const toggleAuthAsync = async () => {
  const auth = await Facebook.getAuthenticationCredentialAsync();

  if (!auth) {
    // Log in
  } else {
    // Log out
  }
};

// Get default info about the currently authenticated user.
async function getUserAsync() {
  const { name } = await requestAsync('me');
  console.log(`Hello ${name} 👋`);
}

// Learn more https://developers.facebook.com/docs/graph-api/using-graph-api/
async function requestAsync(path, token) {
  let resolvedToken = token;
  if (!token) {
    const auth = await Facebook.getAuthenticationCredentialAsync();
    if (!auth) {
      await facebookAuth();
    }
    resolvedToken = auth.token;
  }
  const response = await fetch(
    `https://graph.facebook.com/${path}?access_token=${encodeURIComponent(
      resolvedToken,
    )}`,
  );
  const body = await response.json();
  return body;
}
