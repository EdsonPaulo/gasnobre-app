import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fabPosition: {
    position: 'absolute',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  fabBagButton: {
    backgroundColor: colors.accent,
    right: 2,
    bottom: 15,
    width: 50,
    height: 50,
  },
  fabBagButtonBadge: {
    top: -3,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: '#E37E24',
  },
  makeOrderButton: {
    width: 250,
    height: 40,
    marginVertical: 20,
    alignSelf: 'center',
  },
  body: {
    fontSize: fonts.input,
    color: colors.grayDark2,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  brandListContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    backgroundColor: colors.primaryDark,
  },
  brandItem: {
    minWidth: 80,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  brandItemText: {
    fontSize: fonts.input,
    color: 'white',
    textTransform: 'capitalize',
    fontFamily: 'RobotoCondensed_400Regular',
  },

  /**
      CART PRODUCTS
  **/
  productContainer: {
    maxHeight: 130,
    elevation: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.grayLight,
    borderRadius: metrics.doubleBaseRadius,
    backgroundColor: colors.white,
    padding: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin,
    marginBottom: metrics.smallMargin,
    marginTop: metrics.baseMargin,
  },
  productImage: {
    width: 100,
    height: '100%',
  },
  productInfoContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
  },
  productTextContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: metrics.smallMargin,
  },
  productActionContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.grayDark2,
  },
  productTitle: {
    fontSize: fonts.input,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  productSubtitle: {
    fontSize: fonts.regular,
    marginVertical: metrics.smallMargin,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  productPrice: {
    fontSize: fonts.big,
    color: colors.success,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  productQuantity: {
    color: colors.white,
    fontSize: fonts.bigger,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  productQuantityContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default styles;
