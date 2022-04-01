import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";

import { db, firebase } from "../../firebase";

import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import routes from "../navigations/routes";
import ListItemDeleteAction from "./../components/ListItemDeleteAction";

function ProductsScreen({ navigation }) {
  const [products, setProducts] = useState();
  const [merchant, setMerchant] = useState();

  const fetch_data = async () => {
    await db
      .collection("merchants")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          if (doc.data().owner_uid === firebase.auth().currentUser.uid) {
            setMerchant(doc.data().business_name);
          }
        })
      );
  };

  const result = async () =>
    await db.collectionGroup("listings").onSnapshot((snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc.data()));
    });

  useEffect(() => {
    fetch_data();
    result();
  }, []);

  console.log(merchant);

  return (
    <View style={styles.container}>
      {products && (
        <FlatList
          data={products.filter((p) => p.owner === merchant)}
          keyExtractor={(product) => product.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              style={styles.items}
              price={item.price}
              subTitle={item.description}
              title={item.title}
              onPress={() => navigation.navigate(routes.LISTING_EDIT)}
              ItemComponent={
                <Image style={styles.image} source={{ uri: item.images[0] }} />
              }
              renderRightActions={ListItemDeleteAction}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
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
});

export default ProductsScreen;
