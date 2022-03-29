import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({ name, size = 40, backgroundColor, iconColor = "#fff", style }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 1.5,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <MaterialCommunityIcons name={name} color={iconColor} size={size * 0.5} />
    </View>
  );
}

export default Icon;
