import React, { useContext } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { ProductItem } from '../../components';
import shopContext from '../../contexts/shop/shop-context';

const ProductList = ({ refreshing, onRefresh }) => {
  const { products } = useContext(shopContext);
  return (
    <FlatList
      bounces
      horizontal
      data={products}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
      renderItem={({ item }) => (
        <ProductItem product={{ ...item, quantity: 0 }} />
      )}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ProductList;
