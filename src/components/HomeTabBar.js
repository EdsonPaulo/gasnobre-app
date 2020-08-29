
import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Fontisto } from '@expo/vector-icons'

const { width } = Dimensions.get("window")

import { colors, metrics, fonts } from '../constants'

const HomeTabBar = ({ state, descriptors, navigation }) => (

  <View style={{ backgroundColor: colors.bgColor }}>
    <View style={{
      flexDirection: 'row',
      height: metrics.tabBarHeight,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderTopWidth: 1,
      borderTopColor: colors.borderColor,
      elevation: 8
    }}>
      {
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel
          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            })
          }

          let iconName
          if (route.name === 'homeStack')
            iconName = 'home'
          else if (route.name === 'orderStack')
            iconName = 'prescription'
          else if (route.name === 'profileStack')
            iconName = 'person'
          else if (route.name === 'storeStack')
            iconName = 'shopping-store'

          return (
            <TouchableOpacity key={route.key}
              activeOpacity={0.5}
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}>
              <View style={{
                width: width / 3 - 30,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Fontisto name={iconName} style={{ color: isFocused ? colors.primary : colors.grayDark, marginBottom: 2 }} size={18} />
                <Text style={{ fontSize: fonts.small, color: isFocused ? colors.primary : colors.grayDark }}>{label}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
    </View>
  </View>
)
export default HomeTabBar