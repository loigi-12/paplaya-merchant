import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Text from "./Text";

import colors from "../config/colors";

function Card({ title, subTitle, image, owner, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>{subTitle}</Text>
            <Text style={styles.owner}> - {owner}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.light,
    borderWidth: 1,
    backgroundColor: colors.white,
    marginBottom: 20,
    overflow: "hidden",
  },
  currency: {
    color: colors.dark,
    fontWeight: "500",
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginBottom: 7,
  },
  owner: {
    fontSize: 12,
    color: colors.medium,
    fontStyle: "italic",
  },
  subTitle: {
    color: colors.primary,
    fontWeight: "bold",
  },
});

export default Card;
