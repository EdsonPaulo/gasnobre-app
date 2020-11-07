import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, ScrollView, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar } from '../../components';
import { colors, general } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';

export default index = () => {
  const { role, token } = useContext(authContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const order = route.params?.order;
  console.log(order);

  const transformPrice = value =>
    Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(
      value,
    );

  const convertDate = date =>
    Intl.DateTimeFormat('pt-AO', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(new Date(date));

  const cancelOrder = () => {
    if (loading) return;
    setLoading(true);
    api(token)
      .post(`/orders/update_status/${order.number}`, {
        status: 'cancelado',
      })
      .then(response => {
        ToastAndroid.show('Pedido cancelado com sucesso!', ToastAndroid.SHORT);
        navigation.goBack();
      })
      .catch(error => {
        console.log(`${error} ==> erro`);
        ToastAndroid.show(
          'Ocorreu um erro ao cancelar o pedido. Tente novamente mais tarde!',
          ToastAndroid.LONG,
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancelando o Pedido',
      'Tem certeza que deseja cancelar esse pedido?',
      [
        {
          text: 'Sim',
          onPress: () => cancelOrder(),
        },
        { text: 'Não', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView style={[general.background, {}]}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.textContainer}>
          <Text>
            Estado:
            <Text
              style={[
                styles.statusText,
                {
                  color:
                    order.status === 'pendente'
                      ? colors.accent
                      : order.status === 'cancelado'
                      ? colors.alert
                      : order.status === 'concluido'
                      ? colors.success
                      : colors.accent,
                },
              ]}
            >
              {' '}
              {order.status}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: 'RobotoCondensed_400Regular',
              textTransform: 'capitalize',
            }}
          >
            {convertDate(order.createdAt)}
          </Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lista de Produtos</Text>
          <View>
            {order?.products.map(item => (
              <View key={item._id} style={{ marginBottom: 3 }}>
                <Text style={{ textTransform: 'capitalize' }}>
                  {item.product?.name}
                </Text>
                <View style={styles.textContainer}>
                  <Text>
                    {' '}
                    {item.quantity} x {transformPrice(item.product?.price)}
                  </Text>
                  <Text>
                    {transformPrice(item.quantity * item.product?.price)}{' '}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custos</Text>
          <View style={styles.textContainer}>
            <Text>Subtotal</Text>
            <Text>{transformPrice(order.subtotal)} </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Taxa de Entrega</Text>
            <Text>{transformPrice(order.tax)} </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.totalText}>Total </Text>
            <Text style={[styles.totalText, { color: colors.accent }]}>
              {' '}
              {transformPrice(order.total)}{' '}
            </Text>
          </View>
        </View>
        <View style={[styles.section, { alignItems: 'center' }]}>
          <Text style={styles.sectionTitle}>Entrega</Text>

          <Text style={styles.bodyText}>{order.customer?.name}</Text>

          <Text style={styles.bodyText}>{order.customer?.phone}</Text>

          <Text style={[styles.bodyText]}>
            {order.address?.home} {order.address?.street},{' '}
            {order.address?.neighborhood} - {order.address?.city}{' '}
          </Text>
        </View>

        {order.status === 'pendente' ? (
          <CustomButton
            title="Cancelar Pedido"
            icon="ios-close"
            loading={loading}
            onPress={handleCancelOrder}
          />
        ) : (
          <CustomButton
            title="Voltar a pedir"
            icon="md-refresh"
            primary
            onPress={() =>
              navigation.navigate('checkout', {
                cart: [...order.products],
                subtotal: order.subtotal || 0,
              })
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
