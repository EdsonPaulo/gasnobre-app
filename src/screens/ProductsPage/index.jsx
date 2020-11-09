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
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  Text,
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
import CartView from './cart-view';
import EmptyCart from './empty-cart';
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
  const [refreshing, setRefreshing] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);

  const [brands] = useState(['tudo', 'atlantis', 'perla', 'pura', 'saudabel']);
  const [productsCurrent, setProductsCurrent] = useState([]);
  const [currentBrand, setCurrentBrand] = useState(brands[0]);

  const openCartModal = () => modalizeRef.current?.open();

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true);
      setPage(1);
      getProducts();
      setCurrentBrand(brands[0]);
      filterByBrand();
    }
  }, []);

  const getProducts = async brand => {
    if (loading) return;
    if (totalProducts > 0 && products.length >= totalProducts) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setLoading(true);
    try {
      const filters = `page=${page}${brand ? `&brand=${brand}` : ''}`;
      console.log('buscando: ', `/products?${filters}`);

      const response = await api(token).get(`/products?${filters}`);
      console.log(response.data)
      if (isMounted) {
        setTotalProducts(response.data?.totalProducts);
        if (refreshing) loadProducts(response.data?.data);
        else {
          loadProducts([...products, ...response.data?.data]);
          //filterByBrand();
        }
       // setPage(page + 1);
      }
    } catch (error) {
      console.log(error + ' ==> erro');
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
    setLoading(true);
    setPage(1);
    setCurrentBrand(brand || brands[0]);
    /** 
    if (!brand || brand === brands[0]) setProductsCurrent(products);
    else {
      const filteredProducts = products.filter(
        product => product.brand === brand,
      );
      setProductsCurrent(filteredProducts);
    }
    */

    if (!brand || brand === brands[0]) getProducts();
    else getProducts(brand);

    setLoading(false);
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

  const renderBrandList = () => {
    const BrandItem = ({ brand }) => (
      <TouchableOpacity
        key={brand}
        activeOpacity={0.8}
        onPress={() => {
          setCurrentBrand(brand);
          filterByBrand(brand);
        }}
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

  const renderProducts = () => {
    if (loading)
      return <LoadingSpin text="Carregando Produtos" />;
    return (
      <>
        <View style={styles.brandListContainer}>{renderBrandList()}</View>

        {loading && products.length <= 0 ? (
          <LoadingSpin text="Carregando Produtos" />
        ) : (
          <View
            style={[
              styles.container,
              productsCurrent.length <= 0 && {
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
          >
            {productsCurrent.length > 0 ? (
              <ProductList
                products={products}
                onRefresh={onRefresh}
                refreshing={refreshing}
                getProducts={getProducts}
                currentBrand={currentBrand}
              />
            ) : (
              <Text style={styles.body}>
                Não tem produto para essa categoria!
              </Text>
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
        {totalProducts === 0 && !loading ? <EmptyCart /> : renderProducts()}

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
