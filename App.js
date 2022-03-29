import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { firebase, db } from "./firebase";

import AuthNavigator from "./app/navigations/AuthNavigator";
import colors from "./app/config/colors";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  const unSubscribe = async () => {
    return await firebase
      .auth()
      .onAuthStateChanged((user) => userHandler(user));
  };

  useEffect(() => {
    unSubscribe();

    // db.collectionGroup("listings").onSnapshot((snapshot) => {
    //   setListings(snapshot.docs.map((doc) => doc.data()));
    // });
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      {/* {currentUser ? <AppNavigator /> : <AuthNavigator />} */}
      <AuthNavigator />
      <StatusBar backgroundColor={colors.primary} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
