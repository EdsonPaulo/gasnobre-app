import React, { useEffect, useState } from 'react'

import {
    Text, View,
    FlatList, Alert,
    StyleSheet,
    InteractionManager,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'

import { useRoute, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { HeaderBar, ProductVerticalList, LoadingSpin, CustomButton, ProductVerticalItem, ProductHorizontalItem } from '../../components'
import { colors, metrics, fonts, general } from '../../constants'
import api from '../../services/api'

export default index = () => {
    let cartM = []
    let subtotalM = 0
    const productsData = require("../../services/mock-data.json")

    let isMounted = true
    const route = useRoute()
    const navigation = useNavigation()
    const initialLayout = { width: Dimensions.get('window').width }
    const [interactionsComplete, setInteractionsComplete] = useState(false)
    const [index, setIndex] = useState(route.params.category === "water" ? 1 : 0 || 0)
    const [subtotal, setSubtotal] = useState(0)
    const [cart, setCart] = useState([])

    const [categories, setCategories] = useState([{ id: null, name: 'Tudo' }])
    const [categoryId, setCategoryId] = useState(81)

    const [routes] = useState([
        { key: 'gas', title: 'GÁS' },
        { key: 'water', title: 'ÁGUA' }
    ])

    const loadProductCategories = () => {
        api.get('/products/categories')
            .then(response => {
                if (isMounted) {
                    setCategories(response.data.filter(category => category.count > 0))
                    setCategoryId(route.params?.categoryId || categoryId)
                }
            })
            .catch(err => { console.log(err + ' ===> erro') })
    }

    /**
     * 
    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setInteractionsComplete(true)
        }).then(() => {
            isMounted = true
            // if (categories.length <= 0) loadProductCategories()
        })
        return () => isMounted = false
    }, [])
     */

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

    const handleQuantity = (quantity, item) => {
        console.log("Quantidade: " + quantity)
        console.log("Produto: " + JSON.stringify(item))

        /** */
        //const updatedCart = [...cartM]
        const updatedItemIndex = cartM.findIndex(product => product.id === item.id)
        if (updatedItemIndex < 0)
            cartM.push({ ...item, quantity: 1 })
        else {
            console.log("aumentado")
            const updatedItem = { ...cartM[updatedItemIndex] }
            updatedItem.quantity += 1
            cartM[updatedItemIndex] = updatedItem
        }
        subtotalM += item.price
        //  cartM = updatedCart
    }

    //calcular o valor total
    const calculateTotal = () => {
        let acumulator = 0
        cart.forEach(element => {
            acumulator += (element.price * element.quantity)
        })
        setSubtotal(acumulator)
    }

    const CustomTabView = () => {
        const GasScene = () => (
            <View style={styles.scene}>
                <ScrollView>
                    {
                        productsData.map(item =>
                            <ProductHorizontalItem key={item.id} item={item} handleQuantity={handleQuantity} />
                        )
                    }
                </ScrollView>
            </View>
        )

        const WaterScene = () => (
            <View style={styles.scene}>
                <ScrollView>
                    {
                        productsData.map(item =>
                            <ProductVerticalItem key={item.id} item={item} handleQuantity={handleQuantity} />
                        )
                    }
                </ScrollView>
            </View>
        )

        const renderScene = SceneMap({
            gas: GasScene,
            water: WaterScene,
        })

        const renderTabBar = props => (
            <TabBar {...props}
                indicatorStyle={{ backgroundColor: index == 0 ? 'orange' : colors.white }}
                style={{ backgroundColor: colors.primary }}
            />
        )

        return (
            <TabView lazy
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={renderTabBar}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        )
    }

    // if (!interactionsComplete) { return <LoadingSpin /> }

    return (
        <SafeAreaView style={general.background}>
            {CustomTabView()}
            <View style={{ backgroundColor: "#fff", height: metrics.tabBarHeight, elevation: 8, paddingHorizontal: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", height: "100%", alignItems: "center" }}>
                    <View>
                        <Text>Carrinho:</Text>
                        <Text>{subtotalM} kz ({cartM.length} itens)</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}
                        onPress={() => navigation.navigate('checkout', { cart: cart, subtotal: subtotal })}
                        style={{
                            borderRadius: 25,
                            backgroundColor: index == 1 ? colors.primaryDark : "#E37E24",
                            padding: 8, paddingHorizontal: 20
                        }}>
                        <Text style={{ color: colors.white }}>Fazer Pedido</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
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
    checkoutBtn: {

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
        //fontFamily: 'Lato'
    },

})