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
  categoryListContainer: {
    width: '100%',
    height: 55,
    justifyContent: 'flex-end',
  },
  categoryItem: {
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    paddingHorizontal: metrics.baseMargin,
  },
  categoryItemText: {
    fontSize: fonts.input,
    textTransform: 'capitalize',
    color: 'white',
    fontFamily: 'RobotoCondensed_400Regular',
  },
  makeOrderButton: {
    width: 250,
    height: 40,
    marginVertical: 30,
    alignSelf: 'center',
  },
});

export default styles;
