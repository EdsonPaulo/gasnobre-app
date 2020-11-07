import Icon from '@expo/vector-icons/Ionicons';
import { yupResolver } from '@hookform/resolvers';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';
import { CustomButton, CustomStatusBar } from '../../components';
import { colors, general, metrics } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';

const AddressPage = () => {
  let isMounted = true;
  const { user, role, token, updateUser } = useContext(authContext);
  const [editing, setEditing] = useState(-1);
  const [loading, setLoading] = useState(false);
  const modalizeRef = useRef(null);
  const [addressData, setAddressData] = useState({});

  const addressSchema = yup.object().shape({
    city: yup
      .string()
      .required('Cidade é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'),
    neighborhood: yup
      .string()
      .required('Bairro é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'), //bairro
    street: yup
      .string()
      .required('Rua é obrigatório')
      .min(4, 'Deve ter mais de 4 letras'),
    home: yup.string().trim(),
  });
  const addressFormData = useForm({ resolver: yupResolver(addressSchema) });

  const getUserData = async () => {
    try {
      const userFromServer = await api(token).get('/customers/me');
      if (userFromServer?.data) {
        updateUser(userFromServer?.data);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    }
  };

  const saveAddress = async newAddress => {
    console.log('Novo endereço', newAddress);
    if (loading) return;
    setLoading(true);
    try {
      const response = await api(token).put(`/customers/${user._id}`, {
        address: newAddress,
      });
      console.log(response.data?.message);
      updateUser({ ...user, address: newAddress });
      modalizeRef?.current?.close();
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = data => {
    console.log('editando o endereço da posição ' + editing);
    const auxAddress = user?.address;
    if (editing < 0) auxAddress.push(data);
    else auxAddress[editing] = data;
    saveAddress(auxAddress);
  };

  const handleEditAddress = (item, index) => {
    setEditing(index);
    setAddressData(item);
    modalizeRef?.current?.open();
  };

  const handleNewAddress = () => {
    setEditing(-1);
    setAddressData({});
    modalizeRef?.current?.open();
  };

  const handleDeleteAddress = index => {
    Alert.alert(
      'Eliminar Endereço',
      'Deseja eliminar este endereço?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: () => {
            let auxAddress = user?.address;
            auxAddress.splice(index, 1);
            saveAddress(auxAddress);
          },
        },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    if (isMounted) {
      getUserData();
    }
    return () => (isMounted = false);
  }, []);

  const renderAddresses = () =>
    user?.address?.map((item, index) => (
      <View style={styles.addressContainer} key={index}>
        <Text
          style={styles.addressText}
        >{`Casa ${item?.home} - ${item?.street} - ${item?.neighborhood}`}</Text>
        <Text style={styles.addressText}>{`${item?.city}`}</Text>
        <View style={styles.row}>
          <RectButton
            style={styles.actionBtn}
            onPress={() => handleEditAddress(item, index)}
          >
            <Icon name="md-create" color={colors.grayDark} size={25} />
          </RectButton>

          <RectButton
            style={styles.actionBtn}
            onPress={() => handleDeleteAddress(index)}
          >
            <Icon name="md-trash" color={colors.alert} size={25} />
          </RectButton>
        </View>
      </View>
    ));

  //Renderizar passo 3, endereço
  const renderAddressForm = () => (
    <ScrollView>
      <Text style={[styles.title, { marginBottom: 20 }]}>
        {editing > -1 ? 'Editar Endereço' : 'Novo Endereço'}
      </Text>
      <Controller
        control={addressFormData.control}
        defaultValue={addressData.city || ''}
        name="city"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Município/Distrito (obrigatório)"
            placeholder="ex: Maianga, Av. Deolinda Rodrigues"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.city?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={addressData.neighborhood || ''}
        name="neighborhood"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            containerStyle={{ marginVertical: 10 }}
            label="Bairro (obrigatório)"
            placeholder="ex: Bairro Cassenda"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.neighborhood?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={addressData.street || ''}
        name="street"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Rua (obrigatório)"
            placeholder="ex: Rua Cheguevara"
            onChangeText={value => onChange(value)}
            error={addressFormData.errors?.street?.message}
          />
        )}
      />
      <Controller
        control={addressFormData.control}
        defaultValue={addressData.home || ''}
        name="home"
        render={({ onChange, onBlur, value }) => (
          <CustomInput
            onBlur={onBlur}
            value={value}
            label="Nº da Casa (caso tenha)"
            containerStyle={{ marginVertical: 10 }}
            placeholder="Identificação da casa"
            onChangeText={value => onChange(value)}
          />
        )}
      />
    </ScrollView>
  );

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
        stickyHeaderIndices={[0]}
      >
        {user?.address?.length == 0 ? (
          <View style={{ marginVertical: 20 }}>
            <Text style={styles.title}>Nenhum Endereço Cadastrado</Text>
            <Text style={styles.title}>
              Adicione um para poder fazer um pedido
            </Text>
          </View>
        ) : (
          renderAddresses()
        )}

        <CustomButton
          primary
          onPress={handleNewAddress}
          title="Adicionar Endereço"
          icon="ios-add-circle"
        />
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        onClose={() => setEditing(-1)}
        modalHeight={metrics.screenHeight - 200}
        modalStyle={{ padding: 20 }}
        FooterComponent={
          <CustomButton
            rounded
            primary
            loading={loading}
            style={styles.makeOrderButton}
            onPress={() => addressFormData.handleSubmit(onSubmit)()}
            title="Salvar Endereço"
          />
        }
      >
        {renderAddressForm()}
      </Modalize>
    </SafeAreaView>
  );
};

export default AddressPage;
