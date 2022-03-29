// Import the functions you need from the SDKs you need
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmHsTdn2-beGfb7cr-vJydSaMNtzac4eA",
  authDomain: "paplaya-app.firebaseapp.com",
  databaseURL:
    "https://paplaya-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "paplaya-app",
  storageBucket: "paplaya-app.appspot.com",
  messagingSenderId: "16243312332",
  appId: "1:16243312332:web:bff67f3e76ce0e33e8e469",
};

!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : appfirebase.app();

const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { auth, firebase, db, storage };
