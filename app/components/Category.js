import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Text from "../components/Text";
import colors from "../config/colors";

function Category({ image, label, style }) {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Image style={[styles.image, style]} source={image} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  itemContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  label: {
    fontSize: 15,
    marginTop: 5,
  },
});

export default Category;
