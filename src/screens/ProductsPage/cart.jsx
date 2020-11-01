import React from 'react';
import { Text, View } from 'react-native';
import { colors, metrics } from '../../constants';
import { transformPrice } from '../../services/utils';

const Cart = ({ cart, cartSize }) => {
  return (
    <View style={{ margin: 15, textAlign: 'center' }}>
      <Text style={{ textAlign: 'center', marginVertical: 15 }}>
        SELECIONOU {cartSize} PRODUTO(S)
      </Text>
      {cart.map(product => (
        <View
          key={product._id}
          style={{
            borderWidth: 1,
            borderColor: colors.borderColor,
            padding: metrics.baseMargin,
            borderRadius: metrics.baseRadius,
            marginVertical: metrics.smallMargin,
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {product.name}
            {' - '}
            {product.weight <= 0.99
              ? `${product.weight * 1000}ml`
              : `${product.weight}L`}{' '}
            ({product.quantity} embalagens de {product.bottles} garrafas) ={' '}
            {transformPrice(product.price * product.quantity)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Cart;
