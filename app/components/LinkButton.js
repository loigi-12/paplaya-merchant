import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../config/colors";

function LinkButton({ style, color, title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={[styles.text, style]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    textAlign: "center",
  },
});

export default LinkButton;
