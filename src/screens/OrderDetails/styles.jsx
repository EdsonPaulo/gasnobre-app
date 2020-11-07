import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';

const styles = StyleSheet.create({
  container: {
    padding: metrics.baseMargin,
  },
  sectionTitle: {
    color: colors.grayDark,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_700Bold',
    marginBottom: metrics.baseMargin,
  },
  section: {
    backgroundColor: 'white',
    elevation: 1,
    height: 'auto',
    padding: metrics.baseMargin,
    marginVertical: metrics.smallMargin,
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: metrics.baseRadius,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  totalText: {
    fontSize: fonts.input,
    fontFamily: 'RobotoCondensed_700Bold',
  },
  statusText: {
    fontFamily: 'RobotoCondensed_700Bold',
    textTransform: 'capitalize',
  },
});

export default styles;
