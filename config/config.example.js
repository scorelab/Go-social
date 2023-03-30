import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};
const app = initializeApp(config);

var MAP_API_KEY = "";

export const f = app;
export const database = getDatabase();
export const auth = getAuth();
export const storage = getStorage();
export const MAP_API = MAP_API_KEY;
