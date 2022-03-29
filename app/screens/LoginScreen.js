import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import * as Yup from "yup";
import { auth, firebase } from "../../firebase";

import Screen from "../components/Screen";
import Text from "../components/Text";
import LinkButton from "../components/LinkButton";
import { Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import routes from "../navigations/routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const handlePhoneSignin = () => {
    const phoneNumber = "+1 650-555-3434";
    const testVerificationCode = "1234";

    var appVerifier = new auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        return confirmationResult.confirm(testVerificationCode);
      })
      .catch((error) => alert(error.message));
  };
  const handleSignin = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        alert("successful login", userCredentials.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image
          style={styles.logo}
          source={require("../assets/paplaya-logo.webp")}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>Add your details to login</Text>
        </View>
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleSignin(values.email, values.password)}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email"
            maxLength={51}
            name="email"
            placeholder="Email"
          />
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContextType="password"
          />
          <SubmitButton title="Login" />
        </Form>
      </View>
      <View style={styles.footer}>
        <LinkButton
          title="Forgot Password?"
          onPress={() => console.log("reset")}
        />
        <LinkButton
          title="Signup"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  logo: {
    alignSelf: "center",
    height: 80,
    marginBottom: 20,
    marginTop: 50,
    width: 80,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    color: colors.secondary,
    marginBottom: 10,
  },
  subTitle: {
    color: colors.secondary,
  },
});

export default LoginScreen;
