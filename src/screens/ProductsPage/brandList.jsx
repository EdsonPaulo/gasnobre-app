import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../constants';
import styles from './styles';

const BrandList = ({ filterByBrand }) => {
  const [brands] = useState([
    { name: 'tudo' },
    { name: 'atlantis' },
    { name: 'perla' },
    { name: 'pura' },
    { name: 'saudabel' },
  ]);
  const [currentBrand, setCurrentBrand] = useState(brands[0]);

  const BrandItem = brand => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        setCurrentBrand(brand);
        filterByBrand(brand);
      }}
      style={[
        styles.brandItem,
        currentBrand.name === brand.name && { backgroundColor: 'white' },
      ]}
    >
      <Text
        style={[
          styles.brandItemText,
          currentBrand.name === brand.name && { color: colors.grayDark2 },
        ]}
      >
        {brand.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      bounces
      horizontal
      showsHorizontalScrollIndicator={false}
      data={brands}
      style={{ height: 20 }}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => <BrandItem {...item} />}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default BrandList;
