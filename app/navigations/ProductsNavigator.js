import React from "react";
import { Text, StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import ProductsScreen from "../screens/ProductsScreen";
import ListingEditScreen from "../screens/ListingEditScreen";

import LinkButton from "./../components/LinkButton";
import colors from "../config/colors";
import routes from "../navigations/routes";

const Stack = createStackNavigator();

const ProductsNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerTitleAlign: "center",
    }}
  >
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={{
        headerRight: () => (
          <LinkButton
            title="+Add product"
            style={styles.button}
            onPress={async () => await navigation.navigate(routes.LISTING_EDIT)}
          />
        ),
      }}
    />
    <Stack.Screen name="Add Products" component={ListingEditScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  button: {
    color: colors.primary,
    marginRight: 10,
  },
});

export default ProductsNavigator;
