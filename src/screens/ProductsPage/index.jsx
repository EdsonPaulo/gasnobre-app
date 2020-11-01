//import { StatusBar } from 'expo-status-bar'
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  CustomButton,
  CustomStatusBar,
  LoadingSpin,
  ProductVerticalItem,
} from '../../components';
import { colors, general, metrics } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';

export default index = () => {
  let isMounted = true;
  const route = useRoute();
  const { token, role } = useContext(authContext);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();

  const [interactionsComplete, setInteractionsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [currentBrand, setCurrentBrand] = useState('all');

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [cartSize, setCartSize] = useState(0);
  const [cart, setCart] = useState([]);

  const openCartModal = () => modalizeRef.current?.open();

  const transformPrice = value =>
    Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(
      value,
    );

  const onRefresh = useCallback(() => {
    if (isMounted) {
      setRefreshing(true);
      setPage(1);
      getProducts();
    }
  }, []);

  const getProducts = () => {
    if (loading) return;
    if (total > 0 && products.length >= total) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    setLoading(true);
    api(token)
      .get(`/products?page=${page}&available=true`)
      .then(response => {
        if (isMounted) {
          setTotal(response.data?.total);
          if (refreshing) setAllProducts(response.data?.data);
          else {
            setAllProducts([...products, ...response.data?.data]);
            selectBrand();
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

  const selectBrand = brand => {
    if (brand)
      setProducts(allProducts.filter(product => product.brand === brand));
    else setProducts(allProducts);
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
        console.log('removendo o item');
      } else {
        cart.splice(updatedItemIndex, 1);
        cart.push({ ...item, quantity });
      }
    }
  };

  const renderProductsList = () => {
    if (loading && products.length == 0)
      return <LoadingSpin text="Carregando Produtos" />;
    return (
      <>
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
          onEndReached={getProducts}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={
            products.length !== total && loading ? (
              <View style={{ margin: metrics.doubleBaseMargin }}>
                <ActivityIndicator color={colors.dark} size="small" />
              </View>
            ) : null
          }
        />
      </>
    );
  };

  const renderCart = () => (
    <View style={{ margin: 15, textAlign: 'center' }}>
      <Text style={{ textAlign: 'center', marginVertical: 15 }}>
        SELECIONOU {cartSize} PRODUTO(S)
      </Text>
      {cart.map(product => (
        <View
          key={product._id}
          style={{
            borderWidth: 1,
            borderColor: colors.borderColor,
            padding: metrics.baseMargin,
            borderRadius: metrics.baseRadius,
            marginVertical: metrics.smallMargin,
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            {product.name} -{' '}
            {product.weight <= 0.99
              ? `${product.weight * 1000}ml`
              : `${product.weight}L`}{' '}
            ({product.quantity} embalagens de {product.bottles} garrafas) ={' '}
            {transformPrice(product.price * product.quantity)}
          </Text>
        </View>
      ))}
    </View>
  );
  const renderEmpty = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Entypo name="emoji-sad" size={40} color={colors.grayDark} />
      <Text style={{ marginVertical: 4, color: colors.grayDark }}>
        Falha ao carregar os produtos.
      </Text>
      <Text style={{ color: colors.grayDark }}>
        Verifique a sua internet ou tente mais tarde!
      </Text>
    </View>
  );

  if (!interactionsComplete) {
    return <LoadingSpin />;
  }

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={colors.accent}
        translucent={false}
      />

      <View style={styles.container}>
        {total === 0 && !loading ? renderEmpty() : renderProductsList()}
        {cart.length === 0 ? null : (
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
        )}
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
          {renderCart()}
        </Modalize>
      </View>
    </SafeAreaView>
  );
};
