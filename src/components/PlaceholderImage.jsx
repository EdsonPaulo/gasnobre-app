import React, { useState } from 'react'
import { ActivityIndicator, Animated, View } from 'react-native'
import { colors } from '../constants'

export default PlaceholderImage = props => {
  const [opacity] = useState(new Animated.Value(0))
  const { style } = props
  const [loading, setLoading] = useState(true)

  const onLoad = event => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
    setLoading(false)
  }

  return (
    <View
      style={{
        // backgroundColor: 'red',
        width: style?.width || '100%',
        height: style?.height || '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}
    >
      {!loading ? null : (
        <ActivityIndicator color={colors.primary} size="small" />
      )}
      <Animated.Image
        {...props}
        resizeMode="contain"
        style={[style, { position: 'absolute', opacity: opacity }]}
        onLoad={onLoad}
      />
    </View>
  )
}
