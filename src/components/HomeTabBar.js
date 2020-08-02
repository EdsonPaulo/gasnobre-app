
import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get("window")

import { colors, metrics, fonts } from '../constants'

const HomeTabBar = ({ state, descriptors, navigation }) => (

  <View style={{
    flexDirection: 'row',
    height: metrics.tabBarHeight,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: "whitesmoke"
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
          iconName = 'ios-home'
        else if (route.name === 'orderStack')
          iconName = 'ios-grid'
        else if (route.name === 'profileStack')
          iconName = 'ios-person'
        else if (route.name === 'productStack')
          iconName = 'grid'

        return (
          <TouchableOpacity key={route.key}
            activeOpacity={0.5}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            <View style={{
              width: width / 3,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'}}>
              <Ionicons name={iconName} style={{ color: isFocused ? colors.accent : colors.grayDark }} size={22} />
              <Text style={{ fontSize: fonts.small, color: isFocused ? colors.accent : colors.grayDark }}>{label}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
  </View>
)

export default HomeTabBar