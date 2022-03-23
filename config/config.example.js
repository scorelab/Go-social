import firebase from "firebase";

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

var MAP_API_KEY = "";

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const MAP_API = MAP_API_KEY;
