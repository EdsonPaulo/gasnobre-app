import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';


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

export default styles