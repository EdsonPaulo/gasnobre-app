import { Dimensions, StyleSheet } from 'react-native'
import { colors, metrics } from '../../constants'

const { height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  addressContainer: {
    backgroundColor: '#ffffff29',
    padding: 15,
    borderRadius: metrics.baseRadius,
  },
  homeTitle: {
    fontSize: 16,
    fontFamily: 'RobotoCondensed_700Bold',
    color: colors.grayDark2,
    textAlign: 'center',
    marginBottom: metrics.doubleBaseMargin,
  },
  banners: {
    height: 190,
    //  elevation: 5,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,

    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  optionContainer: {
    flexDirection: 'row',
  },
  option: {
    flex: 1 / 2,
    width: '100%',
    height: 110,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  optionTitle: {
    fontSize: 14,
    margin: 5,
    fontFamily: 'RobotoCondensed_700Bold',
    color: colors.grayDark2,
    letterSpacing: 0.4,
  },
  historyContainer: {
    flex: 1,
    height: 'auto',
    padding: 10,
    //  maxHeight: 250,
    marginVertical: 5,
    marginTop: 20,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 1,
    position: 'relative',
    borderColor: colors.borderColor,
  },
  history: {
    padding: metrics.baseMargin,
    borderWidth: 1,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: metrics.baseRadius,
    borderColor: colors.borderColor,
    marginTop: 10,
    height: 70,
  },
  seeMore: {
    padding: 5,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
    bottom: 0,
    //  position: "absolute",
    elevation: 2,
  },
  rowContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: metrics.smallMargin,
  },
  statusText: {
    color: colors.dark,
    fontSize: 15,
    textTransform: 'uppercase',
    fontFamily: 'RobotoCondensed_700Bold',
  },
})

export default styles