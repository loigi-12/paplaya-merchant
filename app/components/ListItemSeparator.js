import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ListItemSeparator({ backgroundColor = colors.light }) {
  return <View style={[styles.separator, { backgroundColor }]}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
  },
});

export default ListItemSeparator;
