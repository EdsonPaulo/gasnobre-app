import Icon from "@expo/vector-icons/Ionicons"
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { colors, metrics } from '../constants'


const CustomButton = props => {
    const { rounded, primary, title, onPress, style, loading, icon } = props

    return (
        <RectButton disabled={loading || false} onPress={onPress} style={[styles.buttonContainer, style, {
            backgroundColor: primary ? colors.accent : colors.grayLight,
            borderRadius: rounded ? metrics.formInputRadius : 6,
        }]}>
            {
                loading ? <ActivityIndicator color={colors.grayLight} style={{ marginLeft: metrics.baseMargin }} size='small' /> : icon ? <View style={{ width: 50 }} /> : <View />
            }
            <Text style={[styles.textStyle, { color: primary ? colors.white : colors.grayDark2 }]}>
                {title}
            </Text>
            {
                !icon ? <View /> :
                    <View style={styles.iconStyle}>
                        <Icon name={icon} size={30} color={primary ? colors.white : colors.grayDark2} />
                    </View>
            }
        </RectButton>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        //flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        height: 40,
        marginVertical: metrics.baseMargin,
        borderColor: colors.primaryDark,
    },
    textStyle: {
        textTransform: 'uppercase',
        letterSpacing: 0.3,
        fontFamily: 'Acme_400Regular',
        fontSize: 13,
        textAlign: 'center'
    },
    iconStyle: {
        width: 50,
        backgroundColor: colors.primaryDark,
        height: "100%",
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default CustomButton