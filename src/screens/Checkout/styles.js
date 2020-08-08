import { StyleSheet } from 'react-native'

import { colors, metrics, general, constants, fonts } from '../../constants'


const styles = StyleSheet.create({

    sectionContainer: {
        margin: 15

    },
    sectionTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // marginLeft: metrics.smallMargin
    },
    sectionTitle: {
        color: colors.accent,
        fontWeight: 'bold',
        marginLeft: metrics.smallMargin,
        fontSize: fonts.regular,
    },
    section: {
        padding: 15,
        marginTop: 10
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 2
    },
    totalText: {
        fontSize: fonts.input,
        fontWeight: 'bold'
    },
    inputContainer: {
        marginVertical: 7
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
        borderRadius: metrics.baseRadius
    },
    btnAdress: {
        backgroundColor: colors.grayLight,
        borderWidth: 1,
        borderColor: colors.grayMedium,
        borderRadius: 5,
        paddingVertical: 5,
        marginBottom: 15,
        alignItems: 'center',
    }

})

export default styles