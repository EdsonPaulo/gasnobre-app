import Icon from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-community/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar } from '../../components';
import { colors, general } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';

const { height } = Dimensions.get('window');

const index = () => {
  let isMounted = true;

  const { user, token } = useContext(authContext);
  const navigation = useNavigation();
  const route = useRoute();
  const cart = route.params.cart;
  const subtotal = route.params.subtotal;
  const [tax, setTax] = useState(0);
  const [address, setAddress] = useState([]);

  const [deliveryAddress, setDeliveryAddress] = useState(address[0] || '');
  const [orderObs, setOrderObs] = useState('');
  const [loading, setLoading] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    tax,
    subtotal,
    products: [],
    debit: false,
    obs: orderObs,
    total: subtotal + tax,
  });

  const transformPrice = value =>
    Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(
      value,
    );

  useEffect(() => {
    if (isMounted) {
      console.log(user.address);
      setAddress(user?.address);
    }
    return () => (isMounted = false);
  }, [user]);

  //finalizar compra/pedido
  const makeOrder = () => {
    if (loading) return;
    if (!deliveryAddress) {
      Alert.alert('Precisa adicionar o endereço de entrega!');
      return;
    }

    let products = [];
    let order = orderDetails;
    setLoading(true);
    cart.map(product => {
      if (product.product)
        product = { quantity: product.quantity, ...product.product };
      console.log(product._id);
      products.push({
        product: product._id,
        quantity: product.quantity,
      });
    });
    order.products = [...products];
    console.log(order);
    api(token)
      .post('/orders', order)
      .then(response => {
        Alert.alert('Parabéns', response.data.message);
        navigation.navigate('orderStack');
      })
      .catch(error => {
        console.log(error, error?.response?.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={colors.accent}
      />

      <ScrollView
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="list" size={15} color={colors.accent} />
            <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
          </View>
          <View style={styles.section}>
            {cart.map(product => {
              if (product.product)
                product = { quantity: product.quantity, ...product.product };
              return (
                <View key={product._id} style={styles.textContainer}>
                  <Text style={{ textTransform: 'capitalize' }}>
                    {product.name}{' '}
                    {product.weight <= 0.99
                      ? `${product.weight * 1000}ml `
                      : `${product.weight}L `}
                    (x{product.quantity})
                  </Text>
                  <Text>
                    {transformPrice(product.price * product.quantity)}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.textContainer, { marginTop: 15 }]}>
              <Text>Subtotal</Text>
              <Text>{transformPrice(subtotal)} </Text>
            </View>
            <View style={styles.textContainer}>
              <Text>Taxa de Entrega</Text>
              <Text>{transformPrice(tax)} </Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.totalText}>Total </Text>
              <Text style={[styles.totalText, { color: colors.success }]}>
                {' '}
                {transformPrice(subtotal + tax)}{' '}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="info-circle" size={15} color={colors.accent} />
            <Text style={styles.sectionTitle}>Detalhes da Entrega</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Em nome de:</Text>
              <Text style={styles.valueStyle}>{user?.name}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Telefone</Text>
              <Text style={styles.valueStyle}>{user?.phone}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Email</Text>
              <Text style={styles.valueStyle}>{user?.email}</Text>
            </View>

            {address?.length == 0 ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('address')}
                activeOpacity={0.7}
                style={styles.btnAddress}
              >
                <Icon name="plus-circle" color={colors.grayDark} size={20} />
                <Text style={[styles.valueStyle, { marginLeft: 10 }]}>
                  Adicionar Endereço
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.inputContainer}>
                <Text style={styles.labelStyle}>Endereço de entrega</Text>
                <View
                  style={{
                    height: 45,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: colors.grayMedium,
                    backgroundColor: colors.grayLight,
                  }}
                >
                  <Picker
                    selectedValue={deliveryAddress}
                    itemStyle={{ textTransform: 'capitalize' }}
                    style={{ flex: 1 }}
                    onValueChange={(itemValue, itemIndex) =>
                      setDeliveryAddress(itemValue)
                    }
                  >
                    {address?.map((item, index) => (
                      <Picker.Item
                        key={index}
                        label={`${item.street} - ${item.neighborhood} - ${item.city}`.toUpperCase()}
                        value={item}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            )}
            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>
                Observação do pedido (opcional)
              </Text>
              <TextInput
                returnKeyType="done"
                multiline
                style={[styles.inputStyle, { height: 75 }]}
                onChangeText={value => setOrderObs(value)}
                placeholder="Qualquer detalhe ou observação sobre o pedido..."
              />
            </View>
          </View>
        </View>
        <CustomButton
          loading={loading}
          primary
          title="Fazer Pedido"
          icon="ios-checkmark"
          style={{ margin: 20 }}
          onPress={() => makeOrder()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
