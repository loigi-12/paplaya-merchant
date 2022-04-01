import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";

function Button({ title, onPress, color = "primary", style, width }) {
  return (
    <TouchableOpacity style={[styles.button, { width }]} onPress={onPress}>
      <View style={styles.childrens}>
        <Text style={[styles.text, style]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    // borderRadius: 25,
    alignItems: "center",
    padding: 15,
    width: "100%",
    height: 60,
    marginTop: 5,
  },
  childrens: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default Button;
