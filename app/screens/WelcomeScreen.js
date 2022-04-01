import React from "react";
import { ImageBackground, StyleSheet, View, Image, Text } from "react-native";
import Button from "../components/Button";

import colors from "../config/colors";
import routes from "../navigations/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      resizeMode="repeat"
      imageStyle={{ opacity: 0.2 }}
      source={require("../assets/food-doodle.webp")}
    >
      <View style={styles.logoContainer}>
        <View style={styles.textContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/paplaya-logo.webp")}
          />
          <Text style={styles.title}>PaPlaya</Text>
          <Text style={styles.text}>Food Delivery</Text>
          <Text style={styles.merchant}>Merchant</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    padding: 20,
    width: "100%",
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  text: {
    color: colors.secondary,
    fontSize: 15,
  },
  title: {
    color: colors.secondary,
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
  },
  merchant: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default WelcomeScreen;
