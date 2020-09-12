import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get("window")

import { colors, metrics, general, constants, fonts } from '../../constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between"
  },
  addressContainer: {
    backgroundColor: "#ffffff29",
    padding: 15,
    borderRadius: metrics.baseRadius
  },
  homeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grayDark2,
    textAlign: "center",
    marginBottom: metrics.doubleBaseMargin

  },
  banners: {
    height: 190,
    elevation: 5,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "transparent",
    borderRadius: 25
  },
  optionContainer: {
    flexDirection: "row",
  },
  option: {
    flex: 1 / 2,
    width: "100%",
    height: 110,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  optionTitle: {
    fontSize: 14,
    margin: 5,
    fontFamily: "RobotoCondensed_700Bold",
    color: colors.grayDark2,
    letterSpacing: 0.4
  },
  historyContainer: {
    height: "auto",
    padding: 10,
    maxHeight: 250,
    marginVertical: 5,
    backgroundColor: "#f9f8f8",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
  },
  history: {
    padding: metrics.baseMargin,
    borderWidth: 1,
    elevation: 1,
    backgroundColor: "#fff",
    borderRadius: metrics.baseRadius,
    borderColor: colors.borderColor,
    marginTop: 10,
    height: 70,
  },
  seeMore: {
    padding: 5,
    borderRadius: 10,
    width: 85,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 5
  },
  rowContainer: {
    flex: 1 / 2,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    marginVertical: metrics.smallMargin
  },
  statusText: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
    fontFamily: "RobotoCondensed_400Regular"
  }
})

export default styles