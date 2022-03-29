import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/Text";

function ProductsScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Manage Products</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ProductsScreen;
