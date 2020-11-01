import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { InteractionManager, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar, LoadingSpin } from '../../components';
import { colors, general, metrics } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import { transformPrice } from '../../services/utils';
import Cart from './cart';
import EmptyCart from './empty-cart';
import BrandList from './brandList';
import ProductList from './productList';
import styles from './styles';

export default index = () => {
  let isMounted = true;
  const route = useRoute();
  const { token } = useContext(authContext);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const [interactionsComplete, setInteractionsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [currentBrand, setCurrentBrand] = useState(null);

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartSize, setCartSize] = useState(0);
  const [cart, setCart] = useState([]);

  const openCartModal = () => modalizeRef.current?.open();

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true);
      setPage(1);
      getProducts();
    }
  }, []);

  const getProducts = () => {
    if (loading) return;
    if (total > 0 && allProducts.length >= total) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setLoading(true);
    api(token)
      .get(`/products?page=${page}`)
      .then(response => {
        if (isMounted) {
          setTotal(response.data?.total);
          if (refreshing) setAllProducts(response.data?.data);
          else {
            setAllProducts([...allProducts, ...response.data?.data]);
            filterByBrand();
          }
          setPage(page + 1);
        }
      })
      .catch(error => {
        console.log(error + ' ==> erro');
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
          setRefreshing(false);
        }
      });
  };

  const filterByBrand = brand => {
    const filteredBrand = brand || currentBrand;
    if (!filteredBrand || filteredBrand.name === 'tudo')
      setProducts(allProducts);
    else
      setProducts(
        allProducts.filter(product => product.brand === filteredBrand.name),
      );
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
    }).then(() => {
      isMounted = true;
      getProducts();
    });
    return () => (isMounted = false);
  }, []);

  const handleQuantity = (quantity, item, increment) => {
    const updatedItemIndex = cart.findIndex(
      product => product._id === item._id,
    );
    if (increment) {
      setCartSize(cartSize + 1);
      setSubtotal(subtotal + item.price);

      if (updatedItemIndex < 0) cart.push({ ...item, quantity: 1 });
      else {
        cart.splice(updatedItemIndex, 1);
        cart.push({ ...item, quantity });
      }
    } else {
      setCartSize(cartSize - 1);
      setSubtotal(subtotal - item.price);

      if (quantity <= 0) {
        cart.splice(updatedItemIndex, 1);
      } else {
        cart.splice(updatedItemIndex, 1);
        cart.push({ ...item, quantity });
      }
    }
  };

  const renderProducts = () => {
    if (loading && allProducts.length == 0)
      return <LoadingSpin text="Carregando Produtos" />;
    return (
      <>
        <View style={styles.brandListContainer}>
          <BrandList filterByBrand={filterByBrand} />
        </View>
        <View
          style={[
            styles.container,
            products.length <= 0 && {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {products.length > 0 ? (
            <ProductList handleQuantity={handleQuantity} products={products} />
          ) : (
            <Text style={styles.body}>
              Não tem produto para essa categoria!
            </Text>
          )}
        </View>
      </>
    );
  };

  const renderCartBadge = () => (
    <TouchableOpacity
      onPress={() => openCartModal()}
      activeOpacity={0.7}
      style={[styles.fabPosition, styles.fabBagButton]}
    >
      <View style={[styles.fabPosition, styles.fabBagButtonBadge]}>
        <Text style={{ color: '#fff' }}>{cartSize}</Text>
      </View>
      <Entypo name="shopping-bag" color="#fff" size={25} />
    </TouchableOpacity>
  );

  if (!interactionsComplete) {
    return <LoadingSpin />;
  }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        style="light"
        barStyle="light-content"
        backgroundColor={colors.accent}
      />

      <View style={styles.container}>
        {total === 0 && !loading ? <EmptyCart /> : renderProducts()}

        {cart.length > 0 && renderCartBadge()}

        <Modalize
          ref={modalizeRef}
          rootStyle={{ elevation: 5 }}
          modalHeight={metrics.screenHeight - 200}
          FooterComponent={
            <CustomButton
              primary
              style={styles.makeOrderButton}
              rounded
              onPress={() =>
                navigation.navigate('checkout', { cart, subtotal })
              }
              title={`Fazer Pedido (${transformPrice(subtotal)})`}
            />
          }
        >
          <Cart cart={cart} cartSize={cartSize} />
        </Modalize>
      </View>
    </SafeAreaView>
  );
};
