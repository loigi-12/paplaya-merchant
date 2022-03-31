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
  // await db
  //   .collection("merchants")
  //   .get()
  //   .then((snapshot) =>
  //     snapshot.docs.forEach((doc) => {
  //       if (doc.data().owner_uid === firebase.auth().currentUser.uid) {
  //         setProducts(doc.data());
  //         console.log(doc.data());
  //       }
  //     })
  //   );

  console.log(products);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
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
