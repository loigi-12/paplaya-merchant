import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, Platform } from "react-native";
import * as Yup from "yup";
import uuid from "react-uuid";
import { db, firebase } from "../../firebase";

import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";

import Screen from "../components/Screen";
import CategoryPickerItem from "../components/CategoryPickerItem";
import FormImagePicker from "../components/forms/FormImagePicker";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "food",
    label: "Food",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "beer",
    label: "Beverages",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "cake",
    label: "Desserts",
    value: 3,
  },
];

function ListingEditScreen(props) {
  const [urls, setUrls] = useState([]);
  useEffect(() => {}, []);

  const handleUploadListing = async ({
    category,
    description,
    images,
    price,
    title,
    owner,
  }) => {
    await db
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("listings")
      .add({
        id: uuid(),
        category,
        description,
        images,
        price,
        title,
        owner,
      })
      .then(() => {
        console.log("Listings uploaded successfully!");
      })
      .catch((error) => alert(error.message));

    uploadImage(images).then((image) => setUrls(image), console.log(image));
  };

  const uploadImage = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open(
        "GET",
        Platform.OS === "android" ? uri.replace("file:///", "") : uri,
        true
      );
      xhr.send(null);
    }).catch((error) => console.log(error.message));

    const uniqueId = uuid();

    const ref = firebase
      .storage()
      .ref(`/images/${firebase.auth().currentUser.uid}`)
      .child(uniqueId);
    await ref.put(blob).catch((error) => console.log(error.message));

    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    // blob.close();

    // let url = await snapshot.ref.getDownloadURL();
    // console.log("URL: ", url);

    // return url;
  };

  return (
    <Screen style={styles.container}>
      <ActivityIndicator animating={true} />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
          owner: firebase.auth().currentUser.email,
        }}
        onSubmit={(values) => handleUploadListing(values)}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        />
        <FormPicker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ListingEditScreen;