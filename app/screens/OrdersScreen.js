import React from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";

import Badge from "./../components/Badge";
import ListItem from "./../components/ListItem";

import Text from "../components/Text";
import colors from "../config/colors";

const carts = [
  { id: 1, title: "Product 1", price: "141" },
  { id: 2, title: "Product 2", price: "142" },
  { id: 3, title: "Product 3", price: "143" },
];

function OrdersScreen(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          blurRadius={1}
          source={{
            uri: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          }}
        />
        <FlatList
          data={carts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.renderComponent}>
              <ListItem
                style={styles.items}
                title={`1 x ${item.title}`}
                // ItemComponent={
                //   <Text style={styles.textComponent}>{`₱ ${item.price}`}</Text>
                // }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { margin: 10 },
  image: {
    width: "100%",
    height: 100,
    opacity: 0.8,
    backgroundColor: colors.black,
    borderRadius: 2,
  },
  renderComponent: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: 10,
  },
});

export default OrdersScreen;
