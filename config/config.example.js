import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>",
  measurementId: "<YOUR_MEASUREMENT_ID>",
};
var MAP_API_KEY = "";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
// export const f = firebase;
// export const database = firebase.database();
// export const auth = firebase.auth();
// export const storage = firebase.storage();
// export const MAP_API = MAP_API_KEY;
