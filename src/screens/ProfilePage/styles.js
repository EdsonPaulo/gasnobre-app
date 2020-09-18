import { StyleSheet } from 'react-native'
import { colors, fonts, metrics } from '../../constants'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: metrics.doubleBaseMargin,
        paddingVertical: 0,
    },
    topContainer: {
        height: 50,
        backgroundColor: colors.primaryDark,
        marginBottom: 45,
        position: "relative"
    },
    userContainer: {
        top: 10,
        height: 70,
        width: "70%",
        elevation: 4,
        alignSelf: "center",
        position: "absolute",
        padding: metrics.doubleBaseMargin,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: metrics.baseRadius,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: metrics.baseMargin,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.grayLight
    },
    sectionTitle: {
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: fonts.regular,
        color: colors.grayDark,
        marginTop: metrics.smallMargin,
    },
    user: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    userName: {
        fontFamily: 'RobotoCondensed_400Regular',
        fontSize: 16,
        color: colors.dark,
        fontWeight: 'bold',
    },
    userDetails: {
        fontFamily: 'RobotoCondensed_400Regular',
        textAlign: 'justify',
        color: colors.dark
    },
    inputContainer: {
        marginVertical: metrics.smallMargin
    },
    icons: {
        color: colors.grayDark2,
        fontSize: 20,
        marginRight: metrics.baseMargin,
    },
    btn: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: "space-between",
        width: '100%',
        borderRadius: 5,
        elevation: 3,
        backgroundColor: "white",
        marginVertical: 7,
        padding: metrics.baseMargin,
        paddingHorizontal: metrics.doubleBaseMargin
    }
})

export default styles