import { StyleSheet } from 'react-native'
import { metrics, fonts, colors } from '../../constants'

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        padding: metrics.doubleBaseMargin,
        justifyContent: "space-between"
    },
    iconHeader: {
        color: colors.grayDark2,
        width: 40,
        height: 40,
        fontSize: 26
    },
    container: {
        width: '100%',
        padding: metrics.tripleBaseMargin,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.grayDark2,
        fontFamily: 'Acme_400Regular',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: colors.grayDark2,
        marginHorizontal: 0,
        marginTop: metrics.baseMargin
    },
    bottomText: {
        marginTop: metrics.smallMargin,
        alignSelf: 'center', 
        fontSize: fonts.regular,
        color: colors.grayDark2, 
        textAlign: 'center' 
    },
    copyrightText: {
        fontSize: fonts.regular, 
        color: colors.grayDark,
        letterSpacing: 0.1,
        bottom: 15,
        textAlign: 'center',
        marginTop: metrics.tripleBaseMargin
    },
    modalView: {
        width: '70%',
        height: '50%',
        borderRadius: 8,
        borderColor: colors.borderColor,
        borderWidth: 1,
        elevation: 6,
        alignSelf: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalText: {
        textAlign: "center",
        color: colors.textDark,
        fontSize: 16,
        fontFamily: 'RobotoCondensed_400Regular'
    }

})

export default styles
