import AsyncStorage from '@react-native-community/async-storage';
import React, { useMemo, useReducer } from 'react';
import { constants } from '../../constants';
import { saveOnAsyncStorage } from '../../services/utils';
import AuthContext from './auth-context';
import {
  authReducer,
  LOGIN,
  LOGOUT,
  REGISTER,
  RETRIEVE_TOKEN,
  UPDATE_USER,
} from './auth-reducer';

const AuthProvider = props => {
  const [authState, dispatch] = useReducer(authReducer, {
    user: {},
    token: null,
    role: null,
    isLogged: false,
    isLoading: true,
  });

  const login = async (user, token, role) => {
    try {
      await AsyncStorage.multiSet([
        [constants.USER_KEY, JSON.stringify(user)],
        [constants.TOKEN_KEY, token],
        [constants.ROLE_KEY, role],
      ]);
      dispatch({ type: LOGIN, user, token, role });
    } catch (error) {
      throw new Error(error);
    }
  };

  const logout = async () => {
    try {
      //REMOVE DATA
      await AsyncStorage.multiRemove([
        constants.TOKEN_KEY,
        constants.ROLE_KEY,
        constants.USER_KEY,
      ]);
      dispatch({ type: LOGOUT });
    } catch (error) {
      throw new Error(error);
    }
  };

  const retrieveToken = async () => {
    let user, token, role;
    try {
      user = await AsyncStorage.getItem(constants.USER_KEY);
      user = JSON.parse(user);
      role = await AsyncStorage.getItem(constants.ROLE_KEY);
      token = await AsyncStorage.getItem(constants.TOKEN_KEY);
    } catch (e) {
      // Restoring token failed
    }
    // After restoring token, we may need to validate it in production apps
    dispatch({ type: RETRIEVE_TOKEN, token, user, role });
  };

  const register = async (user, token, role) => {
    try {
      await AsyncStorage.multiSet([
        [constants.USER_KEY, JSON.stringify(user)],
        [constants.ROLE_KEY, role],
        [constants.TOKEN_KEY, token],
      ]);
      dispatch({ type: REGISTER, user, token, role });
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateUser = user => {
    if (user) {
      saveOnAsyncStorage(constants.USER_KEY, user);
      dispatch({ type: UPDATE_USER, user });
    }
  };

  const value = useMemo(() => ({
    user: authState.user,
    token: authState.token,
    role: authState.role,
    isLogged: !!authState.token,
    isLoading: authState.isLoading,

    login: login,
    logout: logout,
    register: register,
    updateUser: updateUser,
    retrieveToken: retrieveToken,
  }));

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
