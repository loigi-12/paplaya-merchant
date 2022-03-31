import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";

import { db, firebase } from "../../firebase";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";

function ProductsScreen(props) {
  const [products, setProducts] = useState();

  useEffect(() => result(), []);

  const result = async () =>
    await db.collectionGroup("listings").onSnapshot((snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc.data()));
    });

  console.log(products.filter((p) => p.owner === "fullhouse"));

  return (
    <View style={styles.container}>
      <FlatList
        data={products.filter((p) => p.owner === "fullhouse")}
        keyExtractor={(product) => product.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            price={item.price}
            style={styles.items}
            ItemComponent={
              <Image style={styles.image} source={{ uri: item.images[0] }} />
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: { width: 100, height: 80, borderRadius: 2, marginRight: 10 },
  items: {
    marginVertical: 15,
  },
});

export default ProductsScreen;
