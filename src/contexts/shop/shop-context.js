import React from 'react';

export default React.createContext({
  products: [],
  cart: [],
  total: 0,
  loadProducts: products => {},
  addProductToCart: product => {},
  removeProductFromCart: productId => {},
  incrementProductQuantity: productId => {},
  decrementProductQuantity: productId => {},
});
