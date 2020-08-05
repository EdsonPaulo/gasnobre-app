import React from 'react';

import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { HomeTabBar, StatusBar } from '../components'

import Icon from "@expo/vector-icons/FontAwesome5"


import { colors } from '../constants'

import {
    Welcome,
    Landing,
    Login,
    SignUp,
    Forgot,
  
    HomePage,
    ProfilePage,
    ProfileDetails,
    Orders,
    AddressPage,
    Checkout,
    ProductDetails,
    ProductsPage,
    OrderDetails,
    PlansPage
} from '../screens'


const stackScreenGlobalOptions = {
    headerBackImage: (props => <Icon name="long-arrow-alt-left" size={25} color={props.tintColor} />),
    headerTitle: "Gás Nobre",
    headerTintColor: colors.white,
    headerStyle: { backgroundColor: colors.primaryDark, height: 55 }
  }
  
  const HomeTabs = () => {
    const Tabs = createBottomTabNavigator()
    return (
      <Tabs.Navigator initialRouteName='home' tabBar={props => <HomeTabBar {...props} />}>
        <Tabs.Screen name="homeStack" component={HomeStack} options={{ tabBarLabel: 'Página Inicial' }} />
        <Tabs.Screen name="orderStack" component={OrderStack} options={{ tabBarLabel: 'Meus Pedidos' }} />
        <Tabs.Screen name="profileStack" component={ProfileStack} options={{ tabBarLabel: 'Definições e Perfil' }} />
      </Tabs.Navigator>
    )
  }
  
  const MainNavigation = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator initialRouteName='homeTabs' screenOptions={stackScreenGlobalOptions}>
        <Stack.Screen name="homeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{
          headerRightContainerStyle: { marginRight: 10 },
          headerRight: (props => <Icon name="shopping-cart" size={18} color={props.tintColor} />),
          headerTitle: "",
          headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
        }} component={ProductsPage} />
        <Stack.Screen name="productDetails" options={{ headerTitle: "Detalhes do Produto" }} component={ProductDetails} />
        <Stack.Screen name="address" component={AddressPage} options={{ headerTitle: "Meus Endereços" }} />
        <Stack.Screen name="orderDetails" options={{ headerTitle: "Detalhes do Pedido" }} component={OrderDetails} />
        <Stack.Screen name="profileDetails" component={ProfileDetails} options={{ headerTitle: "Dados Pessoais" }} />
        <Stack.Screen name="plans" component={PlansPage} options={{ headerTitle: "Planos de Serviço" }} />
        <Stack.Screen name="checkout" component={Checkout} options={{ headerTitle: "Fazer Pedido" }} />
      </Stack.Navigator>
    )
  }
  
  const HomeStack = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
        <Stack.Screen name="profile" options={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
        }} component={HomePage} />
  
      </Stack.Navigator>
    )
  }
  
  const OrderStack = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
        <Stack.Screen name="orders" options={{ headerTitle: "Meus Pedidos", headerTitleAlign: "center" }} component={Orders} />
      </Stack.Navigator>
    )
  }
  
  const ProfileStack = () => {
    const Stack = createStackNavigator()
    return (
      <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
        <Stack.Screen name="profile" options={{
          headerTitle: "Definições e Perfil",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
        }} component={ProfilePage} />
      </Stack.Navigator>
    )
  }
  
  const AuthNavigation = () => {
    const AuthStack = createStackNavigator()
    return (
      <AuthStack.Navigator screenOptions={{ headerShown: false, mode: "modal", }}>
        <AuthStack.Screen name="landing" component={Landing} />
        <AuthStack.Screen name="welcome" component={Welcome} />
  
        <AuthStack.Screen name="login" component={Login} />
        <AuthStack.Screen name="signup" component={SignUp} />
        <AuthStack.Screen name="forgot" component={Forgot} />
      </AuthStack.Navigator>
    )
  }


export { MainNavigation, AuthNavigation }