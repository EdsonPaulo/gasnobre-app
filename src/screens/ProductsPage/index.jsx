import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  InteractionManager,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar, LoadingSpin } from '../../components';
import { colors, general, metrics } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import shopContext from '../../contexts/shop/shop-context';
import api from '../../services/api';
import { transformPrice } from '../../services/utils';
import BrandList from './brands-list';
import CartView from './cart-view';
import RenderError from './error-content';
import NoProducts from './no-products';
import ProductList from './product-list';
import styles from './styles';

export default index = () => {
  let isMounted = true;
  const { token } = useContext(authContext);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const { cart, total, products, loadProducts } = useContext(shopContext);

  const [interactionsComplete, setInteractionsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);

  const [brands] = useState(['tudo', 'atlantis', 'perla', 'pura', 'saudabel']);
  const [currentBrand, setCurrentBrand] = useState(brands[0]);

  const openCartModal = () => modalizeRef.current?.open();

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true);
      setPage(1);
      filterByBrand();
      setCurrentBrand(brands[0]);
    }
  }, []);

  const getProducts = async brand => {
    if (loading) return;
    setLoading(true);
    try {
      const filters = `page=${page}${brand ? `&brand=${brand}` : ''}`;
      const response = await api(token).get(`/products?${filters}`);
      if (isMounted) {
        setTotalProducts(response.data?.total);
        loadProducts(response.data?.data || []);
      }
    } catch (error) {
      console.log(error + ' ==> erro');
      setError(true);
      ToastAndroid.show(
        'Ocorreu um erro ao carregar a lista de produtos! Verifique a sua conexão.',
        ToastAndroid.LONG,
      );
    } finally {
      if (isMounted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  const filterByBrand = brand => {
    setPage(1);
    setRefreshing(true);
    setCurrentBrand(brand || brands[0]);
    if (!brand || brand === brands[0]) getProducts();
    else getProducts(brand);
  };

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setInteractionsComplete(true);
    }).then(() => {
      isMounted = true;
      setCurrentBrand(brands[0]);
      getProducts();
    });
    return () => (isMounted = false);
  }, []);

  const renderProducts = () => {
    return (
      <>
        <View style={styles.brandListContainer}>
          <BrandList
            brands={brands}
            filterByBrand={filterByBrand}
            currentBrand={currentBrand}
          />
        </View>

        {loading && products.length <= 0 ? (
          <LoadingSpin text="Carregando Produtos" />
        ) : loading && refreshing ? (
          <LoadingSpin />
        ) : error ? (
          <RenderError />
        ) : (
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
              <ProductList onRefresh={onRefresh} refreshing={refreshing} />
            ) : (
              <NoProducts />
            )}
          </View>
        )}
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
        <Text style={{ color: '#fff' }}>{cart.length}</Text>
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
        {renderProducts()}

        {cart.length > 0 && renderCartBadge()}

        <Modalize
          ref={modalizeRef}
          rootStyle={{ elevation: 5 }}
          modalHeight={metrics.screenHeight - 150}
          FooterComponent={
            <CustomButton
              primary
              style={styles.makeOrderButton}
              rounded
              onPress={() => navigation.navigate('checkout')}
              title={`Fazer Pedido (${transformPrice(total)})`}
            />
          }
        >
          <CartView />
        </Modalize>
      </View>
    </SafeAreaView>
  );
};
