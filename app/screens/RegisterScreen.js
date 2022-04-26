import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import { auth, db, firebase } from "../../firebase";

import { Form, FormField, SubmitButton } from "../components/forms";
import colors from "../config/colors";
import LinkButton from "../components/LinkButton";
import Screen from "../components/Screen";
import Text from "../components/Text";
import ListItemSeparator from "../components/ListItemSeparator";
import routes from "../navigations/routes";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  email: Yup.string().required().email().label("Email"),
  businessName: Yup.string().required().label("Business Name"),
  stallNo: Yup.number().required().label("Stall No."),
  phone: Yup.number().required().label("Mobile Number"),
  address: Yup.string().label("Address"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

function RegisterScreen({ navigation }) {
  const handleRegister = async ({
    address,
    businessName,
    email,
    name,
    password,
    phone,
    stallNo,
  }) => {
    const authUser = await auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => alert("Account created successfully"))
      .catch((error) => alert(error.message));

    // const { id } =
    await db
      .collection("users")
      .add({
        accountType: "merchant",
        address,
        businessName,
        email: firebase.auth().currentUser.email,
        name,
        owner_uid: firebase.auth().currentUser.uid,
        phone,
        stallNo,
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView>
      <Screen style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subTitle}>Add your details to register</Text>
          </View>
          <Form
            initialValues={{
              address: "",
              businessName: "",
              email: "",
              name: "",
              password: "",
              phone: "",
              stallNo: "",
            }}
            onSubmit={(values) => handleRegister(values)}
            validationSchema={validationSchema}
          >
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="account"
              name="name"
              placeholder="Fullname"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              keyboardType="email-address"
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
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
              textContextType="password"
            />
            <View style={{ marginVertical: 10 }}></View>
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="domain"
              name="businessName"
              placeholder="Business Name"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="cart-plus"
              name="stallNo"
              placeholder="Stall No."
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="navigation"
              name="address"
              placeholder="Address"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="phone"
              keyboardType="phone-pad"
              maxLength={13}
              name="phone"
              placeholder="Phone"
            />
            <SubmitButton title="Register" />
          </Form>
        </View>
        <View style={styles.footer}>
          <Text style={styles.subTitle}>Already have an account?</Text>
          <LinkButton
            title="Login"
            onPress={() => navigation.navigate(routes.LOGIN)}
          />
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontSize: 26,
    color: colors.secondary,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subTitle: {
    color: colors.secondary,
  },
});

export default RegisterScreen;
