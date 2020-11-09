import Icon from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
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
import shopContext from '../../contexts/shop/shop-context';
import api from '../../services/api';
import styles from './styles';

const index = () => {
  let isMounted = true;

  const { cart, total } = useContext(shopContext);
  const { user, token } = useContext(authContext);
  const navigation = useNavigation();
  const [tax] = useState(0);

  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.address[0] || null,
  );
  const [orderObs, setOrderObs] = useState('');
  const [loading, setLoading] = useState(false);

  const [orderDetails, setOrderDetails] = useState({
    tax,
    total,
    products: [],
    debit: false,
    obs: orderObs,
    address: deliveryAddress,
  });

  const transformPrice = value =>
    Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(
      value,
    );

  useEffect(() => {
    if (isMounted) setDeliveryAddress(user?.address[0] || null);
    return () => (isMounted = false);
  }, [user]);

  //finalizar compra/pedido
  const makeOrder = () => {
    if (loading) return;
    if (!user?.phone) {
      Alert.alert('Precisa adicionar o número de telefone!');
      return;
    }
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

      products.push({
        product: product._id,
        quantity: product.quantity,
      });
    });
    order.address = deliveryAddress;
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
                  <Text style={styles.text}>
                    {product.name}{' '}
                    {product.weight <= 0.99
                      ? `${product.weight * 1000}ml `
                      : `${product.weight}L `}
                    {` - ${product.quantity} ${
                      product.quantity < 2 ? 'embalagem' : 'embalagens'
                    }`}
                  </Text>
                  <Text style={styles.text}>
                    {transformPrice(product.price * product.quantity)}
                  </Text>
                </View>
              );
            })}
            <View style={[styles.textContainer, { marginTop: 15 }]}>
              <Text style={styles.text}>Subtotal</Text>
              <Text style={styles.text}>{transformPrice(total)} </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Taxa de Entrega</Text>
              <Text style={styles.text}>{transformPrice(tax)} </Text>
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.totalText}>Total </Text>
              <Text style={[styles.totalText, { color: colors.success }]}>
                {transformPrice(total + tax)}{' '}
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

              {user?.phone ? (
                <Text style={styles.valueStyle}>{user?.phone}</Text>
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('profileDetails')}
                  activeOpacity={0.7}
                  style={styles.btnAddress}
                >
                  <Icon name="plus-circle" color={colors.grayDark} size={20} />
                  <Text style={[styles.valueStyle, { marginLeft: 10 }]}>
                    Adicionar Telefone
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.labelStyle}>Email</Text>
              <Text style={styles.valueStyle}>{user?.email}</Text>
            </View>

            {user?.address?.length == 0 ? (
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
                    {user?.address?.map((item, index) => (
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
