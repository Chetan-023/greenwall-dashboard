import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTYCgZTQVgihvAYJ0B8AAvQQOf5T2vtF0",
  authDomain: "greenwall-mini.firebaseapp.com",
  databaseURL: "https://greenwall-mini-default-rtdb.firebaseio.com",
  projectId: "greenwall-mini",
  storageBucket: "greenwall-mini.appspot.com",
  messagingSenderId: "96963480807",
  appId: "1:96963480807:web:679e1c7d79273c6782"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
