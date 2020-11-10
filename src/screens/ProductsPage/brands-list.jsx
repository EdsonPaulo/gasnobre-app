import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants';
import styles from './styles';

const BrandList = ({ brands, currentBrand, filterByBrand }) => {
  const BrandItem = ({ brand }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => filterByBrand(brand)}
      style={[
        styles.brandItem,
        currentBrand === brand && { backgroundColor: 'white' },
      ]}
    >
      <Text
        style={[
          styles.brandItemText,
          currentBrand === brand && { color: colors.grayDark2 },
        ]}
      >
        {brand}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      bounces
      horizontal
      data={brands}
      style={{ height: 20 }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => <BrandItem brand={item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default BrandList;
