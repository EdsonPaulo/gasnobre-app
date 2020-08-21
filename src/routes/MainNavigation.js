import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Icon from "@expo/vector-icons/FontAwesome"

import { HomeTabBar } from '../components'

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
  ProductsPage,
  OrderDetails,
  PlansPage,

  HomeAdmin
} from '../screens'

const stackScreenGlobalOptions = {
  headerBackImage: (props => <Icon name="long-arrow-left" size={25} color={props.tintColor} />),
  headerTitleAlign: "center",
  headerTitleStyle: { fontSize: 18, fontFamily: "Amarante_400Regular" },
  headerLeftContainerStyle: { marginLeft: 5 },
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.primary, height: 50 }
}

const HomeTabs = () => {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator initialRouteName='home' tabBar={props => <HomeTabBar {...props} />}>
      <Tabs.Screen name="homeStack" component={HomePage} options={{ tabBarLabel: 'início' }} />
      <Tabs.Screen name="storeStack" component={StoreStack} options={{ tabBarLabel: 'Produtos', tabBarVisible: false }} />
      <Tabs.Screen name="orderStack" component={OrderStack} options={{ tabBarLabel: 'Pedidos' }} />
      <Tabs.Screen name="profileStack" component={ProfileStack} options={{ tabBarLabel: 'Perfil' }} />
    </Tabs.Navigator>
  )
}

const MainNavigation = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator initialRouteName='homeTabs' screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="homeTabs" component={HomeTabs} options={{ headerShown: false }} />
      <Stack.Screen name="address" component={AddressPage} options={{ headerTitle: "Meus Endereços" }} />
      <Stack.Screen name="orderDetails" options={{ headerTitle: "Detalhes do Pedido" }} component={OrderDetails} />
      <Stack.Screen name="kamba" component={PlansPage} options={{ headerTitle: "Plano Kamba" }} />
      <Stack.Screen name="checkout" component={Checkout} options={{ headerTitle: "Fazer Pedido" }} />
      <Stack.Screen name="profileDetails" component={ProfileDetails} options={{ headerTitle: "Dados Pessoais", headerStyle: {elevation: 0, backgroundColor: colors.primary, height: 50 } }} />
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="home" options={{
        headerTitleAlign: "left",
        headerTitleStyle: { fontSize: 30, fontFamily: "Amarante_400Regular" },
        headerTitle: "Água Nobre",
      }} component={HomePage} />
    </Stack.Navigator>
  )
}
const OrderStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="orders" options={{ headerTitle: "Meus Pedidos" }} component={Orders} />
    </Stack.Navigator>
  )
}
const ProfileStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="profile" options={{
        headerTitle: "Definições e Perfil",
        headerStyle: { elevation: 0, backgroundColor: colors.primary, height: 40 }
      }} component={ProfilePage} />
    </Stack.Navigator>
  )
}
const StoreStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator screenOptions={stackScreenGlobalOptions}>
      <Stack.Screen name="products" options={{ headerTitle: "Produtos Disponíveis" }} component={ProductsPage} />
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

const AdminNavigation = () => {
  const AdminStack = createStackNavigator()
  return (
    <AdminStack.Navigator screenOptions={{
      ...stackScreenGlobalOptions,
      headerStyle: { backgroundColor: colors.dark, height: 50 }
    }}>
      <AdminStack.Screen name="home" component={HomeAdmin} />
      <AdminStack.Screen name="customers" component={HomeAdmin} />
      <AdminStack.Screen name="customerDetails" component={HomeAdmin} />
      <AdminStack.Screen name="products" component={HomeAdmin} />
      <AdminStack.Screen name="productDetails" component={HomeAdmin} />
      <AdminStack.Screen name="orders" component={HomeAdmin} />
      <AdminStack.Screen name="orderDetails" component={OrderDetails} />
    </AdminStack.Navigator>
  )
}
export { MainNavigation, AuthNavigation, AdminNavigation }