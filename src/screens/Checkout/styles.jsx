import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    color: colors.accent,
    fontFamily: 'RobotoCondensed_700Bold',
    marginLeft: metrics.smallMargin,
    fontSize: fonts.regular,
  },
  section: {
    flex: 1,
    padding: 15,
    marginTop: 10,
    elevation: 2,
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: colors.borderColor,
    borderRadius: metrics.baseRadius,
  },
  text: {
    fontSize: fonts.input,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalText: {
    fontSize: fonts.big,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  inputContainer: {
    marginVertical: 7,
  },
  labelStyle: {
    color: colors.grayDark,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  valueStyle: {
    color: colors.dark,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  inputStyle: {
    flex: 1,
    borderColor: colors.grayMedium,
    borderWidth: 1,
    paddingHorizontal: metrics.baseMargin,
    backgroundColor: colors.bgColor,
    height: 35,
    borderRadius: metrics.baseRadius,
  },
  btnAddress: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.grayMedium,
    backgroundColor: colors.grayLight,
  },
});

export default styles;
