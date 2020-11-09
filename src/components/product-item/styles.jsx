import { Dimensions, StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: height - height / 2,
    width: width - 150,
    marginVertical: 7,
    borderRadius: 15,
    // borderTopLeftRadius: 2,
    padding: 25,
    elevation: 0,
    backgroundColor: '#4b7bec20',
    borderWidth: 1,
    borderColor: colors.primary,
    alignSelf: 'center',

    marginHorizontal: metrics.baseMargin,
    justifyContent: 'flex-end',
    //maxWidth: 200,
    alignItems: 'center',
  },
  productImageContainer: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: -60,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    //backgroundColor: "gray",
    marginTop: 100,
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    //textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_700Bold',
  },
  description: {
    fontSize: 17,
    color: colors.grayDark2,
    textAlign: 'center',
    marginVertical: 12,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  btnText: {
    color: colors.white,
    fontSize: fonts.input,
    letterSpacing: 1.1,
    marginLeft: metrics.baseMargin,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  price: {
    fontSize: 24,
    color: colors.success,
    fontFamily: 'RobotoCondensed_700Bold',
    marginBottom: 20,
  }, 
  btn: {
    height: 40,
    elevation: 3,
    width: "auto",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: metrics.baseMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
  },
});

export default styles;
