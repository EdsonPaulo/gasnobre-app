import React, { useReducer, useMemo } from 'react';

import ShopContext from './shop-context';
import {
  shopReducer,
  LOAD_PRODUCTS,
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from './shop-reducer';

const ShopProvider = props => {
  const [cartState, dispatch] = useReducer(shopReducer, { products: [], cart: [], total: 0 });

  const loadProducts = products => {
    dispatch({ type: LOAD_PRODUCTS, products });
  };

  const addProductToCart = product => {
    dispatch({ type: ADD_PRODUCT, product });
  };

  const removeProductFromCart = product => {
    dispatch({ type: REMOVE_PRODUCT, product });
  };

  const incrementProductQuantity = product => {
    dispatch({ type: INCREMENT_QUANTITY, product });
  };

  const decrementProductQuantity = product => {
    dispatch({ type: DECREMENT_QUANTITY, product });
  };

  const value = useMemo(() => {
    return {
      cart: cartState.cart,
      total: cartState.total,
      products: cartState.products,
      loadProducts,
      addProductToCart,
      removeProductFromCart,
      incrementProductQuantity,
      decrementProductQuantity,
    };
  }, [cartState]);

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopProvider;
