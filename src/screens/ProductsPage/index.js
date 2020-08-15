import React, { useEffect, useState, useRef } from 'react'

import {
    Text, View,
    FlatList, Alert,
    StyleSheet,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native'

import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from "react-native-reanimated" 

import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modalize } from 'react-native-modalize'

import { Entypo } from '@expo/vector-icons'

import { ProductVerticalList, LoadingSpin, CustomButton, ProductVerticalItem, ProductHorizontalItem } from '../../components'
import { colors, metrics, fonts, general } from '../../constants'
import api from '../../services/api'

const data = require("../../services/mock/mock.json")


export default index = () => {

    let isMounted = true
    const route = useRoute()
    const modalizeRef = useRef(null)

    const navigation = useNavigation()
    const { width, height } = Dimensions.get('window')

    const [interactionsComplete, setInteractionsComplete] = useState(false)
    const [products, setProducts] = useState(data.products)
    const [subtotal, setSubtotal] = useState(0)
    const [cartSize, setCartSize] = useState(0)
    const [cart, setCart] = useState([])

    const [categories, setCategories] = useState([{ id: null, name: 'Tudo' }])
    const [categoryId, setCategoryId] = useState(81)

    const openCartModal = () => {
        modalizeRef.current?.open()
    }

    const transformPrice = value => Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'AOA' }).format(value)

    const getProductCategories = () => {
        api.get('/products/categories')
            .then(response => {
                if (isMounted) {
                    setCategories(response.data.filter(category => category.count > 0))
                    setCategoryId(route.params?.categoryId || categoryId)
                }
            })
            .catch(err => { console.log(err + ' ===> erro') })
    }

    const getProducts = () => {
        api.get('/products')
            .then(response => {
                if (isMounted) {
                    setProducts(response.data)
                }
            })
            .catch(err => { console.log(err + ' ===> erro') })
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setInteractionsComplete(true)
        }).then(() => {
            isMounted = true
            //getProducts()
            // if (categories.length <= 0) loadProductCategories()
        })
        return () => isMounted = false
    }, [])


    const renderCategoryList = () => {
        const CategoryItem = (category) => (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setCategoryId(category.id)}
                style={[styles.categoryItem, {
                    borderColor: (categoryId === category.id) ? colors.white : 'transparent',
                }]}>
                <Text style={styles.categoryItemText}>{category.name} ({category.count || 0})</Text>
            </TouchableOpacity>
        )
        return (
            <FlatList horizontal bounces
                showsHorizontalScrollIndicator={false}
                data={categories}
                contentContainerStyle={{}}
                renderItem={({ item }) => <CategoryItem {...item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        )
    }

    const handleQuantity = (quantity, item, increment) => {
        const updatedItemIndex = cart.findIndex(product => product.id === item.id)

        if (increment) {
            setCartSize(cartSize + 1)
            setSubtotal(subtotal + item.price)

            if (updatedItemIndex < 0)
                cart.push({ ...item, quantity: 1 })
            else {
                cart.splice(updatedItemIndex, 1)
                cart.push({ ...item, quantity })
            }
        }
        else {
            setCartSize(cartSize - 1)
            setSubtotal(subtotal - item.price)

            if (quantity <= 0) {
                cart.splice(updatedItemIndex, 1)
                console.log("removendo o item")
            }
            else {
                cart.splice(updatedItemIndex, 1)
                cart.push({ ...item, quantity })
            }
        }
    }


    //rederiza o product card ou um espaco com largura equivalente se não tiver produto
    const renderItem = ({ item }) => {
        if (item.empty)
            return <View style={styles.itemInvisible} />
        else
            return <ProductVerticalItem width={(width / 2 - 20)} handleQuantity={handleQuantity}  {...item} />
    }

    const renderProductsList = () => (
        <FlatList bounces numColumns={numColumns}
            //showsVerticalScrollIndicator={false}
            data={formatData(products, numColumns)}
            contentContainerStyle={{ paddingVertical: 15 }}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    )

    const renderCart = () => (
        <View style={{ margin: 15, textAlign: "center" }}>
            <Text style={{ textAlign: "center", marginVertical: 15 }}>SELECIONOU {cartSize} PRODUTO(S)</Text>
            {
                cart.map(product => (
                    <View key={product.id} style={{
                        borderWidth: 1,
                        borderColor: colors.borderColor,
                        padding: metrics.baseMargin,
                        borderRadius: metrics.baseRadius,
                        marginBottom: metrics.smallMargin
                    }}>
                        <Text style={{ textAlign: "center" }}>{product.title} {product.weight} (x{product.quantity}) =  {transformPrice(product.price * product.quantity)}</Text>
                    </View>
                ))
            }
        </View>
    )

    const translate = useRef(new Animated.Value()).current
    
    const onGestureEvent = Animated.event([
        {
            nativeEvent: {
                translationX: translate.x,
                translationY: translate.y,
            }
        }
    ])

    const onHandlerStateChange = event => {
        if(event.nativeEvent.oldState === State.ACTIVE){
            Animated.spring(translate, {
                toValue: {x: 0, y: 0},
                duration: 1000
            }).start()
        }
    }

    if (!interactionsComplete) { return <LoadingSpin /> }

    return (
        <SafeAreaView style={general.background}>
            <View style={styles.scene}>
                {renderProductsList()}
                {
                    cart.length == 0 ? null :
                        <TouchableOpacity onPress={openCartModal} activeOpacity={0.7}>
                            <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>

                                <Animated.View style={[styles.fabPosition, styles.fabBagButton, {
                                    transform: [{
                                        translateX: translate.x,
                                        translateY: translate.y
                                    }]
                                }]}>
                                    <View style={[styles.fabPosition, styles.fabBagButtonBadge]}>
                                        <Text style={{ color: "#fff" }}>{cartSize}</Text>
                                    </View>
                                    <Entypo name="shopping-bag" color="#fff" size={25} />
                                </Animated.View>
                            </PanGestureHandler>

                        </TouchableOpacity>
                }
                <Modalize ref={modalizeRef} rootStyle={{ elevation: 3 }} modalHeight={height - 200}
                    FooterComponent={
                        <CustomButton primary style={styles.makeOrderButton} rounded
                            onPress={() => navigation.navigate("checkout", { cart, subtotal })}

                            title={`Fazer Pedido (${transformPrice(subtotal)})`} />
                    }>
                    {renderCart()}
                </Modalize>
            </View>
        </SafeAreaView>
    )
}

const numColumns = 2
const formatData = (products, numColumns) => {
    const numberOfFullRows = Math.floor(products.length / numColumns)
    let numberOfElementsLastRow = products.length - (numberOfFullRows * numColumns)

    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        products.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
        numberOfElementsLastRow++
    }
    return products
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scene: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    fabPosition: {
        position: "absolute",
        elevation: 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    fabBagButton: {
        backgroundColor: colors.primary,
        right: 2,
        bottom: 100,
        width: 50,
        height: 50,
    },
    fabBagButtonBadge: {
        top: -3,
        right: 0,
        width: 20,
        height: 20,
        backgroundColor: "#E37E24",
    },
    categoryListContainer: {
        width: '100%',
        height: 55,
        justifyContent: 'flex-end',
    },
    categoryItem: {
        minWidth: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 4,
        paddingHorizontal: metrics.baseMargin,
    },
    categoryItemText: {
        fontSize: fonts.input,
        textTransform: 'capitalize',
        color: 'white',
        fontFamily: 'RobotoCondensed_400Regular'
    },
    makeOrderButton: {
        width: 250,
        height: 40,
        marginVertical: 30,
        alignSelf: "center"
    }
})