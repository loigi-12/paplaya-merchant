import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function Badge({ value }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.medium,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  label: {
    // fontWeight: "bold",
  },
});

export default Badge;
