import { StyleSheet } from 'react-native'
import { metrics, fonts, colors } from '../../constants'

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.white,
        padding: metrics.doubleBaseMargin
    },
    iconHeader: {
        color: colors.grayDark2,
        width: 40,
        height: 40,
        fontSize: 30
    },
    container: {
        width: '100%',
        padding: metrics.tripleBaseMargin,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.grayDark2,
        //fontFamily: 'Soviet',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: colors.grayDark2,
        marginHorizontal: 0,
        marginTop: metrics.smallMargin
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
        letterSpacing: 1.4,
        bottom: 10,
        textAlign: 'center',
        marginTop: metrics.tripleBaseMargin
    }
})

export default styles
