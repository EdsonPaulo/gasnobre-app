import { StyleSheet, Dimensions } from 'react-native'

const { height } = Dimensions.get("window")

import { colors, metrics, general, constants, fonts } from '../../constants'

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: height - 260,
        flex: 1,
        bottom: 0,
        width: "100%",
        backgroundColor: colors.bgColor,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 15,
    },
    homeHeader: {
        height: 150,
        backgroundColor: colors.primaryDark,
        paddingHorizontal: 10,
        justifyContent: "center"
        // elevation: 5
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
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    option: {
        flex: 1 / 2,
        width: "100%",
        height: 110,
        margin: 5,
        // borderRadius: 8,
        //borderWidth: 1,
        //padding: metrics.baseMargin,
        // backgroundColor: colors.grayMedium,
    },
    historyContainer: {
        flex: 1.3 / 3,
        padding: metrics.baseMargin,
        marginHorizontal: metrics.doubleBaseMargin,
        borderWidth: 1,
        borderRadius: metrics.baseRadius,
        borderColor: colors.borderColor,
        backgroundColor: colors.grayLight
    },
    history: {
        padding: metrics.baseMargin,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderRadius: metrics.baseRadius,
        borderColor: colors.grayMedium,
        marginVertical: 3
    }
})

export default styles