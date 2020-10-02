import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { RectButton } from "react-native-gesture-handler";
import { HomeTabBar } from "../components";
import { colors, general } from "../constants";
import authContext from "../contexts/auth/auth-context";
import {
  AddressPage,
  Checkout,
  Forgot,
  HomeAdmin,
  HomePage,
  Landing,
  Login,
  OrderDetails,
  Orders,
  PlansPage,
  ProductsAdmin,
  ProductsPage,
  ProfileDetails,
  ProfilePage,
  SignUp,
  Welcome,
} from "../screens";

const stackScreenGlobalOptions = {
  headerBackImage: (props) => (
    <Icon name="keyboard-backspace" size={30} color="white" />
  ),
  headerTitleAlign: "center",
  headerTitleStyle: {
    fontSize: 22,
    fontFamily: "Acme_400Regular",
    marginLeft: 0,
    color: "white",
  },
  //headerLeftContainerStyle: { marginLeft: 5 },
  headerTintColor: colors.dark,
  headerStyle: {
    backgroundColor: colors.primaryDark,
    height: 55,
    elevation: 0,
  },
};

const HomeTabs = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      initialRouteName="home"
      tabBar={(props) => <HomeTabBar {...props} />}
    >
      <Tabs.Screen
        name="homeStack"
        component={HomePage}
        options={{ tabBarLabel: "Início" }}
      />
      <Tabs.Screen
        name="storeStack"
        component={StoreStack}
        options={{ tabBarLabel: "Produtos" }}
      />
      <Tabs.Screen
        name="orderStack"
        component={OrderStack}
        options={{ tabBarLabel: "Pedidos" }}
      />
      <Tabs.Screen
        name="profileStack"
        component={ProfileStack}
        options={{ tabBarLabel: "Perfil" }}
      />
    </Tabs.Navigator>
  );
};

const MainNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="homeTabs"
      screenOptions={stackScreenGlobalOptions}
    >
      <Stack.Screen
        name="homeTabs"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="address"
        component={AddressPage}
        options={{ headerTitle: "Meus Endereços" }}
      />
      <Stack.Screen
        name="orderDetails"
        options={{ headerTitle: "Detalhes do Pedido" }}
        component={OrderDetails}
      />
      <Stack.Screen
        name="kamba"
        component={PlansPage}
        options={{ headerTitle: "Plano Kamba" }}
      />
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={{ headerTitle: "Fazer Pedido" }}
      />
      <Stack.Screen
        name="profileDetails"
        component={ProfileDetails}
        options={{ headerTitle: "Dados Pessoais" }}
      />
    </Stack.Navigator>
  );
};

const OrderStack = () => {
  const Stack = createStackNavigator();
  const { role } = useContext(authContext);
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackScreenGlobalOptions,
        headerStyle: {
          backgroundColor:
            role === "customer" ? colors.primaryDark : colors.dark,
          height: 55,
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="orders"
        options={{
          headerTitle:
            role === "customer" ? "Meus Pedidos" : "Pedidos de Clientes",
        }}
        component={Orders}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const Stack = createStackNavigator();
  const { role } = useContext(authContext);
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackScreenGlobalOptions,
        headerStyle: {
          backgroundColor:
            role === "customer" ? colors.primaryDark : colors.dark,
          height: 55,
          elevation: 0,
        },
      }}
    >
      <Stack.Screen
        name="profile"
        options={{
          headerTitle: "Definições e Perfil",
        }}
        component={ProfilePage}
      />
    </Stack.Navigator>
  );
};

const StoreStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        ...stackScreenGlobalOptions,
      }}
    >
      <Stack.Screen
        name="products"
        options={{ headerTitle: "Produtos Disponíveis" }}
        component={ProductsPage}
      />
    </Stack.Navigator>
  );
};

const AuthNavigation = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, mode: "modal" }}>
      <AuthStack.Screen name="landing" component={Landing} />
      <AuthStack.Screen name="welcome" component={Welcome} />
      <AuthStack.Screen name="login" component={Login} />
      <AuthStack.Screen name="signup" component={SignUp} />
      <AuthStack.Screen name="forgot" component={Forgot} />
    </AuthStack.Navigator>
  );
};

const AdminNavigation = () => {
  const AdminStack = createStackNavigator();
  const Tabs = createBottomTabNavigator();
  const AdminHomeTabs = () => (
    <Tabs.Navigator tabBar={(props) => <HomeTabBar {...props} />}>
      <Tabs.Screen
        name="homeStack"
        component={HomeAdmin}
        options={{ tabBarLabel: "Início" }}
      />
      <Tabs.Screen
        name="storeStack"
        component={ProductsAdmin}
        options={{ tabBarLabel: "Produtos" }}
      />
      <Tabs.Screen
        name="orderStack"
        component={OrderStack}
        options={{ tabBarLabel: "Pedidos" }}
      />
      <Tabs.Screen
        name="customers"
        component={OrderStack}
        options={{ tabBarLabel: "Clientes" }}
      />
    </Tabs.Navigator>
  );

  return (
    <AdminStack.Navigator
      screenOptions={{
        ...stackScreenGlobalOptions,
        headerStyle: { backgroundColor: colors.dark, height: 55 },
        headerTitleStyle: { fontSize: 20, marginLeft: 0, color: colors.white },
      }}
    >
      <AdminStack.Screen
        name="home"
        options={{ headerShown: false }}
        component={AdminHomeTabs}
      />
      <AdminStack.Screen name="customerDetails" component={HomeAdmin} />
      <AdminStack.Screen name="productDetails" component={HomeAdmin} />
      <AdminStack.Screen
        name="orderDetails"
        options={{ headerTitle: "Detalhes do Pedido" }}
        component={OrderDetails}
      />
      <AdminStack.Screen
        name="profile"
        options={{ headerTitle: "" }}
        component={ProfileDetails}
      />
    </AdminStack.Navigator>
  );
};

export { MainNavigation, AuthNavigation, AdminNavigation };
