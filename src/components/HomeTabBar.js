
import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

const { width } = Dimensions.get("window")

import { colors, metrics, fonts } from '../constants'
import authContext from '../contexts/auth/auth-context'

const HomeTabBar = ({ state, descriptors, navigation }) => {

  const { role } = useContext(authContext)

  return (
    <View style={{ backgroundColor: colors.bgColor }}>
      <View style={{
        flexDirection: 'row',
        height: metrics.tabBarHeight,
        backgroundColor: role === "customer" ? colors.primary : colors.dark,
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
              iconName = 'list'
            else if (route.name === 'profileStack')
              iconName = 'user'
            else if (route.name === 'storeStack')
              iconName = 'shopping-bag'

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
                  width: "auto",
                  height: 35,
                  paddingHorizontal: 15,
                  marginHorizontal: 10,
                  borderRadius: 13,
                  backgroundColor: isFocused ? role == "customer" ? colors.primaryDark : colors.grayDark2 : "transparent",
                  flexDirection: "row",
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Entypo name={iconName} style={{ color: isFocused ? colors.white : colors.grayLight, marginRight: 7 }} size={18} />
                  {
                    !isFocused ? null :
                      <Text style={{ fontSize: 14, letterSpacing: 0.3, fontFamily: "RobotoCondensed_400Regular", color: isFocused ? colors.white : colors.grayLight }}>{label}</Text>
                  }
                </View>
              </TouchableOpacity>
            )
          })}
      </View>
    </View>
  )
}
export default HomeTabBar