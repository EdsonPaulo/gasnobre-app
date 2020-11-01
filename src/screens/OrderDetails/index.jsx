import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar } from '../../components';
import { colors, fonts, general, metrics } from '../../constants';
import authContext from '../../contexts/auth/auth-context';

export default index = () => {
  const { role } = useContext(authContext);
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const order = route.params?.order;
  let cart = [];

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

  return (
    <SafeAreaView style={[general.background, {}]}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
        translucent={false}
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
                      ? colors.dark
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entrega</Text>
          <Text>{order.customer?.name}</Text>
          <Text>{order.address}</Text>
          <Text>Angola - {order.city}</Text>
          <Text>+244 {order.customer?.phone}</Text>
        </View>
        {order.status === 'pendente' ? null : (
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

const styles = StyleSheet.create({
  container: {
    padding: metrics.baseMargin,
  },
  sectionTitle: {
    color: colors.grayDark,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_700Bold',
    marginBottom: metrics.baseMargin,
  },
  section: {
    backgroundColor: 'white',
    elevation: 1,
    height: 'auto',
    padding: metrics.baseMargin,
    marginVertical: metrics.smallMargin,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: metrics.baseRadius,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalText: {
    fontSize: fonts.input,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  statusText: {
    fontFamily: 'RobotoCondensed_700Bold',
    textTransform: 'capitalize',
  },
});
