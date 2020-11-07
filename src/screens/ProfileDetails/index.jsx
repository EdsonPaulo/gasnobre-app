import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, ToastAndroid, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomInput, CustomStatusBar } from '../../components';
import { colors, general } from '../../constants';
import authContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import styles from './styles';


export default index = () => {
  let isMounted = true;
  const navigation = useNavigation();
  const { user, role, token, updateUser } = useContext(authContext);
  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userInfo, setUserInfo] = useState({ ...user });

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

  const saveUserData = async newAddress => {
    if (saving) return;
    setSaving(true);
    try {
      const response = await api(token).put(`/customers/${user._id}`, {
        ...userInfo,
      });
      console.log(response.data?.message);
      updateUser({ ...user, ...userInfo });
      setEditable(false);
      ToastAndroid.show('Dados salvos com sucesso!', 1000);
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      ToastAndroid.show(error.message, 1000);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (isMounted) {
      getUserData();
    }
    return () => (isMounted = false);
  }, []);

  const inputStyle = editable
    ? null
    : { backgroundColor: colors.bgColor, borderWidth: 0 };

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={role === 'customer' ? colors.accent : '#111'}
      />

      <View style={styles.topContainer}>
        <FontAwesome5 name="user-circle" color={colors.dark} size={40} />
        <Text style={[styles.userName, styles.userDetails]}>
          {userInfo?.name}
        </Text>
        <Text style={styles.userDetails}>
          {role === 'customer' ? 'Cliente' : 'Gerente'}
        </Text>
        <Text style={styles.userDetails}>
          {userInfo?.phone || userInfo?.email}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {editable ? null : (
          <RectButton
            style={{ alignSelf: 'flex-end', padding: 7 }}
            onPress={() => setEditable(true)}
          >
            <Text style={{ fontFamily: 'RobotoCondensed_700Bold' }}>
              <FontAwesome5 name="edit" /> Editar
            </Text>
          </RectButton>
        )}
        <Text style={styles.labelStyle}>Nome</Text>
        <CustomInput
          type="name"
          value={userInfo.name}
          style={inputStyle}
          editable={editable}
          placeholder="Nome e Sobrenome"
          onChangeText={name => setUserInfo({ ...userInfo, name: name })}
        />

        <Text style={styles.labelStyle}>Telefone</Text>
        <CustomInput
          type="phone"
          placeholder="Telefone"
          style={inputStyle}
          editable={editable}
          value={userInfo.phone}
          onChangeText={phone => setUserInfo({ ...userInfo, phone: phone })}
        />

        <Text style={styles.labelStyle}>Email</Text>
        <CustomInput
          type="email"
          placeholder="Email de Contacto"
          style={inputStyle}
          editable={editable}
          value={userInfo.email}
          onChangeText={email => setUserInfo({ ...userInfo, email: email })}
        />

        {!editable && (
          <CustomButton
            style={{ marginTop: 40 }}
            title="Meus Endereços"
            icon="ios-map"
            onPress={() => navigation.navigate('address')}
          />
        )}

        {editable && (
          <View style={{ marginTop: 20, flexDirection: 'row', flex: 1 }}>
            <CustomButton
              style={{ flex: 1, marginRight: 20 }}
              title="Salvar"
              loading={saving}
              primary
              onPress={saveUserData}
            />
            <CustomButton
              style={{ flex: 1 }}
              title="Cancelar"
              onPress={() => setEditable(false)}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};


