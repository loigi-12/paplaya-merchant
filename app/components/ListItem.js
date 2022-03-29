import React from "react";
import { Image, View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";

import colors from "../config/colors";
import Text from "./Text";

function ListItem({
  IconComponent,
  image,
  ItemComponent,
  onPress,
  renderRightActions,
  reversed,
  style,
  subTitle,
  title,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            {/* Not Reversed */}
            {!reversed && (
              <View>
                {title && (
                  <Text style={styles.title} numberOfLines={1}>
                    {title}
                  </Text>
                )}
                {subTitle && (
                  <Text style={styles.subTitle} numberOfLines={2}>
                    {subTitle}
                  </Text>
                )}
              </View>
            )}

            {/* Reversed */}
            {reversed && (
              <View style={{ flex: 1 }}>
                {subTitle && (
                  <Text style={styles.subTitleRev} numberOfLines={2}>
                    {subTitle}
                  </Text>
                )}
                {title && (
                  <Text style={styles.titleRev} numberOfLines={1}>
                    {title}
                  </Text>
                )}
              </View>
            )}
          </View>
          {!ItemComponent ? (
            <MaterialCommunityIcons
              color={colors.medium}
              name="chevron-right"
              size={25}
            />
          ) : (
            <View>{ItemComponent}</View>
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 35,
  },
  title: {
    fontWeight: "500",
  },
  titleRev: {
    color: colors.medium,
    fontStyle: "italic",
  },
  subTitle: {
    color: colors.medium,
  },
  subTitleRev: {
    color: colors.secondary,
  },
});

export default ListItem;
