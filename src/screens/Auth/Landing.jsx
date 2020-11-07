import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomButton, CustomStatusBar } from '../../components';
import { colors, metrics } from '../../constants';
import AuthContext from '../../contexts/auth/auth-context';
import api from '../../services/api';
import { facebookAuth } from '../../services/auth';
import styles from './styles';

const Landing = () => {
  const navigation = useNavigation();
  const { login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);

  const signInWithFacebook = async () => {
    if (loading) return;
    setLoading(true);
    try {
      console.log('USER DATA', result);
      const result = await (await facebookAuth()).json();
      const response = await api(null).post('/users/auth_facebook', {
        email: result?.email || result?.phone,
        facebookId: result?.id,
        name: result?.name,
      });
      login(
        { ...response.data?.user, ...response.data?.customer },
        response.data?.token,
        response.data?.role,
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.background, { padding: metrics.tripleBaseMargin }]}
    >
      <CustomStatusBar
        barStyle="dark-content"
        style="dark"
        backgroundColor={colors.bgColor}
      />

      <View style={{ flex: 1.3 / 2, width: '100%' }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/logo.png')}
          style={{ flex: 1.7 / 2, width: '100%' }}
        />
        <Text style={styles.subtitle}>Isso é um texto slogan de exemplo</Text>
      </View>

      <View
        style={{
          width: '100%',
          flex: 0.7 / 2,
          justifyContent: 'flex-start',
          paddingHorizontal: metrics.baseMargin,
        }}
      >
        <CustomButton
          primary
          title="ENTRAR NA CONTA"
          onPress={() => navigation.navigate('login')}
        />
        <CustomButton
          title="Criar Conta"
          onPress={() => navigation.navigate('signup')}
        />


        <CustomButton
          primary
          loading={loading}
          icon="logo-facebook"
          title="ENTRAR COM FACEBOOK"
          onPress={signInWithFacebook}
        />
      </View>
      <Text style={styles.copyrightText}>
        © {new Date().getFullYear()} - No Biva by Okulikapaco
      </Text>
    </SafeAreaView>
  );
};
export default Landing;
