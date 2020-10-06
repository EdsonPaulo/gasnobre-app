import { StyleSheet } from 'react-native'
import { colors, fonts, metrics } from '../../constants'

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 15,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: metrics.smallMargin
  },
  sectionTitle: {
    color: colors.accent,
    fontFamily: 'RobotoCondensed_700Bold',
    marginLeft: metrics.smallMargin,
    fontSize: fonts.regular,
  },
  section: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    elevation: 2,
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
  inputContainer: {
    marginVertical: 7,
  },
  labelStyle: {
    color: colors.grayDark2,
    marginBottom: 2,
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
    backgroundColor: colors.grayLight,
    borderWidth: 1,
    borderColor: colors.grayMedium,
    borderRadius: 5,
    paddingVertical: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
})

export default styles