import Icon from '@expo/vector-icons/Entypo';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import okulikapacoLogo from '../../assets/OK.png';
import { CustomStatusBar } from '../../components';
import { colors, general, metrics } from '../../constants';
import styles from './styles';

const About = () => (
  <SafeAreaView style={general.background}>
    <CustomStatusBar
      barStyle="light-content"
      style="light"
      backgroundColor={colors.accent}
    />

    <ScrollView contentContainerStyle={{ padding: metrics.doubleBaseMargin }}>
      <View style={{ height: 100 }}>
        <Image
          source={okulikapacoLogo}
          height={100}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      </View>
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
          ● Competir exclusivamente com base na qualidade dos nossos produtos e
          serviços prestados ao cliente.
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
          Conferindo conforto aos nossos consumidores, com o objetivo de sermos
          reconhecidos como uma empresa que busca qualidade no atendimento e
          superar as expectativas dos nossos clientes e consumidores.
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
          ● Somos apaixonados, determinados no que fazemos, e comprometidos com
          os nossos colabores e clientes.
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
          Contactos e Endereço
        </Text>
        <Icon name="old-phone" size={22} color={colors.grayDark2} />
        <Text style={styles.contacts}>+244 942 679 605</Text>
        <Icon name="mail" size={22} color={colors.grayDark2} />
        <Text style={styles.contacts}> comercial.okulikapaco@gmail.com</Text>
        <Icon name="address" size={22} color={colors.grayDark2} />
        <Text style={styles.contacts}>
          Rua da Brigada, Nº 4RA-8A, Rangel - Luanda, Angola
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default About;
