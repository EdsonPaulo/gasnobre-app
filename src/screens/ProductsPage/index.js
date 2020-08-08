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

import { useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { HeaderBar, ProductVerticalList, LoadingSpin, CustomButton, ProductItem } from '../../components'
import { colors, metrics, fonts, general } from '../../constants'
import api from '../../services/api'
import { color } from 'react-native-reanimated';

export default index = () => {
    let isMounted = true
    const route = useRoute()
    const [interactionsComplete, setInteractionsComplete] = useState(false)
    const [categories, setCategories] = useState([{ id: null, name: 'Tudo' }])
    const [categoryId, setCategoryId] = useState(81)
    const initialLayout = { width: Dimensions.get('window').width }
    const [index, setIndex] = React.useState(0);
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
            .catch(err => {
                console.log(err + ' ===> erro')
            })
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setInteractionsComplete(true)
        }).then(() => {
            isMounted = true
            if (categories.length <= 0)
                loadProductCategories()
        })
        return () => isMounted = false
    }, [])


    useEffect(() => {
        if (categories.length <= 0) {
            if (isMounted)
                setCategories(route.params?.categories)
        }
        else
            setCategoryId(route.params?.categoryId || categoryId)
        return () => { }
    }, [route.params?.categoryId])


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

    const item = {
        title: "gas botija",
        price: 23000
    }

    const handleQuantity = (quantity) => {
        console.log("Quantidade: " + quantity)
    }

    const GasRoute = () => (
        <View style={styles.scene}>
        </View>
    )

    const WaterRoute = () => (
        <View style={styles.scene}>
            <ProductItem item={item} handleQuantity={handleQuantity} />
        </View>
    )


    const CustomTabView = () => {

        const renderScene = SceneMap({
            gas: GasRoute,
            water: WaterRoute,
        })

        const renderTabBar = props => (
            <TabBar {...props}
                indicatorStyle={{ backgroundColor: index == 0 ? 'orange' : colors.white }}
                style={{ backgroundColor: colors.primary }}
            />
        );

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
                        <Text>8 Itens no selecionados</Text>
                        <Text>Subtotal: 12 000 kz</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}
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
        alignItems: 'center',
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