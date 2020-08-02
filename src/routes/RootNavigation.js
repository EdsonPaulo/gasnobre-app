import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar, Text } from 'react-native'

import Icon from "@expo/vector-icons/FontAwesome5"

import { colors } from '../constants'
import { SideBar, HomeTabBar } from '../components'

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
  PlansPage,
} from '../screens'

import AuthContext from '../contexts/auth/auth-context'

import AuthProvider from '../contexts/auth/auth-provider'

const stackScreenGlobalOptions = {
  headerBackImage: (props => <Icon name="long-arrow-alt-left" size={25} color={props.tintColor} />),
  headerTitle: "Gás Nobre",
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.primaryDark, height: 55 }
}

const HomeTabs = () => {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator initialRouteName='homeStack' animationEnabled={true}
      tabBar={props => <HomeTabBar {...props} />}
      screenOptions={({ route }) => { { } }}>
      <Tabs.Screen name="homeStack" component={HomeStack} options={{ tabBarLabel: 'Página Inicial' }} />
      <Tabs.Screen name="orderStack" component={OrderStack} options={{ tabBarLabel: 'Meus Pedidos' }} />
      <Tabs.Screen name="profileStack" component={ProfileStack} options={{ tabBarLabel: 'Perfil' }} />
    </Tabs.Navigator>
  )
}

const HomeStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='home' screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="home" component={HomePage} options={{
        headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
      }} />
      <Stack.Screen name="products" options={{
        headerRightContainerStyle: { marginRight: 10 },
        headerRight: (props => <Icon name="shopping-cart" size={18} color={props.tintColor} />),
        headerTitle: "",
        headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
      }} component={ProductsPage} />
      <Stack.Screen name="productDetails" options={{ headerTitle: "Detalhes do Produto" }} component={ProductDetails} />
      <Stack.Screen name="checkout" component={Checkout} options={{ headerTitle: "Fazer Pedido" }} />
      <Stack.Screen name="address" component={AddressPage} options={{ headerTitle: "Meus Endereços" }} />
    </Stack.Navigator>
  )
}

const OrderStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='orders' screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="orders" options={{ headerTitle: "Meus Pedidos", headerTitleAlign: "center" }} component={Orders} />
      <Stack.Screen name="orderDetails" options={{ headerTitle: "Detalhes do Pedido" }} component={OrderDetails} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='profile' screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="profile" options={{
        headerTitle: "Definições e Perfil",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: colors.primaryDark, elevation: 0, height: 55 }
      }} component={ProfilePage} />
      <Stack.Screen name="profileDetails" component={ProfileDetails} options={{ headerTitle: "Dados Pessoais" }} />
      <Stack.Screen name="plans" component={PlansPage} options={{ headerTitle: "Planos de Serviço" }} />
      <Stack.Screen name="address" component={AddressPage} options={{ headerTitle: "Meus Endereços" }} />
    </Stack.Navigator>
  )
}

const AuthNavigation = () => {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, mode: "modal", }}>
      <AuthStack.Screen name="welcome" component={Welcome} />
      <AuthStack.Screen name="landing" component={Landing} />
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={SignUp} />
      <AuthStack.Screen name="forgot" component={Forgot} />
    </AuthStack.Navigator>
  )
}


export default Router = () => {
  const authContext = useContext(AuthContext)
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor={colors.primaryDark} />
      <AuthProvider>
        <HomeTabs />
      </AuthProvider>
    </NavigationContainer>
  )
}