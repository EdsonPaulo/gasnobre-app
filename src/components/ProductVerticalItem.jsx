import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { colors, general, metrics } from '../constants'
import PlaceholderImage from './PlaceholderImage'

const { height, width } = Dimensions.get('window')

const ProductVerticalItem = props => {
  const { handleQuantity, ...item } = props
  const [quantity, setQuantity] = useState(0)

  const changeQuantity = add => {
    let auxQuantity = add ? quantity + 1 : quantity - 1
    setQuantity(auxQuantity)
    handleQuantity(auxQuantity, item, add === true)
  }

  return (
    <View style={[general.card, styles.container, {}]}>
      <View style={styles.productImageContainer}>
        <PlaceholderImage
          style={styles.productImage}
          source={
            item.image ? { uri: item.image } : require('../assets/noimage.png')
          }
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {item.name} -{' '}
          {item.weight <= 0.99 ? `${item.weight * 1000}ml` : `${item.weight}L`}
        </Text>
        <Text style={styles.description}>
          {item.bottles} garrafas de{' '}
          {item.weight <= 0.99
            ? `${item.weight * 1000} mililitros`
            : `${item.weight} litros`}
        </Text>

        <Text style={styles.price}>
          {Intl.NumberFormat('pt-AO', {
            style: 'currency',
            currency: 'AOA',
          }).format(item.price)}
        </Text>

        <View>
          {quantity == 0 ? (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: colors.primaryDark }]}
                onPress={() => changeQuantity(true)}
              >
                <MaterialCommunityIcons size={18} color="#fff" name="plus" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.btnContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => changeQuantity(false)}
              >
                <MaterialCommunityIcons
                  size={25}
                  color={colors.primaryDark}
                  name="minus"
                />
              </TouchableOpacity>

              <Text style={styles.quantity}>{quantity}</Text>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => changeQuantity(true)}
              >
                <MaterialCommunityIcons
                  size={25}
                  color={colors.primaryDark}
                  name="plus"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height - height / 2,
    width: width - 150,
    marginVertical: 7,
    borderRadius: 15,
    // borderTopLeftRadius: 2,
    padding: 25,
    elevation: 0,
    backgroundColor: '#4b7bec10',
    alignSelf: 'center',

    marginHorizontal: metrics.baseMargin,
    justifyContent: 'flex-end',
    //maxWidth: 200,
    alignItems: 'center',
  },
  productImageContainer: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    top: -60,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    //backgroundColor: "gray",
    marginTop: 100,
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    //textTransform: 'capitalize',
    textAlign: 'center',
    fontFamily: 'RobotoCondensed_700Bold',
  },
  description: {
    fontSize: 16,
    color: colors.grayDark,
    textAlign: 'center',
    marginVertical: 12,
    fontFamily: 'RobotoCondensed_400Regular',
  },
  quantity: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 30,

    fontFamily: 'RobotoCondensed_700Bold',
  },
  price: {
    fontSize: 24,
    color: colors.primaryDark,
    fontFamily: 'RobotoCondensed_700Bold',
    marginBottom: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  btn: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default ProductVerticalItem
