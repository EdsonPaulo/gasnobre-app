import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../constants';
import styles from './styles';

const NoProducts = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Feather name="shopping-bag" size={40} color={colors.grayDark} />
    <Text style={[styles.body, { marginTop: 15 }]}>
      Sem produtos para essa categoria!
    </Text>
  </View>
);

export default NoProducts;
