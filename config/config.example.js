import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};

var MAP_API_KEY = "";

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(config)
} else {
  app = firebase.app();
}

const database= app.firestore();
const auth = firebase.auth();
const f = firebase

export { database, auth, f };

export const MAP_API = MAP_API_KEY;
