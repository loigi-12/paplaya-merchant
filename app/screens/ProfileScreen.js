import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import * as Yup from "yup";
import { auth, db, firebase } from "../../firebase";

import Screen from "../components/Screen";
import Text from "../components/Text";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.number().required().label("Mobile Number"),
  address: Yup.string().label("Address"),
  password: Yup.string().required().min(4).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm Password"),
});

function ProfileScreen(props) {
  return (
    <ScrollView>
      <Screen style={styles.container}>
        <View>
          <View style={styles.accountsContainer}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
              }}
            />
            <Text style={styles.title}>Hi there Junrie!</Text>
          </View>
          <Form
            initialValues={{
              name: "",
              email: "",
              address: "",
              phone: "",
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
              value="Junrie D. Baño"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              name="email"
              keyboardType="email"
              placeholder="Email"
              value="junriebano@gmail.com"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="navigation"
              name="address"
              placeholder="Address"
              value="Brgy. Rosario, Tandag City"
            />
            <FormField
              autoCapitalize="none"
              autoCorrect={false}
              icon="phone"
              keyboardType="numeric"
              maxLength={11}
              name="phone"
              placeholder="Phone"
              value="09387093842"
            />
            {/* <FormField
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
            /> */}
            <SubmitButton title="Save" />
          </Form>
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  accountsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    margin: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});

export default ProfileScreen;
