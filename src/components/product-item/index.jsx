import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, general } from '../../constants';
import ShopContext from '../../contexts/shop/shop-context';
import PlaceholderImage from '../PlaceholderImage';
import styles from './styles';

const ProductItem = ({ product }) => {
  const { cart, addProductToCart } = useContext(ShopContext);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (cart.find(item => item._id === product._id)) setAdded(true);
    else setAdded(false);
  }, [cart.length]);

  const handleAddProduct = () => {
    setAdded(true);
    addProductToCart(product);
  };

  return (
    <View style={[general.card, styles.container, {}]} key={product?._id}>
      <View style={styles.productImageContainer}>
        <PlaceholderImage
          style={styles.productImage}
          source={
            product.image
              ? { uri: product.image }
              : require('../../assets/noimage.png')
          }
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {product.name} -{' '}
          {product.weight <= 0.99
            ? `${product.weight * 1000}ml`
            : `${product.weight}L`}
        </Text>
        <Text style={styles.description}>
          {product.bottles} garrafas de{' '}
          {product.weight <= 0.99
            ? `${product.weight * 1000} mililitros`
            : `${product.weight} litros`}
        </Text>

        <Text style={styles.price}>
          {Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
          }).format(product.price)}
        </Text>

        <View>
          <TouchableOpacity
            style={[
              styles.btn,
              { backgroundColor: added ? colors.grayDark2 : colors.accent },
            ]}
            disabled={added}
            activeOpacity={0.8}
            onPress={handleAddProduct}
          >
            <MaterialCommunityIcons
              size={20}
              color={colors.white}
              name="cart-plus"
            />
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;
