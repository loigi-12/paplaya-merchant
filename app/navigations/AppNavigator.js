import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import OrdersScreen from "../screens/OrdersScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      //   component={OrdersNavigator} prefered
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="receipt" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Products"
      component={ProductsScreen}
      //   component={ProductsNavigator} prefered
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="food" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      //   component={ProfileNavigator} prefered
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
