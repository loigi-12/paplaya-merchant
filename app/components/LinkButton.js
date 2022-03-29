import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";

function LinkButton({ color, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textContainer: { flex: 1, alignItems: "center" },
  text: {
    color: "#fd8d55",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default LinkButton;
