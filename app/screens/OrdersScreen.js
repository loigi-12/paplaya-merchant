import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../components/Text";

function OrdersScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Manage Orders</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OrdersScreen;
