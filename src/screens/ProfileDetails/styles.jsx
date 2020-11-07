import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../constants';

const styles = StyleSheet.create({
  container: {
    padding: metrics.doubleBaseMargin,
  },
  topContainer: {
    height: 'auto',
    //width: 200,
    alignSelf: 'center',
    margin: metrics.baseMargin,
    //backgroundColor: colors.white,
    //elevation: 5,
    //borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  userDetails: {
    fontFamily: 'RobotoCondensed_400Regular',
    color: colors.dark,
  },
  labelStyle: {
    color: colors.grayDark,
    marginTop: metrics.baseMargin,
    marginBottom: 2,
    marginLeft: metrics.baseMargin,
    fontFamily: 'RobotoCondensed_700Bold',
  },
});

export default styles;
