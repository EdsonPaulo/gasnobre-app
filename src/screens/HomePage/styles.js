import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get("window")

import { colors, metrics, general, constants, fonts } from '../../constants'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
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
        elevation: 2,

        borderWidth: 1,

    },
    optionTitle: {
        fontSize: 14, 
        margin: 5, 
        fontFamily: "RobotoCondensed_700Bold",
        color: colors.grayDark2,
        letterSpacing: 1.1
    },
    historyContainer: {
        height: "auto",
        padding: 15,
        marginVertical: 5,
        backgroundColor: "#f9f8f8",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.borderColor,
    },
    history: {
        padding: metrics.baseMargin,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        borderColor: colors.grayLight,
        marginTop: 10,
        height: 70,
        elevation: 1
    }
})

export default styles