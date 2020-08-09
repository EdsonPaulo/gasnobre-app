import { StyleSheet } from 'react-native'
import { colors, metrics, fonts } from '../../constants'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: metrics.doubleBaseMargin,
        paddingVertical: 0,
    },
    topContainer: {
        height: 50,
        marginBottom: 35,
        backgroundColor: colors.primary,
        elevation: 3,
        position: "relative"
    },
    userContainer: {
        top: 10,
        height: 70,
        width: "80%",
        elevation: 4,
        alignSelf: "center",
        position: "absolute",
        padding: metrics.doubleBaseMargin,
        backgroundColor: colors.white,
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
        backgroundColor: colors.primaryDark
    },
    sectionTitle: {
        //fontFamily: 'Lato',
        fontSize: fonts.regular,
        color: colors.grayMedium,
        marginTop: metrics.smallMargin,
    },
    user: {
        marginLeft: 15,
        justifyContent: 'center',
    },
    userName: {
        //fontFamily: 'Lato',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: metrics.smallMargin,
    },
    userDetails: {
        //fontFamily: 'Lato',
        textAlign: 'justify'
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
        elevation: 2,
        backgroundColor: "white",
        marginVertical: metrics.smallMargin,
        padding: metrics.baseMargin,
        paddingHorizontal: metrics.doubleBaseMargin
    }
})

export default styles