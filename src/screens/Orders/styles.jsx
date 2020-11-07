import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: metrics.doubleBaseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderContainer: {
    flex: 1,
    paddingVertical: metrics.smallMargin,
    paddingHorizontal: metrics.doubleBaseMargin,
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 2,
    borderRadius: metrics.baseRadius,
    borderColor: colors.borderColor,
    marginVertical: metrics.smallMargin,
  },
  rowContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: metrics.smallMargin,
  },
  statusText: {
    fontSize: 13,
    fontFamily: 'RobotoCondensed_400Regular',
    textTransform: 'capitalize',
  },
});
export default styles;
