import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwiperCards } from '../../components';
import CustomStatusBar from '../../components/CustomStatusBar';
import { colors, general } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';

const index = () => {
  let isMounted = true;
  const navigation = useNavigation();
  const { user, token } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    setLoading(true);
    api(token)
      .get(`/orders?perPage=4`)
      .then(response => {
        if (isMounted) setOrders(response?.data?.data);
      })
      .catch(error => {
        console.log(error + ' ==> erro');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
    return () => (isMounted = false);
  }, []);

  const convertDate = date =>
    Intl.DateTimeFormat('pt-AO').format(new Date(date));

  const renderLoading = () => (
    <View style={styles.containerFlex}>
      <ActivityIndicator size="large" color={colors.accent} />
    </View>
  );

  const renderEmptyOrders = () => (
    <View style={styles.containerFlex}>
      <Text style={[styles.emptyText]}>Olá, {user?.name?.split(' ')[0]}</Text>
      <Text style={[styles.emptyText, { marginVertical: 10 }]}>
        Veja os produtos disponíveis que temos para você, faça pedido em poucos
        passos e receba no conforto da sua casa :)
      </Text>
      <View style={{ flexDirection: 'row' }}>
        <RectButton
          style={[styles.seeMore, { marginRight: 5 }]}
          onPress={() => navigation.navigate('storeStack')}
        >
          <Text>Ver Produtos</Text>
        </RectButton>
        <RectButton
          style={styles.seeMore}
          onPress={() => navigation.navigate('storeStack')}
        >
          <Text>Meus Pedidos</Text>
        </RectButton>
      </View>
    </View>
  );

  const renderOrders = () =>
    orders.map(order => (
      <RectButton
        key={order.number}
        onPress={() => navigation.navigate('orderDetails', { order })}
        activeOpacity={0.7}
        style={styles.history}
      >
        <View style={styles.rowContainer}>
          <Text style={styles.statusText}>{order.number}</Text>
          <Text style={styles.statusText}>{convertDate(order.orderDate)}</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text
            style={[
              styles.statusText,
              {
                fontFamily: 'RobotoCondensed_700Bold',
                textTransform: 'capitalize',
                color:
                  order.status === 'concluido'
                    ? colors.success
                    : order.status === 'cancelado'
                    ? colors.alert
                    : colors.accent,
              },
            ]}
          >
            {order.status}
          </Text>
          <Text
            style={{
              fontFamily: 'RobotoCondensed_700Bold',
              fontSize: 16,
              color: colors.success,
            }}
          >
            {Intl.NumberFormat('pt-AO', {
              style: 'currency',
              currency: 'AOA',
            }).format(order.total)}
          </Text>
        </View>
      </RectButton>
    ));

  return (
    <SafeAreaView style={[general.background]}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={colors.accent}
      />

      <View style={styles.container}>
        <View style={{}}>
          <View
            style={{
              marginBottom: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 130, height: 80 }}>
              <Image
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
                source={require('../../assets/logo.png')}
              />
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('about')}>
              <Icon name="info-circle" color={colors.accent} size={35} />
            </TouchableOpacity>
          </View>

          <View style={styles.banners}>
            <SwiperCards />
          </View>
        </View>
        {/**
           * 
            <View style={styles.optionContainer}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.option, { marginRight: 15 }]} onPress={() => navigation.navigate("storeStack")}>
                <Icon name="bullhorn" color={colors.dark} size={30} />
                <Text style={styles.optionTitle}>Pedir Agora</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} style={styles.option} onPress={handlePlanoKamba}>
                <View style={{ position: "absolute", top: 7, right: 7 }}>
                  {
                    !user?.kambaPlan?.active ? <Icon name="info-circle" color={colors.dark} size={20} />
                      : user?.kambaPlan?.left == 0 ? <Icon name="warning" color={colors.alert} size={20} />
                        : user?.kambaPlan?.left <= 5 ? <Icon name="warning" color={colors.warning} size={20} />
                          : user?.kambaPlan?.debt > 0 ?
                            <Text style={{ fontWeight: 'bold', fontSize: 11, color: colors.primaryDark }}>
                              - {user?.kambaPlan?.debt}Kz
                                        </Text>
                            : null
                  }
                </View>
                <Icon name="handshake-o" color={colors.dark} size={30} />
                <Text style={styles.optionTitle}>Plano Kamba</Text>
              </TouchableOpacity>
            </View>
           */}
        <View style={styles.historyContainer}>
          {orders.length > 0 && (
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 5,
                fontSize: 18,
                color: colors.grayDark,
              }}
            >
              Últimos de Pedidos
            </Text>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              orders.length == 0 || loading
                ? { height: '100%', padding: 15 }
                : { padding: 5 }
            }
          >
            {loading && renderLoading()}

            {!loading && orders.length > 0 && renderOrders()}

            {!loading && orders.length > 3 && (
              <RectButton
                style={styles.seeMore}
                onPress={() => navigation.navigate('orderStack')}
              >
                <Text>Ver mais</Text>
              </RectButton>
            )}

            {!loading && orders.length == 0 && renderEmptyOrders()}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default index;
