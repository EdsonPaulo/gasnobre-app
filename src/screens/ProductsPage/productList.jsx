import React from 'react';
import { FlatList } from 'react-native';
import { ProductVerticalItem } from '../../components';

const ProductList = ({ products, handleQuantity }) => {
  return (
    <FlatList
      bounces
      horizontal
      data={products}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 15 }}
      renderItem={({ item }) => (
        <ProductVerticalItem handleQuantity={handleQuantity} {...item} />
      )}
      keyExtractor={(item, index) => index.toString()}
      // onEndReached={getProducts}
      //  onEndReachedThreshold={0.5}
      /*refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      */
    />
  );
};

export default ProductList;
