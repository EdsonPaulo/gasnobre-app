import React, { } from 'react'
import { Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
//import Onboarding from 'react-native-onboarding-swiper'

import { colors } from '../../constants'
import styles from './styles'


const Welcome = () => {

    const navigation = useNavigation()

    return (

        /**
         * 
         * 
        <Onboarding
            nextLabel="Seguinte"
            skipLabel="Saltar"
            onDone={() => {
                console.log('terminado')
                navigation.navigate("landing")
            }}
            pages={[
                {
                    backgroundColor: colors.primary,
                    title: 'ESCOLHA',
                    subtitle: 'Selecione entre nossa ampla gama de produtos de carnes de qualidade.',
                },
                {
                    backgroundColor: colors.primaryDark,
                    title: 'RECEBA',
                    subtitle: 'Após o checkout, providenciaremos um horário conveniente para entregar a você os produtos escolhidos.',
                },
                {
                    backgroundColor: colors.accent,
                    title: 'COZINHE & COMA',
                    subtitle: 'Nossos deliciosos produtos são ótimos para qualquer ocasião, seja no forno ou no churrasco. Desfrute de produtos escolhidos por hotéis e restaurantes de alta qualidade no conforto de sua própria casa.',
                },
                {
                    backgroundColor: colors.primaryDark,
                    title: 'Bem-Vindo ao Carnesul',
                    subtitle: 'Desfrute de carnes frescas, da melhor qualidade!'
                    //title: 'CARNESUL',
                }
            ]}
        />
         */

         <View/>

    )
}
export default Welcome