import { colors, general, metrics } from '../../constants';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  addressContainer: {
    padding: 15,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: colors.grayLight,
    borderRadius: metrics.baseRadius,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionBtn: {
    padding: 5,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAddressContainer: {
    padding: 10,
  },
  addressText: {
    fontSize: 17,
    textTransform: 'capitalize',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  title: {
    fontSize: 17,
    textAlign: 'center',
    color: colors.grayDark,
    textTransform: 'uppercase',
    fontFamily: 'RobotoCondensed_700Bold',
  },
});

export default styles;
