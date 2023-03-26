import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

firebase.initializeApp(firebaseConfig)

const app = firebase;
const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.database();
const MAP_API = "";

export { app, auth, storage, db, MAP_API };
