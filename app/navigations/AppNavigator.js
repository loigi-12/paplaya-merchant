import React from "react";
import { Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import OrdersScreen from "../screens/OrdersScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Button from "../components/Button";
import LinkButton from "./../components/LinkButton";
import colors from "../config/colors";
import ProductsNavigator from "./ProductsNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: true,
      headerTitleAlign: "center",
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
      component={ProductsNavigator}
      //   component={ProductsNavigator} prefered
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="food" size={size} color={color} />
        ),
        headerShown: false,
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

const styles = StyleSheet.create({
  button: {
    color: colors.primary,
    marginRight: 10,
  },
});

export default AppNavigator;
