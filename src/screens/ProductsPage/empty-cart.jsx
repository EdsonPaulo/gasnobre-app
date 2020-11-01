import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../constants';
import styles from './styles';

const EmptyCart = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Entypo name="emoji-sad" size={40} color={colors.grayDark} />
    <Text style={[styles.body, { marginVertical: 4 }]}>
      Falha ao carregar os produtos.
    </Text>
    <Text style={styles.body}>
      Verifique a sua internet ou tente mais tarde!
    </Text>
  </View>
);

export default EmptyCart;
