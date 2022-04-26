import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image, Text } from "react-native";
import { useSelector } from "react-redux";

import { db, firebase } from "../../firebase";

import routes from "../navigations/routes";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItemDeleteAction from "./../components/ListItemDeleteAction";
import colors from "../config/colors";
import Button from "../components/Button";

function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [docId, setDocId] = useState();

  const initializeData = async () => {
    await db
      .collection("users")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          if (doc.data().owner_uid === firebase.auth().currentUser.uid) {
            setDocId(doc.id);
          }
        })
      );
    await db
      .collection("users")
      .doc(docId)
      .collection("listings")
      .get()
      .then((snapshot) =>
        snapshot.docs.map((doc) => {
          // console.log("DATA", doc.data());
          setProducts(doc.data());
          // console.log("PRODUCTS", products);
        })
      );
  };

  const handleDeleteProduct = (item) => {};

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Signed out");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <View style={styles.container}>
      {products > 0 && (
        <>
          <Button title="Signout" onPress={handleLogout} />
          <FlatList
            data={products}
            keyExtractor={(product) => product.id.toString()}
            renderItem={({ item }) => (
              <ListItem
                style={styles.items}
                price={item.price}
                subTitle={item.description}
                title={item.title}
                onPress={() => navigation.navigate(routes.LISTING_EDIT, item)}
                ItemComponent={
                  <Image
                    style={styles.image}
                    source={{ uri: item.images[0] }}
                  />
                }
                renderRightActions={() => (
                  <ListItemDeleteAction
                    onPress={() => console.log("pressed")}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        </>
      )}

      {products == 0 && (
        <Text style={styles.emptyProducts}>You have no products yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: { width: 100, height: 80, borderRadius: 2, marginRight: 10 },
  items: {
    marginVertical: 15,
  },
  emptyProducts: {
    marginHorizontal: 15,
    alignSelf: "center",
    color: colors.medium,
  },
});

export default ProductsScreen;
