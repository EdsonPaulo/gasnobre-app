import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, general, metrics } from '../../constants';
import { CustomStatusBar } from '../../components';
import AuthContext from '../../contexts/auth/auth-context';
import Icon from '@expo/vector-icons/Entypo';

const About = () => {
  const { user } = useContext(AuthContext);

  return (
    <SafeAreaView style={general.background}>
      <CustomStatusBar
        barStyle="light-content"
        style="light"
        backgroundColor={colors.accent}
      />

      <ScrollView contentContainerStyle={{ padding: metrics.doubleBaseMargin }}>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Okulikapaco - Prestação de Serviços</Text>
        </View>

        <Text style={styles.about}>
          A Okulikapaco é uma empresa do ramo de distribuição de produtos e
          prestação de serviços, criada por jovens para Angola, com o intuito de
          dar resposta as diversas preocupações quotidianas, levando ao seu
          domicílio, tendo como base a excelência.
        </Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Missão</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionBody}>
            ● Distribuir produtos e prestar serviços, buscando a inovação
            tecnológica e a otimização do tempo.
          </Text>
          <Text style={styles.sectionBody}>
            ● Competir exclusivamente com base na qualidade dos nossos produtos
            e serviços prestados ao cliente.
          </Text>
          <Text style={styles.sectionBody}>
            ● Reforçar e estender a marca continuamente.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Visão</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionBody}>
            ● Tornar-se líder em Angola no ramo de distribuição de produtos de
            primeira necessidade, buscar novas ideias e soluções, primando pela
            eficácia e eficiência nas nossas prestações.
          </Text>
          <Text style={styles.sectionBody}>
            Conferindo conforto aos nossos consumidores, com o objetivo de
            sermos reconhecidos como uma empresa que busca qualidade no
            atendimento e superar as expectativas dos nossos clientes e
            consumidores.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Valores</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionBody}>
            ● Somos Okulikapaco, humildes, honestos e imparciais. Investimos
            continuamente na capacitação do capital humano, estrutura e
            tecnologia.
          </Text>
          <Text style={styles.sectionBody}>
            ● Nossa política de preços é baseada principalmente na qualidade dos
            nossos serviços, produtos distribuídos e valores agregados aos
            clientes.
          </Text>
          <Text style={styles.sectionBody}>
            ● Somos apaixonados, determinados no que fazemos, e comprometidos
            com os nossos colabores e clientes.
          </Text>
        </View>

        <View
          style={[
            styles.sectionHeader,
            { padding: metrics.doubleBaseMargin, alignItems: 'center' },
          ]}
        >
          <Text
            style={[styles.sectionTitle, { marginBottom: metrics.baseMargin }]}
          >
            Contactos & Endereço
          </Text>
          <Icon name="old-phone" size={22} color={colors.grayDark2} />
          <Text style={styles.contacts}>+244 942 679 605</Text>
          <Icon name="mail" size={22} color={colors.grayDark2} />
          <Text style={styles.contacts}> comercial.okulikapaco@gmail.com</Text>
          <Icon name="address" size={22} color={colors.grayDark2} />
          <Text style={styles.contacts}>
            Escritório 24, Rua Vasco da Gama, Bairro Cassenda - Maianga, Luanda,
            Angola
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: fonts.big,
    color: colors.grayDark2,
    paddingVertical: 10,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_700Bold',
  },
  about: {
    fontSize: fonts.input,
    color: colors.grayDark2,
    paddingVertical: metrics.baseMargin,
    textAlign: 'justify',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  section: {
    marginBottom: metrics.doubleBaseMargin,
    paddingHorizontal: metrics.baseMargin,
  },
  sectionHeader: {
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.grayLight,
    padding: metrics.smallMargin,
    marginVertical: metrics.baseMargin,
  },
  sectionTitle: {
    fontSize: fonts.big,
    textAlign: 'center',
    color: colors.grayDark2,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  sectionBody: {
    textAlign: 'justify',
    fontSize: fonts.input,
    color: colors.grayDark2,
    marginBottom: metrics.smallMargin,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  contacts: {
    textAlign: 'center',
    fontSize: fonts.input,
    color: colors.grayDark2,
    marginBottom: metrics.baseMargin,
    fontFamily: 'RobotoCondensed_700Bold',
  },
});

export default About;
