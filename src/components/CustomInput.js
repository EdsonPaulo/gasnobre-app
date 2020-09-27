import { Feather, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, fonts, metrics } from '../constants'

export default CustomInput = props => {

  const { hasError, rounded, bordered, raised, type, icon, ...rest } = props
  const [secureText, setSecureText] = useState(false)
  const [borderColor, setBorderColor] = useState(colors.borderColor)

  const containerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: metrics.baseMargin,
    elevation: raised ? 3 : 0,
    width: '100%',
    height: 45,
    backgroundColor: colors.grayLight,
    borderWidth: 1,
    borderColor: hasError ? 'red' : borderColor,
    borderRadius: rounded ? metrics.formInputRadius : 6,
  }
  const inputStyle = {
    fontSize: fonts.input,
    height: '100%',
    fontFamily: 'RobotoCondensed_400Regular',
    flex: 1
  }
  const labelStyle = {
    fontSize: fonts.regular,
    color: colors.dark,
    marginVertical: 2,
    fontFamily: 'RobotoCondensed_400Regular',
    marginLeft: metrics.smallMargin
  }
  useEffect(() => {
    if (props.type === 'password')
      setSecureText(true)
  }, [])

  let inputType, iconName
  switch (type) {
    case 'phone': { inputType = 'phone-pad', iconName = 'smartphone' } break
    case 'password': { inputType = 'default', iconName = 'lock' } break
    case 'name': { inputType = 'default', iconName = 'user' } break
    case 'email': { inputType = 'email-address', iconName = 'mail' } break
    case 'number': { inputType = 'number-pad', iconName = 'smartphone' } break
    case 'search': { inputType = 'web-search', iconName = 'search' } break
    case 'code': { inputType = 'number-pad', iconName = 'hash' } break

    default: inputType = iconName = 'default'
  }

  const label = props.label ? <Text style={[labelStyle, props.labelStyle]}>{props.label}</Text> : null
  const help = props.help ? <Text style={styles.helpText}>{props.help}</Text> : null
  const error = props.hasError && props.error ? <Text style={styles.errorText}>{props.error}</Text> : null

  return (
    <View style={props.containerStyle}>
      {label}
      <View style={[containerStyle, props.style]}>
        {
          iconName === 'default' ? null :
            iconName === 'search' ?
              <MaterialIcons style={styles.inputIcon} size={20} name={iconName} />
              :
              <Feather style={styles.inputIcon} name={iconName} />
        }
        <TextInput  {...rest}
          style={inputStyle}
          placeholderTextColor={colors.grayMedium}
          keyboardType={inputType}
          secureTextEntry={secureText}
          onFocus={() => setBorderColor(colors.primary)}
          onBlur={() => setBorderColor(colors.borderColor)}
          onChange={props.onChangeNative}
          AuthibilityLabel={props.label}
          ref={props.ref}
        />
        {
          props.type === 'password' ?
            <TouchableOpacity style={{ width: 25, height: "100%", justifyContent: "center", alignItems: "center" }} onPress={() => setSecureText(!secureText)}>
              {
                secureText ?
                  <Feather size={16} name='eye' />
                  :
                  <Feather size={16} name='eye-off' />
              }
            </TouchableOpacity>
            : null
        }
      </View>
      {error}
      {help}
    </View>
  )
}




const styles = StyleSheet.create({

  helpText: {
    alignSelf: 'center',
    fontSize: fonts.regular,
    color: colors.grayMedium,
    fontFamily: 'RobotoCondensed_400Regular'
  },
  errorText: {
    fontSize: fonts.regular,
    color: 'darkred',
    textAlign: 'right',
    fontFamily: 'RobotoCondensed_400Regular',
    marginRight: metrics.doubleBaseMargin
  },
  inputIcon: {
    fontSize: 20,
    marginRight: metrics.baseMargin
  }
})

