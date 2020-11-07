import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants';
import logo from '../../assets/splash.png';

const Splash = () => (
  <ImageBackground
    resizeMode="cover"
    source={logo}
    style={{
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: 10,
      flex: 1,
    }}
  >
    <View>
      <ActivityIndicator size="large" color={colors.white} />
      <Text style={{ fontSize: 17, color: colors.white }}>A Carregar</Text>
    </View>
  </ImageBackground>
);

export default Splash;
