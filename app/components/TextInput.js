import React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import colors from "../config/colors";

function AppTextInput({ icon, width = "100%", extended, ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      {!extended && <TextInput style={defaultStyles.text} {...otherProps} />}
      {extended && (
        <View>
          <Text style={{ color: colors.gray, fontSize: 11 }}>Name</Text>
          <TextInput style={defaultStyles.text} {...otherProps} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
