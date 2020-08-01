import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { StatusBar, Text } from 'react-native'
import { colors } from '../constants'
import { SideBar, HomeTabBar } from '../components'

import {
  Welcome,
  Landing,
  Login,
  SignUp,
  Forgot,
  HomePage,
  Category,
  CartPage,
  Wishlist,
  ProfilePage,
  SearchPage,
  Orders,
  AddressPage,
  Checkout,
  ProductDetails,
  OrderDetails
} from '../screens'

import AuthContext from '../contexts/auth/auth-context'

import AuthProvider from '../contexts/auth/auth-provider'
import ShopProvider from '../contexts/shop/shop-provider'

const HomeTabs = () => {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator initialRouteName='home' animationEnabled={true}
      tabBar={props => <HomeTabBar {...props} />}
      screenOptions={({ route }) => { { } }}>
      <Tabs.Screen name="home" component={HomePage} options={{ tabBarLabel: 'Início' }} />
      <Tabs.Screen name="category" component={Category} options={{ tabBarLabel: 'Categorias' }} />
      <Tabs.Screen name="cart" component={CartPage} options={{ tabBarLabel: 'Carrinho' }} />
      <Tabs.Screen name="wishlist" component={Wishlist} options={{ tabBarLabel: 'Favoritos' }} />
    </Tabs.Navigator>
  )
}

const DrawerNavigation = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator drawerType="slide" drawerContent={props => <SideBar {...props} />}>
      <Drawer.Screen name="homeTabs" component={HomeTabs} />
    </Drawer.Navigator>
  )
}

const MainNavigation = () => {
  const MainStack = createStackNavigator()
  return (
    <MainStack.Navigator initialRouteName="drawer" screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="drawer" component={DrawerNavigation} />
      <MainStack.Screen name="checkout" component={Checkout} />
      <MainStack.Screen name="address" component={AddressPage} />
      <MainStack.Screen name="product" component={ProductDetails} />
      <MainStack.Screen name="orders" component={Orders} />
      <MainStack.Screen name="order" component={OrderDetails} />
      <MainStack.Screen name="profile" component={ProfilePage} />
      <MainStack.Screen name="search" component={SearchPage} />
      <MainStack.Screen name="receipt" component={CartPage} />
    </MainStack.Navigator>
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
      <AuthStack.Screen name="main" component={MainNavigation} />
    </AuthStack.Navigator>
  )
}


export default Router = () => {
  const authContext = useContext(AuthContext)
  return (
    <NavigationContainer>
      <StatusBar barStyle='light-content' backgroundColor={colors.primaryDark} />
      <AuthProvider>
        <ShopProvider>
          {
            authContext.checkLoggedState ?
              <AuthNavigation />
              :
              <MainNavigation />
          }
        </ShopProvider>
      </AuthProvider>


    </NavigationContainer>
  )
}