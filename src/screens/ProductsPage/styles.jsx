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
    marginVertical: 30,
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
    marginHorizontal: 6,
  },
  brandItemText: {
    fontSize: fonts.input,
    textTransform: 'capitalize',
    color: 'white',
    fontFamily: 'RobotoCondensed_400Regular',
  },
});

export default styles;
