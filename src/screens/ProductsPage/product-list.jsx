import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { ProductItem } from '../../components';

const ProductList = ({ getProducts, refreshing, onRefresh, products }) => {
  const [productData, setProductData] = useState(products);
  const [loading, setLoading] = useState(false);

  /** 
  useEffect(() => {
    setLoading(true);
    setProductData([...products]);
    setLoading(false);
  }, [products]);
*/
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
      keyExtractor={item => item._id}
      // onEndReached={getProducts}
      // onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ProductList;
