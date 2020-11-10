import { Entypo } from '@expo/vector-icons';
import React, { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colors } from '../../constants';
import ShopContext from '../../contexts/shop/shop-context';
import { transformPrice } from '../../services/utils';
import styles from './styles';

const Cart = props => {
  const {
    cart,
    incrementProductQuantity,
    decrementProductQuantity,
  } = useContext(ShopContext);

  return (
    <View style={{ margin: 10, textAlign: 'center' }}>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 15,
          fontFamily: 'RobotoCondensed_700Bold',
        }}
      >
        {`${cart.length} ${
          cart.length > 1 ? 'PRODUTOS' : 'PRODUTO'
        } NO CARRINHO`}
      </Text>

      {cart.map(product => (
        <View style={styles.productContainer} key={product._id}>
          <View style={styles.productImage}>
            <PlaceholderImage
              style={styles.productImage}
              source={
                (product.image && { uri: product.image }) ||
                require('../../assets/noimage.png')
              }
            />
          </View>
          <View style={styles.productInfoContainer}>
            <View style={styles.productTextContainer}>
              <Text style={styles.productTitle}>
                {product.name}{' '}
                {product.weight < 1
                  ? `${product.weight * 1000}ml`
                  : `${product.weight}L`}
              </Text>
              <Text style={styles.productSubtitle}>
                {`${product.quantity} ${
                  product.quantity < 2 ? 'embalagem' : 'embalagens'
                } de ${product.bottles} garrafas`}
              </Text>

              <Text style={styles.productPrice}>
                {transformPrice(product.price * product.quantity)}
              </Text>
            </View>
            <View style={styles.productActionContainer}>
              <Entypo
                size={30}
                name="squared-plus"
                color={colors.white}
                onPress={() => incrementProductQuantity(product._id)}
              />
              <Text style={styles.productQuantity}>{product.quantity}</Text>
              <Entypo
                size={30}
                name="squared-minus"
                color={colors.white}
                onPress={() => decrementProductQuantity(product._id)}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Cart;
