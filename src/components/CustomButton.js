import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import Icon from "@expo/vector-icons/Ionicons"

import { colors, metrics, fonts } from '../constants'
import { RectButton } from 'react-native-gesture-handler'

const CustomButton = props => {
    const { rounded, primary, title, onPress, style, loading, icon } = props

    return (
        <RectButton disabled={loading || false} onPress={onPress} style={[styles.buttonContainer, style, {
            backgroundColor: primary ? colors.primary : colors.grayLight,
            borderRadius: rounded ? metrics.formInputRadius : 8,
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
        elevation: 5,
        height: 50,
        marginVertical: metrics.baseMargin,
        borderColor: colors.primaryDark,
    },
    textStyle: {
        textTransform: 'uppercase',
        letterSpacing: 0.3,
        fontWeight: "bold",
        fontFamily: 'RobotoCondensed_400Regular',
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