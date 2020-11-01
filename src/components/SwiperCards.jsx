import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { colors } from '../constants';
const { width } = Dimensions.get('window');

const SwiperCards = ({}) => {
  return (
    <Swiper
      style={styles.wrapper}
      height="100%"
      dotColor={colors.grayLight}
      activeDotColor={colors.primaryDark}
      autoplay
    >
      <Image
        style={styles.slide}
        borderRadius={15}
        resizeMode="cover"
        source={require('../assets/banners/banner1.jpg')}
      />
      <Image
        style={styles.slide}
        borderRadius={15}
        resizeMode="cover"
        source={require('../assets/banners/banner3.jpg')}
      />
      <Image
        style={styles.slide}
        borderRadius={15}
        resizeMode="cover"
        source={require('../assets/banners/banner4.jpg')}
      />
      <Image
        style={styles.slide}
        borderRadius={15}
        resizeMode="cover"
        source={require('../assets/banners/banner6.png')}
      />
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.grayLight,
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  image: {
    width,
    flex: 1,
  },
});

export default SwiperCards;
