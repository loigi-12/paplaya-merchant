import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Platform,
  ScrollView,
  Button,
} from "react-native";
import * as Yup from "yup";
import uuid from "react-uuid";

import { db, firebase } from "../../firebase";

import { Form, FormField, FormPicker, SubmitButton } from "../components/forms";

import Screen from "../components/Screen";
import Text from "../components/Text";
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

function ListingEditScreen() {
  const [urls, setUrls] = useState([]);
  const [merchant, setMerchant] = useState();
  const [merchantId, setMerchantId] = useState();
  const [formValues, setFormValues] = useState(null);

  useEffect(() => {}, []);

  const getMerchant = async () =>
    await db
      .collection("merchants")
      .get()
      .then((snapshot) =>
        snapshot.docs.forEach((doc) => {
          setMerchantId(doc.id);

          if (doc.data().owner_uid === firebase.auth().currentUser.uid) {
            setMerchant(doc.data().business_name);
          }
        })
      );

  const addProducts = async ({
    category,
    description,
    images,
    price,
    title,
  }) => {
    await db
      .collection("merchants")
      .doc(merchantId)
      .collection("listings")
      .add({
        id: uuid(),
        category,
        description,
        images,
        price,
        title,
        owner: merchant,
      })
      .then(() => {
        console.log("Products uploaded successfully!");
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
      xhr.open("GET", uri, true);
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
    <ScrollView>
      <Screen style={styles.container}>
        <Form
          initialValues={{
            title: "",
            price: "",
            description: "",
            category: null,
            images: [],
            owner: merchant,
          }}
          onSubmit={(values) => {
            addProducts(values);
          }}
          validationSchema={validationSchema}
        >
          <Text style={styles.textPhoto}>Add photos</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  textPhoto: {
    marginBottom: 10,
  },
});

export default ListingEditScreen;
